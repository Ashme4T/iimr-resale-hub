import { Search, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="hero-section min-h-[60vh] flex items-center justify-center text-center px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-primary-foreground space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Resell, Donate, Connect
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90">
              Your IIM Rohtak Marketplace
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Campus-exclusive platform for students and faculty to buy, sell, and donate textbooks, study tools, and more within our trusted community.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <Input 
                placeholder="Search 'textbooks under ₹500 in Hostel 3'..." 
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-white/20 bg-white/90 text-foreground placeholder:text-muted-foreground focus:border-white focus:bg-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg" asChild>
              <Link to="/products">
                <BookOpen className="w-5 h-5 mr-2" />
                BROWSE PRODUCTS
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-xl">
              <Heart className="w-5 h-5 mr-2" />
              VIEW DONATIONS
            </Button>
          </div>

          {/* Campus Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-80">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm opacity-80">Items Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Items Donated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};