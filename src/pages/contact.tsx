import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Building2,
  Users,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Shield,
  Headphones,
  Zap,
  Globe,
  BarChart3,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { contactApi, type ContactFormData } from "@/lib/api-service";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  teamSize: z.string().min(1, "Please select your team size"),
  useCase: z.string().min(1, "Please select your primary use case"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const teamSizeOptions = [
  { value: "1-5", label: "1-5 employees" },
  { value: "6-20", label: "6-20 employees" },
  { value: "21-50", label: "21-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const useCaseOptions = [
  { value: "agency", label: "Digital Marketing Agency" },
  { value: "enterprise", label: "Enterprise Brand Management" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "saas", label: "SaaS & Technology" },
  { value: "media", label: "Media & Publishing" },
  { value: "nonprofit", label: "Non-profit Organization" },
  { value: "education", label: "Education & Training" },
  { value: "other", label: "Other" },
];

const enterpriseFeatures = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Unlimited Team Members",
    description: "Add your entire team with role-based access",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Unlimited Social Profiles",
    description: "Connect all your brand accounts",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Advanced Analytics",
    description: "Deep insights with custom reporting",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Enterprise Security",
    description: "SSO, 2FA, and compliance features",
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: "Dedicated Support",
    description: "Priority support with SLA guarantees",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Custom Integrations",
    description: "API access and custom workflows",
  },
];

export default function Contact() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      teamSize: "",
      useCase: "",
      message: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await contactApi.submitDemoRequest(data as ContactFormData);

      if (response.success) {
        setIsSuccess(true);
        toast({
          title: "Request Submitted Successfully",
          description: "Our team will contact you within 24 hours.",
        });
      } else {
        toast({
          title: "Unable to Submit Request",
          description: response.error || "Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Unable to reach our servers. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Interest!
          </h1>
          <p className="text-gray-600 mb-8">
            Our enterprise team has received your request and will reach out within 24 hours 
            to schedule a personalized demo tailored to your needs.
          </p>
          <div className="space-y-3">
            <Link href="/">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Back to Homepage
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Questions? Email us at{" "}
              <a href="mailto:enterprise@insocialwise.com" className="text-indigo-600 hover:underline">
                enterprise@insocialwise.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="container mx-auto px-6 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  Enterprise Solution
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Get a Custom Plan for Your Business
              </h1>
              <p className="text-lg text-gray-600">
                Let's discuss how insocialwise can help your team manage social media 
                at scale with enterprise-grade features and dedicated support.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {enterpriseFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    Our team reviews your request and prepares a customized demo
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    We schedule a call to understand your specific needs and goals
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-sm text-gray-700">
                    Receive a tailored proposal with pricing that fits your budget
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Request a Demo
                </CardTitle>
                <p className="text-gray-500">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...form.register("firstName")}
                        className={form.formState.errors.firstName ? "border-red-500" : ""}
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-xs text-red-500">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...form.register("lastName")}
                        className={form.formState.errors.lastName ? "border-red-500" : ""}
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-xs text-red-500">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        Work Email *
                      </div>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      {...form.register("email")}
                      className={form.formState.errors.email ? "border-red-500" : ""}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        Phone Number *
                      </div>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...form.register("phone")}
                      className={form.formState.errors.phone ? "border-red-500" : ""}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        Company Name *
                      </div>
                    </Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      {...form.register("company")}
                      className={form.formState.errors.company ? "border-red-500" : ""}
                    />
                    {form.formState.errors.company && (
                      <p className="text-xs text-red-500">{form.formState.errors.company.message}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          Team Size *
                        </div>
                      </Label>
                      <Controller
                        name="teamSize"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={form.formState.errors.teamSize ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamSizeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {form.formState.errors.teamSize && (
                        <p className="text-xs text-red-500">{form.formState.errors.teamSize.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Primary Use Case *
                      </Label>
                      <Controller
                        name="useCase"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={form.formState.errors.useCase ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select use case" />
                            </SelectTrigger>
                            <SelectContent>
                              {useCaseOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {form.formState.errors.useCase && (
                        <p className="text-xs text-red-500">{form.formState.errors.useCase.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        Additional Information (Optional)
                      </div>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your social media management needs..."
                      rows={4}
                      {...form.register("message")}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <span>Request Demo</span>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/terms" className="text-indigo-600 hover:underline">Terms of Service</a>.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
