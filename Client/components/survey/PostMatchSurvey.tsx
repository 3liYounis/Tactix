import AnimatedScreen from '@/components/animated/AnimatedScreen';
import CustomButton from '@/components/custom/CustomButton';
import PlayerProfileCard from '@/components/survey/PlayerProfileCard';
import RatingSelector from '@/components/survey/RatingSelector';
import SkillAssessment from '@/components/survey/SkillAssessment';
import SurveyHeader from '@/components/survey/SurveyHeader';
import SurveyProgress from '@/components/survey/SurveyProgress';
import { useTheme } from '@/hooks/useTheme';
import { Player } from "@shared/types";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageHeader from '../custom/PageHeader';

interface SurveyQuestion {
  id: string;
  category: string;
  skill: string;
  question: string;
}

interface Props {
  player: Player | null;
  onComplete: () => void;
}

export default function PostMatchSurvey({ player, onComplete }: Props) {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const players = player ? [{
    id: player.username || 'current',
    name: player.name,
    initials: player.initials,
    position: player.position,
    color: '#E91E63',
    badge: 'star'
  }] : [
    { id: '1', name: 'Sarah Williams', initials: 'SW', position: 'FWD', color: '#E91E63', badge: 'star' },
    { id: '2', name: 'John Smith', initials: 'JS', position: 'MID', color: '#4CAF50' },
    { id: '3', name: 'Emma Davis', initials: 'ED', position: 'DEF', color: '#00BCD4' },
    { id: '4', name: 'Michael Brown', initials: 'MB', position: 'GK', color: '#FF9800' },
  ];

  const questions: SurveyQuestion[] = [
    { id: '1', category: 'Technical Skills', skill: 'Dribbling', question: 'How smooth was their ball control and dribbling?' },
    { id: '2', category: 'Technical Skills', skill: 'Passing', question: 'How accurate and creative were their passes?' },
    { id: '3', category: 'Technical Skills', skill: 'Shooting', question: 'How clinical were they in front of goal?' },
    { id: '4', category: 'Physical Skills', skill: 'Speed', question: 'How quick were they on and off the ball?' },
    { id: '5', category: 'Physical Skills', skill: 'Stamina', question: 'How well did they maintain energy throughout?' },
    { id: '6', category: 'Mental Skills', skill: 'Decision Making', question: 'How smart were their tactical decisions?' },
    { id: '7', category: 'Mental Skills', skill: 'Leadership', question: 'How well did they communicate and lead?' },
  ];

  const currentPlayerData = players[currentPlayer];
  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedRating(0);
    }
    else {
      onComplete();
    }
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1: return colors.ratingRed;
      case 2: return colors.ratingOrange;
      case 3: return colors.ratingYellow;
      case 4: return colors.chart4;
      case 5: return colors.ratingGreen;
      default: return colors.border;
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedRating(0);
    } else if (currentPlayer > 0) {
      setCurrentPlayer(currentPlayer - 1);
      setCurrentQuestion(questions.length - 1);
      setSelectedRating(0);
    }
  };

  return (
    <AnimatedScreen style={{ flex: 1, backgroundColor: colors.background }}>
      <PageHeader title="Rate Your Teammates" subtitle={'Time to give feedback'}  imageSource={require('@/assets/images/result.png')}  />
      <View style={styles.container}>
        <SurveyHeader
          title="Rate Your Teammates"
          current={currentQuestion + 1}
          total={questions.length}
          onBack={handleBack}
        />

        <SurveyProgress progressPercent={progress} />

        <PlayerProfileCard player={currentPlayerData} questionCategory={currentQuestionData.category}/>

        <SkillAssessment skill={currentQuestionData.skill} question={currentQuestionData.question} />

        <RatingSelector selected={selectedRating} onSelect={handleRatingSelect} getRatingColor={getRatingColor}/>

        <CustomButton
          style={{ ...styles.actionButton, backgroundColor: colors.primary }}
          onPress={handleNext}
          disabled={selectedRating === 0}
        >
          <Text style={{ color: colors.primaryForeground, fontSize: 18, letterSpacing: 0.5 }}>
            {(currentQuestion === questions.length - 1 && currentPlayer === players.length - 1) ? 'FINISH' : 'NEXT'}
          </Text>
        </CustomButton>
      </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:25
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  }
});
