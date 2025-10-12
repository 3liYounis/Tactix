import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from '../constants';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={themeColors.background} />
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: themeColors.background }}
        >
          <AuthProvider>
            <ToastProvider>
              <Slot />
            </ToastProvider>
          </AuthProvider>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
