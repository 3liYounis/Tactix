import AnimatedCard from '@/components/animated/AnimatedCard';
import { typography } from '@/constants/typography';
import { CircleStar, Flame, Zap, Trophy } from 'lucide-react-native';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Player } from "@shared/types";
import Position from '../custom/Position';

interface Props {
  player: Player;
  style?: ViewStyle;
}

export default function ProfileCard({ player, style }: Props) {
  const { colors } = useTheme();
  const winRate = Math.round(((player.statistics?.matches_won || 0) / (player.statistics?.matches_played || 1)) * 100);

  return (
    <AnimatedCard style={[
      styles.container,
      {
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }]}>

      <View style={styles.header}>
        <View style={[styles.avatar, {
          backgroundColor: colors.primary,
          borderColor: colors.primary + '40'
        }]}>
          {player.profilePicture ? (
            <Image
              source={{ uri: player.profilePicture }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>
                {player.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, { color: colors.foreground }]}>
            {player.name}
          </Text>
          <Text style={[styles.playerUsername, { color: colors.muted }]}>
            @{player.username}
          </Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
            <CircleStar size={16} color={colors.primary} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {player.favourite_position}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Position
            </Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.ratingYellow + '20' }]}>
            <Zap size={16} color={colors.ratingYellow} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {player.level}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Level
            </Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.ratingOrange + '20' }]}>
            <Flame size={16} color={colors.ratingOrange} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {player.streak}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Streak
            </Text>
          </View>
        </View>
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 0,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 22,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    marginBottom: 4,
  },
  playerUsername: {
    fontSize: 14,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    marginBottom: 8,
    opacity: 0.7,
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  positionText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    textAlign: 'center',
  },
});
