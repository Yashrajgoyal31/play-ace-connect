import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Share, Edit, Trophy, MapPin, Phone, Mail, Globe, Users, Calendar, Target, UserPlus, Shield } from "lucide-react";
import { useState } from "react";

interface OrganizationProfileScreenProps {
  onBack: () => void;
  organizerProfile?: any;
  onSwitchToIndividual?: () => void;
}

export const OrganizationProfileScreen = ({ onBack, organizerProfile, onSwitchToIndividual }: OrganizationProfileScreenProps) => {
  const [showRolesDialog, setShowRolesDialog] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("member");
  
  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold">Organization Profile</h1>
        
        <Button variant="ghost" size="icon">
          <Share className="w-5 h-5" />
        </Button>
      </div>

      {/* Organization Header */}
      <div className="px-6 py-6">
        <Card className="p-6 bg-gradient-card text-center relative">
          <Button variant="ghost" size="icon" className="absolute top-2 right-2">
            <Edit className="w-4 h-4" />
          </Button>
          
          {onSwitchToIndividual && (
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 left-2 text-xs"
              onClick={onSwitchToIndividual}
            >
              Switch to Personal
            </Button>
          )}
          
          <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h2 className="text-xl font-bold mb-2">{organizerProfile?.organizationName || 'Phoenix Sports Club'}</h2>
          <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30 mb-2">
            {organizerProfile?.organizationType || 'Sports Academy'}
          </Badge>
          
          {organizerProfile?.establishedYear && (
            <p className="text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3 inline mr-1" />
              Established {organizerProfile.establishedYear}
            </p>
          )}
          
          <p className="text-sm text-muted-foreground mb-4">
            {organizerProfile?.description || 'Premier sports training facility'}
          </p>
          
          {organizerProfile?.totalMembers && (
            <div className="flex items-center justify-center space-x-1 text-sm">
              <Users className="w-4 h-4 text-accent" />
              <span>{organizerProfile.totalMembers} members</span>
            </div>
          )}
        </Card>
      </div>

      {/* Sports Offered */}
      {organizerProfile?.sportsOffered && organizerProfile.sportsOffered.length > 0 && (
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4">Sports Offered</h3>
          <div className="flex flex-wrap gap-2">
            {organizerProfile.sportsOffered.map((sport: string) => (
              <Badge key={sport} variant="outline" className="bg-gradient-accent/10 text-accent border-accent/30">
                <Trophy className="w-3 h-3 mr-1" />
                {sport}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <Card className="p-4 bg-gradient-card space-y-3">
          {organizerProfile?.contactPerson && (
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Contact Person</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.contactPerson}</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-xs text-muted-foreground">
                {organizerProfile?.address || '123 Sports Complex'}
                {organizerProfile?.city && `, ${organizerProfile.city}`}
                {organizerProfile?.state && `, ${organizerProfile.state}`}
                {organizerProfile?.pincode && ` - ${organizerProfile.pincode}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-xs text-muted-foreground">{organizerProfile?.phone || '+91 98765 43210'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">{organizerProfile?.email || 'contact@phoenix.com'}</p>
            </div>
          </div>
          {organizerProfile?.website && (
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Website</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.website}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      {/* Organization Details */}
      {(organizerProfile?.affiliatedTo || organizerProfile?.licenseNumber || organizerProfile?.achievements) && (
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4">Organization Details</h3>
          <Card className="p-4 bg-gradient-card space-y-3">
            {organizerProfile?.affiliatedTo && (
              <div>
                <p className="text-sm font-medium">Affiliated To</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.affiliatedTo}</p>
              </div>
            )}
            {organizerProfile?.licenseNumber && (
              <div>
                <p className="text-sm font-medium">License/Registration Number</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.licenseNumber}</p>
              </div>
            )}
            {organizerProfile?.principalName && (
              <div>
                <p className="text-sm font-medium">Principal/Head</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.principalName}</p>
              </div>
            )}
            {organizerProfile?.coachingStaff && (
              <div>
                <p className="text-sm font-medium">Coaching Staff</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.coachingStaff} coaches</p>
              </div>
            )}
            {organizerProfile?.achievements && (
              <div>
                <p className="text-sm font-medium">Achievements</p>
                <p className="text-xs text-muted-foreground">{organizerProfile.achievements}</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Roles & Access Management */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Team & Roles</h3>
          <Button variant="outline" size="sm" onClick={() => setShowRolesDialog(true)}>
            <UserPlus className="w-4 h-4 mr-1" />
            Invite
          </Button>
        </div>
        
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-accent/10 border border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">A</span>
                </div>
                <div>
                  <p className="font-medium">Alice Johnson</p>
                  <p className="text-xs text-muted-foreground">alice@phoenix.com</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent-foreground">B</span>
                </div>
                <div>
                  <p className="font-medium">Bob Smith</p>
                  <p className="text-xs text-muted-foreground">bob@phoenix.com</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Member</Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Tournaments */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">Tournaments</h3>
        
        <Tabs defaultValue="created">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-card border border-accent/20">
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="all">All Tournaments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="created" className="mt-4 space-y-3">
            <Card className="p-4 bg-gradient-card">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs bg-success/20 text-success border-success/30">LIVE</Badge>
                <p className="text-xs text-muted-foreground">2 days left</p>
              </div>
              <h4 className="font-semibold mb-1">Annual Badminton Championship</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>64 participants</span>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-card">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">Upcoming</Badge>
                <p className="text-xs text-muted-foreground">Starts in 5 days</p>
              </div>
              <h4 className="font-semibold mb-1">Tennis Open 2025</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Jan 15-17</span>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="all" className="mt-4 space-y-3">
            <Card className="p-4 bg-gradient-card">
              <h4 className="font-semibold mb-1">City Basketball League</h4>
              <p className="text-xs text-muted-foreground mb-2">Other Organization</p>
              <Badge variant="outline" className="text-xs">Registration Open</Badge>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Teams */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Teams</h3>
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-1" />
            Create Team
          </Button>
        </div>
        
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Team Phoenix A</h4>
              <Badge variant="outline" className="text-xs">Badminton</Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>8 players</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={showRolesDialog} onOpenChange={setShowRolesDialog}>
        <DialogContent className="mx-4 max-w-[calc(100%-2rem)] rounded-lg bg-card">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@example.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                  <SelectItem value="member">Member - Create tournaments</SelectItem>
                  <SelectItem value="scorer">Scorer - Score matches only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full" onClick={() => setShowRolesDialog(false)}>
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileContainer>
  );
};
