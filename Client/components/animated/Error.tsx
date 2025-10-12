import { typography } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props{
    message: string;
}
export default function Error({ message }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.errorContainer}>
        <LottieView
        source={{ uri: 'https://lottie.host/b24756e9-1c9b-4226-b0a4-7c7a0fefc17b/yIZhnV4Qe9.lottie' }}
        autoPlay
        loop
        style={styles.lottieAnimation}
        />
        <Text style={[styles.errorText, { color: colors.foreground }]}>{message}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: typography.fontFamily.kalamBold,
  },
  lottieAnimation: {
    width: 130,
    height: 130,
  },
})
