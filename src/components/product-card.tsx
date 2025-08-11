import { Eye, MapPin, Star, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  condition: string;
  seller: string;
  image: string;
  views?: number;
  category: string;
  course?: string;
  isDonation?: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

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

  if (viewMode === 'list') {
    return (
      <Card className="campus-card overflow-hidden group cursor-pointer">
        <div className="flex">
          <div className="relative w-48 h-32 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                {product.category}
              </Badge>
            </div>
            {product.isDonation && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  FREE
                </Badge>
              </div>
            )}
            {product.views && (
              <div className="absolute bottom-2 right-2">
                <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {product.views}
                </div>
              </div>
            )}
          </div>
          
          <CardContent className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg leading-tight flex-1">{product.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLiked(!isLiked);
                  }}
                  className={`ml-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-primary">
                  {product.isDonation ? 'FREE' : `₹${product.price}`}
                </span>
                {product.originalPrice && product.originalPrice !== product.price && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                )}
                <Badge className={getConditionColor(product.condition)} variant="outline">
                  {product.condition}
                </Badge>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                {product.seller}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button asChild className="flex-1" size="sm">
                <Link to={`/product/${product.id}`}>
                  {product.isDonation ? 'REQUEST' : 'BUY NOW'}
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="campus-card overflow-hidden group cursor-pointer">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {product.category}
            </Badge>
          </div>
          {product.isDonation && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <Heart className="w-3 h-3 mr-1" />
                FREE
              </Badge>
            </div>
          )}
          {!product.isDonation && product.views && (
            <div className="absolute top-3 right-3">
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {product.views}
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg leading-tight flex-1">{product.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={`ml-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">
              {product.isDonation ? 'FREE' : `₹${product.price}`}
            </span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
            <Badge className={getConditionColor(product.condition)} variant="outline">
              {product.condition}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            {product.seller}
          </div>
          
          <Button className="w-full btn-campus" onClick={(e) => e.preventDefault()}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            {product.isDonation ? 'REQUEST DONATION' : 'BUY NOW'}
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};