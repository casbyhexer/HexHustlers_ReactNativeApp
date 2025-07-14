import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import CyberpunkTabBar from '@/components/ui/CyberpunkTabBar';
import { IconSymbol } from '@/components/ui/IconSymbol';
//import { useColorScheme } from '@/hooks/useColorScheme';

// Cyberpunk color scheme matching your landing page
const CyberpunkColors = {
  primary: '#00f0ff',      // Bright cyan (matches your landing page)
  secondary: '#0080FF',    // Electric blue
  accent: '#4A90E2',       // Tech blue
  dark: '#001122',         // Deep dark blue
  darker: '#000811',       // Almost black blue
  glow: '#00CCFF',         // Soft cyan glow
};

export default function TabLayout() {
  //const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CyberpunkTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: CyberpunkColors.primary,
        tabBarInactiveTintColor: CyberpunkColors.accent,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 95 : 80,
        },
        sceneStyle: {
          // Add padding bottom to prevent content overlap
          paddingBottom: Platform.OS === 'ios' ? 95 : 80,
        },
        tabBarBackground: () => null, // We handle background in CyberpunkTabBar
      }}>
      <Tabs.Screen
        name="landing"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 28 : 24}
              name="house.fill"
              color={focused ? CyberpunkColors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 28 : 24}
              name="info.circle.fill"
              color={focused ? CyberpunkColors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 28 : 24}
              name="gear"
              color={focused ? CyberpunkColors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="blueprint"
        options={{
          title: 'Blueprints',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 28 : 24}
              name="doc.text.fill"
              color={focused ? CyberpunkColors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="hexchatbot"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 28 : 24}
              name="brain.head.profile"
              color={focused ? CyberpunkColors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 28 : 24}
              name="envelope.fill"
              color={focused ? CyberpunkColors.primary : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}