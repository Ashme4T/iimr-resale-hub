import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, X, Plus, Camera, Video, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const categories = ["Books", "Study Tools", "Clothes", "Electronics"];
const conditions = ["New", "Like New", "Used", "Worn"];

export const UploadProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    purchaseDate: undefined as Date | undefined,
    originalPrice: "",
    description: "",
    images: [] as File[],
    video: null as File | null
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (formData.name.length > 50) newErrors.name = "Product name must be 50 characters or less";
        if (!formData.price) newErrors.price = "Price is required";
        if (isNaN(Number(formData.price))) newErrors.price = "Price must be a number";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.condition) newErrors.condition = "Condition is required";
        break;
      case 2:
        if (!formData.purchaseDate) newErrors.purchaseDate = "Purchase date is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (formData.description.length > 500) newErrors.description = "Description must be 500 characters or less";
        break;
      case 3:
        if (formData.images.length === 0) newErrors.images = "At least one image is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.images.length + files.length > 5) {
      setErrors({ ...errors, images: "Maximum 5 images allowed" });
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData({ ...formData, images: newImages });

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
    
    // Clear error
    if (errors.images) {
      const { images, ...otherErrors } = errors;
      setErrors(otherErrors);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    
    setFormData({ ...formData, images: newImages });
    setPreviewImages(newPreviews);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024) { // 200MB
        setErrors({ ...errors, video: "Video must be less than 200MB" });
        return;
      }
      
      setFormData({ ...formData, video: file });
      setPreviewVideo(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setFormData({ ...formData, video: null });
    setPreviewVideo("");
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Here you would submit to your backend
      console.log("Submitting:", formData);
      alert("Product uploaded successfully!");
    }
  };

  const isDonation = Number(formData.price) === 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" className="mb-4 p-0" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Upload Product</h1>
            <p className="text-muted-foreground">
              Share your items with the IIM Rohtak community
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    i + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Basics</span>
            <span>Details</span>
            <span>Media</span>
            <span>Review</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Product Details"}
              {currentStep === 3 && "Images & Video"}
              {currentStep === 4 && "Review & Submit"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Financial Management Textbook"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    maxLength={50}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{errors.name || ""}</span>
                    <span>{formData.name.length}/50</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter 0 for donations"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
                  {isDonation && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        💝 This will be marked as a donation
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                      <SelectTrigger className={errors.condition ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.condition && <span className="text-xs text-red-500">{errors.condition}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date of Purchase *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.purchaseDate && "text-muted-foreground",
                            errors.purchaseDate && "border-red-500"
                          )}
                        >
                          {formData.purchaseDate ? (
                            format(formData.purchaseDate, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.purchaseDate}
                          onSelect={(date) => setFormData({ ...formData, purchaseDate: date })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.purchaseDate && <span className="text-xs text-red-500">{errors.purchaseDate}</span>}
                  </div>

                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="Optional"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail. Include condition, usage, any defects, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    maxLength={500}
                    rows={6}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{errors.description || ""}</span>
                    <span>{formData.description.length}/500</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Media */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Images */}
                <div>
                  <Label>Product Images * (1-5 images)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {formData.images.length < 5 && (
                      <label className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Image</span>
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {errors.images && <span className="text-xs text-red-500">{errors.images}</span>}
                  <p className="text-xs text-muted-foreground mt-2">
                    JPEG or PNG, max 5MB each. First image will be the main photo.
                  </p>
                </div>

                {/* Video */}
                <div>
                  <Label>Product Video (Optional)</Label>
                  {previewVideo ? (
                    <div className="relative mt-2">
                      <video
                        src={previewVideo}
                        controls
                        className="w-full max-w-md rounded-lg"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={removeVideo}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="block w-full max-w-md mt-2 p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center cursor-pointer hover:border-primary/50 transition-colors">
                      <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">Upload Video</span>
                      <input
                        type="file"
                        accept="video/mp4"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    MP4 format, max 15 seconds, max 200MB
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Preview
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Preview */}
                    <div>
                      {previewImages[0] && (
                        <img
                          src={previewImages[0]}
                          alt="Product preview"
                          className="w-full aspect-square object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{formData.category}</Badge>
                          <Badge variant="outline">{formData.condition}</Badge>
                          {isDonation && (
                            <Badge className="bg-green-100 text-green-800">Donation</Badge>
                          )}
                        </div>
                        
                        <h4 className="font-semibold text-lg">{formData.name}</h4>
                        
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-primary">
                            {isDonation ? 'FREE' : `₹${formData.price}`}
                          </span>
                          {formData.originalPrice && (
                            <span className="text-muted-foreground line-through">
                              ₹{formData.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {formData.description}
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Upload Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Images:</span>
                          <span>{formData.images.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Video:</span>
                          <span>{formData.video ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Purchase Date:</span>
                          <span>
                            {formData.purchaseDate ? format(formData.purchaseDate, "dd/MM/yyyy") : ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{isDonation ? 'Donation' : 'Sale'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Important:</strong> You'll need to confirm your password to complete the upload.
                    Make sure all information is accurate as you can only edit the listing later with password confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="flex items-center">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  SUBMIT LISTING
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};