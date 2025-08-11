import { Heart, Mail, Shield, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IIM</span>
              </div>
              <span className="font-bold text-lg">Rohtak Marketplace</span>
            </div>
            <p className="text-background/80 mb-4 max-w-md">
              Campus-exclusive marketplace connecting IIM Rohtak students and faculty through buying, selling, and donating. Building a sustainable community, one transaction at a time.
            </p>
            <div className="flex items-center text-sm text-background/60">
              <Shield className="w-4 h-4 mr-2" />
              Verified @iimrohtak.ac.in users only
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Products</a></li>
              <li className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <a href="#" className="hover:text-primary transition-colors">Donations</a>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors">Upload Item</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">My Profile</a></li>
            </ul>
          </div>

          {/* Support & Info */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-background/80">
              <li className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                <a href="#" className="hover:text-primary transition-colors">FAQs</a>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Guidelines</a></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/60 text-sm mb-4 md:mb-0">
              © 2024 IIM Rohtak Marketplace. Made with ❤️ for our campus community.
            </div>
            <div className="flex items-center space-x-6 text-sm text-background/60">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="/security.txt" className="hover:text-primary transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};