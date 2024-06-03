import React from "react";
import { StyleSheet, FlatList, SafeAreaView, Image } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2811&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1671751035347-e308f0a19b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2912&q=80",
  },
  {
    url: "https://images.pexels.com/photos/4321069/pexels-photo-4321069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    url: "https://images.pexels.com/photos/4993083/pexels-photo-4993083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const HomeTab = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: bottomTabBarHeight },
        ]}
        data={IMAGES}
        renderItem={({ item }) => (
          <Image style={styles.img} source={{ uri: item.url }} />
        )}
        keyExtractor={(item, _i) => item.url}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    padding: 24,
    paddingVertical: 16,
    gap: 16,
  },
  img: { width: "100%", height: 200, borderRadius: 8 },
});

export default HomeTab;
