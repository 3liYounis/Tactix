import AnimatedScreen from '@/components/animated/AnimatedScreen';
import FieldPlayers from '@/components/match/FieldPlayers';
import MatchInfoCard from '@/components/match/MatchInfoCard';
import { useTheme } from '@/hooks/useTheme';
import { Match } from '@/types/match';
import { ScrollView, StyleSheet } from 'react-native';
import PageHeader from '../custom/PageHeader';

interface Props {
  currentMatch: Match;
  isHosting: boolean;
  isMatchStarted: boolean;
  fieldSize: { width: number; height: number };
  fieldImage: any;
  onCopyCode: () => void;
  onStartMatch: () => void;
  onEndMatch: () => void;
  onCancel: () => void;
  onFieldLayout: (event: any) => void;
}

export default function ActiveMatchScreen({
  currentMatch,
  isHosting,
  isMatchStarted,
  fieldSize,
  fieldImage,
  onCopyCode,
  onStartMatch,
  onEndMatch,
  onCancel,
  onFieldLayout
}: Props) {
  const { colors } = useTheme();

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${dayName}\n${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const datePart = currentMatch.date ? formatDate(currentMatch.date) : '';
  const timePart = currentMatch.date ? formatTime(currentMatch.date) : '';

  return (
    <AnimatedScreen style={[styles.container, { backgroundColor: colors.background }]}>
      <PageHeader title="Active Match" subtitle="Match Details" imageSource={require('@/assets/images/football.png')} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MatchInfoCard
          name={currentMatch.name}
          code={currentMatch.code}
          location={currentMatch.location}
          datePart={datePart}
          timePart={timePart}
          onCopyCode={onCopyCode}
          isHosting={isHosting}
          isMatchStarted={isMatchStarted}
          currentCount={currentMatch.players_count}
          maxPlayers={currentMatch.maxPlayers}
          onStartMatch={onStartMatch}
          onEndMatch={onEndMatch}
          onCancel={onCancel}
        />

        <FieldPlayers
          teams={currentMatch.teams}
          formation={currentMatch.formation}
          fieldImage={fieldImage}
          fieldSize={fieldSize}
          onFieldLayout={onFieldLayout}
        />
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
});
