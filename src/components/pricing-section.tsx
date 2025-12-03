import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, Gift, Zap, Crown, Star } from "lucide-react";
import { Link } from "wouter";

// Features per plan
// NOTE: Update the priceId values when you create new plans in Stripe
// Free Trial plan should be configured in Stripe with:
// - 1-day free trial period
// - $10/day recurring billing after trial
const plans = [
  {
    id: "price_1SaBTZHpVJPrOqLkq7OMZXQ5", // TODO: Update with new Stripe price ID for $10/day plan with 1-day trial
    name: "Free Trial",
    price: "FREE",
    sub: "for 1 day",
    afterTrial: "$10/day after trial",
    highlight: true,
    badge: "TRY FREE",
    features: [
      "1 day free access",
      "All features included",
      "AI-powered post optimization",
      "Advanced analytics",
      "Cancel anytime",
      "No credit card for trial",
    ],
    button: {
      text: "Start Free Trial",
      link: "/checkout?priceId=price_1SaBTZHpVJPrOqLkq7OMZXQ5",
      variant: "primary",
    },
  },
  {
    id: "price_1SB8fMHpVJPrOqLkuXOqCxDa", // Standard plan price ID (monthly)
    name: "Standard",
    price: "$45",
    sub: "/month",
    badge: "MOST POPULAR",
    features: [
      "All features included",
      "Advanced integrations",
      "White-label options", 
      "Custom training",
      "API access",
      "Dedicated account manager"
    ],
    button: {
      text: "Get Standard",
      link: "/checkout?priceId=price_1SB8fMHpVJPrOqLkuXOqCxDa",
      variant: "secondary",
    },
  },
  {
    id: "price_1SB8gBHpVJPrOqLkYOKjHXfT", // Premium plan price ID (monthly)
    name: "Premium",
    price: "$99",
    sub: "/month",
    badge: "Best Value",
    features: [
      "Everything in Standard",
      "White-label options",
      "Dedicated manager",
      "Phone & chat support",
      "API Access",
    ],
    button: {
      text: "Get Premium",
      link: "/checkout?priceId=price_1SB8gBHpVJPrOqLkYOKjHXfT",
      variant: "primary",
    },
  },
  {
    id: "price_1SASUjHpVJPrOqLkHPAJjoNB", // Enterprise plan price ID
    name: "Enterprise",
    price: "Custom",
    sub: "Tailored",
    badge: "Enterprise",
    features: [
      "All Premium features",
      "Unlimited team members",
      "Custom SLA & training",
      "Onboarding assistance",
    ],
    button: {
      text: "Contact Sales",
      link: "/contact",
      variant: "outline",
    },
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50/30"
    >
      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-16 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -8, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl opacity-15 blur-xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-200/50 backdrop-blur-sm mb-8"
          >
            <Gift className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent timezone-font">
              🎉 Limited Time Offer - First 100 Users Only
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 mobile-heading"
          >
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Get Full Access

            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
             Completely Free
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
           The first 100 users get full access to insocialwise for 1 entire year. No credit card required, no hidden fees. Limited spots remaining!
          </motion.p>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`relative overflow-hidden rounded-3xl shadow-xl ${
                  plan.highlight
                    ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white"
                    : "bg-white/90 border border-gray-200"
                }`}
              >
                {plan.badge && (
                  <Badge
                    className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-2 text-sm font-bold shadow-md ${
                      plan.highlight ? "bg-yellow-400 text-white" : "bg-gray-600 text-white"
                    }`}
                  >
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="text-center pt-16 pb-6 relative z-10">
                  <h3
                    className={`text-2xl font-extrabold mt-3 mb-3 ${
                      plan.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span
                      className={`text-5xl font-extrabold ${
                        plan.highlight
                          ? "bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
                          : "text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-lg ${plan.highlight ? "text-yellow-100" : "text-gray-500"}`}
                    >
                      {plan.sub}
                    </span>
                  </div>
                  {plan.afterTrial && (
                    <p className={`text-sm font-medium ${plan.highlight ? "text-yellow-200" : "text-gray-500"}`}>
                      {plan.afterTrial}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="px-6 pb-8 relative z-10">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, i) => (
                      <li
                        key={i}
                        className={`flex items-center ${
                          plan.highlight ? "text-white" : "text-gray-700"
                        }`}
                      >
                        <CheckCircle
                          className={`w-5 h-5 mr-3 ${
                            plan.highlight ? "text-green-300" : "text-green-500"
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.button.link}>
                    <Button
                      size="lg"
                      variant={plan.button.variant === "outline" ? "outline" : "default"}
                      className={`w-full font-bold py-3 rounded-xl ${
                        plan.highlight ? "bg-white text-indigo-600 hover:bg-yellow-50" : ""
                      }`}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {plan.button.text}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust & urgency indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg w-full sm:w-auto mx-auto"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Instant access</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap justify-center gap-3 items-center text-gray-500 mx-auto"
          >
            <span className="text-sm font-medium">Secured & Trusted by</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-indigo-600 font-semibold text-sm">Stripe</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-semibold text-sm">256-bit SSL</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-orange-200/50"
          >
            <div className="flex items-center justify-center space-x-2 text-orange-700">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <span className="font-semibold">Limited Time Offer</span>
           
              <span className="text-orange-600">•</span>
              <span className="text-sm">Spots filling up fast!</span>
             
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}