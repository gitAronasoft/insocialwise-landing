import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  Users, 
  Share2, 
  MessageCircle,
  Download,
  Calendar,
  Target,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ArrowUp,
  ArrowDown,
  Play,
  ThumbsUp,
  ExternalLink,
  MoreHorizontal,
  Youtube,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const socialMediaMetrics = {
  totalEngagement: "847K",
  engagementGrowth: "+23%",
  totalReach: "2.4M",
  reachGrowth: "+15%",
  totalImpressions: "3.8M", 
  impressionsGrowth: "+18%",
  totalFollowers: "125K",
  followersGrowth: "+12%"
};

const platformMetrics = [
  {
    name: "Facebook",
    icon: Facebook,
    followers: "45.2K",
    engagement: "7.8%",
    color: "from-blue-600 to-blue-800",
    posts: 28,
    reach: "234K",
    growth: "+12%",
    impressions: "456K",
    likes: "12.4K",
    comments: "2.1K",
    shares: "892",
    saves: "1.2K",
    ctr: "3.2%",
    cpm: "$2.15",
    topPost: "5 Marketing Trends to Watch in 2024",
    avgEngagementTime: "2m 45s"
  },
  {
    name: "LinkedIn", 
    icon: Linkedin,
    followers: "18.9K",
    engagement: "4.1%",
    color: "from-blue-600 to-blue-800",
    posts: 15,
    reach: "156K", 
    growth: "+8%",
    impressions: "289K",
    likes: "5.6K",
    comments: "892",
    shares: "456",
    saves: "234",
    ctr: "2.8%",
    cpm: "$3.45",
    topPost: "Customer Success Story: 40% Growth",
    avgEngagementTime: "3m 12s"
  },
  {
    name: "Instagram",
    icon: Instagram,
    followers: "32.1K",
    engagement: "9.2%",
    color: "from-purple-500 to-pink-500",
    posts: 42,
    reach: "189K",
    growth: "+18%",
    impressions: "342K",
    likes: "18.7K",
    comments: "3.4K",
    shares: "1.2K",
    saves: "2.8K",
    ctr: "4.1%",
    cpm: "$1.89",
    topPost: "Behind the Scenes: Our Creative Process",
    avgEngagementTime: "1m 58s"
  },
  {
    name: "Twitter",
    icon: Twitter,
    followers: "14.6K",
    engagement: "6.1%",
    color: "from-blue-400 to-blue-600",
    posts: 67,
    reach: "98K",
    growth: "+15%",
    impressions: "178K",
    likes: "8.9K",
    comments: "1.7K",
    shares: "2.1K",
    saves: "567",
    ctr: "3.7%",
    cpm: "$1.25",
    topPost: "Quick Tips: Boosting Social Media Engagement",
    avgEngagementTime: "45s"
  },
  {
    name: "YouTube",
    icon: Youtube,
    followers: "8.4K",
    engagement: "12.3%",
    color: "from-red-500 to-red-700",
    posts: 12,
    reach: "67K",
    growth: "+25%",
    impressions: "124K",
    likes: "4.2K",
    comments: "892",
    shares: "345",
    saves: "1.1K",
    ctr: "8.9%",
    cpm: "$4.67",
    topPost: "How to Build a Successful Content Strategy",
    avgEngagementTime: "4m 32s"
  },
  {
    name: "TikTok",
    icon: Play,
    followers: "24.7K",
    engagement: "15.6%",
    color: "from-gray-800 to-gray-900",
    posts: 35,
    reach: "145K",
    growth: "+32%",
    impressions: "267K",
    likes: "23.4K",
    comments: "4.7K",
    shares: "3.2K",
    saves: "1.8K",
    ctr: "6.2%",
    cpm: "$0.89",
    topPost: "60-Second Marketing Hack That Works",
    avgEngagementTime: "58s"
  }
];

// Platform-specific followers data over time
const platformFollowersData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  platforms: [
    {
      name: "Facebook",
      data: [38000, 39500, 41000, 42800, 44100, 45200],
      color: "#1877f2",
      icon: Facebook
    },
    {
      name: "Instagram", 
      data: [28000, 28900, 29800, 30700, 31400, 32100],
      color: "#e4405f",
      icon: Instagram
    },
    {
      name: "LinkedIn",
      data: [16500, 17200, 17800, 18200, 18600, 18900],
      color: "#0a66c2",
      icon: Linkedin
    },
    {
      name: "Twitter",
      data: [12800, 13200, 13600, 14000, 14300, 14600],
      color: "#1da1f2",
      icon: Twitter
    },
    {
      name: "YouTube",
      data: [7200, 7500, 7800, 8000, 8200, 8400],
      color: "#ff0000",
      icon: Youtube
    },
    {
      name: "TikTok",
      data: [21000, 22100, 23200, 23800, 24300, 24700],
      color: "#000000",
      icon: Play
    }
  ]
};

// Platform-specific impressions data over time
const platformImpressionsData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  platforms: [
    {
      name: "Facebook",
      data: [380000, 395000, 410000, 428000, 441000, 456000],
      color: "#1877f2",
      icon: Facebook
    },
    {
      name: "Instagram",
      data: [280000, 289000, 298000, 315000, 328000, 342000],
      color: "#e4405f",
      icon: Instagram
    },
    {
      name: "LinkedIn",
      data: [245000, 252000, 261000, 275000, 282000, 289000],
      color: "#0a66c2",
      icon: Linkedin
    },
    {
      name: "Twitter",
      data: [152000, 158000, 165000, 170000, 174000, 178000],
      color: "#1da1f2",
      icon: Twitter
    },
    {
      name: "YouTube",
      data: [105000, 110000, 115000, 119000, 122000, 124000],
      color: "#ff0000",
      icon: Youtube
    },
    {
      name: "TikTok",
      data: [220000, 235000, 248000, 255000, 261000, 267000],
      color: "#000000",
      icon: Play
    }
  ]
};

const topPostsByViews = [
  {
    id: 1,
    title: "5 Marketing Trends to Watch in 2024",
    content: "The marketing landscape is evolving rapidly. Here are the top 5 trends...",
    platform: "LinkedIn",
    views: "45.2K",
    likes: 1234,
    comments: 89,
    shares: 156,
    engagement: "7.8%",
    date: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop"
  },
  {
    id: 2,
    title: "Behind the Scenes: Our Creative Process", 
    content: "Take a peek into how we bring ideas to life! Our creative team's journey...",
    platform: "Instagram",
    views: "38.9K",
    likes: 2156,
    comments: 234,
    shares: 89,
    engagement: "9.2%",
    date: "Mar 14, 2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop"
  },
  {
    id: 3,
    title: "Quick Tips: Boosting Social Media Engagement",
    content: "3 proven strategies to increase your social media engagement...",
    platform: "Twitter",
    views: "28.1K",
    likes: 892,
    comments: 67,
    shares: 234,
    engagement: "6.1%",
    date: "Mar 13, 2024", 
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop"
  },
  {
    id: 4,
    title: "Customer Success Story: 40% Growth",
    content: "Amazing results from our partnership with TechStartup! 40% increase...",
    platform: "LinkedIn",
    views: "22.4K",
    likes: 567,
    comments: 45,
    shares: 123,
    engagement: "8.9%",
    date: "Mar 12, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
  },
  {
    id: 5,
    title: "Team Building Workshop Highlights",
    content: "What an incredible day with our team! Our quarterly workshop...", 
    platform: "Instagram",
    views: "18.7K",
    likes: 734,
    comments: 23,
    shares: 67,
    engagement: "5.4%",
    date: "Mar 10, 2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop"
  }
];

const socialAnalyticsData = [
  { platform: "Facebook", value: 85, color: "from-blue-600 to-blue-800" },
  { platform: "Instagram", value: 92, color: "from-purple-500 to-pink-500" },
  { platform: "Twitter", value: 78, color: "from-blue-400 to-blue-600" },
  { platform: "LinkedIn", value: 89, color: "from-blue-600 to-blue-800" },
  { platform: "YouTube", value: 76, color: "from-red-500 to-red-700" },
  { platform: "TikTok", value: 94, color: "from-gray-800 to-gray-900" }
];

export default function AnalyticsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return Facebook;
      case 'Instagram': return Instagram;
      case 'Twitter': return Twitter;  
      case 'LinkedIn': return Linkedin;
      default: return MessageCircle;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'text-blue-600';
      case 'Instagram': return 'text-purple-500';
      case 'Twitter': return 'text-blue-400';
      case 'LinkedIn': return 'text-blue-700';
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
              Social Media Engagement
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive analytics and performance insights across all platforms
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Social Media Engagement Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
                  <Heart className="h-6 w-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent" />
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {socialMediaMetrics.engagementGrowth}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {socialMediaMetrics.totalEngagement}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Engagement</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                  <Eye className="h-6 w-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent" />
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {socialMediaMetrics.reachGrowth}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {socialMediaMetrics.totalReach}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Reach</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                  <BarChart3 className="h-6 w-6 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent" />
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {socialMediaMetrics.impressionsGrowth}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {socialMediaMetrics.totalImpressions}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Impressions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
                  <Users className="h-6 w-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" />
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {socialMediaMetrics.followersGrowth}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {socialMediaMetrics.totalFollowers}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Followers</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Performance */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {platformMetrics.map((platform, index) => {
                  return (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 hover:shadow-md transition-all duration-300"
                    >
                      {/* Header with Platform Icon and Eye Button */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex justify-center flex-1">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color}`}>
                            <platform.icon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        
                        {/* Eye Icon Button */}
                        <Link href={`/platform/${platform.name}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 rounded-full"
                          >
                            <Eye className="h-3 w-3 transition-colors text-gray-500 hover:text-blue-600" />
                          </Button>
                        </Link>
                      </div>
                      
                      {/* Platform Name */}
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
                        {platform.name}
                      </h3>
                      
                      {/* Basic Metrics */}
                      <div className="space-y-3">
                        {/* Views (using reach) */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              {platform.reach}
                            </span>
                            {platform.growth.startsWith('+') ? (
                              <ArrowUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                        
                        {/* Followers */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Followers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              {platform.followers}
                            </span>
                            {platform.growth.startsWith('+') ? (
                              <ArrowUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                        
                        {/* Impressions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="h-3 w-3 text-orange-600" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Impressions</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              {platform.impressions}
                            </span>
                            {platform.growth.startsWith('+') ? (
                              <ArrowUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Followers Line Chart */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Followers Growth by Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative mb-4">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Platform lines */}
                    {platformFollowersData.platforms.map((platform, platformIndex) => {
                      const maxValue = Math.max(...platformFollowersData.platforms.flatMap(p => p.data));
                      const minValue = Math.min(...platformFollowersData.platforms.flatMap(p => p.data));
                      const range = maxValue - minValue;
                      
                      // Calculate points for the line
                      const points = platform.data.map((value, index) => {
                        const x = (index / (platform.data.length - 1)) * 350 + 25; // Leave margins
                        const y = 170 - ((value - minValue) / range) * 140; // Invert Y and scale
                        return `${x},${y}`;
                      }).join(' ');
                      
                      return (
                        <g key={platform.name}>
                          <motion.polyline
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 + platformIndex * 0.3 }}
                            fill="none"
                            stroke={platform.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={points}
                          />
                          {/* Data points */}
                          {platform.data.map((value, pointIndex) => {
                            const x = (pointIndex / (platform.data.length - 1)) * 350 + 25;
                            const y = 170 - ((value - minValue) / range) * 140;
                            return (
                              <motion.circle
                                key={pointIndex}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.0 + platformIndex * 0.3 + pointIndex * 0.1 }}
                                cx={x}
                                cy={y}
                                r="4"
                                fill={platform.color}
                                stroke="white"
                                strokeWidth="2"
                              />
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600 dark:text-gray-400 px-6">
                    {platformFollowersData.months.map((month) => (
                      <span key={month} className="text-xs">{month}</span>
                    ))}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-3 gap-2">
                  {platformFollowersData.platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                      <platform.icon className="h-3 w-3" style={{ color: platform.color }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{platform.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impressions Line Chart */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Impressions Growth by Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative mb-4">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid2" width="80" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid2)" />
                    
                    {/* Platform lines */}
                    {platformImpressionsData.platforms.map((platform, platformIndex) => {
                      const maxValue = Math.max(...platformImpressionsData.platforms.flatMap(p => p.data));
                      const minValue = Math.min(...platformImpressionsData.platforms.flatMap(p => p.data));
                      const range = maxValue - minValue;
                      
                      // Calculate points for the line
                      const points = platform.data.map((value, index) => {
                        const x = (index / (platform.data.length - 1)) * 350 + 25; // Leave margins
                        const y = 170 - ((value - minValue) / range) * 140; // Invert Y and scale
                        return `${x},${y}`;
                      }).join(' ');
                      
                      return (
                        <g key={platform.name}>
                          <motion.polyline
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 + platformIndex * 0.3 }}
                            fill="none"
                            stroke={platform.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={points}
                          />
                          {/* Data points */}
                          {platform.data.map((value, pointIndex) => {
                            const x = (pointIndex / (platform.data.length - 1)) * 350 + 25;
                            const y = 170 - ((value - minValue) / range) * 140;
                            return (
                              <motion.circle
                                key={pointIndex}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.0 + platformIndex * 0.3 + pointIndex * 0.1 }}
                                cx={x}
                                cy={y}
                                r="4"
                                fill={platform.color}
                                stroke="white"
                                strokeWidth="2"
                              />
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600 dark:text-gray-400 px-6">
                    {platformImpressionsData.months.map((month) => (
                      <span key={month} className="text-xs">{month}</span>
                    ))}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-3 gap-2">
                  {platformImpressionsData.platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                      <platform.icon className="h-3 w-3" style={{ color: platform.color }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{platform.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>


        {/* Top Posts by Views Table */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Top Posts by Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPostsByViews.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 hover:shadow-md transition-all duration-300"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              {(() => {
                                const IconComponent = getPlatformIcon(post.platform);
                                return <IconComponent className={`h-4 w-4 ${getPlatformColor(post.platform)}`} />;
                              })()}
                              <span className={`text-xs font-medium ${getPlatformColor(post.platform)}`}>
                                {post.platform}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{post.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 ml-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                              {post.views}
                            </p>
                            <p className="text-xs text-gray-500">Views</p>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Share2 className="h-4 w-4" />
                              <span>{post.shares}</span>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {post.engagement}
                            </Badge>
                          </div>
                          
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Analytics Chart */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Social Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialAnalyticsData.map((platform, index) => (
                  <motion.div
                    key={platform.platform}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-20 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {platform.platform}
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${platform.value}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${platform.color} rounded-full`}
                      />
                    </div>
                    <div className="w-12 text-sm font-bold text-gray-900 dark:text-gray-100">
                      {platform.value}%
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