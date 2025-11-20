import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database,
  Plus,
  Save,
  Trash2,
  Link,
  BookOpen,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Edit3,
  Search,
  FileText,
  MessageCircle,
  ChevronRight,
  Check
} from "lucide-react";

interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  platforms: string[];
  tags: string[];
  createdAt: string;
}

interface Platform {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  pages: string[];
}

export default function KnowledgeBase() {
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeBaseEntry[]>([
    {
      id: "1",
      title: "General Company Information",
      content: "We are a leading social media management platform that helps businesses grow their online presence...",
      category: "General",
      platforms: ["all"],
      tags: ["company", "about"],
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      title: "Pricing Information",
      content: "Our pricing plans start at $29/month for the Basic plan, $79/month for Pro, and $199/month for Enterprise...",
      category: "Pricing",
      platforms: ["facebook", "instagram"],
      tags: ["pricing", "plans"],
      createdAt: "2024-01-16"
    }
  ]);

  const [platforms] = useState<Platform[]>([
    { 
      id: "facebook", 
      name: "Facebook", 
      icon: Facebook, 
      connected: true, 
      pages: ["InSocialWise - Main Page", "Customer Support Hub", "InSocialWise Events"] 
    },
    { 
      id: "instagram", 
      name: "Instagram", 
      icon: Instagram, 
      connected: true, 
      pages: ["@insocialwise", "@insocialwise_tips", "@insocialwise_updates"] 
    },
    { 
      id: "twitter", 
      name: "Twitter", 
      icon: Twitter, 
      connected: false, 
      pages: [] 
    },
    { 
      id: "linkedin", 
      name: "LinkedIn", 
      icon: Linkedin, 
      connected: true, 
      pages: ["InSocialWise Company Page", "InSocialWise Careers"] 
    },
    { 
      id: "youtube", 
      name: "YouTube", 
      icon: Youtube, 
      connected: false, 
      pages: [] 
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    category: "General",
    platforms: [] as string[],
    selectedPages: {} as Record<string, string[]>, // platformId -> array of selected pages
    tags: ""
  });

  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState({
    title: "",
    content: "",
    category: "General",
    platforms: [] as string[],
    selectedPages: {} as Record<string, string[]>,
    tags: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "General", "Pricing", "Support", "Features", "Technical"];

  const filteredEntries = knowledgeEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addKnowledgeEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: KnowledgeBaseEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      category: newEntry.category,
      platforms: newEntry.platforms,
      tags: newEntry.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setKnowledgeEntries(prev => [...prev, entry]);
    setNewEntry({ title: "", content: "", category: "General", platforms: [], selectedPages: {}, tags: "" });
  };

  const deleteEntry = (id: string) => {
    setKnowledgeEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const startEditing = (entry: KnowledgeBaseEntry) => {
    setEditingEntry(entry.id);
    setEditEntry({
      title: entry.title,
      content: entry.content,
      category: entry.category,
      platforms: [...entry.platforms],
      selectedPages: {}, // This would need to be reconstructed from platforms if needed
      tags: entry.tags.join(", ")
    });
  };

  const saveEditedEntry = () => {
    if (!editingEntry || !editEntry.title || !editEntry.content) return;

    setKnowledgeEntries(prev => prev.map(entry => 
      entry.id === editingEntry 
        ? {
            ...entry,
            title: editEntry.title,
            content: editEntry.content,
            category: editEntry.category,
            platforms: editEntry.platforms,
            tags: editEntry.tags.split(",").map(tag => tag.trim()).filter(Boolean)
          }
        : entry
    ));

    setEditingEntry(null);
    setEditEntry({
      title: "",
      content: "",
      category: "General",
      platforms: [],
      selectedPages: {},
      tags: ""
    });
  };

  const cancelEditing = () => {
    setEditingEntry(null);
    setEditEntry({
      title: "",
      content: "",
      category: "General",
      platforms: [],
      selectedPages: {},
      tags: ""
    });
  };

  const togglePlatform = (platformId: string) => {
    setNewEntry(prev => {
      if (platformId === "all") {
        if (prev.platforms.includes("all")) {
          // Deselect all
          return { ...prev, platforms: [], selectedPages: {} };
        } else {
          // Select all platforms and all their pages
          const allConnectedPlatforms = platforms.filter(p => p.connected).map(p => p.id);
          const allPages: Record<string, string[]> = {};
          platforms.filter(p => p.connected).forEach(platform => {
            allPages[platform.id] = [...platform.pages];
          });
          return { 
            ...prev, 
            platforms: ["all"], 
            selectedPages: allPages 
          };
        }
      }
      
      const platformsWithoutAll = prev.platforms.filter(p => p !== "all");
      const isSelected = platformsWithoutAll.includes(platformId);
      
      if (isSelected) {
        // Deselect platform and remove its pages
        const newSelectedPages = { ...prev.selectedPages };
        delete newSelectedPages[platformId];
        return {
          ...prev,
          platforms: platformsWithoutAll.filter(p => p !== platformId),
          selectedPages: newSelectedPages
        };
      } else {
        // Select platform but no pages initially
        return {
          ...prev,
          platforms: [...platformsWithoutAll, platformId],
          selectedPages: { ...prev.selectedPages, [platformId]: [] }
        };
      }
    });
  };

  const togglePage = (platformId: string, pageName: string) => {
    setNewEntry(prev => {
      const currentPages = prev.selectedPages[platformId] || [];
      const isPageSelected = currentPages.includes(pageName);
      
      const newSelectedPages = {
        ...prev.selectedPages,
        [platformId]: isPageSelected 
          ? currentPages.filter(p => p !== pageName)
          : [...currentPages, pageName]
      };
      
      return { ...prev, selectedPages: newSelectedPages };
    });
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <Database className="h-8 w-8 mr-3 text-blue-600" />
              Knowledge Base Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage knowledge base entries for automated responses by platform
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {knowledgeEntries.length} Entries
          </Badge>
        </motion.div>

        <Tabs defaultValue="entries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <TabsTrigger value="entries" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Entries
            </TabsTrigger>
            <TabsTrigger value="platforms" className="flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Connected Platforms
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add New Entry
            </TabsTrigger>
          </TabsList>

          {/* Knowledge Entries Tab */}
          <TabsContent value="entries">
            <div className="space-y-6">
              {/* Search and Filter */}
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Search & Filter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="search">Search Entries</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Search by title, content, or tags..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Filter by Category</Label>
                      <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Knowledge Entries List */}
              <div className="grid gap-4">
                {filteredEntries.length === 0 ? (
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                    <CardContent className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        No entries found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {searchTerm || selectedCategory !== "all" 
                          ? "Try adjusting your search or filter criteria"
                          : "Start by adding your first knowledge base entry"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
{editingEntry === entry.id ? (
                        // Edit Form
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-300 dark:border-blue-600">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-blue-600 dark:text-blue-400">Editing Entry</h3>
                              <div className="flex space-x-2">
                                <Button size="sm" onClick={saveEditedEntry} className="bg-green-600 hover:bg-green-700 text-white">
                                  <Save className="h-3 w-3 mr-1" />
                                  Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEditing}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <Label htmlFor="edit-title">Title</Label>
                              <Input
                                id="edit-title"
                                value={editEntry.title}
                                onChange={(e) => setEditEntry(prev => ({ ...prev, title: e.target.value }))}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="edit-category">Category</Label>
                              <select
                                id="edit-category"
                                value={editEntry.category}
                                onChange={(e) => setEditEntry(prev => ({ ...prev, category: e.target.value }))}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {categories.filter(cat => cat !== "all").map(category => (
                                  <option key={category} value={category}>{category}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <Label htmlFor="edit-content">Content</Label>
                              <Textarea
                                id="edit-content"
                                value={editEntry.content}
                                onChange={(e) => setEditEntry(prev => ({ ...prev, content: e.target.value }))}
                                className="mt-1"
                                rows={4}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                              <Input
                                id="edit-tags"
                                value={editEntry.tags}
                                onChange={(e) => setEditEntry(prev => ({ ...prev, tags: e.target.value }))}
                                className="mt-1"
                                placeholder="e.g., pricing, support, features"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        // Display Mode
                        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-gray-900 dark:text-gray-100 mb-2">
                                  {entry.title}
                                </CardTitle>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {entry.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    Created: {entry.createdAt}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => startEditing(entry)}
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => deleteEntry(entry.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                              {entry.content}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {entry.tags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Globe className="h-3 w-3 mr-1" />
                                {entry.platforms.includes("all") ? "All Platforms" : `${entry.platforms.length} Platform(s)`}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Connected Platforms Tab */}
          <TabsContent value="platforms">
            <div className="grid gap-4">
              {platforms.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {platform.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  className={platform.connected 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                                  }
                                >
                                  {platform.connected ? "Connected" : "Not Connected"}
                                </Badge>
                                {platform.connected && (
                                  <span className="text-xs text-gray-500">
                                    {platform.pages.length} page(s)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {platform.connected ? (
                              <Button size="sm" variant="outline" className="text-red-600">
                                Disconnect
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Connect
                              </Button>
                            )}
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        {platform.connected && platform.pages.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Connected Pages:</p>
                            <div className="flex flex-wrap gap-1">
                              {platform.pages.map(page => (
                                <Badge key={page} variant="outline" className="text-xs">
                                  {page}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Add New Entry Tab */}
          <TabsContent value="add">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Knowledge Base Entry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Entry Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Pricing Information"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={newEntry.category}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the knowledge base content that will be used for automated responses..."
                    rows={6}
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Target Platforms & Pages</Label>
                  <div className="space-y-4 mt-2">
                    {/* All Platforms Option */}
                    <Button
                      type="button"
                      variant={newEntry.platforms.includes("all") ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => togglePlatform("all")}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      All Platforms & Pages
                      {newEntry.platforms.includes("all") && (
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          All selected
                        </span>
                      )}
                    </Button>
                    
                    {/* Individual Platform Selection */}
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Or select specific platforms and pages:</p>
                      
                      {platforms.filter(p => p.connected).map(platform => {
                        const IconComponent = platform.icon;
                        const isPlatformSelected = newEntry.platforms.includes(platform.id);
                        const selectedPages = newEntry.selectedPages[platform.id] || [];
                        const allPagesSelected = selectedPages.length === platform.pages.length && platform.pages.length > 0;
                        
                        return (
                          <div key={platform.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                            {/* Platform Header */}
                            <div className="flex items-center justify-between">
                              <Button
                                type="button"
                                variant={isPlatformSelected ? "default" : "outline"}
                                size="sm"
                                className="flex-1 justify-start mr-3"
                                onClick={() => togglePlatform(platform.id)}
                              >
                                <IconComponent className="h-4 w-4 mr-2" />
                                {platform.name}
                                {isPlatformSelected && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    Platform selected
                                  </span>
                                )}
                              </Button>
                              
                              {isPlatformSelected && platform.pages.length > 0 && (
                                <Button
                                  type="button"
                                  variant={allPagesSelected ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => {
                                    // Toggle all pages for this platform
                                    const newPages = allPagesSelected ? [] : [...platform.pages];
                                    setNewEntry(prev => ({
                                      ...prev,
                                      selectedPages: { ...prev.selectedPages, [platform.id]: newPages }
                                    }));
                                  }}
                                >
                                  {allPagesSelected ? "Deselect All" : "Select All"} Pages
                                </Button>
                              )}
                            </div>
                            
                            {/* Page Selection (only show when platform is selected) */}
                            {isPlatformSelected && platform.pages.length > 0 && (
                              <div className="ml-6 space-y-2">
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                  Choose specific pages ({selectedPages.length}/{platform.pages.length} selected):
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                  {platform.pages.map(page => {
                                    const isPageSelected = selectedPages.includes(page);
                                    return (
                                      <div
                                        key={page}
                                        className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
                                          isPageSelected 
                                            ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20' 
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                                        }`}
                                        onClick={() => togglePage(platform.id, page)}
                                      >
                                        <div className="flex items-center">
                                          <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${
                                            isPageSelected ? 'bg-green-500' : 'bg-gray-300'
                                          }`}>
                                            {isPageSelected && <Check className="h-2 w-2 text-white" />}
                                          </div>
                                          <span className="text-sm">{page}</span>
                                        </div>
                                        
                                        {isPageSelected && (
                                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                            Auto-replies enabled
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                {selectedPages.length === 0 && (
                                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                                    ⚠️ Platform selected but no pages chosen. Knowledge won't be applied.
                                  </p>
                                )}
                              </div>
                            )}
                            
                            {/* No pages available */}
                            {platform.pages.length === 0 && (
                              <div className="ml-6 text-xs text-gray-400 dark:text-gray-500 italic">
                                No pages connected to this platform yet
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Unconnected platforms section */}
                    {platforms.filter(p => !p.connected).length > 0 && (
                      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Available to Connect:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {platforms.filter(p => !p.connected).map(platform => {
                            const IconComponent = platform.icon;
                            return (
                              <div key={platform.id} className="flex items-center text-xs text-gray-400">
                                <IconComponent className="h-3 w-3 mr-1" />
                                {platform.name}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Connect these platforms to include them in knowledge base targeting</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., pricing, plans, cost"
                    value={newEntry.tags}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setNewEntry({ title: "", content: "", category: "General", platforms: [], selectedPages: {}, tags: "" })}
                  >
                    Clear
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={addKnowledgeEntry}
                    disabled={!newEntry.title || !newEntry.content}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}