import { typography } from '@/constants';
import { Skills } from '@/types/player';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  skills: Skills;
  barMax?: number;
}

export default function SkillRatings({ skills, barMax = 120 }: Props) {
  const { colors } = useTheme();

  const ratingColor = (rating: number) => {
    if (rating >= 80) return colors.ratingGreen;
    if (rating >= 60) return colors.ratingYellow;
    return colors.ratingRed;
  };

  return (
    <View style={styles.skillsBlock}>
      {Object.entries(skills).map(([skill, rating]) => {
        const width = Math.round((rating / 100) * barMax);
        return (
          <View key={skill} style={styles.skillRow}>
            <Text
              style={[
                styles.skillLabel,
                {
                  color: colors.foreground,
                  fontFamily: typography.fontFamily.jetbrainsMonoBold
                }
              ]}
            >
              {skill}
            </Text>
            <View style={[styles.barTrack, { width: barMax, backgroundColor: colors.border }]}>
              <View style={[styles.barFill, { width, backgroundColor: colors.primary }]} />
            </View>
            <Text
              style={[
                styles.skillVal,
                {
                  color: ratingColor(rating),
                  fontFamily: typography.fontFamily.jetbrainsMonoBold
                }
              ]}
            >
              {rating}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  skillsBlock: {
    gap: 10,
    padding: 12,
    alignItems: 'center',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  skillLabel: {
    width: 44,
    fontSize: 12,
    textAlign: 'right'
  },
  barTrack: {
    height: 10,
    borderRadius: 999,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%'
  },
  skillVal: {
    width: 36,
    textAlign: 'right',
  },
});
