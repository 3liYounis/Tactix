import AnimatedScreen from '@/components/animated/AnimatedScreen';
import Error from '@/components/animated/Error';
import Loading from '@/components/animated/Loading';
import PageHeader from '@/components/custom/PageHeader';
import AchievementsCard from '@/components/dashboard/AchievementsCard';
import ProfileCard from '@/components/dashboard/ProfileCard';
import QuoteCard from '@/components/dashboard/QuoteCard';
import RatioCard from '@/components/dashboard/RatioCard';
import { footballQuotes } from '@/data/quotes';
import { usePlayer } from '@/hooks/usePlayer';
import { useTheme } from '@/hooks/useTheme';
import { ScrollView, StyleSheet, View } from 'react-native';

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
    const randomQuote = pickRandom(footballQuotes);
    return (
      <AnimatedScreen style={[styles.container, { backgroundColor: colors.background }]}>
        <PageHeader title="Dashboard" subtitle="Overview and insights" imageSource={require('@/assets/images/coach.png')} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.cardsContainer}>
            <ProfileCard player={player} />
            <QuoteCard
              quote={randomQuote}
            />
            <RatioCard wins={player.statistics?.matches_won || 0} losses={player.statistics?.matches_lost || 0} ratio={winLossRatio}/>
            <AchievementsCard badges={player.badges} />
          </View>
        </ScrollView>
      </AnimatedScreen>
    );
  }
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  cardsContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 40,
  },
});
