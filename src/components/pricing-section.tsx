import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus } from "lucide-react";
import { Link } from "wouter";
import { PricingSectionSkeleton } from "@/components/ui/skeleton";
import {
  plansApi,
  transformPlanFromAPI,
  type DisplayPlan,
  type PlanFromAPI,
} from "@/lib/api-service";

function formatPrice(price: number, currency: string): string {
  if (price === 0) return "Custom";

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
}

type LoadingState = "loading" | "success" | "error" | "empty";

export default function PricingSection() {
  const [plans, setPlans] = useState<DisplayPlan[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [isYearly, setIsYearly] = useState(false);

  const fetchPlans = useCallback(async () => {
    setLoadingState("loading");

    try {
      const response = await plansApi.getPublicPlans();

      if (response.success && response.data && response.data.length > 0) {
        const transformedPlans = response.data.map(transformPlanFromAPI);
        setPlans(transformedPlans);
        setLoadingState("success");
      } else if (
        response.success &&
        (!response.data || response.data.length === 0)
      ) {
        setLoadingState("empty");
      } else {
        setLoadingState("error");
      }
    } catch {
      setLoadingState("error");
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (loadingState === "error" || loadingState === "empty") {
    return null;
  }

  const gridCols =
    plans.length <= 2
      ? "md:grid-cols-2"
      : plans.length === 3
        ? "lg:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  const maxYearlySavings = plans.reduce((maxSavings, plan) => {
    if (plan.monthlyPrice > 0 && plan.yearlyPrice > 0) {
      const monthlyTotal = plan.monthlyPrice * 12;
      const savings = ((monthlyTotal - plan.yearlyPrice) / monthlyTotal) * 100;
      return Math.max(maxSavings, Math.round(savings));
    }
    return maxSavings;
  }, 0);

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-16 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -8, 0], scale: [1, 0.8, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl opacity-15 blur-xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            Choose Your Plan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Start with a free 14-day trial. Credit card required to begin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-8"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isYearly
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                isYearly
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
              {maxYearlySavings > 0 && (
                <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">
                  Save up to {maxYearlySavings}%
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>

        {loadingState === "loading" ? (
          <PricingSectionSkeleton />
        ) : (
          <div className={`grid ${gridCols} gap-6 max-w-6xl mx-auto`}>
            {plans.map((plan, idx) => {
              const displayPrice = isYearly
                ? plan.yearlyPrice / 12
                : plan.monthlyPrice;

              const priceId = isYearly
                ? plan.stripeYearlyPriceId
                : plan.stripePriceId;

              const buttonLink = plan.isContactOnly
                ? "/contact"
                : priceId
                  ? `/checkout?priceId=${priceId}`
                  : "/contact";

              const buttonText = plan.isContactOnly
                ? "Request a Demo"
                : plan.trialEnabled && plan.trialDays
                  ? `Free ${plan.trialDays}-day trial`
                  : `Get ${plan.name}`;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 text-sm font-semibold shadow-lg">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={`relative overflow-hidden rounded-2xl h-full ${
                      plan.highlight
                        ? "border-2 border-indigo-500 shadow-xl bg-white"
                        : "border border-gray-200 shadow-lg bg-white"
                    }`}
                  >
                    <CardHeader className="pt-8 pb-4 px-6 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {plan.name}
                      </h3>

                      <div className="flex items-baseline mb-2">
                        {plan.isContactOnly ? (
                          <span className="text-3xl font-bold text-gray-900">
                            Custom
                          </span>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-gray-900">
                              {formatPrice(displayPrice, plan.currency)}
                            </span>
                            <span className="text-gray-500 ml-1">
                              per user/mo*
                            </span>
                          </>
                        )}
                      </div>

                      {!plan.isContactOnly && (
                        <Link href={buttonLink}>
                          <Button
                            size="lg"
                            className={`w-full font-semibold py-3 rounded-lg mt-4 ${
                              plan.highlight || plan.trialEnabled
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                : "bg-gray-900 hover:bg-gray-800 text-white"
                            }`}
                          >
                            {buttonText}
                          </Button>
                        </Link>
                      )}

                      {plan.isContactOnly && (
                        <Link href={buttonLink}>
                          <Button
                            size="lg"
                            variant="outline"
                            className="w-full font-semibold py-3 rounded-lg mt-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-100"
                          >
                            {buttonText}
                          </Button>
                        </Link>
                      )}

                      {plan.trialEnabled &&
                        plan.trialDays &&
                        !plan.isContactOnly &&
                        plan.skipTrialDiscountEnabled && (
                          <button className="w-full text-center text-sm text-indigo-600 font-medium mt-2 hover:underline">
                            Skip trial, get {plan.skipTrialDiscountPercent}%
                            off*
                          </button>
                        )}
                    </CardHeader>

                    <CardContent className="px-6 py-6">
                      {plan.inheritText && (
                        <p className="text-gray-700 font-semibold mb-4">
                          {plan.inheritText}
                        </p>
                      )}

                      {!plan.inheritText && !plan.isContactOnly && (
                        <p className="text-gray-700 font-semibold mb-4">
                          Features included:
                        </p>
                      )}

                      {plan.isContactOnly && !plan.inheritText && (
                        <p className="text-gray-700 font-semibold mb-4">
                          Everything in Growth, PLUS:
                        </p>
                      )}

                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start text-gray-700"
                          >
                            {plan.isContactOnly ? (
                              <Plus className="w-5 h-5 mr-3 flex-shrink-0 text-indigo-600 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 text-indigo-600 mt-0.5" />
                            )}
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.isContactOnly && (
                        <>
                          <p className="text-gray-700 font-semibold mt-6 mb-4">
                            Maximize performance with:
                          </p>
                          <ul className="space-y-3">
                            <li className="flex items-start text-gray-700">
                              <Plus className="w-5 h-5 mr-3 flex-shrink-0 text-indigo-600 mt-0.5" />
                              <span className="text-sm">
                                Employee Advocacy (Amplify)
                              </span>
                            </li>
                            <li className="flex items-start text-gray-700">
                              <Plus className="w-5 h-5 mr-3 flex-shrink-0 text-indigo-600 mt-0.5" />
                              <span className="text-sm">
                                Listening powered by Talkwalker
                              </span>
                            </li>
                            <li className="flex items-start text-gray-700">
                              <Plus className="w-5 h-5 mr-3 flex-shrink-0 text-indigo-600 mt-0.5" />
                              <span className="text-sm">
                                Advanced Analytics
                              </span>
                            </li>
                            <li className="flex items-start text-gray-700">
                              <Plus className="w-5 h-5 mr-3 flex-shrink-0 text-indigo-600 mt-0.5" />
                              <span className="text-sm">Advanced Inbox</span>
                            </li>
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {loadingState === "success" && plans.length > 0 && (
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
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg w-full sm:w-auto mx-auto"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  14-day free trial
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Cancel anytime
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Instant access
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 items-center text-gray-500 mx-auto"
            >
              <span className="text-sm font-medium">Secured & Trusted by</span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-indigo-600 font-semibold text-sm">
                  Stripe
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-semibold text-sm">
                  256-bit SSL
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
