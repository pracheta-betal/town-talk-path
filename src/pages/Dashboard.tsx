import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  Filter,
  MapPin,
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const statsData = [
  { 
    label: "Total Complaints", 
    value: "14,284", 
    change: "+12%", 
    trend: "up",
    icon: FileText,
    color: "bg-primary/10 text-primary"
  },
  { 
    label: "Resolved", 
    value: "12,847", 
    change: "+8%", 
    trend: "up",
    icon: CheckCircle2,
    color: "bg-success/10 text-success"
  },
  { 
    label: "In Progress", 
    value: "1,203", 
    change: "-5%", 
    trend: "down",
    icon: Clock,
    color: "bg-warning/10 text-warning"
  },
  { 
    label: "Pending", 
    value: "234", 
    change: "-15%", 
    trend: "down",
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive"
  },
];

const complaints = [
  {
    id: "GRV-2024-0048",
    title: "Broken streetlight near school",
    category: "Street Light",
    location: "Green Park School Road",
    status: "submitted",
    priority: "high",
    date: "Dec 19, 2024",
  },
  {
    id: "GRV-2024-0047",
    title: "Garbage not collected for 3 days",
    category: "Waste Management",
    location: "Sector 12, Block C",
    status: "assigned",
    priority: "medium",
    date: "Dec 18, 2024",
  },
  {
    id: "GRV-2024-0046",
    title: "Water pipeline leakage",
    category: "Water Supply",
    location: "Main Market Road",
    status: "inProgress",
    priority: "high",
    date: "Dec 18, 2024",
  },
  {
    id: "GRV-2024-0045",
    title: "Large pothole on highway",
    category: "Pothole",
    location: "NH-44, KM 23",
    status: "inProgress",
    priority: "emergency",
    date: "Dec 17, 2024",
  },
  {
    id: "GRV-2024-0044",
    title: "Traffic signal not working",
    category: "Traffic",
    location: "Central Square Junction",
    status: "resolved",
    priority: "high",
    date: "Dec 17, 2024",
  },
  {
    id: "GRV-2024-0043",
    title: "Overflowing drainage",
    category: "Drainage",
    location: "Civil Lines Area",
    status: "resolved",
    priority: "medium",
    date: "Dec 16, 2024",
  },
];

const categoryStats = [
  { name: "Potholes & Roads", count: 4521, percentage: 32 },
  { name: "Street Lights", count: 2856, percentage: 20 },
  { name: "Waste Management", count: 2428, percentage: 17 },
  { name: "Water Supply", count: 1999, percentage: 14 },
  { name: "Drainage", count: 1428, percentage: 10 },
  { name: "Others", count: 1052, percentage: 7 },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "submitted": return "submitted";
      case "assigned": return "assigned";
      case "inProgress": return "inProgress";
      case "resolved": return "resolved";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "submitted": return "Submitted";
      case "assigned": return "Assigned";
      case "inProgress": return "In Progress";
      case "resolved": return "Resolved";
      default: return status;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-hero py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              <BarChart3 className="h-3 w-3 mr-1" />
              Dashboard
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Complaints Overview</h1>
            <p className="text-muted-foreground">
              Real-time statistics and complaint management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {stat.change}
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Complaints List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <Card className="animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by ID or title..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="pothole">Potholes</SelectItem>
                        <SelectItem value="street">Street Light</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="waste">Waste</SelectItem>
                        <SelectItem value="traffic">Traffic</SelectItem>
                        <SelectItem value="drainage">Drainage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Complaints */}
              <Card className="animate-fade-in animate-delay-100">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Complaints</CardTitle>
                  <CardDescription>
                    {filteredComplaints.length} complaints found
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredComplaints.map((complaint) => (
                      <div 
                        key={complaint.id} 
                        className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs text-muted-foreground">
                                {complaint.id}
                              </span>
                              <Badge variant={getStatusVariant(complaint.status)}>
                                {getStatusLabel(complaint.status)}
                              </Badge>
                              <Badge variant={complaint.priority as any}>
                                {complaint.priority}
                              </Badge>
                            </div>
                            <h4 className="font-medium truncate">{complaint.title}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {complaint.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {complaint.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Category Stats */}
            <div className="space-y-6">
              <Card className="animate-fade-in animate-delay-200">
                <CardHeader>
                  <CardTitle className="text-lg">By Category</CardTitle>
                  <CardDescription>Complaint distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryStats.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-primary rounded-full transition-all duration-500"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-fade-in animate-delay-300">
                <CardHeader>
                  <CardTitle className="text-lg">Resolution Stats</CardTitle>
                  <CardDescription>This month's performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                      <span className="text-sm font-medium">Resolution Rate</span>
                      <span className="text-lg font-bold text-success">94%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                      <span className="text-sm font-medium">Avg. Response Time</span>
                      <span className="text-lg font-bold text-primary">4.2 hrs</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                      <span className="text-sm font-medium">Avg. Resolution Time</span>
                      <span className="text-lg font-bold text-warning">2.3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
