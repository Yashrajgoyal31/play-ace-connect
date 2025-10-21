import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { ArrowLeft, Upload, Building2, MapPin, Phone, Mail, Globe, Users, Trophy, Calendar } from "lucide-react";

interface OrganizerProfileProps {
  organizationType: string;
  onBack: () => void;
  onComplete: (profileData: any) => void;
}

export const OrganizerProfile = ({ organizationType, onBack, onComplete }: OrganizerProfileProps) => {
  const [profileData, setProfileData] = useState({
    organizationName: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    establishedYear: "",
    totalMembers: "",
    logo: null as File | null,
    certificates: [] as File[],
    // Organization specific fields
    affiliatedTo: "", // For schools/academies
    principalName: "", // For schools
    coachingStaff: "", // For academies
    facilityType: "", // For clubs
    sportsOffered: [] as string[],
    achievements: "",
    licenseNumber: "" // For registered organizations
  });

  const handleFileUpload = (file: File, type: 'logo' | 'certificates') => {
    if (type === 'logo') {
      setProfileData({ ...profileData, logo: file });
    } else {
      setProfileData({ ...profileData, certificates: [...profileData.certificates, file] });
    }
  };

  const handleSportsToggle = (sport: string) => {
    const updatedSports = profileData.sportsOffered.includes(sport)
      ? profileData.sportsOffered.filter(s => s !== sport)
      : [...profileData.sportsOffered, sport];
    setProfileData({ ...profileData, sportsOffered: updatedSports });
  };

  const availableSports = [
    "Badminton", "Tennis", "Table Tennis", "Basketball", "Cricket", 
    "Football", "Volleyball", "Swimming", "Athletics", "Chess"
  ];

  const getOrganizationTypeLabel = () => {
    switch (organizationType) {
      case 'educational': return 'Educational Institution';
      case 'academy': return 'Sports Academy';
      case 'club': return 'Sports Club';
      case 'corporate': return 'Corporate';
      case 'others': return 'Organization';
      default: return 'Organization';
    }
  };

  const renderOrganizationSpecificFields = () => {
    switch (organizationType) {
      case 'educational':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="principalName">Principal/Head Name*</Label>
              <Input
                id="principalName"
                value={profileData.principalName}
                onChange={(e) => setProfileData({ ...profileData, principalName: e.target.value })}
                placeholder="Principal's full name"
              />
            </div>
            <div>
              <Label htmlFor="affiliatedTo">Affiliated To</Label>
              <Input
                id="affiliatedTo"
                value={profileData.affiliatedTo}
                onChange={(e) => setProfileData({ ...profileData, affiliatedTo: e.target.value })}
                placeholder="CBSE, ICSE, State Board, etc."
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">Institution License/Registration Number</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                placeholder="Institution registration number"
              />
            </div>
          </div>
        );

      case 'academy':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="coachingStaff">Number of Coaches</Label>
              <Input
                id="coachingStaff"
                type="number"
                value={profileData.coachingStaff}
                onChange={(e) => setProfileData({ ...profileData, coachingStaff: e.target.value })}
                placeholder="Total coaching staff"
              />
            </div>
            <div>
              <Label htmlFor="affiliatedTo">Sports Authority Affiliation</Label>
              <Input
                id="affiliatedTo"
                value={profileData.affiliatedTo}
                onChange={(e) => setProfileData({ ...profileData, affiliatedTo: e.target.value })}
                placeholder="SAI, State Sports Authority, etc."
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">Academy License Number</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                placeholder="Sports academy license"
              />
            </div>
          </div>
        );

      case 'club':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="facilityType">Facility Type</Label>
              <Input
                id="facilityType"
                value={profileData.facilityType}
                onChange={(e) => setProfileData({ ...profileData, facilityType: e.target.value })}
                placeholder="Indoor/Outdoor/Both"
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">Club Registration Number</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                placeholder="Sports club registration"
              />
            </div>
          </div>
        );

      case 'corporate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="licenseNumber">Company Registration Number</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                placeholder="Corporate registration number"
              />
            </div>
          </div>
        );

      case 'others':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="licenseNumber">Registration/License Number (if any)</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                placeholder="Organization registration number"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isFormValid = () => {
    const basicValid = profileData.organizationName && 
                      profileData.contactPerson && 
                      profileData.email && 
                      profileData.phone &&
                      profileData.address &&
                      profileData.sportsOffered.length > 0;

    const orgSpecificValid = organizationType === 'educational' 
      ? profileData.principalName 
      : true;

    return basicValid && orgSpecificValid;
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
            <h1 className="text-xl font-bold">Create {getOrganizationTypeLabel()} Profile</h1>
            <p className="text-sm text-muted-foreground">Complete your organization details</p>
          </div>
        </div>
        <Building2 className="w-6 h-6 text-primary" />
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Basic Information</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationName">{getOrganizationTypeLabel()} Name*</Label>
              <Input
                id="organizationName"
                value={profileData.organizationName}
                onChange={(e) => setProfileData({ ...profileData, organizationName: e.target.value })}
                placeholder={`Enter ${getOrganizationTypeLabel().toLowerCase()} name`}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={profileData.description}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                placeholder="Brief description of your organization"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  type="number"
                  value={profileData.establishedYear}
                  onChange={(e) => setProfileData({ ...profileData, establishedYear: e.target.value })}
                  placeholder="2020"
                />
              </div>
              <div>
                <Label htmlFor="totalMembers">Total Members</Label>
                <Input
                  id="totalMembers"
                  type="number"
                  value={profileData.totalMembers}
                  onChange={(e) => setProfileData({ ...profileData, totalMembers: e.target.value })}
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Contact Information</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactPerson">Contact Person*</Label>
              <Input
                id="contactPerson"
                value={profileData.contactPerson}
                onChange={(e) => setProfileData({ ...profileData, contactPerson: e.target.value })}
                placeholder="Primary contact person name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email*</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="contact@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone*</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="website"
                  type="url"
                  className="pl-10"
                  value={profileData.website}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Address*</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address*</Label>
              <Textarea
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                placeholder="Complete address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  placeholder="City name"
                />
              </div>
              <div>
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  placeholder="State name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pincode">Pin Code*</Label>
              <Input
                id="pincode"
                value={profileData.pincode}
                onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                placeholder="123456"
              />
            </div>
          </div>
        </Card>

        {/* Organization Specific Fields */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4">{getOrganizationTypeLabel()} Details</h3>
          {renderOrganizationSpecificFields()}
        </Card>

        {/* Sports Offered */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Sports Offered*</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {availableSports.map((sport) => (
              <Card
                key={sport}
                className={`p-3 cursor-pointer transition-all ${
                  profileData.sportsOffered.includes(sport)
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-gradient-accent/10 hover:bg-gradient-accent/20"
                }`}
                onClick={() => handleSportsToggle(sport)}
              >
                <div className="text-center">
                  <span className="text-sm font-medium">{sport}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4">Achievements & Recognition</h3>
          <Textarea
            value={profileData.achievements}
            onChange={(e) => setProfileData({ ...profileData, achievements: e.target.value })}
            placeholder="List your organization's achievements, awards, or recognition"
            rows={3}
          />
        </Card>

        {/* Documents Upload */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Documents</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label>Organization Logo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Upload logo (optional)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logo')}
                  className="hidden"
                  id="logo-upload"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>
                  Choose File
                </Button>
                {profileData.logo && (
                  <p className="text-xs text-primary mt-1">{profileData.logo.name}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Certificate of Incorporation</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Upload Certificate of Incorporation</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      Array.from(e.target.files).forEach(file => 
                        handleFileUpload(file, 'certificates')
                      );
                    }
                  }}
                  className="hidden"
                  id="certificates-upload"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById('certificates-upload')?.click()}>
                  Choose Files
                </Button>
                {profileData.certificates.length > 0 && (
                  <div className="mt-2">
                    {profileData.certificates.map((file, index) => (
                      <p key={index} className="text-xs text-primary">{file.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            variant="hero" 
            className="w-full"
            disabled={!isFormValid()}
            onClick={() => onComplete(profileData)}
          >
            Complete Profile Setup
          </Button>
          {/* Temporary Quick Login */}
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => onComplete({
              ...profileData,
              organizationName: profileData.organizationName || 'Demo Organization',
              contactPerson: profileData.contactPerson || 'Admin',
              email: profileData.email || 'admin@example.com',
              phone: profileData.phone || '+919999999999',
              sportsOffered: profileData.sportsOffered.length ? profileData.sportsOffered : ['badminton','tennis']
            })}
          >
            Quick Login (Temp)
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};