import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Share, Edit, Trophy, MapPin, Phone, Mail, Globe, Users, Calendar, Target, UserPlus, Shield, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrganizationProfileScreenProps {
  onBack: () => void;
  organizerProfile?: any;
  onSwitchToIndividual?: () => void;
  organizationId?: string;
  onManageTeams?: () => void;
}

type UserRole = {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'owner' | 'admin' | 'member' | 'scorer';
  status: string;
  profiles?: {
    full_name: string;
    email: string;
  };
};

export const OrganizationProfileScreen = ({ onBack, organizerProfile, onSwitchToIndividual, organizationId, onManageTeams }: OrganizationProfileScreenProps) => {
  const [showRolesDialog, setShowRolesDialog] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<'owner' | 'admin' | 'member' | 'scorer'>("member");
  const [teamMembers, setTeamMembers] = useState<UserRole[]>([]);
  const [pendingInvites, setPendingInvites] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (organizationId) {
      fetchTeamMembers();
    }
  }, [organizationId]);

  const fetchTeamMembers = async () => {
    try {
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('organization_id', organizationId);

      if (rolesError) throw rolesError;

      // Fetch profiles separately
      const userIds = rolesData?.map(r => r.user_id) || [];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Combine data
      const combinedData = rolesData?.map(role => ({
        ...role,
        profiles: profilesData?.find(p => p.id === role.user_id)
      })) || [];

      const accepted = combinedData.filter(r => r.status === 'accepted');
      const pending = combinedData.filter(r => r.status === 'pending');
      
      setTeamMembers(accepted as any);
      setPendingInvites(pending as any);
    } catch (error: any) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleInviteMember = async () => {
    if (!newMemberEmail.trim() || !organizationId) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      // Find user by email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newMemberEmail.trim())
        .single();

      if (profileError || !profile) {
        toast.error("User not found with this email");
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create invitation
      const { error: inviteError } = await supabase
        .from('user_roles')
        .insert({
          user_id: profile.id,
          organization_id: organizationId,
          role: selectedRole,
          status: 'pending',
          invited_by: user.id
        });

      if (inviteError) throw inviteError;

      toast.success("Invitation sent successfully");
      setShowRolesDialog(false);
      setNewMemberEmail("");
      fetchTeamMembers();
    } catch (error: any) {
      toast.error(error.message || "Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (roleId: string, newRole: 'owner' | 'admin' | 'member' | 'scorer') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('id', roleId);

      if (error) throw error;

      toast.success("Role updated successfully");
      fetchTeamMembers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update role");
    }
  };

  const handleRemoveMember = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast.success("Member removed successfully");
      fetchTeamMembers();
    } catch (error: any) {
      toast.error(error.message || "Failed to remove member");
    }
  };
  
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
        
        {/* Pending Invites */}
        {pendingInvites.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Pending Invitations</h4>
            <div className="space-y-2">
              {pendingInvites.map((invite) => (
                <Card key={invite.id} className="p-3 bg-gradient-card border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-accent-foreground">
                          {invite.profiles?.full_name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{invite.profiles?.full_name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">{invite.profiles?.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                      Pending
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Active Members */}
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <Card key={member.id} className={member.role === 'owner' || member.role === 'admin' ? "p-4 bg-gradient-accent/10 border border-accent/20" : "p-4 bg-gradient-card"}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">
                      {member.profiles?.full_name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{member.profiles?.full_name || 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">{member.profiles?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {member.role === 'owner' ? (
                    <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Owner
                    </Badge>
                  ) : (
                    <Select 
                      value={member.role} 
                      onValueChange={(value) => handleUpdateRole(member.id, value as any)}
                    >
                      <SelectTrigger className="h-7 text-xs w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="scorer">Scorer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  {member.role !== 'owner' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          {teamMembers.length === 0 && (
            <Card className="p-6 text-center bg-gradient-card">
              <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No team members yet</p>
              <p className="text-xs text-muted-foreground mt-1">Invite members to get started</p>
            </Card>
          )}
        </div>
      </div>

      {/* Tournaments section removed as per requirements */}

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

      {/* Role badge */}
      <div className="px-6">
        <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">Admin View</Badge>
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
              <Select value={selectedRole} onValueChange={(value: any) => setSelectedRole(value)}>
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
            
            <Button 
              className="w-full" 
              onClick={handleInviteMember}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileContainer>
  );
};
