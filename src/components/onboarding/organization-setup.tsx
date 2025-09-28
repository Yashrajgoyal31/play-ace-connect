import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Building2, GraduationCap, Trophy, Users } from "lucide-react";

interface OrganizationSetupProps {
  onComplete: (orgType: string) => void;
}

export const OrganizationSetup = ({ onComplete }: OrganizationSetupProps) => {
  const [selectedOrgType, setSelectedOrgType] = useState<string>('');

  const organizationTypes = [
    {
      id: 'school',
      name: 'School',
      description: 'Educational institution with students',
      icon: GraduationCap,
      features: ['Roll numbers', 'Age categories (U-14, U-16, etc.)', 'Class-wise tournaments']
    },
    {
      id: 'academy',
      name: 'Sports Academy',
      description: 'Professional sports training center',
      icon: Trophy,
      features: ['Skill-based grouping', 'Professional coaching', 'Performance tracking']
    },
    {
      id: 'club',
      name: 'Sports Club',
      description: 'Community sports organization',
      icon: Users,
      features: ['Member rankings', 'Club tournaments', 'Social matches']
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Company sports activities',
      icon: Building2,
      features: ['Employee tournaments', 'Department-wise teams', 'Office leagues']
    }
  ];

  return (
    <MobileContainer>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Forehand</h1>
            <p className="text-muted-foreground">
              Let's set up your organization to get the best experience
            </p>
          </div>
        </div>

        {/* Organization Types */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">What type of organization are you?</h2>
          
          <div className="space-y-3">
            {organizationTypes.map((org) => {
              const IconComponent = org.icon;
              return (
                <Card
                  key={org.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedOrgType === org.id
                      ? 'bg-gradient-primary text-primary-foreground border-primary'
                      : 'bg-gradient-card hover:bg-gradient-accent/20'
                  }`}
                  onClick={() => setSelectedOrgType(org.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedOrgType === org.id 
                        ? 'bg-primary-foreground/20' 
                        : 'bg-primary/10'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        selectedOrgType === org.id 
                          ? 'text-primary-foreground' 
                          : 'text-primary'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{org.name}</h3>
                      <p className={`text-sm mb-3 ${
                        selectedOrgType === org.id 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'
                      }`}>
                        {org.description}
                      </p>
                      
                      <div className="space-y-1">
                        {org.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              selectedOrgType === org.id 
                                ? 'bg-primary-foreground/60' 
                                : 'bg-primary/60'
                            }`} />
                            <span className={`text-xs ${
                              selectedOrgType === org.id 
                                ? 'text-primary-foreground/90' 
                                : 'text-muted-foreground'
                            }`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            variant="hero" 
            className="w-full"
            disabled={!selectedOrgType}
            onClick={() => onComplete(selectedOrgType)}
          >
            Continue Setup
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};