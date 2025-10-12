import { typography } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import { Calendar, Clock, Copy, MapPin, Play, X } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  name: string;
  code: string;
  location: string;
  datePart: string;
  timePart: string;
  onCopyCode: () => void;
  isHosting?: boolean;
  isMatchStarted?: boolean;
  currentCount?: number;
  maxPlayers?: number;
  onStartMatch?: () => void;
  onEndMatch?: () => void;
  onCancel?: () => void;
}

export default function MatchInfoCard({ name, code, location, datePart, timePart, onCopyCode, isHosting = false, isMatchStarted = false, currentCount = 0, maxPlayers = 0, onStartMatch, onEndMatch, onCancel }: Props) {
  const { colors } = useTheme();
  const formattedDate = formatMatchDate(datePart);

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>{name}</Text>
        <View style={styles.codeSection}>
          <TouchableOpacity onPress={onCopyCode} style={[styles.codeContainer, { borderColor: colors.border }]}>
            <Text style={[styles.codeText, { color: colors.foreground }]}>{code}</Text>
            <Copy size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsWrap}>
        <View style={styles.detailsRowHorizontal}>
          <View style={styles.detailRow}>
            <MapPin size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.foreground }]}>{location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Calendar size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.foreground }]}>{formattedDate}</Text>
          </View>
          {Boolean(timePart) && (
            <View style={styles.detailRow}>
              <Clock size={16} color={colors.muted} />
              <Text style={[styles.detailText, { color: colors.foreground }]}>{timePart}</Text>
            </View>
          )}
        </View>
      </View>

      {true && (
        <View style={styles.matchActions}>
          {!isMatchStarted ? (
            <TouchableOpacity
              style={[
                styles.startButton,
                {
                  backgroundColor: currentCount >= (maxPlayers || 0) ? colors.primary : colors.ratingRed,
                  opacity: currentCount >= (maxPlayers || 0) ? 1 : 0.6,
                },
              ]}
              onPress={currentCount >= (maxPlayers || 0) ? onStartMatch : undefined}
              disabled={currentCount < (maxPlayers || 0)}
            >
              <Play size={16} color={colors.primaryForeground} />
              <Text style={[styles.startButtonText, { color: colors.primaryForeground }]}>
                {currentCount >= (maxPlayers || 0)
                  ? 'Start Match'
                  : `Missing ${(maxPlayers || 0) - currentCount} Players!`}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.ratingRed }]}
              onPress={onEndMatch}
            >
              <Play size={16} color={colors.primaryForeground} />
              <Text style={[styles.startButtonText, { color: colors.primaryForeground }]}>End Match</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.cancelMatchButton, { backgroundColor: colors.accent }]}
            onPress={onCancel}
          >
            <X size={16} color={colors.muted} />
            <Text style={[styles.cancelMatchText, { color: colors.muted }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    flex: 1,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  codeSection: {
    marginBottom: 0,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    minHeight: 20,
  },
  codeText: {
    fontSize: 15,
    letterSpacing:3,
    marginRight: 4,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  detailsWrap: {
    marginBottom: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsRowHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    rowGap: 10,
    flexWrap: 'wrap',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 6,
    minWidth: 0,
  },
  detailText: {
    fontSize: 13,
    flexShrink: 1,
    fontFamily: typography.fontFamily.kalamBold,
  },
  matchActions: {
    flexDirection: 'row',
    gap: 15,
  },
  startButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,

  },
  cancelMatchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  cancelMatchText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
});
function formatMatchDate(datePart: string): string {
  const tryDate = new Date(datePart);
  if (!isNaN(tryDate.getTime())) {
    const weekday = tryDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dd = String(tryDate.getDate()).padStart(2, '0');
    const mm = String(tryDate.getMonth() + 1).padStart(2, '0');
    const yyyy = tryDate.getFullYear();
    return `${weekday}, ${dd}/${mm}/${yyyy}`;
  }
  if (/^[A-Za-z]+\s\d{2}\/\d{2}\/\d{4}$/.test(datePart)) {
    const spaceIdx = datePart.indexOf(' ');
    if (spaceIdx > 0) {
      return `${datePart.slice(0, spaceIdx)},${datePart.slice(spaceIdx)}`;
    }
  }
  return datePart;
}
