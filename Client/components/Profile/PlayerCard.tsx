import { useTheme } from '@/hooks/useTheme';
import { Player } from "@shared/types";
import { formatDate } from '@/utils/dateUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, LinearTransition } from 'react-native-reanimated';

interface Props {
  player: Player;
}

export default function PlayerCard({player}: Props) {
  const { colors, isDark, typography } = useTheme();
  const ratingColor = (n: number) =>
    n >= 80 ? colors.ratingGreen : n >= 70 ? colors.ratingYellow : n >= 60 ? colors.ratingOrange : colors.ratingRed;

  return (
    <Animated.View entering={FadeIn.duration(180)} layout={LinearTransition.duration(220)} style={[styles.cardOuter, { backgroundColor: colors.cardBackground }]}>
      <LinearGradient
        colors={isDark
          ? ['#2b2f36', '#1f2430', '#0b0f1a']
          : ['#ffffff', '#f7f7f9', '#e5e7eb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardInner}
      >
        <Animated.View entering={FadeInUp.duration(280)} layout={LinearTransition.duration(220)} style={styles.cardTop}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.overall, { color: colors.muted, fontFamily: typography.fontFamily.spaceGroteskBold }]}>{player.statistics.overall}</Text>
            </View>
              <Text style={[styles.subtle, { color: colors.muted, fontFamily: typography.fontFamily.spaceGroteskBold }]}>{player.favourite_position}</Text>
          </View>
          <View style={{ alignItems: 'flex-end'}}>
              <Text style={[styles.club, { color: colors.primary, fontFamily: typography.fontFamily.spaceGroteskBold }]}>Tactix FC</Text>
              <Text style={[styles.subtle, { color: colors.muted, fontFamily: typography.fontFamily.jetbrainsMono, letterSpacing: 0}]}>EST. {formatDate(player.dateJoined, 'year')}</Text>
            </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(320)} layout={LinearTransition.duration(220)} style={styles.center}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.foreground, fontFamily: typography.fontFamily.spaceGrotesk }]}>{player.initials}</Text>
          </View>
          <Text style={[styles.name, { color: colors.foreground, fontFamily: typography.fontFamily.spaceGroteskBold, fontSize: 20, letterSpacing: 0.5 }]}>{player.name}</Text>
          <View style={styles.metaRow}>
            <Text style={[styles.metaItem, { color: colors.foreground, fontFamily: typography.fontFamily.jetbrainsMonoBold, fontSize: 12, letterSpacing: 0.5 }]}>{player.physicalAttributes.age}y</Text>
            <Text style={[styles.metaDot, { color: colors.border, fontFamily: typography.fontFamily.spaceGroteskBold }]}>•</Text>
            <Text style={[styles.metaItem, { color: colors.foreground, fontFamily: typography.fontFamily.jetbrainsMonoBold, fontSize: 12, letterSpacing: 0.5 }]}>{player.physicalAttributes.height}cm</Text>
            <Text style={[styles.metaDot, { color: colors.border, fontFamily: typography.fontFamily.spaceGroteskBold }]}>•</Text>
            <Text style={[styles.metaItem, { color: colors.foreground, fontFamily: typography.fontFamily.jetbrainsMonoBold, fontSize: 12, letterSpacing: 0.5 }]}>{player.physicalAttributes.weight}kg</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
            <Text style={[styles.subtle, { color: colors.ratingGreen, fontFamily: typography.fontFamily.kalamBold, letterSpacing: 0}]}>LVL. {player.level}</Text>
            <Text style={[styles.metaDot, { color: colors.border, fontFamily: typography.fontFamily.spaceGroteskBold }]}>•</Text>
            <Text style={[styles.subtle, { color: colors.ratingOrange, fontFamily: typography.fontFamily.kalamBold, letterSpacing: 0}]}>STK. {player.streak}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(360)} layout={LinearTransition.duration(220)} style={styles.ratingsGrid}>
          {Object.entries(player.skills).map(([k, v]) => (
            <View key={k} style={styles.ratingCell}>
              <Text style={[styles.ratingVal, { color: ratingColor(v), fontFamily: typography.fontFamily.comfortaaBold, fontSize: 18, letterSpacing: 1 }]}>{v}</Text>
              <Text style={[styles.ratingKey, { color: colors.muted, fontFamily: typography.fontFamily.spaceGroteskBold, fontSize: 12 }]}>{k}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(400)} layout={LinearTransition.duration(220)} style={styles.achievements}>
          <Text style={[styles.achievementsTitle, { color: colors.muted, fontFamily: typography.fontFamily.spaceGroteskBold, fontWeight: typography.fontWeight.semibold }]}>Recent Achievements</Text>
          {/* <Animated.View entering={FadeInUp.duration(420)} layout={LinearTransition.duration(220)} style={styles.achievementsRow}>
            {player.badges.slice(0, 3).map((a) => (
              <View key={a.label} style={[styles.achip, { backgroundColor: colors.ratingYellow + '20', borderColor: colors.ratingYellow + '50' }]}>
                <Text style={[styles.achipText, { color: colors.ratingYellow, fontFamily: typography.fontFamily.kalamBold, fontWeight: typography.fontWeight.medium }]}>{a.label}</Text>
              </View>
            ))}
          </Animated.View> */}
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(440)} layout={LinearTransition.duration(220)} style={styles.quickRow}>
          <View style={styles.quickCol}>
          <Text style={[styles.quickNumber, { color: colors.primary, fontFamily: typography.fontFamily.jetbrainsMonoBold }]}>
              {player.statistics.matches_played}
            </Text>
            <Text style={[styles.quickLabel, { color: colors.muted, fontFamily: typography.fontFamily.spaceGroteskBold, fontWeight: typography.fontWeight.normal }]}>Matches</Text>
          </View>
          <View style={styles.quickCol}>
            <Text style={[styles.quickNumber, { color: colors.ratingGreen, fontFamily: typography.fontFamily.jetbrainsMonoBold }]}>
              {Math.round((player.statistics.matches_won / player.statistics.matches_played) * 100)}%
            </Text>
            <Text style={[styles.quickLabel, { color: colors.muted, fontFamily: typography.fontFamily.spaceGroteskBold, fontWeight: typography.fontWeight.normal }]}>Win Rate</Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
  },
  cardInner: {
    padding: 16
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overall: {
    fontSize: 28,
    marginRight: 8
  },
  position: {
    fontSize: 14
  },
  subtle: {
    fontSize: 14,
    letterSpacing: 3
  },
  club: {
    fontSize: 18,
  },
  center: {
    alignItems: 'center',
    marginBottom: 12
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '800',
    fontSize: 28
  },
  name: {
    fontSize: 22,
    marginTop: 8
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 5
  },
  metaItem: {
    fontSize: 13,
  },
  metaDot: {
    marginHorizontal: 5,
  },
  ratingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  ratingCell: {
    flexBasis: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginVertical: 8
  },
  ratingVal: {
    fontSize: 18,
    marginBottom: 2
  },
  ratingKey: {
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
    includeFontPadding: false,
    width: 40
  },
  achievements: {
    marginTop: 6,
    marginBottom: 12,
    alignItems: 'center'
  },
  achievementsTitle: {
    fontSize: 16,
    marginBottom: 6
  },
  achievementsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  achip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  achipText: {
    fontSize: 12,
    fontWeight: '600'
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  quickCol: {
    alignItems: 'center',
    minWidth: 120
  },
  quickNumber: {
    fontSize: 18,
  },
  quickLabel: {
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
    minWidth: 80
  },
});
