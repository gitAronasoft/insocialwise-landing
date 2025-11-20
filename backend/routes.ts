import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPreBookingSchema } from "@shared/schema";
import { ZodError } from "zod";
// import { createStripePaymentIntent } from "./stripe";
import { createSubscription } from "./stripe";
import { createRazorpayOrder, verifyRazorpayPayment } from "./razorpay";
import { autoReplyService } from "./auto-reply";
import { isOpenAIConfigured } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get remaining spots (out of 100)
  app.get("/api/spots-remaining", async (req, res) => {
    try {
      const count = await storage.getPreBookingsCount();
      const remaining = Math.max(0, 100 - count);
      res.json({ remaining, total: 100, taken: count });
    } catch (error) {
      res.status(500).json({ message: "Failed to get spots count" });
    }
  });

  // Create pre-booking
  app.post("/api/prebookings", async (req, res) => {
    try {
      // Check if we still have spots available
      const count = await storage.getPreBookingsCount();
      if (count >= 100) {
        return res.status(400).json({ message: "Sorry, all 100 spots have been taken!" });
      }

      // Validate request body
      const validatedData = insertPreBookingSchema.parse(req.body);

      // Check if email already exists
      const existingBooking = await storage.getPreBookingByEmail(validatedData.email);
      if (existingBooking) {
        return res.status(400).json({ message: "This email has already been registered for the free offer." });
      }

      // Create the pre-booking
      const preBooking = await storage.createPreBooking(validatedData);
      
      // Record conversion for A/B testing
      await storage.recordConversion(validatedData.variant || "A");
      
      res.status(201).json({ 
        message: "Successfully registered! Check your email for next steps.",
        id: preBooking.id,
        spotsRemaining: Math.max(0, 100 - (count + 1))
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      }
      res.status(500).json({ message: "Failed to create pre-booking" });
    }
  });

  // Get all pre-bookings (for admin purposes - could be protected)
  app.get("/api/prebookings", async (req, res) => {
    try {
      const bookings = await storage.getAllPreBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pre-bookings" });
    }
  });

  // A/B Testing routes
  app.post("/api/ab-test/view", async (req, res) => {
    try {
      const { variant } = req.body;
      if (!variant) {
        return res.status(400).json({ message: "Variant is required" });
      }
      await storage.recordView(variant);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to record view" });
    }
  });

  app.get("/api/ab-test/results", async (req, res) => {
    try {
      const results = await storage.getAbTestResults();
      
      // Aggregate results by variant
      const aggregated = results.reduce((acc, result) => {
        if (!acc[result.variant]) {
          acc[result.variant] = { variant: result.variant, views: 0, conversions: 0 };
        }
        acc[result.variant].views += result.views;
        acc[result.variant].conversions += result.conversions;
        return acc;
      }, {} as Record<string, { variant: string, views: number, conversions: number }>);

      const summary = Object.values(aggregated).map(data => ({
        ...data,
        conversionRate: data.views > 0 ? (data.conversions / data.views * 100).toFixed(2) : "0.00"
      }));

      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to get A/B test results" });
    }
  });

  // Payment Routes
  // app.post("/api/payment/stripe/payment-intent", createStripePaymentIntent);
  // Stripe subscription endpoint
app.post("/api/payment/create-subscription", createSubscription);
  app.post("/api/payment/razorpay/create-order", createRazorpayOrder);
  app.post("/api/payment/razorpay/verify", verifyRazorpayPayment);

  // Auto-Reply and Knowledge Base Routes
  app.get("/api/auto-reply/settings", async (req, res) => {
    try {
      const settings = autoReplyService.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get auto-reply settings" });
    }
  });

  app.post("/api/auto-reply/settings", async (req, res) => {
    try {
      autoReplyService.updateSettings(req.body);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to update auto-reply settings" });
    }
  });

  app.get("/api/auto-reply/stats", async (req, res) => {
    try {
      const { timeframe } = req.query;
      const stats = autoReplyService.getAutoReplyStats(timeframe as any);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to get auto-reply stats" });
    }
  });

  app.post("/api/auto-reply/process-message", async (req, res) => {
    try {
      const result = await autoReplyService.processIncomingMessage(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to process message for auto-reply" });
    }
  });

  app.get("/api/knowledge-base/status", async (req, res) => {
    try {
      // In a real app, this would check the database for knowledge base entries
      const hasKnowledgeBase = true; // Mock for now
      const hasOpenAI = isOpenAIConfigured();
      
      res.json({
        hasKnowledgeBase,
        hasOpenAI,
        canEnableAutoReply: hasKnowledgeBase && hasOpenAI
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get knowledge base status" });
    }
  });

  // Mock knowledge base entries - in production this would be in database
  app.get("/api/knowledge-base/entries", async (req, res) => {
    try {
      const mockEntries = [
        {
          id: "1",
          title: "General Company Information",
          content: "We are a leading social media management platform that helps businesses grow their online presence through AI-powered content creation, intelligent scheduling, and comprehensive analytics.",
          category: "General",
          platforms: ["all"],
          tags: ["company", "about", "services"],
          createdAt: "2024-01-15"
        },
        {
          id: "2",
          title: "Pricing Information",
          content: "Our pricing plans are designed to scale with your business: Basic plan at $29/month includes 5 social accounts and 100 posts per month. Pro plan at $79/month includes 15 accounts and unlimited posts. Enterprise plan at $199/month includes unlimited accounts, advanced analytics, and dedicated support.",
          category: "Pricing",
          platforms: ["facebook", "instagram", "twitter"],
          tags: ["pricing", "plans", "cost"],
          createdAt: "2024-01-16"
        },
        {
          id: "3",
          title: "Support and Contact Information",
          content: "For technical support, you can reach us via email at support@insocialwise.com or through our live chat available 24/7. We typically respond within 2 hours during business hours. For urgent issues, please mark your message as 'urgent'.",
          category: "Support",
          platforms: ["all"],
          tags: ["support", "contact", "help"],
          createdAt: "2024-01-17"
        }
      ];
      res.json(mockEntries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get knowledge base entries" });
    }
  });

  // Facebook Platform Connection Routes
  app.post("/api/platforms/connect/facebook", async (req, res) => {
    try {
      const { accessToken, userID, pages } = req.body;
      
      if (!accessToken || !userID) {
        return res.status(400).json({ message: "Missing required Facebook credentials" });
      }

      // In production, validate the access token with Facebook API
      // and store the connection in database
      const connectionData = {
        platform: "facebook",
        userId: userID,
        accessToken: accessToken, // In production, encrypt this
        pages: pages,
        connectedAt: new Date().toISOString(),
        status: "connected"
      };

      // Mock saving to database
      console.log("Saving Facebook connection:", connectionData);

      // In production, store pages and their permissions
      const processedPages = pages.map((page: any) => ({
        id: page.id,
        name: page.name,
        accessToken: page.access_token,
        category: page.category,
        tasks: page.tasks || []
      }));

      res.json({
        success: true,
        message: "Facebook account connected successfully",
        connection: {
          platform: "facebook",
          userId: userID,
          pages: processedPages,
          connectedAt: connectionData.connectedAt
        }
      });
    } catch (error) {
      console.error("Failed to save Facebook connection:", error);
      res.status(500).json({ message: "Failed to save Facebook connection" });
    }
  });

  app.get("/api/platforms/facebook/pages", async (req, res) => {
    try {
      // In production, fetch from database based on authenticated user
      const mockPages = [
        {
          id: "12345",
          name: "InSocialWise - Main Page",
          category: "Software",
          accessToken: "page_access_token_1",
          tasks: ["MANAGE", "CREATE_CONTENT", "MODERATE", "MESSAGING"]
        },
        {
          id: "12346", 
          name: "Customer Support Hub",
          category: "Customer Service",
          accessToken: "page_access_token_2",
          tasks: ["MESSAGING", "MODERATE"]
        }
      ];

      res.json({
        success: true,
        pages: mockPages
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get Facebook pages" });
    }
  });

  app.delete("/api/platforms/facebook/disconnect", async (req, res) => {
    try {
      // In production, remove connection from database
      // and revoke Facebook access tokens
      console.log("Disconnecting Facebook account");

      res.json({
        success: true,
        message: "Facebook account disconnected successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to disconnect Facebook account" });
    }
  });

  // Facebook OAuth callback handler
  app.get("/auth/facebook/callback", async (req, res) => {
    try {
      const { code, state } = req.query;
      
      if (!code) {
        return res.redirect("/?error=facebook_auth_failed");
      }

      // Exchange authorization code for access token
      const tokenResponse = await fetch("https://graph.facebook.com/v18.0/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.VITE_FACEBOOK_APP_ID!,
          client_secret: process.env.FACEBOOK_APP_SECRET!,
          redirect_uri: `${req.protocol}://${req.get('host')}/auth/facebook/callback`,
          code: code as string,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.error) {
        console.error("Facebook token exchange error:", tokenData.error);
        return res.redirect("/?error=facebook_token_failed");
      }

      // Get user info and pages
      const userResponse = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${tokenData.access_token}&fields=id,name,email`);
      const userData = await userResponse.json();

      const pagesResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}&fields=id,name,category,access_token,tasks`);
      const pagesData = await pagesResponse.json();

      // Save connection data (in production, save to database)
      console.log("Facebook connection successful:", {
        user: userData,
        pages: pagesData.data,
        accessToken: tokenData.access_token
      });

      // Send success message to parent window and redirect
      res.send(`
        <html>
          <head>
            <title>Facebook Connected Successfully</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                text-align: center; 
                margin-top: 100px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 40px;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 400px;
              }
              .success { color: #22c55e; font-size: 24px; margin-bottom: 20px; font-weight: 600; }
              .info { color: rgba(255, 255, 255, 0.9); margin-bottom: 30px; font-size: 16px; }
              .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid #22c55e;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px auto;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .countdown { font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">✅ Facebook Connected!</div>
              <div class="info">Your Facebook pages are now connected and ready for content management.</div>
              <div class="spinner"></div>
              <div class="countdown">Closing automatically in <span id="countdown">3</span> seconds...</div>
            </div>
            
            <script>
              // Notify parent window of successful authentication
              if (window.opener) {
                window.opener.postMessage({
                  type: 'FACEBOOK_AUTH_SUCCESS',
                  data: {
                    user: ${JSON.stringify(userData)},
                    pages: ${JSON.stringify(pagesData.data || [])}
                  }
                }, window.location.origin);
              }
              
              // Countdown and auto-close
              let seconds = 3;
              const countdownElement = document.getElementById('countdown');
              const timer = setInterval(() => {
                seconds--;
                countdownElement.textContent = seconds;
                if (seconds <= 0) {
                  clearInterval(timer);
                  window.close();
                }
              }, 1000);
              
              // Fallback redirect if window doesn't close
              setTimeout(() => {
                if (!window.closed) {
                  window.location.href = '/dashboard';
                }
              }, 4000);
            </script>
          </body>
        </html>
      `);

    } catch (error) {
      console.error("Facebook OAuth callback error:", error);
      res.redirect("/?error=facebook_callback_failed");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
