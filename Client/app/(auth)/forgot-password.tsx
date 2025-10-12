import AuthLayout from '@/components/Layouts/AuthLayout';
import CustomButton from '@/components/custom/CustomButton';
import CustomInput from '@/components/custom/CustomInput';
import { typography } from '@/constants/typography';
import { useAuth } from '@/context/AuthContext';
import { useToastContext } from '@/context/ToastContext';
import { useTheme } from '@/hooks/useTheme';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function forgotPassword() {
  const { isLoggedIn, resetPassword } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const [email, setEmail] = useState('');

  if (isLoggedIn) return <Redirect href="/(tabs)/dashboard" />;

  return (
    <AuthLayout activeTab="signin">
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>Reset Your Password</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.foreground }]}>Account Email</Text>
          <CustomInput
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={async () => {
              const { success, error } = await resetPassword(email);
              if (success)
                showToast('If an account exists, a reset email was sent.', 'info');
              else if (error)
                showToast(error, 'error');
              router.push('/(auth)/signIn');
            }}
          >
            Send Reset Password Link
          </CustomButton>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            variant="outline"
            onPress={() => router.push("/(auth)/signIn")}
          >
            Back To Sign In
          </CustomButton>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: typography.fontFamily.kalamBold,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
