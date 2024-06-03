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

const ImageBlurListItem = ({ item, index, viewables }) => {
  const frame = useSafeAreaFrame();

  const animatedProps = useAnimatedProps(() => {
    const isVisible = viewables.value.includes(index);
    return {
      intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }),
    };
  });

  const style = useAnimatedStyle(() => {
    const isVisible = viewables.value.includes(index);
    return {
      transform: [
        { scale: withTiming(isVisible ? 1 : 0.7, { duration: 300 }) },
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
        style={{ ...StyleSheet.absoluteFillObject }}
        animatedProps={animatedProps}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, gap: 8 },
  img: { flex: 1, height: 200, borderRadius: 12 },
});

export default ImageBlurListItem;
