/**
 * Copyright 2023 Ashu. All rights reserved.
 * Use of this source code is governed by a MIT-style license
 */

import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedGradient } from './Tweener';

interface PaletteProp {
  color: string;
  index: number;
  activeGesture: SharedValue<number>;
  onColorPress?: (color: string) => void;
}

const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 140;
const PAD = 24;
const CENTER_RAD = 0;

/* const COLOR_PALETTE = [
  ['rgb(195, 107, 88)', 'rgb(216, 160, 164)', 'rgb(209, 178, 195)'],
  ['rgb(202, 106, 123)', 'rgb(224, 156, 192)', 'rgb(212, 171, 215)'],
  ['rgb(187, 122, 248)', 'rgb(212, 172, 250)', 'rgb(216, 191, 251)'],
  ['rgb(118, 134, 247)', 'rgb(157, 183, 259)', 'rgb(168, 198, 250)'],
  ['rgb(103, 130, 169)', 'rgb(182, 208, 237)', 'rgb(195, 218, 246)'],
  ['rgb(163, 87, 214)', 'rgb(64, 68, 88)', 'rgb(122, 128, 159)'],
  ['rgb(234, 67, 197)', 'rgb(64, 68, 88)', 'rgb(122, 128, 159)'],
  ['rgb(52, 120, 246)', 'rgb(64, 68, 88)', 'rgb(122, 128, 159)'],
]; */

const COLOR_PALETTE = [
  '195, 107, 88',
  '202, 106, 123',
  '187, 122, 248',
  '118, 134, 247',
  '103, 130, 169',
  '163, 87, 214',
  '234, 67, 197',
  '52, 120, 246',
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PaletteItem: React.FC<PaletteProp> = ({
  color,
  index,
  activeGesture,
  onColorPress,
}) => {
  const viewStyle = useAnimatedStyle(() => {
    const angle = (activeGesture.value / COLOR_PALETTE.length) * index;

    const hInterpolate = interpolate(
      activeGesture.value,
      [0, 360],
      [ITEM_WIDTH, ITEM_HEIGHT],
    );
    // hide shadow when menu is closed, and show when opened
    const opacityInterpolate = interpolate(
      activeGesture.value,
      [0, 360],
      [0, 0.3],
    );

    return {
      height: hInterpolate,
      transform: [
        { translateY: (hInterpolate + CENTER_RAD) / 2 },
        { rotate: `${angle}deg` },
        { translateY: -(hInterpolate + CENTER_RAD) / 2 },
      ],
      shadowOpacity: opacityInterpolate,
    };
  }, [activeGesture]);

  return (
    <AnimatedPressable
      style={[
        styles.paletteContainer,
        styles.Shadow16,
        { backgroundColor: `rgb(${color})` },
        viewStyle,
      ]}
      onPress={() => onColorPress?.(color)}
    />
  );
};

const BloomColorPalette = () => {
  const activeGesture = useSharedValue(0);
  const isMenuOpen = useSharedValue(false);

  const [activeColor, setActivecolor] = useState('64, 68, 88');

  const colorContainerStyle = useAnimatedStyle(() => {
    const whInterpolate = interpolate(
      activeGesture.value,
      [0, 360],
      [ITEM_WIDTH, ITEM_HEIGHT * 2],
    );
    const spacing = PAD * 2 + CENTER_RAD * 2;

    return { width: whInterpolate + spacing, height: whInterpolate + spacing };
  }, [activeGesture]);

  const activeOverlayPaletteStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(activeGesture.value, [0, 360], [1, 0]) };
  }, [activeGesture]);

  const btnBgInterpolate = useAnimatedStyle(() => {
    return { backgroundColor: withTiming(`rgb(${activeColor})`) };
  }, [activeColor]);

  const onColorToggle = () => {
    activeGesture.value = withSpring(isMenuOpen.value ? 0 : 360, {
      damping: 15,
      mass: 1,
    });
    isMenuOpen.value = !isMenuOpen.value;
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={activeColor} />
      <AnimatedGradient
        style={{ flex: 1, alignItems: 'center' }}
        colors={[`rgba(${activeColor}, 0.3)`, `rgb(${activeColor})`]}
      >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Animated.View
            style={[
              { backgroundColor: 'rgb(255, 255, 255)', opacity: 0.3 },
              styles.paletteListContainer,
              styles.Shadow16,
              colorContainerStyle,
            ]}
          />
          {/* Having above view as contain with shadow applies it on the palette list also, that's why keeping it separate  */}
          {/* If shadow not required only above View can be used */}
          <Animated.View
            style={[
              { position: 'absolute' },
              styles.paletteListContainer,
              colorContainerStyle,
            ]}
          >
            {COLOR_PALETTE.map((color, index) => (
              <PaletteItem
                key={index}
                onColorPress={newColor => {
                  if (isMenuOpen.value) {
                    setActivecolor(newColor);
                  }
                  onColorToggle();
                }}
                {...{ color, index, activeGesture }}
              />
            ))}
            <Animated.View
              style={[
                { ...StyleSheet.absoluteFillObject, alignItems: 'center' },
                activeOverlayPaletteStyle,
              ]}
              pointerEvents="none"
            >
              <PaletteItem
                key={'active_overlay_palette'}
                index={COLOR_PALETTE.length - 1}
                color={activeColor}
                {...{ activeGesture }}
              />
            </Animated.View>
          </Animated.View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AnimatedPressable
            style={[styles.themeBtn, btnBgInterpolate]}
            onPress={onColorToggle}
          >
            {/* <Animated.View style={[styles.themeBtn, btnBgInterpolate]}> */}
            <Text style={{ color: 'white' }}>Select the theme</Text>
            {/* </Animated.View> */}
          </AnimatedPressable>
        </View>
      </AnimatedGradient>
    </>
  );
};

const styles = StyleSheet.create({
  paletteListContainer: {
    borderRadius: 1000,
    alignItems: 'center',
  },
  paletteContainer: {
    width: ITEM_WIDTH,
    position: 'absolute',
    borderRadius: 1000,
    margin: PAD + CENTER_RAD / 2,
  },
  colorItemCommon: {
    flex: 1,
    width: '100%',
  },
  Shadow16: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  themeBtn: {
    borderRadius: 24,
    alignSelf: 'center',
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default BloomColorPalette;
