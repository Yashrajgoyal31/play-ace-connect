import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/ui/sport-icon";
import { MobileContainer } from "@/components/ui/mobile-container";
import heroImage from "@/assets/hero-sports-bg.jpg";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onOrganizationSetup: () => void;
}

export const WelcomeScreen = ({ onGetStarted, onOrganizationSetup }: WelcomeScreenProps) => {
  return (
    <MobileContainer className="relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/95" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-screen p-6 text-center">
        {/* Header with Logo */}
        <div className="flex flex-col items-center mt-16">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50"></div>
            <img 
              src="/src/assets/forehand-logo.png" 
              alt="Forehand" 
              className="relative w-24 h-24 object-contain"
            />
          </div>
          
          <h1 className="text-5xl font-black mb-4 bg-gradient-primary bg-clip-text text-transparent drop-shadow-lg">
            FOREHAND
          </h1>
          
          <p className="text-xl font-semibold text-primary mb-3 drop-shadow-md">
            Play more. Improve faster.
          </p>
          
          <p className="text-foreground/90 max-w-xs text-base leading-relaxed">
            Connect with players, score matches live, and dominate your sport with AI insights.
          </p>
        </div>

        {/* Sport Icons Animation */}
        <div className="flex items-center justify-center space-x-4 my-12">
          <SportIcon sport="badminton" size="md" className="animate-bounce shadow-glow-primary" style={{ animationDelay: '0ms' }} />
          <SportIcon sport="tennis" size="lg" className="animate-bounce shadow-glow-accent" style={{ animationDelay: '200ms' }} />
          <SportIcon sport="basketball" size="md" className="animate-bounce shadow-glow-primary" style={{ animationDelay: '400ms' }} />
          <SportIcon sport="table-tennis" size="md" className="animate-bounce shadow-glow-accent" style={{ animationDelay: '600ms' }} />
        </div>

        {/* CTA Section */}
        <div className="w-full space-y-4 pb-8">
          <Button 
            variant="hero" 
            className="w-full shadow-glow-primary hover:shadow-glow-accent"
            onClick={onOrganizationSetup}
          >
            Set Up Organization
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onGetStarted}
          >
            Continue as Individual
          </Button>

          {/* Temporary Quick Login Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button variant="secondary" className="w-full" onClick={onGetStarted}>
              Quick Login (Individual)
            </Button>
            <Button variant="secondary" className="w-full" onClick={onOrganizationSetup}>
              Quick Login (Org)
            </Button>
          </div>
          
          <p className="text-sm text-foreground/70 text-center">
            Join thousands of athletes improving their game
          </p>
        </div>
      </div>
    </MobileContainer>
  );
};