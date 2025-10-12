import AnimatedTabBar from '@/components/animated/AnimatedTabBar';
import Logo from '@/components/custom/Logo';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  const { colors } = useTheme();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Redirect href={"/signIn"} />;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Logo />
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
          lazy: false,
        }}>
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
          }}
        />
        <Tabs.Screen
          name="match"
          options={{
            title: 'Match',
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: 'Friends',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
      <AnimatedTabBar />
    </View>
  );
}
