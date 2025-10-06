import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Invitation = {
  id: string;
  organization_id: string;
  role: string;
  organizations?: {
    name: string;
    type: string;
  };
};

export const InvitationDialog = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          organizations (
            name,
            type
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'pending');

      if (error) throw error;

      if (data && data.length > 0) {
        setInvitations(data);
        setShowDialog(true);
      }
    } catch (error: any) {
      console.error('Error fetching invitations:', error);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ status: 'accepted' })
        .eq('id', invitationId);

      if (error) throw error;

      toast.success("Invitation accepted!");
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      
      if (invitations.length <= 1) {
        setShowDialog(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to accept invitation");
    }
  };

  const handleDeclineInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', invitationId);

      if (error) throw error;

      toast.success("Invitation declined");
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      
      if (invitations.length <= 1) {
        setShowDialog(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to decline invitation");
    }
  };

  if (invitations.length === 0) return null;

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="mx-4 max-w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader>
          <DialogTitle>Organization Invitations</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {invitations.map((invitation) => (
            <Card key={invitation.id} className="p-4 bg-gradient-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{invitation.organizations?.name}</p>
                  <p className="text-xs text-muted-foreground">{invitation.organizations?.type}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {invitation.role}
                </Badge>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() => handleAcceptInvitation(invitation.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() => handleDeclineInvitation(invitation.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
