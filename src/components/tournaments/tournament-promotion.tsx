import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileContainer } from "@/components/ui/mobile-container";
import { ArrowLeft, Download, Share, QrCode, Users, Calendar, MapPin, Trophy, Copy, Check } from "lucide-react";

interface TournamentPromotionProps {
  tournamentData: any;
  onBack: () => void;
}

export const TournamentPromotion = ({ tournamentData, onBack }: TournamentPromotionProps) => {
  const [copied, setCopied] = useState(false);
  
  const tournamentUrl = `https://yourapp.com/tournament/${tournamentData.name.toLowerCase().replace(/\s+/g, '-')}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tournamentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareData = {
    title: tournamentData.name,
    text: `Join the ${tournamentData.name} tournament!`,
    url: tournamentUrl
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  const downloadCreative = () => {
    // Create a simple tournament poster
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 1200;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(tournamentData.name, canvas.width / 2, 150);
    
    // Sport
    ctx.font = '32px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(tournamentData.sport.toUpperCase(), canvas.width / 2, 220);
    
    // Details
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    
    const details = [
      `📅 ${tournamentData.startDate} - ${tournamentData.endDate}`,
      `📍 ${tournamentData.location}`,
      `👥 Max ${tournamentData.maxParticipants} participants`,
      `🏆 Prize Pool: ₹${tournamentData.prizePool.toLocaleString()}`
    ];
    
    details.forEach((detail, index) => {
      ctx.fillText(detail, 80, 350 + (index * 60));
    });
    
    // QR Code placeholder (if generated)
    if (tournamentData.promotional.qrData) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(300, 700, 200, 200);
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Scan to Join', canvas.width / 2, 950);
    }
    
    // Download
    const link = document.createElement('a');
    link.download = `${tournamentData.name}-poster.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <MobileContainer className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card-elevated">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Tournament Promotion</h1>
            <p className="text-sm text-muted-foreground">Share and promote your tournament</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tournament Preview */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4">{tournamentData.name}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="capitalize">{tournamentData.sport}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{tournamentData.startDate} - {tournamentData.endDate}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{tournamentData.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-primary" />
              <span>{tournamentData.maxParticipants} participants max</span>
            </div>
          </div>
        </Card>

        {/* QR Code */}
        {tournamentData.promotional.generateQR && tournamentData.promotional.qrData && (
          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <QrCode className="w-5 h-5" />
              <span>QR Code</span>
            </h3>
            
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={tournamentData.promotional.qrData} 
                alt="Tournament QR Code" 
                className="w-48 h-48 border border-border rounded-lg"
              />
              <p className="text-sm text-muted-foreground text-center">
                Players can scan this QR code to quickly access and join the tournament
              </p>
              <Button variant="outline" onClick={() => {
                const link = document.createElement('a');
                link.download = `${tournamentData.name}-qr-code.png`;
                link.href = tournamentData.promotional.qrData;
                link.click();
              }}>
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </Card>
        )}

        {/* Creative Poster */}
        {tournamentData.promotional.generateCreative && (
          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Tournament Poster</h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-b from-background to-muted rounded-lg p-8 text-center border border-border">
                <h4 className="text-2xl font-bold mb-2">{tournamentData.name}</h4>
                <p className="text-lg text-primary mb-4 uppercase tracking-wider">{tournamentData.sport}</p>
                <div className="space-y-2 text-sm">
                  <p>📅 {tournamentData.startDate} - {tournamentData.endDate}</p>
                  <p>📍 {tournamentData.location}</p>
                  <p>🏆 Prize Pool: ₹{tournamentData.prizePool.toLocaleString()}</p>
                </div>
              </div>
              
              <Button variant="outline" onClick={downloadCreative} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Poster
              </Button>
            </div>
          </Card>
        )}

        {/* Sharing Options */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4">Share Tournament</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tournament Link</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 p-3 bg-background border border-border rounded-lg text-sm">
                  {tournamentUrl}
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" onClick={() => {
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Join the ${tournamentData.name} tournament! ${tournamentUrl}`)}`;
                window.open(whatsappUrl, '_blank');
              }}>
                <span className="mr-2">📱</span>
                WhatsApp
              </Button>
            </div>
          </div>
        </Card>

        {/* Season Info */}
        {tournamentData.season.hasSeasons && (
          <Card className="p-6 bg-gradient-accent/10">
            <h3 className="text-lg font-semibold mb-2">Season Information</h3>
            <p className="text-muted-foreground">
              This tournament is part of <strong>{tournamentData.season.name}</strong> ({tournamentData.season.year})
            </p>
          </Card>
        )}
      </div>
    </MobileContainer>
  );
};