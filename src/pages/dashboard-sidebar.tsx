import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  LayoutDashboard,
  Users,
  FileText,
  Edit3,
  Plus,
  Calendar,
  BarChart3,
  Megaphone,
  Inbox,
  Settings,
  Search,
  Bell,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  ChevronRight,
  Sparkles,
  Clock,
  Target,
  Zap,
  Star,
  ArrowUp,
  Activity,
  Globe,
  Layers,
  PieChart,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Menu,
  X,
  Hash
} from "lucide-react";
import { Link, useLocation } from "wouter";

const statsData = [
  {
    title: "Total Posts",
    value: "127",
    change: "+22%",
    changeType: "increase",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+0.3%",
    changeType: "increase",
    icon: Heart,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30"
  },
  {
    title: "Followers",
    value: "3.4k",
    change: "+12%",
    changeType: "increase",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
  },
  {
    title: "Reach",
    value: "15.7K",
    change: "+18%",
    changeType: "increase",
    icon: Eye,
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
  }
];

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "reports", label: "Reports", icon: PieChart, path: "/reports" },
  { id: "create", label: "Create Post", icon: Plus, path: "/create" },
  { id: "calendar", label: "Content Calendar", icon: Calendar, path: "/calendar" },
  { id: "posts", label: "Published Posts", icon: FileText, path: "/posts" },
  { id: "media", label: "Media Library", icon: Layers, path: "/media" },
  { id: "campaigns", label: "Campaigns", icon: Megaphone, path: "/campaigns" },
  { id: "ai-assistant", label: "AI Assistant", icon: Sparkles, path: "/ai-assistant" },
  { id: "hashtags", label: "Hashtag Research", icon: Hash, path: "/hashtags" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" }
];

const connectedPlatforms = [
  { 
    name: "Instagram", 
    icon: Instagram, 
    followers: "2.1K", 
    gradient: "from-purple-500 to-pink-500",
    posts: 24,
    engagement: "5.2%"
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    followers: "856", 
    gradient: "from-blue-400 to-blue-600",
    posts: 18,
    engagement: "3.8%"
  },
  { 
    name: "Facebook", 
    icon: Facebook, 
    followers: "432", 
    gradient: "from-blue-600 to-blue-800",
    posts: 12,
    engagement: "4.1%"
  }
];

const recentActivity = [
  {
    type: "post",
    platform: "Instagram",
    content: "New product launch announcement",
    time: "2 hours ago",
    engagement: "24 likes, 5 comments",
    status: "published"
  },
  {
    type: "schedule",
    platform: "Twitter",
    content: "Weekly industry insights thread",
    time: "Tomorrow at 9:00 AM",
    engagement: "Scheduled",
    status: "scheduled"
  },
  {
    type: "draft",
    platform: "LinkedIn",
    content: "Company culture spotlight",
    time: "Draft saved",
    engagement: "In progress",
    status: "draft"
  }
];

const quickActions = [
  { icon: Plus, label: "Create Post", gradient: "from-green-500 to-emerald-500", path: "/create" },
  { icon: Calendar, label: "Schedule", gradient: "from-blue-500 to-cyan-500", path: "/calendar" },
  { icon: BarChart3, label: "Analytics", gradient: "from-purple-500 to-violet-500", path: "/analytics" },
  { icon: Target, label: "Campaigns", gradient: "from-orange-500 to-red-500", path: "/campaigns" }
];

export default function DashboardSidebar() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed lg:relative w-80 h-screen bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-white/20 z-50"
        >
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    insocialwise
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Social Media Dashboard</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="p-4 space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = location === item.path;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={item.path}>
                    <div className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/50 backdrop-blur-sm'
                    }`}>
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions in Sidebar */}
          <div className="p-4 mt-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={action.path}>
                    <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 cursor-pointer">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${action.gradient}`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {action.label}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Top Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40"
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-full"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                  
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Welcome back, Sudhir! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Let's make magic happen with your social media strategy
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="hidden md:block relative">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 w-64 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </Button>
                  
                  {/* Profile */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/api/placeholder/40/40" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                      SK
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Dashboard Content */}
          <div className="p-6 space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className={`h-2 bg-gradient-to-r ${stat.gradient}`}></div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.bgGradient}`}>
                            <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                          </div>
                          <Badge className={`bg-gradient-to-r ${stat.gradient} text-white border-0`}>
                            <ArrowUp className="h-3 w-3 mr-1" />
                            {stat.change}
                          </Badge>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:scale-105 transition-transform">
                          {stat.value}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Connected Platforms */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2">
                          Connected Platforms
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Monitor all your social media accounts in one place
                        </p>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Platform
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20" align="end">
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              Connect Social Platform
                            </h4>
                            <div className="space-y-2">
                              {[
                                { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800', description: 'Connect your Facebook page' },
                                { name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500', description: 'Connect your Instagram account' },
                                { name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600', description: 'Connect your Twitter account' },
                                { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800', description: 'Connect your LinkedIn profile' },
                                { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700', description: 'Connect your YouTube channel' }
                              ].map((platform, index) => (
                                <motion.button
                                  key={platform.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ scale: 1.02, x: 4 }}
                                  className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 border border-white/20 hover:shadow-md transition-all duration-300 text-left group"
                                >
                                  <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                    <platform.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                      {platform.name}
                                    </h5>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {platform.description}
                                    </p>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {connectedPlatforms.map((platform, index) => (
                      <motion.div
                        key={platform.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border border-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${platform.gradient}`}>
                              <platform.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                {platform.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {platform.followers} followers
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-4 text-sm">
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Posts: </span>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {platform.posts}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Engagement: </span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                  {platform.engagement}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10 backdrop-blur-sm"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'published' ? 'bg-green-500' :
                            activity.status === 'scheduled' ? 'bg-blue-500' :
                            'bg-orange-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {activity.content}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {activity.platform} • {activity.time}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {activity.engagement}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    <Button variant="ghost" className="w-full text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl">
                      View All Activity
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Scheduled Posts */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2">
                        Scheduled Posts
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Your upcoming posts for this week
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-sm rounded-full">
                        View All Scheduled
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Post
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                      const currentDate = new Date(Date.now() + index * 24 * 60 * 60 * 1000);
                      const scheduledPosts: { [key: number]: Array<{ time: string; platform: string; title: string; image: string; scheduledDateTime: string; }> } = {
                        0: [{ 
                          time: '9:00 AM', 
                          platform: 'Instagram', 
                          title: 'Morning Motivation Quote',
                          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center',
                          scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 9:00 AM`
                        }],
                        1: [{ 
                          time: '2:00 PM', 
                          platform: 'Twitter', 
                          title: 'Industry Insights Thread',
                          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center',
                          scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 2:00 PM`
                        }],
                        2: [
                          { 
                            time: '11:00 AM', 
                            platform: 'LinkedIn', 
                            title: 'Company Update',
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
                            scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 11:00 AM`
                          }, 
                          { 
                            time: '4:00 PM', 
                            platform: 'Facebook', 
                            title: 'Product Showcase',
                            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&crop=center',
                            scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 4:00 PM`
                          }
                        ],
                        3: [{ 
                          time: '10:00 AM', 
                          platform: 'Instagram', 
                          title: 'Behind-the-Scenes Video',
                          image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=100&h=100&fit=crop&crop=center',
                          scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 10:00 AM`
                        }],
                        4: [{ 
                          time: '3:00 PM', 
                          platform: 'Twitter', 
                          title: 'Weekly Roundup',
                          image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=100&h=100&fit=crop&crop=center',
                          scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 3:00 PM`
                        }],
                        5: [],
                        6: [{ 
                          time: '12:00 PM', 
                          platform: 'Instagram', 
                          title: 'Weekend Vibes',
                          image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center',
                          scheduledDateTime: `${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 12:00 PM`
                        }]
                      };
                      const posts = scheduledPosts[index] || [];
                      
                      return (
                        <motion.div
                          key={day}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-4 border border-white/20 backdrop-blur-sm min-h-[200px] hover:shadow-lg transition-all duration-300"
                        >
                          <div className="text-center mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                              {day}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            {posts.length > 0 ? (
                              posts.map((post: { time: string; platform: string; title: string; image: string; scheduledDateTime: string; }, postIndex: number) => (
                                <motion.div
                                  key={postIndex}
                                  whileHover={{ scale: 1.02 }}
                                  className="p-3 bg-white/60 dark:bg-gray-600/30 rounded-lg border border-white/30 backdrop-blur-sm"
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className="relative">
                                      <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-12 h-12 rounded-lg object-cover"
                                      />
                                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                                        post.platform === 'Instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                        post.platform === 'Twitter' ? 'bg-blue-500' :
                                        post.platform === 'LinkedIn' ? 'bg-blue-700' :
                                        'bg-blue-600'
                                      }`}>
                                        {post.platform === 'Instagram' && <Instagram className="h-2 w-2 text-white" />}
                                        {post.platform === 'Twitter' && <Twitter className="h-2 w-2 text-white" />}
                                        {post.platform === 'LinkedIn' && <Linkedin className="h-2 w-2 text-white" />}
                                        {post.platform === 'Facebook' && <Facebook className="h-2 w-2 text-white" />}
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {post.title}
                                      </h5>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {post.scheduledDateTime}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              ))
                            ) : (
                              <div className="text-center py-6">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-400 dark:text-gray-500">No posts scheduled</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Trending Topics */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-100 text-lg mb-1">
                        Trending Topics
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        Popular topics to inspire your next post
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Search className="h-3 w-3 text-gray-500" />
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger className="w-40 h-8 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-white/20 text-xs">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Industries">All Industries</SelectItem>
                        <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Sustainability">Sustainability</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Wellness">Wellness</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        topic: 'AI in Marketing',
                        industry: 'Digital Marketing',
                        reach: '2.3M',
                        growth: '+45%',
                        engagement: 'High',
                        hashtags: ['#AIMarketing', '#MarTech', '#DigitalTransformation']
                      },
                      {
                        topic: 'Remote Work Culture',
                        industry: 'Human Resources',
                        reach: '1.8M',
                        growth: '+32%',
                        engagement: 'Very High',
                        hashtags: ['#RemoteWork', '#WorkCulture', '#DigitalNomad']
                      },
                      {
                        topic: 'Sustainable Business',
                        industry: 'Sustainability',
                        reach: '950K',
                        growth: '+67%',
                        engagement: 'High',
                        hashtags: ['#Sustainability', '#GreenBusiness', '#ESG']
                      },
                      {
                        topic: 'Blockchain Technology',
                        industry: 'Technology',
                        reach: '1.2M',
                        growth: '+28%',
                        engagement: 'Medium',
                        hashtags: ['#Blockchain', '#Web3', '#CryptoTech']
                      },
                      {
                        topic: 'Mental Health at Work',
                        industry: 'Wellness',
                        reach: '1.5M',
                        growth: '+54%',
                        engagement: 'Very High',
                        hashtags: ['#MentalHealth', '#WorkWellness', '#SelfCare']
                      },
                      {
                        topic: 'Social Commerce',
                        industry: 'E-commerce',
                        reach: '890K',
                        growth: '+41%',
                        engagement: 'High',
                        hashtags: ['#SocialCommerce', '#Ecommerce', '#SocialSelling']
                      }
                    ]
                    .filter(trend => selectedIndustry === 'All Industries' || trend.industry === selectedIndustry)
                    .slice(0, 4)
                    .map((trend, index) => (
                      <motion.div
                        key={trend.topic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs">
                                {trend.topic}
                              </h4>
                              <Badge className={`text-xs ${
                                trend.engagement === 'Very High' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                trend.engagement === 'High' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}>
                                {trend.engagement}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-3 text-xs mb-1">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-2 w-2 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">{trend.reach}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-2 w-2 text-green-500" />
                                <span className="text-green-600 dark:text-green-400 font-medium">{trend.growth}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs rounded-full h-6 px-2"
                          >
                            <Sparkles className="h-2 w-2 mr-1" />
                            AI
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Performance Score */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-100 text-lg mb-1">
                        Social Performance Score
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        Track your overall social media performance
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Overall Score */}
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl border border-white/20">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        87
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Overall Score</p>
                      <div className="flex items-center justify-center space-x-1 mt-2">
                        <ArrowUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">+5 this week</span>
                      </div>
                    </div>

                    {/* Performance Breakdown */}
                    <div className="space-y-3">
                      {[
                        { metric: 'Engagement Rate', score: 92, platform: 'Instagram', color: 'from-pink-500 to-purple-500' },
                        { metric: 'Content Quality', score: 88, platform: 'LinkedIn', color: 'from-blue-500 to-cyan-500' },
                        { metric: 'Posting Consistency', score: 85, platform: 'Twitter', color: 'from-blue-400 to-blue-600' },
                        { metric: 'Audience Growth', score: 79, platform: 'Facebook', color: 'from-blue-600 to-blue-800' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.metric}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                            <div>
                              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{item.metric}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.platform}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.score}</div>
                            <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Add Account Button */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add More Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            </div>

            {/* Draft Posts */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2">
                        Draft Posts
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Your saved drafts ready for publishing
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                        <Edit3 className="h-3 w-3 mr-1" />
                        5 Drafts
                      </Badge>
                      <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-sm rounded-full">
                        View All Drafts
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Product Launch Strategy",
                        description: "Comprehensive guide to our new product launch including market analysis and promotional timeline.",
                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=60&fit=crop&crop=center",
                        createdDate: "2 days ago",
                        platforms: ["LinkedIn", "Twitter"],
                        status: "Draft",
                        engagement: "Medium"
                      },
                      {
                        title: "Team Building Workshop",
                        description: "Highlights from our recent team building workshop and its impact on workplace collaboration.",
                        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=60&fit=crop&crop=center",
                        createdDate: "1 day ago",
                        platforms: ["Instagram", "Facebook"],
                        status: "Draft",
                        engagement: "High"
                      },
                      {
                        title: "Industry Trends 2024",
                        description: "Analysis of emerging trends in our industry and how they will shape the market.",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=60&fit=crop&crop=center",
                        createdDate: "3 days ago",
                        platforms: ["LinkedIn"],
                        status: "Draft",
                        engagement: "Very High"
                      },
                      {
                        title: "Customer Success Story",
                        description: "Featuring how our solution helped a major client achieve 40% increase in efficiency.",
                        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=60&fit=crop&crop=center",
                        createdDate: "5 days ago",
                        platforms: ["Instagram", "LinkedIn"],
                        status: "Draft",
                        engagement: "High"
                      },
                      {
                        title: "Behind The Scenes",
                        description: "A look into our creative process and the passionate team that makes everything possible.",
                        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=80&h=60&fit=crop&crop=center",
                        createdDate: "1 week ago",
                        platforms: ["Instagram", "Twitter"],
                        status: "Draft",
                        engagement: "Medium"
                      }
                    ].map((draft, index) => (
                      <motion.div
                        key={draft.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          {/* Left Content */}
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            {/* Image */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                <img 
                                  src={draft.image} 
                                  alt={draft.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs truncate">
                                  {draft.title}
                                </h4>
                                <Badge className={`text-xs ${
                                  draft.engagement === 'Very High' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                  draft.engagement === 'High' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                  {draft.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                                {draft.description}
                              </p>
                              <div className="flex items-center space-x-3 mt-1">
                                {/* Platforms */}
                                <div className="flex items-center space-x-1">
                                  {draft.platforms.slice(0, 2).map((platform, platformIndex) => (
                                    <div key={platformIndex} className={`w-4 h-4 rounded flex items-center justify-center ${
                                      platform === 'Instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                      platform === 'Twitter' ? 'bg-blue-500' :
                                      platform === 'LinkedIn' ? 'bg-blue-700' :
                                      'bg-blue-600'
                                    }`}>
                                      {platform === 'Instagram' && <Instagram className="h-2 w-2 text-white" />}
                                      {platform === 'Twitter' && <Twitter className="h-2 w-2 text-white" />}
                                      {platform === 'LinkedIn' && <Linkedin className="h-2 w-2 text-white" />}
                                      {platform === 'Facebook' && <Facebook className="h-2 w-2 text-white" />}
                                    </div>
                                  ))}
                                  {draft.platforms.length > 2 && (
                                    <span className="text-xs text-gray-500">+{draft.platforms.length - 2}</span>
                                  )}
                                </div>
                                
                                {/* Created Date */}
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-2 w-2 text-gray-500" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{draft.createdDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs rounded-full h-6 px-3"
                            >
                              <Globe className="h-2 w-2 mr-1" />
                              Publish
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-xs rounded-full h-6 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <Edit3 className="h-2 w-2 mr-1" />
                              Edit
                            </Button>
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
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
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
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
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