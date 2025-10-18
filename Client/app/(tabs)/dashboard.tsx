import AnimatedScreen from '@/components/animated/AnimatedScreen';
import Error from '@/components/animated/Error';
import Loading from '@/components/animated/Loading';
import PageHeader from '@/components/custom/PageHeader';
import ProfileCard from '@/components/dashboard/ProfileCard';
import RatioCard from '@/components/dashboard/RatioCard';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { footballQuotes } from '@/data/quotes';
import AchievementsCard from '@/components/dashboard/AchievementsCard';
import QuoteCard from '@/components/dashboard/QuoteCard';

export default function Dashboard() {
  const { colors } = useTheme();
  const { player, isLoading, error } = usePlayer();

  if (isLoading) {
    return (
      <AnimatedScreen style={[styles.container, { backgroundColor: colors.background }]}>
        <PageHeader title="Dashboard" subtitle="Loading your profile" imageSource={require('@/assets/images/coach.png')} />
        <Loading message="Loading your dashboard . . ."/>
      </AnimatedScreen>
    );
  }

  if (!isLoading && (error || !player)) {
    return (
      <AnimatedScreen style={[styles.container, { backgroundColor: colors.background }]}>
        <PageHeader title="Dashboard" subtitle="Profile Not Found :(" imageSource={require('@/assets/images/coach.png')} />
        <Error message={error || 'Player profile not found!'}/>
      </AnimatedScreen>
    );
  }
  else if (player) {
    const winLossRatio = (player.statistics.matches_won / (player.statistics.matches_lost || 1)).toFixed(1);
    // const randomQuote = pickRandom(footballQuotes);

    return (
      <AnimatedScreen style={[styles.container, { backgroundColor: colors.background }]}>
        <PageHeader
          title="Dashboard"
          subtitle="Your football journey overview"
          imageSource={require('@/assets/images/coach.png')}
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ProfileCard player={player} />

          <RatioCard
            wins={player.statistics?.matches_won || 0}
            losses={player.statistics?.matches_lost || 0}
            ratio={winLossRatio}
            totalMatches={player.statistics?.matches_played || 0}
          />

          {/* <QuoteCard quote={randomQuote} /> */}

          {/* <AchievementsCard badges={player.badges} /> */}
        </ScrollView>
      </AnimatedScreen>
    );
  }
}

// function pickRandom<T>(arr: T[]): T {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
