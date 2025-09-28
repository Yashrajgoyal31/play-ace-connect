import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Pause, Share, Users, UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TennisScoringProps {
  onBack: () => void;
  onEndMatch: () => void;
  matchSetup: {
    players: { teamA: string[]; teamB: string[] };
    format: 'singles' | 'doubles';
    bestOf: number;
    officials?: {
      umpire?: string;
      lineJudges?: string[];
      ballKids?: string[];
    };
    scorers?: string[];
  };
}

type TennisScore = 0 | 15 | 30 | 40 | 'AD';

export const TennisScoring = ({ onBack, onEndMatch, matchSetup }: TennisScoringProps) => {
  const [gameScore, setGameScore] = useState<{ teamA: TennisScore; teamB: TennisScore }>({ teamA: 0, teamB: 0 });
  const [setScore, setSetScore] = useState({ teamA: 0, teamB: 0 });
  const [matchScore, setMatchScore] = useState({ teamA: 0, teamB: 0 });
  const [currentSet, setCurrentSet] = useState(1);
  const [servingSide, setServingSide] = useState<'A' | 'B'>('A');
  const [servingPlayer, setServingPlayer] = useState(0); // Index in team
  const [gameActive, setGameActive] = useState(true);
  const [tiebreak, setTiebreak] = useState(false);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [pendingPoint, setPendingPoint] = useState<'A' | 'B' | null>(null);
  const [gameHistory, setGameHistory] = useState<Array<{
    scorer: string;
    shotType: string;
    timestamp: Date;
  }>>([]);

  const shotTypes = [
    'Ace', 'Winner', 'Forehand', 'Backhand', 'Volley', 'Smash', 'Drop Shot', 
    'Lob', 'Passing Shot', 'Return Winner', 'Unforced Error (Opponent)'
  ];

  const nextTennisScore = (current: TennisScore): TennisScore => {
    if (current === 0) return 15;
    if (current === 15) return 30;
    if (current === 30) return 40;
    return 'AD';
  };

  const addPoint = (team: 'A' | 'B', player: string, shotType: string) => {
    if (!gameActive) return;
    
    // Record the point details
    setGameHistory([...gameHistory, {
      scorer: player,
      shotType,
      timestamp: new Date()
    }]);

    if (tiebreak) {
      // Tiebreak scoring (0, 1, 2, 3...)
      const newScore = { ...setScore };
      newScore[team === 'A' ? 'teamA' : 'teamB']++;
      setSetScore(newScore);
      
      // Change server every 2 points in tiebreak
      if ((newScore.teamA + newScore.teamB) % 2 === 1) {
        setServingSide(servingSide === 'A' ? 'B' : 'A');
      }
      
      // Check tiebreak win (first to 7, must win by 2)
      const teamScore = newScore[team === 'A' ? 'teamA' : 'teamB'];
      const opponentScore = newScore[team === 'A' ? 'teamB' : 'teamA'];
      
      if (teamScore >= 7 && teamScore - opponentScore >= 2) {
        // Set won
        const newMatchScore = { ...matchScore };
        newMatchScore[team === 'A' ? 'teamA' : 'teamB']++;
        setMatchScore(newMatchScore);
        
        // Check match win
        const setsToWin = Math.ceil(matchSetup.bestOf / 2);
        if (newMatchScore.teamA === setsToWin || newMatchScore.teamB === setsToWin) {
          setGameActive(false);
        } else {
          // Start new set
          setSetScore({ teamA: 0, teamB: 0 });
          setGameScore({ teamA: 0, teamB: 0 });
          setCurrentSet(currentSet + 1);
          setTiebreak(false);
        }
      }
    } else {
      // Regular game scoring
      const newGameScore = { ...gameScore };
      const currentTeamScore = newGameScore[team === 'A' ? 'teamA' : 'teamB'];
      const opponentScore = newGameScore[team === 'A' ? 'teamB' : 'teamA'];
      
      if (currentTeamScore === 40 && opponentScore !== 40 && opponentScore !== 'AD') {
        // Game won
        const newSetScore = { ...setScore };
        newSetScore[team === 'A' ? 'teamA' : 'teamB']++;
        setSetScore(newSetScore);
        setGameScore({ teamA: 0, teamB: 0 });
        
        // Change server
        setServingSide(servingSide === 'A' ? 'B' : 'A');
        
        // Check for set win or tiebreak
        const teamSetScore = newSetScore[team === 'A' ? 'teamA' : 'teamB'];
        const opponentSetScore = newSetScore[team === 'A' ? 'teamB' : 'teamA'];
        
        if (teamSetScore >= 6 && teamSetScore - opponentSetScore >= 2) {
          // Set won
          const newMatchScore = { ...matchScore };
          newMatchScore[team === 'A' ? 'teamA' : 'teamB']++;
          setMatchScore(newMatchScore);
          
          // Check match win
          const setsToWin = Math.ceil(matchSetup.bestOf / 2);
          if (newMatchScore.teamA === setsToWin || newMatchScore.teamB === setsToWin) {
            setGameActive(false);
          } else {
            // Start new set
            setSetScore({ teamA: 0, teamB: 0 });
            setCurrentSet(currentSet + 1);
          }
        } else if (teamSetScore === 6 && opponentSetScore === 6) {
          // Start tiebreak
          setTiebreak(true);
          setSetScore({ teamA: 0, teamB: 0 });
        }
      } else if (currentTeamScore === 40 && opponentScore === 40) {
        // Deuce to advantage
        newGameScore[team === 'A' ? 'teamA' : 'teamB'] = 'AD';
        newGameScore[team === 'A' ? 'teamB' : 'teamA'] = 40;
        setGameScore(newGameScore);
      } else if (currentTeamScore === 'AD') {
        // Advantage to game win
        const newSetScore = { ...setScore };
        newSetScore[team === 'A' ? 'teamA' : 'teamB']++;
        setSetScore(newSetScore);
        setGameScore({ teamA: 0, teamB: 0 });
        setServingSide(servingSide === 'A' ? 'B' : 'A');
      } else if (currentTeamScore === 40 && opponentScore === 'AD') {
        // Back to deuce
        newGameScore.teamA = 40;
        newGameScore.teamB = 40;
        setGameScore(newGameScore);
      } else {
        // Normal point progression
        newGameScore[team === 'A' ? 'teamA' : 'teamB'] = nextTennisScore(currentTeamScore);
        setGameScore(newGameScore);
      }
    }
    
    setShowPlayerSelect(false);
    setPendingPoint(null);
  };

  const handlePointClick = (team: 'A' | 'B') => {
    setPendingPoint(team);
    setShowPlayerSelect(true);
  };

  const formatScore = (score: TennisScore | number): string => {
    if (tiebreak) return score.toString();
    if (score === 'AD') return 'AD';
    return score.toString();
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
          <span className="text-sm font-medium">
            {tiebreak ? 'Tiebreak' : `Set ${currentSet}`}
          </span>
        </div>
        
        <Button variant="ghost" size="icon">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Match Score */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-gradient-card">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sets</p>
              <p className="text-2xl font-bold">{matchScore.teamA}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              Best of {matchSetup.bestOf}
            </Badge>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sets</p>
              <p className="text-2xl font-bold">{matchScore.teamB}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Score */}
      <div className="px-6 py-4">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-2">
                {servingSide === 'A' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
                )}
                <p className="font-semibold">Team A</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {matchSetup.players.teamA.join(' & ')}
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Games: {setScore.teamA}
                </div>
                <Button 
                  variant="neomorph" 
                  size="xl"
                  className="w-24 h-24 text-4xl font-bold bg-primary/5"
                  onClick={() => handlePointClick('A')}
                  disabled={!gameActive}
                >
                  {formatScore(gameScore.teamA)}
                </Button>
              </div>
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
                {matchSetup.players.teamB.join(' & ')}
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Games: {setScore.teamB}
                </div>
                <Button 
                  variant="neomorph" 
                  size="xl"
                  className="w-24 h-24 text-4xl font-bold bg-accent/5"
                  onClick={() => handlePointClick('B')}
                  disabled={!gameActive}
                >
                  {formatScore(gameScore.teamB)}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Player Selection Dialog */}
      <Dialog open={showPlayerSelect} onOpenChange={setShowPlayerSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Who scored the point?</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Player:</p>
              <div className="grid grid-cols-1 gap-2">
                {(pendingPoint === 'A' ? matchSetup.players.teamA : matchSetup.players.teamB).map((player) => (
                  <div key={player}>
                    <p className="text-sm font-medium mb-2">{player}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {shotTypes.map((shot) => (
                        <Button
                          key={shot}
                          variant="outline"
                          size="sm"
                          onClick={() => addPoint(pendingPoint!, player, shot)}
                        >
                          {shot}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                <p className="text-muted-foreground">Scorers:</p>
                <p className="font-medium">
                  {matchSetup.scorers?.join(', ') || 'Auto-scoring'}
                </p>
              </div>
            </div>
            
            {matchSetup.officials?.lineJudges && matchSetup.officials.lineJudges.length > 0 && (
              <div>
                <p className="text-muted-foreground text-xs">Line Judges:</p>
                <p className="font-medium text-xs">{matchSetup.officials.lineJudges.join(', ')}</p>
              </div>
            )}
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
      </div>
    </MobileContainer>
  );
};