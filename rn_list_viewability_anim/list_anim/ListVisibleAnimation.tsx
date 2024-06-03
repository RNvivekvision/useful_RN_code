import React, { useMemo, useRef } from "react";
import { View, FlatList, FlatListProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import BlurRotateListItem from "./BlurRotateListItem";
import ImageBlurListItem from "./ImageBlurListItem";
import ImageContrastListItem from "./ImageContrastListItem";

interface Props {
  type: "rotate-blur" | "scale-contrast" | "scale-blur";
}

type ViewableChangedFunc = FlatListProps<
  (typeof IMAGES)[0]
>["onViewableItemsChanged"];

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    title: "Fleeting",
  },
  {
    url: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80",
    title: "Caducous",
  },
  {
    url: "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2811&q=80",
    title: "Epochal",
  },
  {
    url: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    title: "Disappearing",
  },
  {
    url: "https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
    title: "Intermittent",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1671751035347-e308f0a19b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2912&q=80",
    title: "Finite",
  },
  {
    url: "https://images.pexels.com/photos/4321069/pexels-photo-4321069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Passing",
  },
  {
    url: "https://images.pexels.com/photos/4993083/pexels-photo-4993083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Transitory",
  },
];

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 10 };

const ListVisibleAnimation: React.FC<Props> = ({ type }) => {
  const insets = useSafeAreaInsets();

  const listData = useMemo(
    () => [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES],
    []
  );
  const viewables = useSharedValue([]);

  // This is called separately to avoid "Changing onViewableItemsChanged on the fly is not supported" error on hot reload
  // reference: https://github.com/facebook/react-native/issues/30171#issuecomment-711154425
  const onViewableItemsChanged: ViewableChangedFunc = ({ viewableItems }) => {
    viewables.value = viewableItems.map((item) => item.index);
  };
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          gap: 16,
        }}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
        data={listData}
        renderItem={({ item, index }) =>
          type === "rotate-blur" ? (
            <BlurRotateListItem {...{ item, index, viewables }} />
          ) : type === "scale-contrast" ? (
            <ImageContrastListItem {...{ item, index, viewables }} />
          ) : (
            <ImageBlurListItem {...{ item, index, viewables }} />
          )
        }
        keyExtractor={(item, i) => `${item.url}_${i}`}
        // onViewableItemsChanged={({ viewableItems, changed }) => {
        //   viewables.value = viewableItems.map((item) => item.index);
        // }}
        // viewabilityConfig={viewabilityConfig}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

export default ListVisibleAnimation;
