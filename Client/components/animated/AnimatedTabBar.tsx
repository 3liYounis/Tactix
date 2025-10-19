import { typography } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import { usePathname, useRouter } from 'expo-router';
import { Home, IdCardLanyard, Users, Volleyball } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface TabItem {
  name: string;
  title: string;
  icon: React.ComponentType<any>;
  route: string;
}

const tabs: TabItem[] = [
  { name: 'dashboard', title: 'Home', icon: Home, route: '/dashboard' },
  { name: 'match', title: 'Match', icon: Volleyball, route: '/match' },
  { name: 'friends', title: 'Friends', icon: Users, route: '/friends' },
  { name: 'profile', title: 'Profile', icon: IdCardLanyard, route: '/profile' },
];

export default function AnimatedTabBar() {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const activeIndex = tabs.findIndex(tab => pathname.includes(tab.name));
  const animatedValue = useRef(new Animated.Value(activeIndex)).current;

  useEffect(() => {
    const newIndex = tabs.findIndex(tab => pathname.includes(tab.name));
    if (newIndex >= 0) {
      Animated.spring(animatedValue, {
        toValue: newIndex,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [pathname]);

  const handleTabPress = (tab: TabItem, index: number) => {
    router.push(tab.route as any);
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 10,
      left: 20,
      right: 20,
      height: 60,
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      // shadowColor: colors.foreground,
      // shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.1,
      // shadowRadius: 8,
      elevation: 8,
    }}>

      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handleTabPress(tab, index)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 44,
              flexDirection: 'row',
              zIndex: 2,
            }}
            activeOpacity={0.7}
          >
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              zIndex: 3,
              gap: 6,
            }}>
              <IconComponent
                size={22}
                color={isActive ? colors.primary : colors.muted}
              />
              <Text style={[styles.text, { color: isActive ? colors.primary : colors.muted }]}>{tab.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: typography.fontFamily.jetbrainsMonoBold,
  },
});
