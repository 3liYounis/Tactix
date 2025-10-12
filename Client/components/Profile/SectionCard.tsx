import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, children }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: { borderRadius: 14, borderWidth: 1.5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12 },
  sectionTitle: { fontFamily: typography.fontFamily.spaceGroteskBold, fontSize: 16 },
});
