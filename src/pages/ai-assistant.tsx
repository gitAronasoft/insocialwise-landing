import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot,
  Sparkles,
  Wand2,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Lightbulb,
  Target,
  Zap,
  TrendingUp,
  Users,
  Calendar,
  Hash,
  MessageSquare,
  Mic,
  Image as ImageIcon,
  FileText,
  BarChart3
} from "lucide-react";

const aiFeatures = [
  {
    id: "content-ideas",
    title: "Content Ideas",
    description: "Generate creative post ideas based on your industry and audience",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "caption-writer",
    title: "Caption Writer", 
    description: "Create engaging captions for your social media posts",
    icon: MessageSquare,
    gradient: "from-blue-500 to-cyan-500",
    popular: true
  },
  {
    id: "hashtag-generator",
    title: "Hashtag Generator",
    description: "Find trending and relevant hashtags for maximum reach",
    icon: Hash,
    gradient: "from-purple-500 to-pink-500",
    popular: true
  },
  {
    id: "post-optimizer",
    title: "Post Optimizer",
    description: "Optimize your content for better engagement and reach",
    icon: Target,
    gradient: "from-green-500 to-emerald-500",
    popular: false
  },
  {
    id: "trend-analyzer",
    title: "Trend Analyzer",
    description: "Analyze current trends and suggest content strategies",
    icon: TrendingUp,
    gradient: "from-red-500 to-pink-500",
    popular: false
  },
  {
    id: "audience-insights",
    title: "Audience Insights",
    description: "Understand your audience better with AI-powered insights",
    icon: Users,
    gradient: "from-indigo-500 to-purple-500",
    popular: false
  }
];

const conversationHistory = [
  {
    type: "user",
    message: "I need help creating a LinkedIn post about our new product launch",
    timestamp: "2 minutes ago"
  },
  {
    type: "ai",
    message: "I'd be happy to help you create a compelling LinkedIn post for your product launch! Here's a suggestion:\n\n🚀 **Exciting News!** We're thrilled to introduce [Product Name] - the solution you've been waiting for!\n\nAfter months of development and testing, we're proud to launch a product that will [key benefit]. Our team has worked tirelessly to ensure this exceeds your expectations.\n\n✨ **Key Features:**\n• [Feature 1]\n• [Feature 2] \n• [Feature 3]\n\nReady to transform your [industry/workflow]? Learn more: [link]\n\n#ProductLaunch #Innovation #[YourIndustry] #NewProduct\n\nWould you like me to adjust the tone or focus on specific benefits?",
    timestamp: "2 minutes ago",
    suggestions: ["Make it more casual", "Add statistics", "Create shorter version"],
    liked: true
  }
];

const quickPrompts = [
  "Generate 5 Instagram post ideas for a tech startup",
  "Write a professional LinkedIn article intro about remote work",
  "Create hashtags for a fitness brand campaign", 
  "Suggest content pillars for a SaaS company",
  "Write a Twitter thread about digital marketing trends",
  "Generate captions for product showcase posts"
];

const recentGenerations = [
  {
    id: 1,
    type: "Content Ideas",
    query: "Instagram post ideas for sustainable fashion",
    result: "5 creative content ideas generated",
    timestamp: "1 hour ago",
    rating: 5
  },
  {
    id: 2,
    type: "Hashtag Generator",
    query: "Hashtags for tech product launch",
    result: "15 trending hashtags with engagement data",
    timestamp: "2 hours ago", 
    rating: 4
  },
  {
    id: 3,
    type: "Caption Writer",
    query: "LinkedIn post about team achievements",
    result: "Professional caption with engagement hooks",
    timestamp: "3 hours ago",
    rating: 5
  }
];

export default function AIAssistant() {
  const [selectedFeature, setSelectedFeature] = useState("content-ideas");
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const selectedFeatureData = aiFeatures.find(f => f.id === selectedFeature);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setUserInput("");
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    // Handle chat message
    setChatInput("");
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
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                AI Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your intelligent social media content companion
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Online
            </Badge>
            <Badge variant="secondary">
              GPT-4 Powered
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Features */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">AI Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiFeatures.map((feature, index) => (
                  <motion.button
                    key={feature.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedFeature(feature.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedFeature === feature.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-300 dark:border-blue-600 border'
                        : 'bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 hover:shadow-md border border-white/10'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient}`}>
                        <feature.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {feature.title}
                          </h4>
                          {feature.popular && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Workspace */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Current Tool */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedFeatureData && (
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${selectedFeatureData.gradient}`}>
                        <selectedFeatureData.icon className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-100">
                        {selectedFeatureData?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedFeatureData?.description}
                      </p>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="rounded-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Input Area */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Describe what you need:
                  </label>
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="E.g., Create 5 Instagram post ideas for a sustainable fashion brand targeting Gen Z..."
                    className="min-h-[100px] bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50 resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !userInput.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Quick Prompts */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quick Prompts:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.slice(0, 3).map((prompt, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="text-xs rounded-full"
                        onClick={() => setUserInput(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* AI Response Area */}
                <div className="min-h-[200px] p-4 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10">
                  {!isGenerating ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Bot className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Your AI-generated content will appear here
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-pulse">
                          <Bot className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                        </div>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          AI is generating your content...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  AI Chat
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* Chat History */}
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {conversationHistory.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.message}</p>
                        
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button key={idx} size="sm" variant="outline" className="text-xs h-6 rounded-full">
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className={`h-6 w-6 p-0 ${message.liked ? 'text-green-600' : ''}`}>
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex items-center space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything about your content..."
                    className="flex-1 bg-white/80 dark:bg-gray-700/80"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                  />
                  <Button 
                    onClick={handleSendChat}
                    disabled={!chatInput.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Generations */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Recent Generations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentGenerations.map((generation, index) => (
                  <motion.div
                    key={generation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Wand2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {generation.type}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {generation.query}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{generation.timestamp}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < generation.rating ? 'bg-yellow-400' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}