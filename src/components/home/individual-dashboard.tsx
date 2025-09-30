import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/ui/sport-icon";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Play, Users, Trophy, Plus, Target, Medal, TrendingUp } from "lucide-react";

interface IndividualDashboardProps {
  onStartMatch: () => void;
  onFindPlayers: () => void;
  onViewProfile: () => void;
  onViewTournaments?: () => void;
  onViewLeaderboard?: () => void;
}

export const IndividualDashboard = ({ 
  onStartMatch, 
  onFindPlayers, 
  onViewProfile, 
  onViewTournaments,
  onViewLeaderboard 
}: IndividualDashboardProps) => {
  return (
    <MobileContainer className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            onClick={onViewProfile}
          >
            <span className="text-xl font-bold text-accent-foreground">A</span>
          </div>
          <div>
            <h2 className="font-semibold">Let's score! 🏆</h2>
            <p className="text-sm text-muted-foreground">Alice Johnson</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onStartMatch}>
            <Plus className="w-5 h-5 text-accent" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="neomorph" 
            className="h-24 flex-col space-y-2 border-2 border-accent/20"
            onClick={onStartMatch}
          >
            <Play className="w-6 h-6 text-accent" />
            <span className="text-sm font-medium">Start Match</span>
          </Button>
          
          <Button 
            variant="neomorph" 
            className="h-24 flex-col space-y-2"
            onClick={onFindPlayers}
          >
            <Users className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Find Players</span>
          </Button>
          
          <Button 
            variant="neomorph" 
            className="h-24 flex-col space-y-2"
            onClick={onViewLeaderboard}
          >
            <TrendingUp className="w-6 h-6 text-accent" />
            <span className="text-sm font-medium">Leaderboard</span>
          </Button>
          
          <Button 
            variant="neomorph" 
            className="h-24 flex-col space-y-2"
            onClick={onViewTournaments}
          >
            <Trophy className="w-6 h-6 text-warning" />
            <span className="text-sm font-medium">Tournaments</span>
          </Button>
        </div>
      </div>

      {/* Your Sports */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Your Sports</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {['badminton', 'tennis', 'basketball', 'table-tennis'].map((sport) => (
            <div key={sport} className="flex-shrink-0">
              <SportIcon 
                sport={sport as any} 
                size="lg" 
                className="cursor-pointer active:scale-95 transition-transform" 
              />
              <p className="text-xs text-center mt-2 capitalize font-medium">
                {sport.replace('-', ' ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Your Performance</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-accent/10 border border-accent/20">
            <div className="text-center">
              <Medal className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">12</p>
              <p className="text-xs text-muted-foreground">Matches Won</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <Trophy className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Tournaments</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Live Matches */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live Matches</h3>
          <Button variant="ghost" size="sm">See All</Button>
        </div>
        
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">LIVE</span>
              <Badge variant="outline" className="text-xs">1ST SET</Badge>
            </div>
            <p className="text-xs text-muted-foreground">18:10</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="font-semibold">You</p>
              <p className="text-xs text-muted-foreground">Alice</p>
            </div>
            
            <div className="text-center bg-accent/10 border border-accent/20 rounded-xl px-4 py-2">
              <p className="text-2xl font-bold text-accent">21:18</p>
              <p className="text-xs text-muted-foreground">Current Score</p>
            </div>
            
            <div className="text-center">
              <p className="font-semibold">Opponent</p>
              <p className="text-xs text-muted-foreground">John</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation 
        userType="individual"
        currentSection="home"
        onNavigateHome={() => {}}
        onNavigateTournaments={onViewTournaments || (() => {})}
        onNavigateRankings={onViewLeaderboard}
        onNavigateVenues={() => {}}
      />
    </MobileContainer>
  );
};