import { Heart, Search, User, ShoppingBag, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IIM</span>
            </div>
            <span className="font-bold text-lg text-foreground">Rohtak Marketplace</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search textbooks, calculators, clothes..." 
                className="pl-10 pr-4 py-2 rounded-lg border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="w-4 h-4 mr-2" />
              Donations
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Cart
            </Button>
            <Button variant="outline" size="sm" className="btn-secondary-campus text-sm">
              <Upload className="w-4 h-4 mr-2" />
              UPLOAD
            </Button>
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 rounded-lg border-2 focus:border-primary"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};