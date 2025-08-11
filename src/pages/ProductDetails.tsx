import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Eye, MapPin, Star, ShoppingBag, Heart, Share2, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Separator } from "@/components/ui/separator";

const mockProduct = {
  id: 1,
  title: "Financial Management Textbook",
  price: 850,
  originalPrice: 1200,
  condition: "Like New",
  seller: "Hostel 2, PGP",
  sellerName: "Rahul Kumar",
  phone: "XXXXXXX1234",
  course: "PGP",
  description: "Comprehensive financial management textbook perfect for PGP students. Includes all chapters on corporate finance, investment analysis, and portfolio management. Barely used, no highlighting or writing inside. Perfect for upcoming semester exams.",
  dateOfPurchase: "15/08/2024",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  video: null,
  views: 24,
  category: "Books",
  rating: 4.8,
  totalRatings: 12,
  isDonation: false
};

const relatedProducts = [
  {
    id: 2,
    title: "Economics Textbook",
    price: 600,
    originalPrice: 900,
    condition: "Used",
    seller: "Hostel 3, PGP",
    image: "/placeholder.svg",
    category: "Books"
  },
  {
    id: 3,
    title: "Statistics Notebook Set",
    price: 0,
    originalPrice: 0,
    condition: "Like New",
    seller: "Hostel 1, IPM",
    image: "/placeholder.svg",
    category: "Books",
    isDonation: true
  },
  {
    id: 4,
    title: "Business Calculator",
    price: 300,
    originalPrice: 500,
    condition: "Used",
    seller: "Faculty - Finance",
    image: "/placeholder.svg",
    category: "Study Tools"
  }
];

export const ProductDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Like New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Used":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${mockProduct.category}`} className="hover:text-primary">
            {mockProduct.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{mockProduct.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6 p-0" asChild>
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src={mockProduct.images[currentImageIndex]}
                  alt={mockProduct.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {mockProduct.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Video Play Button */}
                {mockProduct.video && (
                  <Button
                    variant="ghost"
                    size="lg"
                    className="absolute inset-0 bg-black/30 hover:bg-black/50 text-white rounded-none"
                    onClick={() => setShowVideoPlayer(true)}
                  >
                    <Play className="w-12 h-12" />
                  </Button>
                )}

                {/* View Count */}
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {mockProduct.views}
                </div>
              </div>

              {/* Image Indicators */}
              {mockProduct.images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-2">
                  {mockProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {mockProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${mockProduct.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground leading-tight">
                  {mockProduct.title}
                </h1>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? 'text-red-500' : 'text-muted-foreground'}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {mockProduct.category}
                </Badge>
                <Badge className={getConditionColor(mockProduct.condition)} variant="outline">
                  {mockProduct.condition}
                </Badge>
                {mockProduct.isDonation && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Heart className="w-3 h-3 mr-1" />
                    Free Donation
                  </Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-primary">
                  {mockProduct.price === 0 ? 'FREE' : `₹${mockProduct.price}`}
                </span>
                {mockProduct.originalPrice > 0 && mockProduct.originalPrice !== mockProduct.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{mockProduct.originalPrice}
                  </span>
                )}
                {mockProduct.originalPrice > mockProduct.price && mockProduct.price > 0 && (
                  <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                    {Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}% off
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Original price: ₹{mockProduct.originalPrice} • Purchased on {mockProduct.dateOfPurchase}
              </p>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {mockProduct.sellerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{mockProduct.sellerName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {mockProduct.seller}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{mockProduct.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({mockProduct.totalRatings} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-mono text-sm">{mockProduct.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {mockProduct.isDonation ? (
                <Button size="lg" className="w-full">
                  <Heart className="w-5 h-5 mr-2" />
                  REQUEST DONATION
                </Button>
              ) : (
                <>
                  <Button size="lg" className="w-full">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    BUY NOW
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    ADD TO CART
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Related Items</h2>
            <Button variant="outline" asChild>
              <Link to={`/products?category=${mockProduct.category}`}>
                View All {mockProduct.category}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};