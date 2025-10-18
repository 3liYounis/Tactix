import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography } from '@/constants';

interface ToggleOption {
  value: string;
  label: string;
}

interface Props {
  options: ToggleOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function Toggle({ options, value, onValueChange }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.toggleWrap, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.toggleBtn,
            { borderRightColor: colors.border },
            index === options.length - 1 && { borderRightWidth: 0 },
            value === option.value && { backgroundColor: colors.primary }
          ]}
          onPress={() => onValueChange(option.value)}
        >
          <Text
            style={[
              styles.toggleBtnText,
              value === option.value
                ? { color: colors.primaryForeground }
                : { color: colors.foreground }
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleWrap: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
  },
  toggleBtnText: {
    fontSize: 16,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    letterSpacing: 0.5,
  },
});
