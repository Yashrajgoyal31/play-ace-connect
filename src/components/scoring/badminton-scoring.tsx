import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Pause, Share } from "lucide-react";

interface BadmintonScoringProps {
  onBack: () => void;
  onEndMatch: () => void;
}

export const BadmintonScoring = ({ onBack, onEndMatch }: BadmintonScoringProps) => {
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [sets, setSets] = useState({ teamA: 0, teamB: 0 });
  const [currentSet, setCurrentSet] = useState(1);
  const [servingSide, setServingSide] = useState<'A' | 'B'>('A');
  const [gameActive, setGameActive] = useState(true);

  const addPoint = (team: 'A' | 'B') => {
    if (!gameActive) return;
    
    const newScore = { ...score };
    newScore[team === 'A' ? 'teamA' : 'teamB']++;
    setScore(newScore);
    
    // Change serving side
    setServingSide(servingSide === 'A' ? 'B' : 'A');
    
    // Check for set win (first to 21, must win by 2)
    const teamScore = newScore[team === 'A' ? 'teamA' : 'teamB'];
    const opponentScore = newScore[team === 'A' ? 'teamB' : 'teamA'];
    
    if (teamScore >= 21 && teamScore - opponentScore >= 2) {
      // Set won
      const newSets = { ...sets };
      newSets[team === 'A' ? 'teamA' : 'teamB']++;
      setSets(newSets);
      
      // Check for match win (best of 3)
      if (newSets.teamA === 2 || newSets.teamB === 2) {
        setGameActive(false);
      } else {
        // Start new set
        setScore({ teamA: 0, teamB: 0 });
        setCurrentSet(currentSet + 1);
      }
    }
  };

  const undoLastPoint = () => {
    // Simple undo - could be enhanced with full game history
    setScore({ teamA: Math.max(0, score.teamA - 1), teamB: Math.max(0, score.teamB - 1) });
    setServingSide(servingSide === 'A' ? 'B' : 'A');
  };

  return (
    <MobileContainer>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/20 text-success">
            {gameActive ? 'LIVE' : 'FINISHED'}
          </Badge>
          <span className="text-sm font-medium">Set {currentSet}</span>
        </div>
        
        <Button variant="ghost" size="icon" onClick={undoLastPoint}>
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Score Display */}
      <div className="px-6 py-8">
        <Card className="p-6 bg-gradient-card shadow-neomorph">
          {/* Set Scores */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sets Won</p>
              <p className="text-lg font-bold">{sets.teamA}</p>
            </div>
            <Badge variant="outline" className="text-xs">Best of 3</Badge>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sets Won</p>
              <p className="text-lg font-bold">{sets.teamB}</p>
            </div>
          </div>

          {/* Current Scores */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-2">
                {servingSide === 'A' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
                )}
                <p className="font-semibold">Team A</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Alice & Bob</p>
              
              <Button 
                variant="neomorph" 
                size="xl"
                className="w-24 h-24 text-4xl font-bold bg-primary/5 hover:bg-primary/10"
                onClick={() => addPoint('A')}
                disabled={!gameActive}
              >
                {score.teamA}
              </Button>
            </div>
            
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-muted-foreground">VS</p>
            </div>
            
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-2">
                <p className="font-semibold">Team B</p>
                {servingSide === 'B' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse ml-2"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">Carol & Dave</p>
              
              <Button 
                variant="neomorph" 
                size="xl"
                className="w-24 h-24 text-4xl font-bold bg-accent/5 hover:bg-accent/10"
                onClick={() => addPoint('B')}
                disabled={!gameActive}
              >
                {score.teamB}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Game Controls */}
      <div className="px-6 space-y-4">
        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1">
            <Pause className="w-4 h-4 mr-2" />
            Timeout
          </Button>
          
          <Button variant="outline" className="flex-1">
            <Share className="w-4 h-4 mr-2" />
            Share Score
          </Button>
        </div>
        
        {!gameActive && (
          <Button variant="hero" className="w-full" onClick={onEndMatch}>
            Match Complete - View Summary
          </Button>
        )}
        
        {gameActive && (
          <Button variant="destructive" className="w-full" onClick={() => setGameActive(false)}>
            End Match Early
          </Button>
        )}
      </div>

      {/* Match Info */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-card/50">
          <div className="flex justify-between text-sm">
            <span>Court 3, SportsPlex</span>
            <span>15:30 - 16:45</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Singles • Best of 3</span>
            <span>Duration: 1:15</span>
          </div>
        </Card>
      </div>
    </MobileContainer>
  );
};