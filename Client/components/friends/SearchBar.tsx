import { useTheme } from '@/hooks/useTheme';
import { Search } from 'lucide-react-native';
import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.searchContainer, { borderBottomColor: colors.border }]}>
      <View style={[styles.searchInput, { backgroundColor: colors.cardBackground }]}>
        <Search size={16} color={colors.muted} />
        <TextInput
          style={[styles.searchTextInput, { color: colors.foreground }]}
          placeholder="Search friends..."
          placeholderTextColor={colors.muted}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { padding: 16, borderBottomWidth: 1 },
  searchInput: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12 },
  searchTextInput: { flex: 1, height: 40, marginLeft: 8 },
});
