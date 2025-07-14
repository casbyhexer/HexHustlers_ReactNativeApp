import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
  const router = useRouter();
  
  // Simplified animation values - removed problematic ones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const features = [
    {
      id: 1,
      title: "TECHNOLOGY SERVICES",
      subtitle: "Full-Stack Development",
      description: "Custom Web & Mobile Apps\nAI • Cybersecurity • Blockchain",
      icon: <FontAwesome5 name="laptop-code" size={24} color="#00f0ff" />,
      route: "/services"
    },
    {
      id: 2,
      title: "BLUEPRINT TOOLS",
      subtitle: "Developer's Success Guide",
      description: "4+ Years Professional Experience\nComplete Career Framework",
      icon: <MaterialIcons name="business" size={26} color="#00f0ff" />,
      route: "/blueprint"
    },
    {
      id: 3,
      title: "HEX HUSTLER$ AI",
      subtitle: "Your Personal Coding Mentor",
      description: "AI-Powered Technical Guidance\nWith That HUSTLER SPIRIT!",
      icon: <FontAwesome5 name="robot" size={26} color="#00f0ff" />,
      route: "/hexchatbot"
    }
  ];

  useEffect(() => {
    // Simple entrance animations
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, logoScale]);

  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => router.push('/about'));
  };

  const handleFeaturePress = (route: string) => {
    router.push(route);
  };

  const handleLogoPress = () => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      source={require('../../assets/hexhustlersmedia/black_gradient_blue_1_background_by_mannyt1013_deyc41r-fullview.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.backgroundOverlay} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View 
            style={[
              styles.headerSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Welcome To</Text>
              <Text style={styles.title}>HEX HUSTLER$</Text>
              <Text style={styles.subtitle}>
                Helping Aspiring Developers, Students & Business Chase Greatness
              </Text>
              
              <View style={styles.accentContainer}>
                <View style={styles.accentLine} />
                <View style={styles.accentDot} />
                <View style={styles.accentLine} />
              </View>
            </View>
          </Animated.View>

          {/* Logo Section */}
          <Animated.View 
            style={[
              styles.logoSection,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <TouchableOpacity
              style={styles.logoTouchable}
              activeOpacity={0.8}
              onPress={handleLogoPress}
            >
              <Animated.View 
                style={[
                  styles.logoWrapper,
                  {
                    transform: [{ scale: logoScale }],
                  }
                ]}
              >
                <View style={styles.logoGlow} />
                <Image
                  source={require('../../assets/hexhustlersmedia/WhatsApp Image 2025-04-12 at 1.06.19 AM (1).jpeg')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          {/* Features Section */}
          <Animated.View 
            style={[
              styles.featuresSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            {features.map((feature) => (
              <View
                key={feature.id}
                style={styles.featureCard}
              >
                <TouchableOpacity
                  style={styles.featureCardContent}
                  activeOpacity={0.8}
                  onPress={() => handleFeaturePress(feature.route)}
                >
                  <View style={styles.featureGlow} />
                  
                  <View style={styles.featureHeader}>
                    <View style={styles.featureIcon}>{feature.icon}</View>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                  </View>
                  
                  <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                  
                  <View style={styles.tapIndicator}>
                    <Text style={styles.tapText}>TAP TO EXPLORE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>

          {/* Button Section */}
          <Animated.View
            style={[
              styles.buttonSection,
              {
                transform: [{ scale: buttonScale }],
                opacity: fadeAnim,
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.button}
              onPress={handleButtonPress}
              activeOpacity={0.85}
            >
              <View style={styles.buttonGlow} />
              <Text style={styles.buttonText}>EXPLORE OUR JOURNEY</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Static Particles */}
          <View style={styles.particlesContainer}>
            {[...Array(6)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.particle,
                  {
                    left: Math.random() * width,
                    top: Math.random() * height * 0.8,
                  }
                ]}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 240, 255, 0.02)',
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerSection: {
    width: '100%',
    marginBottom: 30,
  },
  headerContent: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.9,
  },
  title: {
    color: '#00f0ff',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 6,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    opacity: 0.9,
  },
  accentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 6,
  },
  accentLine: {
    width: 25,
    height: 2,
    backgroundColor: '#00f0ff',
    borderRadius: 1,
    opacity: 0.8,
  },
  accentDot: {
    width: 5,
    height: 5,
    backgroundColor: '#00f0ff',
    borderRadius: 3,
    opacity: 0.8,
  },
  logoSection: {
    width: width * 0.5,
    height: width * 0.5,
    maxWidth: 200,
    maxHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: 'rgba(0,240,255,0.4)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  logoGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: 'rgba(0,240,255,0.08)',
    borderRadius: 45,
    zIndex: 1,
    opacity: 0.8,
  },
  logo: {
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  featuresSection: {
    width: '100%',
    marginBottom: 30,
  },
  featureCard: {
    width: '100%',
    marginBottom: 12,
  },
  featureCardContent: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.25)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  featureGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    backgroundColor: '#00f0ff',
    borderRadius: 16,
    zIndex: 1,
    opacity: 0.15,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    zIndex: 2,
  },
  featureIcon: {
    marginRight: 10,
    zIndex: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00f0ff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    zIndex: 2,
  },
  featureSubtitle: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.9,
    zIndex: 2,
  },
  featureDescription: {
    fontSize: 11,
    color: '#ffffff',
    opacity: 0.8,
    lineHeight: 14,
    marginBottom: 10,
    zIndex: 2,
  },
  tapIndicator: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'rgba(0,240,255,0.8)',
    borderRadius: 8,
    zIndex: 2,
  },
  tapText: {
    fontSize: 9,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  buttonSection: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'rgba(0,240,255,0.5)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  buttonGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    backgroundColor: 'rgba(0,240,255,0.1)',
    borderRadius: 33,
    zIndex: 1,
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    zIndex: 3,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#00f0ff',
    borderRadius: 2,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    opacity: 0.7,
  },
});

export default LandingScreen;