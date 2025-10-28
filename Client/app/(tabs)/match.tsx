import ActiveMatchScreen from '@/components/match/ActiveMatchScreen';
import HostMatchScreen from '@/components/match/HostMatchScreen';
import JoinMatchScreen from '@/components/match/JoinMatchScreen';
import NoMatchScreen from '@/components/match/NoMatchScreen';
import PostMatchSurvey from '@/components/survey/PostMatchSurvey';
import { useToastContext } from '@/context/ToastContext';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { sampleMatch } from '../../data/match';
import { Match } from "@shared/types";
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
  const [hostForm, setHostForm] = useState({
    name: '',
    location: '',
    time: '',
    players_count: 7,
    maxPlayers: 14
  });
  const [joinForm, setJoinForm] = useState({
    gameCode: ''
  });
  const fieldImage = isDark ? require('../../assets/images/field_dark.png')
                            : require('../../assets/images/field_light.png');
  const sampleMatchData: Match = sampleMatch;
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

  const generateMatchCode = () => {
    const code = `M${hostForm.players_count}V${hostForm.players_count}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    return code;
  };

  const createMatch = async () => {
    if (!hostForm.name.trim() || !hostForm.location.trim() || !hostForm.time.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      const matchDate = new Date();
      const matchCode = generateMatchCode();

      const newMatch: Match = {
        name: hostForm.name,
        code: 12345,
        location: hostForm.location,
        date: matchDate,
        time: hostForm.time,
        count: 1,
        capacity: hostForm.maxPlayers,
        started: true,
        formation: `${hostForm.players_count}v${hostForm.players_count}`,
        teams: [
          {
            name: "Team 1",
            color: "Red",
            players: []
          },
          {
            name: "Team 2",
            color: "Blue",
            players: []
          }
        ]
      };

      const response = await matchService.createMatch(newMatch);

      if (response.success) {
        setCurrentMatch(newMatch);
        setIsHosting(true);
        setShowHostForm(false);
        showToast(`Match Created! Code: ${newMatch.code}`, 'success');
      } else {
        showToast('Failed to create match on server', 'error');
      }
    } catch (error) {
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
      time: '',
      players_count: 7,
      maxPlayers: 14
    });
  };

  const joinMatch = () => {
    setShowJoinForm(true);
  };

  const hostMatch = () => {
    setShowHostForm(true);
  };

  const joinExistingMatch = () => {
    if (!joinForm.gameCode.trim()) {
      showToast('Please enter a game code', 'error');
      return;
    }
    setCurrentMatch(sampleMatchData);
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

  const handleTimeChange = (text: string) => {
    setHostForm(prev => ({ ...prev, time: text }));
  };

  const handleFormationChange = (value: string) => {
    setHostForm(prev => ({
      ...prev,
      players_count: parseInt(value),
      maxPlayers: parseInt(value) * 2
    }));
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
      }}
    />
  );
}
