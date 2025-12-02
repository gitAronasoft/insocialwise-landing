import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  Target, 
  Users, 
  Eye, 
  Heart,
  Share2,
  MessageCircle,
  TrendingUp,
  Settings
} from "lucide-react";

const reportTemplates = [
  {
    name: "Weekly Performance Report",
    description: "Comprehensive weekly analytics with key metrics and trends",
    metrics: ["Reach", "Engagement", "Followers", "Post Performance"],
    platforms: ["Instagram", "Twitter", "LinkedIn", "Facebook"],
    frequency: "Weekly",
    popular: true
  },
  {
    name: "Monthly Growth Summary",
    description: "Monthly growth analysis with detailed insights and recommendations",
    metrics: ["Growth Rate", "Audience Demographics", "Top Content", "Competitor Analysis"],
    platforms: ["All Platforms"],
    frequency: "Monthly",
    popular: true
  },
  {
    name: "Campaign Performance Report",
    description: "Detailed campaign analysis with ROI and conversion metrics",
    metrics: ["Campaign Reach", "Conversion Rate", "Cost Analysis", "Audience Response"],
    platforms: ["Custom Selection"],
    frequency: "On-demand",
    popular: false
  },
  {
    name: "Competitor Benchmarking",
    description: "Compare your performance against industry competitors",
    metrics: ["Market Share", "Engagement Comparison", "Content Strategy", "Growth Rate"],
    platforms: ["Instagram", "Twitter", "LinkedIn"],
    frequency: "Monthly",
    popular: false
  }
];

const availableMetrics = [
  { id: "reach", label: "Total Reach", icon: Eye, description: "Total number of unique accounts reached" },
  { id: "engagement", label: "Engagement Rate", icon: Heart, description: "Average engagement rate across posts" },
  { id: "followers", label: "Follower Growth", icon: Users, description: "New followers gained over period" },
  { id: "shares", label: "Content Shares", icon: Share2, description: "Total shares and reposts" },
  { id: "comments", label: "Comments", icon: MessageCircle, description: "Total comments received" },
  { id: "trends", label: "Trending Content", icon: TrendingUp, description: "Top performing content analysis" }
];

const savedReports = [
  {
    name: "Q1 Performance Review",
    type: "Monthly Growth Summary",
    generated: "2 days ago",
    status: "Ready",
    size: "2.4 MB"
  },
  {
    name: "March Campaign Analysis",
    type: "Campaign Performance Report", 
    generated: "1 week ago",
    status: "Ready",
    size: "1.8 MB"
  },
  {
    name: "Weekly Report - Week 12",
    type: "Weekly Performance Report",
    generated: "3 days ago", 
    status: "Processing",
    size: "- MB"
  }
];

export default function ReportsGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("30d");

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
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
              Reports Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create custom analytics reports with your data
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Report Builder */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Template Selection */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Choose Report Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template, index) => (
                  <motion.div
                    key={template.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.name
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-300 dark:border-blue-600'
                        : 'bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 border-white/20 hover:border-blue-200 dark:hover:border-blue-700'
                    }`}
                    onClick={() => setSelectedTemplate(template.name)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{template.name}</h4>
                          {template.popular && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {template.metrics.slice(0, 3).map((metric, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                          {template.metrics.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.metrics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
                          {template.frequency}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Custom Metrics Selection */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Select Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 border border-white/10"
                    >
                      <Checkbox 
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                          <metric.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{metric.label}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{metric.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date Range & Platforms */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Report Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Range
                    </label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                        <SelectItem value="6m">Last 6 months</SelectItem>
                        <SelectItem value="1y">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Export Format
                    </label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="powerpoint">PowerPoint Slides</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Saved Reports */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 h-fit">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Saved Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedReports.map((report, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-3 bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-white/10"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{report.name}</h5>
                        <Badge className={`text-xs ${
                          report.status === 'Ready' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{report.type}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{report.generated}</span>
                        <span>{report.size}</span>
                      </div>
                      {report.status === 'Ready' && (
                        <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}