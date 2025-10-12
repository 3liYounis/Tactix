export * from './colors';
export * from './typography';
export * from './spacing';

export { colors, lightTheme, darkTheme } from './colors';
export { typography } from './typography';
export { spacing, borderRadius, shadows } from './spacing';

import { darkTheme, lightTheme } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows } from './spacing';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

export const useDesignSystem = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return useMemo(() => ({
    colors: isDark ? darkTheme : lightTheme,
    typography,
    spacing,
    borderRadius,
    shadows,
  }), [isDark]);
};
