import AnimatedCard from '@/components/animated/AnimatedCard';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { Badge } from "@shared/types";
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
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Award size={20} color={colors.primary} />
        </View>
        <Text style={[styles.achievementsTitle, { color: colors.foreground }]}>
          Recent Achievements
        </Text>
      </View>

      <View style={styles.achievementsList}>
        {badges && badges.length > 0 ? (
          badges.map((badge, index) => (
            <View
              key={badge.label}
              style={[
                styles.achievementTag,
                {
                  backgroundColor: colors.primary + '15',
                  borderColor: colors.primary + '30',
                },
              ]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: colors.primary + '20' }]}>
                <Award size={12} color={colors.primary} />
              </View>
              <Text style={[styles.achievementText, { color: colors.primary }]}>
                {badge.label}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.muted + '20' }]}>
              <Award size={24} color={colors.muted} />
            </View>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              No achievements yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.muted }]}>
              Play matches to earn your first badge!
            </Text>
          </View>
        )}
      </View>

      {badges && badges.length > 0 && (
        <View style={styles.achievementsFooter}>
          <View style={[styles.decorativeLine, { backgroundColor: colors.primary }]} />
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Keep Playing to Unlock More
          </Text>
          <View style={[styles.decorativeLine, { backgroundColor: colors.primary }]} />
        </View>
      )}
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  achievementsCard: {
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
  achievementsTitle: {
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    letterSpacing: 0.5,
  },
  achievementsList: {
    marginBottom: 20,
  },
  achievementTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    gap: 10,
  },
  achievementIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementText: {
    fontFamily: typography.fontFamily.spaceGroteskBold,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: typography.fontFamily.spaceGroteskBold,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  achievementsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  decorativeLine: {
    height: 2,
    width: 30,
    borderRadius: 1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
