import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  BarChart3, 
  Megaphone, 
  Users, 
  FolderOpen, 
  Ear,
  CheckCircle 
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Post Scheduling",
    description: "Schedule posts across multiple platforms with AI-powered optimal timing suggestions. Never miss the perfect moment to engage your audience.",
    gradient: "from-indigo-50 to-violet-50",
    iconGradient: "from-indigo-500 to-violet-500",
    hoverGradient: "hover:from-indigo-100 hover:to-violet-100",
    features: ["Multi-platform posting", "AI-powered timing", "Bulk upload & edit"]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed insights into your social media performance with comprehensive analytics and reporting tools.",
    gradient: "from-cyan-50 to-blue-50",
    iconGradient: "from-cyan-500 to-blue-500",
    hoverGradient: "hover:from-cyan-100 hover:to-blue-100",
    features: ["Real-time metrics", "Custom reports", "Competitor analysis"]
  },
  {
    icon: Megaphone,
    title: "Ad Campaign Management",
    description: "Create, manage, and optimize your social media advertising campaigns from one central dashboard.",
    gradient: "from-emerald-50 to-teal-50",
    iconGradient: "from-emerald-500 to-teal-500",
    hoverGradient: "hover:from-emerald-100 hover:to-teal-100",
    features: ["Multi-platform ads", "Budget optimization", "A/B testing tools"],
    iconClass: "p-3"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team through approval workflows, role management, and collaborative content creation.",
    gradient: "from-rose-50 to-pink-50",
    iconGradient: "from-rose-500 to-pink-500",
    hoverGradient: "hover:from-rose-100 hover:to-pink-100",
    features: ["Approval workflows", "Role-based access", "Comments & feedback"]
  },
  {
    icon: FolderOpen,
    title: "Content Library",
    description: "Organize your media assets, templates, and content in a centralized library with powerful search and tagging.",
    gradient: "from-amber-50 to-orange-50",
    iconGradient: "from-amber-500 to-orange-500",
    hoverGradient: "hover:from-amber-100 hover:to-orange-100",
    features: ["Unlimited storage", "Smart tagging", "Template library"]
  },
  {
    icon: Ear,
    title: "Social Listening",
    description: "Monitor brand mentions, track sentiment, and stay on top of conversations about your brand across all platforms.",
    gradient: "from-purple-50 to-indigo-50",
    iconGradient: "from-purple-500 to-indigo-500",
    hoverGradient: "hover:from-purple-100 hover:to-indigo-100",
    features: ["Brand monitoring", "Sentiment analysis", "Real-time alerts"]
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30"></div>
      
      {/* Floating geometric shapes */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl opacity-30 blur-sm"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl opacity-25 blur-sm"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Modern badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 backdrop-blur-sm mb-6"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ✨ Complete Social Media Suite
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
              Everything You Need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dominate Social Media
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From AI-powered content creation to advanced performance analytics, 
            <span className="text-indigo-600 font-semibold"> insocialwise </span>
            provides all the tools you need to grow your social presence and drive real results.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated gradient border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.iconGradient.split(' ')[1]}, ${feature.iconGradient.split(' ')[3]})`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    padding: '2px'
                  }}
                />
                
                <CardContent className="p-8 relative z-10">
                  {/* Minimal icon design */}
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-center mb-6"
                  >
                    <div className={`w-12 h-12 p-3 bg-gradient-to-r ${feature.iconGradient} rounded-2xl flex items-center justify-center mr-4 shadow-sm`}>
                      <feature.icon className="text-white w-6 h-6" />
                    </div>
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-indigo-900 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 h3-mobile-heading"
                    >
                      {feature.title}
                    </motion.h3>
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                  >
                    {feature.description}
                  </motion.p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item, itemIndex) => (
                      <motion.li 
                        key={itemIndex} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (itemIndex * 0.05), duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 text-green-500 group-hover:text-green-600 transition-colors duration-300`} />
                        </motion.div>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modern stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 px-6 sm:px-8 py-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/50 shadow-lg w-full sm:w-auto mx-auto">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center px-4"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">50K+</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Active Users</div>
            </motion.div>
            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center px-4"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">2M+</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Posts Scheduled</div>
            </motion.div>
            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center px-4"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">99.9%</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Uptime</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
