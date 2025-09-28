import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Pause, Share, Clock, Users, UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BasketballScoringProps {
  onBack: () => void;
  onEndMatch: () => void;
  matchSetup: {
    players: { teamA: string[]; teamB: string[] };
    quarters: number;
    quarterLength: number; // minutes
    officials?: {
      referee?: string;
      umpire1?: string;
      umpire2?: string;
      scorekeeper?: string;
      timekeeper?: string;
    };
    scorers?: string[];
  };
}

export const BasketballScoring = ({ onBack, onEndMatch, matchSetup }: BasketballScoringProps) => {
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [quarter, setQuarter] = useState(1);
  const [timeLeft, setTimeLeft] = useState(matchSetup.quarterLength * 60); // seconds
  const [gameActive, setGameActive] = useState(false);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [pendingShot, setPendingShot] = useState<{ team: 'A' | 'B', points: number } | null>(null);
  const [fouls, setFouls] = useState({ teamA: 0, teamB: 0 });
  const [timeouts, setTimeouts] = useState({ teamA: 3, teamB: 3 });
  const [gameHistory, setGameHistory] = useState<Array<{
    scorer: string;
    shotType: string;
    points: number;
    quarter: number;
    timeRemaining: number;
    timestamp: Date;
  }>>([]);

  const shotTypes = {
    2: ['Layup', 'Dunk', 'Close Range', 'Mid-Range Jumper', 'Hook Shot', 'Turnaround Jumper', 'Post Move'],
    3: ['Three-Point Shot', 'Corner Three', 'Step-back Three', 'Catch & Shoot Three'],
    1: ['Free Throw']
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameActive(false);
            if (quarter < matchSetup.quarters) {
              // End of quarter
              setTimeout(() => {
                setQuarter(quarter + 1);
                setTimeLeft(matchSetup.quarterLength * 60);
              }, 2000);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft, quarter, matchSetup.quarters, matchSetup.quarterLength]);

  const addScore = (team: 'A' | 'B', points: number, player: string, shotType: string) => {
    const newScore = { ...score };
    newScore[team === 'A' ? 'teamA' : 'teamB'] += points;
    setScore(newScore);
    
    // Record the shot details
    setGameHistory([...gameHistory, {
      scorer: player,
      shotType,
      points,
      quarter,
      timeRemaining: timeLeft,
      timestamp: new Date()
    }]);
    
    setShowPlayerSelect(false);
    setPendingShot(null);
  };

  const handleShotClick = (team: 'A' | 'B', points: number) => {
    setPendingShot({ team, points });
    setShowPlayerSelect(true);
  };

  const addFoul = (team: 'A' | 'B') => {
    const newFouls = { ...fouls };
    newFouls[team === 'A' ? 'teamA' : 'teamB']++;
    setFouls(newFouls);
  };

  const useTimeout = (team: 'A' | 'B') => {
    const newTimeouts = { ...timeouts };
    if (newTimeouts[team === 'A' ? 'teamA' : 'teamB'] > 0) {
      newTimeouts[team === 'A' ? 'teamA' : 'teamB']--;
      setTimeouts(newTimeouts);
      setGameActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isGameFinished = quarter > matchSetup.quarters || (quarter === matchSetup.quarters && timeLeft === 0);

  return (
    <MobileContainer>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/20 text-success">
            {gameActive ? 'LIVE' : isGameFinished ? 'FINISHED' : 'PAUSED'}
          </Badge>
          <span className="text-sm font-medium">Q{quarter}</span>
        </div>
        
        <Button variant="ghost" size="icon">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Game Clock */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-gradient-card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-2xl font-bold font-mono">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Quarter {quarter} of {matchSetup.quarters}
          </div>
          
          {!isGameFinished && (
            <Button 
              variant={gameActive ? "outline" : "hero"} 
              size="sm" 
              className="mt-2"
              onClick={() => setGameActive(!gameActive)}
            >
              {gameActive ? 'Pause' : 'Start'}
            </Button>
          )}
        </Card>
      </div>

      {/* Score Display */}
      <div className="px-6 py-4">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <p className="font-semibold mb-2">Team A</p>
              <p className="text-xs text-muted-foreground mb-4">
                {matchSetup.players.teamA.slice(0, 2).join(', ')}
                {matchSetup.players.teamA.length > 2 && ` +${matchSetup.players.teamA.length - 2}`}
              </p>
              
              <div className="text-6xl font-bold mb-4">{score.teamA}</div>
              
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Button 
                    variant="neomorph" 
                    size="sm"
                    className="bg-green-500/10 text-green-600"
                    onClick={() => handleShotClick('A', 1)}
                    disabled={!gameActive}
                  >
                    +1
                  </Button>
                  <Button 
                    variant="neomorph" 
                    size="sm"
                    className="bg-blue-500/10 text-blue-600"
                    onClick={() => handleShotClick('A', 2)}
                    disabled={!gameActive}
                  >
                    +2
                  </Button>
                  <Button 
                    variant="neomorph" 
                    size="sm"
                    className="bg-purple-500/10 text-purple-600"
                    onClick={() => handleShotClick('A', 3)}
                    disabled={!gameActive}
                  >
                    +3
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-muted-foreground">VS</p>
            </div>
            
            <div className="text-center flex-1">
              <p className="font-semibold mb-2">Team B</p>
              <p className="text-xs text-muted-foreground mb-4">
                {matchSetup.players.teamB.slice(0, 2).join(', ')}
                {matchSetup.players.teamB.length > 2 && ` +${matchSetup.players.teamB.length - 2}`}
              </p>
              
              <div className="text-6xl font-bold mb-4">{score.teamB}</div>
              
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Button 
                    variant="neomorph" 
                    size="sm"
                    className="bg-green-500/10 text-green-600"
                    onClick={() => handleShotClick('B', 1)}
                    disabled={!gameActive}
                  >
                    +1
                  </Button>
                  <Button 
                    variant="neomorph" 
                    size="sm"
                    className="bg-blue-500/10 text-blue-600"
                    onClick={() => handleShotClick('B', 2)}
                    disabled={!gameActive}
                  >
                    +2
                  </Button>
                  <Button 
                    variant="neomorph" 
                    size="sm"
                    className="bg-purple-500/10 text-purple-600"
                    onClick={() => handleShotClick('B', 3)}
                    disabled={!gameActive}
                  >
                    +3
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Stats */}
      <div className="px-6 py-2">
        <Card className="p-4 bg-card/50">
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Fouls</p>
              <p className="font-semibold">{fouls.teamA}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-1 text-xs"
                onClick={() => addFoul('A')}
              >
                +Foul
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground">Timeouts</p>
              <p className="font-semibold">{timeouts.teamA} | {timeouts.teamB}</p>
              <div className="flex space-x-1 mt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => useTimeout('A')}
                  disabled={timeouts.teamA === 0}
                >
                  A
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => useTimeout('B')}
                  disabled={timeouts.teamB === 0}
                >
                  B
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground">Fouls</p>
              <p className="font-semibold">{fouls.teamB}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-1 text-xs"
                onClick={() => addFoul('B')}
              >
                +Foul
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Player Selection Dialog */}
      <Dialog open={showPlayerSelect} onOpenChange={setShowPlayerSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingShot?.points}-Point Shot - Who scored?
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {pendingShot && (pendingShot.team === 'A' ? matchSetup.players.teamA : matchSetup.players.teamB).map((player) => (
              <div key={player} className="space-y-3">
                <p className="text-sm font-medium">{player}</p>
                <div className="grid grid-cols-2 gap-2">
                  {shotTypes[pendingShot.points as keyof typeof shotTypes].map((shot) => (
                    <Button
                      key={shot}
                      variant="outline"
                      size="sm"
                      onClick={() => addScore(pendingShot.team, pendingShot.points, player, shot)}
                    >
                      {shot}
                    </Button>
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
              <p className="text-sm font-medium">Game Officials</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">Referee:</p>
                <p className="font-medium">{matchSetup.officials?.referee || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Umpire 1:</p>
                <p className="font-medium">{matchSetup.officials?.umpire1 || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Umpire 2:</p>
                <p className="font-medium">{matchSetup.officials?.umpire2 || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Scorekeeper:</p>
                <p className="font-medium">{matchSetup.officials?.scorekeeper || 'Auto'}</p>
              </div>
            </div>
            
            <div>
              <p className="text-muted-foreground text-xs">Scorers:</p>
              <p className="font-medium text-xs">
                {matchSetup.scorers?.join(', ') || 'Auto-scoring'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Game Controls */}
      <div className="px-6 space-y-4">
        {isGameFinished && (
          <Button variant="hero" className="w-full" onClick={onEndMatch}>
            Game Complete - View Summary
          </Button>
        )}
      </div>
    </MobileContainer>
  );
};