import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SportIcon } from "@/components/ui/sport-icon";
import { Trophy, Users, TrendingUp, Star, Play, Smartphone, Apple, Chrome } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-sports-bg.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/src/assets/forehand-logo.png" 
              alt="Forehand Logo" 
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-primary bg-clip-text text-transparent">
            FOREHAND
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Manage Tournaments for Free
          </p>
          
          <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-12">
            Find tournaments near you, score matches live, and track your pickle ball journey with real-time analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/">
              <Button size="lg" variant="hero" className="shadow-glow-primary hover:shadow-glow-accent text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Smartphone className="mr-2 h-5 w-5" />
              Download App
            </Button>
          </div>
          
          {/* Available as PWA Badge */}
          <div className="flex items-center justify-center">
            <div className="bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30">
              <p className="text-sm font-semibold text-accent flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Available as Progressive Web App
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            All-in-one platform for players and organizations
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-glow-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Find Tournaments Near You</h3>
              <p className="text-muted-foreground">
                Discover pickle ball tournaments happening in your area. Browse events, check schedules, and join the competition.
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-glow-accent transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Match Scoring</h3>
              <p className="text-muted-foreground">
                Score matches in real-time with pickle ball-specific scoring system. Track every point, game, and match with precision.
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-glow-primary transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Track Your Progress</h3>
              <p className="text-muted-foreground">
                View detailed statistics, rankings, and performance analytics. See how you stack up against other players.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Starting with Pickle Ball
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            More sports coming soon to the platform
          </p>
          
          <div className="flex justify-center">
            <Card className="p-12 text-center hover:scale-105 transition-transform max-w-xs">
              <div className="bg-gradient-primary rounded-full p-8 mx-auto mb-6 w-32 h-32 flex items-center justify-center">
                <Trophy className="w-16 h-16 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pickle Ball</h3>
              <p className="text-muted-foreground">Available Now</p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Future sports including Badminton, Tennis, Basketball, and Table Tennis will be added soon
            </p>
          </div>
        </div>
      </section>

      {/* For Organizations Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Free for Organizations
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Create your profile and manage tournaments at no cost
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Create Your Profile</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                Build your organization's profile with details, logo, and contact information. Get discovered by players.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Free Tournament Management</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                Create and manage tournaments at no cost. Organize events with automatic scheduling and live scoring.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                Get insights into tournament performance, player statistics, and organizational growth metrics.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Rankings & Leaderboards</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                Automatic ranking systems with customizable leaderboards for your tournaments and players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Install as Progressive Web App
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Works like a native app on any device
          </p>
          
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="p-8 bg-muted/30">
              <div className="flex items-start gap-4 text-left">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Install to Your Home Screen</h3>
                  <p className="text-muted-foreground mb-4">
                    Visit our web app on your mobile browser and tap "Add to Home Screen" or "Install" to get the full app experience.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Works offline once installed
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Launches like a native app
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Available on iPhone and Android
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
          
          <Link to="/app">
            <Button size="lg" variant="hero" className="text-lg shadow-glow-primary">
              <Play className="mr-2 h-6 w-6" />
              Open Web App
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-8">
            Native iOS and Android apps coming soon
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p className="mb-4">© 2024 Forehand. All rights reserved.</p>
          <p className="text-sm">Play More. Improve Faster.</p>
        </div>
      </footer>
    </div>
  );
}
