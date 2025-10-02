import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Trophy, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface IndividualProfileProps {
  onBack: () => void;
  onComplete: (profileData: any) => void;
}

export const IndividualProfile = ({ onBack, onComplete }: IndividualProfileProps) => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [gender, setGender] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const sports = [
    "Badminton", "Tennis", "Table Tennis", "Basketball", "Cricket", 
    "Football", "Volleyball", "Swimming", "Athletics", "Chess"
  ];

  const toggleSport = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  const isFormValid = () => {
    return fullName && dateOfBirth && gender && selectedSports.length > 0;
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label>Date of Birth*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="gender">Gender*</Label>
              <Select value={gender} onValueChange={setGender}>
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
        </Card>

        {/* Sports Information */}
        <Card className="p-6 bg-gradient-card border-2 border-accent/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span>Primary Sports*</span>
          </h3>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select all sports you play</p>
            {sports.map((sport) => (
              <div key={sport} className="flex items-center space-x-3">
                <Checkbox
                  id={sport}
                  checked={selectedSports.includes(sport)}
                  onCheckedChange={() => toggleSport(sport)}
                />
                <Label
                  htmlFor={sport}
                  className="text-sm font-normal cursor-pointer"
                >
                  {sport}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Complete Button */}
        <Button 
          className="w-full bg-gradient-accent hover:bg-accent/90" 
          onClick={() => onComplete({ 
            fullName, 
            dateOfBirth, 
            gender, 
            primarySports: selectedSports 
          })}
          disabled={!isFormValid()}
        >
          Complete Setup
        </Button>
      </div>
    </MobileContainer>
  );
};