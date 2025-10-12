import AnimatedCard from '@/components/animated/AnimatedCard';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { Badge } from '@/types/player';
import { Award } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  badges: Badge[];
}

export default function AchievementsCard({ badges }: Props) {
  const { colors } = useTheme();
  return (
    <AnimatedCard style={[
      styles.achievementsCard,
      {
        backgroundColor: colors.accent,
        borderColor: colors.border,
        shadowColor: colors.foreground,
      }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.ratingYellow }]}>
          <Award size={20} color={colors.foreground} />
        </View>
        <Text style={[styles.achievementsTitle,{color: colors.foreground}]}>Recent Achievements</Text>
      </View>
      <View style={styles.achievementsList}>
        {badges && badges.map((badge) => (
          <View
            key={badge.label}
            style={[
              styles.achievementTag,
              {
                backgroundColor: colors.ratingYellow + '20',
                borderColor: colors.ratingYellow + '50',
              },
            ]}
          >
            <Text style={[styles.achievementText, {color: colors.ratingYellow}]}>
              {badge.label}
            </Text>
          </View>
        ))}
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  achievementsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementsTitle: {
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    fontSize: 16,
    flex: 1,
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  achievementText: {
    fontFamily: typography.fontFamily.kalamBold,
    fontSize: 12,
  },
});
