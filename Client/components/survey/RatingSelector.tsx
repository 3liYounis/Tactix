import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Frown, Meh, Smile, SmilePlus, Flame } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography } from '@/constants/typography';

interface Props {
  selected: number;
  onSelect: (rating: number) => void;
  getRatingColor: (rating: number) => string;
}

export default function RatingSelector({ selected, onSelect, getRatingColor }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.ratingSection}>
      <View style={styles.ratingLabels}>
        <Text style={[styles.ratingLabel, { color: colors.muted }]}>Poor</Text>
        <Text style={[styles.ratingLabel, { color: colors.muted }]}>Outstanding</Text>
      </View>
      <View style={styles.ratingButtons}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={[
              styles.ratingButton,
              { backgroundColor: selected === rating ? getRatingColor(rating) : colors.accent, borderColor: selected === rating ? getRatingColor(rating) : colors.border },
            ]}
            onPress={() => onSelect(rating)}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {rating === 1 && <Frown size={20} color={selected === rating ? colors.primaryForeground : colors.muted} />}
              {rating === 2 && <Meh size={20} color={selected === rating ? colors.primaryForeground : colors.muted} />}
              {rating === 3 && <Smile size={20} color={selected === rating ? colors.primaryForeground : colors.muted} />}
              {rating === 4 && <SmilePlus size={20} color={selected === rating ? colors.primaryForeground : colors.muted} />}
              {rating === 5 && <Flame size={20} color={selected === rating ? colors.primaryForeground : colors.muted} />}
            </View>
            <Text style={[styles.ratingNumber, { color: selected === rating ? colors.primaryForeground : colors.muted }]}>{rating}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingSection: { marginBottom: 30 },
  ratingLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  ratingLabel: { margin: 10, fontSize: 12, width: 70, fontFamily: typography.fontFamily.jetbrainsMonoBold },
  ratingButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 8},
  ratingButton: { flex: 1, alignItems: 'center', padding: 5, borderRadius: 12, borderWidth: 2 },
  ratingNumber: { fontSize: 14, marginTop: 4, fontFamily: typography.fontFamily.comfortaaBold },
});
