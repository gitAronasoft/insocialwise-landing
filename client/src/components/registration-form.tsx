import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPreBookingSchema, type InsertPreBooking } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useABTest } from "@/hooks/use-ab-test";
import { Rocket, Shield, Sparkles, Gift, Users, Zap, CheckCircle2, Star, Hash, Video, Camera, MessageCircle, Briefcase, Play, Music } from "lucide-react";
import { useState } from "react";

const platforms = [
  { id: "facebook", label: "Facebook", icon: MessageCircle, color: "text-blue-600" },
  { id: "instagram", label: "Instagram", icon: Camera, color: "text-pink-600" },
  { id: "twitter", label: "Twitter", icon: Hash, color: "text-sky-500" },
  { id: "linkedin", label: "LinkedIn", icon: Briefcase, color: "text-blue-700" },
  { id: "youtube", label: "YouTube", icon: Play, color: "text-red-600" },
  { id: "tiktok", label: "TikTok", icon: Music, color: "text-black" },
  { id: "pinterest", label: "Pinterest", icon: Star, color: "text-red-500" },
  { id: "other", label: "Other", icon: Zap, color: "text-purple-600" }
];

export default function RegistrationForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { variant } = useABTest();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertPreBooking>({
    resolver: zodResolver(insertPreBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      platforms: [],
      termsAccepted: false,
      variant: "A",
    },
  });

  const createPreBookingMutation = useMutation({
    mutationFn: async (data: InsertPreBooking) => {
      const response = await apiRequest("POST", "/api/prebookings", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success! 🎉",
        description: data.message,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/spots-remaining'] });
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertPreBooking) => {
    setIsSubmitting(true);
    createPreBookingMutation.mutate({ ...data, variant });
  };

  return (
    <section id="registration" className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30">
      {/* Floating background elements */}
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-12 w-48 h-48 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-30 blur-3xl"
      />
      
      <motion.div 
        animate={{ 
          y: [0, 35, 0],
          rotate: [0, -12, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-40 left-16 w-56 h-56 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl opacity-20 blur-2xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Animated badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200/50 backdrop-blur-sm mb-8"
            >
              <Gift className="w-6 h-6 text-emerald-600 mr-3" />
              <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent timezone-font">
                🎁 Limited to First 100 Users Only
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 mobile-heading "
            >
              <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Secure Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
                Free Access Now
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Join the exclusive group of entrepreneurs getting 
              <span className="text-indigo-600 font-semibold"> insocialwise </span>
              completely free for 1 entire year. 
              <span className="text-green-600 font-semibold"> No credit card required!</span>
            </motion.p>

            {/* Stats row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span>100 Free Spots</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>$588 Value</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>Instant Access</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Modern form card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <Card className="relative bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm"></div>
              
              {/* Floating sparkles */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-6 right-6 w-8 h-8 text-yellow-400"
              >
                <Sparkles className="w-full h-full" />
              </motion.div>

              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute bottom-6 left-6 w-6 h-6 text-indigo-400"
              >
                <CheckCircle2 className="w-full h-full" />
              </motion.div>

              <CardContent className="p-8 relative z-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Name fields with modern styling */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid md:grid-cols-2 gap-6"
                    >
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-gray-800 mb-3 block">
                              First Name *
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                              >
                                <Input 
                                  placeholder="Enter your first name" 
                                  className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition-all duration-300 text-gray-800 placeholder:text-gray-500 shadow-sm hover:shadow-md focus:shadow-lg"
                                  {...field} 
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-gray-800 mb-3 block">
                              Last Name *
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                              >
                                <Input 
                                  placeholder="Enter your last name" 
                                  className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition-all duration-300 text-gray-800 placeholder:text-gray-500 shadow-sm hover:shadow-md focus:shadow-lg"
                                  {...field} 
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    {/* Email field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-gray-800 mb-3 block">
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                              >
                                <Input 
                                  type="email"
                                  placeholder="your@email.com" 
                                  className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition-all duration-300 text-gray-800 placeholder:text-gray-500 shadow-sm hover:shadow-md focus:shadow-lg"
                                  {...field} 
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    {/* Company field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-gray-800 mb-3 block">
                              Company/Business Name
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                              >
                                <Input 
                                  placeholder="Your business name (optional)" 
                                  className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition-all duration-300 text-gray-800 placeholder:text-gray-500 shadow-sm hover:shadow-md focus:shadow-lg"
                                  {...field} 
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    {/* Platforms selection with modern design */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <FormField
                        control={form.control}
                        name="platforms"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-gray-800 mb-4 block">
                              Current Social Media Platforms
                            </FormLabel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                              {platforms.map((platform, index) => (
                                <FormField
                                  key={platform.id}
                                  control={form.control}
                                  name="platforms"
                                  render={({ field }) => {
                                    return (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + index * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        key={platform.id}
                                      >
                                        <FormItem className="flex flex-row items-center space-x-3 p-3 bg-white/40 backdrop-blur-sm border border-gray-200/30 rounded-xl hover:bg-white/60 hover:border-indigo-200 transition-all duration-300 cursor-pointer group">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(platform.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, platform.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== platform.id
                                                      )
                                                    )
                                              }}
                                              className="border-gray-300 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                                            />
                                          </FormControl>
                                          
                                          {/* Platform icon */}
                                          <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center justify-center"
                                          >
                                            <platform.icon className={`w-5 h-5 ${platform.color} group-hover:scale-110 transition-transform duration-200`} />
                                          </motion.div>
                                          
                                          {/* Label */}
                                          <FormLabel className="text-sm font-medium cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors">
                                            {platform.label}
                                          </FormLabel>
                                        </FormItem>
                                      </motion.div>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    {/* Modern terms section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-4 bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-sm border border-gray-200/30 rounded-2xl">
                            <FormControl>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1 border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                />
                              </motion.div>
                            </FormControl>
                            <div className="space-y-1 leading-relaxed">
                              <FormLabel className="text-sm text-gray-700 cursor-pointer font-medium">
                                I agree to the{" "}
                                <span className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                                  Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                                  Privacy Policy
                                </span>
                                . I understand this is a limited-time offer for the first 100 users only. *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    {/* Enhanced submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all duration-500 transform hover:-translate-y-1 shadow-2xl hover:shadow-emerald-200/50 font-bold py-6 text-xl rounded-2xl border-0 text-white relative overflow-hidden"
                      >
                        {/* Animated background */}
                        <motion.div 
                          animate={{ 
                            background: [
                              "linear-gradient(45deg, #10b981, #059669, #0d9488)",
                              "linear-gradient(45deg, #059669, #0d9488, #10b981)",
                              "linear-gradient(45deg, #0d9488, #10b981, #059669)"
                            ]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 opacity-80"
                        />
                        
                        {/* Button content */}
                        <div className="relative z-10 flex items-center justify-center connect-platforms-font">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="mr-3"
                              >
                                <Sparkles className="w-6 h-6" />
                              </motion.div>
                              "Claiming Your Spot..."
                            </>
                          ) : (
                            <>
                              <Rocket className="mr-3 w-6 h-6" />
                              "🎉 Claim My Free Year Access"
                            </>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  </form>
                </Form>
                
                {/* Modern security section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 text-center"
                >
                  <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 backdrop-blur-sm border border-green-200/30 rounded-2xl mb-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Shield className="w-5 h-5 text-green-600" />
                    </motion.div>
                    <span className="text-sm font-semibold text-green-700">
                      Your information is secure and will never be shared
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    By submitting, you'll receive early access to{" "}
                    <span className="text-indigo-600 font-semibold">insocialwise</span>{" "}
                    and occasional updates about new features.
                  </p>
                  
                  {/* Trust indicators */}
                  {/* <div className="flex justify-center items-center space-x-6 mt-4 text-xs text-gray-500"> */}
                  <div className="mt-4 text-xs text-gray-500 inline-flex items-center justify-between
custom-responsive mobile-width-100 w-full sm:w-full md:w-6/12 xl:w-5/12 2xl:w-4/12 mx-auto gap-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full me-2"></div>
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center ">
                      <div className="w-2 h-2 bg-blue-500 rounded-full me-2"></div>
                      <span>GDPR Compliant</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full me-2"></div>
                      <span>No Spam</span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
