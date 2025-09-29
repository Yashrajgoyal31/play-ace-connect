import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trophy, Medal, Crown, Target, TrendingUp } from "lucide-react";

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen = ({ onBack }: LeaderboardScreenProps) => {
  const [selectedScope, setSelectedScope] = useState("city");
  const [selectedSport, setSelectedSport] = useState("badminton");

  const leaderboardData = [
    { rank: 1, name: "John Smith", points: 2450, wins: 45, losses: 5, winRate: 90, city: "Mumbai", state: "Maharashtra" },
    { rank: 2, name: "Sarah Johnson", points: 2380, wins: 42, losses: 8, winRate: 84, city: "Mumbai", state: "Maharashtra" },
    { rank: 3, name: "Mike Chen", points: 2320, wins: 38, losses: 7, winRate: 84, city: "Mumbai", state: "Maharashtra" },
    { rank: 4, name: "Alice Wilson", points: 2280, wins: 35, losses: 10, winRate: 78, city: "Mumbai", state: "Maharashtra" },
    { rank: 5, name: "David Kumar", points: 2210, wins: 33, losses: 12, winRate: 73, city: "Mumbai", state: "Maharashtra" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-accent">{rank}</span>;
    }
  };

  const getCurrentUserRank = () => {
    return { rank: 12, name: "Alice Johnson", points: 1850, wins: 25, losses: 8, winRate: 76 };
  };

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Leaderboards</h1>
            <p className="text-sm text-muted-foreground">See where you rank</p>
          </div>
        </div>
        <TrendingUp className="w-6 h-6 text-accent" />
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Scope</label>
            <Select value={selectedScope} onValueChange={setSelectedScope}>
              <SelectTrigger className="bg-gradient-card border-accent/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="tournament">Tournament</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Sport</label>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="bg-gradient-card border-accent/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="badminton">Badminton</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="table-tennis">Table Tennis</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Your Rank Card */}
        <Card className="p-4 bg-gradient-accent/10 border-2 border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-accent-foreground">{getCurrentUserRank().rank}</span>
              </div>
              <div>
                <p className="font-semibold text-accent">Your Rank</p>
                <p className="text-sm text-muted-foreground">{getCurrentUserRank().points} points</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="font-bold text-accent">{getCurrentUserRank().winRate}%</p>
            </div>
          </div>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-card border border-accent/20">
            <TabsTrigger value="rankings" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Rankings
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rankings" className="space-y-4 mt-6">
            {/* Top 3 Podium */}
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-end justify-center space-x-4 mb-6">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="text-sm font-medium">{leaderboardData[1].name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardData[1].points} pts</p>
                </div>

                {/* 1st Place */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-accent">{leaderboardData[0].name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardData[0].points} pts</p>
                </div>

                {/* 3rd Place */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="text-sm font-medium">{leaderboardData[2].name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardData[2].points} pts</p>
                </div>
              </div>
            </Card>

            {/* Full Rankings */}
            <div className="space-y-3">
              {leaderboardData.map((player, index) => (
                <Card key={index} className="p-4 bg-gradient-card border border-accent/10 hover:border-accent/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(player.rank)}
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.city}, {player.state}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">{player.points}</p>
                      <p className="text-xs text-muted-foreground">{player.wins}W/{player.losses}L</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent">12</p>
                  <p className="text-sm text-muted-foreground">Tournament Wins</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">76%</p>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold">+150</p>
                  <p className="text-sm text-muted-foreground">Points This Week</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <Medal className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Streak</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileContainer>
  );
};