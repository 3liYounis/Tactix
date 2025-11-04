import ActiveMatchScreen from '@/components/match/ActiveMatchScreen';
import HostMatchScreen from '@/components/match/HostMatchScreen';
import JoinMatchScreen from '@/components/match/JoinMatchScreen';
import NoMatchScreen from '@/components/match/NoMatchScreen';
import PostMatchSurvey from '@/components/survey/PostMatchSurvey';
import { useToastContext } from '@/context/ToastContext';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { sampleMatch14 } from '../../data/match';
import { Match, MatchInfo } from "@shared/types";
import * as matchService from '@/services/matchService';

export default function MatchRoom() {
  const { player } = usePlayer();
  const { isDark } = useTheme();
  const { showToast } = useToastContext();
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [isHosting, setIsHosting] = useState(false);
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [showHostForm, setShowHostForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });
  const [hostForm, setHostForm] = useState<MatchInfo>({
    name: "",
    location: "",
    date: new Date(),
    capacity: 10,
  });
  const [joinForm, setJoinForm] = useState({
    gameCode: ''
  });
  const fieldImage = isDark ? require('../../assets/images/field_light.png')
                            : require('../../assets/images/field_light.png');
  const sampleMatchData: Match = sampleMatch14;
  const copyRoomCode = () => {
    if (currentMatch) {
      showToast('Match code copied to clipboard', 'info');
    }
  };
  const startMatch = () => {
    setIsMatchStarted(true);
  };
  const endMatch = () => {
    setShowSurvey(true);
  };

  const handleSurveyComplete = () => {
    setShowSurvey(false);
    setCurrentMatch(null);
    setIsHosting(false);
    setIsMatchStarted(false);
    showToast('Survey completed! Thanks for your feedback.', 'success');
  };
  const createMatch = async () => {
    try {
      const response = await matchService.createMatch(hostForm);
      if (response) {
        setCurrentMatch(sampleMatchData);
        setIsHosting(true);
        setShowHostForm(false);
        showToast(`Match Created! Code: ${response.code}`, 'success');
      }
      else {
        showToast('Failed to create match on server', 'error');
      }
    }
    catch (error) {
      console.error('Error creating match:', error);
      showToast('Error creating match. Please try again.', 'error');
    }
  };

  const cancelMatch = () => {
    setCurrentMatch(null);
    setIsHosting(false);
    setIsMatchStarted(false);
    setShowHostForm(false);
    setHostForm({
      name: '',
      location: '',
      date: new Date(),
      capacity: 10,
    });
  };

  const joinMatch = () => {
    setShowJoinForm(true);
  };

  const hostMatch = () => {
    setShowHostForm(true);
  };

  const joinExistingMatch = async () => {
    if (!joinForm.gameCode.trim()) {
      showToast('Please enter a game code', 'error');
      return;
    }
    const match = await matchService.joinMatch(joinForm.gameCode, player!.id)
    setCurrentMatch(sampleMatch14);

    setIsMatchStarted(false);
    setShowJoinForm(false);
    setJoinForm({ gameCode: '' });
    showToast('Joined match successfully', 'success');
  };
  const handleNameChange = (text: string) => {
    setHostForm(prev => ({ ...prev, name: text }));
  };

  const handleLocationChange = (text: string) => {
    setHostForm(prev => ({ ...prev, location: text }));
  };

  const handleTimeChange = (date: Date) => {
    setHostForm(prev => ({ ...prev, date: date }));
  };

  const handleFormationChange = (value: number) => {
    setHostForm(prev => ({ ...prev, capacity: value }));
  };

  const handleJoinCodeChange = (text: string) => {
    setJoinForm(prev => ({ ...prev, gameCode: text }));
  };

  if (showSurvey) {
    return <PostMatchSurvey player={player} onComplete={handleSurveyComplete} />;
  }

  if (showHostForm) {
    return (
      <HostMatchScreen
        hostForm={hostForm}
        onNameChange={handleNameChange}
        onLocationChange={handleLocationChange}
        onTimeChange={handleTimeChange}
        onFormationChange={handleFormationChange}
        onCreateMatch={createMatch}
        onClose={() => setShowHostForm(false)}
      />
    );
  }
  if (showJoinForm) {
    return (
      <JoinMatchScreen
        joinForm={joinForm}
        onJoinCodeChange={handleJoinCodeChange}
        onJoinMatch={joinExistingMatch}
        onClose={() => setShowJoinForm(false)}
      />
    );
  }
  if (!currentMatch) {
    return (
      <NoMatchScreen
        onHostMatch={hostMatch}
        onJoinMatch={joinMatch}
      />
    );
  }

  return (
    <ActiveMatchScreen
      currentMatch={currentMatch}
      isHosting={isHosting}
      isMatchStarted={isMatchStarted}
      fieldSize={fieldSize}
      fieldImage={fieldImage}
      onCopyCode={copyRoomCode}
      onStartMatch={startMatch}
      onEndMatch={endMatch}
      onCancel={cancelMatch}
      onFieldLayout={(event) => {
        const { width: w, height: h } = event.nativeEvent.layout;
        if (w !== fieldSize.width || h !== fieldSize.height) {
          setFieldSize({ width: w, height: h });
        }
      } } onLeaveMatch={function (): void {
        throw new Error('Function not implemented.');
      } }    />
  );
}
