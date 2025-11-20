import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react";
import { motion } from "framer-motion";

interface ABTestResult {
  variant: string;
  views: number;
  conversions: number;
  conversionRate: string;
}

export default function ABTestAdmin() {
  const { data: results, isLoading } = useQuery<ABTestResult[]>({
    queryKey: ['/api/ab-test/results'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const { data: preBookings } = useQuery({
    queryKey: ['/api/prebookings'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading A/B test results...</p>
        </div>
      </div>
    );
  }

  const variantA = results?.find(r => r.variant === "A");
  const variantB = results?.find(r => r.variant === "B");
  const variantC = results?.find(r => r.variant === "C");
  
  const totalViews = (variantA?.views || 0) + (variantB?.views || 0) + (variantC?.views || 0);
  const totalConversions = (variantA?.conversions || 0) + (variantB?.conversions || 0) + (variantC?.conversions || 0);
  const overallConversionRate = totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(2) : "0.00";

  // Determine winner
  const aRate = parseFloat(variantA?.conversionRate || "0");
  const bRate = parseFloat(variantB?.conversionRate || "0");
  const cRate = parseFloat(variantC?.conversionRate || "0");
  const maxRate = Math.max(aRate, bRate, cRate);
  const winner = aRate === maxRate && aRate > 0 ? "A" : 
                 bRate === maxRate && bRate > 0 ? "B" : 
                 cRate === maxRate && cRate > 0 ? "C" : "Tie";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">A/B Testing Dashboard</h1>
              <p className="text-gray-600 mt-2">insocialwise Landing Page Performance</p>
            </div>
            <Badge variant={winner === "Tie" ? "secondary" : "default"} className="text-lg px-4 py-2">
              {winner === "Tie" ? "No Clear Winner" : `Winner: Variant ${winner}`}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                    <p className="text-3xl font-bold text-gray-900">{totalConversions}</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{overallConversionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Signups</p>
                    <p className="text-3xl font-bold text-gray-900">{preBookings?.length || 0}</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Variant Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Variant A */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className={`${winner === "A" ? "ring-2 ring-green-500 bg-green-50" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Variant A - Original Design</CardTitle>
                  {winner === "A" && <Badge className="bg-green-500">Winner</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{variantA?.views || 0}</p>
                      <p className="text-sm text-gray-600">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{variantA?.conversions || 0}</p>
                      <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{variantA?.conversionRate || "0.00"}%</p>
                      <p className="text-sm text-gray-600">Conv. Rate</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${parseFloat(variantA?.conversionRate || "0") * 4}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Traditional hero section with countdown timer and free year messaging
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Variant B */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className={`${winner === "B" ? "ring-2 ring-green-500 bg-green-50" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Variant B - High-Urgency Design</CardTitle>
                  {winner === "B" && <Badge className="bg-green-500">Winner</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{variantB?.views || 0}</p>
                      <p className="text-sm text-gray-600">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{variantB?.conversions || 0}</p>
                      <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{variantB?.conversionRate || "0.00"}%</p>
                      <p className="text-sm text-gray-600">Conv. Rate</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${parseFloat(variantB?.conversionRate || "0") * 4}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Urgency-focused design with ROI messaging and scarcity indicators
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Variant C */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className={`${winner === "C" ? "ring-2 ring-green-500 bg-green-50" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Variant C - Modern UI/UX Design</CardTitle>
                  {winner === "C" && <Badge className="bg-green-500">Winner</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{variantC?.views || 0}</p>
                      <p className="text-sm text-gray-600">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{variantC?.conversions || 0}</p>
                      <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{variantC?.conversionRate || "0.00"}%</p>
                      <p className="text-sm text-gray-600">Conv. Rate</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${parseFloat(variantC?.conversionRate || "0") * 4}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Modern design with animated dashboard, gradient elements, and contemporary UI patterns
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {winner !== "Tie" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Variant {winner} is performing better
                    </h3>
                    <p className="text-green-700">
                      {winner === "A" ? 
                        "The original design with traditional messaging is converting better. Users may prefer the straightforward approach." :
                        winner === "B" ?
                        "The high-urgency design is converting better. The scarcity messaging and ROI focus are more effective." :
                        "The modern UI/UX design is converting better. Contemporary design patterns and animations are resonating with users."
                      }
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Variant A Strengths:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Clean, professional design</li>
                      <li>• Clear value proposition</li>
                      <li>• Dashboard preview builds trust</li>
                      <li>• Social proof elements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Variant B Strengths:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• High urgency and scarcity</li>
                      <li>• ROI-focused messaging</li>
                      <li>• Bold, attention-grabbing design</li>
                      <li>• Concrete benefit numbers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Variant C Strengths:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Modern, contemporary UI/UX</li>
                      <li>• Smooth animations and interactions</li>
                      <li>• Gradient design elements</li>
                      <li>• Interactive dashboard mockup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}