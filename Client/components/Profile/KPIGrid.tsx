import { typography } from '@/constants';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface KPIData {
  value: string | number;
  label: string;
  color?: string;
}

interface Props {
  data: KPIData[];
}

export default function KPIGrid({ data }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.kpis}>
      {data.map((item, index) => (
        <View key={index} style={[styles.kpiBox, { backgroundColor: colors.accent }]}>
          <Text
            style={[
              styles.kpiNumber,
              {
                color: item.color || colors.primary,
                fontFamily: typography.fontFamily.jetbrainsMonoBold
              }
            ]}
          >
            {item.value}
          </Text>
          <Text
            style={[
              styles.kpiLabel,
              {
                color: colors.muted,
                fontFamily: typography.fontFamily.jetbrainsMonoBold
              }
            ]}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  kpis: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    justifyContent: 'center'
  },
  kpiBox: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 12,
  },
  kpiNumber: {
    fontSize: 22
  },
  kpiLabel: {
    fontSize: 14,
    marginTop: 3,
    minWidth: 34,
    alignSelf: 'center'
  },
});
