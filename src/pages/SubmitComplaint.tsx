import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  MapPin, 
  Camera, 
  FileText, 
  CheckCircle2,
  TrafficCone,
  Lightbulb,
  Droplets,
  Trash2,
  AlertTriangle,
  Wifi,
  Shield
} from "lucide-react";

const categories = [
  { value: "pothole", label: "Potholes & Roads", icon: TrafficCone },
  { value: "streetlight", label: "Street Lights", icon: Lightbulb },
  { value: "water", label: "Water Supply", icon: Droplets },
  { value: "waste", label: "Waste Management", icon: Trash2 },
  { value: "traffic", label: "Traffic Signals", icon: AlertTriangle },
  { value: "drainage", label: "Drainage Issues", icon: Droplets },
  { value: "public-wifi", label: "Public WiFi", icon: Wifi },
  { value: "safety", label: "Public Safety", icon: Shield },
];

const priorities = [
  { value: "low", label: "Low", description: "General maintenance" },
  { value: "medium", label: "Medium", description: "Needs attention" },
  { value: "high", label: "High", description: "Urgent issue" },
  { value: "emergency", label: "Emergency", description: "Immediate action required" },
];

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    priority: "medium",
    title: "",
    description: "",
    location: "",
    name: "",
    email: "",
    phone: "",
  });
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const complaintId = `GRV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
    toast({
      title: "Complaint Submitted Successfully!",
      description: `Your complaint ID is ${complaintId}. You can use this to track your complaint status.`,
    });

    setIsSubmitting(false);
    navigate(`/track?id=${complaintId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-hero py-8 md:py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <FileText className="h-3 w-3 mr-1" />
              New Complaint
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Report an Issue</h1>
            <p className="text-muted-foreground">
              Help us improve your city by reporting municipal issues
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Category Selection */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Issue Category</CardTitle>
                  <CardDescription>Select the type of issue you want to report</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`p-4 rounded-xl border-2 text-center transition-all hover:border-primary/50 ${
                          formData.category === category.value 
                            ? "border-primary bg-primary/5" 
                            : "border-border"
                        }`}
                      >
                        <category.icon className={`h-6 w-6 mx-auto mb-2 ${
                          formData.category === category.value ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.category === category.value ? "text-primary" : ""
                        }`}>
                          {category.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Issue Details */}
              <Card className="animate-fade-in animate-delay-100">
                <CardHeader>
                  <CardTitle className="text-lg">Issue Details</CardTitle>
                  <CardDescription>Provide details about the issue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Large pothole causing accidents"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label>Priority Level</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      {priorities.map((priority) => (
                        <button
                          key={priority.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            formData.priority === priority.value 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <Badge 
                            variant={priority.value as any} 
                            className="mb-1"
                          >
                            {priority.label}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{priority.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="animate-fade-in animate-delay-200">
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                  <CardDescription>Help us locate the issue accurately</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="location">Address / Landmark</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        className="pl-10"
                        placeholder="Enter the location or nearby landmark"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <MapPin className="h-4 w-4" />
                    Use Current Location
                  </Button>
                </CardContent>
              </Card>

              {/* Photo Upload */}
              <Card className="animate-fade-in animate-delay-300">
                <CardHeader>
                  <CardTitle className="text-lg">Photos / Evidence</CardTitle>
                  <CardDescription>Upload photos of the issue (optional, max 5)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="animate-fade-in animate-delay-400">
                <CardHeader>
                  <CardTitle className="text-lg">Your Information</CardTitle>
                  <CardDescription>How can we reach you with updates?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="w-full"
                disabled={isSubmitting || !formData.category || !formData.title}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Submit Complaint
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
