import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedGrayscale = Animated.createAnimatedComponent(Grayscale);

const ImageContrastListItem = ({ item, index, viewables }) => {
  const frame = useSafeAreaFrame();

  const animatedProps = useAnimatedProps(() => {
    const isVisible = viewables.value.includes(index);
    return {
      intensity: withTiming(isVisible ? 0 : 5, { duration: 300 }),
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

  // This one is for opacity solution for grayscale image
  /* const imageStyle = useAnimatedStyle(() => {
    const isVisible = viewables.value.includes(index);
    return {
      opacity: withTiming(isVisible ? 1 : 0.3, { duration: 300 }),
    };
  }, [viewables]); */

  const grayScaleStyle = useAnimatedStyle(() => {
    const isVisible = viewables.value.includes(index);
    return {
      opacity: withTiming(isVisible ? 0 : 1, { duration: 300 }),
    };
  }, [viewables]);

  return (
    <>
      <Animated.View
        style={[styles.container, { maxWidth: (frame.width - 48) / 2 }, style]}
      >
        <View style={styles.imageContainer}>
          <Animated.Image style={{ flex: 1 }} source={{ uri: item.url }} />
          <AnimatedGrayscale
            style={[{ ...StyleSheet.absoluteFillObject }, grayScaleStyle]}
            amount={1}
          >
            <Animated.Image style={{ flex: 1 }} source={{ uri: item.url }} />
          </AnimatedGrayscale>
          {/* This is kind of an hacky way to simulate grayscale on image (not accurate) */}
          {/* <Animated.Image
            style={{ flex: 1, tintColor: "grey" }}
            source={{ uri: item.url }}
          />
          <Animated.Image
            style={[
              { ...StyleSheet.absoluteFillObject, backgroundColor: "grey" },
              imageStyle,
            ]}
            source={{ uri: item.url }}
          /> */}
        </View>
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
  imageContainer: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default ImageContrastListItem;
