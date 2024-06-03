/**
 * Copyright 2023 Ashu. All rights reserved.
 * Use of this source code is governed by a MIT-style license
 */

import React, { useRef } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated';
import { data } from './data';

type ListItemType = {
  item: (typeof data)[0];
  index: number;
  scrollOffset: SharedValue<number>;
  endScrollLimit: SharedValue<number>;
};

const ListItem: React.FC<ListItemType> = ({
  item,
  index,
  scrollOffset,
  endScrollLimit,
}) => {
  const viewStyle = useAnimatedStyle(() => {
    const scrollValidLimit = scrollOffset.value > 0 ? endScrollLimit.value : 0;
    const gapFactor = Math.abs((scrollOffset.value - scrollValidLimit) / 10);

    return {
      // For Scroll Rubberbanding effect
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-0.01, 0, endScrollLimit.value, endScrollLimit.value + 0.01],
            [index * gapFactor, 0, 0, -(data.length - index) * gapFactor],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.listItem, viewStyle]}>
      <Image style={styles.avatar} source={item.image} />
      <View style={styles.chatInfoView}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.lastMsg}>{item.message}</Text>
      </View>
    </Animated.View>
  );
};

const RubberBandingList = () => {
  const listRef = useRef<View | null>(null);

  const flatListRef = useAnimatedRef<any>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  const endScrollLimit = useSharedValue(0);
  // Contains list scroll offset from top. In (-) when user scroll past the top on iOS (important to activate Rubberbanding effect).
  // const scrollOffset = useSharedValue(0);

  /* const scrollHandler = useAnimatedScrollHandler(e => {
    scrollOffset.value = e.contentOffset?.y ?? 0;
  }); */

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={{ flex: 1 }} ref={listRef}>
        <Animated.FlatList
          // If not using react-navigation's large title
          ListHeaderComponent={
            <View style={{ height: 60 }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Messages</Text>
            </View>
          }
          // This is required when using react-navigation's large title to avoid hiding some part of content behind the header
          // contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ padding: 16, gap: 24 }}
          onContentSizeChange={(_w, h) =>
            // subtract the total content height with fixed height to get maximum scroll offset limit
            listRef.current?.measure(
              (_x, _y, _wl, hl, _pX, _pY) => (endScrollLimit.value = h - hl),
            )
          }
          // onScroll={scrollHandler}
          // increase the frequency at which we get scroll events
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => (
            <ListItem {...{ item, index, scrollOffset, endScrollLimit }} />
          )}
          keyExtractor={(item, index) => `${item.name}_${index}`}
          ref={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: { width: 56, height: 56 },
  chatInfoView: { flex: 1, gap: 6 },
  itemTitle: { fontSize: 17, fontWeight: '600' },
  lastMsg: { color: 'grey' },
});

export default RubberBandingList;
