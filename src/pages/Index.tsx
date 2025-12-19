import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { 
  FileText, 
  Search, 
  BarChart3, 
  Shield, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Droplets,
  TrafficCone,
  Trash2,
  Zap,
  MapPin
} from "lucide-react";

const stats = [
  { label: "Issues Resolved", value: "12,847", icon: CheckCircle2 },
  { label: "Active Cases", value: "1,234", icon: Clock },
  { label: "Resolution Rate", value: "94%", icon: BarChart3 },
  { label: "Avg. Response", value: "48hrs", icon: Zap },
];

const categories = [
  { name: "Potholes & Roads", icon: TrafficCone, count: 342, color: "bg-destructive/10 text-destructive" },
  { name: "Street Lights", icon: Lightbulb, count: 218, color: "bg-warning/10 text-warning" },
  { name: "Water Supply", icon: Droplets, count: 156, color: "bg-info/10 text-info" },
  { name: "Waste Management", icon: Trash2, count: 289, color: "bg-success/10 text-success" },
];

const features = [
  {
    icon: FileText,
    title: "Easy Reporting",
    description: "Submit complaints with photos, location, and detailed descriptions in just a few clicks.",
  },
  {
    icon: Search,
    title: "Real-time Tracking",
    description: "Track the status of your complaint from submission to resolution with live updates.",
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "Your data is protected and all complaint processing is fully transparent.",
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description: "GPS-enabled reporting ensures accurate location tagging for faster response.",
  },
];

const recentComplaints = [
  { id: "GRV-2024-001", category: "Pothole", location: "MG Road, Sector 5", status: "resolved", date: "2 hours ago" },
  { id: "GRV-2024-002", category: "Street Light", location: "Park Avenue", status: "inProgress", date: "5 hours ago" },
  { id: "GRV-2024-003", category: "Water Leak", location: "Gandhi Nagar", status: "assigned", date: "1 day ago" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--info)/0.06),transparent_50%)]" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 animate-fade-in">
              <Zap className="h-3 w-3 mr-1" />
              Trusted by 50,000+ citizens
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in text-balance">
              Report City Issues,{" "}
              <span className="text-primary">Get Results</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-100 max-w-2xl mx-auto">
              Your voice matters. Report potholes, broken streetlights, water leaks, and more. 
              Track resolution in real-time and help build a smarter city together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
              <Link to="/submit">
                <Button variant="hero" size="xl">
                  <FileText className="h-5 w-5" />
                  Report an Issue
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="outline" size="xl">
                  <Search className="h-5 w-5" />
                  Track Complaint
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Issues We Resolve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From road repairs to utility services, report any municipal issue and get it resolved promptly.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category.name} 
                className="group cursor-pointer hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} active cases</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process to get your city issues resolved quickly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="border-0 shadow-none bg-transparent animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl gradient-primary text-primary-foreground mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Recent Activity</h2>
              <p className="text-muted-foreground">Latest complaints and their resolution status</p>
            </div>
            <Link to="/dashboard">
              <Button variant="ghost">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentComplaints.map((complaint, index) => (
              <Card 
                key={complaint.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-muted-foreground">{complaint.id}</span>
                          <Badge variant={complaint.status as any}>
                            {complaint.status === "resolved" ? "Resolved" : 
                             complaint.status === "inProgress" ? "In Progress" : "Assigned"}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{complaint.category}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {complaint.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground md:text-right">
                      {complaint.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of citizens who are actively improving their neighborhoods. 
            Report an issue today and be part of the change.
          </p>
          <Link to="/submit">
            <Button 
              size="xl" 
              className="bg-card text-primary hover:bg-card/90 shadow-lg"
            >
              <FileText className="h-5 w-5" />
              Submit Your First Complaint
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
