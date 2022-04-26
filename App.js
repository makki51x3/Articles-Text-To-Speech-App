import DashboardScreen from './screens/DashboardScreen/Screen';
import LoginScreen from './screens/LoginScreen/Screen';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
         <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
         <Stack.Screen name="DashboardScreen" component={DashboardScreen}   options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;