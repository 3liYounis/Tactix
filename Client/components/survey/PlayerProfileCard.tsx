import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Position from '../custom/Position';

interface Props {
  player: { initials: string; name: string; position: string };
  questionCategory: string;
}

export default function PlayerProfileCard({ player, questionCategory }: Props) {
  const { typography, colors } = useTheme();
  return (
    <View style={[styles.playerCard]}>
      <View style={styles.playerProfile}>
        <View style={[styles.playerAvatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.playerInitials, { fontFamily: typography.fontFamily.spaceGroteskBold }]}>{player.initials}</Text>
        </View>
        <Text style={[styles.playerName, { color: colors.foreground, fontFamily: typography.fontFamily.spaceGroteskBold}]}>{player.name}</Text>
        <View style={styles.playerTags}>
          <Position playerPosition={player.position} />
          <View style={[styles.categoryTag, { backgroundColor: colors.primary }]}>
            <Text style={[styles.categoryText, { color: colors.primaryForeground, fontFamily: typography.fontFamily.jetbrainsMonoBold}]}>{questionCategory}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerCard: { borderRadius: 16, padding: 10, alignItems: 'center', marginBottom: 30 },
  playerProfile: { alignItems: 'center' },
  playerAvatar: {
    width: 90,
    height: 90,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    position: 'relative',
  },
  playerInitials: { color: '#ffffff', fontSize: 24 },
  playerName: { fontSize: 20, marginBottom: 4, textAlign: 'center' },
  playerTags: { flexDirection: 'row', gap: 8 },
  positionTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  positionText: { fontSize: 12 },
  categoryTag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  categoryText: { fontSize: 12 },
});
