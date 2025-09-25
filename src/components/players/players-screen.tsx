import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { ArrowLeft, Search, Filter, MapPin, MessageCircle, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PlayersScreenProps {
  onBack: () => void;
}

export const PlayersScreen = ({ onBack }: PlayersScreenProps) => {
  const players = [
    {
      name: "Rohit Sharma",
      username: "@rohit_smash",
      location: "2.3 km away",
      sport: "badminton",
      level: "Expert",
      rating: "4.8",
      matches: 45,
      available: true
    },
    {
      name: "Priya Patel", 
      username: "@priya_ace",
      location: "1.8 km away",
      sport: "tennis", 
      level: "Advanced",
      rating: "4.6",
      matches: 32,
      available: true
    },
    {
      name: "Dev Kumar",
      username: "@dev_hoops", 
      location: "3.1 km away",
      sport: "basketball",
      level: "Pro",
      rating: "4.9", 
      matches: 78,
      available: false
    },
    {
      name: "Sneha Jain",
      username: "@sneha_tt",
      location: "1.2 km away", 
      sport: "table-tennis",
      level: "Intermediate",
      rating: "4.3",
      matches: 23,
      available: true
    }
  ];

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold">Find Players</h1>
        
        <Button variant="ghost" size="icon">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            className="pl-10 bg-card shadow-neomorph-inset border-none"
            placeholder="Search players by name or sport..."
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-6 py-2">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <Button variant="neomorph" size="sm" className="whitespace-nowrap">
            <SportIcon sport="badminton" size="sm" className="mr-2" />
            Badminton
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <SportIcon sport="tennis" size="sm" className="mr-2" />
            Tennis
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <SportIcon sport="basketball" size="sm" className="mr-2" />
            Basketball
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Nearby
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Available
          </Button>
        </div>
      </div>

      {/* Players List */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Nearby Players</h3>
          <p className="text-sm text-muted-foreground">{players.length} found</p>
        </div>
        
        <div className="space-y-4">
          {players.map((player, index) => (
            <Card key={index} className="p-4 bg-gradient-card shadow-neomorph">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">
                      {player.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{player.name}</h4>
                      {player.available && (
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{player.username}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {player.location}
                      </div>
                      <span>★ {player.rating}</span>
                      <span>{player.matches} matches</span>
                    </div>
                  </div>
                </div>
                
                {/* Sport & Level */}
                <div className="flex flex-col items-end space-y-2">
                  <SportIcon sport={player.sport as any} size="sm" />
                  <Badge 
                    variant="outline" 
                    className={`text-xs border-none ${
                      player.level === 'Expert' || player.level === 'Pro' 
                        ? 'bg-primary/20 text-primary' 
                        : player.level === 'Advanced'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-warning/20 text-warning'
                    }`}
                  >
                    {player.level}
                  </Badge>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="neomorph" 
                  size="sm" 
                  className="flex-1"
                  disabled={!player.available}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {player.available ? 'Invite' : 'Offline'}
                </Button>
                
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <div className="px-6 py-4">
        <Button variant="hero" className="w-full">
          <UserPlus className="w-5 h-5 mr-2" />
          Create Team from Selected Players
        </Button>
      </div>
    </MobileContainer>
  );
};