import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, MapPin, Users, Target, Home, Gift } from "lucide-react";

interface BottomNavigationProps {
  userType: 'organization' | 'individual';
  currentSection?: 'home' | 'tournaments' | 'rankings' | 'players' | 'teams' | 'rewards';
  onNavigateHome: () => void;
  onNavigateTournaments: () => void;
  onNavigateRankings?: () => void;
  onNavigatePlayers?: () => void;
  onNavigateTeams?: () => void;
  onNavigateRewards?: () => void;
}

export const BottomNavigation = ({
  userType,
  currentSection = 'home',
  onNavigateHome,
  onNavigateTournaments,
  onNavigateRankings,
  onNavigatePlayers,
  onNavigateTeams,
  onNavigateRewards
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
              className={`flex-col space-y-1 ${isActive('rewards') ? 'text-accent' : ''}`}
              onClick={onNavigateRewards}
            >
              <Gift className={`w-5 h-5 ${isActive('rewards') ? 'text-accent' : ''}`} />
              <span className="text-xs">Rewards</span>
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
              className={`flex-col space-y-1 ${isActive('teams') ? 'text-accent' : ''}`}
              onClick={onNavigateTeams}
            >
              <Users className={`w-5 h-5 ${isActive('teams') ? 'text-accent' : ''}`} />
              <span className="text-xs">Teams</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};