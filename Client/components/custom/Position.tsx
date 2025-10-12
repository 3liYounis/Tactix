import { colors } from '@/constants/colors';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, Text, View } from 'react-native';


interface Props{
    playerPosition: string;
}
const foregroundPositionColors = {
  GK: colors.GKForeground,
  DEF: colors.DEFForeground,
  MID: colors.MIDForeground,
  FWD: colors.FWDForeground,
}
const backgroundPositionColors = {
  GK: colors.GKBackgroundColor,
  DEF: colors.DEFBackgroundColor,
  MID: colors.MIDBackgroundColor,
  FWD: colors.FWDBackgroundColor,
}
const borderPositionColors = {
  GK: colors.GKBorderColor,
  DEF: colors.DEFBorderColor,
  MID: colors.MIDBorderColor,
  FWD: colors.FWDBorderColor,
}
export default function Position({ playerPosition }: Props) {
    const {  isDark, typography } = useTheme();
    const backgroundPositionColor = backgroundPositionColors[playerPosition as keyof typeof backgroundPositionColors];
    const borderPositionColor = borderPositionColors[playerPosition as keyof typeof borderPositionColors];
    const foregroundPositionColor = foregroundPositionColors[playerPosition as keyof typeof foregroundPositionColors];
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isDark ? backgroundPositionColor : foregroundPositionColor,
        borderColor: borderPositionColor,
      }
    ]}>
        <Text style={[
          styles.text,
          {
            color: isDark ? foregroundPositionColor : backgroundPositionColor,
            fontFamily: typography.fontFamily.kalamBold,
          }
        ]}>{playerPosition}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 12,
    marginRight: 4,
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 2,
  },
});
