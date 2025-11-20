import { useState } from "react";
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Plus,
  Target,
  Calendar,
  BarChart3,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share2,
  DollarSign,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Upload,
  Image as ImageIcon,
  Video,
  Type,
  MousePointer,
  Globe,
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Monitor,
  Settings,
  CheckCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Image as ImageIcon2,
  FileText,
  PlayCircle
} from "lucide-react";

// Mock data for Facebook accounts and their associated ads accounts with detailed financial info
const facebookAccounts = [
  {
    id: "fb_acc_1",
    name: "TechStartup Inc.",
    profileImage: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=40&h=40&fit=crop&crop=face",
    verified: true,
    adsAccounts: [
      { 
        id: "ads_acc_1", 
        name: "TechStartup - Main Account", 
        accountId: "894335544663447", 
        status: "active",
        details: {
          timezone: "America/New_York",
          currency: "USD",
          totalSpent: "1,190,450.07",
          balance: "97.75",
          balanceStatus: "low",
          spendingLimit: null,
          dailySpendLimit: null,
          spendPercentage: "0.0"
        }
      },
      { 
        id: "ads_acc_2", 
        name: "TechStartup - Product Campaigns", 
        accountId: "987654321", 
        status: "active",
        details: {
          timezone: "America/Los_Angeles",
          currency: "USD",
          totalSpent: "845,230.15",
          balance: "2,450.00",
          balanceStatus: "good",
          spendingLimit: "10000",
          dailySpendLimit: "500",
          spendPercentage: "8.5"
        }
      },
      { 
        id: "ads_acc_3", 
        name: "TechStartup - Brand Awareness", 
        accountId: "456789123", 
        status: "active",
        details: {
          timezone: "America/Chicago",
          currency: "USD",
          totalSpent: "324,890.72",
          balance: "5,120.30",
          balanceStatus: "good",
          spendingLimit: "5000",
          dailySpendLimit: "250",
          spendPercentage: "6.5"
        }
      }
    ]
  },
  {
    id: "fb_acc_2",
    name: "Digital Agency Pro",
    profileImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=face",
    verified: true,
    adsAccounts: [
      { 
        id: "ads_acc_4", 
        name: "Agency - Client Portfolio", 
        accountId: "321654987", 
        status: "active",
        details: {
          timezone: "Europe/London",
          currency: "GBP",
          totalSpent: "567,890.45",
          balance: "1,200.75",
          balanceStatus: "good",
          spendingLimit: "15000",
          dailySpendLimit: "750",
          spendPercentage: "3.8"
        }
      },
      { 
        id: "ads_acc_5", 
        name: "Agency - Lead Gen Campaigns", 
        accountId: "654321789", 
        status: "active",
        details: {
          timezone: "Europe/Paris",
          currency: "EUR",
          totalSpent: "432,156.89",
          balance: "890.25",
          balanceStatus: "moderate",
          spendingLimit: "8000",
          dailySpendLimit: "400",
          spendPercentage: "5.4"
        }
      }
    ]
  },
  {
    id: "fb_acc_3",
    name: "E-Commerce Store",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    verified: false,
    adsAccounts: [
      { 
        id: "ads_acc_6", 
        name: "E-Commerce - Holiday Sales", 
        accountId: "789123456", 
        status: "active",
        details: {
          timezone: "Australia/Sydney",
          currency: "AUD",
          totalSpent: "298,745.33",
          balance: "3,450.80",
          balanceStatus: "good",
          spendingLimit: "12000",
          dailySpendLimit: "600",
          spendPercentage: "2.5"
        }
      },
      { 
        id: "ads_acc_7", 
        name: "E-Commerce - Retargeting", 
        accountId: "147258369", 
        status: "limited",
        details: {
          timezone: "Australia/Melbourne",
          currency: "AUD",
          totalSpent: "156,920.67",
          balance: "45.90",
          balanceStatus: "critical",
          spendingLimit: "3000",
          dailySpendLimit: "150",
          spendPercentage: "5.2"
        }
      }
    ]
  }
];

const campaigns = [
  {
    id: 1,
    name: "Summer Product Launch",
    status: "active",
    budget: 5000,
    spent: 3240,
    startDate: "May 15, 2024",
    endDate: "June 15, 2024",
    platforms: [
      { name: "Instagram", icon: Instagram, color: "from-purple-500 to-pink-500", budget: 2000, spent: 1340 },
      { name: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-800", budget: 1500, spent: 980 },
      { name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600", budget: 1500, spent: 920 }
    ],
    metrics: {
      reach: "245K",
      impressions: "1.2M",
      engagement: "8.4%",
      clicks: "12.3K",
      conversions: 234,
      ctr: "2.1%",
      cpc: "$0.85",
      cpm: "$4.20",
      roas: "3.2x",
      videoViews: "45.2K",
      saves: "1.8K",
      shares: "892"
    },
    progress: 65,
    adSets: [
      {
        id: "as_1",
        name: "Gen Z Audience - Instagram",
        status: "active",
        budget: 800,
        spent: 520,
        platform: "Instagram",
        audience: "Ages 18-25, Interested in Tech",
        impressions: "83.3K",
        clicks: "2.2K",
        ctr: "2.7%",
        cpc: "$0.24",
        conversions: 42,
        ads: [
          {
            id: "ad_1",
            name: "Product Hero Image - Mobile",
            type: "image",
            status: "active",
            spent: 260,
            impressions: "45.2K",
            clicks: "1.2K",
            ctr: "2.7%",
            cpc: "$0.22",
            conversions: 24,
            creative: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop"
          },
          {
            id: "ad_2",
            name: "Product Video Showcase",
            type: "video",
            status: "active",
            spent: 260,
            impressions: "38.1K",
            clicks: "980",
            ctr: "2.6%",
            cpc: "$0.27",
            conversions: 18,
            creative: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop"
          }
        ]
      },
      {
        id: "as_2",
        name: "Millennials - Facebook Feed",
        status: "active",
        budget: 600,
        spent: 390,
        platform: "Facebook",
        audience: "Ages 26-35, Tech Early Adopters",
        impressions: "52.3K",
        clicks: "1.4K",
        ctr: "2.8%",
        cpc: "$0.28",
        conversions: 35,
        ads: [
          {
            id: "ad_3",
            name: "Carousel Product Features",
            type: "carousel",
            status: "active",
            spent: 390,
            impressions: "52.3K",
            clicks: "1.4K",
            ctr: "2.8%",
            cpc: "$0.28",
            conversions: 35,
            creative: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop"
          }
        ]
      },
      {
        id: "as_3",
        name: "Twitter Engagement - Tech Users",
        status: "active",
        budget: 540,
        spent: 330,
        platform: "Twitter",
        audience: "Tech influencers and enthusiasts",
        impressions: "52.8K",
        clicks: "1.3K",
        ctr: "2.5%",
        cpc: "$0.25",
        conversions: 28,
        ads: [
          {
            id: "ad_4",
            name: "Thread Starter - Product Launch",
            type: "text",
            status: "active",
            spent: 165,
            impressions: "28.7K",
            clicks: "720",
            ctr: "2.5%",
            cpc: "$0.23",
            conversions: 16,
            creative: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop"
          },
          {
            id: "ad_5",
            name: "Promoted Tweet - Features",
            type: "text",
            status: "active",
            spent: 165,
            impressions: "24.1K",
            clicks: "590",
            ctr: "2.4%",
            cpc: "$0.28",
            conversions: 12,
            creative: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Brand Awareness Q2",
    status: "scheduled",
    budget: 8000,
    spent: 0,
    startDate: "June 1, 2024",
    endDate: "August 31, 2024",
    platforms: [
      { name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-800", budget: 3000, spent: 0 },
      { name: "Instagram", icon: Instagram, color: "from-purple-500 to-pink-500", budget: 2500, spent: 0 },
      { name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600", budget: 2500, spent: 0 }
    ],
    metrics: {
      reach: "0",
      impressions: "0",
      engagement: "0%",
      clicks: "0",
      conversions: 0,
      ctr: "0%",
      cpc: "$0.00",
      cpm: "$0.00",
      roas: "0x",
      videoViews: "0",
      saves: "0",
      shares: "0"
    },
    progress: 0,
    adSets: [
      {
        id: "as_4",
        name: "Professional Network - LinkedIn",
        status: "scheduled",
        budget: 3000,
        spent: 0,
        platform: "LinkedIn",
        audience: "Marketing professionals, CMOs",
        impressions: "0",
        clicks: "0",
        ctr: "0%",
        cpc: "$0.00",
        conversions: 0,
        ads: [
          {
            id: "ad_6",
            name: "Brand Story - Company Culture",
            type: "image",
            status: "scheduled",
            spent: 0,
            impressions: "0",
            clicks: "0",
            ctr: "0%",
            cpc: "$0.00",
            conversions: 0,
            creative: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop"
          },
          {
            id: "ad_7",
            name: "Leadership Video Interview",
            type: "video",
            status: "scheduled",
            spent: 0,
            impressions: "0",
            clicks: "0",
            ctr: "0%",
            cpc: "$0.00",
            conversions: 0,
            creative: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop"
          }
        ]
      },
      {
        id: "as_5",
        name: "Creative Audience - Instagram",
        status: "scheduled",
        budget: 2500,
        spent: 0,
        platform: "Instagram",
        audience: "Creative professionals, designers",
        impressions: "0",
        clicks: "0",
        ctr: "0%",
        cpc: "$0.00",
        conversions: 0,
        ads: [
          {
            id: "ad_8",
            name: "Behind the Scenes - Reels",
            type: "video",
            status: "scheduled",
            spent: 0,
            impressions: "0",
            clicks: "0",
            ctr: "0%",
            cpc: "$0.00",
            conversions: 0,
            creative: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Holiday Sales Campaign",
    status: "completed",
    budget: 12000,
    spent: 11760,
    startDate: "Nov 1, 2023",
    endDate: "Dec 31, 2023",
    platforms: [
      { name: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-800", budget: 5000, spent: 4890 },
      { name: "Instagram", icon: Instagram, color: "from-purple-500 to-pink-500", budget: 4000, spent: 3920 },
      { name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600", budget: 3000, spent: 2950 }
    ],
    metrics: {
      reach: "890K",
      impressions: "4.2M",
      engagement: "12.1%",
      clicks: "45.6K",
      conversions: 1234,
      ctr: "4.2%",
      cpc: "$0.65",
      cpm: "$3.80",
      roas: "5.4x",
      videoViews: "125.8K",
      saves: "4.2K",
      shares: "2.1K"
    },
    progress: 100,
    adSets: [
      {
        id: "as_6",
        name: "Holiday Shoppers - Facebook",
        status: "completed",
        budget: 5000,
        spent: 4890,
        platform: "Facebook",
        audience: "Holiday shoppers, gift buyers",
        impressions: "299.1K",
        clicks: "16.0K",
        ctr: "5.3%",
        cpc: "$0.31",
        conversions: 856,
        ads: [
          {
            id: "ad_9",
            name: "Black Friday Special Offer",
            type: "image",
            status: "completed",
            spent: 2445,
            impressions: "156.8K",
            clicks: "8.2K",
            ctr: "5.2%",
            cpc: "$0.30",
            conversions: 425,
            creative: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=200&h=200&fit=crop"
          },
          {
            id: "ad_10",
            name: "Cyber Monday Carousel",
            type: "carousel",
            status: "completed",
            spent: 2445,
            impressions: "142.3K",
            clicks: "7.8K",
            ctr: "5.5%",
            cpc: "$0.31",
            conversions: 431,
            creative: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=200&h=200&fit=crop"
          }
        ]
      },
      {
        id: "as_7",
        name: "Gift Ideas - Instagram Stories",
        status: "completed",
        budget: 4000,
        spent: 3920,
        platform: "Instagram",
        audience: "Gift buyers, lifestyle enthusiasts",
        impressions: "167.6K",
        clicks: "8.0K",
        ctr: "4.8%",
        cpc: "$0.49",
        conversions: 378,
        ads: [
          {
            id: "ad_11",
            name: "Gift Guide - Interactive Stories",
            type: "stories",
            status: "completed",
            spent: 1960,
            impressions: "89.4K",
            clicks: "4.1K",
            ctr: "4.6%",
            cpc: "$0.48",
            conversions: 189,
            creative: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop"
          },
          {
            id: "ad_12",
            name: "Last Minute Gifts - Video",
            type: "video",
            status: "completed",
            spent: 1960,
            impressions: "78.2K",
            clicks: "3.9K",
            ctr: "5.0%",
            cpc: "$0.50",
            conversions: 189,
            creative: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop"
          }
        ]
      }
    ]
  }
];

const campaignTemplates = [
  {
    name: "Product Launch",
    description: "Multi-platform campaign for new product announcements",
    platforms: ["Instagram", "Facebook", "Twitter", "LinkedIn"],
    duration: "30 days",
    budget: "$3,000 - $10,000",
    goals: ["Brand Awareness", "Lead Generation", "Sales"]
  },
  {
    name: "Brand Awareness",
    description: "Increase brand visibility and recognition across platforms",
    platforms: ["Facebook", "Instagram", "Twitter"],
    duration: "60 days",
    budget: "$5,000 - $15,000",
    goals: ["Reach", "Impressions", "Engagement"]
  },
  {
    name: "Lead Generation",
    description: "Drive qualified leads and conversions",
    platforms: ["LinkedIn", "Facebook", "Instagram"],
    duration: "45 days",
    budget: "$2,000 - $8,000",
    goals: ["Conversions", "Cost per Lead", "ROI"]
  }
];

export default function CampaignManager() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFacebookAccount, setSelectedFacebookAccount] = useState("");
  const [selectedAdsAccount, setSelectedAdsAccount] = useState("");
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [expandedCampaigns, setExpandedCampaigns] = useState<number[]>([]);
  const [expandedAdSets, setExpandedAdSets] = useState<string[]>([]);
  const [campaignStep, setCampaignStep] = useState("campaign");
  const [selectedMetricsLevel, setSelectedMetricsLevel] = useState("campaign");
  const [campaignData, setCampaignData] = useState({
    campaign: {
      name: "",
      objective: "",
      budget: "",
      budgetType: "daily"
    },
    adSet: {
      name: "",
      audience: {
        location: [],
        age: { min: 18, max: 65 },
        gender: "all",
        interests: [],
        behaviors: []
      },
      placements: [],
      budget: "",
      schedule: {
        startDate: "",
        endDate: "",
        adScheduling: false
      }
    },
    ads: []
  });
  const [selectedCreatives, setSelectedCreatives] = useState([]);
  const [previewMode, setPreviewMode] = useState("mobile");

  // Get ads accounts for selected Facebook account
  const availableAdsAccounts = selectedFacebookAccount 
    ? facebookAccounts.find(acc => acc.id === selectedFacebookAccount)?.adsAccounts || []
    : [];

  // Get current selected ad account details
  const currentAdAccountDetails = selectedAdsAccount 
    ? availableAdsAccounts.find(acc => acc.id === selectedAdsAccount)
    : null;

  // Reset ads account selection when Facebook account changes
  React.useEffect(() => {
    if (selectedFacebookAccount && !availableAdsAccounts.find(acc => acc.id === selectedAdsAccount)) {
      setSelectedAdsAccount("");
    }
  }, [selectedFacebookAccount, selectedAdsAccount, availableAdsAccounts]);

  const filteredCampaigns = campaigns.filter(campaign => 
    selectedStatus === 'all' || campaign.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      case 'paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'scheduled': return Calendar;
      case 'completed': return BarChart3;
      case 'paused': return Pause;
      default: return Calendar;
    }
  };

  const toggleCampaignExpansion = (campaignId: number) => {
    setExpandedCampaigns(prev => 
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const toggleAdSetExpansion = (adSetId: string) => {
    setExpandedAdSets(prev => 
      prev.includes(adSetId)
        ? prev.filter(id => id !== adSetId)
        : [...prev, adSetId]
    );
  };

  const getAdTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon2;
      case 'video': return PlayCircle;
      case 'carousel': return Layers;
      case 'text': return FileText;
      case 'gif': return PlayCircle;
      case 'stories': return Sparkles;
      default: return ImageIcon2;
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
              Campaign Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage your advertising campaigns
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {['all', 'active', 'scheduled', 'completed'].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  className="rounded-full capitalize"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
            
            <Popover open={isCreatingCampaign} onOpenChange={setIsCreatingCampaign}>
              <PopoverTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[1000px] h-[700px] p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20" align="end">
                <div className="flex h-full">
                  {/* Left Sidebar - Step Navigation */}
                  <div className="w-80 bg-gray-50/80 dark:bg-gray-900/80 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                            <Target className="h-4 w-4 text-white" />
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            Create New Ad Campaign
                          </h3>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setIsCreatingCampaign(false)}
                          className="h-6 w-6 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Step Navigation */}
                    <div className="flex-1 p-4 space-y-1">
                      <div 
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          campaignStep === 'campaign' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={() => setCampaignStep('campaign')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            campaignStep === 'campaign' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}>
                            1
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Set your campaign objective
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Choose your goal and budget
                            </p>
                          </div>
                        </div>
                        
                        {campaignStep === 'campaign' && (
                          <div className="ml-9 mt-2 space-y-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Campaign objective</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                              <span className="text-xs text-gray-500">Budget & schedule</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          campaignStep === 'adset' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={() => setCampaignStep('adset')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            campaignStep === 'adset' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}>
                            2
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Choose your audience and budget
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Audience, placements, optimization
                            </p>
                          </div>
                        </div>
                        
                        {campaignStep === 'adset' && (
                          <div className="ml-9 mt-2 space-y-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Audience</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                              <span className="text-xs text-gray-500">Placements</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                              <span className="text-xs text-gray-500">Budget & schedule</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          campaignStep === 'ads' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={() => setCampaignStep('ads')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            campaignStep === 'ads' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}>
                            3
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Create your ads
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Build the content for your ads
                            </p>
                          </div>
                        </div>
                        
                        {campaignStep === 'ads' && (
                          <div className="ml-9 mt-2 space-y-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Ad creative</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                              <span className="text-xs text-gray-500">Ad copy & CTA</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          campaignStep === 'preview' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={() => setCampaignStep('preview')}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            campaignStep === 'preview' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}>
                            4
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Publish campaign
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Review and publish your ads
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save Draft Button */}
                    <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <Button variant="outline" size="sm" className="w-full rounded-lg">
                        Save as draft
                      </Button>
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6">
                      {/* Campaign Content */}
                      {campaignStep === "campaign" && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              Set your campaign objective
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                              Choose who you want to see your ad on Facebook, then set your budget and when you want your campaign to run.
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="campaign-name" className="text-sm font-medium">Campaign Name</Label>
                              <Input 
                                id="campaign-name"
                                placeholder="e.g., Summer Product Launch 2024"
                                value={campaignData.campaign.name}
                                onChange={(e) => setCampaignData(prev => ({
                                  ...prev,
                                  campaign: { ...prev.campaign, name: e.target.value }
                                }))}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="campaign-objective" className="text-sm font-medium">Campaign Objective</Label>
                              <Select 
                                value={campaignData.campaign.objective}
                                onValueChange={(value) => setCampaignData(prev => ({
                                  ...prev,
                                  campaign: { ...prev.campaign, objective: value }
                                }))}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Choose your campaign objective" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                                  <SelectItem value="traffic">Traffic</SelectItem>
                                  <SelectItem value="engagement">Engagement</SelectItem>
                                  <SelectItem value="leads">Lead Generation</SelectItem>
                                  <SelectItem value="conversions">Conversions</SelectItem>
                                  <SelectItem value="sales">Catalog Sales</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="budget-type" className="text-sm font-medium">Budget Type</Label>
                                <Select 
                                  value={campaignData.campaign.budgetType}
                                  onValueChange={(value) => setCampaignData(prev => ({
                                    ...prev,
                                    campaign: { ...prev.campaign, budgetType: value }
                                  }))}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="daily">Daily Budget</SelectItem>
                                    <SelectItem value="lifetime">Lifetime Budget</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="campaign-budget" className="text-sm font-medium">Budget Amount ($)</Label>
                                <Input 
                                  id="campaign-budget"
                                  type="number"
                                  placeholder="100"
                                  value={campaignData.campaign.budget}
                                  onChange={(e) => setCampaignData(prev => ({
                                    ...prev,
                                    campaign: { ...prev.campaign, budget: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      
                      {/* Ad Set Content */}
                      {campaignStep === "adset" && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              Choose your audience and budget
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                              Your audience is the group of people who will potentially see your ad. Use our default audience settings or an audience you created on Facebook.
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="adset-name">Ad Set Name</Label>
                              <Input 
                                id="adset-name"
                                placeholder="e.g., Young Adults - Interests"
                                value={campaignData.adSet.name}
                                onChange={(e) => setCampaignData(prev => ({
                                  ...prev,
                                  adSet: { ...prev.adSet, name: e.target.value }
                                }))}
                                className="mt-1"
                              />
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <Label className="text-base font-medium flex items-center mb-3">
                                <MapPin className="h-4 w-4 mr-2" />
                                Audience Targeting
                              </Label>
                              
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="location">Location</Label>
                                  <Input 
                                    id="location"
                                    placeholder="United States, Canada, etc."
                                    className="mt-1"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label htmlFor="age-min">Min Age</Label>
                                    <Select defaultValue="18">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {[...Array(48)].map((_, i) => (
                                          <SelectItem key={i + 18} value={String(i + 18)}>
                                            {i + 18}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="age-max">Max Age</Label>
                                    <Select defaultValue="65">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {[...Array(48)].map((_, i) => (
                                          <SelectItem key={i + 18} value={String(i + 18)}>
                                            {i + 18}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select defaultValue="all">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="all">All Genders</SelectItem>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label htmlFor="interests">Interests & Behaviors</Label>
                                  <Input 
                                    id="interests"
                                    placeholder="Social media marketing, E-commerce, Technology..."
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <Label className="text-base font-medium flex items-center mb-3">
                                <Smartphone className="h-4 w-4 mr-2" />
                                Placements
                              </Label>
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { id: "facebook-feed", label: "Facebook Feed", icon: Facebook },
                                  { id: "instagram-feed", label: "Instagram Feed", icon: Instagram },
                                  { id: "instagram-stories", label: "Instagram Stories", icon: Instagram },
                                  { id: "facebook-stories", label: "Facebook Stories", icon: Facebook },
                                  { id: "messenger", label: "Messenger", icon: Facebook },
                                  { id: "audience-network", label: "Audience Network", icon: Globe }
                                ].map((placement) => (
                                  <div key={placement.id} className="flex items-center space-x-2">
                                    <Checkbox id={placement.id} />
                                    <Label htmlFor={placement.id} className="flex items-center space-x-2 cursor-pointer">
                                      <placement.icon className="h-4 w-4" />
                                      <span className="text-sm">{placement.label}</span>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="adset-budget">Ad Set Budget ($)</Label>
                                <Input 
                                  id="adset-budget"
                                  type="number"
                                  placeholder="50"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="schedule">Schedule</Label>
                                <Select defaultValue="continuous">
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="continuous">Run Continuously</SelectItem>
                                    <SelectItem value="schedule">Set Schedule</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Ads & Creative Content */}
                      {campaignStep === "ads" && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              Create your ads
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                              Build the content for your ads. Your ad creative and copy will be shown to your audience.
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <Label className="text-base font-medium flex items-center">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Ad Creative
                              </Label>
                              <Button size="sm" variant="outline" className="rounded-lg">
                                <Plus className="h-3 w-3 mr-1" />
                                Add Creative
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 transition-colors cursor-pointer"
                              >
                                <div className="text-center space-y-2">
                                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Upload Image</p>
                                    <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                                  </div>
                                </div>
                              </motion.div>
                              
                              <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-500 transition-colors cursor-pointer"
                              >
                                <div className="text-center space-y-2">
                                  <Video className="h-8 w-8 text-gray-400 mx-auto" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Upload Video</p>
                                    <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
                                  </div>
                                </div>
                              </motion.div>
                              
                              <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-green-500 transition-colors cursor-pointer"
                              >
                                <div className="text-center space-y-2">
                                  <Type className="h-8 w-8 text-gray-400 mx-auto" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Text Only</p>
                                    <p className="text-xs text-gray-500">Create text-based ad</p>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-4">
                              <Label className="text-base font-medium">Ad Copy</Label>
                              
                              <div>
                                <Label htmlFor="headline" className="text-sm font-medium">Primary Headline</Label>
                                <Input 
                                  id="headline"
                                  placeholder="Grab attention with a compelling headline"
                                  className="mt-1"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                <Textarea 
                                  id="description"
                                  placeholder="Describe your product or service in detail..."
                                  className="mt-1 min-h-[80px] resize-none"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="cta-button" className="text-sm font-medium">Call-to-Action</Label>
                                  <Select>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Choose CTA" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="learn-more">Learn More</SelectItem>
                                      <SelectItem value="shop-now">Shop Now</SelectItem>
                                      <SelectItem value="sign-up">Sign Up</SelectItem>
                                      <SelectItem value="download">Download</SelectItem>
                                      <SelectItem value="contact-us">Contact Us</SelectItem>
                                      <SelectItem value="get-quote">Get Quote</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label htmlFor="website-url" className="text-sm font-medium">Website URL</Label>
                                  <Input 
                                    id="website-url"
                                    type="url"
                                    placeholder="https://yourwebsite.com"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Preview Content */}
                      {campaignStep === "preview" && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              Publish campaign
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                              Review your campaign details and publish your ads to start reaching your audience.
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <Label className="text-base font-medium flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                Ad Preview
                              </Label>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                                  onClick={() => setPreviewMode('mobile')}
                                  className="rounded-lg"
                                >
                                  <Smartphone className="h-3 w-3 mr-1" />
                                  Mobile
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                                  onClick={() => setPreviewMode('desktop')}
                                  className="rounded-lg"
                                >
                                  <Monitor className="h-3 w-3 mr-1" />
                                  Desktop
                                </Button>
                              </div>
                            </div>
                            
                            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                              <div className={`${previewMode === 'mobile' ? 'w-80' : 'w-96'} bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 space-y-3`}>
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">YB</span>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Your Business</p>
                                    <p className="text-xs text-gray-500">Sponsored</p>
                                  </div>
                                </div>
                                
                                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="h-12 w-12 text-gray-400" />
                                </div>
                                
                                <div className="space-y-2">
                                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                    {campaignData.campaign.name || "Your compelling headline will appear here"}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Your ad description will be displayed here with engaging content that drives action.
                                  </p>
                                </div>
                                
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                  Learn More
                                </Button>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <Heart className="h-3 w-3" />
                                      <span>Like</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MessageCircle className="h-3 w-3" />
                                      <span>Comment</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Share2 className="h-3 w-3" />
                                      <span>Share</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                              <div className="flex items-start space-x-3">
                                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1">
                                    Campaign Summary
                                  </p>
                                  <div className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                                    <p><strong>Campaign:</strong> {campaignData.campaign.name || "Untitled Campaign"}</p>
                                    <p><strong>Objective:</strong> {campaignData.campaign.objective || "Not selected"}</p>
                                    <p><strong>Budget:</strong> ${campaignData.campaign.budget || "0"} {campaignData.campaign.budgetType}</p>
                                    <p><strong>Ad Set:</strong> {campaignData.adSet.name || "Untitled Ad Set"}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={campaignStep === "campaign"}
                        onClick={() => {
                          const steps = ["campaign", "adset", "ads", "preview"];
                          const currentIndex = steps.indexOf(campaignStep);
                          if (currentIndex > 0) setCampaignStep(steps[currentIndex - 1]);
                        }}
                        className="rounded-lg"
                      >
                        Back
                      </Button>
                      
                      {campaignStep !== "preview" ? (
                        <Button 
                          size="sm"
                          onClick={() => {
                            const steps = ["campaign", "adset", "ads", "preview"];
                            const currentIndex = steps.indexOf(campaignStep);
                            if (currentIndex < steps.length - 1) setCampaignStep(steps[currentIndex + 1]);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
                        >
                          Next: {campaignStep === "campaign" ? "Choose audience" : campaignStep === "adset" ? "Create ads" : "Review & publish"}
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6"
                          onClick={() => {
                            setIsCreatingCampaign(false);
                            setCampaignStep("campaign");
                          }}
                        >
                          Publish
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </motion.div>

        {/* Account Selection Dropdowns */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Account Selection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select your Facebook account and ads account to manage campaigns
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <Facebook className="h-3 w-3 mr-1" />
              Facebook Ads
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facebook Account Dropdown */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Facebook Account
              </Label>
              <Select value={selectedFacebookAccount} onValueChange={setSelectedFacebookAccount}>
                <SelectTrigger className="bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50">
                  <SelectValue placeholder="Select Facebook account..." />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                  {facebookAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex items-center space-x-3">
                        <img
                          src={account.profileImage}
                          alt={account.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{account.name}</span>
                          {account.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ads Account Dropdown */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ads Account
              </Label>
              <Select 
                value={selectedAdsAccount} 
                onValueChange={setSelectedAdsAccount}
                disabled={!selectedFacebookAccount}
              >
                <SelectTrigger 
                  className={`bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50 ${
                    !selectedFacebookAccount ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <SelectValue 
                    placeholder={selectedFacebookAccount ? "Select ads account..." : "Select Facebook account first"} 
                  />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                  {availableAdsAccounts.map((adsAccount) => (
                    <SelectItem key={adsAccount.id} value={adsAccount.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">{adsAccount.name}</span>
                          <span className="text-xs text-gray-500">ID: {adsAccount.accountId}</span>
                        </div>
                        <Badge className={`text-xs ml-2 ${
                          adsAccount.status === 'active' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {adsAccount.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Selected Account Summary */}
          {selectedFacebookAccount && selectedAdsAccount && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Facebook className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {facebookAccounts.find(acc => acc.id === selectedFacebookAccount)?.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {availableAdsAccounts.find(acc => acc.id === selectedAdsAccount)?.name}
                    </p>
                  </div>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Campaign List */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {filteredCampaigns.map((campaign, index) => {
              const StatusIcon = getStatusIcon(campaign.status);
              
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500`}>
                            <Target className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                              {campaign.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {campaign.startDate} - {campaign.endDate}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(campaign.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {campaign.status}
                          </Badge>
                          
                          <div className="flex items-center space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={() => toggleCampaignExpansion(campaign.id)}
                              title={expandedCampaigns.includes(campaign.id) ? "Hide ad sets" : "Show ad sets"}
                            >
                              {expandedCampaigns.includes(campaign.id) ? 
                                <ChevronUp className="h-4 w-4" /> : 
                                <ChevronDown className="h-4 w-4" />
                              }
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Budget & Progress */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget Progress</span>
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={(campaign.spent / campaign.budget) * 100} className="h-3" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}% spent</span>
                            <span>${(campaign.budget - campaign.spent).toLocaleString()} remaining</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Campaign Progress</span>
                            <span className="text-sm text-gray-900 dark:text-gray-100">{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} className="h-3" />
                          <div className="text-xs text-gray-500">
                            {campaign.status === 'completed' ? 'Campaign completed' : `${100 - campaign.progress}% remaining`}
                          </div>
                        </div>
                      </div>

                      {/* Platforms */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Platforms</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {campaign.platforms.map((platform, platformIndex) => (
                            <motion.div
                              key={platform.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + platformIndex * 0.05 }}
                              className="p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color}`}>
                                  <platform.icon className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{platform.name}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                    <span>${platform.spent}</span>
                                    <span>${platform.budget}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Multi-Level Performance Metrics */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Performance Metrics</h4>
                          
                          {/* Metrics Level Tabs */}
                          <div className="flex bg-gray-100/60 dark:bg-gray-700/60 p-1 rounded-lg">
                            {["campaign", "adset", "ads"].map((level) => (
                              <button
                                key={level}
                                onClick={() => setSelectedMetricsLevel(level)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                                  selectedMetricsLevel === level
                                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                                }`}
                              >
                                {level === "campaign" ? "Campaign" : level === "adset" ? "Ad Set" : "Ads"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Campaign Level Metrics */}
                        {selectedMetricsLevel === "campaign" && (
                          <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
                              <div className="text-center p-2 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg min-w-[90px]">
                                <Eye className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.reach}</p>
                                <p className="text-xs text-gray-500">Reach</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg min-w-[90px]">
                                <TrendingUp className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.impressions}</p>
                                <p className="text-xs text-gray-500">Impressions</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg min-w-[90px]">
                                <Heart className="h-4 w-4 text-green-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.engagement}</p>
                                <p className="text-xs text-gray-500">Engagement</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-orange-50/60 to-red-50/60 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg min-w-[90px]">
                                <Share2 className="h-4 w-4 text-orange-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.clicks}</p>
                                <p className="text-xs text-gray-500">Clicks</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-yellow-50/60 to-orange-50/60 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg min-w-[90px]">
                                <DollarSign className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.conversions}</p>
                                <p className="text-xs text-gray-500">Conversions</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg min-w-[90px]">
                                <MousePointer className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.ctr}</p>
                                <p className="text-xs text-gray-500">CTR</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-rose-50/60 to-pink-50/60 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg min-w-[90px]">
                                <CreditCard className="h-4 w-4 text-rose-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.cpc}</p>
                                <p className="text-xs text-gray-500">CPC</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-teal-50/60 to-cyan-50/60 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-lg min-w-[90px]">
                                <BarChart3 className="h-4 w-4 text-teal-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.cpm}</p>
                                <p className="text-xs text-gray-500">CPM</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-emerald-50/60 to-green-50/60 dark:from-emerald-950/30 dark:to-green-950/30 rounded-lg min-w-[90px]">
                                <TrendingUp className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.roas}</p>
                                <p className="text-xs text-gray-500">ROAS</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-violet-50/60 to-purple-50/60 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg min-w-[90px]">
                                <Video className="h-4 w-4 text-violet-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.videoViews}</p>
                                <p className="text-xs text-gray-500">Video Views</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-amber-50/60 to-yellow-50/60 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg min-w-[90px]">
                                <Heart className="h-4 w-4 text-amber-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.saves}</p>
                                <p className="text-xs text-gray-500">Saves</p>
                              </div>
                              <div className="text-center p-2 bg-gradient-to-r from-sky-50/60 to-blue-50/60 dark:from-sky-950/30 dark:to-blue-950/30 rounded-lg min-w-[90px]">
                                <Share2 className="h-4 w-4 text-sky-600 mx-auto mb-1" />
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{campaign.metrics.shares}</p>
                                <p className="text-xs text-gray-500">Shares</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Ad Set Level Metrics */}
                        {selectedMetricsLevel === "adset" && (
                          <div className="space-y-4">
                            {campaign.adSets.map((adSet, adSetIndex) => (
                              <div key={adSet.id} className="p-3 bg-gradient-to-r from-gray-50/40 to-white/40 dark:from-gray-700/40 dark:to-gray-800/40 rounded-lg border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">{adSet.name}</h5>
                                  <Badge variant="outline" className={`text-xs ${
                                    adSet.status === 'active' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700' :
                                    adSet.status === 'paused' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' :
                                    'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700'
                                  }`}>
                                    {adSet.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                  <div className="text-center p-2 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg">
                                    <TrendingUp className="h-3 w-3 text-blue-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{adSet.impressions}</p>
                                    <p className="text-xs text-gray-500">Impressions</p>
                                  </div>
                                  <div className="text-center p-2 bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg">
                                    <Share2 className="h-3 w-3 text-green-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{adSet.clicks}</p>
                                    <p className="text-xs text-gray-500">Clicks</p>
                                  </div>
                                  <div className="text-center p-2 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg">
                                    <MousePointer className="h-3 w-3 text-purple-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{adSet.ctr}</p>
                                    <p className="text-xs text-gray-500">CTR</p>
                                  </div>
                                  <div className="text-center p-2 bg-gradient-to-r from-orange-50/60 to-red-50/60 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg">
                                    <CreditCard className="h-3 w-3 text-orange-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{adSet.cpc}</p>
                                    <p className="text-xs text-gray-500">CPC</p>
                                  </div>
                                  <div className="text-center p-2 bg-gradient-to-r from-yellow-50/60 to-orange-50/60 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg">
                                    <DollarSign className="h-3 w-3 text-yellow-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">${adSet.spent}</p>
                                    <p className="text-xs text-gray-500">Spent</p>
                                  </div>
                                  <div className="text-center p-2 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg">
                                    <BarChart3 className="h-3 w-3 text-indigo-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{adSet.conversions || '0'}</p>
                                    <p className="text-xs text-gray-500">Conversions</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Ads Level Metrics */}
                        {selectedMetricsLevel === "ads" && (
                          <div className="space-y-4">
                            {campaign.adSets.map((adSet) => 
                              adSet.ads.map((ad, adIndex) => (
                                <div key={ad.id} className="p-3 bg-gradient-to-r from-gray-50/40 to-white/40 dark:from-gray-700/40 dark:to-gray-800/40 rounded-lg border border-white/20">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                      <img 
                                        src={ad.creative} 
                                        alt={ad.name}
                                        className="w-10 h-10 rounded-lg object-cover"
                                      />
                                      <div>
                                        <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">{ad.name}</h5>
                                        <p className="text-xs text-gray-500">Ad Set: {adSet.name}</p>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className={`text-xs ${
                                      ad.status === 'active' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700' :
                                      ad.status === 'paused' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' :
                                      'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700'
                                    }`}>
                                      {ad.status}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                    <div className="text-center p-2 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg">
                                      <TrendingUp className="h-3 w-3 text-blue-600 mx-auto mb-1" />
                                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{ad.impressions}</p>
                                      <p className="text-xs text-gray-500">Impressions</p>
                                    </div>
                                    <div className="text-center p-2 bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg">
                                      <Share2 className="h-3 w-3 text-green-600 mx-auto mb-1" />
                                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{ad.clicks}</p>
                                      <p className="text-xs text-gray-500">Clicks</p>
                                    </div>
                                    <div className="text-center p-2 bg-gradient-to-r from-purple-50/60 to-pink-50/60 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg">
                                      <MousePointer className="h-3 w-3 text-purple-600 mx-auto mb-1" />
                                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{ad.ctr}</p>
                                      <p className="text-xs text-gray-500">CTR</p>
                                    </div>
                                    <div className="text-center p-2 bg-gradient-to-r from-orange-50/60 to-red-50/60 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg">
                                      <CreditCard className="h-3 w-3 text-orange-600 mx-auto mb-1" />
                                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">${ad.cpc || '0.00'}</p>
                                      <p className="text-xs text-gray-500">CPC</p>
                                    </div>
                                    <div className="text-center p-2 bg-gradient-to-r from-yellow-50/60 to-orange-50/60 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg">
                                      <DollarSign className="h-3 w-3 text-yellow-600 mx-auto mb-1" />
                                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">${ad.spent}</p>
                                      <p className="text-xs text-gray-500">Spent</p>
                                    </div>
                                    <div className="text-center p-2 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg">
                                      <BarChart3 className="h-3 w-3 text-indigo-600 mx-auto mb-1" />
                                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{ad.conversions || '0'}</p>
                                      <p className="text-xs text-gray-500">Conversions</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>

                      {/* Ads & Ad Sets - Expanded View */}
                      {expandedCampaigns.includes(campaign.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6 mt-6"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Ad Sets & Ads</h4>
                              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                <Layers className="h-3 w-3 mr-1" />
                                {campaign.adSets?.length || 0} Ad Sets
                              </Badge>
                            </div>

                            {/* Ad Sets */}
                            <div className="space-y-3">
                              {campaign.adSets?.map((adSet, adSetIndex) => {
                                const PlatformIcon = adSet.platform === 'Instagram' ? Instagram :
                                                    adSet.platform === 'Facebook' ? Facebook :
                                                    adSet.platform === 'Twitter' ? Twitter :
                                                    adSet.platform === 'LinkedIn' ? Linkedin : Globe;
                                
                                return (
                                  <motion.div
                                    key={adSet.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: adSetIndex * 0.05 }}
                                    className="bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-white/20 p-4"
                                  >
                                    {/* Ad Set Header */}
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                                          <PlatformIcon className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2">
                                            <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                              {adSet.name}
                                            </h5>
                                            <Button 
                                              size="sm" 
                                              variant="ghost" 
                                              className="h-6 w-6 p-0"
                                              onClick={() => toggleAdSetExpansion(adSet.id)}
                                              title={expandedAdSets.includes(adSet.id) ? "Hide ads" : "Show ads"}
                                            >
                                              {expandedAdSets.includes(adSet.id) ? 
                                                <ChevronUp className="h-3 w-3" /> : 
                                                <ChevronDown className="h-3 w-3" />
                                              }
                                            </Button>
                                          </div>
                                          <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {adSet.audience}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <div className="text-right">
                                        <Badge className={getStatusColor(adSet.status)}>
                                          {adSet.status}
                                        </Badge>
                                        <p className="text-xs text-gray-500 mt-1">
                                          ${adSet.spent} / ${adSet.budget}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Ads in this Ad Set - Only show when expanded */}
                                    {expandedAdSets.includes(adSet.id) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-2 border-t border-gray-200/50 dark:border-gray-700/50 pt-3 mt-3"
                                      >
                                        <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                                          <FileText className="h-3 w-3 mr-1" />
                                          Individual Ads ({adSet.ads?.length || 0})
                                        </h6>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                          {adSet.ads?.map((ad, adIndex) => {
                                            const AdIcon = getAdTypeIcon(ad.type);
                                            
                                            return (
                                              <motion.div
                                                key={ad.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 + adIndex * 0.02 }}
                                                className="bg-white/60 dark:bg-gray-800/60 rounded-lg border border-white/30 p-3 hover:shadow-md transition-all duration-200"
                                              >
                                                <div className="flex items-start space-x-2">
                                                  {ad.creative ? (
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                                      <img
                                                        src={ad.creative}
                                                        alt={ad.name}
                                                        className="w-full h-full object-cover"
                                                      />
                                                    </div>
                                                  ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center flex-shrink-0">
                                                      <AdIcon className="h-4 w-4 text-white" />
                                                    </div>
                                                  )}
                                                  
                                                  <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                                                        {ad.name}
                                                      </p>
                                                      <Badge variant="outline" className="text-xs ml-1">
                                                        {ad.type}
                                                      </Badge>
                                                    </div>
                                                    
                                                    <div className="mt-1 space-y-0.5">
                                                      <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">Spent:</span>
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                                          ${ad.spent}
                                                        </span>
                                                      </div>
                                                      
                                                      <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">CTR:</span>
                                                        <span className={`font-medium ${
                                                          parseFloat(ad.ctr) > 2.5 ? 'text-green-600 dark:text-green-400' :
                                                          parseFloat(ad.ctr) > 2.0 ? 'text-blue-600 dark:text-blue-400' :
                                                          'text-gray-700 dark:text-gray-300'
                                                        }`}>
                                                          {ad.ctr}
                                                        </span>
                                                      </div>
                                                      
                                                      <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">Impressions:</span>
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                                          {ad.impressions}
                                                        </span>
                                                      </div>
                                                      
                                                      <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">Clicks:</span>
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                                          {ad.clicks}
                                                        </span>
                                                      </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-1 mt-2">
                                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-xs">
                                                        <Edit className="h-3 w-3" />
                                                      </Button>
                                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-xs">
                                                        <Copy className="h-3 w-3" />
                                                      </Button>
                                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-xs">
                                                        {ad.status === 'active' ? 
                                                          <Pause className="h-3 w-3" /> : 
                                                          <Play className="h-3 w-3" />
                                                        }
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </motion.div>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Ads Account Details */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Ads Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentAdAccountDetails ? (
                  <>
                    {/* Account ID and Basic Info */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between text-sm">
                        <div className="space-y-1">
                          <span className="text-gray-500 dark:text-gray-400">ID:</span>
                          <p className="text-gray-900 dark:text-gray-100 font-mono">{currentAdAccountDetails.accountId}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="text-gray-500 dark:text-gray-400">TimeZone:</span>
                          <p className="text-gray-900 dark:text-gray-100">{currentAdAccountDetails.details.timezone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Currency:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-semibold">{currentAdAccountDetails.details.currency}</span>
                      </div>
                    </div>

                    <Separator className="bg-gray-200/50 dark:bg-gray-600/50" />

                    {/* Spending Information */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-700 dark:text-gray-300">This Ad Account has spent a total of</span>
                          <span className="text-xs text-gray-500">{currentAdAccountDetails.details.spendPercentage}%</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {currentAdAccountDetails.details.currency}${currentAdAccountDetails.details.totalSpent}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {currentAdAccountDetails.details.spendingLimit 
                            ? `Spending limit: ${currentAdAccountDetails.details.currency}$${currentAdAccountDetails.details.spendingLimit}`
                            : "No spending limit is set"
                          }
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Balance:</span>
                          <span className={`text-sm font-bold ${
                            currentAdAccountDetails.details.balanceStatus === 'good' ? 'text-green-600 dark:text-green-400' :
                            currentAdAccountDetails.details.balanceStatus === 'moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                            currentAdAccountDetails.details.balanceStatus === 'low' ? 'text-orange-600 dark:text-orange-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {currentAdAccountDetails.details.currency}${currentAdAccountDetails.details.balance}
                          </span>
                          {currentAdAccountDetails.details.balanceStatus !== 'good' && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                currentAdAccountDetails.details.balanceStatus === 'moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' :
                                currentAdAccountDetails.details.balanceStatus === 'low' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700' :
                                'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700'
                              }`}
                            >
                              {currentAdAccountDetails.details.balanceStatus === 'critical' ? 'Critical Balance' : 
                               currentAdAccountDetails.details.balanceStatus === 'low' ? 'Low Balance' : 'Moderate Balance'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-200/50 dark:bg-gray-600/50" />

                    {/* Account Status and Actions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Account Status</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            currentAdAccountDetails.status === 'active' 
                              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700'
                          }`}
                        >
                          {currentAdAccountDetails.status === 'active' ? 'Active' : 'Limited'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Daily Spend Limit</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {currentAdAccountDetails.details.dailySpendLimit 
                            ? `${currentAdAccountDetails.details.currency}$${currentAdAccountDetails.details.dailySpendLimit}`
                            : "Not Set"
                          }
                        </span>
                      </div>

                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="space-y-3">
                      <CreditCard className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
                      <div>
                        <p className="text-sm font-medium">No Ad Account Selected</p>
                        <p className="text-xs mt-1">
                          Select a Facebook account and ads account to view details
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}