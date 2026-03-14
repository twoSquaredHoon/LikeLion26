import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import BottomBar from './src/navigation/BottomBar';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import HomeScreenMealConfirmed from './src/screens/HomeScreenMealConfirmed';
import HomeScreenReview from './src/screens/HomeScreenReview';
import BirthdayScreen from './src/screens/BirthdayScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  VerifyEmail: undefined;
  ResetPassword: undefined;
  MealConfirmed: undefined;
  Review: undefined;
  Welcome: undefined;
  Birthday: undefined;
  
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login"          component={LoginScreen} />
          <Stack.Screen name="Signup"         component={SignupScreen} />
          <Stack.Screen name="Onboarding"     component={OnboardingScreen} />
          <Stack.Screen name="Home"           component={BottomBar} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyEmail"    component={VerifyEmailScreen} />
          <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />
          <Stack.Screen name="MealConfirmed"  component={HomeScreenMealConfirmed} />
          <Stack.Screen name="Review"         component={HomeScreenReview} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Birthday" component={BirthdayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}