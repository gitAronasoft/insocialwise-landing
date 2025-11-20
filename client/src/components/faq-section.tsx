import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Shield, Clock, Users, Zap, Star, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is this really free for a full year?",
    answer: "Yes! The first 100 users get complete access to insocialwise for 365 days absolutely free. No hidden fees, no credit card required upfront.",
    icon: Star,
    category: "Pricing",
    gradient: "from-amber-500 to-orange-600",
    popular: true
  },
  {
    question: "What happens after the free year ends?",
    answer: "After your free year, you can continue with our regular plan at $49/month or cancel anytime. We'll remind you 30 days before your free period ends.",
    icon: Clock,
    category: "Pricing",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    question: "How many social media accounts can I connect?",
    answer: "Unlimited! Connect as many Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, and other social accounts as you need.",
    icon: Zap,
    category: "Features",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    question: "Can I use this for client accounts?",
    answer: "Absolutely! insocialwise is perfect for agencies and freelancers managing multiple client accounts with team collaboration features.",
    icon: Users,
    category: "Features",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    question: "What if I need help getting started?",
    answer: "All free users get access to our 24/7 support team, comprehensive tutorials, and personalized onboarding calls to ensure your success.",
    icon: HelpCircle,
    category: "Support",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    question: "Is my data safe and secure?",
    answer: "Yes! We're SOC 2 Type II compliant and GDPR ready. Your data is encrypted, backed up daily, and never shared with third parties.",
    icon: Shield,
    category: "Security",
    gradient: "from-green-500 to-emerald-600"
  }
];

const floatingElements = [
  { icon: Sparkles, delay: 0, x: 15, y: 25 },
  { icon: HelpCircle, delay: 1.5, x: -20, y: -15 },
  { icon: CheckCircle, delay: 3, x: 25, y: -30 },
  { icon: Star, delay: 0.8, x: -25, y: 20 }
];

const categories = ["All", "Pricing", "Features", "Support", "Security"];

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section id="faq" className="relative py-24 bg-gradient-to-br from-slate-50 to-gray-50 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute opacity-10"
            style={{
              left: `${15 + (index * 20)}%`,
              top: `${25 + (index * 15)}%`,
            }}
            animate={{
              y: [0, element.y, 0],
              x: [0, element.x, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + index * 2,
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
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-gray-300 to-slate-400 rounded-full opacity-8 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-slate-300 to-gray-400 rounded-full opacity-6 blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

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
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 mb-8"
          >
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900">
              Got Questions?
            </span>
            <br />
            <span className="text-gray-700">
              We've Got Answers
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to know about our free year offer and platform features
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* FAQ Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={`${selectedCategory}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="relative group"
              >
                {/* Popular badge */}
                {faq.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute -top-3 -right-3 z-10"
                  >
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  </motion.div>
                )}

                <Card className="relative bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-500">
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  
                  <CardContent className="relative p-0">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="px-8 py-6 hover:no-underline group/trigger [&[data-state=open]>div]:text-gray-900">
                          <div className="flex items-center gap-4 w-full text-left">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shadow-sm flex-shrink-0"
                            >
                              <faq.icon className="w-6 h-6 text-gray-600" />
                            </motion.div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                  {faq.category}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover/trigger:text-gray-700 transition-colors">
                                {faq.question}
                              </h3>
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-8 pb-8">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="ml-16 pt-4 border-t border-gray-100"
                          >
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                            
                            {/* Additional visual element */}
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mt-4 flex items-center gap-2 text-sm text-gray-500"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Helpful answer</span>
                            </motion.div>
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact support section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <HelpCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Can't find the answer you're looking for? Our friendly customer support team is here to help.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Support
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
