import { useTheme } from '@/hooks/useTheme';
import { Player } from '@/types/player';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Position from '../custom/Position';

interface Props {
  index: number;
  player: Player & { uid: string; color: string; status: 'online' | 'away' | 'offline' | string };
  onAddFriend?: () => void;
  onRemoveFriend?: () => void;
  isFriend?: boolean;
}
export default function PlayerRow({ index, player, onAddFriend, onRemoveFriend, isFriend = false }: Props) {
  const { colors, typography } = useTheme();
  const scale = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // const statusColor =
  //   player.status === 'online' ? colors.ratingGreen : player.status === 'away' ? colors.ratingYellow : colors.muted;

  const ratingBg = player.statistics.overall >= 80 ? colors.ratingGreen : player.statistics.overall >= 70 ? colors.ratingYellow : '#f97316';
  return (
    <Animated.View entering={FadeInUp.duration(350).delay(index * 70)} exiting={FadeOut.duration(150)} style={styles.wrap}>
      <Pressable onPressIn={() => (scale.value = withTiming(0.98, { duration: 90 }))} onPressOut={() => (scale.value = withTiming(1, { duration: 120 }))}>
        <Animated.View style={[{ backgroundColor: colors.cardBackground, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border }, cardStyle]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 12 }}>
              <View style={{ backgroundColor: player.color, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.background, fontFamily: typography.fontFamily.spaceGroteskBold, fontSize: typography.fontSize.lg }}>{player.initials}</Text>
              </View>

              {/* <View style={{ position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: colors.background, backgroundColor: statusColor }} /> */}
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.foreground, fontSize: 16, fontFamily: typography.fontFamily.spaceGroteskBold, letterSpacing: 0.5 }}>{player.name}</Text>
                  <Text style={{ color: colors.muted, fontSize: 12, fontFamily: typography.fontFamily.jetbrainsMono }}>@{player.username}</Text>
                </View>
                <TrendIcon trend={player.trend as any} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 10 }}>
                <Position playerPosition={player.position} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>LVL {player.level}</Text>
                  <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>•</Text>
                  <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>STK {player.streak}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1, gap: 6 }}>
                <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>{player.physicalAttributes.age}y</Text>
                <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>•</Text>
                <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>{player.physicalAttributes.height}cm</Text>
                <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>•</Text>
                <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>{player.physicalAttributes.weight}kg</Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end', gap: 8 }}>
              <View style={{ width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: ratingBg, borderWidth: 1, borderColor: colors.border }}>
                <Text style={{ color: colors.background, fontFamily: typography.fontFamily.comfortaaBold, fontSize: 14 }}>{player.statistics.overall}</Text>
              </View>

              <View style={{ alignItems: 'flex-end', gap: 2 }}>
                <Text style={{ color: colors.muted, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>
                  {player.statistics.matches_played}M • {player.statistics.matches_won}W • {player.statistics.matches_lost || 0}L
                </Text>
                <Text style={{ color: colors.ratingGreen, fontSize: 10, fontFamily: typography.fontFamily.jetbrainsMono }}>
                  {player.statistics.matches_played > 0 ? Math.round((player.statistics.matches_won / player.statistics.matches_played) * 100) : 0}% WR
                </Text>
              </View>

              {/* {(onAddFriend || onRemoveFriend) && (
                <Pressable
                  onPress={isFriend ? onRemoveFriend : onAddFriend}
                  style={[
                    styles.friendButton,
                    {
                      backgroundColor: isFriend ? colors.ratingRed : colors.primary,
                      borderColor: isFriend ? colors.ratingRed : colors.primary,
                    }
                  ]}
                >
                  {isFriend ? (
                    <UserMinus size={16} color={colors.background} />
                  ) : (
                    <UserPlus size={16} color={colors.background} />
                  )}
                </Pressable>
              )} */}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' | string }) {
  const { colors } = useTheme();
  if (trend === 'stable') return <View style={{ width: 12, height: 12 }} />;
  return <Text style={{ color: trend === 'down' ? colors.ratingRed : colors.ratingGreen, fontSize: 22 }}>{trend === 'down' ? '↓' : '↑'}</Text>;
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  friendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
