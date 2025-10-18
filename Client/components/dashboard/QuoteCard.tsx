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
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Quote size={20} color={colors.primary} />
        </View>
        <Text style={[styles.quoteTitle, { color: colors.foreground }]}>
          Daily Inspiration
        </Text>
      </View>
      <View style={styles.quoteContainer}>
        <Text style={[styles.quoteText, { color: colors.foreground }]}>
          "{quote}"
        </Text>
      </View>
      <View style={styles.quoteFooter}>
        <View style={[styles.decorativeLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.footerText, { color: colors.muted }]}>
          Football Wisdom
        </Text>
        <View style={[styles.decorativeLine, { backgroundColor: colors.primary }]} />
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  quoteCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 0,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quoteTitle: {
    fontSize: 18,
    flex: 1,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  quoteContainer: {
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 16,
    fontFamily: typography.fontFamily.kalamBold,
    textAlign: 'center',
  },
  quoteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  decorativeLine: {
    height: 2,
    width: 30,
    borderRadius: 1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.spaceGroteskBold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
