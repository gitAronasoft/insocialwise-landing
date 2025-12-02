import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload,
  Search,
  Grid,
  List,
  Image as ImageIcon,
  Video,
  FileText,
  Download,
  Trash2,
  Edit,
  Eye,
  Copy,
  MoreHorizontal,
  Filter,
  Folder,
  Star,
  Calendar
} from "lucide-react";

const mediaItems = [
  {
    id: 1,
    name: "product-launch-hero.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2 days ago",
    used: 5,
    favorite: true,
    folder: "Product Launches",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "team-meeting-video.mp4",
    type: "video",
    size: "45.2 MB",
    dimensions: "1920x1080",
    uploadDate: "1 week ago",
    used: 3,
    favorite: false,
    folder: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "infographic-template.png",
    type: "image",
    size: "1.8 MB", 
    dimensions: "1080x1350",
    uploadDate: "3 days ago",
    used: 8,
    favorite: true,
    folder: "Templates",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "brand-guidelines.pdf",
    type: "document",
    size: "3.1 MB",
    dimensions: "A4",
    uploadDate: "1 month ago",
    used: 12,
    favorite: false,
    folder: "Brand Assets",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 5,
    name: "customer-testimonial.jpg",
    type: "image",
    size: "1.2 MB",
    dimensions: "1200x800", 
    uploadDate: "5 days ago",
    used: 2,
    favorite: true,
    folder: "Testimonials",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
  },
  {
    id: 6,
    name: "office-tour.mp4",
    type: "video",
    size: "67.8 MB",
    dimensions: "1920x1080",
    uploadDate: "2 weeks ago",
    used: 1,
    favorite: false,
    folder: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop"
  }
];

const folders = [
  { name: "Product Launches", count: 24, color: "from-blue-500 to-cyan-500" },
  { name: "Behind the Scenes", count: 18, color: "from-purple-500 to-pink-500" },
  { name: "Templates", count: 32, color: "from-green-500 to-emerald-500" },
  { name: "Brand Assets", count: 45, color: "from-orange-500 to-red-500" },
  { name: "Testimonials", count: 12, color: "from-yellow-500 to-orange-500" }
];

export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesFolder && matchesType;
  });

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
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
              Media Library
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and organize your content assets
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/60 dark:bg-gray-800/60 rounded-full p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                className="rounded-full"
                onClick={() => setViewMode('grid')}
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
            
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center space-x-2 flex-1 min-w-64">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/80 dark:bg-gray-700/80 border-gray-200/50 dark:border-gray-600/50"
            />
          </div>
          
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Folders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              {folders.map(folder => (
                <SelectItem key={folder.name} value={folder.name}>
                  {folder.name} ({folder.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Folders */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedFolder('all')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                    selectedFolder === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  <Folder className="h-5 w-5" />
                  <span className="font-medium">All Files</span>
                  <Badge variant="secondary" className="ml-auto">
                    {mediaItems.length}
                  </Badge>
                </motion.button>
                
                {folders.map((folder, index) => (
                  <motion.button
                    key={folder.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      selectedFolder === folder.name
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-gray-50/60 to-white/60 dark:from-gray-700/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${folder.color}`}>
                      <Folder className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{folder.name}</p>
                      <p className="text-xs opacity-70">{folder.count} files</p>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    {selectedFolder === 'all' ? 'All Files' : selectedFolder}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {filteredItems.length} files
                    </Badge>
                    {selectedItems.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {selectedItems.length} selected
                        </Badge>
                        <Button size="sm" variant="outline" className="rounded-full">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredItems.map((item, index) => {
                      const Icon = getIcon(item.type);
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`relative group cursor-pointer p-3 rounded-xl border transition-all duration-300 ${
                            selectedItems.includes(item.id)
                              ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-600'
                              : 'bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 border-white/20 hover:shadow-lg'
                          }`}
                        >
                          {/* Thumbnail */}
                          <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-gray-700 relative">
                            {item.type === 'image' || item.type === 'video' ? (
                              <img
                                src={item.thumbnail}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Icon className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            
                            {item.favorite && (
                              <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-500 fill-current" />
                            )}
                            
                            {item.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-2">
                                  <Video className="h-6 w-6 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* File Info */}
                          <div className="space-y-1">
                            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{item.size}</span>
                              <span>Used {item.used}x</span>
                            </div>
                            <p className="text-xs text-gray-400">{item.uploadDate}</p>
                          </div>
                          
                          {/* Actions */}
                          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredItems.map((item, index) => {
                      const Icon = getIcon(item.type);
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`flex items-center space-x-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            selectedItems.includes(item.id)
                              ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-600'
                              : 'bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-700/50 dark:to-gray-800/50 border-white/20 hover:shadow-md'
                          }`}
                        >
                          <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                            {item.type === 'image' || item.type === 'video' ? (
                              <img
                                src={item.thumbnail}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Icon className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {item.name}
                              </h4>
                              {item.favorite && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{item.size}</span>
                              <span>{item.dimensions}</span>
                              <span>{item.folder}</span>
                              <span>Used {item.used} times</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>{item.uploadDate}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
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