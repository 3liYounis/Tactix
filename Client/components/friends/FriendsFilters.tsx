import { typography } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FilterOption { id: string; label: string, backgroundColor: string, borderColor: string, foregroundColor: string }
interface Props {
  filters: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function FriendsFilters({ filters, activeId, onChange }: Props) {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, {borderBottomColor: colors.muted}]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            onPress={() => onChange(f.id)}
            activeOpacity={0.85}
            style={[
              styles.chip,
              {
                backgroundColor: activeId === f.id ? isDark ? f.backgroundColor : f.foregroundColor : colors.cardBackground,
                borderColor: activeId === f.id ? f.borderColor : colors.border,
              },
            ]}
          >
            <Text style={[styles.chipText, { color: activeId === f.id ? isDark ? f.foregroundColor : f.backgroundColor : colors.foreground }]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 48,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  chip: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
});
