import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Users, UserPlus, Trash2 } from "lucide-react";

interface TeamManagementProps {
  onBack: () => void;
}

export const TeamManagement = ({ onBack }: TeamManagementProps) => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  const teams = [
    { id: "1", name: "Team Phoenix A", sport: "Badminton", players: 8, active: true },
    { id: "2", name: "Team Phoenix B", sport: "Tennis", players: 6, active: true },
    { id: "3", name: "Junior Squad", sport: "Basketball", players: 10, active: false },
  ];

  const mockPlayers = [
    { id: "1", name: "John Smith", sport: "Badminton" },
    { id: "2", name: "Sarah Johnson", sport: "Badminton" },
    { id: "3", name: "Mike Chen", sport: "Tennis" },
  ];

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Team Management</h1>
            <p className="text-sm text-muted-foreground">Create and manage teams</p>
          </div>
        </div>
        <Button 
          variant="neomorph" 
          size="sm"
          onClick={() => setShowCreateTeam(true)}
          className="bg-gradient-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Team
        </Button>
      </div>

      {/* Teams List */}
      <div className="px-6 py-4 space-y-4">
        {teams.map((team) => (
          <Card key={team.id} className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.sport}</p>
                </div>
              </div>
              {team.active ? (
                <Badge className="bg-gradient-accent text-accent-foreground">Active</Badge>
              ) : (
                <Badge variant="outline">Inactive</Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/20">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{team.players} players</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedTeam(team.id);
                    setShowAddPlayer(true);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Add Player
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>

            {/* Team Players */}
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Team Members:</p>
              <div className="grid grid-cols-2 gap-2">
                {mockPlayers.filter(p => p.sport === team.sport).slice(0, team.players).map((player, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center text-xs text-accent-foreground">
                      {player.name[0]}
                    </div>
                    <span className="truncate">{player.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Team Dialog */}
      <DialogWrapper
        open={showCreateTeam}
        onOpenChange={setShowCreateTeam}
        title="Create New Team"
        description="Add a new team to your organization"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              placeholder="e.g., Team Phoenix A"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="sport">Sport</Label>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="badminton">Badminton</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="table-tennis">Table Tennis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="w-full" onClick={() => setShowCreateTeam(false)}>
            Create Team
          </Button>
        </div>
      </DialogWrapper>

      {/* Add Player Dialog */}
      <DialogWrapper
        open={showAddPlayer}
        onOpenChange={setShowAddPlayer}
        title="Add Player to Team"
        description="Add a player by their phone number"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="playerPhone">Player Phone Number</Label>
            <Input
              id="playerPhone"
              type="tel"
              placeholder="Enter phone number"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Player will be added if they're registered with this number
            </p>
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2">
            {mockPlayers.map((player) => (
              <Card 
                key={player.id} 
                className="p-3 cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => setShowAddPlayer(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-sm text-primary-foreground">
                      {player.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.sport}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">Add</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogWrapper>
    </MobileContainer>
  );
};