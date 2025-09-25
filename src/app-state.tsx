import { useState } from 'react';
import { WelcomeScreen } from '@/components/onboarding/welcome-screen';
import { HomeScreen } from '@/components/home/home-screen';
import { SportSelection } from '@/components/match/sport-selection';
import { MatchSetup } from '@/components/match/match-setup';
import { BadmintonScoring } from '@/components/scoring/badminton-scoring';
import { ProfileScreen } from '@/components/profile/profile-screen';
import { PlayersScreen } from '@/components/players/players-screen';

type AppState = 'welcome' | 'home' | 'sport-selection' | 'match-setup' | 'scoring' | 'profile' | 'players';

export const AppStateManager = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [selectedSport, setSelectedSport] = useState<string>('');

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
            onStartMatch={() => setCurrentState('sport-selection')}
            onFindPlayers={() => setCurrentState('players')}
            onViewProfile={() => setCurrentState('profile')}
          />
        );
      
      case 'sport-selection':
        return (
          <SportSelection 
            onBack={() => setCurrentState('home')}
            onSelectSport={(sport) => {
              setSelectedSport(sport);
              setCurrentState('match-setup');
            }}
          />
        );
      
      case 'match-setup':
        return (
          <MatchSetup 
            sport={selectedSport}
            onBack={() => setCurrentState('sport-selection')}
            onStartMatch={() => setCurrentState('scoring')}
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
            onStartMatch={() => setCurrentState('sport-selection')}
            onFindPlayers={() => setCurrentState('players')}
            onViewProfile={() => setCurrentState('profile')}
          />
        );
    }
  };

  return renderCurrentScreen();
};