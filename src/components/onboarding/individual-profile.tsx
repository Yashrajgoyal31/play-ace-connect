import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Trophy, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndividualProfileProps {
  onBack: () => void;
  onComplete: (profileData: any) => void;
}

export const IndividualProfile = ({ onBack, onComplete }: IndividualProfileProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [sportSearch, setSportSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sports = [
    "Badminton", "Tennis", "Table Tennis", "Basketball", "Cricket", 
    "Football", "Volleyball", "Swimming", "Athletics", "Chess",
    "Hockey", "Golf", "Boxing", "Kabaddi", "Wrestling"
  ];

  const filteredSports = useMemo(() => {
    return sports.filter(sport => 
      sport.toLowerCase().includes(sportSearch.toLowerCase())
    );
  }, [sportSearch]);

  const toggleSport = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  const isFormValid = () => {
    if (!fullName || !phone || !day || !month || !year || !gender || selectedSports.length === 0) {
      return false;
    }
    
    // Validate date
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) return false;
    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) return false;
    
    // Check if user is at least 8 years old
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 8 || (age === 8 && monthDiff < 0) || (age === 8 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return false;
    }
    
    return true;
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
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 1234567890"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include country code (e.g., +91 for India)
              </p>
            </div>

            <div>
              <Label>Date of Birth* (Must be at least 8 years old)</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Input
                    type="number"
                    placeholder="DD"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    min="1"
                    max="31"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="MM"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    min="1"
                    max="12"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="YYYY"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
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
            
            {/* Search and Dropdown */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search sports..."
                  value={sportSearch}
                  onChange={(e) => setSportSearch(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="pl-10"
                />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-card border border-accent/20 rounded-md shadow-lg">
                  {filteredSports.length > 0 ? (
                    filteredSports.map((sport) => (
                      <div 
                        key={sport} 
                        className="flex items-center space-x-3 p-3 hover:bg-accent/10 cursor-pointer"
                        onClick={() => {
                          toggleSport(sport);
                          setSportSearch("");
                        }}
                      >
                        <Checkbox
                          id={`dropdown-${sport}`}
                          checked={selectedSports.includes(sport)}
                          onCheckedChange={() => toggleSport(sport)}
                        />
                        <Label
                          htmlFor={`dropdown-${sport}`}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {sport}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                      No sports found
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Selected Sports Display */}
            {selectedSports.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSports.map((sport) => (
                  <div 
                    key={sport} 
                    className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{sport}</span>
                    <button 
                      onClick={() => toggleSport(sport)}
                      className="hover:text-accent-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Complete Button */}
        <Button 
          className="w-full bg-gradient-accent hover:bg-accent/90" 
          onClick={() => {
            const dateOfBirth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            onComplete({ 
              fullName,
              phone,
              dateOfBirth, 
              gender, 
              primarySports: selectedSports 
            });
          }}
          disabled={!isFormValid()}
        >
          Complete Setup
        </Button>
      </div>
    </MobileContainer>
  );
};