import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/ui/sport-icon";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Trophy, Plus, Target, Medal, Calendar, MapPin, Search, QrCode, Mic } from "lucide-react";
import { useState } from "react";

interface IndividualDashboardProps {
  onStartMatch: () => void;
  onFindPlayers: () => void;
  onViewProfile: () => void;
  onViewTournaments?: () => void;
  onViewLeaderboard?: () => void;
  onSearch?: () => void;
}

export const IndividualDashboard = ({ 
  onStartMatch, 
  onFindPlayers, 
  onViewProfile, 
  onViewTournaments,
  onViewLeaderboard,
  onSearch 
}: IndividualDashboardProps) => {
  const [showAddSportDialog, setShowAddSportDialog] = useState(false);
  const [activeSports, setActiveSports] = useState(['badminton', 'tennis', 'basketball', 'table-tennis']);
  const [sportSearch, setSportSearch] = useState("");
  const [selectedNewSports, setSelectedNewSports] = useState<string[]>([]);
  
  const allSports = [
    'badminton', 'tennis', 'basketball', 'table-tennis', 'cricket', 
    'football', 'volleyball', 'swimming', 'athletics', 'chess', 'hockey', 'golf'
  ];
  
  const availableSports = allSports.filter(sport => !activeSports.includes(sport));
  const filteredAvailableSports = availableSports.filter(sport => 
    sport.toLowerCase().includes(sportSearch.toLowerCase())
  );
  
  const handleAddSports = () => {
    setActiveSports([...activeSports, ...selectedNewSports]);
    setSelectedNewSports([]);
    setSportSearch("");
    setShowAddSportDialog(false);
  };
  
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
              <span className="text-xl font-bold text-accent-foreground">A</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Alice Johnson</h2>
              <p className="text-sm text-muted-foreground">Let's score! 🏆</p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div 
          className="relative cursor-pointer" 
          onClick={onSearch}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search players, matches, tournaments..."
            className="pl-10 pr-20 cursor-pointer"
            readOnly
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <QrCode className="w-4 h-4 text-muted-foreground" />
            <Mic className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Your Sports - Moved here */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {activeSports.map((sport) => (
              <div key={sport} className="flex-shrink-0">
                <SportIcon 
                  sport={sport as any} 
                  size="lg" 
                  className="cursor-pointer active:scale-95 transition-transform w-12 h-12" 
                />
              </div>
            ))}
            <Button 
              variant="outline" 
              size="icon"
              className="flex-shrink-0 w-12 h-12 rounded-full"
              onClick={() => setShowAddSportDialog(true)}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Click on sports icon to start scoring for the given sport
          </p>
        </div>
      </div>

      {/* Overall Performance - All Sports Combined */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 bg-gradient-accent/10 border border-accent/20 aspect-square flex flex-col items-center justify-center">
            <Trophy className="w-5 h-5 text-accent mb-1" />
            <p className="text-xl font-bold text-accent">33</p>
            <p className="text-[10px] text-muted-foreground text-center">Matches Won</p>
          </Card>
          
          <Card className="p-3 bg-gradient-card aspect-square flex flex-col items-center justify-center">
            <Target className="w-5 h-5 text-primary mb-1" />
            <p className="text-xl font-bold">72%</p>
            <p className="text-[10px] text-muted-foreground text-center">Win Rate</p>
          </Card>
          
          <Card className="p-3 bg-gradient-card aspect-square flex flex-col items-center justify-center">
            <Medal className="w-5 h-5 text-warning mb-1" />
            <p className="text-xl font-bold">12</p>
            <p className="text-[10px] text-muted-foreground text-center">Tournaments</p>
          </Card>
        </div>
      </div>

      {/* Last Match */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Last Match</h3>
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs bg-success/20 text-success border-success/30">WON</Badge>
            <p className="text-xs text-muted-foreground">2 days ago</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">You vs John Smith</p>
              <p className="text-sm text-muted-foreground">Badminton • Singles</p>
            </div>
            <p className="text-lg font-bold text-accent">21-18</p>
          </div>
        </Card>
      </div>

      {/* Upcoming Match */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Match</h3>
        <Card className="p-4 bg-gradient-card border-2 border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Tomorrow, 6:00 PM</span>
            </div>
          </div>
          <p className="font-semibold mb-1">Alice vs Sarah Johnson</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>Tennis • Quarter Finals</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>City Sports Complex</span>
          </div>
        </Card>
      </div>

      {/* Upcoming Tournament */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Tournament</h3>
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Dec 15-17, 2025</span>
            </div>
            <Badge variant="outline" className="text-xs">Registered</Badge>
          </div>
          <p className="font-semibold mb-1">City Open Badminton Championship</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Municipal Sports Arena</span>
          </div>
        </Card>
      </div>

      {/* Add Sport Dialog */}
      <Dialog open={showAddSportDialog} onOpenChange={setShowAddSportDialog}>
        <DialogContent className="mx-4 max-w-[calc(100%-2rem)] rounded-lg bg-card">
          <DialogHeader>
            <DialogTitle>Add Sports</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sports..."
                value={sportSearch}
                onChange={(e) => setSportSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredAvailableSports.map((sport) => (
                <div 
                  key={sport} 
                  className="flex items-center space-x-3 p-3 hover:bg-accent/10 rounded-md cursor-pointer"
                  onClick={() => {
                    setSelectedNewSports(prev => 
                      prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
                    );
                  }}
                >
                  <Checkbox
                    checked={selectedNewSports.includes(sport)}
                    onCheckedChange={() => {
                      setSelectedNewSports(prev => 
                        prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
                      );
                    }}
                  />
                  <Label className="text-sm font-normal cursor-pointer flex-1 capitalize">
                    {sport.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAddSports}
              disabled={selectedNewSports.length === 0}
            >
              Add Selected Sports
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation 
        userType="individual"
        currentSection="home"
        onNavigateHome={() => {}}
        onNavigateTournaments={onViewTournaments || (() => {})}
        onNavigateRankings={onViewLeaderboard}
        onNavigatePlayers={onFindPlayers}
      />
    </MobileContainer>
  );
};