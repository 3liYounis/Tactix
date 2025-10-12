import { typography } from '@/constants/typography';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Logo from '../custom/Logo';

interface Props {
  children: React.ReactNode;
  activeTab: 'signin' | 'signup' ;
}

export default function AuthLayout({ children, activeTab }: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  const handleTabPress = (tab: 'signin' | 'signup') => {
    if (tab === 'signin') {
      router.push('/(auth)/signIn');
    } else {
      router.push('/(auth)/signUp');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Logo />
          <Text style={[styles.tagline, { color: colors.foreground }]}>
            Balance your team, elevate your game
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'signin' && styles.activeTab,
              { borderBottomColor: activeTab === 'signin' ? colors.primary : 'transparent' }
            ]}
            onPress={() => handleTabPress('signin')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'signin' ? colors.foreground : colors.muted }
            ]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'signup' && styles.activeTab,
              { borderBottomColor: activeTab === 'signup' ? colors.primary : 'transparent' }
            ]}
            onPress={() => handleTabPress('signup')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'signup' ? colors.foreground : colors.muted }
            ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.formCard, { backgroundColor: colors.cardBackground }]}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 8,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    fontFamily: typography.fontFamily.spaceGroteskBold,
  },
  formCard: {
    flex: 1,
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    minHeight: 400,
  },
});
