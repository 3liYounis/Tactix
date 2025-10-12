import AnimatedScreen from '@/components/animated/AnimatedScreen';
import CustomButton from '@/components/custom/CustomButton';
import PageHeader from '@/components/custom/PageHeader';
import { useTheme } from '@/hooks/useTheme';
import { Target } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onHostMatch: () => void;
  onJoinMatch: () => void;
}

export default function NoMatchScreen({
  onHostMatch,
  onJoinMatch
}: Props) {
  const { colors, typography } = useTheme();

  return (
    <AnimatedScreen style={[styles.container, { backgroundColor: colors.background }]}>
      <PageHeader title="Match" subtitle="No Active Match" imageSource={require('@/assets/images/shoe.png')}/>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.primary }]}>
            <Target size={48} color={colors.primaryForeground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: typography.fontFamily.jetbrainsMonoBold }]}>No Active Match :(</Text>
          <Text style={[styles.subtitle, { color: colors.muted, fontFamily: typography.fontFamily.kalam }]}>Host a match to get started or join an existing one</Text>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={onHostMatch} style={styles.button}>Host Match</CustomButton>
            <CustomButton onPress={onJoinMatch} variant="outline" style={styles.button}>Join Match</CustomButton>
          </View>
        </View>
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
    minHeight: 400,
  },
  iconButton: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
