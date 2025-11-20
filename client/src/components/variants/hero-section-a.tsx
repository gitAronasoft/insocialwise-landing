import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Play, CheckCircle, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: spotsData } = useQuery({
    queryKey: ['/api/spots-remaining'],
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: mounted, // Only enable query after component mounts
  });

  const remainingSpots = (spotsData as any)?.remaining || 73;
  const progressPercentage = ((100 - remainingSpots) / 100) * 100;

  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="animate-fade-in-up"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-700">Limited Time: Free for First 100 Users</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Manage All Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Social Media
              </span>{" "}
              in One Place
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Schedule posts, analyze performance, manage ads, and engage with your audience across all major social platforms. Get 1 year completely free!
            </motion.p>
            
            {/* Countdown Timer */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white shadow-lg border border-gray-100 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Spots Remaining</span>
                    <span className="text-2xl font-bold text-indigo-600">{remainingSpots}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="bg-gradient-to-r from-indigo-500 to-violet-500 h-3 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Only <span className="font-semibold text-indigo-600">{remainingSpots} spots left</span> out of 100 free accounts
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/checkout">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl px-8 py-4 text-lg font-semibold"
                >
                  <Rocket className="mr-2 w-5 h-5" />
                  Claim Your Free Year
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center mt-8 space-x-4"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-purple-400 to-purple-600"></div>
              </div>
              <span className="text-sm text-gray-600">
                Join <span className="font-semibold">{100 - remainingSpots} entrepreneurs</span> who already claimed their spot
              </span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur-3xl"
              />
              
              <Card className="relative rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm">insocialwise Dashboard</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                        <div className="text-2xl font-bold">2.4K</div>
                        <div className="text-sm opacity-80">Posts Scheduled</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                        <div className="text-2xl font-bold">89%</div>
                        <div className="text-sm opacity-80">Engagement Up</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm opacity-80">Platforms</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-300 font-medium">Recent Activity</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-400 text-sm">Post published to Instagram</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-400 text-sm">Facebook ad campaign optimized</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-gray-400 text-sm">Analytics report generated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              style={{ animation: "bounceGentle 2s infinite" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Post Scheduled</p>
                  <p className="text-xs text-gray-500">Instagram & Facebook</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              style={{ animation: "bounceGentle 2s infinite", animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Engagement +247%</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
