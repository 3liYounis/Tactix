import {
  Comfortaa_700Bold as ComfortaaBold,
  Comfortaa_400Regular as ComfortaaRegular,
} from '@expo-google-fonts/comfortaa';
import {
  Inter_700Bold as InterBold,
  Inter_500Medium as InterMedium,
  Inter_400Regular as InterRegular,
  Inter_600SemiBold as InterSemiBold,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_700Bold as JetBrainsMonoBold,
  JetBrainsMono_500Medium as JetBrainsMonoMedium,
  JetBrainsMono_400Regular as JetBrainsMonoRegular,
} from '@expo-google-fonts/jetbrains-mono';
import {
  Kalam_700Bold as KalamBold,
  Kalam_400Regular as KalamRegular,
} from '@expo-google-fonts/kalam';
import {
  SpaceGrotesk_700Bold as SpaceGroteskBold,
  SpaceGrotesk_500Medium as SpaceGroteskMedium,
  SpaceGrotesk_400Regular as SpaceGroteskRegular,
} from '@expo-google-fonts/space-grotesk';
import { useFonts } from 'expo-font';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from '../components/animated/SplashScreen';
import { darkTheme, lightTheme } from '../constants';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { isLoggedIn, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  const [loaded] = useFonts({
    'Inter': InterRegular,
    'Inter-Medium': InterMedium,
    'Inter-SemiBold': InterSemiBold,
    'Inter-Bold': InterBold,

    'Space Grotesk': SpaceGroteskRegular,
    'Space Grotesk-Medium': SpaceGroteskMedium,
    'Space Grotesk-Bold': SpaceGroteskBold,

    'JetBrains Mono': JetBrainsMonoRegular,
    'JetBrains Mono-Medium': JetBrainsMonoMedium,
    'JetBrains Mono-Bold': JetBrainsMonoBold,

    'Comfortaa': ComfortaaRegular,
    'Comfortaa-Bold': ComfortaaBold,

    'Kalam': KalamRegular,
    'Kalam-Bold': KalamBold,

    // 'Oswald': OswaldRegular,
    // 'Oswald-Light': OswaldLight,
    // 'Oswald-Medium': OswaldMedium,
    // 'Oswald-SemiBold': OswaldSemiBold,
    // 'Oswald-Bold': OswaldBold,

    // 'Roboto': RobotoRegular,
    // 'Roboto-Light': RobotoLight,
    // 'Roboto-Medium': RobotoMedium,
    // 'Roboto-Bold': RobotoBold,
    // 'Roboto-Black': RobotoBlack,
    // 'Roboto Condensed': RobotoCondensedRegular,
    // 'Roboto Condensed-Light': RobotoCondensedLight,
    // 'Roboto Condensed-Bold': RobotoCondensedBold,

    // 'Raleway': RalewayRegular,
    // 'Raleway-Light': RalewayLight,
    // 'Raleway-Medium': RalewayMedium,
    // 'Raleway-SemiBold': RalewaySemiBold,
    // 'Raleway-Bold': RalewayBold,

    // 'Dancing Script': DancingScriptRegular,
    // 'Dancing Script-Medium': DancingScriptMedium,
    // 'Dancing Script-Bold': DancingScriptBold,

    // 'Caveat': CaveatRegular,
    // 'Caveat-Bold': CaveatBold,

    // 'Permanent Marker': PermanentMarkerRegular,

    // 'Montserrat': MontserratRegular,
    // 'Montserrat-Light': MontserratLight,
    // 'Montserrat-Medium': MontserratMedium,
    // 'Montserrat-SemiBold': MontserratSemiBold,
    // 'Montserrat-Bold': MontserratBold,
    // 'Montserrat-ExtraBold': MontserratExtraBold,

    // 'Poppins': PoppinsRegular,
    // 'Poppins-Light': PoppinsLight,
    // 'Poppins-Medium': PoppinsMedium,
    // 'Poppins-SemiBold': PoppinsSemiBold,
    // 'Poppins-Bold': PoppinsBold,
    // 'Poppins-ExtraBold': PoppinsExtraBold,

    // 'Nunito': NunitoRegular,
    // 'Nunito-Light': NunitoLight,
    // 'Nunito-Medium': NunitoMedium,
    // 'Nunito-SemiBold': NunitoSemiBold,
    // 'Nunito-Bold': NunitoBold,
    // 'Nunito-ExtraBold': NunitoExtraBold,

    // 'Open Sans': OpenSansRegular,
    // 'Open Sans-Light': OpenSansLight,
    // 'Open Sans-Medium': OpenSansMedium,
    // 'Open Sans-SemiBold': OpenSansSemiBold,
    // 'Open Sans-Bold': OpenSansBold,
    // 'Open Sans-ExtraBold': OpenSansExtraBold,

    // 'Lato': LatoRegular,
    // 'Lato-Light': LatoLight,
    // 'Lato-Bold': LatoBold,
    // 'Lato-Black': LatoBlack,
  });

  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? darkTheme : lightTheme;

  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  if (!loaded || isLoading || showSplash) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={themeColors.background} />
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      </SafeAreaProvider>
    );
  }
  if (isLoggedIn)
    return <Redirect href="/(tabs)/dashboard" />;
  return <Redirect href="/(auth)/signIn" />;
}
