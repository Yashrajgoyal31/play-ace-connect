import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share, Edit, Trophy, Target, Zap, Sun, Moon, Medal, TrendingUp, Building2 } from "lucide-react";
import { useState } from "react";

interface ProfileScreenProps {
  onBack: () => void;
  onSwitchToOrganization?: (orgId: string) => void;
  userId?: string;
}

export const ProfileScreen = ({ onBack, onSwitchToOrganization, userId }: ProfileScreenProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedSport, setSelectedSport] = useState("badminton");
  
  const sportsStats = {
    badminton: { matches: 28, wins: 22, losses: 6, winRate: 79, points: 847 },
    tennis: { matches: 15, wins: 9, losses: 6, winRate: 60, points: 312 },
    basketball: { matches: 4, wins: 2, losses: 2, winRate: 50, points: 88 }
  };
  
  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold">Profile</h1>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 py-6">
        <Card className="p-6 bg-gradient-card text-center relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2">
            <Edit className="w-4 h-4" />
          </Button>
          
          <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-foreground">A</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2">Alice Johnson</h2>
          <p className="text-muted-foreground mb-4">@alice_athlete</p>
          
          {/* Organization Info */}
          <Card className="p-3 bg-gradient-accent/10 border border-accent/20 mb-4 cursor-pointer hover:bg-gradient-accent/20 transition-all">
            <div className="flex items-center justify-center space-x-2">
              <Building2 className="w-4 h-4 text-accent" />
              <div className="text-sm">
                <p className="font-medium text-accent">Sports Academy</p>
                <p className="text-xs text-muted-foreground">Phoenix Sports Club • Member</p>
              </div>
            </div>
          </Card>
          
          {/* Switch Profile Option */}
          <Button variant="outline" size="sm" className="w-full">
            Switch to Organization Profile
          </Button>
        </Card>
      </div>

      {/* Stats by Sport */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Stats by Sport</h3>
        
        <Tabs defaultValue="all" onValueChange={setSelectedSport}>
          <TabsList className="grid w-full grid-cols-4 bg-gradient-card border border-accent/20">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="badminton">Badminton</TabsTrigger>
            <TabsTrigger value="tennis">Tennis</TabsTrigger>
            <TabsTrigger value="basketball">Basketball</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-gradient-card">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-accent">33</p>
                <p className="text-xs text-muted-foreground">Total Wins</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">70%</p>
                <p className="text-xs text-muted-foreground">Avg Win Rate</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Medal className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-muted-foreground">Total Matches</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Zap className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">1247</p>
                <p className="text-xs text-muted-foreground">Total Points</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="badminton" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-gradient-card">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-accent">{sportsStats.badminton.wins}</p>
                <p className="text-xs text-muted-foreground">Matches Won</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.badminton.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Medal className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.badminton.matches}</p>
                <p className="text-xs text-muted-foreground">Total Matches</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Zap className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.badminton.points}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tennis" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-gradient-card">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-accent">{sportsStats.tennis.wins}</p>
                <p className="text-xs text-muted-foreground">Matches Won</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.tennis.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Medal className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.tennis.matches}</p>
                <p className="text-xs text-muted-foreground">Total Matches</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Zap className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.tennis.points}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="basketball" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-gradient-card">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-accent">{sportsStats.basketball.wins}</p>
                <p className="text-xs text-muted-foreground">Matches Won</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.basketball.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Medal className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.basketball.matches}</p>
                <p className="text-xs text-muted-foreground">Total Matches</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-card">
                <Zap className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">{sportsStats.basketball.points}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Favorite Sports */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Your Sports</h3>
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <SportIcon sport="badminton" size="md" />
              <div>
                <p className="font-medium">Badminton</p>
                <p className="text-xs text-muted-foreground">Primary Sport • 28 matches</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <SportIcon sport="tennis" size="md" />
              <div>
                <p className="font-medium">Tennis</p>
                <p className="text-xs text-muted-foreground">Secondary • 15 matches</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-3">
              <SportIcon sport="basketball" size="md" />
              <div>
                <p className="font-medium">Basketball</p>
                <p className="text-xs text-muted-foreground">Casual • 4 matches</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          <Card className="p-3 bg-gradient-card">
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
          
          <Card className="p-3 bg-gradient-card">
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