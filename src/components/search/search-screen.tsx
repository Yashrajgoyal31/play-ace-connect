import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileContainer } from "@/components/ui/mobile-container";
import { ArrowLeft, Search, QrCode, Mic, Clock, MapPin, Trophy, Users, Target } from "lucide-react";
import { PlayersScreen } from "@/components/players/players-screen";

interface SearchScreenProps {
  onBack: () => void;
  userType: 'organization' | 'individual';
}

export const SearchScreen = ({ onBack, userType }: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFindPlayers, setShowFindPlayers] = useState(false);
  
  const recentSearches = ["Sarah Johnson", "City Championship", "Tennis Players", "Badminton Courts"];
  
  const goToOptions = [
    { 
      icon: MapPin, 
      label: "Matches Near Me", 
      onClick: () => console.log("Navigate to nearby matches") 
    },
    { 
      icon: Trophy, 
      label: "Tournaments Near Me", 
      onClick: () => console.log("Navigate to nearby tournaments") 
    },
    { 
      icon: Users, 
      label: "Find Players", 
      onClick: () => setShowFindPlayers(true)
    },
    { 
      icon: Target, 
      label: "Challenges", 
      onClick: () => console.log("Navigate to challenges") 
    },
  ];

  if (showFindPlayers) {
    return <PlayersScreen onBack={() => setShowFindPlayers(false)} />;
  }

  return (
    <MobileContainer className="pb-24">
      {/* Header with Search Bar */}
      <div className="p-4 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
            <Input
              placeholder={userType === 'individual' ? "Search players, matches..." : "Search tournaments, organizations..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 border-none focus-visible:ring-1"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
              <QrCode className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Mic className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-foreground" />
            <h2 className="text-xl font-bold">Recent</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Clear
          </Button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {recentSearches.map((search, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex-shrink-0 rounded-full bg-card hover:bg-accent/10"
            >
              {search}
            </Button>
          ))}
        </div>
      </div>

      {/* Go To Section */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-4">Go To</h2>
        
        <div className="space-y-2">
          {goToOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full flex items-center justify-between p-4 bg-card hover:bg-accent/5 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <option.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-base font-medium">{option.label}</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </button>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};