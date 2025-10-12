import CustomButton from '@/components/custom/CustomButton';
import CustomInput from '@/components/custom/CustomInput';
import LinkedText from '@/components/custom/LinkedText';
import AuthLayout from '@/components/Layouts/AuthLayout';
import { typography } from '@/constants/typography';
import { useAuth } from '@/context/AuthContext';
import { useToastContext } from '@/context/ToastContext';
import { useTheme } from '@/hooks/useTheme';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function signIn() {
  const { isLoggedIn, signIn, signInWithGoogle } = useAuth();
  const { showToast } = useToastContext();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn) return <Redirect href="/(tabs)/dashboard" />;

  return (
    <AuthLayout activeTab="signin">
      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
          <CustomInput type="email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
          <CustomInput type="password" placeholder="Enter your password" value={password} onChangeText={setPassword} />
        </View>

        <View style={styles.forgotPasswordContainer}>
          <LinkedText href='/(auth)/forgot-password'>Forgot password? </LinkedText>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={async () => {
              const { success, error } = await signIn(email, password);
              if (!success && error) {
                showToast(error, 'error');
              }
            }}
          >
            Sign In
          </CustomButton>
        </View>

        <View style={styles.separator}>
          <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
        </View>

        <View style={styles.buttonContainer}>
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
    minHeight: 24,
  },
  buttonContainer: {
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
