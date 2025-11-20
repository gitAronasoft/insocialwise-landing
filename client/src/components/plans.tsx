// src/data/plans.js
// export const plans = [
//   {
//     id: "price_1SB8eaHpVJPrOqLk3gNsUxe6",
//     name: "Free Trial",
//     features: [
//       "Unlimited social accounts",
//       "Advanced analytics & reporting",
//       "AI-powered post optimization",
//       "Team collaboration tools",
//       "24/7 priority support",
//       "Ad campaign management",
//     ],
//   },
//   {
//     id: "price_1SB8fMHpVJPrOqLkuXOqCxDa",
//     name: "Standard",
//     features: [
//       "Everything in Trial",
//       "Custom integrations",
//       "5 Team seats",
//       "Priority email support",
//     ],
//   },
//   // ...Premium, Enterprise etc.
// ];


export const plans = [
  {
    id: "price_1SB8eaHpVJPrOqLk3gNsUxe6", // free trial price ID
    name: "Free Trial",
    price: "0",
    sub: "/day",
    freeDays: 30,
    highlight: true,
    badge: "LIMITED OFFER",
      features: [
      "Unlimited social accounts",
      "Advanced analytics & reporting",
      "AI-powered post optimization",
      "Team collaboration tools",
      "24/7 priority support",
      "Ad campaign management",
    ],
  },
  {
    id: "price_1SB8fMHpVJPrOqLkuXOqCxDa", // standard plan price ID
    name: "Standard",
    price: "45",
    sub: "/month",
    freeDays: 30,
    badge: "MOST POPULAR",
   features: [
     "All features included",
      "Advanced integrations",
      "White-label options", 
      "Custom training",
      "API access",
      "Dedicated account manager"
    ],
  },
  {
    id: "price_1SB8gBHpVJPrOqLkYOKjHXfT", // Pro plan price ID
    name: "Premium",
    price: "99",
    sub: "/month",
    freeDays: 30,
    badge: "Best Value",
    features: [
      "Everything in Basic",
      "White-label options",
      "Dedicated manager",
      "Phone & chat support",
      "API Access",
    ],
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
  },
];
