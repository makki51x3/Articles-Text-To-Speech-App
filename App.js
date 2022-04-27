import DashboardScreen from './screens/DashboardScreen/Screen';
import LoginScreen from './screens/LoginScreen/Screen';

import { Provider } from 'react-redux';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DashboardScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen}   options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;