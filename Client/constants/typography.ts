export const typography = {
  fontFamily: {
    spaceGrotesk: 'Space Grotesk',
    spaceGroteskBold: 'Space Grotesk-Bold',
    inter: 'Inter',
    interMedium: 'Inter-Medium',
    interSemiBold: 'Inter-SemiBold',
    jetbrainsMono: 'JetBrains Mono',
    jetbrainsMonoBold: 'JetBrains Mono-Bold',

    comfortaa: 'Comfortaa',
    comfortaaBold: 'Comfortaa-Bold',
    dancingScript: 'Dancing Script',
    caveat: 'Caveat',
    caveatBold: 'Caveat-Bold',
    kalam: 'Kalam',
    kalamBold: 'Kalam-Bold',
    permanentMarker: 'Permanent Marker',

    regular: 'Kalam',
    medium: 'Inter-Medium',
    bold: 'Comfortaa-Bold',
    mono: 'JetBrains Mono',
    sports: 'Comfortaa',
    playful: 'Comfortaa',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  hierarchy: {
    h1: {
      fontFamily: 'Space Grotesk-Bold',
      fontWeight: '400',
      fontSize: 36,
      lineHeight: 1.25,
    },
    h2: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: '400',
      fontSize: 30,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: 'Inter-Medium',
      fontWeight: '400',
      fontSize: 20,
      lineHeight: 1.25,
    },
    body: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 1.5,
    },
    code: {
      fontFamily: 'JetBrains Mono',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 1.5,
    },
  },

  sports: {
    hero: {
      fontFamily: 'Comfortaa-Bold',
      fontWeight: '400',
      fontSize: 42,
      lineHeight: 1.1,
      letterSpacing: 0.5,
    },
    title: {
      fontFamily: 'Comfortaa-Bold',
      fontWeight: '400',
      fontSize: 36,
      lineHeight: 1.2,
      letterSpacing: 0.25,
    },
    subtitle: {
      fontFamily: 'Kalam',
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 1.3,
      letterSpacing: 0.15,
    },
    accent: {
      fontFamily: 'Caveat-Bold',
      fontWeight: '400',
      fontSize: 20,
      lineHeight: 1.2,
      letterSpacing: 0.2,
    },
    body: {
      fontFamily: 'Kalam',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 1.4,
    },
    stats: {
      fontFamily: 'Comfortaa-Bold',
      fontWeight: '400',
      fontSize: 32,
      lineHeight: 1.1,
      letterSpacing: 0.2,
    },
    label: {
      fontFamily: 'Kalam',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 1.3,
    },
    button: {
      fontFamily: 'Caveat-Bold',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 1.2,
      letterSpacing: 0.2,
    },
  },

  playful: {
    quote: {
      fontFamily: 'Dancing Script',
      fontWeight: '400',
      fontSize: 28,
      lineHeight: 1.4,
      fontStyle: 'italic',
    },
    accent: {
      fontFamily: 'Caveat-Bold',
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 1.2,
      letterSpacing: 0.2,
    },
    marker: {
      fontFamily: 'Permanent Marker',
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 1.2,
    },
    fun: {
      fontFamily: 'Kalam-Bold',
      fontWeight: '400',
      fontSize: 26,
      lineHeight: 1.3,
    },
  },
};

export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type FontFamilyKey = keyof typeof typography.fontFamily;
