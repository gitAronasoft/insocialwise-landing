import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus,
  Image as ImageIcon,
  Video,
  Calendar,
  Send,
  Save,
  Wand2,
  Hash,
  AtSign,
  Link as LinkIcon,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Eye,
  Clock,
  Target,
  Sparkles,
  Loader2,
  RefreshCw,
  X,
  FileIcon
} from "lucide-react";

const connectedPlatforms = [
  { 
    id: "instagram",
    name: "Instagram", 
    icon: Instagram, 
    color: "from-purple-500 to-pink-500",
    followers: "2.1K",
    pages: [
      { id: "personal", name: "My Personal Account", followers: "2.1K", type: "Personal" },
      { id: "business", name: "My Business Page", followers: "850", type: "Business" }
    ]
  },
  { 
    id: "twitter",
    name: "Twitter", 
    icon: Twitter, 
    color: "from-blue-400 to-blue-600",
    followers: "856",
    pages: [
      { id: "main", name: "Main Twitter Account", followers: "856", type: "Personal" }
    ]
  },
  { 
    id: "facebook",
    name: "Facebook", 
    icon: Facebook, 
    color: "from-blue-600 to-blue-800",
    followers: "432",
    pages: [
      { id: "personal", name: "Personal Profile", followers: "432", type: "Personal" },
      { id: "company", name: "Company Page", followers: "1.2K", type: "Business" },
      { id: "brand", name: "Brand Page", followers: "3.4K", type: "Business" }
    ]
  },
  { 
    id: "linkedin",
    name: "LinkedIn", 
    icon: Linkedin, 
    color: "from-blue-500 to-blue-700",
    followers: "1.8K",
    pages: [
      { id: "profile", name: "Professional Profile", followers: "1.8K", type: "Personal" },
      { id: "company", name: "Company LinkedIn", followers: "892", type: "Business" }
    ]
  },
  { 
    id: "youtube",
    name: "YouTube", 
    icon: Youtube, 
    color: "from-red-500 to-red-600",
    followers: "634",
    pages: [
      { id: "channel", name: "Main Channel", followers: "634", type: "Channel" }
    ]
  }
];

const contentTemplates = [
  {
    category: "Marketing",
    templates: [
      { title: "Product Launch", content: "🚀 Excited to introduce our latest innovation! [Product details] #Launch #Innovation" },
      { title: "Behind the Scenes", content: "Take a peek behind the curtain! Here's how we [process/story] ✨ #BehindTheScenes" },
      { title: "Customer Spotlight", content: "Amazing feedback from our customer [Name]! 💭 '[Quote]' #CustomerSuccess" }
    ]
  },
  {
    category: "Engagement",
    templates: [
      { title: "Question Post", content: "What's your biggest [topic] challenge? Share in the comments! 💬 #Community" },
      { title: "Tips & Tricks", content: "Pro tip: [Your tip here] 💡 Try this and let us know how it goes! #Tips #Productivity" },
      { title: "Poll Post", content: "Help us decide! Which [option A] or [option B]? Vote below! 🗳️ #Poll #Community" }
    ]
  },
  {
    category: "Educational",
    templates: [
      { title: "How-to Guide", content: "How to [accomplish something]: Step 1: [detail] Step 2: [detail] Step 3: [detail] 📚 #Tutorial" },
      { title: "Industry Insights", content: "Key trends we're watching in [industry]: • [Point 1] • [Point 2] • [Point 3] #Insights #Trends" },
      { title: "Myth Busting", content: "Myth: [Common misconception] Reality: [Truth] 💡 What other myths should we tackle? #FactCheck" }
    ]
  }
];

const suggestedHashtags = [
  "#Marketing", "#Business", "#Entrepreneur", "#Success", "#Innovation", 
  "#Growth", "#Strategy", "#Branding", "#SocialMedia", "#Digital", 
  "#Startup", "#Leadership", "#Motivation", "#Goals", "#Inspiration"
];

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<{[platformId: string]: string[]}>({});
  const [scheduledTime, setScheduledTime] = useState("");
  const [media, setMedia] = useState<Array<{ name: string; type: string; preview: string; file: File }>>([]);
  
  // AI Hashtag states
  const [aiHashtags, setAiHashtags] = useState<string[]>([]);
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);
  const [lastAnalyzedContent, setLastAnalyzedContent] = useState("");
  
  // Custom hashtag state
  const [customHashtag, setCustomHashtag] = useState("");
  
  // AI Assist states
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState({
    topic: "",
    industry: "",
    objective: "",
    tone: "",
    audience: ""
  });

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const newSelected = prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId];
      
      // Reset pages for removed platforms
      if (!newSelected.includes(platformId)) {
        setSelectedPages(prevPages => {
          const newPages = { ...prevPages };
          delete newPages[platformId];
          return newPages;
        });
      }
      
      return newSelected;
    });
  };

  const togglePage = (platformId: string, pageId: string) => {
    setSelectedPages(prev => {
      const platformPages = prev[platformId] || [];
      const newPlatformPages = platformPages.includes(pageId)
        ? platformPages.filter(id => id !== pageId)
        : [...platformPages, pageId];
      
      return {
        ...prev,
        [platformId]: newPlatformPages
      };
    });
  };

  const insertTemplate = (content: string) => {
    setPostContent(content);
  };

  const addHashtag = (hashtag: string) => {
    setPostContent(prev => prev + (prev ? " " : "") + hashtag);
  };

  // Mock AI hashtag generation function (replace with real API call when OpenAI key is added)
  const generateAIHashtags = useCallback(async (content: string) => {
    if (!content.trim() || content === lastAnalyzedContent) return;
    
    setIsGeneratingHashtags(true);
    setLastAnalyzedContent(content);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI-generated hashtags based on content analysis
    const mockHashtagSets = {
      "business": ["#Business", "#Entrepreneur", "#Growth", "#Strategy", "#Success", "#Leadership"],
      "technology": ["#Tech", "#Innovation", "#AI", "#Digital", "#Future", "#Software"],
      "marketing": ["#Marketing", "#Branding", "#SocialMedia", "#Content", "#Engagement", "#Growth"],
      "food": ["#Food", "#Cooking", "#Recipe", "#Foodie", "#Delicious", "#Chef"],
      "travel": ["#Travel", "#Adventure", "#Explore", "#Journey", "#Wanderlust", "#Destination"],
      "fitness": ["#Fitness", "#Health", "#Workout", "#Motivation", "#Wellness", "#Strength"],
      "education": ["#Education", "#Learning", "#Knowledge", "#Study", "#Teaching", "#Skills"],
      "default": ["#Content", "#Social", "#Community", "#Share", "#Engage", "#Connect"]
    };
    
    // Simple keyword matching for demo
    const lowerContent = content.toLowerCase();
    let selectedHashtags = mockHashtagSets.default;
    
    for (const [category, hashtags] of Object.entries(mockHashtagSets)) {
      if (category !== "default" && lowerContent.includes(category)) {
        selectedHashtags = hashtags;
        break;
      }
    }
    
    // Add some dynamic variation
    const shuffled = [...selectedHashtags].sort(() => Math.random() - 0.5);
    setAiHashtags(shuffled.slice(0, 8));
    setIsGeneratingHashtags(false);
  }, [lastAnalyzedContent]);

  // Auto-generate hashtags when content changes (debounced)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (postContent.trim() && postContent !== lastAnalyzedContent) {
        generateAIHashtags(postContent);
      }
    }, 2000); // Wait 2 seconds after user stops typing

    return () => clearTimeout(debounceTimer);
  }, [postContent, generateAIHashtags, lastAnalyzedContent]);

  // Manual hashtag regeneration
  const regenerateHashtags = () => {
    if (postContent.trim()) {
      setLastAnalyzedContent(""); // Reset to force regeneration
      generateAIHashtags(postContent);
    }
  };

  // Custom hashtag functions
  const addCustomHashtag = () => {
    const hashtag = customHashtag.trim();
    if (hashtag) {
      // Ensure hashtag starts with #
      const formattedHashtag = hashtag.startsWith('#') ? hashtag : `#${hashtag}`;
      // Add directly to post content
      setPostContent(prev => prev + (prev ? " " : "") + formattedHashtag);
      setCustomHashtag("");
    }
  };



  const handleCustomHashtagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomHashtag();
    }
  };

  // File upload functions
  const handleFileUpload = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setMedia(prev => [...prev, {
          name: file.name,
          type: file.type,
          preview: preview,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  // AI Content generation functions
  const generateAIContent = async (prompt: string, answers?: any) => {
    setIsGeneratingContent(true);
    setAiSuggestions([]);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate content based on questionnaire answers
    if (answers) {
      const { topic, industry, objective, tone, audience } = answers;
      
      // Create industry-specific content templates
      const industryTemplates: { [key: string]: string[] } = {
        "Technology": [
          `🚀 ${topic} is transforming how we work in ${industry}! ${tone === "professional" ? "Our latest insights show" : "Here's what's exciting:"} the future is now. ${objective === "engagement" ? "What's your experience with this tech?" : objective === "leads" ? "DM us to learn more about our solutions!" : "Share to spread the innovation!"} #Tech #${industry}`,
          `💡 ${tone === "casual" ? "Hot take:" : "Industry insight:"} ${topic} will revolutionize ${audience} workflows. ${objective === "awareness" ? "Follow for more tech updates!" : objective === "engagement" ? "Drop your thoughts below! 👇" : "Ready to get started? Link in bio!"} #Innovation #Future`,
          `⚡ Breaking: ${topic} just got a major upgrade! ${industry} professionals, this is game-changing. ${tone === "professional" ? "Our analysis reveals" : "Here's why it matters:"} efficiency just went through the roof! ${objective === "leads" ? "Book a demo today!" : "Tag someone who needs to see this!"} #TechNews`
        ],
        "Marketing": [
          `📈 ${topic} strategy that increased our ${audience} engagement by 300%! ${tone === "casual" ? "Thread below:" : "Key insights:"} 1) Quality over quantity 2) Authentic connections 3) Data-driven decisions. ${objective === "engagement" ? "What's worked for you?" : objective === "leads" ? "Want our full playbook? DM us!" : "Save this post!"} #Marketing #Growth`,
          `🎯 ${tone === "professional" ? "Marketing insight:" : "Pro tip:"} ${topic} isn't just a trend - it's the future of ${industry}. ${objective === "awareness" ? "Follow for daily marketing tips!" : objective === "engagement" ? "What's your take on this strategy?" : "Ready to level up? Link in bio!"} #MarketingTips #Strategy`,
          `🔥 ${audience} are loving this ${topic} approach! ${tone === "casual" ? "Here's the tea:" : "Research shows:"} authenticity beats perfection every time. ${objective === "leads" ? "Need help with your strategy? Let's chat!" : "Double tap if you agree! ❤️"} #Marketing #Authentic`
        ],
        "Healthcare": [
          `🏥 ${topic} is revolutionizing patient care in ${industry}! ${tone === "professional" ? "Clinical studies demonstrate" : "Amazing news:"} better outcomes are within reach. ${objective === "awareness" ? "Follow for health insights!" : objective === "engagement" ? "Share your experience below!" : "Learn more in our bio!"} #Healthcare #Innovation`,
          `💙 ${tone === "casual" ? "Health fact:" : "Medical insight:"} ${topic} can significantly improve ${audience} wellbeing. ${objective === "engagement" ? "What questions do you have?" : objective === "leads" ? "Schedule a consultation today!" : "Spread awareness - share this!"} #Health #Wellness`,
          `🌟 Breakthrough in ${topic}! ${industry} professionals are seeing incredible results with ${audience}. ${tone === "professional" ? "Evidence-based approach shows" : "Here's what's working:"} prevention is key! #MedicalAdvancement #Care`
        ],
        "Finance": [
          `💰 ${topic} strategy that helped ${audience} save 40% more! ${tone === "professional" ? "Financial analysis reveals" : "Money tip:"} small changes, big impact. ${objective === "leads" ? "Free consultation available!" : objective === "engagement" ? "What's your money-saving tip?" : "Save this for later!"} #Finance #Wealth`,
          `📊 ${tone === "casual" ? "Finance hack:" : "Investment insight:"} ${topic} is changing how ${industry} manages money. ${objective === "awareness" ? "Follow for financial tips!" : "Ready to optimize your finances? DM us!"} #FinancialPlanning #Investment`,
          `🎯 ${audience} need to know about ${topic}! ${tone === "professional" ? "Market analysis shows" : "Here's why it matters:"} your financial future depends on it. ${objective === "engagement" ? "Questions? Ask below!" : "Get started today!"} #FinTech #Money`
        ]
      };
      
      // Default template for any industry
      const defaultTemplate: string[] = [
        `✨ ${topic} is making waves in ${industry}! ${tone === "professional" ? "Research indicates" : "Here's the scoop:"} ${audience} are seeing amazing results. ${objective === "engagement" ? "What's your experience?" : objective === "leads" ? "Want to learn more? Contact us!" : "Share to spread the word!"} #${industry} #Innovation`,
        `🚀 ${tone === "casual" ? "Game changer alert:" : "Industry update:"} ${topic} is transforming how we approach ${industry}. Perfect for ${audience}! ${objective === "awareness" ? "Follow for updates!" : objective === "leads" ? "Ready to get started? DM us!" : "Tag someone who needs this!"} #Growth #Success`,
        `💡 ${topic} insights that ${audience} in ${industry} need to know! ${tone === "professional" ? "Analysis shows" : "Pro tip:"} adaptation is key to success. ${objective === "engagement" ? "Drop your thoughts below! 👇" : "Link in bio for more!"} #${industry}Tips #Strategy`
      ];
      
      const suggestions: string[] = industryTemplates[industry] || defaultTemplate;
      setAiSuggestions(suggestions);
    } else {
      // Original content templates for improvement/rewrite
      const contentTemplates = {
        "improve": postContent ? [
          postContent + " What are your thoughts on this? Share your experience in the comments! 👇",
          "✨ " + postContent + "\n\nTag someone who needs to see this! 🔥 #Motivation #Success",
          postContent.charAt(0).toUpperCase() + postContent.slice(1) + "\n\nDouble tap if you agree! ❤️ What's your take on this?",
        ] : [],
        "rewrite": postContent ? [
          postContent.replace(/\b\w/g, l => l.toUpperCase()).replace(/[.!?]/g, ' 🔥') + " What do you think?",
          "🌟 " + postContent + " Let's discuss this in the comments! What's your perspective?",
          postContent + "\n\nP.S. Save this post for later reference! 📌 #TipOfTheDay"
        ] : []
      };
      
      let suggestions: string[] = [];
      if (prompt.includes("improve")) {
        suggestions = contentTemplates.improve;
      } else if (prompt.includes("rewrite")) {
        suggestions = contentTemplates.rewrite;
      }
      
      setAiSuggestions(suggestions);
    }
    
    setIsGeneratingContent(false);
  };

  const handleAIAssistClick = () => {
    setShowAIAssist(true);
    if (postContent.trim()) {
      generateAIContent("improve");
    } else {
      setShowQuestions(true);
    }
  };

  const handleQuestionSubmit = () => {
    setShowQuestions(false);
    generateAIContent("generate", questionAnswers);
  };

  const updateAnswer = (field: string, value: string) => {
    setQuestionAnswers(prev => ({ ...prev, [field]: value }));
  };

  const selectAISuggestion = (suggestion: string) => {
    setPostContent(suggestion);
    setShowAIAssist(false);
    setAiSuggestions([]);
    setShowQuestions(false);
  };

  const resetAIAssist = () => {
    setShowAIAssist(false);
    setShowQuestions(false);
    setAiSuggestions([]);
    setQuestionAnswers({
      topic: "",
      industry: "",
      objective: "",
      tone: "",
      audience: ""
    });
  };

  // Validation logic
  const canPublish = () => {
    return postContent.trim() && 
           selectedPlatforms.length > 0 && 
           selectedPlatforms.every(platformId => selectedPages[platformId]?.length > 0);
  };

  const canSaveDraft = () => {
    return postContent.trim() && selectedPlatforms.length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Create Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Craft engaging content for your social media platforms
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="rounded-full"
              disabled={!canSaveDraft()}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
              disabled={!canPublish()}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
              disabled={!canPublish()}
            >
              <Send className="h-4 w-4 mr-2" />
              Publish Now
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Creator */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Post Content */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-gray-100">Post Content</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full"
                    onClick={handleAIAssistClick}
                    disabled={isGeneratingContent}
                  >
                    {isGeneratingContent ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        AI Assist
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="content">Write your post</Label>
                  <Textarea
                    id="content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What's happening? Share your thoughts..."
                    className="min-h-[120px] mt-2 bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Characters: {postContent.length}</span>
                    <span>Recommended: 80-120 characters for best engagement</span>
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-purple-400 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = Array.from(e.dataTransfer.files);
                      handleFileUpload(files);
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full"
                          onClick={() => document.getElementById('photo-upload')?.click()}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Photo
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full"
                          onClick={() => document.getElementById('video-upload')?.click()}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Video
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Link
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Drag and drop media files or click to upload
                      </p>
                    </div>
                    
                    {/* Hidden file inputs */}
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
                    />
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
                    />
                  </div>
                  
                  {/* Show uploaded media */}
                  {media.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {media.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                            {file.type.startsWith('image/') ? (
                              <img 
                                src={file.preview} 
                                alt="Upload preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : file.type.startsWith('video/') ? (
                              <video 
                                src={file.preview} 
                                className="w-full h-full object-cover"
                                controls
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                  <FileIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                  <p className="text-xs text-gray-500 truncate">{file.name}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeMedia(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI-Powered Hashtags */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <Label className="text-base font-medium">
                        {aiHashtags.length > 0 || isGeneratingHashtags ? "AI Suggested Hashtags" : "Trending Hashtags"}
                      </Label>
                      {(aiHashtags.length > 0 || isGeneratingHashtags) && (
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 border-0">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Generated
                        </Badge>
                      )}
                    </div>
                    {aiHashtags.length > 0 && !isGeneratingHashtags && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={regenerateHashtags}
                        className="h-8 px-3 rounded-full text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Refresh
                      </Button>
                    )}
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 min-h-[60px]">
                    {isGeneratingHashtags ? (
                      <div className="flex items-center justify-center space-x-2 py-4">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Analyzing your content for relevant hashtags...
                        </span>
                      </div>
                    ) : aiHashtags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {aiHashtags.map((hashtag, index) => (
                          <motion.button
                            key={`ai-${hashtag}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => addHashtag(hashtag)}
                            className="px-3 py-1 text-xs bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:shadow-md transition-all duration-300 border border-purple-200/50 dark:border-purple-700/50"
                          >
                            {hashtag}
                          </motion.button>
                        ))}
                      </div>
                    ) : postContent.trim() ? (
                      <div className="flex items-center justify-center space-x-2 py-4 text-gray-500 dark:text-gray-400">
                        <Hash className="h-4 w-4" />
                        <span className="text-sm">Keep typing to get AI hashtag suggestions...</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {suggestedHashtags.slice(0, 8).map((hashtag, index) => (
                          <motion.button
                            key={hashtag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + index * 0.02 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => addHashtag(hashtag)}
                            className="px-3 py-1 text-xs bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:shadow-md transition-all duration-300"
                          >
                            {hashtag}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    {/* Custom Hashtags Section */}
                    {(aiHashtags.length > 0 || postContent.trim()) && (
                      <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                        <div className="flex items-center space-x-2 mb-3">
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Add Custom Hashtags
                          </Label>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Input
                            value={customHashtag}
                            onChange={(e) => setCustomHashtag(e.target.value)}
                            onKeyPress={handleCustomHashtagKeyPress}
                            placeholder="Type hashtag and press Enter..."
                            className="flex-1 h-8 text-sm bg-white/80 dark:bg-gray-700/80"
                          />
                          <Button
                            size="sm"
                            onClick={addCustomHashtag}
                            disabled={!customHashtag.trim()}
                            className="h-8 px-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add to Post
                          </Button>
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Hashtags will be added directly to your post content above
                        </p>
                      </div>
                    )}
                    
                    {!postContent.trim() && (
                      <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          💡 Start typing your post content to get personalized hashtag recommendations powered by AI
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <Label>Select platforms to publish</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                    {connectedPlatforms.map((platform, index) => {
                      const Icon = platform.icon;
                      const isSelected = selectedPlatforms.includes(platform.id);
                      
                      return (
                        <motion.div
                          key={platform.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => togglePlatform(platform.id)}
                          className={`
                            relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                            ${isSelected 
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                              : 'border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {platform.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {platform.followers} followers
                              </p>
                            </div>
                          </div>
                          
                          {/* Checkbox */}
                          <div className="absolute top-3 right-3">
                            <Checkbox 
                              checked={isSelected}
                              className={isSelected ? "border-purple-500" : ""}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Page Selection for Selected Platforms */}
                {selectedPlatforms.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Select pages/accounts to post to</Label>
                      {!canPublish() && postContent.trim() && selectedPlatforms.length > 0 && (
                        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                          Select pages to publish
                        </Badge>
                      )}
                    </div>
                    
                    {selectedPlatforms.map((platformId) => {
                      const platform = connectedPlatforms.find(p => p.id === platformId);
                      if (!platform) return null;
                      
                      const Icon = platform.icon;
                      const platformPages = selectedPages[platformId] || [];
                      
                      return (
                        <div key={platformId} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-5 h-5 rounded bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                              <Icon className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {platform.name} Pages
                            </h4>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2 ml-7">
                            {platform.pages.map((page) => {
                              const isPageSelected = platformPages.includes(page.id);
                              
                              return (
                                <motion.div
                                  key={page.id}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2 }}
                                  onClick={() => togglePage(platformId, page.id)}
                                  className={`
                                    p-3 rounded-lg border cursor-pointer transition-all duration-200
                                    ${isPageSelected 
                                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                      : 'border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 hover:border-gray-300'
                                    }
                                  `}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                        {page.name}
                                      </h5>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          {page.type}
                                        </Badge>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                          {page.followers} followers
                                        </span>
                                      </div>
                                    </div>
                                    <Checkbox 
                                      checked={isPageSelected}
                                      className={isPageSelected ? "border-purple-500" : ""}
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Schedule Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="schedule-date">Schedule Date</Label>
                    <Input
                      id="schedule-date"
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="mt-2 bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>
                  <div>
                    <Label>Best Times</Label>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        9:00 AM
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        1:00 PM
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        7:00 PM
                      </Button>
                    </div>
                  </div>
                </div>

                {/* AI Insights - Only show when platforms are selected */}
                {selectedPlatforms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Insights</h3>
                      <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                        {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/50 dark:border-green-800/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <Eye className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-700 dark:text-green-400 text-sm">Predicted Reach</span>
                        </div>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-300">2.4K - 3.8K</p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-700 dark:text-blue-400 text-sm">Engagement Score</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">87%</p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-orange-700 dark:text-orange-400 text-sm">Best Time</span>
                        </div>
                        <p className="text-sm font-bold text-orange-800 dark:text-orange-300">Today at 2:00 PM</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>


          </motion.div>

          {/* Sidebar - Templates & Tools */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Platform Previews */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-lg">
                  Post Preview 
                  {selectedPlatforms.length > 1 && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {selectedPlatforms.length} platforms
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-[600px] overflow-y-auto">
                {selectedPlatforms.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <p className="text-sm">Select platforms to see preview</p>
                  </div>
                ) : (
                  <div className="space-y-4 p-4">
                    {selectedPlatforms.map((platformId, index) => {
                      const platform = connectedPlatforms.find(p => p.id === platformId);
                      if (!platform) return null;
                      
                      const Icon = platform.icon;
                      return (
                        <motion.div
                          key={platformId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          {/* Platform Header */}
                          <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 flex items-center space-x-2">
                            <div className={`w-5 h-5 rounded bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                              <Icon className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{platform.name}</span>
                          </div>

                          {/* Platform-specific Preview */}
                          <div className="bg-white dark:bg-gray-900">
                            {platformId === 'facebook' && (
                              // Facebook Preview
                              <>
                                <div className="p-4 flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                      <span className="text-white font-semibold text-xs">FB</span>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs">Facebook User</h4>
                                      <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 pb-3">
                                  <div className="text-sm text-gray-800 dark:text-gray-200">
                                    {postContent || "Your post content..."}
                                  </div>
                                </div>
                                {media.length > 0 && (
                                  <div className="aspect-video bg-black">
                                    <img src={media[0].preview} alt="Preview" className="w-full h-full object-contain" />
                                  </div>
                                )}
                              </>
                            )}

                            {platformId === 'instagram' && (
                              // Instagram Preview
                              <>
                                <div className="p-3 flex items-center space-x-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">IG</span>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs">instagram_user</h4>
                                  </div>
                                </div>
                                {media.length > 0 && (
                                  <div className="aspect-square bg-black">
                                    <img src={media[0].preview} alt="Preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="p-3">
                                  <div className="text-sm text-gray-800 dark:text-gray-200">
                                    <span className="font-semibold">instagram_user</span> {postContent || "Your post content..."}
                                  </div>
                                </div>
                              </>
                            )}

                            {platformId === 'twitter' && (
                              // Twitter Preview
                              <>
                                <div className="p-3">
                                  <div className="flex space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                      <span className="text-white font-bold text-xs">TW</span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-1">
                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Twitter User</h4>
                                        <span className="text-gray-500 text-sm">@twitter_user</span>
                                        <span className="text-gray-500">·</span>
                                        <span className="text-gray-500 text-sm">2h</span>
                                      </div>
                                      <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                                        {postContent || "Your post content..."}
                                      </div>
                                      {media.length > 0 && (
                                        <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                          <div className="aspect-video bg-black">
                                            <img src={media[0].preview} alt="Preview" className="w-full h-full object-contain" />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {platformId === 'linkedin' && (
                              // LinkedIn Preview
                              <>
                                <div className="p-3 flex items-start space-x-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">LI</span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">LinkedIn User</h4>
                                    <p className="text-xs text-gray-500">Professional Title • 2h</p>
                                    <div className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                                      {postContent || "Your post content..."}
                                    </div>
                                    {media.length > 0 && (
                                      <div className="mt-3 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="aspect-video bg-black">
                                          <img src={media[0].preview} alt="Preview" className="w-full h-full object-contain" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}

                            {platformId === 'youtube' && (
                              // YouTube Preview (Community Post style)
                              <>
                                <div className="p-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                                      <span className="text-white font-bold text-xs">YT</span>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">YouTube Channel</h4>
                                        <span className="text-gray-500 text-sm">2 hours ago</span>
                                      </div>
                                      <div className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                                        {postContent || "Your post content..."}
                                      </div>
                                      {media.length > 0 && (
                                        <div className="mt-3 rounded-lg overflow-hidden">
                                          <div className="aspect-video bg-black relative">
                                            <img src={media[0].preview} alt="Preview" className="w-full h-full object-contain" />
                                            {media[0].type.startsWith('video/') && (
                                              <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                  </svg>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>




          </motion.div>
        </div>
      </div>

      {/* AI Assist Dialog */}
      <Dialog open={showAIAssist} onOpenChange={resetAIAssist}>
        <DialogContent className="max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
              <Wand2 className="h-5 w-5" />
              <span>AI Content Assistant</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {postContent.trim() 
                ? "Here are AI-powered improvements for your post content"
                : "Let AI help you create engaging social media content"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {showQuestions ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-lg mb-2">
                    Tell us about your post
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Answer a few questions so AI can create the perfect content for you
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      What topic do you want to write about?
                    </Label>
                    <Input
                      value={questionAnswers.topic}
                      onChange={(e) => updateAnswer("topic", e.target.value)}
                      placeholder="e.g., AI in business, healthy recipes, investment tips..."
                      className="bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      What industry are you in?
                    </Label>
                    <Select value={questionAnswers.industry} onValueChange={(value) => updateAnswer("industry", value)}>
                      <SelectTrigger className="bg-white/80 dark:bg-gray-700/80">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Fitness">Fitness</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      What's your main objective?
                    </Label>
                    <Select value={questionAnswers.objective} onValueChange={(value) => updateAnswer("objective", value)}>
                      <SelectTrigger className="bg-white/80 dark:bg-gray-700/80">
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engagement">Increase Engagement</SelectItem>
                        <SelectItem value="leads">Generate Leads</SelectItem>
                        <SelectItem value="awareness">Build Awareness</SelectItem>
                        <SelectItem value="sales">Drive Sales</SelectItem>
                        <SelectItem value="education">Educate Audience</SelectItem>
                        <SelectItem value="entertainment">Entertain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      What tone do you prefer?
                    </Label>
                    <Select value={questionAnswers.tone} onValueChange={(value) => updateAnswer("tone", value)}>
                      <SelectTrigger className="bg-white/80 dark:bg-gray-700/80">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual & Friendly</SelectItem>
                        <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
                        <SelectItem value="humorous">Light & Humorous</SelectItem>
                        <SelectItem value="expert">Expert & Authoritative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Who is your target audience?
                    </Label>
                    <Input
                      value={questionAnswers.audience}
                      onChange={(e) => updateAnswer("audience", e.target.value)}
                      placeholder="e.g., entrepreneurs, parents, students, professionals..."
                      className="bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                  <Button
                    onClick={handleQuestionSubmit}
                    disabled={!questionAnswers.topic || !questionAnswers.industry || !questionAnswers.objective || !questionAnswers.tone || !questionAnswers.audience}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Generate AI Content
                  </Button>
                </div>
              </div>
            ) : isGeneratingContent ? (
              <div className="flex items-center justify-center py-8 space-x-3">
                <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  AI is crafting the perfect content for you...
                </span>
              </div>
            ) : aiSuggestions.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Content Suggestions</h4>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateAIContent("generate")}
                      className="text-xs"
                      disabled={isGeneratingContent}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Generate New
                    </Button>
                    {postContent.trim() && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateAIContent("rewrite")}
                        className="text-xs"
                        disabled={isGeneratingContent}
                      >
                        <Wand2 className="h-3 w-3 mr-1" />
                        Rewrite
                      </Button>
                    )}
                  </div>
                </div>

                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    onClick={() => selectAISuggestion(suggestion)}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 whitespace-pre-wrap">
                        {suggestion}
                      </p>
                      <Button
                        size="sm"
                        className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAISuggestion(suggestion);
                        }}
                      >
                        Use This
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Wand2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Click AI Assist to generate content suggestions</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}