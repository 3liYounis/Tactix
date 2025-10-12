import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography } from '@/constants/typography';

interface Props {
  title: string;
  current: number;
  total: number;
  onBack: () => void;
}

export default function SurveyHeader({ title, current, total, onBack }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ArrowLeft size={24} color={colors.muted} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={[styles.questionNumber, { color: colors.muted }]}>
          {current} / {total}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 8 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 20, fontFamily: typography.fontFamily.jetbrainsMonoBold },
  headerRight: { alignItems: 'flex-end' },
  questionNumber: { fontSize: 12, fontFamily: typography.fontFamily.jetbrainsMonoBold },
});
