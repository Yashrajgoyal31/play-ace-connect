import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/ui/sport-icon";
import { MobileContainer } from "@/components/ui/mobile-container";
import { ArrowLeft, Upload, MapPin, Calendar, Users, Trophy, IndianRupee, QrCode, Palette, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface TournamentCreateProps {
  onBack: () => void;
  onCreateTournament: (tournamentData: any) => void;
}

export const TournamentCreate = ({ onBack, onCreateTournament }: TournamentCreateProps) => {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    format: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    maxParticipants: 16,
    entryFee: 0,
    prizePool: 0,
    hasEntryFee: false,
    isPrivate: false,
    season: {
      name: "",
      year: new Date().getFullYear(),
      hasSeasons: false
    },
    promotional: {
      generateCreative: false,
      generateQR: false,
      qrData: null as string | null
    },
    rules: {
      bestOf: 3,
      timeLimit: 90,
      substitutionsAllowed: true
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const totalSteps = 5;

  const sports = [
    { id: "badminton", name: "Badminton" },
    { id: "tennis", name: "Tennis" },
    { id: "basketball", name: "Basketball" },
    { id: "table-tennis", name: "Table Tennis" }
  ];

  const formats = [
    { id: "knockout", name: "Knockout", description: "Single elimination bracket" },
    { id: "league", name: "League", description: "Round-robin format" },
    { id: "group-knockout", name: "Groups + Knockout", description: "Group stage followed by knockouts" }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    const tournamentData = {
      ...formData,
      promotional: {
        ...formData.promotional,
        qrData: qrCodeUrl
      }
    };
    onCreateTournament(tournamentData);
  };

  const generateQRCode = async () => {
    try {
      const QRCode = (await import('qrcode')).default;
      const tournamentUrl = `https://yourapp.com/tournament/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
      const qrDataUrl = await QRCode.toDataURL(tournamentUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
      setFormData({
        ...formData,
        promotional: {
          ...formData.promotional,
          qrData: qrDataUrl,
          generateQR: true
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `${formData.name}-qr-code.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Tournament Basics</h2>
              <p className="text-muted-foreground mb-6">Let's start with the essentials</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tournament Name*</Label>
                <Input
                  id="name"
                  placeholder="e.g., City Championship 2024"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label>Select Sport*</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {sports.map((sport) => (
                    <Card
                      key={sport.id}
                      className={`p-4 cursor-pointer transition-all ${
                        formData.sport === sport.id
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-gradient-card"
                      }`}
                      onClick={() => setFormData({ ...formData, sport: sport.id })}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <SportIcon sport={sport.id as any} size="sm" />
                        <span className="text-sm font-medium">{sport.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tournament Format*</Label>
                <div className="space-y-2 mt-2">
                  {formats.map((format) => (
                    <Card
                      key={format.id}
                      className={`p-3 cursor-pointer transition-all ${
                        formData.format === format.id
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-gradient-card"
                      }`}
                      onClick={() => setFormData({ ...formData, format: format.id })}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{format.name}</p>
                          <p className="text-xs opacity-80">{format.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {format.name}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Schedule & Location</h2>
              <p className="text-muted-foreground mb-6">When and where will it happen?</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date*</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date*</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location*</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Sports Complex, City"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell players about your tournament..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Select
                  value={formData.maxParticipants.toString()}
                  onValueChange={(value) => setFormData({ ...formData, maxParticipants: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8 players/teams</SelectItem>
                    <SelectItem value="16">16 players/teams</SelectItem>
                    <SelectItem value="32">32 players/teams</SelectItem>
                    <SelectItem value="64">64 players/teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Fees & Prizes</h2>
              <p className="text-muted-foreground mb-6">Set entry fees and prize distribution</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Entry Fee</Label>
                  <p className="text-sm text-muted-foreground">Charge participants to join</p>
                </div>
                <Switch
                  checked={formData.hasEntryFee}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasEntryFee: checked })}
                />
              </div>

              {formData.hasEntryFee && (
                <div>
                  <Label htmlFor="entryFee">Entry Fee Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="entryFee"
                      type="number"
                      placeholder="500"
                      className="pl-10"
                      value={formData.entryFee}
                      onChange={(e) => setFormData({ ...formData, entryFee: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="prizePool">Prize Pool (₹)</Label>
                <div className="relative">
                  <Trophy className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="prizePool"
                    type="number"
                    placeholder="10000"
                    className="pl-10"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total prize money for winners
                </p>
              </div>

              <Card className="p-4 bg-gradient-card">
                <h4 className="font-medium mb-2">Prize Distribution</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>🥇 Winner:</span>
                    <span>₹{Math.floor(formData.prizePool * 0.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥈 Runner-up:</span>
                    <span>₹{Math.floor(formData.prizePool * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥉 3rd Place:</span>
                    <span>₹{Math.floor(formData.prizePool * 0.2).toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Seasons & Promotional</h2>
              <p className="text-muted-foreground mb-6">Set up seasons and promotional materials</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Seasons</Label>
                  <p className="text-sm text-muted-foreground">Organize tournaments by seasons</p>
                </div>
                <Switch
                  checked={formData.season.hasSeasons}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    season: { ...formData.season, hasSeasons: checked }
                  })}
                />
              </div>

              {formData.season.hasSeasons && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="seasonName">Season Name</Label>
                    <Input
                      id="seasonName"
                      placeholder="e.g., Summer Championship 2024"
                      value={formData.season.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        season: { ...formData.season, name: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seasonYear">Season Year</Label>
                    <Input
                      id="seasonYear"
                      type="number"
                      value={formData.season.year}
                      onChange={(e) => setFormData({
                        ...formData,
                        season: { ...formData.season, year: parseInt(e.target.value) || new Date().getFullYear() }
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <Label>Generate Tournament Creative</Label>
                  <p className="text-sm text-muted-foreground">Create promotional poster</p>
                </div>
                <Switch
                  checked={formData.promotional.generateCreative}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    promotional: { ...formData.promotional, generateCreative: checked }
                  })}
                />
              </div>

              {formData.promotional.generateCreative && (
                <Card className="p-4 bg-gradient-accent/10">
                  <div className="flex items-center space-x-3">
                    <Palette className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Creative Poster</h4>
                      <p className="text-sm text-muted-foreground">
                        A custom poster will be generated with tournament details
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <Label>Generate QR Code</Label>
                  <p className="text-sm text-muted-foreground">For easy tournament sharing</p>
                </div>
                <Switch
                  checked={formData.promotional.generateQR}
                  onCheckedChange={(checked) => {
                    setFormData({
                      ...formData,
                      promotional: { ...formData.promotional, generateQR: checked }
                    });
                    if (checked && !qrCodeUrl) {
                      generateQRCode();
                    }
                  }}
                />
              </div>

              {formData.promotional.generateQR && (
                <Card className="p-4 bg-gradient-accent/10">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <QrCode className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-medium">QR Code</h4>
                        <p className="text-sm text-muted-foreground">
                          Scan to join tournament
                        </p>
                      </div>
                    </div>
                    
                    {qrCodeUrl ? (
                      <div className="flex items-center space-x-4">
                        <img src={qrCodeUrl} alt="Tournament QR Code" className="w-20 h-20" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">
                            Players can scan this QR code to join the tournament
                          </p>
                          <Button variant="outline" size="sm" onClick={downloadQRCode}>
                            <Download className="w-4 h-4 mr-2" />
                            Download QR Code
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" onClick={generateQRCode}>
                        <QrCode className="w-4 h-4 mr-2" />
                        Generate QR Code
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Rules & Settings</h2>
              <p className="text-muted-foreground mb-6">Configure tournament rules</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Private Tournament</Label>
                  <p className="text-sm text-muted-foreground">Only invited players can join</p>
                </div>
                <Switch
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                />
              </div>

              {formData.sport && (
                <Card className="p-4 bg-gradient-card">
                  <h4 className="font-medium mb-3">Sport-Specific Rules</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Match Format</Label>
                      <Select
                        value={formData.rules.bestOf.toString()}
                        onValueChange={(value) => setFormData({
                          ...formData,
                          rules: { ...formData.rules, bestOf: parseInt(value) }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Best of 1</SelectItem>
                          <SelectItem value="3">Best of 3</SelectItem>
                          <SelectItem value="5">Best of 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Time Limit (minutes)</Label>
                      <Input
                        type="number"
                        value={formData.rules.timeLimit}
                        onChange={(e) => setFormData({
                          ...formData,
                          rules: { ...formData.rules, timeLimit: parseInt(e.target.value) || 90 }
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Substitutions</Label>
                        <p className="text-sm text-muted-foreground">Players can substitute during matches</p>
                      </div>
                      <Switch
                        checked={formData.rules.substitutionsAllowed}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          rules: { ...formData.rules, substitutionsAllowed: checked }
                        })}
                      />
                    </div>
                  </div>
                </Card>
              )}

              <Card className="p-4 bg-gradient-accent/10">
                <h4 className="font-medium mb-2">Tournament Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{formData.name || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sport:</span>
                    <span className="font-medium capitalize">{formData.sport || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium capitalize">{formData.format || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participants:</span>
                    <span className="font-medium">{formData.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Fee:</span>
                    <span className="font-medium">
                      {formData.hasEntryFee ? `₹${formData.entryFee}` : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prize Pool:</span>
                    <span className="font-medium">₹{formData.prizePool.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Season:</span>
                    <span className="font-medium">
                      {formData.season.hasSeasons ? `${formData.season.name} (${formData.season.year})` : "No seasons"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>QR Code:</span>
                    <span className="font-medium">
                      {formData.promotional.generateQR ? "Generated" : "Not generated"}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.sport && formData.format;
      case 2:
        return formData.startDate && formData.endDate && formData.location;
      case 3:
        return true; // Optional step
      case 4:
        return true; // Promotional step is optional
      case 5:
        return true; // Rules are optional
      default:
        return false;
    }
  };

  return (
    <MobileContainer className="pb-32">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Create Tournament</h1>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 pb-24">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card-elevated/95 backdrop-blur-md border-t border-border/50 p-4">
        <div className="flex space-x-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious} className="flex-1">
              Previous
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button 
              variant="neomorph"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-primary text-primary-foreground"
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="neomorph"
              onClick={handleCreate}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-primary text-primary-foreground"
            >
              Create Tournament
            </Button>
          )}
        </div>
      </div>
    </MobileContainer>
  );
};