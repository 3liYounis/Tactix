import AnimatedCard from '@/components/animated/AnimatedCard';
import StatsCard from '@/components/dashboard/StatsCard';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { TrendingUp } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  wins: number;
  losses: number;
  ratio: string;
  totalMatches: number;
}

export default function RatioCard({ wins, losses, ratio, totalMatches }: Props) {
  const { colors } = useTheme();

  return (
    <AnimatedCard style={[
      styles.ratioCard,
      {
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }
    ]}>

      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <TrendingUp size={20} color={colors.primary} />
        </View>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Performance Overview
        </Text>
      </View>

        <StatsCard
          wins={wins}
          losses={losses}
          ratio={ratio}
          totalMatches={totalMatches}
        />

    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  ratioCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 0,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
});
