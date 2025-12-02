import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {  ArrowRight,  ArrowLeft, CheckCircle2, Target, Users, BarChart3, Calendar, Sparkles, Building, User, Instagram, Twitter, Facebook, Linkedin, Youtube, Crown, Zap, Clock, Globe} from "lucide-react";
import { Link } from "wouter";

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "What's Your Primary Goal?",
    subtitle: "Help us personalize your experience"
  },
  {
    id: 2,
    title: "What's Your Role?",
    subtitle: "Understanding your role helps us provide better recommendations"
  },
  {
    id: 3,
    title: "What's Your Timezone?",
    subtitle: "Help us schedule content at optimal times for your audience"
  },
  {
    id: 4,
    title: "Expand Your Social Reach",
    subtitle: "Connect your social accounts to get started"
  }
];

const goalOptions = [
  {
    id: "planning",
    title: "Planning and publishing my social media content",
    description: "Schedule posts, manage content calendar, and automate publishing",
    icon: Calendar,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "analytics",
    title: "Analyzing the performance of my social media posts",
    description: "Track engagement, measure ROI, and optimize content strategy",
    icon: BarChart3,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "growth",
    title: "Growing my social media followers and engagement",
    description: "Increase reach, build community, and boost brand awareness",
    icon: Users,
    gradient: "from-purple-500 to-violet-500"
  },
  {
    id: "optimization",
    title: "Optimizing my social media strategy",
    description: "A/B test content, find best posting times, and improve performance",
    icon: Target,
    gradient: "from-orange-500 to-red-500"
  }
];

const roleOptions = [
  {
    id: "organization",
    title: "I'm managing social media for my organization",
    description: "Business accounts, team collaboration, brand management",
    icon: Building,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: "personal",
    title: "I'm managing my personal social media accounts",
    description: "Personal branding, content creation, individual growth",
    icon: User,
    gradient: "from-pink-500 to-rose-500"
  }
];

const timezoneOptions = [
  { value: "Pacific/Midway", label: "(UTC-11:00) Midway Island, Samoa" },
  { value: "Pacific/Honolulu", label: "(UTC-10:00) Hawaii" },
  { value: "America/Anchorage", label: "(UTC-09:00) Alaska" },
  { value: "America/Los_Angeles", label: "(UTC-08:00) Pacific Time (US & Canada)" },
  { value: "America/Tijuana", label: "(UTC-08:00) Tijuana, Baja California" },
  { value: "America/Denver", label: "(UTC-07:00) Mountain Time (US & Canada)" },
  { value: "America/Phoenix", label: "(UTC-07:00) Arizona" },
  { value: "America/Chihuahua", label: "(UTC-07:00) Chihuahua, La Paz, Mazatlan" },
  { value: "America/Chicago", label: "(UTC-06:00) Central Time (US & Canada)" },
  { value: "America/Regina", label: "(UTC-06:00) Saskatchewan" },
  { value: "America/Mexico_City", label: "(UTC-06:00) Guadalajara, Mexico City, Monterrey" },
  { value: "America/Guatemala", label: "(UTC-06:00) Central America" },
  { value: "America/New_York", label: "(UTC-05:00) Eastern Time (US & Canada)" },
  { value: "America/Indiana/Indianapolis", label: "(UTC-05:00) Indiana (East)" },
  { value: "America/Bogota", label: "(UTC-05:00) Bogota, Lima, Quito" },
  { value: "America/Halifax", label: "(UTC-04:00) Atlantic Time (Canada)" },
  { value: "America/Caracas", label: "(UTC-04:00) Caracas, La Paz" },
  { value: "America/Santiago", label: "(UTC-04:00) Santiago" },
  { value: "America/St_Johns", label: "(UTC-03:30) Newfoundland" },
  { value: "America/Sao_Paulo", label: "(UTC-03:00) Brasilia" },
  { value: "America/Argentina/Buenos_Aires", label: "(UTC-03:00) Buenos Aires, Georgetown" },
  { value: "America/Godthab", label: "(UTC-03:00) Greenland" },
  { value: "America/Noronha", label: "(UTC-02:00) Mid-Atlantic" },
  { value: "Atlantic/Cape_Verde", label: "(UTC-01:00) Cape Verde Is." },
  { value: "Europe/London", label: "(UTC+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London" },
  { value: "Atlantic/Reykjavik", label: "(UTC+00:00) Casablanca, Monrovia, Reykjavik" },
  { value: "Europe/Berlin", label: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna" },
  { value: "Europe/Paris", label: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris" },
  { value: "Europe/Prague", label: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague" },
  { value: "Europe/Warsaw", label: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb" },
  { value: "Africa/Lagos", label: "(UTC+01:00) West Central Africa" },
  { value: "Europe/Athens", label: "(UTC+02:00) Athens, Bucharest, Istanbul" },
  { value: "Europe/Helsinki", label: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius" },
  { value: "Africa/Cairo", label: "(UTC+02:00) Cairo" },
  { value: "Africa/Harare", label: "(UTC+02:00) Harare, Pretoria" },
  { value: "Europe/Moscow", label: "(UTC+03:00) Moscow, St. Petersburg, Volgograd" },
  { value: "Asia/Kuwait", label: "(UTC+03:00) Kuwait, Riyadh" },
  { value: "Africa/Nairobi", label: "(UTC+03:00) Nairobi" },
  { value: "Asia/Baghdad", label: "(UTC+03:00) Baghdad" },
  { value: "Asia/Tehran", label: "(UTC+03:30) Tehran" },
  { value: "Asia/Dubai", label: "(UTC+04:00) Abu Dhabi, Muscat" },
  { value: "Asia/Baku", label: "(UTC+04:00) Baku, Tbilisi, Yerevan" },
  { value: "Asia/Kabul", label: "(UTC+04:30) Kabul" },
  { value: "Asia/Karachi", label: "(UTC+05:00) Islamabad, Karachi, Tashkent" },
  { value: "Asia/Yekaterinburg", label: "(UTC+05:00) Ekaterinburg" },
  { value: "Asia/Kolkata", label: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi" },
  { value: "Asia/Kathmandu", label: "(UTC+05:45) Kathmandu" },
  { value: "Asia/Dhaka", label: "(UTC+06:00) Astana, Dhaka" },
  { value: "Asia/Novosibirsk", label: "(UTC+06:00) Almaty, Novosibirsk" },
  { value: "Asia/Rangoon", label: "(UTC+06:30) Yangon (Rangoon)" },
  { value: "Asia/Bangkok", label: "(UTC+07:00) Bangkok, Hanoi, Jakarta" },
  { value: "Asia/Krasnoyarsk", label: "(UTC+07:00) Krasnoyarsk" },
  { value: "Asia/Shanghai", label: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi" },
  { value: "Asia/Kuala_Lumpur", label: "(UTC+08:00) Kuala Lumpur, Singapore" },
  { value: "Asia/Taipei", label: "(UTC+08:00) Taipei" },
  { value: "Australia/Perth", label: "(UTC+08:00) Perth" },
  { value: "Asia/Irkutsk", label: "(UTC+08:00) Irkutsk, Ulaan Bataar" },
  { value: "Asia/Seoul", label: "(UTC+09:00) Seoul" },
  { value: "Asia/Tokyo", label: "(UTC+09:00) Osaka, Sapporo, Tokyo" },
  { value: "Asia/Yakutsk", label: "(UTC+09:00) Yakutsk" },
  { value: "Australia/Darwin", label: "(UTC+09:30) Darwin" },
  { value: "Australia/Adelaide", label: "(UTC+09:30) Adelaide" },
  { value: "Australia/Sydney", label: "(UTC+10:00) Canberra, Melbourne, Sydney" },
  { value: "Australia/Brisbane", label: "(UTC+10:00) Brisbane" },
  { value: "Australia/Hobart", label: "(UTC+10:00) Hobart" },
  { value: "Asia/Vladivostok", label: "(UTC+10:00) Vladivostok" },
  { value: "Pacific/Guam", label: "(UTC+10:00) Guam, Port Moresby" },
  { value: "Asia/Magadan", label: "(UTC+11:00) Magadan, Solomon Is., New Caledonia" },
  { value: "Pacific/Auckland", label: "(UTC+12:00) Auckland, Wellington" },
  { value: "Pacific/Fiji", label: "(UTC+12:00) Fiji, Kamchatka, Marshall Is." },
  { value: "Pacific/Tongatapu", label: "(UTC+13:00) Nuku'alofa" }
];

const socialPlatforms = [
  // { name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-purple-500 to-pink-500", connected: false },
  // { name: "Twitter", icon: Twitter, color: "bg-gradient-to-r from-blue-400 to-blue-600", connected: false },
  { name: "Facebook", icon: Facebook, color: "bg-gradient-to-r from-blue-600 to-blue-800", connected: false },
  { name: "LinkedIn", icon: Linkedin, color: "bg-gradient-to-r from-blue-700 to-blue-900", connected: false },
  // { name: "YouTube", icon: Youtube, color: "bg-gradient-to-r from-red-500 to-red-700", connected: false }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlatformConnect = (platform: string) => {
    setConnectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    
    // Simulate onboarding completion
    setTimeout(() => {
      // In a real app, you'd save the onboarding data to your backend
      console.log('Onboarding completed:', {
        goal: selectedGoal,
        role: selectedRole,
        timezone: selectedTimezone,
        connectedPlatforms
      });
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedGoal !== null;
      case 2:
        return selectedRole !== null;
      case 3:
        return selectedTimezone !== null;
      case 4:
        return true; // Can proceed even without connecting platforms
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid gap-4">
              {goalOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedGoal === option.id
                        ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/50'
                        : 'hover:shadow-lg bg-white/60 dark:bg-gray-800/60'
                    } backdrop-blur-sm border border-white/20`}
                    onClick={() => setSelectedGoal(option.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${option.gradient}`}>
                          <option.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {option.description}
                          </p>
                        </div>
                        {selectedGoal === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle2 className="h-6 w-6 text-blue-500" />
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid gap-4">
              {roleOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedRole === option.id
                        ? 'ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-950/50'
                        : 'hover:shadow-lg bg-white/60 dark:bg-gray-800/60'
                    } backdrop-blur-sm border border-white/20`}
                    onClick={() => setSelectedRole(option.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${option.gradient}`}>
                          <option.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {option.description}
                          </p>
                        </div>
                        {selectedRole === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle2 className="h-6 w-6 text-purple-500" />
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="max-w-md mx-auto">
              <Card className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Select your timezone to help us schedule content at the best times for your audience
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="timezone-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Select Your Timezone
                    </label>
                    <Select value={selectedTimezone || ""} onValueChange={setSelectedTimezone}>
                      <SelectTrigger 
                        id="timezone-select"
                        className="w-full h-12 bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        data-testid="select-timezone"
                      >
                        <SelectValue placeholder="Choose your timezone..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                        {timezoneOptions.map((timezone) => (
                          <SelectItem 
                            key={timezone.value} 
                            value={timezone.value}
                            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {timezone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTimezone && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-800 dark:text-green-300 font-medium text-sm">
                          Timezone selected successfully!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Connect platforms to unlock full potential
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                You can connect these later, but connecting now will help us provide better insights
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      connectedPlatforms.includes(platform.name)
                        ? 'ring-2 ring-green-500 bg-green-50/50 dark:bg-green-950/50'
                        : 'hover:shadow-lg bg-white/60 dark:bg-gray-800/60'
                    } backdrop-blur-sm border border-white/20`}
                    onClick={() => handlePlatformConnect(platform.name)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl ${platform.color}`}>
                            <platform.icon className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {platform.name}
                          </span>
                        </div>
                        {connectedPlatforms.includes(platform.name) ? (
                          <Badge className="bg-green-500 text-white">Connected</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            Connect
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {connectedPlatforms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200 dark:border-green-800"
              >
                <p className="text-green-800 dark:text-green-300 font-medium">
                  🎉 Great! You've connected {connectedPlatforms.length} platform{connectedPlatforms.length > 1 ? 's' : ''}
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Setting up your dashboard...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're personalizing your experience based on your preferences
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <div className="pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">insocialwise</span>
              </div>
            </Link>
            
            <Badge variant="secondary" className="px-3 py-1">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Step Header */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {steps[currentStep - 1].subtitle}
            </p>
          </motion.div>

          {/* Step Content */}
          <div className="mb-12">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <div className="flex items-center space-x-4">
              {currentStep < steps.length ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleNext}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                >
                  <span>Complete Setup</span>
                  <Crown className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              y: -100,
              rotate: 360,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-6 h-6 text-blue-400/60" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}