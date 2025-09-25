import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { SportIcon } from "@/components/ui/sport-icon";
import { ArrowLeft } from "lucide-react";

interface SportSelectionProps {
  onBack: () => void;
  onSelectSport: (sport: string) => void;
  userActiveSports?: string[];
}

export const SportSelection = ({ onBack, onSelectSport, userActiveSports = ['badminton', 'tennis', 'basketball', 'table-tennis'] }: SportSelectionProps) => {
  const sports = [
    { id: 'badminton', name: 'Badminton', description: 'Doubles or Singles' },
    { id: 'tennis', name: 'Tennis', description: 'Court game with rackets' },
    { id: 'basketball', name: 'Basketball', description: '5v5 or pickup games' },
    { id: 'table-tennis', name: 'Table Tennis', description: 'Fast-paced indoor sport' },
    { id: 'pickleball', name: 'Pickleball', description: 'Mix of tennis & badminton' },
    { id: 'golf', name: 'Golf', description: 'Individual stroke play' }
  ];

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold">Select Sport</h1>
        
        <div className="w-10"></div>
      </div>

      {/* Your Active Sports */}
      {userActiveSports.length > 0 && (
        <div className="px-6 py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Active Sports</h3>
          <div className="space-y-2">
            {sports
              .filter(sport => userActiveSports.includes(sport.id))
              .map((sport) => (
                <Card 
                  key={sport.id}
                  className="p-4 bg-gradient-card cursor-pointer active:scale-95 transition-transform"
                  onClick={() => onSelectSport(sport.id)}
                >
                  <div className="flex items-center space-x-3">
                    <SportIcon sport={sport.id as any} size="md" />
                    <div className="flex-1">
                      <p className="font-medium">{sport.name}</p>
                      <p className="text-xs text-muted-foreground">{sport.description}</p>
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* All Sports */}
      <div className="px-6 py-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">All Sports</h3>
        <div className="space-y-2">
          {sports.map((sport) => (
            <Card 
              key={sport.id}
              className={`p-4 bg-gradient-card cursor-pointer active:scale-95 transition-transform ${
                userActiveSports.includes(sport.id) ? 'opacity-50' : ''
              }`}
              onClick={() => onSelectSport(sport.id)}
            >
              <div className="flex items-center space-x-3">
                <SportIcon sport={sport.id as any} size="md" />
                <div className="flex-1">
                  <p className="font-medium">{sport.name}</p>
                  <p className="text-xs text-muted-foreground">{sport.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};