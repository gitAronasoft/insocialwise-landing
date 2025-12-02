import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Star, Clock, Users2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface HeroVariantBProps {
  onCtaClick: () => void;
}

export default function HeroVariantB({ onCtaClick }: HeroVariantBProps) {
  const { data: spotsData } = useQuery({
    queryKey: ['/api/spots-remaining'],
    refetchInterval: 30000,
  });

  const remainingSpots = spotsData?.remaining || 73;

  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full px-6 py-3 mb-8"
          >
            <Clock className="w-5 h-5 text-emerald-600 mr-2" />
            <span className="text-base font-semibold text-emerald-700">⚡ 48 Hours Left - {remainingSpots} Spots Remaining</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              10X Your Social Media ROI
            </span>{" "}
            <br />
            Without Hiring an Agency
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            Stop wasting <span className="font-bold text-red-500">$5,000+/month</span> on agencies. Get the same results with insocialwise's AI-powered platform - <span className="font-bold text-emerald-600">completely FREE for 1 year</span>.
          </motion.p>

          {/* Social Proof Numbers */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-emerald-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">247%</div>
                <div className="text-sm text-gray-600">Average ROI Increase</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border border-cyan-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">15hrs</div>
                <div className="text-sm text-gray-600">Saved Per Week</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border border-indigo-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">$60K</div>
                <div className="text-sm text-gray-600">Saved on Agency Fees</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border border-purple-100">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
                <div className="text-sm text-gray-600">Faster Content Creation</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Urgency Countdown */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 mb-10"
          >
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 mr-2" />
              <span className="text-xl font-bold">URGENT: Free Offer Expires Soon!</span>
            </div>
            <div className="text-lg mb-4">
              Only <span className="text-3xl font-bold">{remainingSpots}</span> spots left out of 100
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((100 - remainingSpots) / 100) * 100}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="bg-white h-4 rounded-full"
              />
            </div>
            <p className="text-sm opacity-90">After 100 signups, the price jumps to $49/month</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <Button 
              onClick={onCtaClick}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110 shadow-2xl px-12 py-6 text-2xl font-bold rounded-2xl"
            >
              <Zap className="mr-3 w-8 h-8" />
              Get My FREE $588 Access Now
            </Button>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <Users2 className="w-4 h-4 text-green-500 mr-1" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-blue-500 mr-1" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-600 mb-4">
              Join <span className="font-bold text-emerald-600">{100 - remainingSpots} smart entrepreneurs</span> who secured their free access
            </p>
            <div className="flex justify-center -space-x-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-white text-sm">
                +{100 - remainingSpots - 8}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}