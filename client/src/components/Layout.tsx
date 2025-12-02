import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard,
  BarChart3,
  PieChart,
  Plus,
  Calendar,
  FileText,
  Layers,
  Megaphone,
  Sparkles,
  Hash,
  Settings,
  Search,
  Bell,
  Zap,
  Target,
  Menu,
  X,
  MessageCircle
} from "lucide-react";
import { Link, useLocation } from "wouter";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "reports", label: "Reports", icon: PieChart, path: "/reports" },
  { id: "create", label: "Create Post", icon: Plus, path: "/create" },
  { id: "calendar", label: "Content Calendar", icon: Calendar, path: "/calendar" },
  { id: "posts", label: "Published Posts", icon: FileText, path: "/posts" },
  { id: "inbox", label: "Inbox", icon: MessageCircle, path: "/inbox" },
  { id: "media", label: "Media Library", icon: Layers, path: "/media" },
  { id: "campaigns", label: "Campaigns", icon: Megaphone, path: "/campaigns" },
  { id: "ai-assistant", label: "AI Assistant", icon: Sparkles, path: "/ai-assistant" },
  { id: "hashtags", label: "Hashtag Research", icon: Hash, path: "/hashtags" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" }
];

const quickActions = [
  { icon: Plus, label: "Create Post", gradient: "from-green-500 to-emerald-500", path: "/create" },
  { icon: Calendar, label: "Schedule", gradient: "from-blue-500 to-cyan-500", path: "/calendar" },
  { icon: BarChart3, label: "Analytics", gradient: "from-purple-500 to-violet-500", path: "/analytics" },
  { icon: Target, label: "Campaigns", gradient: "from-orange-500 to-red-500", path: "/campaigns" }
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

          {/* Page Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}