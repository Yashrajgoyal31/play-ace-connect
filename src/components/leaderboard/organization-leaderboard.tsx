import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Medal, Crown, TrendingUp, Building2, Users, Award } from "lucide-react";

interface OrganizationLeaderboardProps {
  onBack: () => void;
  organizationType?: string;
}

export const OrganizationLeaderboard = ({ onBack, organizationType = 'academy' }: OrganizationLeaderboardProps) => {
  const [selectedScope, setSelectedScope] = useState("city");
  const [selectedCategory, setSelectedCategory] = useState("overall");

  // Rankings are based on: tournaments hosted, participation rate, match quality, player satisfaction
  const leaderboardData = [
    { 
      rank: 1, 
      name: "Phoenix Sports Academy", 
      type: "Sports Academy",
      score: 2450, 
      tournamentsHosted: 15, 
      avgParticipants: 64,
      rating: 4.8,
      city: "Mumbai", 
      state: "Maharashtra" 
    },
    { 
      rank: 2, 
      name: "Elite Sports Club", 
      type: "Sports Club",
      score: 2380, 
      tournamentsHosted: 12, 
      avgParticipants: 48,
      rating: 4.7,
      city: "Mumbai", 
      state: "Maharashtra" 
    },
    { 
      rank: 3, 
      name: "Champions Academy", 
      type: "Sports Academy",
      score: 2320, 
      tournamentsHosted: 10, 
      avgParticipants: 52,
      rating: 4.6,
      city: "Mumbai", 
      state: "Maharashtra" 
    },
    { 
      rank: 4, 
      name: "Victory Sports Center", 
      type: "Sports Academy",
      score: 2280, 
      tournamentsHosted: 9, 
      avgParticipants: 45,
      rating: 4.5,
      city: "Mumbai", 
      state: "Maharashtra" 
    },
    { 
      rank: 5, 
      name: "Pro Sports Club", 
      type: "Sports Club",
      score: 2210, 
      tournamentsHosted: 8, 
      avgParticipants: 40,
      rating: 4.4,
      city: "Mumbai", 
      state: "Maharashtra" 
    },
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

  const getCurrentOrgRank = () => {
    return { 
      rank: 12, 
      name: "Your Organization", 
      score: 1850, 
      tournamentsHosted: 6, 
      avgParticipants: 35,
      rating: 4.2
    };
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
            <h1 className="text-xl font-bold">Organization Rankings</h1>
            <p className="text-sm text-muted-foreground">Top sports organizations</p>
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
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gradient-card border-accent/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall</SelectItem>
                <SelectItem value="tournaments">Most Tournaments</SelectItem>
                <SelectItem value="participation">Best Participation</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ranking Criteria Info */}
        <Card className="p-4 bg-gradient-accent/10 border border-accent/20">
          <h3 className="font-semibold mb-2 flex items-center">
            <Award className="w-4 h-4 mr-2 text-accent" />
            Ranking Criteria
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Tournaments Hosted (40%)</p>
            <p>• Average Participation (30%)</p>
            <p>• User Ratings (20%)</p>
            <p>• Match Quality Score (10%)</p>
          </div>
        </Card>

        {/* Your Rank Card */}
        <Card className="p-4 bg-gradient-primary/10 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">{getCurrentOrgRank().rank}</span>
              </div>
              <div>
                <p className="font-semibold text-primary">Your Organization Rank</p>
                <p className="text-sm text-muted-foreground">{getCurrentOrgRank().score} points</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-bold text-primary">{getCurrentOrgRank().rating} ⭐</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/20">
            <div>
              <p className="text-xs text-muted-foreground">Tournaments</p>
              <p className="font-semibold">{getCurrentOrgRank().tournamentsHosted}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg. Participants</p>
              <p className="font-semibold">{getCurrentOrgRank().avgParticipants}</p>
            </div>
          </div>
        </Card>

        {/* Rankings Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Top Organizations</h3>
          
          {/* Top 3 Podium */}
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-end justify-center space-x-4 mb-6">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium truncate max-w-[80px]">{leaderboardData[1].name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[1].score} pts</p>
                <Badge variant="outline" className="text-xs mt-1">{leaderboardData[1].type}</Badge>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-medium text-accent truncate max-w-[80px]">{leaderboardData[0].name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[0].score} pts</p>
                <Badge className="bg-gradient-accent text-accent-foreground text-xs mt-1">{leaderboardData[0].type}</Badge>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium truncate max-w-[80px]">{leaderboardData[2].name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[2].score} pts</p>
                <Badge variant="outline" className="text-xs mt-1">{leaderboardData[2].type}</Badge>
              </div>
            </div>
          </Card>

          {/* Full Rankings */}
          <div className="space-y-3">
            {leaderboardData.map((org, index) => (
              <Card 
                key={index} 
                className="p-4 bg-gradient-card border border-accent/10 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(org.rank)}
                    <div>
                      <p className="font-semibold">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.city}, {org.state}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{org.score}</p>
                    <p className="text-xs text-muted-foreground">{org.rating} ⭐</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border/20">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      <span>{org.tournamentsHosted}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{org.avgParticipants} avg</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{org.type}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};