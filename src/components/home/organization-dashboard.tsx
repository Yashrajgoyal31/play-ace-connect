import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/ui/sport-icon";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Play, Trophy, Plus, Calendar, Users, Target, Clock, Building2, Search, QrCode, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OrganizationDashboardProps {
  onStartMatch: () => void;
  onViewProfile: () => void;
  onViewTournaments?: () => void;
  organizerProfile?: any;
  onSearch?: () => void;
}

export const OrganizationDashboard = ({ 
  onStartMatch, 
  onViewProfile, 
  onViewTournaments,
  organizerProfile,
  onSearch 
}: OrganizationDashboardProps) => {
  const orgSports = organizerProfile?.sportsOffered || ['badminton', 'tennis', 'basketball', 'table-tennis'];
  
  return (
    <MobileContainer className="pb-24">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-card to-card-elevated space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              onClick={onViewProfile}
            >
              <Building2 className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Let's score! 🏆</h2>
              <p className="text-sm text-muted-foreground">{organizerProfile?.organizationName || 'Your Organization'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onStartMatch}>
              <Plus className="w-5 h-5 text-accent" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div 
          className="relative cursor-pointer" 
          onClick={onSearch}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tournaments, organizations..."
            className="pl-10 pr-20 cursor-pointer"
            readOnly
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <QrCode className="w-4 h-4 text-muted-foreground" />
            <Mic className="w-4 h-4 text-muted-foreground" />
          </div>
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
            onClick={onViewTournaments}
          >
            <Trophy className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Tournaments</span>
          </Button>
        </div>
      </div>

      {/* Organization Sports */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Sports</h3>
          <Button variant="ghost" size="sm" className="text-accent">
            <Plus className="w-4 h-4 mr-1" />
            Add Sport
          </Button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {orgSports.map((sport: string) => (
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

      {/* Live Tournaments */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live Tournaments</h3>
          <Button variant="ghost" size="sm">See All</Button>
        </div>
        
        <Card className="p-4 bg-gradient-card border border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">LIVE</span>
              <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">INTER-SCHOOL</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Day 2 of 3</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-accent">Annual Badminton Championship</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Matches</span>
              <span className="font-medium">6/8</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Participants</span>
              <span className="font-medium">64 students</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tournament Stats */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Tournament Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-accent/10 border border-accent/20">
            <div className="text-center">
              <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">1</p>
              <p className="text-xs text-muted-foreground">Live Now</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <Trophy className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Completed</p>
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
              <Badge variant="outline" className="text-xs">SEMI-FINAL</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Court 1</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="font-semibold">Team A</p>
              <p className="text-xs text-muted-foreground">Grade 10-A</p>
            </div>
            
            <div className="text-center bg-accent/10 border border-accent/20 rounded-xl px-4 py-2">
              <p className="text-2xl font-bold text-accent">21:18</p>
              <p className="text-xs text-muted-foreground">Set 1</p>
            </div>
            
            <div className="text-center">
              <p className="font-semibold">Team B</p>
              <p className="text-xs text-muted-foreground">Grade 10-B</p>
            </div>
          </div>
        </Card>
      </div>

    </MobileContainer>
  );
};