/**
 * Copyright 2023 Ashu. All rights reserved.
 * Use of this source code is governed by a MIT-style license
 */

// Solution is originally from the following Medium article
// reference: https://medium.com/@GroundControl/animating-gradients-in-react-native-8853dbd97d02
import React, { Component } from 'react';
import { StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import { GradientHelper } from './GradientHelper';

interface Props {
  style: StyleProp<ViewStyle>;
  colors: string[];
  children: React.ReactNode;
}

interface State {
  tweener: Animated.Value;
  prevColors: string[];
  colors: string[];
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export class AnimatedGradient extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { colors } = props;
    this.state = {
      prevColors: colors,
      colors,
      tweener: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { colors: prevColors } = state;
    const { colors } = props;
    const tweener = new Animated.Value(0);
    return {
      prevColors,
      colors,
      tweener,
    };
  }

  componentDidUpdate() {
    const { tweener } = this.state;
    Animated.timing(tweener, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { tweener, prevColors, colors } = this.state;

    const { style } = this.props;

    const color1Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[0], colors[0]],
    });

    const color2Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[1], colors[1]],
    });

    return (
      <AnimatedGradientHelper
        style={style || styles.component}
        color1={color1Interp}
        color2={color2Interp}
      >
        {this.props.children}
      </AnimatedGradientHelper>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});
