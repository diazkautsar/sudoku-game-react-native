import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider } from 'react-redux';

import Home from './src/views/Home'
import Board from './src/components/Board'
import Result from './src/components/Result'
import store from './src/store/store';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Winner" component={Result} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Board" component={Board} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
