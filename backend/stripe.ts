// server/controllers/subscriptionController.ts
import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import * as crypto from "crypto";
import { Subscription } from "./models/Subscription"; // Adjust path
import { User } from "./models/User"; // Adjust path
import Transaction from "./models/Transaction";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// --- Get or Create Internal User + Stripe Customer ---
async function getOrCreateCustomer(customerData: any) {
  const { firstName, lastName, email, phone } = customerData;

  // 1. Find Internal User
  let internalUser = await User.findOne({ where: { email } });

  let userUuid: string;

  if (!internalUser) {
    const temporaryPassword = crypto.randomBytes(32).toString("hex");
    userUuid = crypto.randomBytes(16).toString("hex");

    // ⚠️ Hash password in real apps with bcrypt/argon2
    internalUser = await User.create({
      uuid: userUuid,
      firstName,
      lastName,
      email,
      password: temporaryPassword,
    }) as User;

    console.log(`New user created with UUID: ${userUuid}`);
  } else {
    userUuid = internalUser.uuid; // use existing UUID
  }

  // 2. Find or Create Stripe Customer
  let stripeCustomerId: string;
  const existingStripeCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingStripeCustomers.data.length > 0) {
    stripeCustomerId = existingStripeCustomers.data[0].id;
  } else {
    const customer = await stripe.customers.create({
      email,
      name: `${firstName} ${lastName}`,
      phone,
      metadata: { userUuid }, // store UUID in metadata
    });
    stripeCustomerId = customer.id;
  }

  return {
    stripeCustomerId,
    userUuid, // return UUID
  };
}

// --- Create Subscription ---
export async function createSubscription(req: Request, res: Response) {
  try {
    const { customerData, priceId, trialDays } = req.body;

    if (!customerData || !priceId) {
      return res.status(400).json({ error: "Missing customerData or priceId" });
    }

    // Get or Create User + Stripe Customer
    const { stripeCustomerId, userUuid } = await getOrCreateCustomer(customerData);

    // 1. Create Stripe Subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays,
      payment_behavior: "default_incomplete",
      expand: [
        "latest_invoice.payment_intent",
        "pending_setup_intent",
        "latest_invoice",
      ],
    });

    // 2. Save Subscription in DB
    const currentPeriodEndTimestamp = (subscription.trial_end as number) * 1000;

    const dbSubscription = await Subscription.create({
      user_id: userUuid, // <-- store UUID here
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: subscription.id,
      price_id: priceId,
      status: subscription.status,
      trial_end: new Date(currentPeriodEndTimestamp),
    });

    // 3. Save Initial Transaction
    if (subscription.latest_invoice && typeof subscription.latest_invoice !== "string") {
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent | null;

      await Transaction.create({
        subscription_id: dbSubscription.id,
        stripe_invoice_id: invoice.id,
        stripe_payment_intent_id: paymentIntent ? paymentIntent.id : null,
        amount: invoice.amount_due,
        currency: invoice.currency,
        status: invoice.status,
      });
    }

    // 4. Prepare Client Secret
    let clientSecret: string | null = null;
    let intentType: "payment" | "setup" = "payment";

    if (
      subscription.latest_invoice &&
      typeof subscription.latest_invoice !== "string" &&
      subscription.latest_invoice.payment_intent &&
      typeof subscription.latest_invoice.payment_intent !== "string" &&
      subscription.latest_invoice.payment_intent.client_secret
    ) {
      clientSecret = subscription.latest_invoice.payment_intent.client_secret;
      intentType = "payment";
    } else if (subscription.pending_setup_intent) {
      const setupIntent = subscription.pending_setup_intent as Stripe.SetupIntent;
      clientSecret = setupIntent.client_secret!;
      intentType = "setup";
    }

    res.json({
      subscriptionId: subscription.id,
      customerId: stripeCustomerId,
      clientSecret,
      intentType,
      userUuid, // return UUID to frontend
    });
  } catch (err: any) {
    console.error("Subscription or User creation failed:", err);
    res.status(500).json({
      error: err.message || "An unexpected error occurred during checkout setup.",
    });
  }
}
