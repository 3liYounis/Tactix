import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  progressPercent: number;
}

export default function SurveyProgress({ progressPercent }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.progressSection}>
      <Text style={[styles.progressText, { color: colors.muted }]}>{Math.round(progressPercent)}%</Text>
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: colors.primary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressSection: { alignItems: 'center', marginBottom: 30 },
  progressText: { fontSize: 14, marginBottom: 8, fontFamily: typography.fontFamily.jetbrainsMonoBold },
  progressBar: { width: '100%', height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
});
