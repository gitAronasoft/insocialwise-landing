import { useState, useEffect, useRef } from "react";

// TypeScript declarations for Facebook SDK
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users,
  FileText,
  Plus,
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
  ArrowUp,
  Activity,
  Globe,
  MoreHorizontal,
  Unplug,
  AlertCircle,
  Calendar,
  Clock,
  ChevronLeft,
  Sparkles,
  Hash,
  Flame,
  Zap,
  Bot,
  BarChart3,
  Search,
  Filter,
  Edit3,
  Image,
  Calendar as CalendarIcon,
  Hash as HashIcon,
  PenTool,
  Layers
} from "lucide-react";

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

const initialConnectedPlatforms = [
  { 
    id: "instagram",
    name: "Instagram", 
    icon: Instagram, 
    followers: "2.1K", 
    gradient: "from-purple-500 to-pink-500",
    posts: 24,
    engagement: "5.2%",
    pages: [
      { id: "personal", name: "My Personal Account", followers: "2.1K", type: "Personal" },
      { id: "business", name: "My Business Page", followers: "850", type: "Business" }
    ]
  },
  { 
    id: "twitter",
    name: "Twitter", 
    icon: Twitter, 
    followers: "856", 
    gradient: "from-blue-400 to-blue-600",
    posts: 18,
    engagement: "3.8%",
    pages: [
      { id: "main", name: "Main Twitter Account", followers: "856", type: "Personal" }
    ]
  },
  { 
    id: "facebook",
    name: "Facebook", 
    icon: Facebook, 
    followers: "432", 
    gradient: "from-blue-600 to-blue-800",
    posts: 12,
    engagement: "4.1%",
    pages: [
      { id: "personal", name: "Personal Profile", followers: "432", type: "Personal" },
      { id: "company", name: "Company Page", followers: "1.2K", type: "Business" },
      { id: "brand", name: "Brand Page", followers: "3.4K", type: "Business" }
    ]
  },
  { 
    id: "linkedin",
    name: "LinkedIn", 
    icon: Linkedin, 
    followers: "1.8K", 
    gradient: "from-blue-500 to-blue-700",
    posts: 15,
    engagement: "6.2%",
    pages: [
      { id: "profile", name: "Professional Profile", followers: "1.8K", type: "Personal" },
      { id: "company", name: "Company LinkedIn", followers: "892", type: "Business" }
    ]
  },
  { 
    id: "youtube",
    name: "YouTube", 
    icon: Youtube, 
    followers: "634", 
    gradient: "from-red-500 to-red-600",
    posts: 8,
    engagement: "7.1%",
    pages: [
      { id: "channel", name: "Main Channel", followers: "634", type: "Channel" }
    ]
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

// Generate scheduled posts for the next week
const generateScheduledPosts = () => {
  const posts = [];
  const platforms = [
    { name: "Instagram", icon: Instagram, color: "from-purple-500 to-pink-500" },
    { name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600" },
    { name: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-800" },
    { name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-800" }
  ];
  
  const postTypes = [
    "Product showcase",
    "Industry insights",
    "Behind the scenes",
    "Customer testimonial",
    "Weekly roundup",
    "Educational content",
    "Company news",
    "User-generated content",
    "Motivational quote",
    "Tips & tricks"
  ];

  // Generate posts for next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Random number of posts per day (1-4)
    const postsPerDay = Math.floor(Math.random() * 4) + 1;
    
    for (let j = 0; j < postsPerDay; j++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
      const hour = Math.floor(Math.random() * 12) + 8; // Between 8 AM - 8 PM
      const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45 minutes
      
      posts.push({
        id: `${i}-${j}`,
        platform: platform.name,
        platformIcon: platform.icon,
        platformColor: platform.color,
        content: postType,
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute),
        type: Math.random() > 0.8 ? "video" : Math.random() > 0.5 ? "image" : "text"
      });
    }
  }
  
  return posts.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const scheduledPosts = generateScheduledPosts();

// Draft posts data
const draftPosts = [
  {
    id: 1,
    title: "The Future of AI in Social Media Marketing",
    content: "Artificial intelligence is revolutionizing how we approach social media marketing. From automated content creation to predictive analytics, AI tools are helping businesses...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format",
    platforms: ["Instagram", "LinkedIn", "Twitter"],
    category: "AI & Technology",
    createdAt: new Date(2024, 7, 10, 14, 30),
    wordCount: 245,
    status: "Draft"
  },
  {
    id: 2,
    title: "5 Essential Tips for Remote Team Management",
    content: "Managing remote teams requires a different approach than traditional office management. Here are five proven strategies that successful companies use to keep their remote teams...",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&auto=format",
    platforms: ["LinkedIn", "Facebook"],
    category: "Business & Management",
    createdAt: new Date(2024, 7, 9, 10, 15),
    wordCount: 312,
    status: "Draft"
  },
  {
    id: 3,
    title: "Sustainable Business Practices That Drive Growth",
    content: "Sustainability isn't just good for the planet—it's good for business. Companies that embrace eco-friendly practices are seeing increased customer loyalty and higher profits...",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop&auto=format",
    platforms: ["Instagram", "LinkedIn", "Twitter", "Facebook"],
    category: "Sustainability",
    createdAt: new Date(2024, 7, 8, 16, 45),
    wordCount: 198,
    status: "Draft"
  },
  {
    id: 4,
    title: "E-commerce Trends to Watch in 2024",
    content: "The e-commerce landscape is constantly evolving. From social commerce to personalized shopping experiences, here are the trends that will shape online retail...",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format",
    platforms: ["Instagram", "Twitter"],
    category: "E-commerce",
    createdAt: new Date(2024, 7, 7, 11, 20),
    wordCount: 287,
    status: "Draft"
  },
  {
    id: 5,
    title: "Building a Strong Personal Brand Online",
    content: "In today's digital world, your personal brand is your most valuable asset. Whether you're an entrepreneur, freelancer, or employee, having a strong online presence...",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format",
    platforms: ["LinkedIn", "Twitter"],
    category: "Personal Branding",
    createdAt: new Date(2024, 7, 6, 9, 0),
    wordCount: 324,
    status: "Draft"
  },
  {
    id: 6,
    title: "The Psychology of Color in Marketing",
    content: "Colors have a profound impact on consumer behavior and purchasing decisions. Understanding color psychology can help marketers create more effective campaigns...",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format",
    platforms: ["Instagram", "Pinterest", "Facebook"],
    category: "Marketing",
    createdAt: new Date(2024, 7, 5, 13, 30),
    wordCount: 156,
    status: "Draft"
  }
];

// All trending topics data
const allTrendingTopics = [
  {
    id: 1,
    title: "The Rise of No-Code/Low-Code Solutions",
    description: "Explore how no-code and low-code platforms are empowering businesses and individuals to build software solutions without extensive coding knowledge. Discuss the benefits, use cases, and future of these tools.",
    category: "Software Company",
    industry: "Technology",
    keywords: ["no-code", "low-code", "software", "development", "platforms"],
    engagement: "50%",
    status: "Trending"
  },
  {
    id: 2,
    title: "Cybersecurity in 2024: Trends and Threats",
    description: "Analyze the latest cybersecurity threats and trends. Offer insights on how businesses can protect their data and systems. Discuss emerging technologies and best practices.",
    category: "Software Company",
    industry: "Technology",
    keywords: ["cybersecurity", "security", "threats", "data protection", "privacy"],
    engagement: "50%",
    status: "Trending"
  },
  {
    id: 3,
    title: "AI in Content Creation: The Future is Here",
    description: "Discover how artificial intelligence is revolutionizing content creation across industries. From automated writing to AI-generated visuals, explore the possibilities.",
    category: "Technology",
    industry: "Technology",
    keywords: ["AI", "artificial intelligence", "content creation", "automation", "writing"],
    engagement: "65%",
    status: "Hot"
  },
  {
    id: 4,
    title: "Remote Work Culture: Building Strong Teams",
    description: "Learn best practices for building and maintaining strong remote teams. Discuss communication tools, company culture, and employee engagement strategies.",
    category: "Business",
    industry: "Business",
    keywords: ["remote work", "team building", "culture", "communication", "management"],
    engagement: "45%",
    status: "Trending"
  },
  {
    id: 5,
    title: "Sustainable Technology: Green Innovation",
    description: "Explore how technology companies are embracing sustainability. Discuss eco-friendly practices, green computing, and environmental responsibility in tech.",
    category: "Technology",
    industry: "Technology",
    keywords: ["sustainability", "green tech", "environment", "eco-friendly", "innovation"],
    engagement: "55%",
    status: "Rising"
  },
  {
    id: 6,
    title: "Digital Marketing Trends for E-commerce",
    description: "Discover the latest digital marketing strategies that are driving e-commerce success. From social commerce to influencer partnerships.",
    category: "Marketing",
    industry: "E-commerce",
    keywords: ["digital marketing", "e-commerce", "social commerce", "influencer", "sales"],
    engagement: "72%",
    status: "Hot"
  },
  {
    id: 7,
    title: "Healthcare Technology Revolution",
    description: "Explore how technology is transforming healthcare delivery, from telemedicine to AI diagnostics and patient care innovations.",
    category: "Healthcare",
    industry: "Healthcare",
    keywords: ["healthcare", "telemedicine", "medical technology", "patient care", "diagnostics"],
    engagement: "68%",
    status: "Rising"
  },
  {
    id: 8,
    title: "Fintech Innovations in 2024",
    description: "Learn about the latest financial technology innovations, including blockchain, digital payments, and decentralized finance solutions.",
    category: "Finance",
    industry: "Finance",
    keywords: ["fintech", "blockchain", "digital payments", "cryptocurrency", "finance"],
    engagement: "58%",
    status: "Trending"
  },
  {
    id: 9,
    title: "EdTech: The Future of Learning",
    description: "Discover how educational technology is reshaping learning experiences, from online platforms to AR/VR in education.",
    category: "Education",
    industry: "Education",
    keywords: ["edtech", "education", "learning", "online", "virtual reality"],
    engagement: "61%",
    status: "Rising"
  },
  {
    id: 10,
    title: "Climate Tech Solutions",
    description: "Explore innovative climate technology solutions that are helping combat climate change and promote environmental sustainability.",
    category: "Environment",
    industry: "Environment",
    keywords: ["climate tech", "environment", "sustainability", "clean energy", "carbon"],
    engagement: "54%",
    status: "Trending"
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [visibleTopicsCount, setVisibleTopicsCount] = useState(5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Create Post states
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<{[platformId: string]: string[]}>({});
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  
  // Platform connection states
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [showConnectionDialog, setShowConnectionDialog] = useState(false);
  const [connectionPlatform, setConnectionPlatform] = useState<string>("");
  const [showFacebookAuth, setShowFacebookAuth] = useState(false);
  const [facebookAuthUrl, setFacebookAuthUrl] = useState<string>("");
  const [authStep, setAuthStep] = useState<'connecting' | 'authorizing' | 'completed'>('connecting');
  const [fetchingSteps, setFetchingSteps] = useState({
    pages: 'loading',
    posts: 'loading', 
    comments: 'loading',
    likes: 'loading'
  });

  // Media attachment states
  const [attachedMedia, setAttachedMedia] = useState<{
    type: 'none' | 'image' | 'video' | 'link';
    content: string;
    preview?: string;
  }>({ type: 'none', content: '', preview: '' });

  // Handle platform connection
  const handlePlatformConnect = async (platformName: string) => {
    setConnectingPlatform(platformName);
    setConnectionPlatform(platformName);
    
    if (platformName === 'facebook') {
      try {
        // Generate Facebook OAuth URL
        const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/facebook/callback');
        const scope = encodeURIComponent('pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish');
        const state = encodeURIComponent(Date.now().toString()); // CSRF protection
        
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code`;
        
        // Open Facebook auth directly in popup
        const popup = window.open(
          authUrl,
          'facebook-auth',
          'width=500,height=700,scrollbars=yes,resizable=yes'
        );
        
        // Monitor the popup
        const checkClosed = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkClosed);
            setConnectingPlatform(null);
            
            // Show success notification and start progressive completion
            setShowFacebookAuth(true);
            setAuthStep('completed');
            startProgressiveCompletion();
          }
        }, 1000);
        
        // Listen for success message from popup
        const messageListener = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'FACEBOOK_AUTH_SUCCESS') {
            clearInterval(checkClosed);
            popup?.close();
            window.removeEventListener('message', messageListener);
            setConnectingPlatform(null);
            
            // Show success notification and start progressive completion
            setShowFacebookAuth(true);
            setAuthStep('completed');
            startProgressiveCompletion();
          }
        };
        
        window.addEventListener('message', messageListener);
        
        // Cleanup after 10 minutes
        setTimeout(() => {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          if (popup && !popup.closed) {
            popup.close();
            setConnectingPlatform(null);
          }
        }, 600000);
        
      } catch (error) {
        console.error('Failed to initiate Facebook connection:', error);
        setConnectingPlatform(null);
        alert('Failed to connect Facebook. Please check your connection and try again.');
      }
    } else {
      // For other platforms, show connection dialog
      setShowConnectionDialog(true);
      setConnectingPlatform(null);
    }
  };

  // Progressive completion of fetching steps
  const startProgressiveCompletion = () => {
    // Reset all steps to loading
    setFetchingSteps({
      pages: 'loading',
      posts: 'loading',
      comments: 'loading', 
      likes: 'loading'
    });

    // Complete each step progressively
    setTimeout(() => {
      setFetchingSteps(prev => ({ ...prev, pages: 'completed' }));
    }, 1500);

    setTimeout(() => {
      setFetchingSteps(prev => ({ ...prev, posts: 'completed' }));
    }, 2500);

    setTimeout(() => {
      setFetchingSteps(prev => ({ ...prev, comments: 'completed' }));
    }, 3500);

    setTimeout(() => {
      setFetchingSteps(prev => ({ ...prev, likes: 'completed' }));
    }, 4500);

    // Auto-redirect to dashboard after all steps complete
    setTimeout(() => {
      setShowFacebookAuth(false);
      setConnectingPlatform(null);
      setAuthStep('connecting');
      window.location.reload();
    }, 5500);
  };

  // Load Facebook SDK
  const loadFacebookSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.FB) {
        resolve();
        return;
      }

      window.fbAsyncInit = function() {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID || '1234567890', // Replace with actual Facebook App ID
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        resolve();
      };

      // Load Facebook SDK script
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Facebook SDK'));
      document.head.appendChild(script);
    });
  };

  // Handle Facebook OAuth callback
  const handleFacebookCallback = async (authResponse: any) => {
    try {
      setConnectingPlatform('facebook');
      
      // Get user info
      window.FB.api('/me', { fields: 'name,email' }, (userInfo: any) => {
        console.log('Facebook user info:', userInfo);
      });
      
      // Get user pages
      window.FB.api('/me/accounts', (response: any) => {
        if (response.data) {
          console.log('Facebook pages:', response.data);
          
          // Save connection to backend
          saveFacebookConnection({
            accessToken: authResponse.accessToken,
            userID: authResponse.userID,
            pages: response.data
          });
        }
      });
      
    } catch (error) {
      console.error('Error handling Facebook callback:', error);
      setConnectingPlatform(null);
    }
  };

  // Save Facebook connection to backend
  const saveFacebookConnection = async (connectionData: any) => {
    try {
      const response = await fetch('/api/platforms/connect/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Facebook connection saved:', result);
        setConnectingPlatform(null);
        
        // Refresh the page to show new connection
        window.location.reload();
      } else {
        throw new Error('Failed to save Facebook connection');
      }
    } catch (error) {
      console.error('Error saving Facebook connection:', error);
      setConnectingPlatform(null);
      alert('Failed to save Facebook connection. Please try again.');
    }
  };
  
  // Get unique industries for filter
  const industries = ["All", ...Array.from(new Set(allTrendingTopics.map(topic => topic.industry)))];
  
  // Filter topics based on search and industry
  const filteredTopics = allTrendingTopics.filter(topic => {
    const matchesSearch = searchQuery === "" || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === "All" || topic.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });
  
  // Show only visible topics (max 10)
  const maxTopics = 10;
  const trendingTopics = filteredTopics.slice(0, Math.min(visibleTopicsCount, maxTopics));
  const hasMoreTopics = filteredTopics.length > visibleTopicsCount && visibleTopicsCount < maxTopics;
  
  // Reset visible count when search/filter changes
  const resetPagination = () => {
    setVisibleTopicsCount(5);
  };

  // Platform selection handlers
  const togglePlatform = (platformId: string) => {
    console.log('Platform toggle clicked:', platformId);
    setSelectedPlatforms(prev => {
      const newSelected = prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId];
      
      console.log('Updated selected platforms:', newSelected);
      
      // Reset pages for removed platforms
      if (!newSelected.includes(platformId)) {
        setSelectedPages(prevPages => {
          const newPages = { ...prevPages };
          delete newPages[platformId];
          return newPages;
        });
      }
      
      return newSelected;
    });
  };

  const togglePage = (platformId: string, pageId: string) => {
    setSelectedPages(prev => {
      const platformPages = prev[platformId] || [];
      const newPlatformPages = platformPages.includes(pageId)
        ? platformPages.filter(id => id !== pageId)
        : [...platformPages, pageId];
      
      return {
        ...prev,
        [platformId]: newPlatformPages
      };
    });
  };

  const resetCreatePost = () => {
    setShowCreatePost(false);
    setSelectedPlatforms([]);
    setSelectedPages({});
    setPostContent("");
    setPostTitle("");
    setAttachedMedia({ type: 'none', content: '', preview: '' });
  };

  // Check if LinkedIn is selected
  const hasLinkedInSelected = () => {
    const result = selectedPlatforms.includes('linkedin');
    console.log('LinkedIn check:', { selectedPlatforms, result });
    return result;
  };

  // Media attachment handlers
  const handleMediaAttachment = (type: 'image' | 'video' | 'link') => {
    // Check LinkedIn restrictions
    const hasLinkedIn = hasLinkedInSelected();

    if (hasLinkedIn && attachedMedia.type !== 'none' && attachedMedia.type !== type) {
      alert('LinkedIn only supports one type of media per post. Please remove the current attachment first.');
      return;
    }

    setAttachedMedia({ type, content: '', preview: '' });
  };

  const removeMediaAttachment = () => {
    setAttachedMedia({ type: 'none', content: '', preview: '' });
  };

  const getLinkedInMediaWarning = () => {
    const hasLinkedIn = hasLinkedInSelected();

    if (hasLinkedIn && attachedMedia.type !== 'none') {
      return 'LinkedIn selected: Only one media type allowed per post';
    }
    return null;
  };

  // Check if media button should be disabled
  const isMediaButtonDisabled = (buttonType: 'image' | 'video' | 'link') => {
    const hasLinkedIn = hasLinkedInSelected();
    const shouldDisable = hasLinkedIn && attachedMedia.type !== 'none' && attachedMedia.type !== buttonType;
    
    console.log('Media button disabled check:', { 
      buttonType, 
      hasLinkedIn, 
      attachedMediaType: attachedMedia.type, 
      shouldDisable 
    });
    
    return shouldDisable;
  };
  
  // Auto-load on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;
      
      // Load more when scrolled near the bottom (80% of the way)
      if (scrollTop + clientHeight >= scrollHeight * 0.8 && hasMoreTopics) {
        setVisibleTopicsCount(prev => Math.min(prev + 3, maxTopics, filteredTopics.length));
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [hasMoreTopics, filteredTopics.length]);
  const [connectedPlatforms, setConnectedPlatforms] = useState(initialConnectedPlatforms);
  const [disconnectingPlatform, setDisconnectingPlatform] = useState<string | null>(null);

  const handleDisconnect = async (platformId: string) => {
    setDisconnectingPlatform(platformId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setConnectedPlatforms(prev => prev.filter(platform => platform.id !== platformId));
    setDisconnectingPlatform(null);
  };

  return (
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
                      <stat.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
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
                            onClick={() => handlePlatformConnect(platform.name.toLowerCase())}
                            className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 text-left group ${
                              connectingPlatform === platform.name.toLowerCase()
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                                : 'bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 border-white/20 hover:shadow-md'
                            }`}
                            disabled={connectingPlatform === platform.name.toLowerCase()}
                          >
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                              {connectingPlatform === platform.name.toLowerCase() ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <platform.icon className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {platform.name}
                                {connectingPlatform === platform.name.toLowerCase() && (
                                  <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">Connecting...</span>
                                )}
                              </h5>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {connectingPlatform === platform.name.toLowerCase() 
                                  ? 'Please complete authentication in the popup window'
                                  : platform.description
                                }
                              </p>
                            </div>
                            {connectingPlatform === platform.name.toLowerCase() ? (
                              <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
                            )}
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
                    <div className="flex items-center space-x-4">
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
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200"
                              disabled={disconnectingPlatform === platform.id}
                            >
                              {disconnectingPlatform === platform.id ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <AlertCircle className="h-4 w-4" />
                                </motion.div>
                              ) : (
                                <Unplug className="h-4 w-4" />
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-80 p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 z-50" 
                            align="end"
                            side="left"
                            sideOffset={10}
                          >
                            <div className="p-4">
                              <div className="flex items-start space-x-3 mb-4">
                                <div className="p-2 bg-red-100 dark:bg-red-950/30 rounded-lg">
                                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    Disconnect {platform.name}?
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    This will remove {platform.name} from your dashboard and stop all scheduled posts for this platform.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-end space-x-2">
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm" className="rounded-full">
                                    Cancel
                                  </Button>
                                </PopoverTrigger>
                                <Button 
                                  size="sm" 
                                  className="bg-red-600 hover:bg-red-700 text-white rounded-full"
                                  onClick={() => handleDisconnect(platform.id)}
                                  disabled={disconnectingPlatform === platform.id}
                                >
                                  {disconnectingPlatform === platform.id ? "Disconnecting..." : "Disconnect"}
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
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
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.platform} • {activity.time}
                        </p>
                        <Badge className={`text-xs ${
                          activity.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          activity.status === 'scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {activity.engagement}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Overview */}
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
                  Performance Overview
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your content performance across all platforms
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-48 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-600/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <SelectItem value="All Industries">All Industries</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Weekly Growth</span>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3%
                  </Badge>
                </div>
                <Progress value={75} className="h-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/50 dark:to-purple-950/50" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>This Week: 892</span>
                  <span>Last Week: 774</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement Rate</span>
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                    <Heart className="h-3 w-3 mr-1" />
                    4.8%
                  </Badge>
                </div>
                <Progress value={68} className="h-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Industry Avg: 3.2%</span>
                  <span>Your Rate: 4.8%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Reach Growth</span>
                  <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                    <Globe className="h-3 w-3 mr-1" />
                    +22.4%
                  </Badge>
                </div>
                <Progress value={82} className="h-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950/50 dark:to-blue-950/50" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Monthly: 15.7K</span>
                  <span>Previous: 12.8K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scheduled Posts Calendar */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Scheduled Posts
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  View and manage your upcoming posts for the next 7 days
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Week
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week Calendar View */}
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const date = new Date();
                date.setDate(date.getDate() + dayIndex);
                const dayPosts = scheduledPosts.filter(post => 
                  post.date.toDateString() === date.toDateString()
                );
                
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + dayIndex * 0.05 }}
                    className="space-y-3"
                  >
                    {/* Day Header */}
                    <div className={`text-center p-3 rounded-xl ${
                      isToday 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-300/50 dark:border-blue-600/50' 
                        : 'bg-gray-50/60 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600/50'
                    } backdrop-blur-sm`}>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-lg font-bold mt-1 ${
                        isToday 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {dayPosts.length} post{dayPosts.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Posts for this day */}
                    <div className="space-y-2 min-h-[200px]">
                      {dayPosts.map((post, postIndex) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + dayIndex * 0.05 + postIndex * 0.02 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="p-3 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/60 dark:to-gray-700/60 rounded-lg border border-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${post.platformColor} shadow-sm group-hover:shadow-md transition-all duration-300`}>
                              <post.platformIcon className="h-3 w-3 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                                  {post.platform}
                                </span>
                                <Badge className={`text-xs px-2 py-0.5 ${
                                  post.type === 'video' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                  post.type === 'image' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                }`}>
                                  {post.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-800 dark:text-gray-200 font-medium line-clamp-2 mb-1">
                                {post.content}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {post.date.toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit', 
                                  hour12: true 
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Empty state for days with no posts */}
                      {dayPosts.length === 0 && (
                        <div className="flex items-center justify-center h-20 text-gray-400 dark:text-gray-500">
                          <div className="text-center">
                            <Calendar className="h-6 w-6 mx-auto mb-1 opacity-50" />
                            <p className="text-xs">No posts</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Week Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 p-4 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {scheduledPosts.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total Posts
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {scheduledPosts.filter(p => p.platform === 'Instagram').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Instagram
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {scheduledPosts.filter(p => p.platform === 'Twitter').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Twitter
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {scheduledPosts.filter(p => p.type === 'video').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Video Posts
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Activity className="h-4 w-4 mr-1" />
                    View Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trending Topics and Social Performance Score */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trending Topics */}
        <motion.div
          className="lg:col-span-2"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2 flex items-center">
                  <Flame className="h-6 w-6 mr-2 text-red-500" />
                  Trending Topics
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Discover what's trending now and create engaging content with AI
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Hash className="h-4 w-4 mr-1" />
                  All Categories
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search topics, keywords, or industries..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    resetPagination();
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                />
              </div>
              
              {/* Industry Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={selectedIndustry} onValueChange={(value) => {
                  setSelectedIndustry(value);
                  resetPagination();
                }}>
                  <SelectTrigger className="w-48 bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Results Count */}
                <div className="flex-1 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {trendingTopics.length} of {Math.min(filteredTopics.length, maxTopics)} {filteredTopics.length === 1 ? 'topic' : 'topics'}
                    {filteredTopics.length > maxTopics && (
                      <span className="text-xs text-orange-500 dark:text-orange-400 ml-2">(max {maxTopics})</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Topics List */}
            <div 
              ref={scrollContainerRef}
              className="space-y-3 max-h-[600px] overflow-y-auto pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 transparent'
              }}
            >
              {trendingTopics.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No topics found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search terms or industry filter to find trending topics.
                  </p>
                </div>
              ) : (
                trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-white/80 dark:bg-gray-700/50 rounded-xl border border-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                          {topic.title}
                        </h3>
                        <Badge className={`px-2 py-1 text-xs font-medium rounded-full ${
                          topic.status === 'Trending' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          topic.status === 'Hot' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {topic.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-3">
                        {topic.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Engagement Rate: </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100 ml-1">
                          {topic.engagement}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Draft Post
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96 p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20" align="end">
                          <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                                <Sparkles className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                  AI Post Generator
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Create engaging content for "{topic.title}"
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                  Select Platform
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500' },
                                    { name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600' },
                                    { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800' },
                                    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800' }
                                  ].map((platform) => (
                                    <motion.button
                                      key={platform.name}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="flex items-center space-x-2 p-3 bg-gray-50/60 dark:bg-gray-700/30 rounded-lg border border-white/20 hover:shadow-md transition-all duration-200"
                                    >
                                      <div className={`p-1.5 rounded-lg bg-gradient-to-r ${platform.color}`}>
                                        <platform.icon className="h-4 w-4 text-white" />
                                      </div>
                                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {platform.name}
                                      </span>
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                  Post Style
                                </label>
                                <select className="w-full p-3 bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 rounded-lg text-sm">
                                  <option>Engaging & Casual</option>
                                  <option>Professional & Informative</option>
                                  <option>Fun & Creative</option>
                                  <option>Inspiring & Motivational</option>
                                </select>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                  Additional Context (Optional)
                                </label>
                                <textarea 
                                  className="w-full p-3 bg-white/80 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 rounded-lg text-sm resize-none"
                                  rows={3}
                                  placeholder="Add any specific details or angle you want to focus on..."
                                ></textarea>
                              </div>

                              <div className="flex items-center space-x-2 pt-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg"
                                >
                                  <Bot className="h-4 w-4 mr-2" />
                                  Generate Post
                                </Button>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm" className="rounded-lg">
                                    Cancel
                                  </Button>
                                </PopoverTrigger>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </motion.div>
              ))
              )}
            </div>



            {/* Trending Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-6 p-4 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {filteredTopics.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total Topics
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {trendingTopics.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Showing
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {filteredTopics.filter(t => t.status === 'Hot').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Hot Topics
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {filteredTopics.length > 0 ? Math.round(filteredTopics.reduce((acc, t) => acc + parseFloat(t.engagement.replace('%', '')), 0) / filteredTopics.length) : 0}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Avg Engagement
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Zap className="h-4 w-4 mr-1" />
                    Auto-Generate Posts
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Social Performance Score */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-500" />
                  Social Performance Score
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Monitor your overall social media performance
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  View Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Performance Score Circle */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${85 * 2.51} ${100 * 2.51}`}
                    className="text-green-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">85</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-50/60 to-purple-50/60 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      +12.5%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Follower Growth
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50/60 to-teal-50/60 dark:from-green-950/30 dark:to-teal-950/30 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      8.7%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Engagement Rate
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <Share2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      234
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Shares This Week
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50/60 to-red-50/60 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      45.2K
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Reach
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Performance Insights
              </h4>
              
              <div className="p-3 bg-green-50/60 dark:bg-green-950/30 rounded-lg border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Your engagement rate increased by 15% this week
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Best posting time: 2-4 PM on weekdays
                  </span>
                </div>
              </div>

              <div className="p-3 bg-purple-50/60 dark:bg-purple-950/30 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Video content performs 3x better than images
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    {/* Draft Posts Section */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="mt-8"
    >
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-gray-100 text-xl mb-2 flex items-center">
                <Edit3 className="h-6 w-6 mr-2 text-purple-500" />
                Draft Posts
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Continue working on your saved draft content
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                New Draft
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {draftPosts.map((draft, index) => (
              <motion.div
                key={draft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="group bg-white/80 dark:bg-gray-700/50 rounded-xl border border-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300 p-4"
              >
                <div className="flex items-start space-x-4">
                  {/* Draft Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={draft.image}
                      alt={draft.title}
                      className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-medium">
                        {draft.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Draft Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                        {draft.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">
                      {draft.content}
                    </p>

                    {/* Platform and Date Info */}
                    <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {draft.platforms.map((platform) => (
                            <div
                              key={platform}
                              className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                              title={platform}
                            >
                              <span className="text-white text-xs font-bold">
                                {platform.charAt(0)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <span>{draft.platforms.join(', ')}</span>
                      </div>
                      <span>•</span>
                      <span>{draft.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white px-4">
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Draft Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-white/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {draftPosts.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Total Drafts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round(draftPosts.reduce((acc, draft) => acc + draft.wordCount, 0) / draftPosts.length)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Avg Words
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {new Set(draftPosts.flatMap(draft => draft.platforms)).size}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Platforms
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {new Set(draftPosts.map(draft => draft.category)).size}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Categories
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Layers className="h-4 w-4 mr-1" />
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Schedule All
                </Button>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>

    {/* Create Post Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3 }}
      className="mt-8"
    >
      <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create New Post
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Create and schedule content across your social media platforms
              </CardDescription>
            </div>
            <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create New Post</DialogTitle>
                  <DialogDescription>
                    Select platforms and pages, then create your content
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  {/* Post Content */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Post Title
                      </label>
                      <Input
                        placeholder="Enter post title..."
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Post Content
                      </label>
                      <Textarea
                        placeholder="What's on your mind? Share your thoughts..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="w-full h-32 resize-none"
                      />
                    </div>
                  </div>

                  {/* Media Attachments */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Add Media
                      </h3>
                      {getLinkedInMediaWarning() && (
                        <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                          {getLinkedInMediaWarning()}
                        </div>
                      )}
                    </div>

                    {/* LinkedIn Information Notice */}
                    {hasLinkedInSelected() && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium text-blue-800 dark:text-blue-200">LinkedIn Media Policy</p>
                            <p className="text-blue-700 dark:text-blue-300 mt-1">
                              LinkedIn only supports <strong>one type of media</strong> per post. You can attach either an image, video, or link - but not multiple types in the same post.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Media Type Selection */}
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => handleMediaAttachment('image')}
                        disabled={isMediaButtonDisabled('image')}
                        className={`
                          p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2
                          ${attachedMedia.type === 'image' 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : isMediaButtonDisabled('image')
                            ? 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-green-300'
                          }
                        `}
                      >
                        <Image className={`h-6 w-6 ${attachedMedia.type === 'image' ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${attachedMedia.type === 'image' ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>
                          Photo
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMediaAttachment('video')}
                        disabled={isMediaButtonDisabled('video')}
                        className={`
                          p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2
                          ${attachedMedia.type === 'video' 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : isMediaButtonDisabled('video')
                            ? 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-purple-300'
                          }
                        `}
                      >
                        <svg className={`h-6 w-6 ${attachedMedia.type === 'video' ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className={`text-sm font-medium ${attachedMedia.type === 'video' ? 'text-purple-700 dark:text-purple-300' : 'text-gray-500'}`}>
                          Video
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMediaAttachment('link')}
                        disabled={isMediaButtonDisabled('link')}
                        className={`
                          p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2
                          ${attachedMedia.type === 'link' 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : isMediaButtonDisabled('link')
                            ? 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300'
                          }
                        `}
                      >
                        <svg className={`h-6 w-6 ${attachedMedia.type === 'link' ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className={`text-sm font-medium ${attachedMedia.type === 'link' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500'}`}>
                          Link
                        </span>
                      </button>
                    </div>

                    {/* Media Input */}
                    {attachedMedia.type !== 'none' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {attachedMedia.type === 'image' && 'Upload Image'}
                            {attachedMedia.type === 'video' && 'Upload Video'}
                            {attachedMedia.type === 'link' && 'Add Link URL'}
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeMediaAttachment}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                        
                        {attachedMedia.type === 'link' ? (
                          <Input
                            placeholder="https://example.com"
                            value={attachedMedia.content}
                            onChange={(e) => setAttachedMedia(prev => ({ ...prev, content: e.target.value }))}
                            className="w-full"
                          />
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                            <div className="space-y-2">
                              <div className="text-gray-500 dark:text-gray-400">
                                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Click to upload {attachedMedia.type} or drag and drop
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {attachedMedia.type === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV up to 100MB'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Platform Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Select Platforms
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {initialConnectedPlatforms.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = selectedPlatforms.includes(platform.id);
                        
                        return (
                          <div
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`
                              relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105
                              ${isSelected 
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'
                              }
                            `}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.gradient} flex items-center justify-center`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                  {platform.name}
                                  {platform.id === 'linkedin' && (
                                    <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                      1 media only
                                    </span>
                                  )}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {platform.followers} followers
                                  {platform.id === 'linkedin' && (
                                    <span className="block text-xs text-blue-600 dark:text-blue-400 mt-1">
                                      One media type per post
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            {/* Checkbox */}
                            <div className="absolute top-3 right-3">
                              <Checkbox 
                                checked={isSelected}
                                className={isSelected ? "border-purple-500" : ""}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Page Selection for Selected Platforms */}
                  {selectedPlatforms.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Select Pages/Accounts
                      </h3>
                      
                      {selectedPlatforms.map((platformId) => {
                        const platform = initialConnectedPlatforms.find(p => p.id === platformId);
                        if (!platform) return null;
                        
                        const Icon = platform.icon;
                        const platformPages = selectedPages[platformId] || [];
                        
                        return (
                          <div key={platformId} className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-6 h-6 rounded bg-gradient-to-r ${platform.gradient} flex items-center justify-center`}>
                                <Icon className="h-3 w-3 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {platform.name} Pages
                              </h4>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
                              {platform.pages.map((page) => {
                                const isPageSelected = platformPages.includes(page.id);
                                
                                return (
                                  <div
                                    key={page.id}
                                    onClick={() => togglePage(platformId, page.id)}
                                    className={`
                                      p-3 rounded-lg border cursor-pointer transition-all duration-200
                                      ${isPageSelected 
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300'
                                      }
                                    `}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                          {page.name}
                                        </h5>
                                        <div className="flex items-center space-x-2 mt-1">
                                          <Badge variant="outline" className="text-xs">
                                            {page.type}
                                          </Badge>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {page.followers} followers
                                          </span>
                                        </div>
                                      </div>
                                      <Checkbox 
                                        checked={isPageSelected}
                                        className={isPageSelected ? "border-purple-500" : ""}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                    <Button 
                      variant="outline" 
                      onClick={resetCreatePost}
                      className="px-6"
                    >
                      Cancel
                    </Button>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="outline" 
                        disabled={!postContent.trim() || selectedPlatforms.length === 0}
                        className="px-6"
                      >
                        Save as Draft
                      </Button>
                      <Button 
                        disabled={!postContent.trim() || selectedPlatforms.length === 0 || selectedPlatforms.some(p => !selectedPages[p]?.length)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                      >
                        Schedule Post
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {initialConnectedPlatforms.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Connected Platforms
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {initialConnectedPlatforms.reduce((acc, platform) => acc + platform.pages.length, 0)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Total Pages/Accounts
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedPlatforms.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Selected Platforms
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-xl p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {Object.values(selectedPages).reduce((acc, pages) => acc + pages.length, 0)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Selected Pages
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>

    {/* Facebook Connection Success Notification */}
    <Dialog open={showFacebookAuth} onOpenChange={setShowFacebookAuth}>
      <DialogContent className="max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-green-200 dark:border-green-800">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-600 to-green-800 rounded-lg">
              <Facebook className="h-5 w-5 text-white" />
            </div>
            <span>Facebook Connected Successfully!</span>
          </DialogTitle>
          <DialogDescription className="text-green-600 dark:text-green-400">
            Your Facebook account is now connected and we're fetching your data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Animation */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                className="text-green-600 dark:text-green-400 text-3xl"
              >
                ✓
              </motion.div>
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Account Connected</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We are now fetching your Facebook data including:
              </p>
            </div>
          </div>

          {/* Fetching Status */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              {fetchingSteps.pages === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full flex-shrink-0"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-sm text-blue-700 dark:text-blue-300">Pages and accounts</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              {fetchingSteps.posts === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full flex-shrink-0"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-sm text-purple-700 dark:text-purple-300">Posts and content</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              {fetchingSteps.comments === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                  className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full flex-shrink-0"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-sm text-pink-700 dark:text-pink-300">Comments and interactions</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              {fetchingSteps.likes === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                  className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full flex-shrink-0"
                />
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
              <span className="text-sm text-orange-700 dark:text-orange-300">Likes and engagement metrics</span>
            </div>
          </div>

          {/* Auto-redirect notification */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Redirecting to dashboard automatically...
            </div>
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full"
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {Object.values(fetchingSteps).filter(step => step === 'completed').length}/4 completed
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    </div>
  );
}