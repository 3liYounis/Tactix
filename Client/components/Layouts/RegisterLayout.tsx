import { typography } from '@/constants';
import { ArrowLeft } from 'lucide-react-native';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Logo from '../custom/Logo';

interface Props {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export default function RegisterLayout({
  children,
  currentStep,
  totalSteps,
  onBack
}: Props) {
  const { colors } = useTheme();

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        {onBack != undefined &&
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.foreground} />
        </TouchableOpacity>
        }
        <Logo />

        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index < currentStep ? colors.primary : colors.border,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={[styles.stepText, { color: colors.primary }]}>
            {currentStep === totalSteps ? "Final Step!" : `Step ${currentStep} of ${totalSteps} `}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  backButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  stepText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.kalamBold,
  },
});
