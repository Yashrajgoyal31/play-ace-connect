import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileContainer } from "@/components/ui/mobile-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Gift, Star, ShoppingBag, GraduationCap, Shirt, Zap, Trophy, Coins } from "lucide-react";

interface RewardsScreenProps {
  onBack: () => void;
  userPoints?: number;
}

interface RewardItem {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  discount: string;
  category: 'apparel' | 'equipment' | 'scholarships' | 'experiences';
  image?: string;
  brand?: string;
  isAvailable: boolean;
}

export const RewardsScreen = ({ onBack, userPoints = 1250 }: RewardsScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('apparel');

  const rewardItems: RewardItem[] = [
    // Apparel
    {
      id: '1',
      name: 'Nike Sports T-Shirt',
      description: 'Premium cotton sports t-shirt',
      pointsRequired: 200,
      discount: '20% OFF',
      category: 'apparel',
      brand: 'Nike',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Adidas Track Pants',
      description: 'Comfortable training track pants',
      pointsRequired: 350,
      discount: '25% OFF',
      category: 'apparel',
      brand: 'Adidas',
      isAvailable: true
    },
    {
      id: '3',
      name: 'Puma Sports Shoes',
      description: 'High-performance running shoes',
      pointsRequired: 800,
      discount: '30% OFF',
      category: 'apparel',
      brand: 'Puma',
      isAvailable: true
    },
    // Equipment
    {
      id: '4',
      name: 'Yonex Badminton Racket',
      description: 'Professional grade badminton racket',
      pointsRequired: 1200,
      discount: '15% OFF',
      category: 'equipment',
      brand: 'Yonex',
      isAvailable: true
    },
    {
      id: '5',
      name: 'Wilson Tennis Racket',
      description: 'Tournament quality tennis racket',
      pointsRequired: 1000,
      discount: '20% OFF',
      category: 'equipment',
      brand: 'Wilson',
      isAvailable: true
    },
    {
      id: '6',
      name: 'Spalding Basketball',
      description: 'Official size basketball',
      pointsRequired: 300,
      discount: '25% OFF',
      category: 'equipment',
      brand: 'Spalding',
      isAvailable: true
    },
    // Scholarships
    {
      id: '7',
      name: 'Sports Coaching Scholarship',
      description: '6-month professional coaching program',
      pointsRequired: 2000,
      discount: '50% OFF',
      category: 'scholarships',
      brand: 'Elite Sports Academy',
      isAvailable: true
    },
    {
      id: '8',
      name: 'Fitness Training Course',
      description: 'Certified personal trainer course',
      pointsRequired: 1500,
      discount: '40% OFF',
      category: 'scholarships',
      brand: 'Fitness Institute',
      isAvailable: true
    },
    {
      id: '9',
      name: 'Sports Nutrition Workshop',
      description: 'Learn proper sports nutrition',
      pointsRequired: 800,
      discount: '60% OFF',
      category: 'scholarships',
      brand: 'Nutrition Experts',
      isAvailable: true
    },
    // Experiences
    {
      id: '10',
      name: 'VIP Tournament Access',
      description: 'Exclusive access to major tournaments',
      pointsRequired: 1800,
      discount: 'Free Entry',
      category: 'experiences',
      brand: 'Tournament Organizers',
      isAvailable: true
    },
    {
      id: '11',
      name: 'Meet & Greet with Pro Athletes',
      description: 'Exclusive meet and greet session',
      pointsRequired: 2500,
      discount: 'Free Access',
      category: 'experiences',
      brand: 'Sports Management',
      isAvailable: true
    }
  ];

  const categories = [
    { id: 'apparel', name: 'Apparel', icon: Shirt, color: 'text-blue-500' },
    { id: 'equipment', name: 'Equipment', icon: Zap, color: 'text-green-500' },
    { id: 'scholarships', name: 'Scholarships', icon: GraduationCap, color: 'text-purple-500' },
    { id: 'experiences', name: 'Experiences', icon: Trophy, color: 'text-orange-500' }
  ];

  const filteredItems = rewardItems.filter(item => item.category === selectedCategory);

  const handleRedeem = (item: RewardItem) => {
    if (userPoints >= item.pointsRequired) {
      const url = `https://example.com/rewards/${encodeURIComponent(item.name.replace(/\s+/g,'-').toLowerCase())}`;
      window.open(url, '_blank');
    } else {
      alert(`You need ${item.pointsRequired - userPoints} more points to redeem this item.`);
    }
  };

  return (
    <MobileContainer className="pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-card to-card-elevated">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold">Rewards</h1>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Points Display */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-accent">{userPoints.toLocaleString()}</h2>
                <p className="text-sm text-muted-foreground">Points Available</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Earn more by</p>
              <p className="text-xs text-muted-foreground">Playing matches</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Tabs */}
      <div className="px-6 pb-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex-col space-y-1 py-3">
                  <IconComponent className={`w-4 h-4 ${category.color}`} />
                  <span className="text-xs">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Rewards Grid */}
      <div className="px-6 space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {item.brand}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{item.pointsRequired} points</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {item.discount}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {userPoints >= item.pointsRequired ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Gift className="w-4 h-4" />
                    <span className="text-sm font-medium">Available</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Need {item.pointsRequired - userPoints} more points
                    </span>
                  </div>
                )}
              </div>
              
              <Button
                size="sm"
                onClick={() => handleRedeem(item)}
                disabled={userPoints < item.pointsRequired}
                className={userPoints >= item.pointsRequired ? "bg-accent hover:bg-accent/90" : ""}
              >
                {userPoints >= item.pointsRequired ? "Redeem" : "Not Enough Points"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* How to Earn Points */}
      <div className="px-6 py-6">
        <Card className="bg-muted/50 p-4">
          <h3 className="font-semibold mb-3 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-accent" />
            <span>How to Earn Points</span>
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Win a match</span>
              <span className="font-medium text-accent">+50 points</span>
            </div>
            <div className="flex justify-between">
              <span>Participate in tournament</span>
              <span className="font-medium text-accent">+100 points</span>
            </div>
            <div className="flex justify-between">
              <span>Win tournament</span>
              <span className="font-medium text-accent">+500 points</span>
            </div>
            <div className="flex justify-between">
              <span>Daily practice session</span>
              <span className="font-medium text-accent">+25 points</span>
            </div>
          </div>
        </Card>
      </div>
    </MobileContainer>
  );
};
