import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Target, Award } from "lucide-react";

export const AboutUs = () => {
  const teamMembers = [
    { name: "Arjun Sharma", role: "Project Lead", image: "/placeholder.svg" },
    { name: "Priya Patel", role: "Frontend Developer", image: "/placeholder.svg" },
    { name: "Rohit Singh", role: "Backend Developer", image: "/placeholder.svg" },
    { name: "Sneha Gupta", role: "UI/UX Designer", image: "/placeholder.svg" },
    { name: "Vikram Kumar", role: "Product Manager", image: "/placeholder.svg" },
    { name: "Anita Verma", role: "Marketing Lead", image: "/placeholder.svg" },
    { name: "Karan Joshi", role: "Quality Assurance", image: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the team behind your IIM Rohtak Marketplace, dedicated to connecting our campus community through reselling and donations!
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="campus-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  Building connections within our IIM Rohtak family through sustainable sharing and trading.
                </p>
              </CardContent>
            </Card>

            <Card className="campus-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Promoting eco-friendly practices by extending the life of textbooks, electronics, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="campus-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-donation/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-donation-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Trust & Security</h3>
                <p className="text-muted-foreground">
                  Campus-exclusive platform with verified @iimrohtak.ac.in users ensuring safe transactions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Grid */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Seven passionate individuals working together to make campus commerce better
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img 
                    src={member.image} 
                    alt={`Photo of team member ${member.name}`}
                    className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <Card className="campus-card">
            <CardContent className="p-12">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
                </div>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Born out of a simple observation during our time at IIM Rohtak - too many valuable items were going to waste, while fellow students needed exactly those same items. We saw textbooks gathering dust, electronics sitting unused, and clothes that could find new homes.
                  </p>
                  <p>
                    What started as informal WhatsApp groups and hostel notice boards evolved into this comprehensive platform. We believe that every transaction on our marketplace doesn't just exchange goods - it builds relationships, promotes sustainability, and strengthens our campus community.
                  </p>
                  <p className="font-medium text-foreground">
                    Today, we're proud to facilitate hundreds of transactions monthly, helping students save money, reduce waste, and connect with each other in meaningful ways.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};