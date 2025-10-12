import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  skill: string;
  question: string;
}

export default function SkillAssessment({ skill, question }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.assessmentSection}>
      <Text style={[styles.skillName, { color: colors.foreground , fontFamily: typography.fontFamily.spaceGroteskBold}]}>{skill}</Text>
      <Text style={[styles.question, { color: colors.muted , fontFamily: typography.fontFamily.kalamBold}]}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  assessmentSection: { alignItems: 'center', marginBottom: 10 },
  skillName: { fontSize: 24, marginBottom: 10 },
  question: { fontSize: 16, textAlign: 'center', lineHeight: 25, marginBottom: 12, alignSelf: 'stretch', flexShrink: 1 },
});
