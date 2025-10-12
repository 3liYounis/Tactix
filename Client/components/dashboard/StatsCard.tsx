import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  wins: number;
  losses: number;
  winLossRatio: string;
}

export default function StatsCard({ wins, losses, winLossRatio }: Props) {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.ratioContainer}>
      <View style={styles.ratioItem}>
        <Text style={[styles.winValue, { color: colors.ratingGreen }]}>{wins}</Text>
        <Text style={[styles.winLabel, { color: colors.muted }]}>Wins</Text>
      </View>
        <Text style={[styles.ratioValue, { color: colors.foreground }]}>
        {winLossRatio}
      </Text>
      <View style={styles.ratioItem}>
        <Text style={[styles.lossValue, { color: colors.ratingRed }]}>{losses}</Text>
        <Text style={[styles.lossLabel, { color: colors.muted }]}>Losses</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ratioItem: {
    alignItems: 'center',
    flex: 1,
  },
  winValue: {
    fontSize: 24,
    letterSpacing: 0.2,
    fontFamily: typography.fontFamily.comfortaaBold,
  },
  winLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.kalam,
  },
  lossValue: {
    fontSize: 24,
    letterSpacing: 0.2,
    fontFamily: typography.fontFamily.comfortaaBold,
  },
  lossLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.kalam,
  },
  ratioValue: {
    fontSize: 32,
    marginHorizontal: 20,
    letterSpacing: 0.5,
    fontFamily: typography.fontFamily.comfortaaBold,
  },
});
