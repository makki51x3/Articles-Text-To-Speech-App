import DashboardScreen from './screens/DashboardScreen/Screen';
import LoginScreen from './screens/LoginScreen/Screen';

import { Provider } from 'react-redux';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from 'react';


function App() {
  
  const Stack = createNativeStackNavigator();

  // Hide default bottom navigation bar on mobile
  const [barVisibility, setBarVisibility] = useState();

  NavigationBar.addVisibilityListener(({ visibility }) => {
    setBarVisibility(visibility);
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden"); // Hide it
  }, [barVisibility]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen}   options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;