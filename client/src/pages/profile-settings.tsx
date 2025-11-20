import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  User,
  Mail,
  Bell,
  Shield,
  Globe,
  Camera,
  Save,
  Key,
  Trash2,
  Eye,
  EyeOff,
  Smartphone,
  Calendar,
  MapPin,
  Briefcase,
  Info,
  Database,
  Link,
  MessageCircle
} from "lucide-react";
import { useLocation } from "wouter";

const notificationSettings = [
  {
    category: "Post Notifications",
    settings: [
      { id: "post_published", label: "When posts are published", description: "Get notified when your scheduled posts go live", enabled: true },
      { id: "post_engagement", label: "High engagement alerts", description: "Notify me when posts receive high engagement", enabled: true },
      { id: "post_failed", label: "Failed post attempts", description: "Alert when posts fail to publish", enabled: true }
    ]
  },
  {
    category: "Analytics & Reports",
    settings: [
      { id: "weekly_report", label: "Weekly performance reports", description: "Receive weekly analytics summaries", enabled: true },
      { id: "milestone_alerts", label: "Milestone achievements", description: "Celebrate follower and engagement milestones", enabled: false },
      { id: "competitor_updates", label: "Competitor insights", description: "Updates on competitor performance", enabled: false }
    ]
  },
  {
    category: "Account & Security",
    settings: [
      { id: "login_alerts", label: "Login notifications", description: "Alert for new device logins", enabled: true },
      { id: "security_updates", label: "Security alerts", description: "Important security and privacy updates", enabled: true },
      { id: "billing_notifications", label: "Billing & subscription", description: "Payment and subscription notifications", enabled: true }
    ]
  }
];

const securitySettings = [
  {
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    status: "enabled",
    action: "Manage 2FA"
  },
  {
    title: "Active Sessions", 
    description: "Manage devices that are currently signed in",
    status: "3 active sessions",
    action: "View Sessions"
  },
  {
    title: "Password",
    description: "Last changed 3 months ago",
    status: "Strong",
    action: "Change Password"
  },
  {
    title: "API Keys",
    description: "Manage access tokens for integrations",
    status: "2 active keys",
    action: "Manage Keys"
  }
];

export default function ProfileSettings() {
  const [, setLocation] = useLocation();
  const [profileData, setProfileData] = useState({
    firstName: "Sudhir",
    lastName: "Kumar",
    email: "sudhir@insocialwise.com",
    bio: "Social media strategist passionate about helping businesses grow their online presence.",
    company: "insocialwise",
    jobTitle: "Marketing Director",
    location: "San Francisco, CA",
    website: "https://insocialwise.com",
    timezone: "Pacific Time (PT)"
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [notifications, setNotifications] = useState(() => {
    const settings: Record<string, boolean> = {};
    notificationSettings.forEach(category => {
      category.settings.forEach(setting => {
        settings[setting.id] = setting.enabled;
      });
    });
    return settings;
  });

  const [appSettings, setAppSettings] = useState({
    commentsAutoReply: false,
    messagesAutoReply: false
  });

  const [showMessagesPopover, setShowMessagesPopover] = useState(false);
  const [showKnowledgeBaseDialog, setShowKnowledgeBaseDialog] = useState(false);
  
  const [hasKnowledgeBase, setHasKnowledgeBase] = useState(false);
  const [hasOpenAI, setHasOpenAI] = useState(false);

  // Fetch knowledge base and OpenAI status on component mount
  useEffect(() => {
    fetch('/api/knowledge-base/status')
      .then(res => res.json())
      .then(data => {
        setHasKnowledgeBase(data.hasKnowledgeBase);
        setHasOpenAI(data.hasOpenAI);
      })
      .catch(err => console.error('Failed to fetch knowledge base status:', err));
  }, []);

  const toggleNotification = (settingId: string) => {
    setNotifications(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
  };

  const toggleAppSetting = (setting: 'commentsAutoReply' | 'messagesAutoReply') => {
    // Check if trying to enable Messages Auto Reply without requirements
    if (setting === 'messagesAutoReply' && !appSettings.messagesAutoReply) {
      if (!hasKnowledgeBase || !hasOpenAI) {
        setShowKnowledgeBaseDialog(true);
        return;
      }
    }
    
    setAppSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Basic Information */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/api/placeholder/80/80" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl">
                        SK
                      </AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Camera className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Profile Picture</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Upload New</Button>
                      <Button size="sm" variant="ghost" className="text-red-600">Remove</Button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="mt-1 bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="mt-1 bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 bg-white/80 dark:bg-gray-700/80"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    className="mt-1 bg-white/80 dark:bg-gray-700/80 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        className="pl-10 mt-1 bg-white/80 dark:bg-gray-700/80"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profileData.jobTitle}
                      onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="mt-1 bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10 mt-1 bg-white/80 dark:bg-gray-700/80"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        className="pl-10 mt-1 bg-white/80 dark:bg-gray-700/80"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                      className="mt-1 pr-10 bg-white/80 dark:bg-gray-700/80"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                        className="mt-1 pr-10 bg-white/80 dark:bg-gray-700/80"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                        className="mt-1 pr-10 bg-white/80 dark:bg-gray-700/80"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  <Key className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* App Settings */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">App Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Comments Auto Reply */}
                  <div className="p-4 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200/30 dark:border-purple-800/30">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-purple-900 dark:text-purple-100">Comments Auto Reply</h4>
                        <Switch
                          checked={appSettings.commentsAutoReply}
                          onCheckedChange={() => toggleAppSetting('commentsAutoReply')}
                        />
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Enable this if you want to automatically reply to comments.
                      </p>
                      <div className="flex items-center text-xs text-purple-600 dark:text-purple-400">
                        <span className="mr-2">Enable/Disable</span>
                      </div>
                    </div>
                  </div>

                  {/* Messages Auto Reply */}
                  <div className="p-4 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/30 dark:border-blue-800/30">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">Messages Auto Reply</h4>
                          <Popover open={showMessagesPopover} onOpenChange={setShowMessagesPopover}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4" align="start">
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <MessageCircle className="h-5 w-5 text-blue-600" />
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Messages Auto Reply Requirements</h4>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                                  <p>To enable message auto reply, you need to:</p>
                                  <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                      <Database className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                      <span>Supply a Global Knowledge Base</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                      <Link className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                      <span>Connect integrated platforms and extend to their pages</span>
                                    </div>
                                  </div>
                                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                      <strong>Note:</strong> Knowledge base will work by social media page to provide relevant automated responses.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2 pt-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setShowMessagesPopover(false)}
                                  >
                                    Got it
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => {
                                      setShowMessagesPopover(false);
                                      setLocation('/knowledge-base');
                                    }}
                                  >
                                    Setup Knowledge Base
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <Switch
                          checked={appSettings.messagesAutoReply}
                          onCheckedChange={() => toggleAppSetting('messagesAutoReply')}
                        />
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Enable this if you want to automatically reply to messages in your inbox.
                      </p>
                      <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                        <span className="mr-2">Enable/Disable</span>
                        <button 
                          className="text-blue-500 hover:text-blue-700 underline"
                          onClick={() => setShowMessagesPopover(true)}
                        >
                          Requirements
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {notificationSettings.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="space-y-4"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{category.category}</h4>
                    <div className="space-y-3">
                      {category.settings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{setting.label}</h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{setting.description}</p>
                          </div>
                          <Switch
                            checked={notifications[setting.id]}
                            onCheckedChange={() => toggleNotification(setting.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Account Stats */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl">
                  <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Pro Plan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active since Jan 2024</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl">
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">127</p>
                    <p className="text-xs text-gray-500">Posts Created</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">5</p>
                    <p className="text-xs text-gray-500">Connected Accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {securitySettings.map((setting, index) => (
                  <motion.div
                    key={setting.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{setting.title}</h5>
                      <Badge className={`text-xs ${
                        setting.status === 'enabled' || setting.status === 'Strong' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {setting.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{setting.description}</p>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      {setting.action}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-red-50/60 to-red-50/60 dark:from-red-950/30 dark:to-red-950/30 rounded-xl border border-red-200/50 dark:border-red-800/50">
                  <h5 className="font-medium text-red-700 dark:text-red-400 text-sm mb-1">Delete Account</h5>
                  <p className="text-xs text-red-600 dark:text-red-400 mb-3">
                    Permanently remove your account and all associated data. This action cannot be undone.
                  </p>
                  <Button size="sm" variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950/50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Knowledge Base Requirements Dialog */}
      <Dialog open={showKnowledgeBaseDialog} onOpenChange={setShowKnowledgeBaseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <DialogTitle>Messages Auto Reply Requirements</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To enable AI-powered message auto reply, you need to:
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Database className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Supply a Global Knowledge Base</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create content entries for AI to reference when generating responses</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Link className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Connect integrated platforms and extend to their pages</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Link your social media accounts for automated responses</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Configure OpenAI Integration</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI will generate intelligent responses based on your knowledge base</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>How it works:</strong> OpenAI analyzes incoming messages and generates personalized responses using your knowledge base content, maintaining consistent brand voice across all platforms.
              </p>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowKnowledgeBaseDialog(false)}
              >
                Got it
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setShowKnowledgeBaseDialog(false);
                  setLocation('/knowledge-base');
                }}
              >
                Setup Knowledge Base
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}