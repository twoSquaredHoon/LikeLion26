import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomBar from './src/navigation/BottomBar';
import HomeScreenMeal from './src/screens/HomeScreen/HomeScreenMeal';
import HomeScreenConfirm from './src/screens/HomeScreen/HomeScreenConfirm';
import HomeScreenAdd from './src/screens/HomeScreen/HomeScreenAdd';

export type RootStackParamList = {
  Home: undefined;
  Meal: undefined;
  Confirm: undefined;
  Add: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home"    component={BottomBar} />
          <Stack.Screen name="Meal"    component={HomeScreenMeal} />
          <Stack.Screen name="Confirm" component={HomeScreenConfirm} />
          <Stack.Screen name="Add"     component={HomeScreenAdd} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}