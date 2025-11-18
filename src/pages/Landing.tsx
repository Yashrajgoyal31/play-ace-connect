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
            Play More. Improve Faster.
          </p>
          
          <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-12">
            Connect with players, score matches live, and dominate your sport with intelligent insights and real-time analytics.
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
          
          {/* Sport Icons */}
          <div className="flex items-center justify-center space-x-6">
            <SportIcon sport="badminton" size="lg" className="animate-bounce" style={{ animationDelay: '0ms' }} />
            <SportIcon sport="tennis" size="lg" className="animate-bounce" style={{ animationDelay: '200ms' }} />
            <SportIcon sport="basketball" size="lg" className="animate-bounce" style={{ animationDelay: '400ms' }} />
            <SportIcon sport="table-tennis" size="lg" className="animate-bounce" style={{ animationDelay: '600ms' }} />
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
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect with Players</h3>
              <p className="text-muted-foreground">
                Find and connect with players in your area. Build your network, schedule matches, and grow your sports community.
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-glow-accent transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Match Scoring</h3>
              <p className="text-muted-foreground">
                Score matches in real-time with sport-specific scoring systems. Track every point, set, and game with precision.
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
            Multiple Sports. One Platform.
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Currently supporting your favorite sports with more coming soon
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="p-8 text-center hover:scale-105 transition-transform">
              <SportIcon sport="badminton" size="xl" className="mx-auto mb-4" />
              <p className="font-semibold capitalize">Badminton</p>
            </Card>
            <Card className="p-8 text-center hover:scale-105 transition-transform">
              <SportIcon sport="tennis" size="xl" className="mx-auto mb-4" />
              <p className="font-semibold capitalize">Tennis</p>
            </Card>
            <Card className="p-8 text-center hover:scale-105 transition-transform">
              <SportIcon sport="basketball" size="xl" className="mx-auto mb-4" />
              <p className="font-semibold capitalize">Basketball</p>
            </Card>
            <Card className="p-8 text-center hover:scale-105 transition-transform">
              <SportIcon sport="table-tennis" size="xl" className="mx-auto mb-4" />
              <p className="font-semibold capitalize">Table Tennis</p>
            </Card>
          </div>
        </div>
      </section>

      {/* For Organizations Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Built for Organizations Too
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Manage tournaments, teams, and players with ease
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Tournament Management</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                Create, organize, and manage tournaments with automatic scheduling, brackets, and live scoring.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Team Management</h3>
              </div>
              <p className="text-muted-foreground pl-16">
                Organize players into teams, track performance, and manage rosters efficiently.
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
                Get insights into player performance, tournament statistics, and organizational growth.
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
                Automatic ranking systems with customizable leaderboards for your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started Today
          </h2>
          <p className="text-muted-foreground mb-12 text-lg">
            Available on web and mobile platforms
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="outline" className="text-lg">
              <Apple className="mr-2 h-6 w-6" />
              Download for iOS
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              <Smartphone className="mr-2 h-6 w-6" />
              Download for Android
            </Button>
            <Link to="/">
              <Button size="lg" variant="hero" className="text-lg shadow-glow-primary">
                <Chrome className="mr-2 h-6 w-6" />
                Open Web App
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Join thousands of athletes improving their game
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
