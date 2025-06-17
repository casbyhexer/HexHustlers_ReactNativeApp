import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Service type definition
type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const ServicesScreen = () => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Initial fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Core Services Data
  const coreServices: Service[] = [
    {
      title: 'Custom Web Application Development',
      description: 'Scalable, responsive solutions using modern frameworks',
      icon: <FontAwesome5 name="laptop-code" size={24} color="#00f0ff" />
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform apps for iOS and Android',
      icon: <FontAwesome5 name="mobile-alt" size={24} color="#00f0ff" />
    },
    {
      title: 'UI/UX Design & Prototyping',
      description: 'User-centered design that converts visitors to customers',
      icon: <MaterialCommunityIcons name="palette-outline" size={26} color="#00f0ff" />
    },
    {
      title: 'Database Design & Development',
      description: 'Optimized data architecture and management solutions',
      icon: <Ionicons name="server-outline" size={24} color="#00f0ff" />
    },
    {
      title: 'API Development & Integration',
      description: 'Seamless connectivity between systems and third-party services',
      icon: <MaterialCommunityIcons name="api" size={24} color="#00f0ff" />
    },
    {
      title: 'Software Maintenance & Support',
      description: 'Ongoing updates, security patches, and technical assistance',
      icon: <MaterialCommunityIcons name="cog-sync-outline" size={24} color="#00f0ff" />
    },
    {
      title: 'Project Management',
      description: 'End-to-end coordination of software development projects',
      icon: <MaterialCommunityIcons name="clipboard-check-outline" size={24} color="#00f0ff" />
    }
  ];

  // Advanced Technology Services Data
  const advancedServices: Service[] = [
    {
      title: 'AI Integration',
      description: 'Custom AI solutions to automate business processes',
      icon: <MaterialCommunityIcons name="brain" size={24} color="#00f0ff" />
    },
    {
      title: 'Cybersecurity Consulting',
      description: 'Security assessments and implementation of protective measures',
      icon: <MaterialCommunityIcons name="shield-lock-outline" size={24} color="#00f0ff" />
    },
    {
      title: 'Blockchain Solutions',
      description: 'Smart contracts and decentralized applications (emerging specialty)',
      icon: <MaterialCommunityIcons name="cube-outline" size={24} color="#00f0ff" />
    }
  ];

  // Handler for service card press
  const handleServicePress = () => {
    router.push('/contact');
  };

  // Render individual service card
  const renderServiceCard = (service: Service, index: number) => {
    // Create delay based on index for staggered animation
    const translateY = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -index * 5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity key={`service-${index}`} onPress={handleServicePress}>
        <Animated.View 
          style={[
            styles.serviceCard,
            { 
              transform: [{ translateY }],
              opacity: fadeAnim
            }
          ]}
        >
          <View style={styles.serviceIconContainer}>
            {service.icon}
          </View>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/hexhustlersmedia/black_gradient_blue_1_background_by_mannyt1013_deyc41r-fullview.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/hexhustlersmedia/WhatsApp Image 2025-04-12 at 1.06.19 AM (1).jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View>
          </TouchableOpacity>
        </View>
        
        <Animated.ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.servicesTitle}>Our Services</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.servicesSubtitle}>Tap to connect, built to advance</Text>
          </View>

          {/* Core Services Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeaderLeft}>
                <MaterialCommunityIcons name="code-tags" size={22} color="#00f0ff" />
                <Text style={styles.sectionTitle}>Core Services</Text>
              </View>
              <View style={styles.sectionHeaderGraphic}>
                <MaterialCommunityIcons name="hexagon-outline" size={20} color="#00f0ff" />
              </View>
            </View>
            <View style={styles.servicesContainer}>
              {coreServices.map((service, index) => renderServiceCard(service, index))}
            </View>
          </View>

          {/* Added vertical spacing between sections */}
          <View style={styles.sectionSpacer} />

          {/* Advanced Services Section - Fixed the overlapping issue */}
          <View style={styles.sectionContainer}>
            {/* Added margin to ensure space between sections */}
            <View style={[styles.sectionHeaderContainer, { marginTop: 10 }]}>
              <View style={styles.sectionHeaderLeft}>
                <MaterialCommunityIcons name="atom" size={22} color="#00f0ff" />
                <Text style={styles.sectionTitle}>Advanced Services</Text>
              </View>
              <View style={styles.sectionHeaderGraphic}>
                <MaterialCommunityIcons name="hexagon-outline" size={20} color="#00f0ff" />
              </View>
            </View>
            {/* Added additional padding to create space after header */}
            <View style={[styles.servicesContainer, { paddingTop: 10 }]}>
              {advancedServices.map((service, index) => renderServiceCard(service, index + coreServices.length))}
            </View>
          </View>

          {/* Digital Product Section */}
          <View style={styles.specialProductContainer}>
            <View style={styles.productHeader}>
              <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#00f0ff" />
              <Text style={styles.productTitle}>Developer's Blueprint</Text>
            </View>
            <Text style={styles.productDescription}>
              "Code Your Success: Developer's Blueprint" - A comprehensive digital guide drawing from my 4+ years of professional experience across multiple technologies.
            </Text>
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => router.push('/blueprint')}
            >
              <Text style={styles.learnMoreText}>LEARN MORE</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Us Button */}
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.push('/contact')}
          >
            <Ionicons name="call-outline" size={20} color="#ffffff" style={styles.contactIcon} />
            <Text style={styles.contactText}>CONTACT US</Text>
          </TouchableOpacity>
        </Animated.ScrollView>
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
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 5,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    menuButton: {
      width: 30,
      height: 25,
      justifyContent: 'space-between',
    },
    menuLine: {
      width: '100%',
      height: 3,
      backgroundColor: '#00f0ff',
      borderRadius: 5,
    },
  scrollViewContent: {
    paddingBottom: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  servicesTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 5,
  },
  servicesSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
    fontStyle: 'italic',
  },
  titleUnderline: {
    height: 3,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#00f0ff',
  },
  sectionContainer: {
    marginBottom: 20,
    paddingTop: 5,
  },
  // Increased spacing between sections
  sectionSpacer: {
    height: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(0,240,255,0.3)',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    padding: 12,
    borderLeftWidth: 3,
    borderColor: '#00f0ff',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderGraphic: {
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  servicesContainer: {
    marginBottom: 10,
  },
  serviceCard: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    // 3D effect with shadows
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    marginRight: 15,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 13,
    color: '#e0e0e0',
    lineHeight: 18,
  },
  specialProductContainer: {
    backgroundColor: 'rgba(0,40,80,0.6)',
    borderRadius: 20,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.4)',
    // Enhanced 3D effect
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 15,
  },
  learnMoreButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00f0ff',
  },
  learnMoreText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contactButton: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00f0ff',
    // Glowing effect
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServicesScreen;