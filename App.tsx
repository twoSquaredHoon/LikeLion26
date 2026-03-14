import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import HomeScreenMealConfirmed from './src/screens/HomeScreenMealConfirmed';

export type RootStackParamList = {
  Home: undefined;
  MealConfirmed: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MealConfirmed" component={HomeScreenMealConfirmed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}