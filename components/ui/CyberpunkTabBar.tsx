import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CyberpunkTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function CyberpunkTabBar({ state, descriptors, navigation }: CyberpunkTabBarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animations = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  const handlePressIn = (index: number) => {
    setHoveredIndex(index);
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 8,
    }).start();
  };

  const handlePressOut = (index: number) => {
    setHoveredIndex(null);
    Animated.spring(animations[index], {
      toValue: 0,
      useNativeDriver: true,
      tension: 300,
      friction: 8,
    }).start();
  };

  const getIconName = (routeName: string) => {
    switch (routeName) {
      case 'landing':
        return 'house.fill';
      case 'about':
        return 'info.circle.fill';
      case 'services':
        return 'gear';
      case 'blueprint':
        return 'doc.text.fill';
      case 'contact':
        return 'envelope.fill';
      case 'hexchatbot':
        return 'brain.head.profile';
      default:
        return 'circle.fill';
    }
  };

  return (
    <View style={styles.container}>
      {/* Add a spacer to push content up */}
      <View style={styles.contentSpacer} />
      
      {/* Cyberpunk Grid Background */}
      <View style={styles.gridBackground}>
        {Array.from({ length: 15 }).map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: (i * screenWidth) / 15 }]} />
        ))}
      </View>

      {/* Main Tab Bar Container */}
      <View style={styles.tabBarContainer}>
        {/* Top neon border */}
        <View style={styles.neonBorder} />
        
        {/* Tab Items Container */}
        <View style={styles.tabsContainer}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            
            const animatedStyle = {
              transform: [
                {
                  translateY: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
                {
                  scale: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.15],
                  }),
                },
              ],
            };

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                style={styles.tabItem}
              >
                <Animated.View style={[styles.tabContent, animatedStyle]}>
                  {/* Active Tab Glow Effect */}
                  {isFocused && <View style={styles.activeGlow} />}
                  
                  {/* Tab Icon Container */}
                  <View style={[
                    styles.iconContainer,
                    isFocused && styles.activeIconContainer,
                    hoveredIndex === index && styles.hoveredIconContainer
                  ]}>
                    <IconSymbol
                      name={getIconName(route.name)}
                      size={isFocused ? 28 : 24}
                      color={
                        isFocused 
                          ? '#00f0ff' 
                          : hoveredIndex === index 
                            ? '#0080ff' 
                            : '#4A90E2'
                      }
                    />
                  </View>

                  {/* Tab Title - Always visible but styled differently */}
                  <Text style={[
                    styles.tabLabel,
                    isFocused && styles.activeTabLabel,
                    hoveredIndex === index && styles.hoveredTabLabel
                  ]}>
                    {options.title}
                  </Text>

                  {/* Hover Label with enhanced styling */}
                  {hoveredIndex === index && (
                    <Animated.View
                      style={[
                        styles.hoverLabel,
                        {
                          opacity: animations[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                        },
                      ]}
                    >
                      <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>{options.title}</Text>
                      </View>
                      <View style={styles.labelArrow} />
                    </Animated.View>
                  )}

                  {/* Active indicator */}
                  {isFocused && (
                    <View style={styles.activeIndicator} />
                  )}
                </Animated.View>
              </Pressable>
            );
          })}
        </View>

        {/* Bottom accent line */}
        <View style={styles.bottomAccent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 95 : 80,
    backgroundColor: 'transparent', // Ensure container is transparent
  },
  contentSpacer: {
    position: 'absolute',
    top: -(Platform.OS === 'ios' ? 95 : 80), // Negative height to create space above
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 95 : 80,
    backgroundColor: 'transparent',
    pointerEvents: 'none', // Don't interfere with touches
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  gridLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#00f0ff',
  },
  tabBarContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Remove the dark background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  neonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 5,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 50,
  },
  activeGlow: {
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    bottom: -15,
    backgroundColor: 'rgba(0, 240, 255, 0.15)', // Slightly more visible glow
    borderRadius: 30,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 50, 100, 0.3)', // Slightly more visible background
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.5)', // More visible border
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(0, 240, 255, 0.15)',
    borderColor: '#00f0ff',
    borderWidth: 2,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  hoveredIconContainer: {
    backgroundColor: 'rgba(0, 128, 255, 0.2)',
    borderColor: '#0080ff',
    borderWidth: 2,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 2,
  },
  activeTabLabel: {
    color: '#00f0ff',
    fontWeight: '700',
    fontSize: 11,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  hoveredTabLabel: {
    color: '#0080ff',
    fontWeight: '600',
    fontSize: 11,
  },
  hoverLabel: {
    position: 'absolute',
    top: -65,
    minWidth: 90,
    alignItems: 'center',
    zIndex: 1000,
  },
  labelContainer: {
    backgroundColor: 'rgba(0, 240, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#00f0ff',
  },
  labelText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  labelArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#00f0ff',
    marginTop: -1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 40,
    height: 3,
    backgroundColor: '#00f0ff',
    borderRadius: 2,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 1,
    backgroundColor: '#00f0ff',
    opacity: 0.6,
  },
});