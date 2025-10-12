import { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

interface Props {
  style?: ViewStyle | ViewStyle[];
}

export default function AnimatedScreen({ style, children }: PropsWithChildren<Props>) {
  return (
    <Animated.View
      entering={FadeIn.duration(180)}
      exiting={FadeOut.duration(140)}
      layout={LinearTransition.duration(220)}
      style={style as any}
    >
      {children}
    </Animated.View>
  );
}
