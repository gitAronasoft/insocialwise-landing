import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  Zap,
  ArrowRight,
  Globe
} from "lucide-react";

const platforms = [
  { 
    icon: Facebook, 
    name: "Facebook", 
    color: "text-blue-600", 
    bgGradient: "from-blue-50 to-blue-100",
    hoverGradient: "hover:from-blue-100 hover:to-blue-200",
    shadowColor: "shadow-blue-200/50"
  },
  { 
    icon: Instagram, 
    name: "Instagram", 
    color: "text-pink-600", 
    bgGradient: "from-pink-50 to-purple-100",
    hoverGradient: "hover:from-pink-100 hover:to-purple-200",
    shadowColor: "shadow-pink-200/50"
  },
  { 
    icon: Twitter, 
    name: "Twitter", 
    color: "text-blue-400", 
    bgGradient: "from-blue-50 to-cyan-50",
    hoverGradient: "hover:from-blue-100 hover:to-cyan-100",
    shadowColor: "shadow-blue-200/50"
  },
  { 
    icon: Linkedin, 
    name: "LinkedIn", 
    color: "text-blue-700", 
    bgGradient: "from-blue-50 to-indigo-50",
    hoverGradient: "hover:from-blue-100 hover:to-indigo-100",
    shadowColor: "shadow-blue-300/50"
  },
  { 
    icon: Youtube, 
    name: "YouTube", 
    color: "text-red-600", 
    bgGradient: "from-red-50 to-orange-50",
    hoverGradient: "hover:from-red-100 hover:to-orange-100",
    shadowColor: "shadow-red-200/50"
  },
];

const additionalPlatforms = [
  { 
    name: "TikTok", 
    color: "text-gray-800", 
    bgGradient: "from-gray-50 to-slate-50",
    hoverGradient: "hover:from-gray-100 hover:to-slate-100",
    shadowColor: "shadow-gray-200/50"
  },
  { 
    name: "Pinterest", 
    color: "text-red-500", 
    bgGradient: "from-red-50 to-pink-50",
    hoverGradient: "hover:from-red-100 hover:to-pink-100",
    shadowColor: "shadow-red-200/50"
  },
  { 
    name: "Snapchat", 
    color: "text-yellow-500", 
    bgGradient: "from-yellow-50 to-amber-50",
    hoverGradient: "hover:from-yellow-100 hover:to-amber-100",
    shadowColor: "shadow-yellow-200/50"
  },
];

export default function PlatformIntegration() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-16 right-20 w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-20 blur-xl"
      />
      
      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl opacity-15 blur-lg"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern header with animated badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Animated connection badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 backdrop-blur-sm mb-8"
          >
            <Zap className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Universal Platform Integration
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 mobile-heading"
          >
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Connect All Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Social Platforms
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Manage all your social media accounts from one powerful dashboard. Connect, schedule, and analyze across every major platform with 
            <span className="text-indigo-600 font-semibold"> seamless integration.</span>
          </motion.p>
        </motion.div>
        
        {/* Modern platform showcase with connections */}
        <div className="relative">
          {/* Central hub visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-dark"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/25">
              <Globe className="w-12 h-12 text-white" />
            </div>
            {/* Pulsing rings */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 border-2 border-indigo-400 rounded-3xl"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute inset-0 border-2 border-purple-400 rounded-3xl"
            />
          </motion.div>

          {/* Floating particles animation */}
          <div className="absolute inset-0 pointer-events-none z-5">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Platform cards in circular arrangement */}
          <div className="relative h-[450px] w-full max-w-3xl mx-auto flex items-center justify-center">
            
            {/* All platforms combined for proper circular distribution */}
            {[...platforms, ...additionalPlatforms].map((platform, index) => {
              const totalPlatforms = platforms.length + additionalPlatforms.length;
              const angle = (index * 360) / totalPlatforms - 90; // Start from top
              const radius = 160; // Distance from center
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              const hasIcon = 'icon' in platform;
              
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.4 + index * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  className="absolute"
                  style={{ 
                    left: `calc(50% + ${x}px)`, 
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Card className={`group relative overflow-visible bg-gradient-to-br ${platform.bgGradient} ${platform.hoverGradient} border border-white/60 shadow-lg ${platform.shadowColor} hover:shadow-xl transition-all duration-300 rounded-2xl backdrop-blur-sm`}>
                    <CardContent className="p-4 flex flex-col items-center justify-center relative z-10">
                      {hasIcon ? (
                        <motion.div
                          whileHover={{ rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {(() => {
                            const IconComponent = (platform as typeof platforms[0]).icon;
                            return <IconComponent className={`w-7 h-7 ${platform.color} transition-all duration-300`} />;
                          })()}
                        </motion.div>
                      ) : (
                        <span className={`text-sm font-bold ${platform.color} transition-all duration-300`}>
                          {platform.name}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Modern stats and CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
          style={{ marginTop: '100px' }}
        >
          {/* Integration stats */}
          <div className="inline-flex items-center justify-between px-8 py-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg mb-8 custom-responsive mobile-width-100 w-full sm:w-full md:w-10/12 xl:w-6/12 2xl:w-5/12 mx-auto">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center px-4"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">15+</div>
              <div className="text-sm text-gray-600 font-medium">Platforms</div>
            </motion.div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center px-4"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">1-Click</div>
              <div className="text-sm text-gray-600 font-medium">Setup</div>
            </motion.div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center px-4"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Real-time</div>
              <div className="text-sm text-gray-600 font-medium">Sync</div>
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-gray-600 mb-8 text-lg"
          >
            <span className="text-indigo-600 font-semibold">More platforms</span> added every month. 
            Seamless integrations with enterprise-grade security.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0"
            >
              <Zap className="w-5 h-5 mr-2" />
              Connect Your Platforms
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Integrations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
