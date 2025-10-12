import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { Users } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: Props) {
  const { colors} = useTheme();
  return (
    <View style={styles.emptyState}>
      <Users size={80} color={colors.muted} />
      <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.emptySubtitle, { color: colors.muted }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  emptyTitle: { fontSize: 20, marginTop: 8, fontFamily: typography.fontFamily.spaceGroteskBold },
  emptySubtitle: { fontSize: 16, fontFamily: typography.fontFamily.kalamBold},
});
