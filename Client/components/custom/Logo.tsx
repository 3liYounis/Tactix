import { typography } from '@/constants/typography';
import { StyleSheet, Text, View } from 'react-native';
import { Circle, Line, Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

export default function Logo() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <Svg width="32" height="32" viewBox="0 0 32 32">
            <Rect x="4" y="8" width="24" height="16" fill="none" stroke={colors.primaryForeground} strokeWidth="1.5" opacity="0.8"/>

            <Line x1="16" y1="8" x2="16" y2="24" stroke={colors.primaryForeground} strokeWidth="1" opacity="0.6"/>

            <Circle cx="16" cy="16" r="4" fill="none" stroke={colors.primaryForeground} strokeWidth="1" opacity="0.6"/>

            <Rect x="4" y="12" width="4" height="8" fill="none" stroke={colors.primaryForeground} strokeWidth="1" opacity="0.6"/>
            <Rect x="24" y="12" width="4" height="8" fill="none" stroke={colors.primaryForeground} strokeWidth="1" opacity="0.6"/>

            <Line x1="12" y1="14" x2="20" y2="14" stroke={colors.primaryForeground} strokeWidth="2" opacity="0.9"/>
            <Path d="M20 14 L18 12 L18 16 Z" fill={colors.primaryForeground} opacity="0.9"/>

            <Line x1="10" y1="18" x2="22" y2="18" stroke={colors.primaryForeground} strokeWidth="1.5" opacity="0.8"/>
            <Path d="M22 18 L20 16 L20 20 Z" fill={colors.primaryForeground} opacity="0.8"/>

            <Line x1="20" y1="20" x2="12" y2="20" stroke={colors.primaryForeground} strokeWidth="1.5" opacity="0.7"/>
            <Path d="M12 20 L14 18 L14 22 Z" fill={colors.primaryForeground} opacity="0.7"/>
          </Svg>
        </View>
        <View style={styles.brandContainer}>
          <Text style={[styles.brandName, { color: colors.primary }]}>Tactix</Text>
          <Text style={[styles.tagline, { color: colors.muted }]}>Football Strategy</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandContainer: {
    alignItems: 'flex-start',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: -2,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
});
