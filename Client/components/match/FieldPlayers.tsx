import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Position } from '@/types/player';
import { Team } from '@/types/match';
import { colors, typography } from '@/constants';

interface Props {
  teams: Team[];
  formation: string;
  fieldImage: any;
  fieldSize: { width: number; height: number };
  onFieldLayout: (event: any) => void;
}

export default function FieldPlayers({
  teams,
  formation,
  fieldImage,
  onFieldLayout
}: Props) {
  const { colors } = useTheme();
  const positions = getPlayerPositionsHelper(formation);
  const half = Math.floor(positions.length / 2);

  return (
    <View style={[{ flex: 1 }]}>
      <View
        style={[styles.field, { width: '100%', height: '100%' }]}
        onLayout={onFieldLayout}
      >
        <ImageBackground
          source={fieldImage}
          resizeMode="stretch"
          style={StyleSheet.absoluteFillObject}
          borderRadius={10}
        />

        <View style={styles.playersContainer}>
          {teams.map((team, teamIndex) => {
            const teamPositions = teamIndex === 0 ? positions.slice(0, half) : positions.slice(half);

            const goalkeepers = team.players.filter(p => p.position === Position.GK);
            const defenders = team.players.filter(p => p.position === Position.DEF);
            const midfielders = team.players.filter(p => p.position === Position.MID);
            const forwards = team.players.filter(p => p.position === Position.FWD);

            const orderedPlayers = [
              ...goalkeepers.slice(0, 1),
              ...defenders.slice(0, 4),
              ...midfielders.slice(0, 3),
              ...forwards.slice(0, 3),
            ];

            const maxSlots = teamPositions.length;
            const rendered = Array.from({ length: maxSlots }, (_, slotIndex) => {
              const slot = teamPositions[slotIndex];
              const actualPosition: any = {};
              if (slot.top !== undefined) actualPosition.top = `${slot.top}%`;
              if (slot.bottom !== undefined) actualPosition.bottom = `${slot.bottom}%`;
              if (slot.left !== undefined) actualPosition.left = `${slot.left}%`;

              const playerAtSlot = orderedPlayers[slotIndex];
              if (playerAtSlot) {
                const initials = playerAtSlot.player.name.split(' ').map(n => n[0]).join('').toUpperCase();
                const color = getPositionColorHelper(playerAtSlot.position, colors.primary);
                const nameParts = playerAtSlot.player.name.trim().split(/\s+/);
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ');
                const displayName = lastName ? `${lastName.at(0)}. ${firstName}` : firstName;
                return (
                  <View key={`player-${teamIndex}-${slotIndex}`} style={[styles.playerField, actualPosition]}>
                    <View style={[styles.playerCircle, { backgroundColor: color }]}>
                      <Text style={styles.playerInitials}>{initials}</Text>
                    </View>
                    <Text
                      style={[styles.playerName, { color: colors.primaryForeground }]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {displayName}
                    </Text>
                  </View>
                );
              }

              return (
                <View key={`player-${teamIndex}-${slotIndex}`} style={[styles.playerField, actualPosition]}>
                  <View style={[styles.emptySlot, { borderColor: colors.border }]}>
                    <Text style={[styles.emptySlotText, { color: colors.muted }]}>+</Text>
                  </View>
                  <Text style={[styles.playerName, { color: colors.primaryForeground }]}>
                    Missing!
                  </Text>
                </View>
              );
            });
            return rendered;
          }).flat()}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  field: {
    position: 'relative',
  },
  playersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playerField: {
    position: 'absolute',
    alignItems: 'center',
    width: 50,
  },
  playerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInitials: {
    color: 'white',
    fontSize: 14,
  },
  playerName: {
    fontSize: 12,
    textAlign: 'center',
    minWidth: 80,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  emptySlot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  emptySlotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function getPlayerPositionsHelper(formation: string) {
  const positions: Array<{ top?: number; bottom?: number; left?: number }> = [];
  const depthGK = 1;
  const depthDEF = 11;
  const depthFWD = 39;

  const formationMap: Record<string, { def: number; mid: number; fwd: number }> = {
    '5v5': { def: 2, mid: 0, fwd: 2 },
    '6v6': { def: 2, mid: 1, fwd: 2 },
    '7v7': { def: 2, mid: 2, fwd: 2 },
    '8v8': { def: 3, mid: 2, fwd: 2 },
    '9v9': { def: 3, mid: 2, fwd: 3 },
    '10v10': { def: 3, mid: 3, fwd: 3 },
    '11v11': { def: 4, mid: 3, fwd: 3 },
  };

  const counts = formationMap[formation] ?? formationMap['11v11'];
  const margin = 8;
  const defaultGap = 27;
  const spread = (n: number): number[] => {
    if (n <= 1) return [50];
    const maxGap = (100 - 2 * margin) / (n - 1);
    const gap = Math.min(defaultGap, maxGap);
    const start = 43.5 - ((n - 1) * gap) / 2;
    return Array.from({ length: n }, (_, i) => +(start + i * gap).toFixed(2));
  };

  const rows: Array<{ key: 'def' | 'mid' | 'fwd'; count: number }> = [];
  if (counts.def > 0) rows.push({ key: 'def', count: counts.def });
  if (counts.mid > 0) rows.push({ key: 'mid', count: counts.mid });
  if (counts.fwd > 0) rows.push({ key: 'fwd', count: counts.fwd });

  const minDepth = depthDEF;
  const maxDepth = depthFWD;
  const vSpread = (m: number): number[] => {
    if (m <= 1) return [+(minDepth + (maxDepth - minDepth) / 2).toFixed(2)];
    const step = (maxDepth - minDepth) / (m - 1);
    return Array.from({ length: m }, (_, i) => +(minDepth + i * step).toFixed(2));
  };
  const depths = vSpread(rows.length);

  positions.push({ top: depthGK, left: 43.5 });
  rows.forEach((row, idx) => {
    const y = depths[idx];
    spread(row.count).forEach(x => positions.push({ top: y, left: x }));
  });


  positions.push({ bottom: depthGK, left: 43.5 });
  rows.forEach((row, idx) => {
    const y = depths[idx];
    spread(row.count).forEach(x => positions.push({ bottom: y, left: x }));
  });

  return positions;
}

function getPositionColorHelper(position: Position, fallback: string) {
  switch (position) {
    case Position.GK: return colors.GKForeground;
    case Position.DEF: return colors.DEFForeground;
    case Position.MID: return colors.MIDForeground;
    case Position.FWD: return colors.FWDForeground;
    default: return fallback;
  }
}
