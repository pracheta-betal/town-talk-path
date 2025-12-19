import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  User, 
  FileText, 
  MessageSquare,
  Calendar,
  ArrowRight
} from "lucide-react";

// Mock complaint data
const mockComplaint = {
  id: "GRV-2024-0042",
  category: "Pothole",
  title: "Large pothole causing traffic hazards",
  description: "There is a large pothole approximately 2 feet wide and 6 inches deep on the main road near the bus stop. Multiple vehicles have been damaged and it poses a significant safety risk especially at night.",
  location: "MG Road, Near Central Bus Stop, Sector 5",
  status: "inProgress",
  priority: "high",
  submittedBy: "Rahul Sharma",
  submittedOn: "Dec 15, 2024",
  assignedTo: "Roads & Infrastructure Department",
  estimatedResolution: "Dec 20, 2024",
  timeline: [
    { 
      status: "Submitted", 
      date: "Dec 15, 2024 - 10:30 AM", 
      description: "Complaint registered successfully",
      completed: true 
    },
    { 
      status: "Under Review", 
      date: "Dec 15, 2024 - 11:45 AM", 
      description: "Complaint verified and prioritized as High",
      completed: true 
    },
    { 
      status: "Assigned", 
      date: "Dec 16, 2024 - 09:00 AM", 
      description: "Assigned to Roads & Infrastructure Department",
      completed: true 
    },
    { 
      status: "In Progress", 
      date: "Dec 17, 2024 - 02:30 PM", 
      description: "Repair team dispatched to location",
      completed: true 
    },
    { 
      status: "Resolution", 
      date: "Estimated: Dec 20, 2024", 
      description: "Expected completion date",
      completed: false 
    },
  ],
  updates: [
    {
      date: "Dec 17, 2024 - 02:30 PM",
      message: "Our repair team has been dispatched to the location. Work will begin shortly.",
      from: "Roads Department"
    },
    {
      date: "Dec 16, 2024 - 09:00 AM",
      message: "Your complaint has been assigned to the Roads & Infrastructure Department for immediate action.",
      from: "System"
    },
  ]
};

export default function TrackComplaint() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";
  const [complaintId, setComplaintId] = useState(initialId);
  const [complaint, setComplaint] = useState(initialId ? mockComplaint : null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setComplaint(mockComplaint);
    setIsSearching(false);
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted": return "submitted";
      case "assigned": return "assigned";
      case "inprogress": return "inProgress";
      case "resolved": return "resolved";
      default: return "default";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-hero py-8 md:py-12">
        <div className="container max-w-4xl">
          {/* Search Section */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Search className="h-3 w-3 mr-1" />
              Track Status
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your Complaint</h1>
            <p className="text-muted-foreground">
              Enter your complaint ID to view real-time status updates
            </p>
          </div>

          <Card className="mb-8 animate-fade-in">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter Complaint ID (e.g., GRV-2024-0042)"
                    className="pl-10"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Track"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Complaint Details */}
          {complaint && (
            <div className="space-y-6">
              {/* Overview Card */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{complaint.id}</span>
                        <Badge variant={getStatusVariant(complaint.status)}>
                          {complaint.status === "inProgress" ? "In Progress" : complaint.status}
                        </Badge>
                        <Badge variant={complaint.priority as any}>{complaint.priority} Priority</Badge>
                      </div>
                      <CardTitle className="text-xl">{complaint.title}</CardTitle>
                      <CardDescription className="mt-1">{complaint.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{complaint.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">{complaint.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Assigned To</div>
                        <div className="text-sm text-muted-foreground">{complaint.assignedTo}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Submitted On</div>
                        <div className="text-sm text-muted-foreground">{complaint.submittedOn}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Est. Resolution</div>
                        <div className="text-sm text-muted-foreground">{complaint.estimatedResolution}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Card */}
              <Card className="animate-fade-in animate-delay-100">
                <CardHeader>
                  <CardTitle className="text-lg">Progress Timeline</CardTitle>
                  <CardDescription>Track the status of your complaint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {complaint.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4 pb-8 last:pb-0">
                        {/* Timeline line and dot */}
                        <div className="flex flex-col items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            item.completed 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {item.completed ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          {index < complaint.timeline.length - 1 && (
                            <div className={`w-0.5 flex-1 mt-2 ${
                              item.completed ? "bg-primary" : "bg-muted"
                            }`} />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${!item.completed && "text-muted-foreground"}`}>
                              {item.status}
                            </span>
                            {!item.completed && (
                              <Badge variant="outline" className="text-xs">Pending</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{item.date}</div>
                          <div className="text-sm mt-1">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Updates Card */}
              <Card className="animate-fade-in animate-delay-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Updates & Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaint.updates.map((update, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{update.from}</span>
                          <span className="text-xs text-muted-foreground">{update.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {!complaint && !isSearching && (
            <Card className="animate-fade-in">
              <CardContent className="py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Enter your Complaint ID</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Your complaint ID was provided when you submitted your complaint. 
                  It looks like: GRV-YYYY-XXXX
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
