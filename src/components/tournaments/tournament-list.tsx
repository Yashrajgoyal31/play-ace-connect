import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Calendar, MapPin, Users, Trophy, IndianRupee } from "lucide-react";

interface TournamentListProps {
  onBack: () => void;
  onCreateTournament: () => void;
  onJoinTournament: (tournamentId: string) => void;
  onViewTournament: (tournamentId: string) => void;
  userType?: 'organization' | 'individual';
  onRegisterOrganization?: () => void;
  organizationSports?: string[];
}

const mockTournaments = [
  {
    id: "1",
    name: "City Badminton Championship",
    sport: "badminton",
    format: "knockout",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    location: "Sports Complex A",
    organizer: "Raipur Sports Club",
    participants: 32,
    maxParticipants: 64,
    entryFee: 500,
    prizePool: 25000,
    status: "registration",
    banner: "/api/placeholder/400/200"
  },
  {
    id: "2", 
    name: "Weekend Tennis League",
    sport: "tennis",
    format: "league",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    location: "City Tennis Courts",
    organizer: "Tennis Academy",
    participants: 16,
    maxParticipants: 20,
    entryFee: 1000,
    prizePool: 40000,
    status: "ongoing",
    banner: "/api/placeholder/400/200"
  },
  {
    id: "3",
    name: "Basketball 3v3 Tournament",
    sport: "basketball", 
    format: "knockout",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    location: "Indoor Sports Arena",
    organizer: "Youth Basketball Club",
    participants: 24,
    maxParticipants: 32,
    entryFee: 0,
    prizePool: 15000,
    status: "registration",
    banner: "/api/placeholder/400/200"
  }
];

export const TournamentList = ({ onBack, onCreateTournament, onJoinTournament, onViewTournament, userType = 'individual', onRegisterOrganization, organizationSports = [] }: TournamentListProps) => {
  const [selectedSport, setSelectedSport] = useState("all");
  
  const handleCreateClick = () => {
    if (userType === 'individual') {
      if (onRegisterOrganization) {
        onRegisterOrganization();
      }
    } else {
      onCreateTournament();
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registration":
        return <Badge className="bg-gradient-accent text-accent-foreground">Open</Badge>;
      case "ongoing":
        return <Badge className="bg-gradient-primary text-primary-foreground">Live</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MobileContainer className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-xl font-bold">Tournaments</h1>
            <p className="text-sm text-muted-foreground">Join or create tournaments</p>
          </div>
        </div>
        
        <Button 
          variant="neomorph" 
          size="icon"
          onClick={handleCreateClick}
          className="bg-gradient-primary text-primary-foreground"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Organization View - Tabs */}
      {userType === 'organization' ? (
        <div className="px-6 py-4">
          <Tabs defaultValue="my-tournaments" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-card border border-accent/20 mb-4">
              <TabsTrigger value="my-tournaments">My Tournaments</TabsTrigger>
              <TabsTrigger value="all-tournaments">All Tournaments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-tournaments" className="space-y-4">
              {mockTournaments.map((tournament) => (
                <Card 
                  key={tournament.id} 
                  className="p-0 bg-gradient-card overflow-hidden cursor-pointer active:scale-95 transition-transform"
                  onClick={() => onViewTournament(tournament.id)}
                >
                  {/* Tournament content - same as before */}
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SportIcon sport={tournament.sport as any} size="sm" />
                          <div>
                            <h3 className="font-bold text-foreground">{tournament.name}</h3>
                            <p className="text-xs text-muted-foreground">{tournament.organizer}</p>
                          </div>
                        </div>
                        {getStatusBadge(tournament.status)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs">{tournament.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{tournament.participants}/{tournament.maxParticipants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-warning" />
                          <span>₹{tournament.prizePool.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {tournament.format.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/20">
                      <div className="text-sm">
                        {tournament.entryFee > 0 ? (
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="w-4 h-4 text-muted-foreground" />
                            <span>₹{tournament.entryFee} entry</span>
                          </div>
                        ) : (
                          <span className="text-success font-medium">Free Entry</span>
                        )}
                      </div>
                      
                      <Button 
                        variant="neomorph" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinTournament(tournament.id);
                        }}
                        disabled={tournament.status === "completed"}
                        className="bg-gradient-primary text-primary-foreground"
                      >
                        {tournament.status === "registration" ? "Manage" : 
                         tournament.status === "ongoing" ? "View" : "Completed"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="all-tournaments" className="space-y-4">
              {/* Sport Categories */}
              <div className="space-y-3 mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Filter by Sport</h3>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  <Button 
                    variant="neomorph" 
                    size="sm" 
                    className={selectedSport === "all" ? "bg-gradient-primary text-primary-foreground" : ""}
                    onClick={() => setSelectedSport("all")}
                  >
                    All Sports
                  </Button>
                  {organizationSports.map((sport) => (
                    <Button 
                      key={sport}
                      variant="neomorph" 
                      size="sm" 
                      className={selectedSport === sport ? "bg-gradient-primary text-primary-foreground whitespace-nowrap" : "whitespace-nowrap"}
                      onClick={() => setSelectedSport(sport)}
                    >
                      {sport.charAt(0).toUpperCase() + sport.slice(1).replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>

              {mockTournaments
                .filter(t => selectedSport === "all" || t.sport === selectedSport)
                .map((tournament) => (
                <Card 
                  key={tournament.id} 
                  className="p-0 bg-gradient-card overflow-hidden cursor-pointer active:scale-95 transition-transform"
                  onClick={() => onViewTournament(tournament.id)}
                >
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SportIcon sport={tournament.sport as any} size="sm" />
                          <div>
                            <h3 className="font-bold text-foreground">{tournament.name}</h3>
                            <p className="text-xs text-muted-foreground">{tournament.organizer}</p>
                          </div>
                        </div>
                        {getStatusBadge(tournament.status)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs">{tournament.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{tournament.participants}/{tournament.maxParticipants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-warning" />
                          <span>₹{tournament.prizePool.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {tournament.format.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/20">
                      <div className="text-sm">
                        {tournament.entryFee > 0 ? (
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="w-4 h-4 text-muted-foreground" />
                            <span>₹{tournament.entryFee} entry</span>
                          </div>
                        ) : (
                          <span className="text-success font-medium">Free Entry</span>
                        )}
                      </div>
                      
                      <Button 
                        variant="neomorph" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinTournament(tournament.id);
                        }}
                        disabled={tournament.status === "completed"}
                        className="bg-gradient-primary text-primary-foreground"
                      >
                        {tournament.status === "registration" ? "Join" : 
                         tournament.status === "ongoing" ? "View" : "Completed"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <>
          {/* Individual View - Filters */}
          <div className="px-6 py-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Button variant="neomorph" size="sm" className="bg-gradient-primary text-primary-foreground whitespace-nowrap">
                All Sports
              </Button>
              <Button variant="neomorph" size="sm" className="whitespace-nowrap">
                Badminton
              </Button>
              <Button variant="neomorph" size="sm" className="whitespace-nowrap">
                Tennis
              </Button>
              <Button variant="neomorph" size="sm" className="whitespace-nowrap">
                Basketball
              </Button>
            </div>
          </div>

          {/* Tournament Cards */}
          <div className="px-6 space-y-4">
        {mockTournaments.map((tournament) => (
          <Card 
            key={tournament.id} 
            className="p-0 bg-gradient-card overflow-hidden cursor-pointer active:scale-95 transition-transform"
            onClick={() => onViewTournament(tournament.id)}
          >
            {/* Tournament Banner */}
            <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SportIcon sport={tournament.sport as any} size="sm" />
                    <div>
                      <h3 className="font-bold text-foreground">{tournament.name}</h3>
                      <p className="text-xs text-muted-foreground">{tournament.organizer}</p>
                    </div>
                  </div>
                  {getStatusBadge(tournament.status)}
                </div>
              </div>
            </div>

            {/* Tournament Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs">{tournament.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{tournament.participants}/{tournament.maxParticipants}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-warning" />
                    <span>₹{tournament.prizePool.toLocaleString()}</span>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {tournament.format.toUpperCase()}
                </Badge>
              </div>

              {/* Entry Fee and Action */}
              <div className="flex items-center justify-between pt-2 border-t border-border/20">
                <div className="text-sm">
                  {tournament.entryFee > 0 ? (
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <span>₹{tournament.entryFee} entry</span>
                    </div>
                  ) : (
                    <span className="text-success font-medium">Free Entry</span>
                  )}
                </div>
                
                <Button 
                  variant="neomorph" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onJoinTournament(tournament.id);
                  }}
                  disabled={tournament.status === "completed"}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  {tournament.status === "registration" ? "Join" : 
                   tournament.status === "ongoing" ? "View" : "Completed"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
          </div>
        </>
      )}
    </MobileContainer>
  );
};