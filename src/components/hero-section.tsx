import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Calendar, BarChart3, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface HeroVariantCProps {
  remaining: number;
  onGetStarted: () => void;
}

export default function HeroVariantC({ remaining, onGetStarted }: HeroVariantCProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 pt-20 pb-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium rounded-full border-0">
                <Zap className="h-4 w-4 mr-2" />
                Limited Early Access
              </Badge>
            </motion.div>

            {/* Main headline with gradient text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Social Media
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Mastery Simplified
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                The AI-powered platform that transforms your social media chaos into 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> organized success</span>
              </p>
            </motion.div>

            {/* Key benefits with icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-2 gap-2 sm:gap-4"
            >
              {[
                { icon: Calendar, text: "Smart Scheduling" },
                { icon: BarChart3, text: "AI Analytics" },
                { icon: Users, text: "Team Collaboration" },
                { icon: Shield, text: "Enterprise Security" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
                    <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/checkout?priceId=price_1SB8eaHpVJPrOqLk3gNsUxe6">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Claim Your Free Year */}
                    Claim Your Free Month
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">5.0 rated</span>
                  </div>
                  {/* <span>•</span>
                  <span>No credit card required</span> */}
                </div>
              </div>

              {/* Urgency indicator */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="p-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl border border-orange-200 dark:border-orange-800 "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-orange-800 dark:text-orange-300">
                      ⚡ Only {remaining} spots remaining
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Join 12,000+ creators already on the waitlist
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                      {remaining}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">left</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              {/* Main dashboard container */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
              >
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"></div> */}
                    <div className="w-10 h-10">
                      <img src="./src/img/in-social-icon.png" alt="insocialwise-logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">insocialwise </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-2xl"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Followers</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24.8K</p>
                    <p className="text-xs text-green-600 dark:text-green-400">+12.5% this week</p>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-2xl"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Engagement</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">8.9%</p>
                    <p className="text-xs text-green-600 dark:text-green-400">+2.1% increase</p>
                  </motion.div>
                </div>

                {/* Chart area */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/30 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Performance</h4>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>
                  
                  {/* Animated chart bars */}
                  <div className="flex items-end space-x-2 h-20">
                    {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-t-lg flex-1 min-h-[4px]"
                      />
                    ))}
                  </div>
                </div>

                {/* Recent posts */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Recent Posts</h4>
                  {[
                    { platform: "Instagram", status: "Published", color: "bg-pink-500" },
                    { platform: "Twitter", status: "Scheduled", color: "bg-blue-500" },
                    { platform: "LinkedIn", status: "Draft", color: "bg-indigo-500" }
                  ].map((post, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <div className={`w-3 h-3 ${post.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{post.platform}</span>
                      <Badge variant="outline" className="text-xs">{post.status}</Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-2xl shadow-lg"
              >
                <Zap className="h-6 w-6 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-2xl shadow-lg"
              >
                <Star className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}