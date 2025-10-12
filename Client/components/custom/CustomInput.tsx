import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { ComponentType, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from '../../hooks/useTheme';

interface Props {
  placeholder?: string;
  type: "text" | "password" | "number" | "email";
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  icon?: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  unit?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hasError?: boolean;
  validateOnChange?: boolean;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  return { isValid: true, message: "" };
};

const validateNumber = (value: string, minLength?: number, maxLength?: number): { isValid: boolean; message: string } => {
  if (value && isNaN(Number(value))) {
    return { isValid: false, message: "Please enter a valid number" };
  }
  if (minLength && value.length < minLength) {
    return { isValid: false, message: `Must be at least ${minLength} digits` };
  }
  if (maxLength && value.length > maxLength) {
    return { isValid: false, message: `Must be no more than ${maxLength} digits` };
  }
  return { isValid: true, message: "" };
};

const validateText = (value: string, minLength?: number, maxLength?: number, required?: boolean): { isValid: boolean; message: string } => {
  if (required && !value.trim()) {
    return { isValid: false, message: "This field is required" };
  }
  if (minLength && value.length < minLength) {
    return { isValid: false, message: `Must be at least ${minLength} characters` };
  }
  if (maxLength && value.length > maxLength) {
    return { isValid: false, message: `Must be no more than ${maxLength} characters` };
  }
  return { isValid: true, message: "" };
};

export default function CustomInput({
  placeholder,
  type,
  icon: Icon,
  unit,
  value,
  onChangeText,
  style,
  textStyle,
  hasError = false,
  validateOnChange = true,
  minLength,
  maxLength,
  required = false
}: Props) {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);

  const validateInput = (inputValue: string) => {
    if (!validateOnChange || !inputValue) {
      setValidationError("");
      return;
    }

    let validation: { isValid: boolean; message: string } = { isValid: true, message: "" };

    switch (type) {
      case "email":
        validation = validateEmail(inputValue)
          ? { isValid: true, message: "" }
          : { isValid: false, message: "Please enter a valid email address" };
        break;
      case "password":
        validation = validatePassword(inputValue);
        break;
      case "number":
        validation = validateNumber(inputValue, minLength, maxLength);
        break;
      case "text":
        validation = validateText(inputValue, minLength, maxLength, required);
        break;
    }

    setValidationError(validation.isValid ? "" : validation.message);
  };
  useEffect(() => {
    if (value) {
      validateInput(value);
    }
  }, [value, type, minLength, maxLength, required, validateOnChange]);

  const hasValidationError = validationError !== "" || hasError;
  const showError = hasValidationError && (isFocused || value);

  const containerStyle: ViewStyle = useMemo(() => ({
    ...styles.container,
    borderColor: showError ? colors.destructive : isFocused ? colors.primary : colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[4],
    backgroundColor: colors.accent,
  }), [colors, borderRadius, spacing, showError, isFocused]);

  const inputStyle: TextStyle = useMemo(() => ({
    ...styles.input,
    color: colors.foreground,
    fontFamily: typography.fontFamily.sports,
    fontSize: typography.fontSize.sm,
  }), [colors, typography]);

  const IconComponent = useMemo(() => {
    if (Icon) return Icon;
    if (type === "email") return Mail;
    if (type === "password") return Lock;
    return null;
  }, [Icon, type]);

  const handleTextChange = (text: string) => {
    onChangeText?.(text);
    if (validateOnChange) {
      validateInput(text);
    }
  };


  return (
    <View>
      <View style={[containerStyle, style]}>
        {IconComponent && (
          <View style={styles.iconContainer}>
            <IconComponent size={20} strokeWidth={1.5} color={colors.muted} />
          </View>
        )}
        <TextInput
          key={type === "password" ? `password-${showPassword}` : "text-input"}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType={
            type === "number"
              ? "numeric"
              : type === "email"
              ? "email-address"
              : "default"
          }
          autoCapitalize={type === "email" ? "none" : "words"}
          value={value}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={type === "password" ? !showPassword : false}
          textContentType={
            type === "password" ? "none" : type === "email" ? "emailAddress" : "none"
          }
          autoComplete={type === "password" ? "off" : type === "email" ? "email" : "off"}
          style={[inputStyle, textStyle]}
          maxLength={maxLength}
          pointerEvents="box-none"

        />
        {type === "password" && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={({ pressed }) => [
              styles.passwordToggle,
              {
                opacity: pressed ? 0.7 : 1
              }
            ]}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            {showPassword ? (
              <EyeOff size={24} strokeWidth={1.5} color={colors.foreground} />
            ) : (
              <Eye size={24} strokeWidth={1.5} color={colors.foreground} />
            )}
          </Pressable>
        )}
        {unit && (
          <Text style={[styles.unitText, {
            color: colors.muted,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.spaceGrotesk,
          }]}>
            {unit}
          </Text>
        )}
        {showError && (
          <View style={styles.errorIconContainer}>
            <AlertCircle size={16} color={colors.destructive} />
          </View>
        )}
      </View>
      {showError && (
        <Text style={[styles.errorText, {
          color: colors.destructive,
          fontSize: typography.fontSize.xs,
          fontFamily: typography.fontFamily.spaceGrotesk,
        }]}>
          {validationError || "Invalid input"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    height: 56,
    minHeight: 56,
  },
  input: {
    flex: 1,
    height: 56,
    paddingVertical: 0,
  },
  iconContainer: {
    marginRight: 12,
  },
  passwordToggle: {
    marginLeft: 8,
    padding: 12,
    borderRadius: 8,
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  unitText: {
    marginLeft: 8,
  },
  errorIconContainer: {
    marginLeft: 8,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
