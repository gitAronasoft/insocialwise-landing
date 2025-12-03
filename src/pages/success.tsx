import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { plans } from "@/components/plans";
import { 
  CheckCircle2, 
  Crown, 
  Calendar, 
  Mail, 
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
  Download
} from "lucide-react";
import { Link, useLocation} from "wouter";

export default function Success() {
    const [plan, setPlan] = useState<any>(null);
  const [, setLocation] = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedPriceId = queryParams.get("priceId");
  const [isAnimating, setIsAnimating] = useState(true);
  const APPURL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Check Your Email",
      description: "We've sent you a welcome email with your login credentials and getting started guide.",
      action: "Expected within 5 minutes"
    },
    {
      icon: <Download className="w-6 h-6 text-green-500" />,
      title: "Download Mobile App",
      description: "Get the insocialwise mobile app for iOS and Android to manage on the go.",
      action: "Available in app stores"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Join Community",
      description: "Connect with other entrepreneurs in our exclusive Slack community.",
      action: "Invitation in welcome email"
    },
    {
      icon: <Calendar className="w-6 h-6 text-orange-500" />,
      title: "Free Onboarding Call",
      description: "Schedule a 30-minute call with our expert team to set up your accounts.",
      action: "Book using the link in your email"
    }
  ];

  // const features = [
  //   "All social media platforms connected",
  //   "AI content generator activated",
  //   "Analytics dashboard enabled",
  //   "Team collaboration tools ready",
  //   "Priority support activated",
  //   "Advanced scheduling features unlocked"
  // ];

useEffect(() => {
  if (selectedPriceId) {
    const matchedPlan = plans.find((p) => p.id === selectedPriceId);
    if (matchedPlan) {
      setPlan(matchedPlan);
    }
  }
}, [selectedPriceId]);

const features = plan?.features || [
  "All social media platforms connected",
  "AI content generator activated",
  "Analytics dashboard enabled",
  "Team collaboration tools ready",
  "Priority support activated",
  "Advanced scheduling features unlocked"
];

// const monthlyPrice = Number(plan?.price?.replace("$", "")) || 0;
// console.log(monthlyPrice);
// const totalMonths = plan?.totalMonths || 12;
// console.log(totalMonths);
// const monthlySavings = plan?.savings || 200;
// console.log(monthlySavings);
// const totalValue = monthlySavings * totalMonths;
// console.log(totalValue);

function handleRedirect() {
  const token = queryParams.get("token");
  if (APPURL && token) {
    window.open(`${APPURL}/onboarding?token=${token}`, '_blank');
  } else if (APPURL) {
    window.open(`${APPURL}/onboarding`, '_blank');
  } else {
    console.warn("App URL not configured. Please set VITE_API_URL environment variable.");
  }
}

const monthlyPrice = plan?.price 
  ? Number(plan.price.replace("$", "")) 
  : 0;
const totalMonths = plan?.totalMonths || 12;
const monthlySavings = plan?.savings || 200;
const totalValue = monthlySavings * totalMonths;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Animated Success Header */}
      <div className="pt-12 pb-8">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              type: "spring",
              bounce: 0.4 
            }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-6 shadow-2xl"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mobile-heading "
          >
            Welcome to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">insocialwise!</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            🎉 Congratulations! Your free year of premium access has been secured. You're now part of an exclusive group of entrepreneurs.
          </motion.p>

          {/* Free Year Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 text-lg font-semibold mb-4 custom-font-mobile"
          >
            {/* <Crown className="w-6 h-6 mr-2" />
            FREE until {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} */}
             <Crown className="w-6 h-6 mr-2" />
                FREE until {new Date(Date.now() + ((plan?.freeDays || 30) * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left Side - What's Activated */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 h3-mobile-heading">Your Account is Active!</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  All premium features have been activated for your account. Here's what's ready to use:
                </p>

                <div className="space-y-4">
                  {features.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800">Total Value: $2,400</span>
                  </div>
                  <p className="text-indigo-700 text-sm">
                    You're saving $200/month for 12 months with this exclusive offer.
                  </p>

                </div> */}

                {/* <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800">
                      Total Value: ${totalValue.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-indigo-700 text-sm">
                    You're saving ${monthlySavings}/month for {totalMonths} months with this exclusive offer.
                  </p>
                </div> */}

                <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
  {/* Plan Name and Badge */}
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center space-x-2">
      <Shield className="w-5 h-5 text-indigo-600" />
      <span className="font-semibold text-indigo-800 text-lg">{plan?.name}</span>
    </div>
    {plan?.badge && (
      <span className="px-2 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800">
        {plan.badge}
      </span>
    )}
  </div>

  {/* Price Paid */}
  <p className="text-indigo-700 font-semibold mb-2">
    You Paid: ${monthlyPrice}{plan?.sub || "/month"}
  </p>

  {/* Total Value / Savings */}
  <div className="mt-2">
    <p className="text-indigo-700 text-sm mb-1">
      Total Value: ${totalValue.toLocaleString()}
    </p>
    <p className="text-indigo-700 text-sm">
      You're saving ${monthlySavings}/month for {totalMonths} months with this exclusive offer.
    </p>
  </div>
</div>


              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Next Steps</h2>
            
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              >
                <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <span className="inline-flex items-center text-sm text-indigo-600 font-medium">
                          {step.action}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="space-y-4 pt-6"
            >
              <Button onClick={handleRedirect}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300"
                data-testid="button-access-dashboard"
              >
                <Zap className="w-5 h-5 mr-2" />
                Access Your Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 py-4 text-lg rounded-xl transition-all duration-300 mt-4"
                >
                  Return to Homepage
                </Button>
              </Link>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Need Help?</span>
              </div>
              <p className="text-blue-700 text-sm">
                Our support team is available 24/7 to help you get started. 
                Email us at <strong>support@insocialwise.com</strong> or use the chat widget.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              y: -100,
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Star className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}