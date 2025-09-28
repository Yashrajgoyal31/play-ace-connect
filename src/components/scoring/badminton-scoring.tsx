import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Pause, Share, UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BadmintonScoringProps {
  onBack: () => void;
  onEndMatch: () => void;
  matchSetup: {
    players: { teamA: string[]; teamB: string[] };
    format: 'singles' | 'doubles';
    bestOf: number;
    officials?: {
      umpire?: string;
      serviceJudge?: string;
      lineJudges?: string[];
    };
    scorers?: string[];
  };
}

export const BadmintonScoring = ({ onBack, onEndMatch, matchSetup }: BadmintonScoringProps) => {
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [sets, setSets] = useState({ teamA: 0, teamB: 0 });
  const [currentSet, setCurrentSet] = useState(1);
  const [servingSide, setServingSide] = useState<'A' | 'B'>('A');
  const [gameActive, setGameActive] = useState(true);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [pendingPoint, setPendingPoint] = useState<'A' | 'B' | null>(null);
  const [gameHistory, setGameHistory] = useState<Array<{
    scorer: string;
    shotType: string;
    courtPosition: string;
    timestamp: Date;
  }>>([]);

  const shotTypes = [
    'Smash', 'Clear', 'Drop Shot', 'Net Shot', 'Drive', 'Lob', 
    'Cross Court', 'Down the Line', 'Serve Ace', 'Return Winner',
    'Net Kill', 'Half Smash', 'Deception Shot', 'Unforced Error (Opponent)'
  ];

  const courtPositions = ['Front Court', 'Mid Court', 'Back Court', 'Net'];

  const addPoint = (team: 'A' | 'B', player: string, shotType: string, courtPosition: string) => {
    if (!gameActive) return;
    
    const newScore = { ...score };
    newScore[team === 'A' ? 'teamA' : 'teamB']++;
    setScore(newScore);
    
    // Record the point details
    setGameHistory([...gameHistory, {
      scorer: player,
      shotType,
      courtPosition,
      timestamp: new Date()
    }]);
    
    // Change serving side
    setServingSide(servingSide === 'A' ? 'B' : 'A');
    
    // Check for set win (first to 21, must win by 2, or 30 in deuce)
    const teamScore = newScore[team === 'A' ? 'teamA' : 'teamB'];
    const opponentScore = newScore[team === 'A' ? 'teamB' : 'teamA'];
    
    if ((teamScore >= 21 && teamScore - opponentScore >= 2) || teamScore === 30) {
      // Set won
      const newSets = { ...sets };
      newSets[team === 'A' ? 'teamA' : 'teamB']++;
      setSets(newSets);
      
      // Check for match win
      const setsToWin = Math.ceil(matchSetup.bestOf / 2);
      if (newSets.teamA === setsToWin || newSets.teamB === setsToWin) {
        setGameActive(false);
      } else {
        // Start new set
        setScore({ teamA: 0, teamB: 0 });
        setCurrentSet(currentSet + 1);
      }
    }
    
    setShowPlayerSelect(false);
    setPendingPoint(null);
  };

  const handlePointClick = (team: 'A' | 'B') => {
    setPendingPoint(team);
    setShowPlayerSelect(true);
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
            <Badge variant="outline" className="text-xs">Best of {matchSetup.bestOf}</Badge>
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
              <p className="text-xs text-muted-foreground mb-2">
                {matchSetup.format === 'singles' 
                  ? matchSetup.players.teamA[0] 
                  : matchSetup.players.teamA.join(' & ')
                }
              </p>
              
              <Button 
                variant="neomorph" 
                size="xl"
                className="w-24 h-24 text-4xl font-bold bg-primary/5"
                onClick={() => handlePointClick('A')}
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
              <p className="text-xs text-muted-foreground mb-2">
                {matchSetup.format === 'singles' 
                  ? matchSetup.players.teamB[0] 
                  : matchSetup.players.teamB.join(' & ')
                }
              </p>
              
              <Button 
                variant="neomorph" 
                size="xl"
                className="w-24 h-24 text-4xl font-bold bg-accent/5"
                onClick={() => handlePointClick('B')}
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

      {/* Player Selection Dialog */}
      <Dialog open={showPlayerSelect} onOpenChange={setShowPlayerSelect}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Point Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {(pendingPoint === 'A' ? matchSetup.players.teamA : matchSetup.players.teamB).map((player) => (
              <div key={player} className="space-y-3">
                <p className="text-sm font-medium">{player} - How was the point won?</p>
                
                <div className="grid grid-cols-1 gap-3">
                  {shotTypes.map((shot) => (
                    <div key={shot} className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">{shot}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {courtPositions.map((position) => (
                          <Button
                            key={`${shot}-${position}`}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => addPoint(pendingPoint!, player, shot, position)}
                          >
                            {position}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Officials & Scorers */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-card/50">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <p className="text-sm font-medium">Match Officials</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">Umpire:</p>
                <p className="font-medium">{matchSetup.officials?.umpire || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Service Judge:</p>
                <p className="font-medium">{matchSetup.officials?.serviceJudge || 'Not assigned'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-xs">
              {matchSetup.officials?.lineJudges && matchSetup.officials.lineJudges.length > 0 && (
                <div>
                  <p className="text-muted-foreground">Line Judges:</p>
                  <p className="font-medium">{matchSetup.officials.lineJudges.join(', ')}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Scorers:</p>
                <p className="font-medium">
                  {matchSetup.scorers?.join(', ') || 'Auto-scoring'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Match Info */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-card/50">
          <div className="flex justify-between text-sm">
            <span>Court 3, SportsPlex</span>
            <span>15:30 - 16:45</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{matchSetup.format} • Best of {matchSetup.bestOf}</span>
            <span>Duration: 1:15</span>
          </div>
        </Card>
      </div>
    </MobileContainer>
  );
};