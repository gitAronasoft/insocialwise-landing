import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Shield, CheckCircle, Sparkles, Heart, Zap, Trophy, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    rating: 5,
    text: "This platform has revolutionized how I manage my clients' social media. The AI-powered scheduling alone saves me 10+ hours per week!",
    author: "Sarah Chen",
    role: "Marketing Consultant",
    company: "Growth Labs",
    avatar: "SC",
    metric: "10+ hrs saved",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
    textGradient: "from-violet-600 to-purple-700"
  },
  {
    rating: 5,
    text: "The analytics are incredibly detailed yet easy to understand. I can finally show my boss the real ROI of our social media efforts.",
    author: "Marcus Rodriguez", 
    role: "Marketing Manager",
    company: "TechFlow Inc",
    avatar: "MR",
    metric: "200% ROI boost",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-600",
    textGradient: "from-blue-600 to-cyan-700"
  },
  {
    rating: 5,
    text: "As a small business owner, having all my social platforms in one place is a game-changer. My engagement has increased 300%!",
    author: "Emily Johnson",
    role: "Business Owner", 
    company: "Bloom Studio",
    avatar: "EJ",
    metric: "300% engagement",
    icon: Heart,
    gradient: "from-emerald-500 to-teal-600",
    textGradient: "from-emerald-600 to-teal-700"
  },
  {
    rating: 5,
    text: "The automated content suggestions are spot-on for my brand voice. I've doubled my posting frequency without sacrificing quality.",
    author: "David Kim",
    role: "Content Creator",
    company: "Creative Edge",
    avatar: "DK",
    metric: "2x content output",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
    textGradient: "from-amber-600 to-orange-700"
  },
  {
    rating: 5,
    text: "Managing multiple client accounts is now effortless. The team collaboration features have streamlined our entire workflow.",
    author: "Lisa Park",
    role: "Agency Director",
    company: "Digital Dynamics",
    avatar: "LP",
    metric: "50% faster delivery",
    icon: Users,
    gradient: "from-pink-500 to-rose-600",
    textGradient: "from-pink-600 to-rose-700"
  },
  {
    rating: 5,
    text: "The customer support is phenomenal. They helped me migrate all my data seamlessly and trained my team in just one session.",
    author: "Alex Thompson",
    role: "Marketing Director",
    company: "Venture Capital",
    avatar: "AT",
    metric: "24/7 support",
    icon: Shield,
    gradient: "from-indigo-500 to-purple-600",
    textGradient: "from-indigo-600 to-purple-700"
  },
  {
    rating: 5,
    text: "The competitor analysis tools give me insights I never had before. I can now stay ahead of trends in my industry.",
    author: "Maria Santos",
    role: "Brand Manager",
    company: "Fashion Forward",
    avatar: "MS",
    metric: "Trend leader",
    icon: Trophy,
    gradient: "from-cyan-500 to-blue-600",
    textGradient: "from-cyan-600 to-blue-700"
  },
  {
    rating: 5,
    text: "ROI tracking is finally simple and accurate. I can prove the value of social media to stakeholders with clear metrics.",
    author: "James Wilson",
    role: "CMO",
    company: "Enterprise Solutions",
    avatar: "JW",
    metric: "Clear ROI proof",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-600",
    textGradient: "from-green-600 to-emerald-700"
  },
  {
    rating: 5,
    text: "The influencer discovery feature helped me find perfect brand ambassadors. Our partnerships have never been more successful.",
    author: "Rachel Green",
    role: "Influencer Manager",
    company: "Social Connect",
    avatar: "RG",
    metric: "Perfect matches",
    icon: Heart,
    gradient: "from-purple-500 to-violet-600",
    textGradient: "from-purple-600 to-violet-700"
  }
];

const trustBadges = [
  { icon: Award, value: "99.9%", label: "Uptime", color: "text-amber-500", bg: "bg-amber-100" },
  { icon: Users, value: "24/7", label: "Support", color: "text-blue-500", bg: "bg-blue-100" },
  { icon: Shield, value: "SOC 2", label: "Compliant", color: "text-green-500", bg: "bg-green-100" },
  { icon: Trophy, value: "GDPR", label: "Ready", color: "text-purple-500", bg: "bg-purple-100" }
];

const floatingElements = [
  { icon: Sparkles, delay: 0, x: 10, y: 20 },
  { icon: Heart, delay: 1, x: -15, y: -10 },
  { icon: Star, delay: 2, x: 20, y: -25 },
  { icon: Zap, delay: 0.5, x: -20, y: 15 },
  { icon: Trophy, delay: 1.5, x: 25, y: 10 }
];

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate slides (3 testimonials per slide)
  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Get current slide testimonials
  const getCurrentSlideTestimonials = () => {
    const startIndex = currentIndex * testimonialsPerSlide;
    return testimonials.slice(startIndex, startIndex + testimonialsPerSlide);
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/50 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute opacity-10"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
            }}
            animate={{
              y: [0, element.y, 0],
              x: [0, element.x, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            <element.icon className="w-8 h-8 text-indigo-400" />
          </motion.div>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-indigo-200/50 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              CUSTOMER SUCCESS STORIES
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold mb-6 mobile-heading"
          >
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">
              Trusted by Ambitious
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Entrepreneurs
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of successful entrepreneurs who've transformed their social media presence with insocialwise
          </motion.p>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto mb-20">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
            </motion.button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
            </motion.button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden px-16 custom-mobile-px">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                // className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
                className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Three testimonials display */}
                {getCurrentSlideTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, y: 40, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Floating sparkles around testimonial */}
                    <motion.div
                      className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>

                    <Card className="relative bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-500/10 h-full overflow-hidden group-hover:shadow-indigo-500/20 transition-all duration-500">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <CardContent className="relative p-5 mobile-width-100">
                        {/* Rating and metric */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex text-yellow-400">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 + i * 0.05 }}
                              >
                                <Star className="w-5 h-5 fill-current" />
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className={`flex items-center gap-2 bg-gradient-to-r ${testimonial.gradient} px-3 py-1 rounded-full`}
                          >
                            {(() => {
                              const IconComponent = testimonial.icon;
                              return <IconComponent className="w-4 h-4 text-white" />;
                            })()}
                            <span className="text-xs font-bold text-white custom-badge">{testimonial.metric}</span>
                          </motion.div>
                        </div>
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 + index * 0.1 }} 
                          className="text-gray-700 mb-8 leading-relaxed text-lg font-medium custom-font-mobile"
                        >
                          "{testimonial.text}"
                        </motion.p>
                        
                        {/* Author info */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 + index * 0.1 }}
                          className="flex items-center"
                        >
                          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center mr-4 shadow-lg`}>
                            <span className="text-white font-bold text-lg">
                              {testimonial.avatar}
                            </span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                            <p className={`text-xs font-semibold bg-gradient-to-r ${testimonial.textGradient} bg-clip-text text-transparent`}>
                              {testimonial.company}
                            </p>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-600 w-8' 
                    : 'bg-gray-300 hover:bg-indigo-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <motion.div
              className={`text-xs text-gray-500 flex items-center gap-2 ${isAutoPlaying ? 'opacity-100' : 'opacity-50'}`}
              animate={{ opacity: isAutoPlaying ? [0.5, 1, 0.5] : 0.5 }}
              transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0 }}
            >
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              {isAutoPlaying ? 'Auto-playing' : 'Manual control'}
            </motion.div>
          </div>
        </div>
        
        {/* Modern Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 mb-8 font-medium"
          >
            Trusted by industry leaders worldwide
          </motion.p>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`${badge.bg} ${badge.color} p-2 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <badge.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{badge.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{badge.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
