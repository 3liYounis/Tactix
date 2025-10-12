import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Logo from '../custom/Logo';

interface Props {
  onAnimationComplete?: () => void;
}

export default function SplashScreen({ onAnimationComplete }: Props) {
  const { colors } = useTheme();

  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    { text: 'Loading fonts...', duration: 800 },
    { text: 'Initializing theme...', duration: 600 },
    { text: 'Setting up navigation...', duration: 700 },
    { text: 'Loading components...', duration: 900 },
    { text: 'Almost threre :)', duration: 500 },
  ];

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    let currentStep = 0;
    let totalDuration = 0;

    const runLoadingSequence = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        setLoadingStep(currentStep + 1);

        Animated.timing(progressWidth, {
          toValue: ((currentStep + 1) / loadingSteps.length) * 100,
          duration: step.duration,
          useNativeDriver: false,
        }).start();

        totalDuration += step.duration;
        currentStep++;

        setTimeout(runLoadingSequence, step.duration);
      } else {
        setTimeout(() => {
          onAnimationComplete?.();
        }, 300);
      }
    };
    setTimeout(runLoadingSequence, 500);
  }, []);


  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          opacity: backgroundOpacity,
        },
      ]}
    >
      <Logo />
      <LottieView
        source={{ uri: 'https://lottie.host/cf687e10-53cd-464e-a85c-37f7152b1654/c1HkGGeMhE.lottie' }}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />

      <View style={styles.loadingContainer}>
        <Text style={[styles.loadingText, { color: colors.foreground}]}>
          {loadingText}
        </Text>

        <View style={[styles.progressBarContainer, { backgroundColor: colors.muted }]}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.primary,
                width: progressWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                })
              }
            ]}
          />
        </View>

        <Text style={[styles.progressText, { color: colors.muted}]}>
          {loadingStep} of {loadingSteps.length}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  lottieAnimation: {
    width: 350,
    height: 350,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    letterSpacing: 1,
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  loadingText: {
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
    fontSize: 16,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: typography.fontFamily.kalamBold,
    fontSize: 12,
    opacity: 0.7,
  },
});
