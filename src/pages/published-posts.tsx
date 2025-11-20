import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Calendar,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  MoreHorizontal,
  Copy,
  Edit,
  ExternalLink,
  Filter,
  Download,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  BarChart3,
  Users,
  Grid3x3,
  List
} from "lucide-react";

const publishedPosts = [
  {
    id: 1,
    title: "5 Marketing Trends to Watch in 2024",
    content: "The marketing landscape is evolving rapidly. Here are the top 5 trends that will shape digital marketing in 2024... #Marketing #Trends #2024",
    platform: "LinkedIn",
    icon: Linkedin,
    color: "from-blue-600 to-blue-800",
    publishedDate: "2 hours ago",
    scheduledDate: "Mar 15, 2024 at 10:00 AM",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    metrics: {
      reach: "12.4K",
      impressions: "18.7K", 
      likes: 234,
      comments: 18,
      shares: 45,
      engagement: "7.8%"
    },
    performance: "Very High",
    status: "published"
  },
  {
    id: 2,
    title: "Behind the Scenes: Our Creative Process",
    content: "Take a peek into how we bring ideas to life! Our creative team's journey from concept to execution ✨ #BehindTheScenes #Creativity",
    platform: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-pink-500",
    publishedDate: "1 day ago",
    scheduledDate: "Mar 14, 2024 at 3:00 PM",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    metrics: {
      reach: "8.9K",
      impressions: "15.2K",
      likes: 456,
      comments: 32,
      shares: 28,
      engagement: "9.2%"
    },
    performance: "High",
    status: "published"
  },
  {
    id: 3,
    title: "Quick Tips: Boosting Social Media Engagement",
    content: "🚀 3 proven strategies to increase your social media engagement: 1️⃣ Post at optimal times 2️⃣ Use interactive content 3️⃣ Engage with your audience #SocialMediaTips #Engagement",
    platform: "Twitter",
    icon: Twitter,
    color: "from-blue-400 to-blue-600", 
    publishedDate: "2 days ago",
    scheduledDate: "Mar 13, 2024 at 9:00 AM",
    image: null,
    metrics: {
      reach: "5.6K",
      impressions: "9.8K",
      likes: 89,
      comments: 12,
      shares: 34,
      engagement: "6.1%"
    },
    performance: "Medium",
    status: "published"
  },
  {
    id: 4,
    title: "Customer Success Story: 40% Growth",
    content: "Amazing results from our partnership with @TechStartup! 📈 40% increase in online engagement and 25% boost in sales. Here's how we did it...",
    platform: "LinkedIn",
    icon: Linkedin,
    color: "from-blue-600 to-blue-800",
    publishedDate: "3 days ago",
    scheduledDate: "Mar 12, 2024 at 2:00 PM",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    metrics: {
      reach: "15.3K",
      impressions: "24.1K",
      likes: 312,
      comments: 28,
      shares: 67,
      engagement: "8.9%"
    },
    performance: "Very High",
    status: "published"
  },
  {
    id: 5,
    title: "Team Building Workshop Highlights",
    content: "What an incredible day with our team! 🎉 Our quarterly team building workshop was filled with innovation, collaboration, and lots of fun. Swipe to see the highlights! #TeamBuilding #Company Culture",
    platform: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-pink-500",
    publishedDate: "5 days ago",
    scheduledDate: "Mar 10, 2024 at 4:00 PM",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    metrics: {
      reach: "6.7K",
      impressions: "11.4K",
      likes: 189,
      comments: 15,
      shares: 23,
      engagement: "5.4%"
    },
    performance: "Medium",
    status: "published"
  },
  {
    id: 6,
    title: "Industry Report: Digital Transformation Trends",
    content: "Our latest research reveals key insights into digital transformation across industries. Download the full report to see what's driving change in 2024.",
    platform: "Facebook",
    icon: Facebook,
    color: "from-blue-600 to-blue-800",
    publishedDate: "1 week ago",
    scheduledDate: "Mar 8, 2024 at 11:00 AM",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    metrics: {
      reach: "4.2K",
      impressions: "7.9K",
      likes: 67,
      comments: 8,
      shares: 19,
      engagement: "4.3%"
    },
    performance: "Low",
    status: "published"
  }
];

export default function PublishedPosts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedPerformance, setSelectedPerformance] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const matchesPerformance = selectedPerformance === 'all' || post.performance === selectedPerformance;
    
    return matchesSearch && matchesPlatform && matchesPerformance;
  });

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Very High': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'High': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Low': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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
              Published Posts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track performance of your published content
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" className="rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center space-x-2 flex-1 min-w-64">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50"
            />
          </div>
          
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPerformance} onValueChange={setSelectedPerformance}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Performance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Performance</SelectItem>
              <SelectItem value="Very High">Very High</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="performance">Best Performance</SelectItem>
              <SelectItem value="engagement">Highest Engagement</SelectItem>
              <SelectItem value="reach">Most Reach</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-white/80 dark:bg-gray-800/80 rounded-lg p-1 border border-gray-200/50 dark:border-gray-600/50">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Posts Grid/List */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            : "space-y-4"
          }
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {viewMode === "grid" ? (
                // Grid View - Existing Block Template
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${post.color}`}>
                          <post.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {post.publishedDate} • {post.platform}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Badge className={getPerformanceColor(post.performance)}>
                          {post.performance}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                  {/* Platform-specific Preview */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 mx-4 mb-4">
                    {post.platform === 'Facebook' && (
                      // Facebook Preview - 100% authentic design
                      <>
                        {/* Post Header */}
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Facebook User</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{post.publishedDate}</p>
                            </div>
                          </div>
                          <div className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="px-4 pb-3">
                          <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-3">
                            {post.content}
                          </div>
                        </div>

                        {/* Post Image */}
                        {post.image && (
                          <div className="border-t border-gray-100 dark:border-gray-700">
                            <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                              <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}

                        {/* Post Stats */}
                        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-500">😊</span>
                              <span className="text-red-500">❤️</span>
                              <span>{post.metrics.likes}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span>{post.metrics.comments} comments</span>
                              <span>{post.metrics.shares} shares</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t border-gray-100 dark:border-gray-700">
                          <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
                            <button className="flex items-center justify-center py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V9a2 2 0 00-2-2H7.414a1 1 0 00-.707.293L3.586 10.414A1 1 0 003 11.207V16.793a1 1 0 00.293.707L6.414 20.414A1 1 0 007.414 21H12a2 2 0 002-2v-5z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Like</span>
                            </button>
                            <button className="flex items-center justify-center py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Comment</span>
                            </button>
                            <button className="flex items-center justify-center py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Share</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {post.platform === 'Instagram' && (
                      // Instagram Preview
                      <>
                        <div className="p-3 flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">IG</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs">instagram_user</h4>
                          </div>
                        </div>
                        {post.image && (
                          <div className="aspect-square bg-black">
                            <img src={post.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-3">
                          <div className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">
                            <span className="font-semibold">instagram_user</span> {post.content}
                          </div>
                        </div>
                      </>
                    )}

                    {post.platform === 'Twitter' && (
                      // Twitter Preview
                      <>
                        <div className="p-3">
                          <div className="flex space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">TW</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-1">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Twitter User</h4>
                                <span className="text-gray-500 text-sm">@twitter_user</span>
                                <span className="text-gray-500">·</span>
                                <span className="text-gray-500 text-sm">{post.publishedDate}</span>
                              </div>
                              <div className="text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-3">
                                {post.content}
                              </div>
                              {post.image && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                  <div className="aspect-video bg-black">
                                    <img src={post.image} alt="Preview" className="w-full h-full object-contain" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {post.platform === 'LinkedIn' && (
                      // LinkedIn Preview
                      <>
                        <div className="p-3 flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">LI</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">LinkedIn User</h4>
                            <p className="text-xs text-gray-500">Professional Title • {post.publishedDate}</p>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-2 line-clamp-3">
                              {post.content}
                            </div>
                            {post.image && (
                              <div className="mt-2 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="aspect-video bg-black">
                                  <img src={post.image} alt="Preview" className="w-full h-full object-contain" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-3 w-3 text-blue-600 mr-1" />
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Reach</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{post.metrics.reach}</p>
                      </div>
                      
                      <div className="p-2 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="h-3 w-3 text-purple-600 mr-1" />
                          <span className="text-xs font-medium text-purple-700 dark:text-purple-400">Engagement</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{post.metrics.engagement}</p>
                      </div>
                    </div>

                    {/* Engagement Details */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{formatNumber(post.metrics.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.metrics.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="h-3 w-3" />
                        <span>{post.metrics.shares}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{post.metrics.impressions}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs rounded-full">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Post
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ) : (
                // List View 
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center p-4 space-x-4">
                    {/* Platform Icon */}
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${post.color} flex-shrink-0`}>
                      <post.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <span>{post.publishedDate}</span>
                            <span>•</span>
                            <span>{post.platform}</span>
                            <Badge className={getPerformanceColor(post.performance)}>
                              {post.performance}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Metrics */}
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 ml-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.metrics.reach}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{formatNumber(post.metrics.likes)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.metrics.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{post.metrics.engagement}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button size="sm" variant="outline" className="text-xs rounded-full">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {filteredPosts.length >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button variant="outline" className="rounded-full">
              Load More Posts
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}