import { generateAutoReply, analyzeMessage, isOpenAIConfigured } from "./openai";

interface AutoReplySettings {
  enabled: boolean;
  platforms: string[];
  knowledgeBase: KnowledgeBaseEntry[];
  responseDelay?: number; // seconds
  businessHours?: {
    enabled: boolean;
    timezone: string;
    hours: { start: string; end: string };
    days: number[]; // 0-6, Sunday to Saturday
  };
}

interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  platforms: string[];
  tags: string[];
}

interface IncomingMessage {
  id: string;
  platform: string;
  content: string;
  sender: {
    id: string;
    name: string;
    profileUrl?: string;
  };
  timestamp: string;
  conversationId?: string;
}

class AutoReplyService {
  private settings: AutoReplySettings = {
    enabled: false,
    platforms: [],
    knowledgeBase: [],
    responseDelay: 30
  };

  updateSettings(newSettings: Partial<AutoReplySettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  getSettings(): AutoReplySettings {
    return this.settings;
  }

  private isBusinessHours(): boolean {
    if (!this.settings.businessHours?.enabled) {
      return true; // Always respond if business hours not configured
    }

    const now = new Date();
    const { timezone, hours, days } = this.settings.businessHours;
    
    // Simple business hours check (in production, use proper timezone library)
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const startHour = parseInt(hours.start.split(':')[0]);
    const endHour = parseInt(hours.end.split(':')[0]);

    return days.includes(currentDay) && 
           currentHour >= startHour && 
           currentHour < endHour;
  }

  private shouldAutoReply(message: IncomingMessage): boolean {
    return this.settings.enabled && 
           this.settings.platforms.includes(message.platform) &&
           this.isBusinessHours() &&
           isOpenAIConfigured();
  }

  async processIncomingMessage(message: IncomingMessage): Promise<{
    shouldReply: boolean;
    reply?: string;
    analysis?: any;
    confidence?: number;
    usedKnowledge?: string[];
    error?: string;
  }> {
    try {
      if (!this.shouldAutoReply(message)) {
        return { 
          shouldReply: false,
          error: !isOpenAIConfigured() ? "OpenAI not configured" : "Auto-reply not enabled for this platform"
        };
      }

      // Analyze the message first
      const analysis = await analyzeMessage(message.content);
      
      // Skip auto-reply for high urgency or negative sentiment messages
      if (analysis.urgency === 'high' || analysis.sentiment === 'negative') {
        return { 
          shouldReply: false, 
          analysis,
          error: "High urgency or negative sentiment - requires human attention"
        };
      }

      // Generate auto-reply
      const autoReplyResult = await generateAutoReply({
        message: message.content,
        platform: message.platform,
        knowledgeBase: this.settings.knowledgeBase,
        context: {
          userProfile: message.sender
        }
      });

      // Only send reply if confidence is high enough
      if (autoReplyResult.confidence < 0.7) {
        return { 
          shouldReply: false,
          analysis,
          confidence: autoReplyResult.confidence,
          error: "Low confidence - requires human review"
        };
      }

      return {
        shouldReply: true,
        reply: autoReplyResult.reply,
        analysis,
        confidence: autoReplyResult.confidence,
        usedKnowledge: autoReplyResult.usedKnowledge
      };

    } catch (error) {
      console.error("Auto-reply processing failed:", error);
      return { 
        shouldReply: false, 
        error: (error as Error).message 
      };
    }
  }

  async sendAutoReply(message: IncomingMessage, reply: string): Promise<boolean> {
    try {
      // Add delay before sending (simulate human response time)
      if (this.settings.responseDelay && this.settings.responseDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, this.settings.responseDelay! * 1000));
      }

      // In a real implementation, this would call the platform's API
      // For now, we'll simulate sending the reply
      console.log(`Auto-reply sent to ${message.platform}:`, {
        to: message.sender.name,
        reply: reply,
        originalMessage: message.content
      });

      // Log the auto-reply activity
      this.logAutoReplyActivity({
        messageId: message.id,
        platform: message.platform,
        sender: message.sender.name,
        originalMessage: message.content,
        reply: reply,
        timestamp: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error("Failed to send auto-reply:", error);
      return false;
    }
  }

  private logAutoReplyActivity(activity: {
    messageId: string;
    platform: string;
    sender: string;
    originalMessage: string;
    reply: string;
    timestamp: string;
  }) {
    // In production, this would save to database
    console.log("Auto-reply activity:", activity);
  }

  getAutoReplyStats(timeframe: 'day' | 'week' | 'month' = 'day') {
    // Mock stats - in production, this would query the database
    return {
      totalMessages: 45,
      autoReplied: 32,
      humanReviewRequired: 8,
      failed: 5,
      avgConfidence: 0.85,
      avgResponseTime: 25, // seconds
      platformBreakdown: {
        facebook: { total: 20, autoReplied: 15 },
        instagram: { total: 15, autoReplied: 12 },
        twitter: { total: 10, autoReplied: 5 }
      }
    };
  }
}

export const autoReplyService = new AutoReplyService();