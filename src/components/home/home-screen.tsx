import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/ui/sport-icon";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Users, MapPin, Trophy, Plus } from "lucide-react";

interface HomeScreenProps {
  onStartMatch: () => void;
  onFindPlayers: () => void;
  onViewProfile: () => void;
}

export const HomeScreen = ({ onStartMatch, onFindPlayers, onViewProfile }: HomeScreenProps) => {
  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={onViewProfile}
          >
            <span className="text-xl font-bold text-primary-foreground">A</span>
          </div>
          <div>
            <h2 className="font-semibold">Hi 👋</h2>
            <p className="text-sm text-muted-foreground">Alice Johnson</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gradient-accent text-accent-foreground border-none">
            Pro Player
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="neomorph" 
            className="h-24 flex-col space-y-2"
            onClick={onStartMatch}
          >
            <Play className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Start Match</span>
          </Button>
          
          <Button 
            variant="neomorph" 
            className="h-24 flex-col space-y-2"
            onClick={onFindPlayers}
          >
            <Users className="w-6 h-6 text-accent" />
            <span className="text-sm font-medium">Find Players</span>
          </Button>
          
          <Button variant="neomorph" className="h-24 flex-col space-y-2">
            <MapPin className="w-6 h-6 text-warning" />
            <span className="text-sm font-medium">Find Courts</span>
          </Button>
          
          <Button variant="neomorph" className="h-24 flex-col space-y-2">
            <Trophy className="w-6 h-6 text-success" />
            <span className="text-sm font-medium">Tournaments</span>
          </Button>
        </div>
      </div>

      {/* Active Sports */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Your Sports</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {['badminton', 'tennis', 'basketball', 'table-tennis'].map((sport) => (
            <div key={sport} className="flex-shrink-0">
              <SportIcon 
                sport={sport as any} 
                size="lg" 
                className="hover:shadow-glow-accent cursor-pointer" 
              />
              <p className="text-xs text-center mt-2 capitalize font-medium">
                {sport.replace('-', ' ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Matches */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live Matches</h3>
          <Button variant="ghost" size="sm">See All</Button>
        </div>
        
        <Card className="p-4 bg-gradient-card shadow-neomorph">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">LIVE</span>
              <Badge variant="outline" className="text-xs">1ST SET</Badge>
            </div>
            <p className="text-xs text-muted-foreground">18:10</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="font-semibold">Team A</p>
              <p className="text-xs text-muted-foreground">Alice & Bob</p>
            </div>
            
            <div className="text-center bg-primary/10 rounded-xl px-4 py-2">
              <p className="text-2xl font-bold">21:18</p>
              <p className="text-xs text-muted-foreground">Current Score</p>
            </div>
            
            <div className="text-center">
              <p className="font-semibold">Team B</p>
              <p className="text-xs text-muted-foreground">Carol & Dave</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Button variant="floating" onClick={onStartMatch}>
        <Plus className="w-6 h-6" />
      </Button>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card-elevated/95 backdrop-blur-md border-t border-border/50">
        <div className="flex items-center justify-around py-3 px-6">
          <Button variant="ghost" size="icon" className="flex-col space-y-1 text-primary">
            <div className="w-6 h-6 bg-primary rounded-full shadow-glow-primary"></div>
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="flex-col space-y-1">
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Matches</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="flex-col space-y-1">
            <Users className="w-5 h-5" />
            <span className="text-xs">Social</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="flex-col space-y-1">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Venues</span>
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};