import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowLeft, MapPin, Calendar, Trophy, Users, Building2 } from "lucide-react";

interface SearchScreenProps {
  onBack: () => void;
  userType: 'organization' | 'individual';
}

export const SearchScreen = ({ onBack, userType }: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const mockPlayers = [
    { id: 1, name: "John Smith", sport: "Badminton", rank: 15, winRate: 75 },
    { id: 2, name: "Sarah Johnson", sport: "Tennis", rank: 8, winRate: 82 },
    { id: 3, name: "Mike Chen", sport: "Basketball", rank: 22, winRate: 68 },
  ];

  const mockMatches = [
    { id: 1, player1: "Alice", player2: "Bob", sport: "Badminton", date: "2025-10-15", time: "6:00 PM" },
    { id: 2, player1: "Charlie", player2: "David", sport: "Tennis", date: "2025-10-16", time: "5:30 PM" },
  ];

  const mockTournaments = [
    { id: 1, name: "City Championship", sport: "Badminton", location: "Sports Complex A", date: "2025-11-01" },
    { id: 2, name: "Weekend League", sport: "Tennis", location: "Tennis Courts", date: "2025-11-05" },
  ];

  const mockOrganizations = [
    { id: 1, name: "Raipur Sports Club", type: "Club", sports: ["Badminton", "Tennis"], members: 150 },
    { id: 2, name: "City Academy", type: "Academy", sports: ["Basketball", "Tennis"], members: 200 },
  ];

  return (
    <MobileContainer className="pb-24">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Search</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        {userType === 'individual' ? (
          <Tabs defaultValue="players" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="players" className="space-y-3 mt-4">
              {mockPlayers.map((player) => (
                <Card key={player.id} className="p-4 bg-gradient-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold">{player.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.sport}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Rank #{player.rank}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{player.winRate}% wins</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="matches" className="space-y-3 mt-4">
              {mockMatches.map((match) => (
                <Card key={match.id} className="p-4 bg-gradient-card">
                  <div className="space-y-2">
                    <p className="font-semibold">{match.player1} vs {match.player2}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>{match.sport}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{match.date} • {match.time}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="tournaments" className="space-y-3 mt-4">
              {mockTournaments.map((tournament) => (
                <Card key={tournament.id} className="p-4 bg-gradient-card">
                  <div className="space-y-2">
                    <p className="font-semibold">{tournament.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      <span>{tournament.sport}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tournament.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{tournament.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="tournaments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tournaments" className="space-y-3 mt-4">
              {mockTournaments.map((tournament) => (
                <Card key={tournament.id} className="p-4 bg-gradient-card">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{tournament.name}</p>
                      <Badge>Join</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      <span>{tournament.sport}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tournament.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{tournament.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="organizations" className="space-y-3 mt-4">
              {mockOrganizations.map((org) => (
                <Card key={org.id} className="p-4 bg-gradient-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{org.name}</p>
                        <p className="text-sm text-muted-foreground">{org.type}</p>
                        <p className="text-xs text-muted-foreground">{org.sports.join(", ")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{org.members}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MobileContainer>
  );
};