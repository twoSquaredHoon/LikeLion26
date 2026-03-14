import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import HomeScreen from '../screens/HomeScreen';
import DiningHallsScreen from '../screens/DiningHallsScreen';
import ScanScreen from '../screens/ScanScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <Path d="M9 21V12h6v9"/>
    </Svg>
  );
}

function DiningIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
    </Svg>
  );
}

function ScanIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
      <Rect x={8} y={8} width={8} height={8} rx={1}/>
    </Svg>
  );
}

function CommunityIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
      <Circle cx={9} cy={8} r={3}/>
      <Circle cx={17} cy={8} r={3}/>
      <Path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
      <Path d="M17 14c2.2.4 4 2.5 4 5"/>
    </Svg>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
      <Circle cx={12} cy={8} r={4}/>
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </Svg>
  );
}

function TabIcon({
  Icon,
  label,
  focused,
}: {
  Icon: React.FC<{ color: string }>;
  label: string;
  focused: boolean;
}) {
  const color = focused ? colors.red : colors.inkMuted;
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View style={{
        width: 38, height: 38, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: focused ? colors.redLight : 'transparent',
        borderWidth: focused ? 2.5 : 0,
        borderColor: colors.border,
        shadowColor: focused ? colors.border : 'transparent',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: focused ? 1 : 0,
        shadowRadius: 0,
      }}>
        <Icon color={color} />
      </View>
      <Text style={{ fontSize: 10, fontWeight: '700', color, width: 60, textAlign: 'center' }}>
        {label}
      </Text>
    </View>
  );
}

export default function BottomBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.bg2,
          borderTopWidth: 3,
          borderTopColor: colors.border,
          height: 90,
          paddingBottom: 16,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={HomeIcon} label="Home" focused={focused} /> }}
      />
      <Tab.Screen
        name="DiningHalls"
        component={DiningHallsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={DiningIcon} label="Dining" focused={focused} /> }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={ScanIcon} label="Scan" focused={focused} /> }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={CommunityIcon} label="Community" focused={focused} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon Icon={ProfileIcon} label="Profile" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}