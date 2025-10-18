import { typography } from '@/constants';
import CustomButton from '@/components/custom/CustomButton';
import { useTheme } from '@/hooks/useTheme';
import { Calendar, Clock, Copy, LogOut, MapPin, Play, X } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  name: string;
  code: string;
  location: string;
  datePart: string;
  timePart: string;
  onCopyCode: () => void;
  isHosting?: boolean;
  isMatchStarted: boolean;
  currentCount: number;
  maxPlayers: number;
  onStartMatch?: () => void;
  onEndMatch?: () => void;
  onCancel?: () => void;
  onLeaveMatch?: () => void;
}

export default function MatchInfoCard({ name, code, location, datePart, timePart, onCopyCode, isHosting = false, isMatchStarted = false, currentCount, maxPlayers, onStartMatch = () => {}, onEndMatch = () => {}, onCancel = () => {}, onLeaveMatch = () => {} }: Props) {
  const { colors } = useTheme();
  const formattedDate = formatMatchDate(datePart);

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>

      <View style={styles.header}>
        <Text style={[styles.matchTitle, { color: colors.foreground }]}>{name}</Text>
        <View style={styles.codeSection}>
          <TouchableOpacity onPress={onCopyCode} style={[styles.codeContainer, { borderColor: colors.primary }]}>
            <Text style={[styles.codeText, { color: colors.primary }]}>{code}</Text>
            <Copy size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
            <MapPin size={20} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: colors.muted }]}>Location</Text>
            <Text style={[styles.detailValue, { color: colors.foreground }]}>{location}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
            <Calendar size={20} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: colors.muted }]}>Date</Text>
            <Text style={[styles.detailValue, { color: colors.foreground }]}>{formattedDate}</Text>
          </View>
        </View>

        {Boolean(timePart) && (
          <View style={styles.detailItem}>
            <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
              <Clock size={20} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: colors.muted }]}>Time</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>{timePart}</Text>
            </View>
          </View>
        )}

        {/* <View style={styles.detailItem}>
          <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.playerCountText, { color: colors.primary }]}>
              {currentCount}/{maxPlayers}
            </Text>
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: colors.muted }]}>Players</Text>
            <Text style={[styles.detailValue, { color: colors.foreground }]}>
              {currentCount >= (maxPlayers || 0) ? 'Ready to start!' : `Need ${(maxPlayers || 0) - currentCount} more`}
            </Text>
          </View>
        </View> */}
      </View>

        <View style={styles.actionsSection}>
          {!isMatchStarted ? (
            isHosting ? (
              <CustomButton
                variant="primary"
                onPress={currentCount >= (maxPlayers || 0) ? onStartMatch : () => {}}
                disabled={currentCount < (maxPlayers || 0)}
                icon={<Play size={20} color={colors.primaryForeground} />}
                style={{
                  backgroundColor: currentCount >= (maxPlayers || 0) ? colors.primary : colors.ratingRed,
                  opacity: currentCount >= (maxPlayers || 0) ? 1 : 0.6,
                }}
              >
                {currentCount >= (maxPlayers || 0)
                  ? 'Start Match'
                  : `Missing ${(maxPlayers || 0) - currentCount} Players!`}
              </CustomButton>
            ) : (
              <View
                style={[
                  styles.disabledButton,
                  {
                    backgroundColor: currentCount >= (maxPlayers || 0) ? colors.primary + '40' : colors.ratingRed + '40',
                    borderColor: currentCount >= (maxPlayers || 0) ? colors.primary : colors.ratingRed,
                  },
                ]}
              >
                <Text style={[styles.disabledButtonText, { color: colors.foreground }]}>
                  {currentCount == maxPlayers
                    ? 'Host will start the match soon!'
                    : `Waiting For ${maxPlayers - currentCount} More players`}
                </Text>
              </View>
            )
          ) : (
            isHosting ? (
              <CustomButton
                variant="primary"
                onPress={onEndMatch}
                icon={<Play size={20} color={colors.primaryForeground} />}
                style={{ backgroundColor: colors.ratingRed }}
              >
                End Match
              </CustomButton>
            ) : (
              <View
                style={[
                  styles.disabledButton,
                  { backgroundColor: colors.ratingRed + '40', borderColor: colors.ratingRed },
                ]}
              >
                <Text style={[styles.disabledButtonText, { color: colors.muted }]}>
                  Match in progress - Ask host to end
                </Text>
              </View>
            )
          )}

          {isHosting ? (
            <CustomButton
              variant="outline"
              onPress={onCancel}
              icon={<X size={20} color={colors.muted} />}
            >
              Cancel Match
            </CustomButton>
          ) : (
            <CustomButton
              variant="danger"
              onPress={onLeaveMatch}
              icon={<LogOut size={20} color={colors.foreground} />}
              textStyle={{ color: colors.foreground }}
            >
              Leave Match
            </CustomButton>
          )}
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  invitationTitle: {
    fontSize: 16,
    fontFamily: typography.fontFamily.kalamBold,
    marginBottom: 8,
    opacity: 0.8,
  },
  matchTitle: {
    fontSize: 28,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    textAlign: 'center',
    marginBottom: 16,
  },
  codeSection: {
    marginBottom: 0,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  codeText: {
    fontSize: 18,
    letterSpacing: 4,
    marginRight: 8,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.kalamBold,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  playerCountText: {
    fontSize: 16,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    fontWeight: 'bold',
  },
  actionsSection: {
    gap: 12,
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
  },
  disabledButtonText: {
    fontSize: 16,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    textAlign: 'center',
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
