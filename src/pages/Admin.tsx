import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    full_description: "",
    price: "",
    category: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  const categories = [
    "Power BI",
    "Machine Learning",
    "Deep Learning",
    "Web Development"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!thumbnailFile || !zipFile) {
      toast({
        title: "Error",
        description: "Please upload both thumbnail and project ZIP file",
        variant: "destructive",
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setUploadProgress(10);

    try {
      // Upload thumbnail
      const thumbnailPath = `thumbnails/${Date.now()}_${thumbnailFile.name}`;
      const thumbnailUrl = await uploadFile(thumbnailFile, "project-thumbnails", thumbnailPath);
      setUploadProgress(40);

      // Upload ZIP file
      const zipPath = `projects/${Date.now()}_${zipFile.name}`;
      const zipUrl = await uploadFile(zipFile, "project-files", zipPath);
      setUploadProgress(70);

      // Insert project into database
      const { error: insertError } = await supabase
        .from("projects")
        .insert({
          title: formData.title,
          short_description: formData.short_description,
          full_description: formData.full_description,
          price: parseFloat(formData.price),
          category: formData.category, // Exact category string
          thumbnail_url: thumbnailUrl,
          zip_url: zipUrl,
          admin_id: "00000000-0000-0000-0000-000000000000" // Placeholder
        });

      if (insertError) throw insertError;

      setUploadProgress(100);

      toast({
        title: "Success",
        description: "Project uploaded successfully!",
      });

      // Reset form
      setFormData({
        title: "",
        short_description: "",
        full_description: "",
        price: "",
        category: "",
      });
      setThumbnailFile(null);
      setZipFile(null);
      setUploadProgress(0);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl">Upload New Project</CardTitle>
              <CardDescription>Add a new project to TechProjectHub</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short_description">Short Description *</Label>
                  <Textarea
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) => handleInputChange("short_description", e.target.value)}
                    placeholder="Brief description (displayed on cards)"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_description">Full Description *</Label>
                  <Textarea
                    id="full_description"
                    value={formData.full_description}
                    onChange={(e) => handleInputChange("full_description", e.target.value)}
                    placeholder="Detailed project description"
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail Image *</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">Project ZIP File *</Label>
                  <Input
                    id="zip"
                    type="file"
                    accept=".zip"
                    onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>

                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Upload Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Project
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
