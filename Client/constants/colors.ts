export const colors = {
  // Primary Colors
  primary: '#00C851',
  primaryLight: '#00E055',
  primaryDark: '#00A040',
  primaryForeground: '#FFFFFF',

  // Secondary Colors
  secondary: '#2D2D2D',
  secondaryLight: '#404040',
  secondaryDark: '#1A1A1A',
  secondaryForeground: '#E0E0E0',

  // Background Colors (base/dark defaults)
  background: '#0A0A0A',
  backgroundLight: '#151515',
  cardBackground: '#1A1A1A',
  foreground: '#FFFFFF',

  // Rating Colors
  ratingRed: '#EF4444',
  ratingOrange: '#F97316',
  ratingYellow: '#EAB308',
  ratingGreen: '#22C55E',

  // Utility Colors
  destructive: '#FF4444',
  muted: '#BBBBBB',
  border: '#404040',
  accent: '#333333',

  // Chart Colors
  chart1: '#00C851',
  chart2: '#FF4444',
  chart3: '#FFD700',
  chart4: '#00A0FF',
  chart5: '#FF6B35',

  GKForeground: '#5fa5fa',
  GKBackgroundColor: '#11213d',
  GKBorderColor: '#2058b3',

  DEFForeground: '#04de71',
  DEFBackgroundColor: '#083018',
  DEFBorderColor: '#038c3a',

  MIDForeground: '#f2be00',
  MIDBackgroundColor: '#382b08',
  MIDBorderColor: '#a67a03',

  FWDForeground: '#fc6265',
  FWDBackgroundColor: '#3b1113',
  FWDBorderColor: '#ad2128',

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #00C851 0%, #00A040 100%)',
    background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
  },
};

// Theme-specific color mappings
export const lightTheme = {
  ...colors,
  background: '#FFFFFF',
  backgroundLight: '#F7F7F9',
  cardBackground: '#FFFFFF',
  foreground: '#0B0F1A',
  border: '#E5E7EB',
  muted: '#6B7280',
  accent: '#F3F4F6',
};

export const darkTheme = {
  ...colors,
};

export type ColorKey = keyof typeof colors;
export type ThemeColors = typeof lightTheme;
