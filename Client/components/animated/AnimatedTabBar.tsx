import { useTheme } from '@/hooks/useTheme';
import { usePathname, useRouter } from 'expo-router';
import { Home, User, UsersRound, Volleyball } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
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
  { name: 'friends', title: 'Friends', icon: UsersRound, route: '/friends' },
  { name: 'profile', title: 'Profile', icon: User, route: '/profile' },
];

export default function AnimatedTabBar() {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const activeIndex = tabs.findIndex(tab => pathname.includes(tab.name));
  const animatedValue = useRef(new Animated.Value(activeIndex)).current;
  const labelOpacity = useRef(new Animated.Value(activeIndex >= 0 ? 1 : 0)).current;

  useEffect(() => {
    const newIndex = tabs.findIndex(tab => pathname.includes(tab.name));
    if (newIndex >= 0) {
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: newIndex,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(labelOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(labelOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [pathname]);

  const handleTabPress = (tab: TabItem, index: number) => {
    router.push(tab.route as any);
  };

  const tabWidth = (width - 45) / tabs.length;

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
      <Animated.View
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          top: 8,
          bottom: 8,
          width: tabWidth - 10,
          backgroundColor: colors.primary,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: [0, tabWidth, tabWidth * 2, tabWidth * 3],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      />

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
              flexDirection: 'row',
              width: '100%',
            }}>
              <IconComponent
                size={20}
                color={isActive ? colors.foreground : colors.foreground}
              />
              {isActive && (
                <Animated.View
                  style={{
                    marginLeft: 6,
                    opacity: labelOpacity,
                  }}
                >
                  <Text
                    style={{
                      color: colors.foreground,
                      fontSize: 14,
                      fontFamily: typography.fontFamily.spaceGroteskBold,
                    }}
                  >
                    {tab.title}
                  </Text>
                </Animated.View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
