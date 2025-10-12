import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeInUp, FadeOut, LinearTransition } from 'react-native-reanimated';

interface Props {
  index?: number;
  style?: ViewStyle | ViewStyle[];
}

export default function AnimatedCard({ index = 0, style, children }: PropsWithChildren<Props>) {
  const delay = Math.min(index * 80, 400);
  return (
    <Animated.View
      entering={FadeInUp.duration(350).delay(delay)}
      exiting={FadeOut.duration(200)}
      layout={LinearTransition.duration(220)}
      style={style as any}
    >
      {children}
    </Animated.View>
  );
}
