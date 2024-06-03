import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import AppleButtonAnimation from './AppleButtonAnimation';
import AppleButtonLayoutAnim from './AppleButtonLayoutAnim';

const AppleButton = () => {
  return (
    <SafeAreaView>
      <View style={{ padding: 24, gap: 24 }}>
        <View style={{ borderWidth: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, textDecorationLine: 'underline' }}>
            Reanimated Shared Value
          </Text>
          <AppleButtonAnimation />
        </View>
        <View style={{ borderWidth: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, textDecorationLine: 'underline' }}>
            Reanimated Entering/Exiting Animations
          </Text>
          <AppleButtonLayoutAnim />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppleButton;
