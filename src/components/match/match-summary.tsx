import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Zap, Share, Home, RotateCcw } from "lucide-react";

interface MatchSummaryProps {
  onHome: () => void;
  onPlayAgain: () => void;
}

export const MatchSummary = ({ onHome, onPlayAgain }: MatchSummaryProps) => {
  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-b from-card to-card-elevated">
        <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-glow-primary animate-pulse">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Match Complete!</h1>
        <p className="text-muted-foreground">Great game - here's how it went</p>
      </div>

      {/* Final Score */}
      <div className="px-6 py-6">
        <Card className="p-6 bg-gradient-card shadow-neomorph">
          <div className="text-center mb-6">
            <Badge variant="outline" className="bg-success/20 text-success border-none mb-4">
              VICTORY
            </Badge>
            <h2 className="text-lg font-semibold mb-2">Badminton • Singles</h2>
            <p className="text-sm text-muted-foreground">Court 3, SportsPlex • 1h 15m</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-3 flex items-center justify-center shadow-glow-primary">
                <span className="text-xl font-bold text-primary-foreground">A</span>
              </div>
              <p className="font-semibold mb-1">Alice Johnson</p>
              <p className="text-xs text-muted-foreground mb-3">Winner</p>
              <div className="bg-primary/10 rounded-xl px-3 py-2">
                <p className="text-lg font-bold">2</p>
                <p className="text-xs text-muted-foreground">Sets</p>
              </div>
            </div>
            
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-muted-foreground">VS</p>
            </div>
            
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold">B</span>
              </div>
              <p className="font-semibold mb-1">Bob Smith</p>
              <p className="text-xs text-muted-foreground mb-3">Runner-up</p>
              <div className="bg-muted/50 rounded-xl px-3 py-2">
                <p className="text-lg font-bold">1</p>
                <p className="text-xs text-muted-foreground">Sets</p>
              </div>
            </div>
          </div>
          
          {/* Set Breakdown */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <h3 className="text-sm font-medium mb-3">Set Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Set 1:</span>
                <span className="font-medium">21 - 15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Set 2:</span>
                <span className="font-medium">19 - 21</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Set 3:</span>
                <span className="font-medium">21 - 18</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Stats */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Your Performance</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-gradient-card shadow-neomorph">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold">67%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-card shadow-neomorph">
            <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-xl font-bold">23</p>
            <p className="text-xs text-muted-foreground">Winners</p>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-card shadow-neomorph">
            <Trophy className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-xl font-bold">MVP</p>
            <p className="text-xs text-muted-foreground">Match Hero</p>
          </Card>
        </div>
      </div>

      {/* AI Insights */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
        <Card className="p-4 bg-gradient-accent/10 shadow-neomorph border border-accent/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Great comeback in Set 3!</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your serve consistency improved 40% after the second set timeout. 
                Keep working on backhand returns - you won 78% of net rallies.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Social Share */}
      <div className="px-6 py-4">
        <Card className="p-4 bg-gradient-card shadow-neomorph">
          <h4 className="font-medium mb-3">Share Your Victory</h4>
          <div className="bg-primary/5 rounded-xl p-4 mb-4">
            <p className="text-sm text-center">
              🏸 Just won 2-1 against Bob Smith in an epic badminton match! 
              67% accuracy, 23 winners. Getting stronger every game! 
              #Forehand #BadmintonLife
            </p>
          </div>
          <Button variant="accent" className="w-full">
            <Share className="w-4 h-4 mr-2" />
            Share on Social
          </Button>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 space-y-3">
        <Button variant="hero" className="w-full" onClick={onPlayAgain}>
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
        
        <Button variant="outline" className="w-full" onClick={onHome}>
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </MobileContainer>
  );
};