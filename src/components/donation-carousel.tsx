import { Heart, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const DonationCarousel = () => {
  const donationItems = [
    {
      id: 1,
      title: "Economics Textbook",
      description: "Free for a fellow IIM Rohtak member! Perfect condition, helped me ace my midterms.",
      donor: "Hostel 3, PGP Batch",
      image: "/placeholder.svg",
      daysAgo: 2
    },
    {
      id: 2,
      title: "Scientific Calculator",
      description: "Casio fx-991ES Plus - barely used, switching to phone apps.",
      donor: "Finance Dept",
      image: "/placeholder.svg",
      daysAgo: 1
    },
    {
      id: 3,
      title: "Formal Blazer",
      description: "Size M formal blazer, great for presentations and interviews.",
      donor: "Hostel 1, IPM",
      image: "/placeholder.svg",
      daysAgo: 3
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-donation-foreground mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Donations
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto donation-highlight">
            "Giving is not just about making a donation, it's about making a difference in our campus community."
          </p>
        </div>

        {/* Donation Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {donationItems.map((item) => (
            <Card key={item.id} className="campus-card overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-donation text-donation-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Heart className="w-4 h-4 mr-1 fill-current" />
                    FREE
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4 donation-highlight">
                  {item.description}
                </p>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.donor}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.daysAgo} day{item.daysAgo > 1 ? 's' : ''} ago
                  </div>
                </div>
                
                <Button className="w-full btn-campus">
                  REQUEST DONATION
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Donations CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            <Heart className="w-5 h-5 mr-2" />
            VIEW ALL DONATIONS
          </Button>
        </div>
      </div>
    </section>
  );
};