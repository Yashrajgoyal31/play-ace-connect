import { useState } from 'react';
import { WelcomeScreen } from '@/components/onboarding/welcome-screen';
import { OrganizationSetup } from '@/components/onboarding/organization-setup';
import { HomeScreen } from '@/components/home/home-screen';
import { SportSelection } from '@/components/match/sport-selection';
import { MatchSetup } from '@/components/match/match-setup';
import { BadmintonScoring } from '@/components/scoring/badminton-scoring';
import { ProfileScreen } from '@/components/profile/profile-screen';
import { PlayersScreen } from '@/components/players/players-screen';
import { TournamentList } from '@/components/tournaments/tournament-list';
import { TournamentCreate } from '@/components/tournaments/tournament-create';
import { TournamentDetail } from '@/components/tournaments/tournament-detail';
import { TournamentVerification } from '@/components/tournaments/tournament-verification';
import { TournamentPromotion } from '@/components/tournaments/tournament-promotion';
import { OrganizerProfile } from '@/components/onboarding/organizer-profile';

type AppState = 'welcome' | 'organization-setup' | 'organizer-profile' | 'home' | 'sport-selection' | 'match-setup' | 'scoring' | 'profile' | 'players' | 'tournaments' | 'tournament-create' | 'tournament-detail' | 'tournament-verification' | 'tournament-promotion';

export const AppStateManager = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>('');
  const [organizationType, setOrganizationType] = useState<string>('');
  const [organizerProfile, setOrganizerProfile] = useState<any>(null);
  const [currentTournamentData, setCurrentTournamentData] = useState<any>(null);

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onGetStarted={() => setCurrentState('home')}
            onOrganizationSetup={() => setCurrentState('organization-setup')}
          />
        );
      
      case 'organization-setup':
        return (
          <OrganizationSetup 
            onComplete={(orgType) => {
              setOrganizationType(orgType);
              setCurrentState('organizer-profile');
            }}
          />
        );

      case 'organizer-profile':
        return (
          <OrganizerProfile 
            organizationType={organizationType}
            onBack={() => setCurrentState('organization-setup')}
            onComplete={(profileData) => {
              setOrganizerProfile(profileData);
              setCurrentState('home');
            }}
          />
        );
      
      case 'home':
        return (
          <HomeScreen 
            onStartMatch={() => setCurrentState('sport-selection')}
            onFindPlayers={() => setCurrentState('players')}
            onViewProfile={() => setCurrentState('profile')}
            onViewTournaments={() => setCurrentState('tournaments')}
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
        // This will be handled by sport-specific components
        const mockMatchSetup = {
          players: { 
            teamA: ['Player 1', 'Player 2'], 
            teamB: ['Player 3', 'Player 4'] 
          },
          format: 'doubles' as const,
          bestOf: 3
        };
        
        return (
          <BadmintonScoring 
            onBack={() => setCurrentState('home')}
            onEndMatch={() => setCurrentState('home')}
            matchSetup={mockMatchSetup}
          />
        );

      case 'tournaments':
        return (
          <TournamentList 
            onBack={() => setCurrentState('home')}
            onCreateTournament={() => setCurrentState('tournament-create')}
            onJoinTournament={(tournamentId) => {
              setSelectedTournamentId(tournamentId);
              setCurrentState('tournament-detail');
            }}
            onViewTournament={(tournamentId) => {
              setSelectedTournamentId(tournamentId);
              setCurrentState('tournament-detail');
            }}
          />
        );

      case 'tournament-create':
        return (
          <TournamentCreate 
            onBack={() => setCurrentState('tournaments')}
            onCreateTournament={(tournamentData) => {
              console.log('Creating tournament:', tournamentData);
              setCurrentTournamentData(tournamentData);
              if (tournamentData.promotional.generateCreative || tournamentData.promotional.generateQR) {
                setCurrentState('tournament-promotion');
              } else {
                setCurrentState('tournaments');
              }
            }}
          />
        );

      case 'tournament-detail':
        return (
          <TournamentDetail 
            tournamentId={selectedTournamentId}
            onBack={() => setCurrentState('tournaments')}
            onJoinTournament={() => {
              console.log('Joining tournament:', selectedTournamentId);
            }}
            onViewMatch={(matchId) => {
              console.log('Viewing match:', matchId);
            }}
            onRequestVerification={() => setCurrentState('tournament-verification')}
          />
        );

      case 'tournament-verification':
        return (
          <TournamentVerification 
            tournamentId={selectedTournamentId}
            onBack={() => setCurrentState('tournament-detail')}
            onSubmitVerification={(data) => {
              console.log('Verification submitted:', data);
              setCurrentState('tournament-detail');
            }}
          />
        );

      case 'tournament-promotion':
        return (
          <TournamentPromotion 
            tournamentData={currentTournamentData}
            onBack={() => setCurrentState('tournaments')}
          />
        );
      
      default:
        return (
          <HomeScreen 
            onStartMatch={() => setCurrentState('sport-selection')}
            onFindPlayers={() => setCurrentState('players')}
            onViewProfile={() => setCurrentState('profile')}
            onViewTournaments={() => setCurrentState('tournaments')}
          />
        );
    }
  };

  return renderCurrentScreen();
};