import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
        tabBarInactiveTintColor:"#fff",
        tabBarActiveBackgroundColor:"#fff"
        
      }}

    >
      <Tabs.Screen name='index' options={{ href: null }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <MaterialIcons name="shopping-bag" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <MaterialIcons name="reorder" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <MaterialIcons name="notifications-active" size={24} color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
