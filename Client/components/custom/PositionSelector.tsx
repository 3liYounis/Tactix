import { colors } from '@/constants';
import { typography } from '@/constants/typography';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface PositionSelection {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
}

interface Props {
  selectedPosition?: string;
  onPositionSelect: (position: string) => void;
}

const positions: PositionSelection[] = [
  {
    id: 'goalkeeper',
    name: 'Goalkeeper',
    shortName: 'GK',
    description: 'Protect the goal and organize defense',
    color: colors.GKForeground,
    backgroundColor: colors.GKBackgroundColor,
    borderColor: colors.GKBorderColor,

  },
  {
    id: 'defender',
    name: 'Defender',
    shortName: 'DEF',
    description: 'Stop attacks and start build-up play',
    color: colors.DEFForeground,
    backgroundColor: colors.DEFBackgroundColor,
    borderColor: colors.DEFBorderColor,

  },
  {
    id: 'midfielder',
    name: 'Midfielder',
    shortName: 'MID',
    description: 'Control the game and link play',
    color: colors.MIDForeground,
    backgroundColor: colors.MIDBackgroundColor,
    borderColor: colors.MIDBorderColor,

  },
  {
    id: 'forward',
    name: 'Forward',
    shortName: 'FWD',
    description: 'Score goals and create chances',
    color: colors.FWDForeground,
    backgroundColor: colors.FWDBackgroundColor,
    borderColor: colors.FWDBorderColor,
  },
];

export default function PositionSelector({
  selectedPosition,
  onPositionSelect
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {positions.map((position) => {
        const isSelected = selectedPosition === position.shortName;

        return (
          <TouchableOpacity
            key={position.id}
            style={[
              styles.positionOption,
              {
                backgroundColor: isSelected ? position.backgroundColor : colors.cardBackground,
                borderColor: isSelected ? position.borderColor : colors.muted,
              },
              isSelected && styles.selectedOption
            ]}
            onPress={() => onPositionSelect(position.shortName)}
            activeOpacity={0.8}
          >
            <View style={styles.positionContent}>
              <View style={styles.positionInfo}>
                <Text style={[
                  styles.positionTitle,
                  { color: isSelected?  position.color : colors.foreground }
                ]}>
                  {isSelected ? `${position.shortName} - ${position.name}` : position.name}
                </Text>
                <Text style={[
                  styles.positionDescription,
                  { color: colors.muted }
                ]}>
                  {position.description}
                </Text>
              </View>

              {isSelected && (
                <View style={[styles.selectionIndicator, { backgroundColor: position.color }]}>
                  <View style={styles.innerDot} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: '100%',
  },
  positionOption: {
    borderRadius: 12,
    padding: 16,
    minHeight: 64,
    borderWidth: 1,
  },
  selectedOption: {
    borderWidth: 3,
  },
  positionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionInfo: {
    flex: 1,
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: typography.fontFamily.kalamBold,
  },
  positionDescription: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: typography.fontFamily.spaceGrotesk,
  },
  selectionIndicator: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
});
