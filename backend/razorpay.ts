import { Request, Response } from "express";

// This will be ready when RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are added
let razorpay: any = null;

try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    const Razorpay = require('razorpay');
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (error) {
  console.log('Razorpay not configured - add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable');
}

export async function createRazorpayOrder(req: Request, res: Response) {
  try {
    if (!razorpay) {
      return res.status(400).json({ 
        error: "Razorpay not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables." 
      });
    }

    const { amount = 0, currency = 'INR', customerData } = req.body;

    // For free year access, we create a minimal order for card verification
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        type: 'free_year_signup',
        email: customerData?.email,
        name: `${customerData?.firstName} ${customerData?.lastName}`,
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    res.status(500).json({ 
      error: "Failed to create payment order. Please try again." 
    });
  }
}

export async function verifyRazorpayPayment(req: Request, res: Response) {
  try {
    if (!razorpay) {
      return res.status(400).json({ 
        error: "Razorpay not configured." 
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify payment signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment verified successfully
      res.json({ 
        success: true, 
        message: "Payment verified successfully" 
      });
    } else {
      res.status(400).json({ 
        error: "Payment verification failed" 
      });
    }
  } catch (error: any) {
    console.error('Razorpay payment verification failed:', error);
    res.status(500).json({ 
      error: "Payment verification failed. Please try again." 
    });
  }
}