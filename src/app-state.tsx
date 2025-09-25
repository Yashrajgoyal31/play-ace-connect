import { useState } from 'react';
import { WelcomeScreen } from '@/components/onboarding/welcome-screen';
import { HomeScreen } from '@/components/home/home-screen';
import { BadmintonScoring } from '@/components/scoring/badminton-scoring';
import { ProfileScreen } from '@/components/profile/profile-screen';
import { PlayersScreen } from '@/components/players/players-screen';

type AppState = 'welcome' | 'home' | 'scoring' | 'profile' | 'players';

export const AppStateManager = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onGetStarted={() => setCurrentState('home')} 
          />
        );
      
      case 'home':
        return (
          <HomeScreen 
            onStartMatch={() => setCurrentState('scoring')}
            onFindPlayers={() => setCurrentState('players')}
            onViewProfile={() => setCurrentState('profile')}
          />
        );
      
      case 'profile':
        return (
          <ProfileScreen 
            onBack={() => setCurrentState('home')}
          />
        );
      
      case 'players':
        return (
          <PlayersScreen 
            onBack={() => setCurrentState('home')}
          />
        );
      
      case 'scoring':
        return (
          <BadmintonScoring 
            onBack={() => setCurrentState('home')}
            onEndMatch={() => setCurrentState('home')}
          />
        );
      
      default:
        return (
          <HomeScreen 
            onStartMatch={() => setCurrentState('scoring')}
            onFindPlayers={() => setCurrentState('players')}
            onViewProfile={() => setCurrentState('profile')}
          />
        );
    }
  };

  return renderCurrentScreen();
};