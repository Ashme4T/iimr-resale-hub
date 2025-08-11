import { Eye, MapPin, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const FeaturedItems = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Financial Management Textbook",
      price: 850,
      originalPrice: 1200,
      condition: "Like New",
      seller: "Hostel 2, PGP",
      image: "/placeholder.svg",
      views: 24,
      category: "Books"
    },
    {
      id: 2,
      title: "Casio Scientific Calculator",
      price: 400,
      originalPrice: 600,
      condition: "Used",
      seller: "Faculty - Finance Dept",
      image: "/placeholder.svg",
      views: 18,
      category: "Study Tools"
    },
    {
      id: 3,
      title: "Business Formal Shirt",
      price: 300,
      originalPrice: 800,
      condition: "Used",
      seller: "Hostel 1, IPM",
      image: "/placeholder.svg",
      views: 12,
      category: "Clothes"
    },
    {
      id: 4,
      title: "Laptop Stand",
      price: 200,
      originalPrice: 500,
      condition: "New",
      seller: "Hostel 4, DPM",
      image: "/placeholder.svg",
      views: 31,
      category: "Electronics"
    },
    {
      id: 5,
      title: "MBA Preparation Books Set",
      price: 1200,
      originalPrice: 2000,
      condition: "Like New",
      seller: "Hostel 3, PGP",
      image: "/placeholder.svg",
      views: 45,
      category: "Books"
    },
    {
      id: 6,
      title: "Wireless Mouse",
      price: 150,
      originalPrice: 400,
      condition: "Used",
      seller: "Faculty - IT Dept",
      image: "/placeholder.svg",
      views: 8,
      category: "Electronics"
    }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "bg-green-100 text-green-800";
      case "Like New":
        return "bg-blue-100 text-blue-800";
      case "Used":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Items
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the latest and most popular items from your campus community
            </p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="sm">
              Newest
            </Button>
            <Button variant="outline" size="sm">
              Price: Low-High
            </Button>
            <Button variant="outline" size="sm">
              Condition
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredItems.map((item) => (
            <Card key={item.id} className="campus-card overflow-hidden group cursor-pointer">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {item.views}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                  <div className="flex items-center ml-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                  <Badge className={getConditionColor(item.condition)} variant="outline">
                    {item.condition}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {item.seller}
                </div>
                
                <Button className="w-full btn-campus">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  BUY NOW
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8">
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </div>
    </section>
  );
};