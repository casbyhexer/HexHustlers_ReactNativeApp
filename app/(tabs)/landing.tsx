// Native icon imports
import { FontAwesome5 as RNFontAwesome5, MaterialIcons as RNMaterialIcons, Ionicons as RNIonicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Web icon imports
import { 
  FaLaptopCode, 
  FaRobot, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaCloud, 
  FaBrain,
  FaUsers,
  FaTrophy,
  FaRocket,
  FaGlobe,
  FaCheckCircle
} from 'react-icons/fa';
import { MdBusiness, MdSecurity, MdSpeed } from 'react-icons/md';
import { IoCheckmarkCircle, IoArrowForward } from 'react-icons/io5';

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;

  // Company stats
  const stats = [
    { label: 'Projects Delivered', value: '50+', icon: FaRocket },
    { label: 'Happy Clients', value: '98%', icon: FaUsers },
    { label: 'Success Rate', value: '4.9★', icon: FaTrophy },
    { label: 'Countries Served', value: '12', icon: FaGlobe }
  ];

  // Latest advancements
  const advancements = [
    {
      title: 'AI-Powered Development',
      description: 'Leveraging Claude AI for rapid prototyping and code optimization',
      icon: FaBrain,
      status: 'New'
    },
    {
      title: 'Real-Time Analytics',
      description: 'Advanced dashboard solutions for business intelligence',
      icon: MdSpeed,
      status: 'Enhanced'
    },
    {
      title: 'Zero-Downtime Deployments',
      description: 'Advanced CI/CD pipelines ensuring seamless updates',
      icon: FaCloud,
      status: 'Improved'
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security protocols for all applications',
      icon: FaShieldAlt,
      status: 'Certified'
    }
  ];

  const features = [
    {
      id: 1,
      title: "TECHNOLOGY SERVICES",
      subtitle: "End-to-End Digital Solutions",
      description: "Custom Web & Mobile Apps • AI Integration\nCybersecurity • Cloud Infrastructure • Blockchain",
      details: "From startup MVPs to enterprise solutions, we deliver scalable technology that grows with your business.",
      technologies: ["React/Next.js", "AI/ML", "Cloud Computing", "Cybersecurity"],
      icon: Platform.OS === 'web'
        ? <FaLaptopCode size={28} color="#00f0ff" />
        : <RNFontAwesome5 name="laptop-code" size={28} color="#00f0ff" />, 
      route: "/services",
      highlight: "Most Popular"
    },
    {
      id: 2,
      title: "BLUEPRINT COURSES",
      subtitle: "Transform Your Career",
      description: "Tech Skills • Fitness Training • Creative Arts\nInvestment Strategies • Business Development",
      details: "Comprehensive learning paths designed by industry experts with 4+ years of professional experience.",
      technologies: ["Career Growth", "Skill Development", "Personal Branding", "Mentorship"],
      icon: Platform.OS === 'web'
        ? <MdBusiness size={28} color="#00f0ff" />
        : <RNMaterialIcons name="business" size={28} color="#00f0ff" />, 
      route: "/blueprint",
      highlight: "Expert-Led"
    },
    {
      id: 3,
      title: "HEX HUSTLER$ AI",
      subtitle: "Your Personal Tech Mentor",
      description: "AI-Powered Coding Assistance\nTechnical Problem Solving • Code Reviews",
      details: "Get instant technical guidance with our custom AI mentor trained on industry best practices.",
      technologies: ["Code Analysis", "Problem Solving", "Best Practices", "24/7 Support"],
      icon: Platform.OS === 'web'
        ? <FaRobot size={28} color="#00f0ff" />
        : <RNFontAwesome5 name="robot" size={28} color="#00f0ff" />, 
      route: "/hexchatbot",
      highlight: "AI-Powered"
    }
  ];

  useEffect(() => {
    // Entrance animations
    Animated.stagger(150, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
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
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim, logoScale, statsAnim]);

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
          {/* Enhanced Header Section */}
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
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>🚀 Now Serving 12+ Countries Worldwide</Text>
              </View>
              
              <Text style={styles.welcomeText}>Welcome To</Text>
              <Text style={styles.title}>HEX HUSTLER$</Text>
              <Text style={styles.subtitle}>
                Empowering Businesses & Developers to Chase Digital Greatness
              </Text>
              <Text style={styles.tagline}>
                Professional Technology Solutions • Expert Mentorship • AI-Powered Innovation
              </Text>
              
              <View style={styles.accentContainer}>
                <View style={styles.accentLine} />
                <View style={styles.accentDot} />
                <View style={styles.accentLine} />
              </View>
            </View>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View 
            style={[
              styles.statsSection,
              {
                opacity: statsAnim,
                transform: [{ 
                  translateY: statsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0]
                  })
                }],
              }
            ]}
          >
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <View key={index} style={styles.statCard}>
                    <View style={styles.statIcon}>
                      {Platform.OS === 'web'
                        ? <IconComponent size={20} color="#00f0ff" />
                        : <RNFontAwesome5 name="trophy" size={20} color="#00f0ff" />}
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                );
              })}
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
                <View style={styles.logoRing} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          {/* Advancements Section */}
          <Animated.View 
            style={[
              styles.advancementsSection,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <Text style={styles.sectionTitle}>Latest Innovations</Text>
            <View style={styles.advancementsGrid}>
              {advancements.map((advancement, index) => {
                const IconComponent = advancement.icon;
                return (
                  <View key={index} style={styles.advancementCard}>
                    <View style={styles.advancementHeader}>
                      <View style={styles.advancementIcon}>
                        {Platform.OS === 'web'
                          ? <IconComponent size={16} color="#00f0ff" />
                          : <RNIonicons name="checkmark-circle" size={16} color="#00f0ff" />}
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(advancement.status) }]}>
                        <Text style={styles.statusText}>{advancement.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.advancementTitle}>{advancement.title}</Text>
                    <Text style={styles.advancementDescription}>{advancement.description}</Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Enhanced Features Section */}
          <Animated.View 
            style={[
              styles.featuresSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={styles.sectionTitle}>Our Solutions</Text>
            <Text style={styles.sectionSubtitle}>
              Comprehensive technology solutions designed for modern businesses
            </Text>
            
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
                  
                  {feature.highlight && (
                    <View style={styles.highlightBadge}>
                      <Text style={styles.highlightText}>{feature.highlight}</Text>
                    </View>
                  )}
                  
                  <View style={styles.featureHeader}>
                    <View style={styles.featureIcon}>{feature.icon}</View>
                    <View style={styles.featureHeaderText}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                  <Text style={styles.featureDetails}>{feature.details}</Text>
                  
                  <View style={styles.technologiesContainer}>
                    {feature.technologies.map((tech, techIndex) => (
                      <View key={techIndex} style={styles.techChip}>
                        <Text style={styles.techText}>{tech}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <View style={styles.tapIndicator}>
                    <Text style={styles.tapText}>EXPLORE NOW</Text>
                    {Platform.OS === 'web'
                      ? <IoArrowForward size={12} color="#000" style={styles.tapIcon} />
                      : <RNIonicons name="arrow-forward" size={12} color="#000" style={styles.tapIcon} />}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>

          {/* Enhanced CTA Section */}
          <Animated.View
            style={[
              styles.ctaSection,
              {
                transform: [{ scale: buttonScale }],
                opacity: fadeAnim,
              }
            ]}
          >
            <View style={styles.ctaContent}>
              <Text style={styles.ctaTitle}>Ready to Transform Your Business?</Text>
              <Text style={styles.ctaDescription}>
                Join 50+ successful projects and start your digital transformation journey today.
              </Text>
              
              <View style={styles.ctaFeatures}>
                <View style={styles.ctaFeature}>
                  {Platform.OS === 'web'
                    ? <IoCheckmarkCircle size={16} color="#00f0ff" />
                    : <RNIonicons name="checkmark-circle" size={16} color="#00f0ff" />}
                  <Text style={styles.ctaFeatureText}>Free Consultation</Text>
                </View>
                <View style={styles.ctaFeature}>
                  {Platform.OS === 'web'
                    ? <IoCheckmarkCircle size={16} color="#00f0ff" />
                    : <RNIonicons name="checkmark-circle" size={16} color="#00f0ff" />}
                  <Text style={styles.ctaFeatureText}>Custom Solutions</Text>
                </View>
                <View style={styles.ctaFeature}>
                  {Platform.OS === 'web'
                    ? <IoCheckmarkCircle size={16} color="#00f0ff" />
                    : <RNIonicons name="checkmark-circle" size={16} color="#00f0ff" />}
                  <Text style={styles.ctaFeatureText}>24/7 Support</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={handleButtonPress}
              activeOpacity={0.85}
            >
              <View style={styles.buttonGlow} />
              <Text style={styles.buttonText}>START YOUR JOURNEY</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Enhanced Particles */}
          <View style={styles.particlesContainer}>
            {[...Array(8)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.particle,
                  {
                    left: Math.random() * width,
                    top: Math.random() * height * 0.8,
                    opacity: Math.random() * 0.8 + 0.2,
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

// Helper function for status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return '#10b981';
    case 'Enhanced': return '#f59e0b';
    case 'Improved': return '#8b5cf6';
    case 'Certified': return '#ef4444';
    default: return '#00f0ff';
  }
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
    backgroundColor: 'rgba(0, 240, 255, 0.03)',
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
    marginBottom: 25,
  },
  headerContent: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.4)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  badgeContainer: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  badgeText: {
    color: '#00f0ff',
    fontSize: 12,
    fontWeight: '600',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  title: {
    color: '#00f0ff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    opacity: 0.95,
    fontWeight: '500',
  },
  tagline: {
    color: '#e0e0e0',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 16,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  accentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  accentLine: {
    width: 30,
    height: 2,
    backgroundColor: '#00f0ff',
    borderRadius: 1,
    opacity: 0.8,
  },
  accentDot: {
    width: 6,
    height: 6,
    backgroundColor: '#00f0ff',
    borderRadius: 3,
    opacity: 0.8,
  },
  statsSection: {
    width: '100%',
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    width: '48%',
    minWidth: 120,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    color: '#00f0ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.8,
  },
  logoSection: {
    width: width * 0.4,
    height: width * 0.4,
    maxWidth: 160,
    maxHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
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
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(0,240,255,0.5)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },
  logoGlow: {
    position: 'absolute',
    top: -25,
    left: -25,
    right: -25,
    bottom: -25,
    backgroundColor: 'rgba(0,240,255,0.1)',
    borderRadius: 55,
    zIndex: 1,
  },
  logoRing: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    zIndex: 2,
  },
  logo: {
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  advancementsSection: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#e0e0e0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
    lineHeight: 18,
  },
  advancementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  advancementCard: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    width: '48%',
  },
  advancementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  advancementIcon: {
    padding: 8,
    backgroundColor: 'rgba(0,240,255,0.1)',
    borderRadius: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  advancementTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  advancementDescription: {
    color: '#e0e0e0',
    fontSize: 10,
    lineHeight: 14,
    opacity: 0.8,
  },
  featuresSection: {
    width: '100%',
    marginBottom: 30,
  },
  featureCard: {
    width: '100%',
    marginBottom: 15,
  },
  featureCardContent: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },
  featureGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#00f0ff',
    borderRadius: 22,
    zIndex: 1,
    opacity: 0.1,
  },
  highlightBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,240,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 3,
  },
  highlightText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    zIndex: 2,
  },
  featureIcon: {
    marginRight: 15,
    marginTop: 5,
    zIndex: 2,
  },
  featureHeaderText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00f0ff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    zIndex: 2,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    opacity: 0.9,
    zIndex: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    lineHeight: 16,
    marginBottom: 10,
    zIndex: 2,
  },
  featureDetails: {
    fontSize: 11,
    color: '#e0e0e0',
    opacity: 0.7,
    lineHeight: 15,
    marginBottom: 15,
    zIndex: 2,
    fontStyle: 'italic',
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 15,
    zIndex: 2,
  },
  techChip: {
    backgroundColor: 'rgba(0,240,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  techText: {
    color: '#00f0ff',
    fontSize: 9,
    fontWeight: '600',
  },
  tapIndicator: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,240,255,0.9)',
    borderRadius: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tapText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  tapIcon: {
    marginLeft: 4,
  },
  ctaSection: {
    width: '100%',
    marginBottom: 20,
  },
  ctaContent: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.4)',
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaDescription: {
    color: '#e0e0e0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaFeatures: {
    width: '100%',
    gap: 8,
  },
  ctaFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaFeatureText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderWidth: 2,
    borderColor: 'rgba(0,240,255,0.6)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderRadius: 35,
    zIndex: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    width: 4,
    height: 4,
    backgroundColor: '#00f0ff',
    borderRadius: 2,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});

export default LandingScreen;