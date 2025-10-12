import AnimatedCard from '@/components/animated/AnimatedCard';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { TrendingUp } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  wins: number;
  losses: number;
  ratio: string;
}

export default function RatioCard({ wins, losses, ratio }: Props) {
  const { typography, colors } = useTheme();

  return (
    <AnimatedCard style={[
      styles.ratioCard,
      {
        backgroundColor: colors.accent,
        borderColor: colors.border,
        shadowColor: colors.foreground,
      }
    ]}>
      <View style={[styles.flagHeader, { backgroundColor: colors.accent }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <TrendingUp size={20} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.flagTitle, {
          color: colors.foreground,
        }]}>
          Win/Loss Ratio
        </Text>
      </View>

      <View style={styles.flagBody}>

        <View style={[styles.flagSection, { backgroundColor: colors.ratingGreen }]}>
          <Text style={[styles.sectionLabel, { color: colors.background }]}>WINS</Text>
          <Text style={[styles.sectionValue, { color: colors.foreground }]}>{wins}</Text>
        </View>

        <View style={[styles.flagSection, { backgroundColor: colors.ratingYellow }]}>
          <Text style={[styles.sectionLabel, { color: colors.background }]}>RATIO</Text>
          <Text style={[styles.sectionValue, { color: colors.foreground }]}>{ratio}</Text>
        </View>

        <View style={[styles.flagSection, { backgroundColor: colors.ratingRed }]}>
          <Text style={[styles.sectionLabel, { color: colors.background }]}>LOSSES</Text>
          <Text style={[styles.sectionValue, { color: colors.foreground }]}>{losses}</Text>
        </View>
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  ratioCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  flagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  flagTitle: {
    fontSize: 16,
    letterSpacing: 1,
    flex: 1,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  flagBody: {
    flexDirection: 'row',
    height: 80,
    gap: 10,
    margin: 10,
    marginTop: 0,
  },
  flagSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  sectionLabel: {
    fontSize: 13,
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  sectionValue: {
    fontSize: 18,
    fontFamily: typography.fontFamily.comfortaaBold,
  },
});
