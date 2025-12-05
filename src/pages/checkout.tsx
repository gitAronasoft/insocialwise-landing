import { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Crown,
  Shield,
  CheckCircle2,
  CreditCard,
  ArrowLeft,
  Star,
  Zap,
  Lock,
  Globe,
  Wallet,
  Users,
  BarChart,
  Headphones,
  Cpu,
  Gift,
  Check,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  useStripe,
  Elements,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const formatPhoneNumber = (value: string): string => {
  const phoneNumber = value.replace(/\D/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

// Initialize Stripe outside of component to avoid recreating on every render
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const customerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters with letters and numbers")
    .max(100),
});

type CustomerForm = z.infer<typeof customerSchema>;

// Stripe Checkout Form Component
const StripeCheckoutForm = ({
  customerData,
  onSuccess,
  onError,
  clientSecret,
}: {
  customerData: CustomerForm;
  onSuccess: (pm: string) => void;
  onError: (error: string) => void;
  clientSecret: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardSubmit = async () => {
    if (!stripe || !elements) {
      onError("Payment system not ready. Please refresh and try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href,
          payment_method_data: {
            billing_details: {
              name: `${customerData.firstName} ${customerData.lastName}`,
              email: customerData.email,
              phone: customerData.phone,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        onError(error.message || "Subscription payment failed");
      } else if (setupIntent && setupIntent.status === "succeeded") {
        const pm = setupIntent.payment_method;
        console.log("Payment method:", pm);
        if (!pm) {
          onError("Stripe did not return a payment method. Please try again.");
          return;
        }
        // pm can be a string (payment method id) or a PaymentMethod object; normalize to an ID string
        const paymentMethodId =
          typeof pm === "string" ? pm : (pm.id ?? undefined);
        if (!paymentMethodId) {
          onError("Unable to determine payment method ID. Please try again.");
          return;
        }
        onSuccess(paymentMethodId);
      } else {
        onError("Payment incomplete. Please try again.");
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-4">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Card Details
        </Label>
        <PaymentElement
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: `${customerData.firstName} ${customerData.lastName}`,
                email: customerData.email,
                phone: customerData.phone,
              },
            },
          }}
        />
      </div>

      <Button
        type="button"
        onClick={handleCardSubmit}
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50"
        data-testid="button-complete-payment"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Complete Payment Setup</span>
          </div>
        )}
      </Button>
    </div>
  );
};

// Razorpay Checkout Form Component
// const RazorpayCheckoutForm = ({ customerData, onSuccess, onError, selectedPlan }: {
//   customerData: CustomerForm;
//   onSuccess: () => void;
//   onError: (error: string) => void;
//   selectedPlan: any;
// }) => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleRazorpayPayment = async () => {
//     setIsProcessing(true);

//     try {
//       // Load Razorpay script
//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded) {
//         onError("Failed to load Razorpay. Please try again.");
//         return;
//       }

//       // Create order on backend
//       const response = await fetch('/api/payment/razorpay/create-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customerData,
//           priceId: selectedPlan.id,
//           amount: selectedPlan.price === 'Custom' ? 0 : parseInt(selectedPlan.price.replace('$', '')) * 100, // Convert to paise
//           currency: 'INR'
//         })
//       });

//       const orderData = await response.json();

//       if (!response.ok) {
//         if (orderData.error && orderData.error.includes('not configured')) {
//           // Demo mode - simulate successful payment
//           setTimeout(() => {
//             onSuccess();
//           }, 1000);
//           return;
//         }
//         throw new Error(orderData.error || 'Failed to create order');
//       }

//       // Initialize Razorpay payment
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: 'insocialwise',
//         description: `${selectedPlan.name} Plan Subscription`,
//         order_id: orderData.id,
//         prefill: {
//           name: `${customerData.firstName} ${customerData.lastName}`,
//           email: customerData.email,
//           contact: customerData.phone,
//         },
//         theme: {
//           color: '#6366f1',
//         },
//         handler: function (response: any) {
//           // Verify payment on backend
//           fetch('/api/payment/razorpay/verify-payment', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               customerData,
//             }),
//           })
//           .then(res => res.json())
//           .then(data => {
//             if (data.success) {
//               onSuccess();
//             } else {
//               onError('Payment verification failed');
//             }
//           })
//           .catch(() => {
//             onError('Payment verification failed');
//           });
//         },
//         modal: {
//           ondismiss: function() {
//             setIsProcessing(false);
//           }
//         }
//       };

//       const razorpay = new (window as any).Razorpay(options);
//       razorpay.open();

//     } catch (error) {
//       onError(error instanceof Error ? error.message : "Payment failed");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//             <Wallet className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900">Razorpay Payment</h3>
//             <p className="text-sm text-gray-600">Secure payment with UPI, Cards, Net Banking & more</p>
//           </div>
//         </div>

//         <div className="space-y-3 text-sm text-gray-600">
//           <div className="flex items-center space-x-2">
//             <CheckCircle2 className="w-4 h-4 text-green-500" />
//             <span>UPI, Credit/Debit Cards, Net Banking</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <CheckCircle2 className="w-4 h-4 text-green-500" />
//             <span>Instant payment confirmation</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <CheckCircle2 className="w-4 h-4 text-green-500" />
//             <span>Bank-level security</span>
//           </div>
//         </div>
//       </div>

//       <Button
//         type="button"
//         onClick={handleRazorpayPayment}
//         disabled={isProcessing}
//         className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50"
//       >
//         {isProcessing ? (
//           <div className="flex items-center space-x-2">
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             <span>Processing...</span>
//           </div>
//         ) : (
//           <div className="flex items-center space-x-2">
//             <Wallet className="w-5 h-5" />
//             <span>Pay with Razorpay</span>
//           </div>
//         )}
//       </Button>
//     </div>
//   );
// };

interface PlanFromAPI {
  id: number;
  name: string;
  stripe_price_id: string | null;
  stripe_yearly_price_id: string | null;
  price: string;
  monthly_price_usd: string;
  yearly_price_usd: string | null;
  monthly_price_inr: string | null;
  yearly_price_inr: string | null;
  yearly_price: string | null;
  yearly_discount_percent: number;
  currency: string;
  billing_cycle: string;
  features: string[] | string | null;
  display_features: string[] | string | null;
  description: string | null;
  trial_period_days: number | null;
  trial_enabled: boolean;
  is_contact_only: boolean;
}

interface DisplayPlan {
  id: string;
  name: string;
  price: string;
  priceAmount: number;
  sub: string;
  trialDays: number;
  features: string[];
  currency: string;
  isYearly: boolean;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedPriceId = queryParams.get("priceId");

  const [selectedPayment, setSelectedPayment] = useState<"stripe" | null>(
    "stripe",
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [showRazorpayForm, setShowRazorpayForm] = useState(false);
  const [stripeCustomerId, setStripeCustomerId] = useState("");
  const [userUUID, setUserUUID] = useState("");
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [setupIntentPaymentMethod, setSetupIntentPaymentMethod] = useState<
    string | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DisplayPlan | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);

  const { toast } = useToast();

  const form = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    async function fetchPlanData() {
      if (!selectedPriceId) {
        setLoadingPlan(false);
        return;
      }

      try {
        const response = await fetch('/api/plans/public');
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          const plan = data.data.find((p: PlanFromAPI) => 
            p.stripe_price_id === selectedPriceId || p.stripe_yearly_price_id === selectedPriceId
          );
          
          if (plan) {
            const isYearlyPrice = plan.stripe_yearly_price_id === selectedPriceId;
            
            let parsedFeatures: string[] = [];
            if (plan.display_features) {
              if (typeof plan.display_features === 'string') {
                try {
                  parsedFeatures = JSON.parse(plan.display_features);
                } catch (e) {
                  parsedFeatures = [];
                }
              } else if (Array.isArray(plan.display_features)) {
                parsedFeatures = plan.display_features;
              }
            }
            
            if (parsedFeatures.length === 0 && plan.features) {
              if (typeof plan.features === 'string') {
                try {
                  parsedFeatures = JSON.parse(plan.features);
                } catch (e) {
                  parsedFeatures = [];
                }
              } else if (Array.isArray(plan.features)) {
                parsedFeatures = plan.features;
              }
            }

            const isINR = plan.currency === 'INR';
            
            const monthlyPrice = isINR
              ? (plan.monthly_price_inr ? parseFloat(plan.monthly_price_inr) : parseFloat(plan.price))
              : (plan.monthly_price_usd ? parseFloat(plan.monthly_price_usd) : parseFloat(plan.price));
            
            const yearlyPrice = isINR
              ? (plan.yearly_price_inr ? parseFloat(plan.yearly_price_inr) : monthlyPrice * 12)
              : (plan.yearly_price_usd ? parseFloat(plan.yearly_price_usd) : plan.yearly_price ? parseFloat(plan.yearly_price) : monthlyPrice * 12);
            
            const displayPrice = isYearlyPrice ? yearlyPrice : monthlyPrice;
            const currencySymbol = isINR ? '₹' : '$';
            
            const planId = isYearlyPrice 
              ? (plan.stripe_yearly_price_id || selectedPriceId) 
              : (plan.stripe_price_id || selectedPriceId || `plan-${plan.id}`);

            setSelectedPlan({
              id: planId,
              name: plan.name,
              price: `${currencySymbol}${Math.round(displayPrice).toLocaleString()}`,
              priceAmount: Math.round(displayPrice),
              sub: isYearlyPrice ? '/year' : '/month',
              trialDays: plan.trial_period_days || 0,
              features: parsedFeatures,
              currency: plan.currency || 'USD',
              isYearly: isYearlyPrice,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching plan:', err);
      } finally {
        setLoadingPlan(false);
      }
    }

    fetchPlanData();
  }, [selectedPriceId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loadingPlan && !selectedPlan && selectedPriceId) {
      toast({
        title: "Plan Not Found",
        description:
          "The selected plan is no longer available. Taking you back to view our current plans.",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    }
  }, [selectedPlan, loadingPlan, selectedPriceId, setLocation, toast]);

  const handleStripeSetup = async (data: CustomerForm) => {
    if (!selectedPlan) {
      handleStripeError("Invalid plan selected.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await api("/payment/create-subscription", {
        // const response = await fetch(`${BACKEND_URL}/api/payment/create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerData: data,
          priceId: selectedPlan.id, // Use the dynamically selected priceId
          trial_end: selectedPlan.trialDays, // pass trial info
        }),
      });

      if (response.success) {
        setStripeCustomerId(response.stripeCustomerId);
        setUserUUID(response.user_uuid);
        setClientSecret(response.clientSecret);
        setSubscriptionId(response.subscriptionId);
        setShowStripeForm(true);
        toast({
          title: "Account Created Successfully",
          description:
            "Please complete your payment details to activate your subscription.",
        });
      } else {
        toast({
          title: "Unable to Process Request",
          description:
            response.error ||
            "We couldn't create your subscription. Please try again or contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Issue",
        description:
          "Unable to reach our servers. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // const handleStripeSuccess = () => {
  //   toast({
  //     title: "Payment Setup Complete",
  //     description: "Your access has been secured successfully!",
  //   });
  //   // setTimeout(() => {
  //   //   window.location.href = `/success?priceId=${selectedPlan?.id}`;
  //   // }, 1500);
  // };

  const handleStripeSuccess = async (payment_method: string) => {
    try {
      const result = await api("/payment/confirm", {
        method: "POST",
        body: JSON.stringify({
          user_uuid: userUUID,
          subscriptionId: subscriptionId,
          // stripeCustomerId: stripeCustomerId,
          // priceId: `${selectedPlan?.id}`,
          // payment_method: payment_method
        }),
      });

      if (result.success) {
        toast({
          title: "Payment Successful",
          description:
            "Your subscription is now active. Setting up your dashboard...",
        });

        setTimeout(() => {
          window.location.href = `/success?priceId=${selectedPlan?.id}&token=${result?.user_uuid}`;
        }, 800);
      } else {
        toast({
          title: "Activation Failed",
          description:
            result.error ||
            "We couldn't activate your subscription. Please contact support if this persists.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Issue",
        description:
          "Unable to complete the activation. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const handleStripeError = (error: string) => {
    toast({
      title: "Payment Could Not Be Processed",
      description: error || "Please verify your card details and try again.",
      variant: "destructive",
    });
  };

  const handlePayment = async (data: CustomerForm) => {
    if (!selectedPayment) {
      toast({
        title: "Payment Method Required",
        description: "Please select how you'd like to pay before continuing.",
        variant: "destructive",
      });
      return;
    }

    // if (selectedPayment === 'stripe') {
    //   await handleStripeSetup(data);
    // } else if (selectedPayment === 'razorpay') {
    //   setShowRazorpayForm(true);
    // }

    await handleStripeSetup(data);
  };

  // const handleRazorpaySuccess = () => {
  //   toast({
  //     title: "Payment Successful",
  //     description: "Your subscription has been activated successfully!",
  //   });
  //   setTimeout(() => {
  //     window.location.href = '/success';
  //   }, 1500);
  // };

  // const handleRazorpayError = (error: string) => {
  //   toast({
  //     title: "Payment Failed",
  //     description: error,
  //     variant: "destructive",
  //   });
  //   setShowRazorpayForm(false);
  // };

  // const benefits = [
  //   {
  //     icon: <Crown className="w-6 h-6 text-yellow-500" />,
  //     title: "Complete Social Media Management Suite",
  //     description: "Manage all your social platforms from one powerful dashboard"
  //   },
  //   {
  //     icon: <Zap className="w-6 h-6 text-indigo-500" />,
  //     title: "AI-Powered Content Creation",
  //     description: "Generate engaging posts with advanced AI technology"
  //   },
  //   {
  //     icon: <Globe className="w-6 h-6 text-green-500" />,
  //     title: "Multi-Platform Publishing",
  //     description: "Post to Instagram, Facebook, Twitter, LinkedIn simultaneously"
  //   },
  //   {
  //     icon: <Star className="w-6 h-6 text-purple-500" />,
  //     title: "Advanced Analytics & Insights",
  //     description: "Track performance and optimize your social media strategy"
  //   },
  //   {
  //     icon: <Shield className="w-6 h-6 text-blue-500" />,
  //     title: "Priority Support & Training",
  //     description: "Get exclusive access to our expert team and resources"
  //   },
  // ];

  //   const benefitsByPlan: Record<string, { icon: JSX.Element; title: string; description: string }[]> = {
  //   "price_1SB8eaHpVJPrOqLk3gNsUxe6": [ // Free Trial
  //     {
  //       icon: <Zap className="w-6 h-6 text-indigo-500" />,
  //       title: "Basic Access",
  //       description: "Try the essentials of our platform risk-free for 1 day."
  //     },
  //     {
  //       icon: <Globe className="w-6 h-6 text-green-500" />,
  //       title: "Multi-Platform Posting",
  //       description: "Publish to all major social platforms."
  //     }
  //   ],
  //   "price_1SB8fMHpVJPrOqLkuXOqCxDa": [ // Standard
  //     {
  //       icon: <Zap className="w-6 h-6 text-indigo-500" />,
  //       title: "AI Content Suggestions",
  //       description: "Smart AI to help you plan and schedule posts."
  //     },
  //     {
  //       icon: <Star className="w-6 h-6 text-purple-500" />,
  //       title: "Analytics Dashboard",
  //       description: "Track engagement and optimize strategies."
  //     }
  //   ],
  //   "price_1SB8gBHpVJPrOqLkYOKjHXfT": [ // Premium
  //     {
  //       icon: <Crown className="w-6 h-6 text-yellow-500" />,
  //       title: "Full Suite",
  //       description: "Unlock our entire social management toolkit."
  //     },
  //     {
  //       icon: <Shield className="w-6 h-6 text-blue-500" />,
  //       title: "Priority Support",
  //       description: "Dedicated support and 1-on-1 onboarding."
  //     },
  //     {
  //       icon: <Star className="w-6 h-6 text-purple-500" />,
  //       title: "Advanced Insights",
  //       description: "Deep dive reports and recommendations."
  //     }
  //   ],
  //   "price_1SASUjHpVJPrOqLkHPAJjoNB": [ // Enterprise
  //     {
  //       icon: <Crown className="w-6 h-6 text-yellow-500" />,
  //       title: "Custom Solutions",
  //       description: "Tailored features designed for your business needs."
  //     },
  //     {
  //       icon: <Shield className="w-6 h-6 text-blue-500" />,
  //       title: "Dedicated Manager",
  //       description: "Personal account manager for ongoing support."
  //     }
  //   ],
  // };
  // const benefitsByPlan: Record<
  //   string,
  //   { icon: JSX.Element; title: string; description: string }[]
  // > = {
  //   "price_1SB8eaHpVJPrOqLk3gNsUxe6": [
  //     {
  //       icon: <Zap className="w-6 h-6 text-indigo-500" />,
  //       title: "Unlimited Accounts",
  //       description: "Connect all your social profiles without restrictions.",
  //     },
  //     {
  //       icon: <BarChart className="w-6 h-6 text-green-500" />,
  //       title: "Analytics & Reporting",
  //       description: "Track performance with basic insights and metrics.",
  //     },
  //     {
  //       icon: <Cpu className="w-6 h-6 text-pink-500" />,
  //       title: "AI Post Optimization",
  //       description: "Leverage AI to optimize your post timings and reach.",
  //     },
  //   ],

  //   "price_1SB8fMHpVJPrOqLkuXOqCxDa": [
  //     {
  //       icon: <Star className="w-6 h-6 text-purple-500" />,
  //       title: "Everything in Trial",
  //       description: "Includes all features of the Free Trial plan.",
  //     },
  //     {
  //       icon: <Globe className="w-6 h-6 text-green-500" />,
  //       title: "Custom Integrations",
  //       description: "Seamlessly connect with your existing tools and workflows.",
  //     },
  //     {
  //       icon: <Users className="w-6 h-6 text-blue-500" />,
  //       title: "5 Team Seats",
  //       description: "Collaborate efficiently with your teammates.",
  //     },
  //     {
  //       icon: <Headphones className="w-6 h-6 text-indigo-500" />,
  //       title: "Priority Email Support",
  //       description: "Faster response times through email assistance.",
  //     },
  //   ],

  //   "price_1SB8gBHpVJPrOqLkYOKjHXfT": [
  //     {
  //       icon: <Crown className="w-6 h-6 text-yellow-500" />,
  //       title: "Everything in Standard",
  //       description: "Includes all features of the Standard plan.",
  //     },
  //     {
  //       icon: <Shield className="w-6 h-6 text-blue-500" />,
  //       title: "White-label Options",
  //       description: "Brand the platform as your own for clients.",
  //     },
  //     {
  //       icon: <Users className="w-6 h-6 text-pink-500" />,
  //       title: "Dedicated Manager",
  //       description: "Get expert guidance with a dedicated account manager.",
  //     },
  //     {
  //       icon: <Headphones className="w-6 h-6 text-indigo-500" />,
  //       title: "Phone & Chat Support",
  //       description: "Get help instantly with real-time support channels.",
  //     },
  //     {
  //       icon: <Zap className="w-6 h-6 text-green-500" />,
  //       title: "API Access",
  //       description: "Integrate programmatically with our robust API.",
  //     },
  //   ],

  //   "price_1SASUjHpVJPrOqLkHPAJjoNB": [
  //     {
  //       icon: <Crown className="w-6 h-6 text-yellow-500" />,
  //       title: "All Premium Features",
  //       description: "Includes every capability from the Premium plan.",
  //     },
  //     {
  //       icon: <Users className="w-6 h-6 text-pink-500" />,
  //       title: "Unlimited Team Members",
  //       description: "Scale collaboration without limits.",
  //     },
  //     {
  //       icon: <Shield className="w-6 h-6 text-blue-500" />,
  //       title: "Custom SLA & Training",
  //       description: "Enterprise-grade support and tailored onboarding.",
  //     },
  //     {
  //       icon: <Zap className="w-6 h-6 text-indigo-500" />,
  //       title: "Onboarding Assistance",
  //       description: "Hands-on guidance to get your team up to speed.",
  //     },
  //   ],
  // };

  const benefitsByPlan: Record<
    string,
    { icon: JSX.Element; title: string; description: string }[]
  > = {
    price_1SB8eaHpVJPrOqLk3gNsUxe6: [
      // Free Trial
      {
        icon: <Zap className="w-6 h-6 text-indigo-500" />,
        title: "Unlimited Social Accounts",
        description: "Connect all your social profiles without restrictions.",
      },
      {
        icon: <BarChart className="w-6 h-6 text-green-500" />,
        title: "Advanced Analytics & Reporting",
        description: "Track performance with basic insights and metrics.",
      },
      {
        icon: <Cpu className="w-6 h-6 text-pink-500" />,
        title: "AI-powered Post Optimization",
        description: "Leverage AI to optimize your post timings and reach.",
      },
      {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "Team Collaboration Tools",
        description: "Work with your team efficiently on all campaigns.",
      },
      {
        icon: <Headphones className="w-6 h-6 text-indigo-500" />,
        title: "24/7 Priority Support",
        description: "Get help whenever you need it, any time of day.",
      },
      {
        icon: <Gift className="w-6 h-6 text-yellow-500" />,
        title: "Ad Campaign Management",
        description: "Manage and optimize your advertising campaigns.",
      },
    ],

    price_1SB8fMHpVJPrOqLkuXOqCxDa: [
      // Standard
      {
        icon: <Star className="w-6 h-6 text-purple-500" />,
        title: "All Features of Free Trial",
        description: "Includes everything from the Free Trial plan.",
      },
      {
        icon: <Globe className="w-6 h-6 text-green-500" />,
        title: "Advanced Integrations",
        description: "Seamlessly connect with external tools and services.",
      },
      {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "Team Collaboration",
        description: "Work with your team efficiently with 5 seats included.",
      },
      {
        icon: <Cpu className="w-6 h-6 text-pink-500" />,
        title: "White-label Options",
        description: "Brand the platform as your own for clients.",
      },
      {
        icon: <Headphones className="w-6 h-6 text-indigo-500" />,
        title: "Custom Training",
        description: "Get personalized training for your team.",
      },
      {
        icon: <Zap className="w-6 h-6 text-green-500" />,
        title: "API Access",
        description: "Integrate programmatically with our API.",
      },
      {
        icon: <Crown className="w-6 h-6 text-yellow-500" />,
        title: "Dedicated Account Manager",
        description: "Receive dedicated support and guidance.",
      },
    ],

    price_1SB8gBHpVJPrOqLkYOKjHXfT: [
      // Premium
      {
        icon: <Star className="w-6 h-6 text-purple-500" />,
        title: "Everything in Standard",
        description: "Includes all features from the Standard plan.",
      },
      {
        icon: <Cpu className="w-6 h-6 text-pink-500" />,
        title: "White-label Options",
        description: "Brand the platform as your own for clients.",
      },
      {
        icon: <Users className="w-6 h-6 text-blue-500" />,
        title: "Dedicated Manager",
        description: "Get expert guidance with a dedicated account manager.",
      },
      {
        icon: <Headphones className="w-6 h-6 text-indigo-500" />,
        title: "Phone & Chat Support",
        description: "Instant help through real-time channels.",
      },
      {
        icon: <Zap className="w-6 h-6 text-green-500" />,
        title: "API Access",
        description: "Integrate programmatically with our API.",
      },
    ],

    price_1SASUjHpVJPrOqLkHPAJjoNB: [
      // Enterprise
      {
        icon: <Star className="w-6 h-6 text-purple-500" />,
        title: "All Premium Features",
        description: "Includes every feature from the Premium plan.",
      },
      {
        icon: <Users className="w-6 h-6 text-pink-500" />,
        title: "Unlimited Team Members",
        description: "Add as many team members as needed.",
      },
      {
        icon: <Cpu className="w-6 h-6 text-blue-500" />,
        title: "Custom SLA & Training",
        description: "Enterprise-grade support and tailored onboarding.",
      },
      {
        icon: <Zap className="w-6 h-6 text-indigo-500" />,
        title: "Onboarding Assistance",
        description: "Hands-on guidance to get your team up to speed.",
      },
    ],
  };

  if (loadingPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Plan not found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <Crown className="text-white w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    insocialwise
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - What You're Getting */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 text-sm font-medium mb-6"
              >
                <Crown className="w-4 h-4 mr-2" />
                You're Securing the {selectedPlan.name} Plan
              </motion.div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4 mobile-heading">
                Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Elite Access
                </span>{" "}
                Package
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Join the exclusive group of entrepreneurs transforming their
                social media presence with our complete management suite.
              </p>
            </div>

            {/* Benefits List - from API features or fallback to hardcoded */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What's Included:
              </h2>

              {selectedPlan.features && selectedPlan.features.length > 0 ? (
                selectedPlan.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-1.5 bg-white rounded-lg shadow-sm">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{feature}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                (benefitsByPlan[selectedPlan.id] || []).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-1.5 bg-white rounded-lg shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {benefit.title}
                      </h3>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 mb-2">Total Amount Due</p>
                  <p className="text-4xl font-bold">{selectedPlan.price}<span className="text-lg font-normal">{selectedPlan.sub}</span></p>
                  <p className="text-indigo-100 mt-2">
                    {selectedPlan.name} Plan {selectedPlan.isYearly ? '(Yearly)' : '(Monthly)'}
                  </p>
                </div>
                <div className="text-6xl opacity-20">
                  <Crown />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
                <CardTitle className="text-2xl font-bold flex items-center h3-mobile-heading">
                  <CreditCard className="w-6 h-6 mr-3" />
                  Secure Your Access
                </CardTitle>
                <p className="text-indigo-100 mt-2">
                  Just add a payment method to secure your subscription.
                </p>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                {/* Customer Details Form */}
                <form
                  onSubmit={form.handleSubmit(handlePayment)}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Your Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          className="mt-1"
                          placeholder="John"
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          className="mt-1"
                          placeholder="Doe"
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          className="mt-1"
                          placeholder="john@example.com"
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...form.register("phone")}
                          className="mt-1"
                          placeholder="(555) 123-4567"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            form.setValue("phone", formatted);
                          }}
                          data-testid="input-phone"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...form.register("password")}
                            className="mt-1"
                            placeholder="Your secure password"
                          />
                          {/* Eye Toggle Icon */}
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 3l18 18M10.7 10.7a3 3 0 104.6 4.6M6.4 6.4A9.44 9.44 0 003 12c1.5 4 5.6 7 9 7 1.6 0 3.2-.5 4.7-1.4M14.8 9.2A3 3 0 009.2 14.8"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.244 12C3.766 7.61 7.612 4.5 12 4.5c4.39 0 8.236 3.11 9.757 7.5-1.521 4.39-5.367 7.5-9.757 7.5-4.39 0-8.236-3.11-9.757-7.5z"
                                />
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                        {form.formState.errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Choose Payment Method
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPayment("stripe")}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPayment === "stripe"
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <CreditCard className="w-5 h-5" />
                          <span className="font-medium">Stripe</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Credit/Debit Cards
                        </p>
                      </motion.button>

                      {/* <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPayment('razorpay')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPayment === 'razorpay'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Wallet className="w-5 h-5" />
                          <span className="font-medium">Razorpay</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">UPI, Cards, Net Banking</p>
                      </motion.button> */}
                    </div>
                  </div>

                  {/* Stripe Card Fields */}
                  {selectedPayment === "stripe" &&
                    showStripeForm &&
                    clientSecret &&
                    stripePromise && (
                      <div>
                        <Separator className="my-6" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Card Details
                        </h3>
                        <Elements
                          stripe={stripePromise}
                          options={{ clientSecret }}
                        >
                          <StripeCheckoutForm
                            customerData={form.getValues()}
                            onSuccess={handleStripeSuccess}
                            onError={handleStripeError}
                            clientSecret={clientSecret}
                          />
                        </Elements>
                      </div>
                    )}

                  {/* Show message when Stripe is not configured */}
                  {selectedPayment === "stripe" && !stripePromise && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                      <p className="text-yellow-800 text-sm">
                        Payment processing is not configured. Please contact
                        support.
                      </p>
                    </div>
                  )}

                  {/* Razorpay Payment Form */}
                  {/* {selectedPayment === 'razorpay' && showRazorpayForm && (
                    <div>
                      <Separator className="my-6" />
                      <RazorpayCheckoutForm
                        customerData={form.getValues()}
                        onSuccess={handleRazorpaySuccess}
                        onError={handleRazorpayError}
                        selectedPlan={selectedPlan}
                      />
                    </div>
                  )} */}

                  {!(
                    selectedPayment === "stripe" &&
                    showStripeForm &&
                    clientSecret
                  ) && (
                    // && !(selectedPayment === 'razorpay' && showRazorpayForm)
                    <>
                      {/* Security Note */}
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            100% Secure
                          </span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                          Your payment information is encrypted and secure.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={!selectedPayment || isProcessing}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Proceed to Payment</span>
                          </div>
                        )}
                      </Button>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
