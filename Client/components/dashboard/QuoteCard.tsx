import AnimatedCard from '@/components/animated/AnimatedCard';
import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { Quote } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  quote: string;
}

export default function QuoteCard({ quote }: Props) {
  const { colors } = useTheme();
  return (
    <AnimatedCard style={[
      styles.quoteCard,
      {
        backgroundColor: colors.accent,
        borderColor: colors.border,
        shadowColor: colors.foreground,
      }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.chart4 }]}>
          <Quote size={18} color={colors.foreground} />
        </View>
        <Text style={[
          styles.quoteTitle,
          {
            color: colors.foreground,
          },
        ]}>Football Quote</Text>
      </View>
      <Text style={[styles.quoteText, { color: colors.foreground }]}>
        "{quote}"
      </Text>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  quoteCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    letterSpacing: 0.1,
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: typography.fontFamily.kalamBold,
    textAlign: 'center',
  },
});
