import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { TrendingUp, LoaderPinwheel, Percent } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  wins: number;
  losses: number;
  ratio: string;
  totalMatches: number;
}

export default function StatsCard({ wins, losses, ratio, totalMatches }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.statsGrid}>
      <View style={[styles.statCard, { backgroundColor: colors.muted + '10' }]}>
        <View style={styles.fullWidthContent}>
          <View style={[styles.statIcon, { backgroundColor: colors.muted + '20' }]}>
            <LoaderPinwheel size={18} color={colors.muted} />
          </View>
          <Text style={[styles.statValue, { color: colors.foreground }]}>{totalMatches}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Total Matches</Text>
        </View>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.ratingYellow + '10' }]}>
        <View style={[styles.statIcon, { backgroundColor: colors.ratingYellow + '20' }]}>
          <Percent size={18} color={colors.ratingYellow} />
        </View>
        <Text style={[styles.statValue, { color: colors.foreground }]}>{ratio}</Text>
        <Text style={[styles.statLabel, { color: colors.muted }]}>W/L Ratio</Text>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.ratingGreen + '10' }]}>
        <View style={[styles.statIcon, { backgroundColor: colors.ratingGreen + '20' }]}>
          <TrendingUp size={18} color={colors.ratingGreen} />
        </View>
        <Text style={[styles.statValue, { color: colors.foreground }]}>{wins}</Text>
        <Text style={[styles.statLabel, { color: colors.muted }]}>Wins</Text>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.ratingRed + '10' }]}>
        <View style={[styles.statIcon, { backgroundColor: colors.ratingRed + '20' }]}>
          <TrendingUp size={18} color={colors.ratingRed} style={{ transform: [{ rotate: '180deg' }] }} />
        </View>
        <Text style={[styles.statValue, { color: colors.foreground }]}>{losses}</Text>
        <Text style={[styles.statLabel, { color: colors.muted }]}>Losses</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  fullWidthContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
