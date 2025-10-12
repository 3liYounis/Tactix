import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props{
  message: string;
}
export default function Loading({ message }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingContainer}>
        <LottieView
        source={{ uri: 'https://lottie.host/b05cb9d2-54e5-4446-ad15-39de3f06ae51/aYovcq30Yb.lottie' }}
        autoPlay
        loop
        style={styles.lottieAnimation}
        />
        <Text style={[styles.loadingText, { color: colors.foreground }]}>{message}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: typography.fontFamily.kalamBold,
  },
  lottieAnimation: {
    width: 130,
    height: 130,
  },
})
