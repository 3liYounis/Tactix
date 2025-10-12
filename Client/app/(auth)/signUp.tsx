import CustomButton from '@/components/custom/CustomButton';
import CustomInput from '@/components/custom/CustomInput';
import AuthLayout from '@/components/Layouts/AuthLayout';
import { typography } from '@/constants/typography';
import { useAuth } from '@/context/AuthContext';
import { useToastContext } from '@/context/ToastContext';
import { useTheme } from '@/hooks/useTheme';
import { Redirect, useRouter } from 'expo-router';
import { Home } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function signUp() {
  const { colors } = useTheme();
  const { isLoggedIn, signUp, signInWithGoogle } = useAuth();
  const { showToast } = useToastContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (isLoggedIn) return <Redirect href="/(tabs)/dashboard" />;

  return (
    <AuthLayout activeTab="signup">
      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
          <CustomInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            required
            validateOnChange
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
          <CustomInput
            type="password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            required
            validateOnChange
            minLength={8}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.foreground }]}>Confirm Password</Text>
          <CustomInput
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            required
            validateOnChange
            hasError={confirmPassword !== '' && password !== confirmPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={async () => {
              const { success, error } = await signUp(email, password, confirmPassword);
              if (success) {
                showToast('Account created! Please complete your profile.', 'info');
                router.push('/(register)/register');
              } else if (error) {
                showToast(error, 'error');
              }
            }}
          >
            Create Account
          </CustomButton>
        </View>

        <View style={styles.separator}>
          <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
        </View>

        <View style={styles.buttonContainer}>
          <Home size={24} color={colors.foreground} />
          <CustomButton
            variant="outline"
            onPress={signInWithGoogle}
          >
            Continue with Google
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
    paddingVertical: 20,
  },
  formGroup: {
    marginBottom: 20,
    minHeight: 80,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    minHeight: 56,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    minHeight: 20,
  },
  separatorLine: {
    flex: 1,
    height: 2,
  },
});
