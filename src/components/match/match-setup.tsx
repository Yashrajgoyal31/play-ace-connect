import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { ArrowLeft, Users, MapPin, Clock, Settings } from "lucide-react";

interface MatchSetupProps {
  sport: string;
  onBack: () => void;
  onStartMatch: () => void;
}

export const MatchSetup = ({ sport, onBack, onStartMatch }: MatchSetupProps) => {
  const [matchType, setMatchType] = useState<'singles' | 'doubles'>('singles');
  const [bestOf, setBestOf] = useState(3);
  const [venue, setVenue] = useState('');
  
  const sportConfig = {
    badminton: { name: 'Badminton', formats: ['Singles', 'Doubles'], sets: [1, 3, 5] },
    tennis: { name: 'Tennis', formats: ['Singles', 'Doubles'], sets: [1, 3, 5] },
    basketball: { name: 'Basketball', formats: ['5v5', '3v3'], sets: [1, 2, 4] },
    'table-tennis': { name: 'Table Tennis', formats: ['Singles', 'Doubles'], sets: [1, 3, 5, 7] }
  };

  const config = sportConfig[sport as keyof typeof sportConfig] || sportConfig.badminton;

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <SportIcon sport={sport as any} size="sm" />
          <h1 className="text-lg font-semibold">{config.name} Setup</h1>
        </div>
        
        <div className="w-10"></div>
      </div>

      {/* Match Format */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Match Format</h3>
        <div className="grid grid-cols-2 gap-3">
          {config.formats.map((format) => (
            <Card 
              key={format}
              className={`p-4 cursor-pointer active:scale-95 transition-all ${
                (format.toLowerCase() === 'singles' && matchType === 'singles') ||
                (format.toLowerCase().includes('doubles') && matchType === 'doubles') ||
                (format.includes('v') && matchType === 'singles')
                  ? 'bg-primary/20 border border-primary' 
                  : 'bg-gradient-card'
              }`}
              onClick={() => setMatchType(format.toLowerCase().includes('doubles') ? 'doubles' : 'singles')}
            >
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-medium">{format}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Of */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Best Of</h3>
        <div className="flex space-x-3">
          {config.sets.map((sets) => (
            <Badge 
              key={sets}
              variant={bestOf === sets ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 ${
                bestOf === sets ? 'bg-primary text-primary-foreground' : 'bg-card'
              }`}
              onClick={() => setBestOf(sets)}
            >
              Best of {sets}
            </Badge>
          ))}
        </div>
      </div>

      {/* Players/Teams */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Players</h3>
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary-foreground">A</span>
                </div>
                <div>
                  <p className="font-medium">Alice Johnson (You)</p>
                  <p className="text-xs text-muted-foreground">Host</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card/50 border-2 border-dashed border-border cursor-pointer">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>Add {matchType === 'doubles' ? 'Team/Players' : 'Opponent'}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Venue */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Venue</h3>
        <Card className="p-4 bg-card/50 border-2 border-dashed border-border cursor-pointer">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>Select Court/Venue</span>
          </div>
        </Card>
      </div>

      {/* Match Rules */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium">Match Rules</p>
                <p className="text-xs text-muted-foreground">Timeouts, Service rules, Scoring</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Configure</Button>
          </div>
        </Card>
      </div>

      {/* Start Match */}
      <div className="px-6 py-6 fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md">
        <div className="max-w-md mx-auto">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={onStartMatch}
          >
            Start {config.name} Match
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};