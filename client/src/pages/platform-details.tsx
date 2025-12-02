import { useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users,
  Eye,
  Heart,
  Share2,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Plus,
  ChevronDown,
  Target,
  TrendingUp,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Play,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Filter,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const platformData = {
  Facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "from-blue-600 to-blue-800",
    brandColor: "#1877f2",
    followers: "45.2K",
    newFollowers: "1.2K",
    impressions: "456K",
    views: "234K", 
    reach: "189K",
    likes: "12.4K",
    posts: 28,
    engagement: "7.8%",
    growth: "+12%"
  },
  Instagram: {
    name: "Instagram", 
    icon: Instagram,
    color: "from-purple-500 to-pink-500",
    brandColor: "#e4405f",
    followers: "32.1K",
    newFollowers: "2.3K",
    impressions: "342K",
    views: "189K",
    reach: "145K", 
    likes: "18.7K",
    posts: 42,
    engagement: "9.2%",
    growth: "+18%"
  },
  LinkedIn: {
    name: "LinkedIn",
    icon: Linkedin,
    color: "from-blue-600 to-blue-800", 
    brandColor: "#0a66c2",
    followers: "18.9K",
    newFollowers: "892",
    impressions: "289K",
    views: "156K",
    reach: "123K",
    likes: "5.6K", 
    posts: 15,
    engagement: "4.1%",
    growth: "+8%"
  },
  Twitter: {
    name: "Twitter",
    icon: Twitter,
    color: "from-blue-400 to-blue-600",
    brandColor: "#1da1f2",
    followers: "14.6K",
    newFollowers: "567",
    impressions: "178K", 
    views: "98K",
    reach: "87K",
    likes: "8.9K",
    posts: 67,
    engagement: "6.1%",
    growth: "+15%"
  },
  YouTube: {
    name: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-700",
    brandColor: "#ff0000",
    followers: "8.4K",
    newFollowers: "234",
    impressions: "124K",
    views: "67K",
    reach: "45K", 
    likes: "4.2K",
    posts: 12,
    engagement: "12.3%",
    growth: "+25%"
  },
  TikTok: {
    name: "TikTok",
    icon: Play,
    color: "from-gray-800 to-gray-900",
    brandColor: "#000000",
    followers: "24.7K",
    newFollowers: "3.1K",
    impressions: "267K",
    views: "145K",
    reach: "112K",
    likes: "23.4K",
    posts: 35,
    engagement: "15.6%",
    growth: "+32%"
  }
};

// Sample analytics data for the chart
const analyticsData = [
  { date: "Aug 31", views: 1.2, followers: 0.8, impressions: 1.5, reach: 1.0, likes: 0.6 },
  { date: "01 Aug", views: 1.5, followers: 1.0, impressions: 1.8, reach: 1.2, likes: 0.8 },
  { date: "02 Aug", views: 1.1, followers: 0.9, impressions: 1.3, reach: 1.1, likes: 0.7 },
  { date: "03 Aug", views: 1.8, followers: 1.2, impressions: 2.1, reach: 1.4, likes: 1.0 },
  { date: "04 Aug", views: 1.4, followers: 1.1, impressions: 1.7, reach: 1.3, likes: 0.9 },
  { date: "05 Aug", views: 1.9, followers: 1.3, impressions: 2.3, reach: 1.5, likes: 1.1 },
  { date: "06 Aug", views: 1.6, followers: 1.2, impressions: 1.9, reach: 1.4, likes: 1.0 },
  { date: "07 Aug", views: 2.0, followers: 1.4, impressions: 2.4, reach: 1.6, likes: 1.2 }
];

const postStats = [
  {
    title: "Published Post",
    count: 5,
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
  },
  {
    title: "Scheduled Post", 
    count: 2,
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
  },
  {
    title: "Draft Post",
    count: 3,
    icon: FileText,
    color: "from-orange-500 to-red-500", 
    bgColor: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30"
  }
];

const publishedPosts = [
  {
    id: 1,
    content: "🎉 Thrilled to announce that we've reached 50K followers! Thank you for being part of our amazing community. Here's to the next milestone! 🚀",
    publishedTime: "Aug 6 at 3:30 PM",
    platform: "Facebook",
    status: "published",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    engagement: {
      likes: 847,
      comments: 23,
      shares: 12,
      reach: "3.2K"
    },
    performance: "Excellent"
  },
  {
    id: 2,
    content: "Monday motivation: 'Success is not final, failure is not fatal: it is the courage to continue that counts.' - Winston Churchill 💪",
    publishedTime: "Aug 5 at 9:00 AM",
    platform: "Facebook",
    status: "published",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    engagement: {
      likes: 324,
      comments: 8,
      shares: 5,
      reach: "1.8K"
    },
    performance: "Good"
  },
  {
    id: 3,
    content: "Check out our latest blog post on digital marketing trends for 2025. Link in bio! 📈 #DigitalMarketing #Trends2025",
    publishedTime: "Aug 4 at 2:15 PM",
    platform: "Facebook",
    status: "published",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    engagement: {
      likes: 156,
      comments: 4,
      shares: 8,
      reach: "1.2K"
    },
    performance: "Average"
  },
  {
    id: 4,
    content: "Weekend vibes! 🌟 What are your plans for this beautiful Saturday? Let us know in the comments below! 👇",
    publishedTime: "Aug 3 at 11:00 AM",
    platform: "Facebook",
    status: "published",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    engagement: {
      likes: 892,
      comments: 45,
      shares: 18,
      reach: "4.1K"
    },
    performance: "Excellent"
  },
  {
    id: 5,
    content: "Behind the scenes: Our team working hard to bring you the best social media management experience. Thanks for your patience! 👨‍💻👩‍💻",
    publishedTime: "Aug 2 at 4:45 PM",
    platform: "Facebook",
    status: "published",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    engagement: {
      likes: 267,
      comments: 12,
      shares: 3,
      reach: "1.5K"
    },
    performance: "Good"
  }
];

const scheduledPosts = [
  {
    id: 1,
    content: "🚀 Exciting news! Our new feature is launching next week. Stay tuned for more updates!",
    scheduledTime: "Tomorrow at 9:00 AM",
    platform: "Facebook",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
    engagement: "Estimated reach: 2.5K"
  },
  {
    id: 2,
    content: "Behind the scenes look at our development process. Innovation never stops! 💡",
    scheduledTime: "Aug 15 at 2:00 PM", 
    platform: "Facebook",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    engagement: "Estimated reach: 1.8K"
  }
];

const draftPosts = [
  {
    id: 1,
    content: "🎯 New year, new goals! What are your social media objectives for 2025? Share them with us and let's achieve them together...",
    lastEdited: "2 hours ago",
    platform: "Facebook",
    status: "draft",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
    notes: "Need to add hashtags and CTA"
  },
  {
    id: 2,
    content: "Customer spotlight: Amazing feedback from Sarah Johnson about our platform. Her engagement increased by 150% in just...",
    lastEdited: "1 day ago",
    platform: "Facebook",
    status: "draft",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    notes: "Waiting for approval from Sarah"
  },
  {
    id: 3,
    content: "📊 Weekly analytics insights: This week we saw a 23% increase in engagement across all platforms. Here's what worked...",
    lastEdited: "3 days ago",
    platform: "Facebook",
    status: "draft",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    notes: "Need to finalize statistics"
  }
];

const allPosts = [
  ...publishedPosts.map(post => ({ ...post, type: 'published' })),
  ...scheduledPosts.map(post => ({ ...post, type: 'scheduled' })),
  ...draftPosts.map(post => ({ ...post, type: 'draft' }))
].sort((a, b) => {
  // Sort by most recent activity
  const getDate = (post: any) => {
    if (post.publishedTime) return new Date(post.publishedTime).getTime();
    if (post.scheduledTime) return new Date(post.scheduledTime).getTime();
    if (post.lastEdited) {
      const now = new Date().getTime();
      if (post.lastEdited.includes('hour')) return now - (parseInt(post.lastEdited) * 60 * 60 * 1000);
      if (post.lastEdited.includes('day')) return now - (parseInt(post.lastEdited) * 24 * 60 * 60 * 1000);
    }
    return 0;
  };
  return getDate(b) - getDate(a);
});

const commentsData = [
  {
    id: 1,
    user: {
      name: "Melo",
      username: "melo123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=melo123"
    },
    content: "Hello",
    timestamp: "10d ago",
    postReference: "Hello test post 🎈🎈",
    postImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 2,
    user: {
      name: "A reply",
      username: "reply_user",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=reply_user"
    },
    content: "A reply",
    timestamp: "9d ago",
    postReference: "Hello test post 🎈🎈",
    postImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=80&h=80&fit=crop",
    isReply: true,
    parentId: 1
  },
  {
    id: 3,
    user: {
      name: "New comment",
      username: "newcomer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newcomer"
    },
    content: "New comment",
    timestamp: "3d ago",
    postReference: "Hello test post 🎈🎈",
    postImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 4,
    user: {
      name: "Website working good",
      username: "webdev_pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=webdev_pro"
    },
    content: "Website working good",
    timestamp: "5d ago",
    postReference: "Hello test post 🎈🎈",
    postImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 5,
    user: {
      name: "Admin Comments here",
      username: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
    },
    content: "Admin Comments here",
    timestamp: "3d ago",
    postReference: "Hello test post 🎈🎈",
    postImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 6,
    user: {
      name: "Hello",
      username: "hello_world",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hello_world"
    },
    content: "Hello",
    timestamp: "32d ago",
    postReference: "Creating post for both platforms to check in analytics. Using 'Harry Potter' images.",
    postImage: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 7,
    user: {
      name: "Admin comment",
      username: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin2"
    },
    content: "Admin comment",
    timestamp: "34d ago",
    postReference: "Creating post for both platforms to check in analytics. Using 'Harry Potter' images.",
    postImage: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 8,
    user: {
      name: "what is this",
      username: "curious_user",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=curious_user"
    },
    content: "what is this",
    timestamp: "46d ago",
    postReference: "AI Is Not the Future – It's the NOW. From automating customer support to generating human-like...",
    postImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  },
  {
    id: 9,
    user: {
      name: "nice work",
      username: "appreciator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=appreciator"
    },
    content: "nice work",
    timestamp: "46d ago",
    postReference: "Hello test post 🎈🎈",
    postImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=80&h=80&fit=crop",
    isReply: false,
    parentId: null
  }
];

export default function PlatformDetails() {
  const params = useParams();
  const platformName = params.platform || "Facebook";
  const [selectedPage, setSelectedPage] = useState("Developer Test Page");
  const [selectedTab, setSelectedTab] = useState("Summary");
  const [dateRange, setDateRange] = useState("7d");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [modalReplyingTo, setModalReplyingTo] = useState<number | null>(null);
  const [modalReplyText, setModalReplyText] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState("Month");
  const [viewingPostComments, setViewingPostComments] = useState<string | null>(null);

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const handleSubmitReply = () => {
    if (replyText.trim() && replyingTo) {
      // In a real app, this would submit to an API
      console.log(`Reply to comment ${replyingTo}: ${replyText}`);
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const handleModalReply = (commentId: number) => {
    setModalReplyingTo(commentId);
    setModalReplyText("");
  };

  const handleSubmitModalReply = () => {
    if (modalReplyText.trim() && modalReplyingTo) {
      // In a real app, this would submit to an API
      console.log(`Reply to comment ${modalReplyingTo}: ${modalReplyText}`);
      setModalReplyingTo(null);
      setModalReplyText("");
    }
  };

  const handleViewPostComments = (postReference: string) => {
    setViewingPostComments(postReference);
  };

  const getCommentsForPost = (postReference: string) => {
    return commentsData.filter(comment => comment.postReference === postReference);
  };

  const navigateCalendar = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentDate(new Date());
    } else if (direction === 'prev') {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setCurrentDate(newDate);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Add days from next month to complete the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let i = days.length; i < totalCells; i++) {
      const nextMonthDay = new Date(year, month + 1, i - days.length + 1);
      days.push({ date: nextMonthDay, isCurrentMonth: false });
    }
    
    return days;
  };

  const calendarEvents = [
    {
      id: 1,
      title: "Summer Sale Launch",
      description: "Join our biggest summer sale event with up to 70% off on all items! Limited time offer.",
      date: new Date(2025, 7, 20), // August 20, 2025
      time: "8:15 PM",
      type: "post",
      platform: "Facebook",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
      status: "scheduled"
    },
    {
      id: 2,
      title: "New Product Reveal",
      description: "Excited to introduce our latest innovation in sustainable fashion.",
      date: new Date(2025, 7, 20), // August 20, 2025
      time: "9:30 AM",
      type: "post",
      platform: "Instagram",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Weekly Team Update",
      description: "Sharing this week's achievements and upcoming goals with our community.",
      date: new Date(2025, 7, 22), // August 22, 2025
      time: "2:00 PM",
      type: "post",
      platform: "LinkedIn",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      status: "scheduled"
    },
    {
      id: 4,
      title: "Customer Success Story",
      description: "Highlighting how our solutions helped transform a client's business.",
      date: new Date(2025, 7, 25), // August 25, 2025
      time: "11:00 AM",
      type: "post",
      platform: "Twitter",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      status: "scheduled"
    }
  ];

  const platform = platformData[platformName as keyof typeof platformData] || platformData.Facebook;

  const metricsCards = [
    {
      title: "Followers",
      value: platform.followers,
      subtitle: "Total followers last 7 days",
      icon: Users,
      color: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
      iconColor: "text-blue-600"
    },
    {
      title: "New Followers", 
      value: platform.newFollowers,
      subtitle: "Total new followers last 7 days",
      icon: Users,
      color: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
      iconColor: "text-purple-600"
    },
    {
      title: "Impressions",
      value: platform.impressions,
      subtitle: "Total impressions last 7 days", 
      icon: BarChart3,
      color: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
      iconColor: "text-green-600"
    },
    {
      title: "View",
      value: platform.views,
      subtitle: "Total view last 7 days",
      icon: Eye,
      color: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30", 
      iconColor: "text-orange-600"
    },
    {
      title: "Reach",
      value: platform.reach,
      subtitle: "Total reach last 7 days",
      icon: Target,
      color: "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30",
      iconColor: "text-indigo-600"
    },
    {
      title: "Likes",
      value: platform.likes,
      subtitle: "Total likes last 7 days",
      icon: Heart,
      color: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
      iconColor: "text-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${platform.color}`}>
              <platform.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {platform.name} Summary
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Detailed analytics and performance insights
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-48 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Developer Test Page">Developer Test Page</SelectItem>
                <SelectItem value="Main Page">Main Page</SelectItem>
                <SelectItem value="Business Page">Business Page</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-56 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days: 01 Aug 2025 - 07 Aug 2025</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-6">
            {["Summary", "Post", "Comments", "Calendar"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedTab === tab
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </motion.div>

        {/* Tab Content */}
        {selectedTab === "Summary" && (
          <>
            {/* Metrics Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {metricsCards.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${metric.color}`}>
                          <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {platform.growth}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {metric.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                        {metric.title}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">
                        {metric.subtitle}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Analytics Chart */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-gray-100">Social Analytics</CardTitle>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">View</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Followers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Impressions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Reach</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Likes</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="analytics-grid" width="50" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#analytics-grid)" />
                      
                      {/* Chart bars */}
                      {analyticsData.map((dataPoint, dateIndex) => {
                        const metrics = [
                          { key: 'views', color: '#3b82f6', value: dataPoint.views },
                          { key: 'followers', color: '#8b5cf6', value: dataPoint.followers },
                          { key: 'impressions', color: '#10b981', value: dataPoint.impressions },
                          { key: 'reach', color: '#f97316', value: dataPoint.reach },
                          { key: 'likes', color: '#f43f5e', value: dataPoint.likes }
                        ];
                        
                        const maxValue = Math.max(...analyticsData.flatMap(d => [d.views, d.followers, d.impressions, d.reach, d.likes]));
                        const groupWidth = 350 / analyticsData.length;
                        const barWidth = groupWidth / (metrics.length + 1);
                        const groupStartX = (dateIndex * groupWidth) + 25;

                        return (
                          <g key={`group-${dateIndex}`}>
                            {metrics.map((metric, metricIndex) => {
                              const barHeight = (metric.value / maxValue) * 140;
                              const x = groupStartX + (metricIndex * barWidth) + barWidth * 0.1;
                              const y = 170 - barHeight;

                              return (
                                <motion.rect
                                  key={`${metric.key}-${dateIndex}`}
                                  initial={{ height: 0, y: 170 }}
                                  animate={{ height: barHeight, y: y }}
                                  transition={{ 
                                    duration: 1.2, 
                                    delay: 0.3 + dateIndex * 0.1 + metricIndex * 0.05,
                                    ease: "easeOut"
                                  }}
                                  x={x}
                                  width={barWidth * 0.8}
                                  fill={metric.color}
                                  rx="2"
                                  ry="2"
                                  className="hover:opacity-80 transition-opacity"
                                />
                              );
                            })}
                          </g>
                        );
                      })}
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-gray-400 px-6">
                      {analyticsData.map((item) => (
                        <span key={item.date}>{item.date}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

        {selectedTab === "Post" && (
          <>
            {/* Post Statistics Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {postStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.bgColor}`}>
                          <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                        <Button size="sm" className={`bg-gradient-to-r ${stat.color} text-white rounded-full`}>
                          <Plus className="h-3 w-3 mr-1" />
                          Create
                        </Button>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {stat.count}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        {stat.title}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Post Sections */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Published Posts */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-gray-900 dark:text-gray-100">Published</CardTitle>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {publishedPosts.length} posts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {publishedPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="p-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/30 dark:border-green-800/30"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          {/* Post Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={post.image}
                              alt="Post image"
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${post.id}&backgroundColor=10b981`;
                              }}
                            />
                          </div>
                          
                          {/* Post Content and Actions */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                  {post.content}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {post.publishedTime}
                                  </span>
                                  <span className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    {post.engagement.reach} reach
                                  </span>
                                  <Badge className={`text-xs ${
                                    post.performance === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                    post.performance === 'Good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  }`}>
                                    {post.performance}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <BarChart3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1 text-red-500" />
                              {post.engagement.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1 text-blue-500" />
                              {post.engagement.comments}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="h-3 w-3 mr-1 text-green-500" />
                              {post.engagement.shares}
                            </span>
                          </div>
                          <span className="text-gray-500">{platform.name}</span>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-4">
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Scheduled Posts */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-gray-900 dark:text-gray-100">Scheduled</CardTitle>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {scheduledPosts.length} posts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scheduledPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="p-4 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/30 dark:border-blue-800/30"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          {/* Post Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={post.image}
                              alt="Post image"
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${post.id}&backgroundColor=3b82f6`;
                              }}
                            />
                          </div>
                          
                          {/* Post Content and Actions */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                  {post.content}
                                </p>
                                <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{post.scheduledTime}</span>
                                  </span>
                                  <span>{post.engagement}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 ml-3">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                  <Edit className="h-3 w-3 text-gray-600" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                  <Trash2 className="h-3 w-3 text-gray-600" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
                          {post.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Draft Posts */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-orange-600" />
                        <CardTitle className="text-gray-900 dark:text-gray-100">Draft</CardTitle>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        {draftPosts.length} posts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {draftPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="p-4 bg-gradient-to-r from-orange-50/60 to-red-50/60 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-orange-200/30 dark:border-orange-800/30"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          {/* Post Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={post.image}
                              alt="Post image"
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${post.id}&backgroundColor=f97316`;
                              }}
                            />
                          </div>
                          
                          {/* Post Content and Actions */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                  {post.content}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Last edited {post.lastEdited}
                                  </span>
                                  <span className="text-blue-600 dark:text-blue-400">{post.notes}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Calendar className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            Draft
                          </Badge>
                          <span className="text-xs text-gray-500">{platform.name}</span>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-4">
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Posts List */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-gray-900 dark:text-gray-100">Posts List</CardTitle>
                        <Badge variant="secondary" className="ml-2">
                          {allPosts.length} total
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="rounded-full">
                          <Filter className="h-3 w-3 mr-1" />
                          Filter
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full">
                          <Search className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {allPosts.map((post, index) => (
                        <motion.div
                          key={`${post.type}-${post.id}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.05 }}
                          className="p-4 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/20 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start space-x-3">
                            {/* Post Image */}
                            <div className="flex-shrink-0">
                              <img
                                src={post.image}
                                alt="Post image"
                                className="w-12 h-12 object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${post.id}&backgroundColor=6b7280`;
                                }}
                              />
                            </div>
                            
                            {/* Post Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge className={`text-xs ${
                                      post.type === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                      post.type === 'scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                    }`}>
                                      {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                                    </Badge>
                                    {('performance' in post) && post.performance && (
                                      <Badge className={`text-xs ${
                                        post.performance === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        post.performance === 'Good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                      }`}>
                                        {post.performance}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                    {post.content}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      {('publishedTime' in post) ? post.publishedTime : 
                                       ('scheduledTime' in post) ? post.scheduledTime : 
                                       ('lastEdited' in post) ? `Edited ${post.lastEdited}` : 'Unknown'}
                                    </span>
                                    {('engagement' in post) && post.engagement && typeof post.engagement === 'object' && (
                                      <span className="flex items-center space-x-2">
                                        <span className="flex items-center">
                                          <Heart className="h-3 w-3 mr-1 text-red-500" />
                                          {post.engagement.likes}
                                        </span>
                                        <span className="flex items-center">
                                          <Eye className="h-3 w-3 mr-1 text-blue-500" />
                                          {post.engagement.reach}
                                        </span>
                                      </span>
                                    )}
                                    {('engagement' in post) && post.engagement && typeof post.engagement === 'string' && (
                                      <span className="text-blue-600 dark:text-blue-400">
                                        {post.engagement}
                                      </span>
                                    )}
                                    {('notes' in post) && post.notes && (
                                      <span className="text-orange-600 dark:text-orange-400">
                                        Note: {post.notes}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  {post.type === 'published' && (
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <BarChart3 className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {post.type === 'draft' && (
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <Calendar className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-center pt-6 border-t border-gray-200/50 dark:border-gray-600/50 mt-6">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}

        {/* Comments Tab */}
        {selectedTab === "Comments" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Sentiment Analysis Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Sentiment Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Positive Sentiment Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 text-center p-6">
                    <CardContent className="pt-0">
                      <div className="relative inline-flex items-center justify-center mb-4">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="#22c55e"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 30}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - 0.68) }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-green-600">😊</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">68.0%</div>
                      <div className="text-sm text-green-600 font-medium mb-2">Positive</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Comments last 7 days</div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Neutral Sentiment Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 text-center p-6">
                    <CardContent className="pt-0">
                      <div className="relative inline-flex items-center justify-center mb-4">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="#6b7280"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 30}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - 0.24) }}
                            transition={{ duration: 1.5, delay: 0.6 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-600">😐</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">24.0%</div>
                      <div className="text-sm text-gray-600 font-medium mb-2">Neutral</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Comments last 7 days</div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Negative Sentiment Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 text-center p-6">
                    <CardContent className="pt-0">
                      <div className="relative inline-flex items-center justify-center mb-4">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="#ef4444"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 30}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - 0.08) }}
                            transition={{ duration: 1.5, delay: 0.7 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-red-600">😞</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">8.0%</div>
                      <div className="text-sm text-red-600 font-medium mb-2">Negative</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Comments last 7 days</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Comments
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {commentsData.length} comments
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {commentsData.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-4 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/20 hover:shadow-md transition-all duration-300 ${
                        comment.isReply ? 'ml-8 border-l-4 border-l-blue-400' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Post Image - Left Side */}
                        {comment.postImage && (
                          <div className="flex-shrink-0">
                            <img
                              src={comment.postImage}
                              alt="Post preview"
                              className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                            />
                          </div>
                        )}
                        
                        {/* Comment Content - Right Side */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            {/* User Avatar */}
                            <img
                              src={comment.user.avatar}
                              alt={comment.user.name}
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-600"
                            />
                            {/* User Info */}
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-blue-600 dark:text-blue-400 text-sm">
                                {comment.user.username}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                              {comment.isReply && (
                                <>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                                    Reply
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Comment Text */}
                          <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                            {comment.content}
                          </div>
                          
                          {/* Post Reference */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            on "{comment.postReference.length > 50 ? comment.postReference.substring(0, 50) + "..." : comment.postReference}"
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                title="View all comments for this post"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-hidden">
                              <div className="flex h-[90vh]">
                                {/* Left Side - Post Image */}
                                <div className="w-1/2 bg-black flex items-center justify-center">
                                  <img
                                    src={comment.postImage?.replace('w=80&h=80', 'w=600&h=600') || comment.postImage}
                                    alt="Post preview"
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                                
                                {/* Right Side - Comments */}
                                <div className="w-1/2 bg-white dark:bg-gray-900 flex flex-col">
                                  {/* Header */}
                                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">W</span>
                                      </div>
                                      <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Webionx</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">2d ago</p>
                                      </div>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-900 dark:text-gray-100">{comment.postReference}</p>
                                    <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                                      <span>👍 1</span>
                                      <span>💬 {getCommentsForPost(comment.postReference).length}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Comments Header */}
                                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                      Comments ({getCommentsForPost(comment.postReference).length})
                                    </h4>
                                  </div>
                                  
                                  {/* Comments List */}
                                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {getCommentsForPost(comment.postReference).map((postComment, index) => (
                                      <div key={postComment.id} className={`${postComment.isReply ? 'ml-12 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
                                        <div className="flex items-start space-x-3">
                                          <img
                                            src={postComment.user.avatar}
                                            alt={postComment.user.name}
                                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="space-y-1">
                                              <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                                                  {postComment.user.username}
                                                </span>
                                                {postComment.isReply && (
                                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    → replying to @{getCommentsForPost(comment.postReference).find(c => c.id === postComment.parentId)?.user.username || 'previous comment'}
                                                  </span>
                                                )}
                                              </div>
                                              <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                                                {postComment.content}
                                              </p>
                                              <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400 pt-1">
                                                <span className="font-medium">{postComment.timestamp}</span>
                                                <button className="hover:underline font-medium text-gray-600 dark:text-gray-400">👍</button>
                                                <button 
                                                  className="hover:underline text-blue-600 dark:text-blue-400 font-medium"
                                                  onClick={() => handleModalReply(postComment.id)}
                                                >
                                                  Reply
                                                </button>
                                              </div>
                                              
                                              {/* Reply Input Box */}
                                              {modalReplyingTo === postComment.id && (
                                                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                                                  <div className="flex items-start space-x-3">
                                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                                                      <span className="text-white text-xs font-semibold">M</span>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        Replying to @{postComment.user.username}
                                                      </div>
                                                      <textarea
                                                        value={modalReplyText}
                                                        onChange={(e) => setModalReplyText(e.target.value)}
                                                        placeholder="Write a reply..."
                                                        className="w-full bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        rows={2}
                                                        autoFocus
                                                      />
                                                      <div className="flex items-center space-x-2">
                                                        <Button
                                                          size="sm"
                                                          onClick={handleSubmitModalReply}
                                                          disabled={!modalReplyText.trim()}
                                                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-7"
                                                        >
                                                          Reply
                                                        </Button>
                                                        <Button
                                                          size="sm"
                                                          variant="ghost"
                                                          onClick={() => setModalReplyingTo(null)}
                                                          className="text-gray-500 dark:text-gray-400 text-xs px-3 py-1 h-7"
                                                        >
                                                          Cancel
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Write Comment Input */}
                                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm font-semibold">M</span>
                                      </div>
                                      <div className="flex-1">
                                        <input
                                          type="text"
                                          placeholder="Write a comment..."
                                          className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3 text-xs"
                            onClick={() => handleReply(comment.id)}
                          >
                            Reply
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Share2 className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Reply Interface */}
                      {replyingTo === comment.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 ml-8 p-4 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/30 dark:border-blue-800/30"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">Me</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder={`Replying to ${comment.user.username}...`}
                                  className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none"
                                  rows={2}
                                />
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Replying to "{comment.content}"
                                </span>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8 px-3 text-xs"
                                    onClick={() => setReplyingTo(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="h-8 px-3 text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                    onClick={handleSubmitReply}
                                  >
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Add Comment Section */}
                <div className="border-t border-gray-200/50 dark:border-gray-600/50 pt-6 mt-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">Me</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <textarea
                          placeholder="Write a comment..."
                          className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Press Enter to post</span>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full">
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Calendar Tab */}
        {selectedTab === "Calendar" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  {/* Calendar Navigation */}
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => navigateCalendar('today')}
                      className="h-8 px-3 text-sm"
                    >
                      Today
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateCalendar('prev')}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateCalendar('next')}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                  </div>

                  {/* View Options */}
                  <div className="flex items-center space-x-2">
                    {["Month", "Week", "Day", "Agenda"].map((view) => (
                      <Button
                        key={view}
                        variant={calendarView === view ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCalendarView(view)}
                        className="h-8 px-3 text-sm"
                      >
                        {view}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="space-y-4">
                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((dayInfo, index) => {
                      const isToday = dayInfo.date.toDateString() === new Date().toDateString();
                      const dayEvents = calendarEvents.filter(event => 
                        event.date.toDateString() === dayInfo.date.toDateString()
                      );

                      return (
                        <div
                          key={index}
                          className={`min-h-[120px] p-2 border border-gray-200/50 dark:border-gray-600/50 ${
                            dayInfo.isCurrentMonth 
                              ? 'bg-white dark:bg-gray-800' 
                              : 'bg-gray-50 dark:bg-gray-900'
                          } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                        >
                          <div className={`text-sm mb-1 ${
                            dayInfo.isCurrentMonth 
                              ? 'text-gray-900 dark:text-gray-100' 
                              : 'text-gray-400 dark:text-gray-600'
                          } ${isToday ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}>
                            {dayInfo.date.getDate()}
                          </div>
                          
                          {/* Events */}
                          <div className="space-y-1">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className="bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all cursor-pointer"
                              >
                                <div className="flex items-start space-x-2">
                                  {/* Small Event Image on Left */}
                                  <div className="flex-shrink-0">
                                    <img
                                      src={event.image}
                                      alt={event.title}
                                      className="w-8 h-8 object-cover rounded"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${event.title}&backgroundColor=3b82f6`;
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Event Details on Right */}
                                  <div className="flex-1 min-w-0 space-y-0.5">
                                    <div className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                                      {event.title}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {event.time} • {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                      </span>
                                      <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded">
                                        {event.platform}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Scheduled Posts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded border-2 border-blue-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Today</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}