import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Clock,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Eye,
  MoreHorizontal,
  Filter,
  Grid,
  List
} from "lucide-react";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

const scheduledPosts: Record<number, any[]> = {
  5: [
    {
      id: 1,
      title: "Morning Motivation",
      platform: "Instagram",
      time: "09:00 AM",
      status: "scheduled",
      icon: Instagram,
      color: "from-purple-500 to-pink-500",
      engagement: "High"
    },
    {
      id: 2,
      title: "Industry News",
      platform: "Twitter",
      time: "02:00 PM", 
      status: "scheduled",
      icon: Twitter,
      color: "from-blue-400 to-blue-600",
      engagement: "Medium"
    }
  ],
  12: [
    {
      id: 3,
      title: "Product Feature",
      platform: "LinkedIn",
      time: "10:00 AM",
      status: "published",
      icon: Linkedin,
      color: "from-blue-600 to-blue-800",
      engagement: "Very High"
    }
  ],
  18: [
    {
      id: 4,
      title: "Behind the Scenes",
      platform: "Instagram",
      time: "04:00 PM",
      status: "draft",
      icon: Instagram,
      color: "from-purple-500 to-pink-500",
      engagement: "High"
    },
    {
      id: 5,
      title: "Weekly Roundup",
      platform: "Facebook",
      time: "06:00 PM",
      status: "scheduled",
      icon: Facebook,
      color: "from-blue-600 to-blue-800",
      engagement: "Medium"
    }
  ],
  25: [
    {
      id: 6,
      title: "Customer Story",
      platform: "LinkedIn",
      time: "11:00 AM",
      status: "scheduled",
      icon: Linkedin,
      color: "from-blue-600 to-blue-800",
      engagement: "Very High"
    }
  ]
};

const upcomingPosts = [
  {
    id: 7,
    title: "New Feature Announcement",
    platform: "Twitter",
    scheduledDate: "Tomorrow",
    scheduledTime: "10:00 AM",
    status: "scheduled",
    icon: Twitter,
    color: "from-blue-400 to-blue-600"
  },
  {
    id: 8,
    title: "Team Spotlight",
    platform: "Instagram", 
    scheduledDate: "Dec 8",
    scheduledTime: "3:00 PM",
    status: "scheduled",
    icon: Instagram,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 9,
    title: "Industry Insights",
    platform: "LinkedIn",
    scheduledDate: "Dec 10",
    scheduledTime: "9:00 AM",
    status: "draft",
    icon: Linkedin,
    color: "from-blue-600 to-blue-800"
  }
];

export default function ContentCalendar() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const displayMonth = currentMonth + currentMonthOffset;
  const displayYear = currentYear + Math.floor(displayMonth / 12);
  const normalizedMonth = displayMonth % 12;

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayPosts = scheduledPosts[day] || [];
      const isToday = day === currentDate.getDate() && normalizedMonth === currentMonth;

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.02 }}
          className={`h-24 p-2 border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg ${
            isToday ? 'ring-2 ring-blue-500 bg-blue-50/60 dark:bg-blue-950/60' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${
              isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
            }`}>
              {day}
            </span>
            {dayPosts.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {dayPosts.length}
              </Badge>
            )}
          </div>
          
          <div className="space-y-1">
            {dayPosts.slice(0, 2).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-1 rounded text-xs text-white bg-gradient-to-r ${post.color} truncate cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="flex items-center space-x-1">
                  <post.icon className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate text-xs">{post.title}</span>
                </div>
              </motion.div>
            ))}
            {dayPosts.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayPosts.length - 2} more
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
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
              Content Calendar
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Plan and schedule your social media content
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/60 dark:bg-gray-800/60 rounded-full p-1">
              <Button
                size="sm"
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                className="rounded-full"
                onClick={() => setViewMode('calendar')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                className="rounded-full"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </motion.div>

        {viewMode === 'calendar' ? (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Calendar View */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrentMonthOffset(prev => prev - 1)}
                        className="rounded-full"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {monthNames[normalizedMonth]} {displayYear}
                      </h2>
                      
                      <Button
                        variant="ghost" 
                        size="icon"
                        onClick={() => setCurrentMonthOffset(prev => prev + 1)}
                        className="rounded-full"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        12 Scheduled
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        3 Drafts
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Calendar Header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar - Upcoming Posts */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Upcoming Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${post.color}`}>
                            <post.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                              {post.title}
                            </h5>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">
                                {post.scheduledDate} at {post.scheduledTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <Badge className={`mt-2 text-xs ${
                        post.status === 'scheduled' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {post.status}
                      </Badge>
                    </motion.div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4 rounded-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Posts
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          /* List View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">All Scheduled Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(scheduledPosts).flatMap(([day, posts]) =>
                    posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${post.color}`}>
                            <post.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {monthNames[normalizedMonth]} {day} at {post.time} • {post.platform}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge className={`${
                            post.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            post.status === 'scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {post.status}
                          </Badge>
                          
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="outline" className="rounded-full">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}