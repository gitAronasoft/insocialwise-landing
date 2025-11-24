import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import HeroVariantB from "@/components/variants/hero-variant-b";
import HeroVariantC from "@/components/variants/hero-variant-c";
import FeaturesSection from "@/components/features-section";
import PlatformIntegration from "@/components/platform-integration";
import PricingSection from "@/components/pricing-section";
import RegistrationForm from "@/components/registration-form";
import SocialProof from "@/components/social-proof";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Share, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useABTest } from "@/hooks/use-ab-test";
import { useQuery } from "@tanstack/react-query";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { variant, recordView } = useABTest();
  
  // Fetch spots remaining data
  const { data: spotsData } = useQuery({
    queryKey: ['/api/spots-remaining'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Record view when component mounts
  useEffect(() => {
    recordView();
  }, [recordView]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                <Share className="text-white w-4 h-4" />
              </div> */}
              <div className="w-10 h-10"> <img src="./src/img/in-social-icon.png" alt="insocialwise-logo" /> </div>
              <span className="text-xl font-bold text-gray-900">insocialwise  </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                FAQ
              </button>
              
              {/* Layout Variants Dropdown */}
              {/* <div className="relative group">
                <button className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  Layouts 
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                    {variant}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a 
                      href="/?variant=A" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <div className="font-medium">Variant A (Classic)</div>
                      <div className="text-xs text-gray-500">Traditional design</div>
                    </a>
                    <a 
                      href="/?variant=B" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <div className="font-medium">Variant B (Modern)</div>
                      <div className="text-xs text-gray-500">Contemporary style</div>
                    </a>
                    <a 
                      href="/?variant=C" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <div className="font-medium">Variant C (Premium)</div>
                      <div className="text-xs text-gray-500">Glassmorphism design</div>
                    </a>
                    <hr className="my-2" />
                    <a 
                      href="/ab-test-admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium">Admin Dashboard</div>
                      <div className="text-xs text-gray-500">A/B test results</div>
                    </a>
                  </div>
                </div>
              </div> */}
              
              <Button 
                onClick={() => scrollToSection('registration')}
                className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105"
              >
                Get Free Access
              </Button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4 pt-4">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
                >
                  FAQ
                </button>
                
                {/* Mobile Layout Variants */}
                {/* <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    Layout Variants 
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                      {variant}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="/?variant=A" 
                      className="block text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                    >
                      Variant A (Classic)
                    </a>
                    <a 
                      href="/?variant=B" 
                      className="block text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                    >
                      Variant B (Modern)
                    </a>
                    <a 
                      href="/?variant=C" 
                      className="block text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                    >
                      Variant C (Premium)
                    </a>
                    <a 
                      href="/ab-test-admin" 
                      className="block text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                    >
                      Admin Dashboard
                    </a>
                  </div>
                </div>
                 */}
                <Button 
                  onClick={() => scrollToSection('registration')}
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 w-full mt-4"
                >
                  Get Free Access
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* {variant === "A" ? (
          <HeroSection />
        ) : variant === "B" ? (
          <HeroVariantB onCtaClick={() => scrollToSection('registration')} />
        ) : (
          <HeroVariantC 
            remaining={(spotsData as any)?.remaining || 100} 
            onGetStarted={() => scrollToSection('registration')} 
          />
        )} */}
        <HeroSection />
        <FeaturesSection />
        <PlatformIntegration />
        <PricingSection />
        <RegistrationForm />
        <SocialProof />
        <FAQSection />
        
        {/* Final CTA */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
          {/* Simplified background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20"></div>
            <motion.div
              className="absolute top-10 right-10 w-32 h-32"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-10 w-40 h-40"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Compact badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative inline-block mb-8"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-60"></div>
                <div className="relative bg-black/80 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-2 flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  ></motion.div>
                  <span className="text-xs font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent tracking-wider">
                    LIMITED LAUNCH
                  </span>
                </div>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-6xl font-black mb-6 leading-tight mobile-heading"
              >
                <span className="block text-white">Don't Miss</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  This Moment
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto"
              >
                Secure your 
                <span className="font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"> $588 premium access </span>
                absolutely free for 365 days.
              </motion.p>
              
              {/* Streamlined CTA */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-block group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <Button 
                    onClick={() => scrollToSection('registration')}
                    size="lg"
                    className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl transition-all duration-300 border-0"
                  >
                    <span className="flex items-center gap-3 custom-font-mobile">
                      Claim Your Elite Access
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xl"
                      >
                        ⚡
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Compact urgency indicator */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative group max-w-lg mx-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl blur opacity-50"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex items-center justify-center gap-3 mb-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-500 rounded-full"
                    ></motion.div>
                    <span className="font-black text-2xl bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
                      FINAL 100 SPOTS
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                    ></motion.div>
                  </motion.div>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    ></motion.div>
                    <span className="text-sm font-medium">Join 47,000+ entrepreneurs already inside</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
