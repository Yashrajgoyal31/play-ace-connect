import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, MapPin, Users, Target, Home } from "lucide-react";

interface BottomNavigationProps {
  userType: 'organization' | 'individual';
  currentSection?: 'home' | 'tournaments' | 'rankings' | 'players' | 'stats';
  onNavigateHome: () => void;
  onNavigateTournaments: () => void;
  onNavigateRankings?: () => void;
  onNavigatePlayers?: () => void;
  onNavigateStats?: () => void;
}

export const BottomNavigation = ({
  userType,
  currentSection = 'home',
  onNavigateHome,
  onNavigateTournaments,
  onNavigateRankings,
  onNavigatePlayers,
  onNavigateStats
}: BottomNavigationProps) => {
  const isActive = (section: string) => currentSection === section;

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card-elevated/95 backdrop-blur-md border-t border-border/50 z-50">
      <div className="flex items-center justify-around py-3 px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`flex-col space-y-1 ${isActive('home') ? 'text-accent' : ''}`}
          onClick={onNavigateHome}
        >
          {isActive('home') ? (
            <div className="w-6 h-6 bg-accent rounded-full shadow-glow-primary"></div>
          ) : (
            <Home className="w-5 h-5" />
          )}
          <span className="text-xs font-medium">Home</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={`flex-col space-y-1 ${isActive('tournaments') ? 'text-accent' : ''}`}
          onClick={onNavigateTournaments}
        >
          <Trophy className={`w-5 h-5 ${isActive('tournaments') ? 'text-accent' : ''}`} />
          <span className="text-xs">Tournaments</span>
        </Button>
        
        {userType === 'individual' ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`flex-col space-y-1 ${isActive('rankings') ? 'text-accent' : ''}`}
              onClick={onNavigateRankings}
            >
              <TrendingUp className={`w-5 h-5 ${isActive('rankings') ? 'text-accent' : ''}`} />
              <span className="text-xs">Rankings</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`flex-col space-y-1 ${isActive('players') ? 'text-accent' : ''}`}
              onClick={onNavigatePlayers}
            >
              <Users className={`w-5 h-5 ${isActive('players') ? 'text-accent' : ''}`} />
              <span className="text-xs">Find Players</span>
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`flex-col space-y-1 ${isActive('rankings') ? 'text-accent' : ''}`}
              onClick={onNavigateRankings}
            >
              <TrendingUp className={`w-5 h-5 ${isActive('rankings') ? 'text-accent' : ''}`} />
              <span className="text-xs">Rankings</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`flex-col space-y-1 ${isActive('stats') ? 'text-accent' : ''}`}
              onClick={onNavigateStats}
            >
              <Target className={`w-5 h-5 ${isActive('stats') ? 'text-accent' : ''}`} />
              <span className="text-xs">Stats</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};