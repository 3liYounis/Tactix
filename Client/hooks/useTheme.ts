import { useColorScheme } from 'react-native';
import { useDesignSystem } from '../constants';
import { useMemo } from 'react';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const designSystem = useDesignSystem();

  const theme = useMemo(() => ({
    isDark,
    colors: designSystem.colors,
    typography: designSystem.typography,
    spacing: designSystem.spacing,
    borderRadius: designSystem.borderRadius,
    shadows: designSystem.shadows,
    colorScheme: colorScheme as 'light' | 'dark',
  }), [isDark, designSystem]);

  return theme;
};
