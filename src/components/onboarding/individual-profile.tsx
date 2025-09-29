import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Trophy, MapPin, Calendar } from "lucide-react";

interface IndividualProfileProps {
  onBack: () => void;
  onComplete: (profileData: any) => void;
}

export const IndividualProfile = ({ onBack, onComplete }: IndividualProfileProps) => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    primarySport: "",
    skillLevel: "",
    yearsPlaying: "",
    preferredPlayTime: "",
    goals: ""
  });

  const sports = [
    "Badminton", "Tennis", "Table Tennis", "Basketball", "Cricket", 
    "Football", "Volleyball", "Swimming", "Athletics", "Chess"
  ];

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Professional"];
  const playTimes = ["Morning", "Afternoon", "Evening", "Flexible"];

  const isFormValid = () => {
    return profileData.fullName && 
           profileData.age && 
           profileData.gender && 
           profileData.city && 
           profileData.primarySport && 
           profileData.skillLevel;
  };

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Create Your Profile</h1>
            <p className="text-sm text-muted-foreground">Tell us about yourself</p>
          </div>
        </div>
        <User className="w-6 h-6 text-accent" />
      </div>

      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <User className="w-5 h-5 text-accent" />
            <span>Personal Information</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name*</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age*</Label>
                <Input
                  id="age"
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender*</Label>
                <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Location</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City*</Label>
              <Input
                id="city"
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                placeholder="Your city"
              />
            </div>
            <div>
              <Label htmlFor="state">State*</Label>
              <Input
                id="state"
                value={profileData.state}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                placeholder="Your state"
              />
            </div>
          </div>
        </Card>

        {/* Sports Information */}
        <Card className="p-6 bg-gradient-card border-2 border-accent/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span>Sports Profile</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="primarySport">Primary Sport*</Label>
              <Select value={profileData.primarySport} onValueChange={(value) => setProfileData({ ...profileData, primarySport: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your main sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport.toLowerCase().replace(' ', '-')}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skillLevel">Skill Level*</Label>
                <Select value={profileData.skillLevel} onValueChange={(value) => setProfileData({ ...profileData, skillLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearsPlaying">Years Playing</Label>
                <Input
                  id="yearsPlaying"
                  type="number"
                  value={profileData.yearsPlaying}
                  onChange={(e) => setProfileData({ ...profileData, yearsPlaying: e.target.value })}
                  placeholder="5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preferredPlayTime">Preferred Play Time</Label>
              <Select value={profileData.preferredPlayTime} onValueChange={(value) => setProfileData({ ...profileData, preferredPlayTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="When do you prefer to play?" />
                </SelectTrigger>
                <SelectContent>
                  {playTimes.map((time) => (
                    <SelectItem key={time} value={time.toLowerCase()}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goals">Goals & Aspirations</Label>
              <Input
                id="goals"
                value={profileData.goals}
                onChange={(e) => setProfileData({ ...profileData, goals: e.target.value })}
                placeholder="What are your sports goals?"
              />
            </div>
          </div>
        </Card>

        {/* Complete Button */}
        <Button 
          className="w-full bg-gradient-accent hover:bg-accent/90" 
          onClick={() => onComplete(profileData)}
          disabled={!isFormValid()}
        >
          Complete Setup
        </Button>
      </div>
    </MobileContainer>
  );
};