import { typography } from '@/constants';
import { Minus, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  value: number;
  onChangeValue: (value: number) => void;
  min?: number;
  max?: number;
}

export default function AgeInput({
  value,
  onChangeValue,
  min = 16,
  max = 50
}: Props) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.toString());
    }
  }, [value, isFocused]);

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      onChangeValue(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      onChangeValue(newValue);
    }
  };

  const handleTextChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setInputValue(numericText);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue('');
  };

  const handleBlur = () => {
    setIsFocused(false);

    const numValue = parseInt(inputValue);

    if (isNaN(numValue) || numValue < min) {
      onChangeValue(min);
    } else if (numValue > max) {
      onChangeValue(max);
    } else {
      onChangeValue(numValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={handleDecrement}
          style={[
            styles.button,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
            value <= min && styles.disabledButton
          ]}
          disabled={value <= min}
        >
          <Minus size={20} color={value <= min ? colors.muted : colors.foreground} />
        </TouchableOpacity>

        <View style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.cardBackground,
            borderColor: isFocused ? colors.primary : colors.border,
          }
        ]}>
          <TextInput
            value={isFocused ? inputValue : value.toString()}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="numeric"
            style={[styles.input, { color: colors.foreground }]}
            placeholder={min.toString()}
            placeholderTextColor={colors.muted}
            selectionColor={colors.primary}
            textAlign="center"
            maxLength={2}
          />
          <Text style={[styles.unit, { color: colors.muted }]}>y</Text>
        </View>

        <TouchableOpacity
          onPress={handleIncrement}
          style={[
            styles.button,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
            value >= max && styles.disabledButton
          ]}
          disabled={value >= max}
        >
          <Plus size={20} color={value >= max ? colors.muted : colors.foreground} />
        </TouchableOpacity>
      </View>

      <View style={[styles.rangeHint, { backgroundColor: colors.primary }]}>
        <Text style={[styles.rangeText, { color: colors.primaryForeground }]}>
          Age range: {min}-{max} years
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 180,
    height: 56,
    justifyContent: 'center',
    flexShrink: 0,
  },
  input: {
    fontSize: 18,
    minWidth: 20,
    minHeight:40,
    fontFamily: typography.fontFamily.spaceGrotesk,
  },
  unit: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: typography.fontFamily.spaceGrotesk,
  },
  rangeHint: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.spaceGrotesk,
  },
});
