/**
 * Copyright 2023 Ashu. All rights reserved.
 * Use of this source code is governed by a MIT-style license
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RubberBandingList from './src/rubberBanding/RubberBandingList';

// const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="chatList"
            component={RubberBandingList}
            options={{
              title: 'Messages',
              headerLargeTitle: true,
              headerLargeStyle: { backgroundColor: 'rgb(242, 242, 242)' },
              headerLargeTitleShadowVisible: false,
              headerStyle: { backgroundColor: 'white' },
            }}
          />
        </Stack.Navigator> */}
        <RubberBandingList />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
