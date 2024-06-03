import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const MIN_HEIGHT = 56;
const BUTTON_MARGIN = 10;

const AppleButtonAnimation = () => {
  const [isButtonActive, setButtonActive] = useState(false);

  const bgScale = useSharedValue(0);
  const containerScale = useSharedValue(0);
  const containerBPosition = useSharedValue(-50);
  const plusIconScale = useSharedValue(0);
  const widthAnim = useSharedValue(56);
  const textOpacity = useSharedValue(0);

  const textRef = useAnimatedRef<Animated.Text>();

  const playAnimation = () => {
    // 'worklet';

    if (!isButtonActive) {
      containerBPosition.value = withTiming(0);
      bgScale.value = withTiming(1.5);
      containerScale.value = withTiming(1, undefined, finished => {
        if (finished) {
          bgScale.value = withTiming(0, undefined, ngFinished => {
            if (ngFinished) {
              plusIconScale.value = withTiming(1, undefined, plusFinish => {
                if (plusFinish) {
                  const textDimen = measure(textRef);

                  const textWidth = textDimen?.width ?? 260;
                  widthAnim.value = withSequence(
                    withTiming(textWidth + 10, undefined, widthFinish => {
                      if (widthFinish) {
                        textOpacity.value = withTiming(
                          1,
                          undefined,
                          opFinish =>
                            opFinish && runOnJS(setButtonActive)(true),
                        );
                      }
                    }),
                    withTiming(textWidth),
                  );
                }
              });
            }
          });
        }
      });
    } else {
      textOpacity.value = withTiming(0);
      plusIconScale.value = withTiming(0, undefined, finished => {
        if (finished) {
          widthAnim.value = withTiming(56, undefined, widthFinish => {
            if (widthFinish) {
              containerScale.value = withTiming(
                0,
                undefined,
                scaleFinished =>
                  scaleFinished &&
                  (runOnJS(setButtonActive)(false),
                  (containerBPosition.value = -50)),
              );
            }
          });
        }
      });
    }
  };

  const containerScaleAnim = useAnimatedStyle(() => {
    return {
      width: widthAnim.value,
      transform: [{ scale: containerScale.value }],
    };
  });
  const bgScaleAnim = useAnimatedStyle(() => {
    return { transform: [{ scale: bgScale.value }] };
  });
  const iconScaleAnim = useAnimatedStyle(() => {
    return { transform: [{ scale: plusIconScale.value }] };
  });

  return (
    <View>
      <View style={styles.container}>
        <Animated.View
          style={[{ minWidth: 56, minHeight: 72, bottom: containerBPosition }]}
        >
          <Animated.View style={[styles.scaledBg, bgScaleAnim]} />
          <Animated.View style={[styles.btnContainer, containerScaleAnim]}>
            <Animated.Text style={[styles.btnText, { opacity: textOpacity }]}>
              Learn how it all works
            </Animated.Text>
            <Animated.View style={[styles.plusIcon, iconScaleAnim]}>
              <Text style={{ fontSize: 28, color: 'white', lineHeight: 28 }}>
                +
              </Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <TouchableOpacity style={{ marginTop: 16 }} onPress={playAnimation}>
          <Text>{!isButtonActive ? 'Show Button' : 'Hide Button'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', opacity: 0 }} pointerEvents="none">
        <Animated.Text style={styles.btnText} ref={textRef}>
          Learn how it all works
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  scaledBg: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 32,
    backgroundColor: '#0071e3',
  },
  btnContainer: {
    width: 56,
    // width: 262,
    height: 56,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(66, 66, 69, 0.7)',
  },
  btnText: {
    fontSize: 17,
    color: 'rgb(245,245,247)',
    fontWeight: '600',
    paddingVertical: 16,
    paddingStart: 24,
    paddingEnd: MIN_HEIGHT + 16 - BUTTON_MARGIN,
  },
  plusIcon: {
    position: 'absolute',
    right: 0,
    width: MIN_HEIGHT - BUTTON_MARGIN * 2,
    height: MIN_HEIGHT - BUTTON_MARGIN * 2,
    borderRadius: 50,
    backgroundColor: '#0071e3',
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: BUTTON_MARGIN,
  },
});

export default AppleButtonAnimation;
