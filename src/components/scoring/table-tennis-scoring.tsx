import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Pause, Share } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TableTennisScoringProps {
  onBack: () => void;
  onEndMatch: () => void;
  matchSetup: {
    players: { teamA: string[]; teamB: string[] };
    bestOf: number;
    pointsPerGame: 11 | 21;
  };
}

export const TableTennisScoring = ({ onBack, onEndMatch, matchSetup }: TableTennisScoringProps) => {
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });
  const [games, setGames] = useState({ teamA: 0, teamB: 0 });
  const [currentGame, setCurrentGame] = useState(1);
  const [servingSide, setServingSide] = useState<'A' | 'B'>('A');
  const [gameActive, setGameActive] = useState(true);
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [pendingPoint, setPendingPoint] = useState<'A' | 'B' | null>(null);
  const [serviceCount, setServiceCount] = useState(0);
  const [ralliesPlayed, setRalliesPlayed] = useState(0);
  const [gameHistory, setGameHistory] = useState<Array<{
    scorer: string;
    strokeType: string;
    rallyLength: number;
    timestamp: Date;
  }>>([]);

  const strokeTypes = [
    'Forehand Drive', 'Backhand Drive', 'Forehand Loop', 'Backhand Loop',
    'Forehand Smash', 'Backhand Smash', 'Forehand Push', 'Backhand Push',
    'Forehand Chop', 'Backhand Chop', 'Forehand Flick', 'Backhand Flick',
    'Serve Winner', 'Return Winner', 'Block', 'Lob', 'Drop Shot',
    'Unforced Error (Opponent)'
  ];

  const addPoint = (team: 'A' | 'B', player: string, strokeType: string) => {
    if (!gameActive) return;
    
    const newScore = { ...score };
    newScore[team === 'A' ? 'teamA' : 'teamB']++;
    setScore(newScore);
    setRalliesPlayed(ralliesPlayed + 1);
    
    // Record the point details
    setGameHistory([...gameHistory, {
      scorer: player,
      strokeType,
      rallyLength: Math.floor(Math.random() * 20) + 1, // Random rally length for demo
      timestamp: new Date()
    }]);

    // Service change logic
    const totalPoints = newScore.teamA + newScore.teamB;
    const { pointsPerGame } = matchSetup;
    
    if (totalPoints >= 20 && pointsPerGame === 11) {
      // Deuce: alternate service every point
      setServingSide(servingSide === 'A' ? 'B' : 'A');
    } else {
      // Normal service: every 2 points
      const newServiceCount = serviceCount + 1;
      if (newServiceCount >= 2) {
        setServingSide(servingSide === 'A' ? 'B' : 'A');
        setServiceCount(0);
      } else {
        setServiceCount(newServiceCount);
      }
    }
    
    // Check for game win
    const teamScore = newScore[team === 'A' ? 'teamA' : 'teamB'];
    const opponentScore = newScore[team === 'A' ? 'teamB' : 'teamA'];
    
    if (teamScore >= pointsPerGame && teamScore - opponentScore >= 2) {
      // Game won
      const newGames = { ...games };
      newGames[team === 'A' ? 'teamA' : 'teamB']++;
      setGames(newGames);
      
      // Check for match win
      const gamesToWin = Math.ceil(matchSetup.bestOf / 2);
      if (newGames.teamA === gamesToWin || newGames.teamB === gamesToWin) {
        setGameActive(false);
      } else {
        // Start new game
        setScore({ teamA: 0, teamB: 0 });
        setCurrentGame(currentGame + 1);
        setServiceCount(0);
        // Server alternates for new game
        setServingSide(currentGame % 2 === 1 ? 'B' : 'A');
      }
    }
    
    setShowPlayerSelect(false);
    setPendingPoint(null);
  };

  const handlePointClick = (team: 'A' | 'B') => {
    setPendingPoint(team);
    setShowPlayerSelect(true);
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
          <span className="text-sm font-medium">Game {currentGame}</span>
        </div>
        
        <Button variant="ghost" size="icon">
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Games Won */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-gradient-card">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Games Won</p>
              <p className="text-2xl font-bold">{games.teamA}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              Best of {matchSetup.bestOf} • First to {matchSetup.pointsPerGame}
            </Badge>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Games Won</p>
              <p className="text-2xl font-bold">{games.teamB}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Score */}
      <div className="px-6 py-4">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-2">
                {servingSide === 'A' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
                )}
                <p className="font-semibold">Team A</p>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {matchSetup.players.teamA.join(' & ')}
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
              <div className="mt-2 text-xs text-muted-foreground">
                Service: {servingSide === 'A' ? 'Left' : 'Right'}
              </div>
            </div>
            
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-2">
                <p className="font-semibold">Team B</p>
                {servingSide === 'B' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse ml-2"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {matchSetup.players.teamB.join(' & ')}
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

          {/* Rally Stats */}
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <span>Rallies: {ralliesPlayed}</span>
            <span>Service Count: {serviceCount + 1}/2</span>
          </div>
        </Card>
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
                <div className="grid grid-cols-2 gap-2">
                  {strokeTypes.map((stroke) => (
                    <Button
                      key={stroke}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => addPoint(pendingPoint!, player, stroke)}
                    >
                      {stroke}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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

      {/* Match Info */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-card/50">
          <div className="flex justify-between text-sm">
            <span>Table 1, TT Center</span>
            <span>Duration: {Math.floor(ralliesPlayed / 10)}:{ralliesPlayed % 10 < 10 ? '0' : ''}{ralliesPlayed % 10}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Best of {matchSetup.bestOf} • {matchSetup.pointsPerGame} points</span>
            <span>Service alternates every 2 points</span>
          </div>
        </Card>
      </div>
    </MobileContainer>
  );
};