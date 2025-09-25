import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { ArrowLeft, Share, Edit, Trophy, Target, Zap } from "lucide-react";

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold">Profile</h1>
        
        <Button variant="ghost" size="icon">
          <Share className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Header */}
      <div className="px-6 py-6">
        <Card className="p-6 bg-gradient-card shadow-neomorph text-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-glow-primary">
            <span className="text-3xl font-bold text-primary-foreground">A</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2">Alice Johnson</h2>
          <p className="text-muted-foreground mb-4">@alice_athlete</p>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-gradient-accent text-accent-foreground border-none">
              Pro Player
            </Badge>
            <Badge variant="outline" className="bg-success/20 text-success border-none">
              Active
            </Badge>
          </div>
          
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-gradient-card shadow-neomorph">
            <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">47</p>
            <p className="text-xs text-muted-foreground">Matches Won</p>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-card shadow-neomorph">
            <Target className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">73%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-card shadow-neomorph">
            <Zap className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </Card>
        </div>
      </div>

      {/* Favorite Sports */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Your Sports</h3>
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-card shadow-neomorph">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SportIcon sport="badminton" size="md" />
                <div>
                  <p className="font-medium">Badminton</p>
                  <p className="text-xs text-muted-foreground">Primary Sport • 28 matches</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/20 text-primary border-none text-xs">
                Expert
              </Badge>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-neomorph">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SportIcon sport="tennis" size="md" />
                <div>
                  <p className="font-medium">Tennis</p>
                  <p className="text-xs text-muted-foreground">Secondary • 15 matches</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-accent/20 text-accent border-none text-xs">
                Advanced
              </Badge>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-neomorph">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SportIcon sport="basketball" size="md" />
                <div>
                  <p className="font-medium">Basketball</p>
                  <p className="text-xs text-muted-foreground">Casual • 4 matches</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-warning/20 text-warning border-none text-xs">
                Intermediate
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          <Card className="p-3 bg-gradient-card shadow-neomorph">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tournament Champion</p>
                <p className="text-xs text-muted-foreground">Raipur Open Badminton • 2 days ago</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 bg-gradient-card shadow-neomorph">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Winning Streak</p>
                <p className="text-xs text-muted-foreground">8 consecutive wins • 1 week ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MobileContainer>
  );
};