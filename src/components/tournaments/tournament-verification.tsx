import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileContainer } from "@/components/ui/mobile-container";
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Camera } from "lucide-react";

interface TournamentVerificationProps {
  tournamentId: string;
  onBack: () => void;
  onSubmitVerification: (data: any) => void;
}

export const TournamentVerification = ({ tournamentId, onBack, onSubmitVerification }: TournamentVerificationProps) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: '',
    authorizedPersonName: '',
    authorizedPersonDesignation: '',
    contactNumber: '',
    officialEmail: '',
    additionalInfo: '',
    documents: [] as File[]
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const requiredDocuments = [
    'Organization Registration Certificate',
    'Sports Authority Affiliation',
    'Authorized Person ID Proof',
    'Official Letter Head Sample'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const verificationData = {
      ...formData,
      documents: uploadedFiles,
      submittedAt: new Date(),
      status: 'pending'
    };
    onSubmitVerification(verificationData);
  };

  return (
    <MobileContainer className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-card">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Tournament Verification</h1>
            <p className="text-sm text-muted-foreground">Submit documents for authenticity</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-warning/20 text-warning">
          Verification Required
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        {/* Information Card */}
        <Card className="p-4 bg-gradient-accent/10 border-accent/20">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-accent">Why is verification needed?</h3>
              <p className="text-sm text-muted-foreground">
                To ensure tournament authenticity and prevent duplicate or fraudulent events, 
                we require official documentation from the organizing body.
              </p>
            </div>
          </div>
        </Card>

        {/* Organization Details */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Organization Details</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name*</Label>
              <Input
                id="orgName"
                placeholder="Official organization name"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="regNumber">Registration Number*</Label>
              <Input
                id="regNumber"
                placeholder="Government registration number"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="authorizedPerson">Authorized Person*</Label>
                <Input
                  id="authorizedPerson"
                  placeholder="Full name"
                  value={formData.authorizedPersonName}
                  onChange={(e) => setFormData({ ...formData, authorizedPersonName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation*</Label>
                <Input
                  id="designation"
                  placeholder="Position/Title"
                  value={formData.authorizedPersonDesignation}
                  onChange={(e) => setFormData({ ...formData, authorizedPersonDesignation: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Contact Number*</Label>
                <Input
                  id="contact"
                  placeholder="Official contact"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Official Email*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="organization@email.com"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional information about the tournament or organization..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Document Upload */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Required Documents</h3>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Please upload the following documents to verify your organization:
            </p>
            
            <div className="space-y-2">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Click to upload documents</p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG, DOC files up to 10MB each
              </p>
            </label>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-card rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Submit Button */}
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-success/10 border-success/20">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-semibold text-success">Verification Process</h4>
                <p className="text-sm text-muted-foreground">
                  Documents will be reviewed within 24-48 hours. You'll receive updates via email 
                  and in-app notifications.
                </p>
              </div>
            </div>
          </Card>

          <Button 
            variant="hero" 
            className="w-full"
            onClick={handleSubmit}
            disabled={!formData.organizationName || !formData.registrationNumber || uploadedFiles.length === 0}
          >
            Submit for Verification
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};