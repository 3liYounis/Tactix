import { ChevronDown } from 'lucide-react-native';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from '../../hooks/useTheme';

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  values: SelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hasError?: boolean;
  selectedValue?: string;
}

export default function CustomSelect({
  values,
  onValueChange,
  placeholder = "Select an option",
  style,
  textStyle,
  hasError = false,
  selectedValue: externalSelectedValue
}: Props) {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedValue, setInternalSelectedValue] = useState<string>('');

  const selectedValue = externalSelectedValue !== undefined ? externalSelectedValue : internalSelectedValue;

  const containerStyle: ViewStyle = {
    ...styles.container,
    borderColor: hasError ? colors.destructive : colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.accent,
  };

  const handleSelect = (value: string) => {
    if (externalSelectedValue === undefined) {
      setInternalSelectedValue(value);
    }
    onValueChange(value);
    setIsOpen(false);
  };

  const selectedOption = values.find(option => option.value === selectedValue);

  return (
    <View style={[containerStyle, style]}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.trigger}
      >
            <Text style={[
              styles.triggerText,
              {
                color: selectedOption ? colors.foreground : colors.muted,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.normal,
              },
              textStyle
            ]}>
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
            <ChevronDown
              size={20}
              color={colors.muted}
              style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
            />
      </TouchableOpacity>

      {isOpen && (
        <View style={[
          styles.dropdown,
          {
            backgroundColor: colors.cardBackground,
            borderRadius: borderRadius.md,
            borderColor: colors.border,
            ...shadows.md,
          }
        ]}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            {values.map((option, index) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option.value)}
                    style={[
                      styles.option,
                      {
                        borderBottomWidth: index < values.length - 1 ? 1 : 0,
                        borderBottomColor: colors.border,
                        backgroundColor: selectedValue === option.value ? colors.primary + '20' : 'transparent',
                        paddingHorizontal: spacing[3],
                        paddingVertical: spacing[3],
                      }
                    ]}
                  >
                    <Text style={[
                      styles.optionText,
                      {
                        color: selectedValue === option.value ? colors.primary : colors.foreground,
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.normal,
                      }
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  triggerText: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    borderWidth: 1,
    zIndex: 1000,
    maxHeight: 200,
  },
  scrollView: {
    maxHeight: 200,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
  },
});
