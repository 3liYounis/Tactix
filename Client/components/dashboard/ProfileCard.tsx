import { typography } from '@/constants/typography';
import { CircleStar, Flame, Zap } from 'lucide-react-native';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Player } from '../../types/player';

interface Props {
  player: Player;
  style?: ViewStyle;
}

export default function ProfileCard({ player, style }: Props) {
  const { colors, isDark } = useTheme();

  return (
    <View style={[
      styles.container,
      {
        borderColor: colors.primary,
        backgroundColor: colors.accent,
      },
      style
    ]}>
      <View style={[styles.avatar, {
        backgroundColor: colors.primary,
        borderColor: isDark ? colors.secondaryForeground : colors.secondary
      }]}>
        {player.profilePicture ? (
          <Image
            source={{ uri: player.profilePicture }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>
              {player.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.playerInfo}>
        <Text style={[styles.playerName, {color: colors.foreground}]}>
          {player.name}
        </Text>
        <Text style={[styles.playerUsername, {color: colors.muted}]}>
          @{player.username}
        </Text>
      </View>
      <View style={styles.headerRight}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={[styles.currencyBadge, { backgroundColor: isDark ? colors.secondaryForeground : colors.secondary }]}>
              <CircleStar size={16} color={isDark ? colors.background : colors.secondaryForeground} />
              <Text style={[styles.currencyText, { color: isDark ? colors.background : colors.secondaryForeground }]}>{player.position}</Text>
            </View>
            <View style={[styles.currencyBadge, { backgroundColor: colors.primaryDark }]}>
              <Zap size={16} color={colors.background} />
              <Text style={[styles.currencyText, { color: colors.background }]}>{player.level}</Text>
            </View>
            <View style={[styles.currencyBadge, { backgroundColor: colors.ratingOrange }]}>
              <Flame size={16} color={colors.background} />
              <Text style={[styles.currencyText, { color: colors.background }]}>{player.streak}</Text>
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  currencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  currencyText: {
    fontSize: 12,
    marginTop: 3,
    fontFamily: typography.fontFamily.kalamBold,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  playerInfo: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  playerUsername: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: 0.8,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
});
