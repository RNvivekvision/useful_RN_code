/**
 * Copyright 2023 Ashu. All rights reserved.
 * Use of this source code is governed by a MIT-style license
 */

import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  style?: StyleProp<ViewStyle>;
  color1: string;
  color2: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children?: React.ReactNode;
}

/* const GradientHelper = ({ color1, color2, start, end, style }) => {
  return (
    <LinearGradient
      colors={[color1, color2]}
      start={start}
      end={end}
      style={style}
    />
  );
}; */

export class GradientHelper extends Component<Props> {
  render() {
    const {
      style,
      color1,
      color2,
      start = { x: 0, y: 0 },
      end = { x: 0, y: 1 },
      children,
    } = this.props;
    return (
      <LinearGradient
        colors={[color1, color2]}
        start={start}
        end={end}
        style={style}
      >
        {children}
      </LinearGradient>
    );
  }
}
// export default GradientHelper;
