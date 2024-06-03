import React from "react";
import { StyleSheet, Text } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BlurRotateListItem = ({ item, index, viewables }) => {
  const frame = useSafeAreaFrame();

  const blurAnimatedProps = useAnimatedProps(() => {
    const isVisible = viewables.value.includes(index);
    return {
      intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }),
    };
  });

  const style = useAnimatedStyle(() => {
    const isVisible = viewables.value.includes(index);
    const isAtStart = index < viewables.value[0];

    return {
      transform: [
        { perspective: 1000 },
        {
          rotateX: withTiming(
            isVisible ? "0deg" : `${isAtStart ? -45 : 45}deg`,
            { duration: 300 }
          ),
        },
        {
          rotate: withTiming(
            isVisible ? "0deg" : `${isAtStart ? -15 : 15}deg`,
            { duration: 300 }
          ),
        },
        { scale: withTiming(isVisible ? 1 : 0.8, { duration: 300 }) },
      ],
    };
  }, [viewables]);

  return (
    <>
      <Animated.View
        style={[styles.container, { maxWidth: (frame.width - 48) / 2 }, style]}
      >
        <Animated.Image style={[styles.img]} source={{ uri: item.url }} />
        <Text style={{ fontWeight: "700" }}>{item.title}</Text>
      </Animated.View>
      <AnimatedBlurView
        style={styles.blur}
        animatedProps={blurAnimatedProps}
        // tint="light"
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, gap: 8 },
  img: { flex: 1, height: 200, borderRadius: 12 },
  blur: {
    ...StyleSheet.absoluteFillObject,
    // without this the item will be half clipped because of perspective and rotate
    zIndex: 1000,
  },
});

export default BlurRotateListItem;
