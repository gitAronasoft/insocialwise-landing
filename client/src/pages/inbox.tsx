import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle,
  Send,
  Search,
  Filter,
  MoreHorizontal,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Clock,
  Check,
  CheckCheck
} from "lucide-react";

interface Message {
  id: number;
  sender: string;
  senderAvatar: string;
  platform: 'Facebook' | 'Instagram' | 'Twitter' | 'LinkedIn';
  page: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isReplied: boolean;
  type: 'message' | 'comment' | 'mention';
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Manjeet Singh",
    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    platform: "Facebook",
    page: "Your Main Page",
    content: "Hi there! Can I speak you today with our just yesterday announcement...",
    timestamp: "2 mins ago",
    isRead: false,
    isReplied: false,
    type: "message"
  },
  {
    id: 2,
    sender: "ArronaSoft Singh",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    platform: "Instagram",
    page: "Business Account",
    content: "We hope this isn't speak you today with our just weekly announcement...",
    timestamp: "5 mins ago",
    isRead: false,
    isReplied: false,
    type: "comment"
  },
  {
    id: 3,
    sender: "Manjeet Singh",
    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    platform: "Facebook",
    page: "Your Main Page",
    content: "We'll usually see we shared a link to an image. However, I can't see...",
    timestamp: "8 mins ago",
    isRead: true,
    isReplied: false,
    type: "message"
  },
  {
    id: 4,
    sender: "Andy Mehra",
    senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    platform: "Twitter",
    page: "Main Account",
    content: "Andy Mehra: New testing message",
    timestamp: "15 mins ago",
    isRead: true,
    isReplied: true,
    type: "mention"
  },
  {
    id: 5,
    sender: "Manjeet Pawar",
    senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
    platform: "LinkedIn",
    page: "Professional Page",
    content: "Manjeet Pawar: Hey",
    timestamp: "1 hour ago",
    isRead: true,
    isReplied: false,
    type: "message"
  },
  {
    id: 6,
    sender: "Sudhir Kundal",
    senderAvatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
    platform: "Instagram",
    page: "Business Account",
    content: "Sudhir Kundal: I am trial",
    timestamp: "2 hours ago",
    isRead: true,
    isReplied: false,
    type: "comment"
  },
  {
    id: 7,
    sender: "Andy Mehra",
    senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    platform: "Twitter",
    page: "Main Account",
    content: "Andy Mehra: Hola",
    timestamp: "3 hours ago",
    isRead: true,
    isReplied: false,
    type: "message"
  },
  {
    id: 8,
    sender: "Ross Singh",
    senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    platform: "Facebook",
    page: "Your Main Page",
    content: "Ross Singh: Thank admin user",
    timestamp: "5 hours ago",
    isRead: true,
    isReplied: true,
    type: "comment"
  }
];

const platformIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  LinkedIn: Linkedin
};

const platformColors = {
  Facebook: "text-blue-600",
  Instagram: "text-pink-500",
  Twitter: "text-blue-400", 
  LinkedIn: "text-blue-700"
};

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedPage, setSelectedPage] = useState("all");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPageFilter, setShowPageFilter] = useState(false);

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || message.platform === selectedPlatform;
    const matchesPage = selectedPage === 'all' || message.page === selectedPage;
    
    return matchesSearch && matchesPlatform && matchesPage;
  });

  const getUniquePages = () => {
    const pages = Array.from(new Set(mockMessages.map(msg => msg.page)));
    return pages;
  };

  const getPlatformIcon = (platform: string) => {
    const IconComponent = platformIcons[platform as keyof typeof platformIcons];
    return IconComponent;
  };

  const getMessageStatusIcon = (message: Message) => {
    if (message.isReplied) {
      return <CheckCheck className="h-3 w-3 text-green-500" />;
    } else if (message.isRead) {
      return <Check className="h-3 w-3 text-gray-400" />;
    } else {
      return <Clock className="h-3 w-3 text-orange-500" />;
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedMessage) {
      // Here you would handle sending the message
      console.log("Sending message:", messageText);
      setMessageText("");
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
              Inbox Messages
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage messages from all your social media platforms
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600 dark:text-gray-400">ArronaSoft Singh</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Messages List */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-4 space-y-4"
          >
            {/* Filters */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Messages
                  </h3>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowPageFilter(!showPageFilter)}
                    className={showPageFilter ? "text-blue-600" : ""}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/80 dark:bg-gray-700/80"
                    />
                  </div>

                  {showPageFilter && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                        Filter by Pages
                      </label>
                      <Select value={selectedPage} onValueChange={setSelectedPage}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Pages" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Pages</SelectItem>
                          {getUniquePages().map(page => (
                            <SelectItem key={page} value={page}>{page}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages List */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 flex-1">
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredMessages.map((message) => {
                    const PlatformIcon = getPlatformIcon(message.platform);
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          selectedMessage?.id === message.id ? 'bg-blue-50 dark:bg-blue-950/30' : ''
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.senderAvatar} alt={message.sender} />
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ${platformColors[message.platform]}`}>
                              <PlatformIcon className="h-3 w-3" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                                {message.sender}
                              </h4>
                              <div className="flex items-center space-x-1">
                                {getMessageStatusIcon(message)}
                                <span className="text-xs text-gray-500">{message.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {message.page}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {message.content}
                            </p>
                            {!message.isRead && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                Unread
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-8"
          >
            {selectedMessage ? (
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedMessage.senderAvatar} alt={selectedMessage.sender} />
                        <AvatarFallback>{selectedMessage.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {selectedMessage.sender}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedMessage.platform} • {selectedMessage.page}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {selectedMessage.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{selectedMessage.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Please Select a Chat.
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a conversation to view messages
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}