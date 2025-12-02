import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search,
  Hash,
  TrendingUp,
  TrendingDown,
  Copy,
  Heart,
  Eye,
  Users,
  BarChart3,
  Star,
  Plus,
  Filter,
  Zap,
  Target,
  Calendar,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";

const trendingHashtags = [
  { tag: "#DigitalMarketing", posts: "2.4M", engagement: "High", trend: "up", growth: "+15%", difficulty: "Medium", platforms: ["Instagram", "Twitter", "LinkedIn"] },
  { tag: "#SocialMediaTips", posts: "892K", engagement: "Very High", trend: "up", growth: "+28%", difficulty: "Easy", platforms: ["Instagram", "Twitter"] },
  { tag: "#ContentCreator", posts: "5.1M", engagement: "Medium", trend: "stable", growth: "+3%", difficulty: "High", platforms: ["Instagram", "TikTok"] },
  { tag: "#MarketingStrategy", posts: "1.2M", engagement: "High", trend: "up", growth: "+12%", difficulty: "Medium", platforms: ["LinkedIn", "Twitter"] },
  { tag: "#BrandBuilding", posts: "678K", engagement: "Very High", trend: "up", growth: "+22%", difficulty: "Easy", platforms: ["Instagram", "LinkedIn"] },
  { tag: "#InfluencerMarketing", posts: "3.8M", engagement: "Medium", trend: "down", growth: "-5%", difficulty: "High", platforms: ["Instagram", "YouTube"] },
  { tag: "#GrowthHacking", posts: "456K", engagement: "High", trend: "up", growth: "+18%", difficulty: "Medium", platforms: ["Twitter", "LinkedIn"] },
  { tag: "#SocialCommerce", posts: "234K", engagement: "Very High", trend: "up", growth: "+45%", difficulty: "Easy", platforms: ["Instagram", "Facebook"] }
];

const hashtagSets = [
  {
    name: "Startup Growth",
    tags: ["#StartupLife", "#Entrepreneur", "#GrowthHacking", "#Innovation", "#BusinessTips"],
    category: "Business",
    engagement: "8.4%",
    reach: "2.1M",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Content Marketing",
    tags: ["#ContentMarketing", "#SEO", "#BloggingTips", "#DigitalStrategy", "#MarketingTips"],
    category: "Marketing",
    engagement: "12.1%",
    reach: "1.8M",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Tech Innovation",
    tags: ["#TechNews", "#AI", "#Innovation", "#StartupTech", "#DigitalTransformation"],
    category: "Technology",
    engagement: "6.7%",
    reach: "3.2M",
    color: "from-green-500 to-emerald-500"
  }
];

const relatedKeywords = [
  { keyword: "social media", volume: "450K", competition: "High", trend: "stable" },
  { keyword: "digital marketing", volume: "320K", competition: "High", trend: "up" },
  { keyword: "content strategy", volume: "180K", competition: "Medium", trend: "up" },
  { keyword: "brand awareness", volume: "220K", competition: "Medium", trend: "stable" },
  { keyword: "engagement rate", volume: "95K", competition: "Low", trend: "up" },
  { keyword: "social media tools", volume: "140K", competition: "Medium", trend: "up" }
];

export default function HashtagResearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (hashtag: string) => {
    setFavorites(prev => 
      prev.includes(hashtag)
        ? prev.filter(h => h !== hashtag)
        : [...prev, hashtag]
    );
  };

  const copyHashtag = (hashtag: string) => {
    navigator.clipboard.writeText(hashtag);
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Very High': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'High': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'High': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600';
    }
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
              Hashtag Research
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover trending hashtags to maximize your reach
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" className="rounded-full">
              <Star className="h-4 w-4 mr-2" />
              Saved Sets ({hashtagSets.length})
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Set
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search hashtags, keywords, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            <Hash className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trending Hashtags */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Trending List */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-gray-100">Trending Hashtags</CardTitle>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingHashtags.map((hashtag, index) => (
                    <motion.div
                      key={hashtag.tag}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {hashtag.tag}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">{hashtag.posts}</span>
                            </div>
                            
                            <Badge className={getEngagementColor(hashtag.engagement)}>
                              {hashtag.engagement}
                            </Badge>
                            
                            <div className={`flex items-center space-x-1 ${
                              hashtag.trend === 'up' ? 'text-green-600' : 
                              hashtag.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {hashtag.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
                               hashtag.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : null}
                              <span className="text-sm">{hashtag.growth}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="text-right text-xs">
                            <p className="text-gray-500">Difficulty</p>
                            <p className={`font-medium ${getDifficultyColor(hashtag.difficulty)}`}>
                              {hashtag.difficulty}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleFavorite(hashtag.tag)}
                            >
                              <Star className={`h-4 w-4 ${favorites.includes(hashtag.tag) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => copyHashtag(hashtag.tag)}
                            >
                              <Copy className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Platform indicators */}
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-xs text-gray-500">Popular on:</span>
                        {hashtag.platforms.map((platform) => (
                          <div key={platform} className="flex items-center space-x-1">
                            {platform === 'Instagram' && <Instagram className="h-3 w-3 text-purple-500" />}
                            {platform === 'Twitter' && <Twitter className="h-3 w-3 text-blue-500" />}
                            {platform === 'LinkedIn' && <Linkedin className="h-3 w-3 text-blue-700" />}
                            <span className="text-xs text-gray-600 dark:text-gray-400">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Keywords */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Related Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedKeywords.map((keyword, index) => (
                    <motion.div
                      key={keyword.keyword}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {keyword.keyword}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                            <span>Vol: {keyword.volume}</span>
                            <span>•</span>
                            <span className={getDifficultyColor(keyword.competition)}>
                              {keyword.competition}
                            </span>
                          </div>
                        </div>
                        <div className={`text-xs ${
                          keyword.trend === 'up' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {keyword.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : null}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Hashtag Sets */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Saved Hashtag Sets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hashtagSets.map((set, index) => (
                  <motion.div
                    key={set.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10 cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${set.color}`}>
                        <Hash className="h-4 w-4 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {set.tags.length} tags
                      </Badge>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{set.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{set.category}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Engagement:</span>
                        <span className="ml-1 font-medium text-green-600">{set.engagement}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Reach:</span>
                        <span className="ml-1 font-medium text-blue-600">{set.reach}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {set.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {set.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{set.tags.length - 3}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white justify-start">
                  <Zap className="h-4 w-4 mr-2" />
                  Generate AI Hashtags
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Competitor Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Trending Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance Report
                </Button>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Hashtag Searches</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">127 / 200</span>
                  </div>
                  <Progress value={63.5} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">AI Generations</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">45 / 100</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Saved Sets</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">3 / 10</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}