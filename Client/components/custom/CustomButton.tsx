import { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  children?: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  height?: number;
  width?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconAfter?: ReactNode;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  children,
  onPress,
  disabled = false,
  height,
  width,
  icon,
  style,
  textStyle,
  iconAfter,
  variant = 'primary',
  size = 'md',
  fontSize = 'base',
}: Props) {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.baseButton,
      borderRadius: borderRadius.md,
      height: height || 56,
      width: width || '100%',
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[4],
      opacity: disabled ? 0.5 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...shadows.sm,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: colors.cardBackground,
          ...styles.outlineButton,
          borderColor: colors.border,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.accent,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: colors.ratingRed,
          ...shadows.sm,
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
        return colors.primaryForeground;
      case 'outline':
        return colors.foreground;
      case 'secondary':
        return colors.foreground;
      case 'danger':
        return colors.primaryForeground;
      default:
        return colors.primaryForeground;
    }
  };

  const buttonStyle = getButtonStyle();
  const textColor = getTextColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle, style]}
      activeOpacity={0.8}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {children && (
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.jetbrainsMonoBold,
            },
            textStyle
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {children}
        </Text>
      )}
      {iconAfter && <View style={styles.iconAfterContainer}>{iconAfter}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 8,
  },
  iconAfterContainer: {
    marginLeft: 8,
  },
  buttonText: {
    textAlign: 'center',
  },
});
