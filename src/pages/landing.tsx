import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import PlatformIntegration from "@/components/platform-integration";
import PricingSection from "@/components/pricing-section";
import RegistrationForm from "@/components/registration-form";
import SocialProof from "@/components/social-proof";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImage from "@/img/in-social-icon.png";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10"> <img src={logoImage} alt="insocialwise-logo" /> </div>
              <span className="text-xl font-bold text-gray-900">insocialwise</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                data-testid="nav-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                data-testid="nav-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                data-testid="nav-faq"
              >
                FAQ
              </button>
              
              <Button 
                onClick={() => scrollToSection('registration')}
                className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105"
                data-testid="button-get-free-access"
              >
                Get Free Access
              </Button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

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

      <main>
        <HeroSection remaining={50} onGetStarted={() => scrollToSection('registration')} />
        <FeaturesSection />
        <PlatformIntegration />
        <PricingSection />
        <RegistrationForm />
        <SocialProof />
        <FAQSection />
        
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
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
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Don't Miss This{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Moment
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
              >
                Join exclusive early access and get 1 year free
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Button 
                  onClick={() => scrollToSection('registration')}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                  data-testid="button-cta-register"
                >
                  Get Started Free
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-500 text-sm mt-6"
              >
                Limited spots available
              </motion.p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
