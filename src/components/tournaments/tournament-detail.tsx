import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Calendar, MapPin, Users, Trophy, IndianRupee, Clock, Bell } from "lucide-react";

interface TournamentDetailProps {
  tournamentId: string;
  onBack: () => void;
  onJoinTournament: () => void;
  onViewMatch: (matchId: string) => void;
  onRequestVerification: () => void;
}

const mockTournament = {
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
  description: "Join the biggest badminton tournament in the city! Open to all skill levels with exciting prizes.",
  rules: {
    bestOf: 3,
    timeLimit: 90,
    substitutionsAllowed: true
  },
  brackets: [
    { round: "Round 1", matches: [
      { id: "m1", player1: "Alice", player2: "Bob", score: "21-15, 21-18", status: "completed" },
      { id: "m2", player1: "Carol", player2: "Dave", score: "19-21, 21-16, 21-19", status: "completed" },
      { id: "m3", player1: "Eve", player2: "Frank", score: "", status: "scheduled", time: "10:00 AM" },
      { id: "m4", player1: "Grace", player2: "Henry", score: "", status: "scheduled", time: "10:30 AM" }
    ]},
    { round: "Semi-Final", matches: [
      { id: "m5", player1: "Alice", player2: "Carol", score: "", status: "upcoming" },
      { id: "m6", player1: "TBD", player2: "TBD", score: "", status: "pending" }
    ]},
    { round: "Final", matches: [
      { id: "m7", player1: "TBD", player2: "TBD", score: "", status: "pending" }
    ]}
  ],
  leaderboard: [
    { rank: 1, player: "Alice", matches: 3, wins: 3, points: 9 },
    { rank: 2, player: "Carol", matches: 3, wins: 2, points: 6 },
    { rank: 3, player: "Bob", matches: 2, wins: 1, points: 3 },
    { rank: 4, player: "Dave", matches: 2, wins: 1, points: 3 }
  ]
};

export const TournamentDetail = ({ tournamentId, onBack, onJoinTournament, onViewMatch, onRequestVerification }: TournamentDetailProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const tournament = mockTournament; // In real app, fetch by tournamentId

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registration":
        return <Badge className="bg-gradient-accent text-accent-foreground">Registration Open</Badge>;
      case "ongoing": 
        return <Badge className="bg-gradient-primary text-primary-foreground">Live</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMatchStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="text-xs">Completed</Badge>;
      case "live":
        return <Badge className="bg-gradient-primary text-primary-foreground text-xs">Live</Badge>;
      case "scheduled":
        return <Badge className="bg-gradient-accent text-accent-foreground text-xs">Scheduled</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="text-xs">Upcoming</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
  };

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="relative">
        {/* Tournament Banner */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          
          {/* Header Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onBack} className="bg-background/80 backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Tournament Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start space-x-3">
              <SportIcon sport={tournament.sport as any} size="lg" />
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground mb-1">{tournament.name}</h1>
                <p className="text-sm text-muted-foreground mb-2">{tournament.organizer}</p>
                {getStatusBadge(tournament.status)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <p className="text-lg font-bold">{tournament.participants}/{tournament.maxParticipants}</p>
                <p className="text-xs text-muted-foreground">Participants</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 bg-gradient-card">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-warning" />
              <div>
                <p className="text-lg font-bold">₹{tournament.prizePool.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Prize Pool</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-4">
        <div className="flex space-x-3">
          <Button 
            variant="neomorph"
            onClick={onJoinTournament}
            className="flex-1 bg-gradient-primary text-primary-foreground"
            disabled={tournament.status === "completed"}
          >
            {tournament.status === "registration" ? `Join Tournament (₹${tournament.entryFee})` : 
             tournament.status === "ongoing" ? "Tournament Started" : "Tournament Ended"}
          </Button>
          
          <Button 
            variant="neomorph"
            size="icon"
            onClick={() => setIsFollowing(!isFollowing)}
            className={isFollowing ? "bg-gradient-accent text-accent-foreground" : ""}
          >
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={onRequestVerification}
            className="bg-warning/10 border-warning/30"
          >
            <Bell className="w-5 h-5 text-warning" />
          </Button>
        </div>
      </div>

      {/* Tournament Details Tabs */}
      <div className="px-6">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="brackets">Brackets</TabsTrigger>
            <TabsTrigger value="leaderboard">Standings</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4 mt-4">
            {/* Basic Info */}
            <Card className="p-4 bg-gradient-card">
              <h3 className="font-semibold mb-3">Tournament Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-muted-foreground" />
                  <span>{tournament.format.toUpperCase()} Format</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-muted-foreground" />
                  <span>{tournament.entryFee > 0 ? `₹${tournament.entryFee} Entry Fee` : "Free Entry"}</span>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-4 bg-gradient-card">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{tournament.description}</p>
            </Card>

            {/* Rules */}
            <Card className="p-4 bg-gradient-card">
              <h3 className="font-semibold mb-3">Tournament Rules</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Match Format:</span>
                  <span>Best of {tournament.rules.bestOf}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Limit:</span>
                  <span>{tournament.rules.timeLimit} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Substitutions:</span>
                  <span>{tournament.rules.substitutionsAllowed ? "Allowed" : "Not Allowed"}</span>
                </div>
              </div>
            </Card>

            {/* Prize Distribution */}
            <Card className="p-4 bg-gradient-card">
              <h3 className="font-semibold mb-3">Prize Distribution</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>🥇 Winner:</span>
                  <span className="font-medium">₹{Math.floor(tournament.prizePool * 0.5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>🥈 Runner-up:</span>
                  <span className="font-medium">₹{Math.floor(tournament.prizePool * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>🥉 3rd Place:</span>
                  <span className="font-medium">₹{Math.floor(tournament.prizePool * 0.2).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="brackets" className="space-y-4 mt-4">
            {tournament.brackets.map((round, roundIndex) => (
              <Card key={roundIndex} className="p-4 bg-gradient-card">
                <h3 className="font-semibold mb-3">{round.round}</h3>
                <div className="space-y-3">
                  {round.matches.map((match) => (
                    <Card 
                      key={match.id} 
                      className="p-3 bg-gradient-to-r from-card-elevated to-card cursor-pointer active:scale-95 transition-transform"
                      onClick={() => onViewMatch(match.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{match.player1}</span>
                            {getMatchStatusBadge(match.status)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{match.player2}</span>
                            {match.time && (
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{match.time}</span>
                              </div>
                            )}
                          </div>
                          {match.score && (
                            <p className="text-sm text-muted-foreground mt-1">{match.score}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4 mt-4">
            <Card className="p-4 bg-gradient-card">
              <h3 className="font-semibold mb-3">Current Standings</h3>
              <div className="space-y-2">
                {tournament.leaderboard.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-2 rounded-lg bg-card-elevated">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold w-6">{player.rank}</span>
                      <div>
                        <p className="font-medium">{player.player}</p>
                        <p className="text-xs text-muted-foreground">{player.matches} matches played</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{player.points} pts</p>
                      <p className="text-xs text-muted-foreground">{player.wins}W</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileContainer>
  );
};