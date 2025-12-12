import {
  Animated,
  Dimensions,
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

// Native icon imports
import { FontAwesome5 as RNFontAwesome5, Ionicons as RNIonicons, MaterialCommunityIcons as RNMaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';

// Web icon imports
import {
  FaBrain,
  FaCloudUploadAlt,
  FaCog,
  FaLaptopCode,
  FaMobileAlt,
  FaRocket,
  FaShoppingCart,
  FaTasks,
  FaUsers
} from 'react-icons/fa';
import { IoArrowForward, IoCallOutline, IoCheckmarkCircle, IoNotifications } from 'react-icons/io5';
import {
  MdApi,
  MdCloudDone,
  MdOutlineSecurity,
  MdPalette,
  MdSync
} from 'react-icons/md';

const { width } = Dimensions.get('window');

// Service type definition
type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  deliveryTime: string;
  price: string;
  icon: React.ReactNode;
  category: string;
  isPopular?: boolean;
};

// Process step type
type ProcessStep = {
  step: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
};

const ServicesScreen = () => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('development');
  
  useEffect(() => {
    // Initial fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Development Services
  const developmentServices: Service[] = [
    {
      id: 'web-dev',
      title: 'Custom Web Applications',
      description: 'Full-stack web solutions built with modern frameworks like React, Next.js, and Node.js. From concept to deployment.',
      features: ['Responsive Design', 'SEO Optimized', 'Database Integration', 'User Authentication', 'Payment Processing'],
      deliveryTime: '4-8 weeks',
      price: 'From R15,000|$800 - $2,500',
      category: 'development',
      isPopular: true,
      icon: Platform.OS === 'web'
        ? <FaLaptopCode size={28} color="#00f0ff" />
        : <RNFontAwesome5 name="laptop-code" size={28} color="#00f0ff" />
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Native iOS/Android apps and cross-platform solutions using React Native and Flutter for maximum reach.',
      features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'App Store Deployment', 'Analytics Integration'],
      deliveryTime: '6-12 weeks',
      price: 'From R25,000|$1,200 - $4,200',
      category: 'development',
      icon: Platform.OS === 'web'
        ? <FaMobileAlt size={28} color="#00f0ff" />
        : <RNFontAwesome5 name="mobile-alt" size={28} color="#00f0ff" />
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      description: 'Complete online stores with inventory management, payment gateways, and customer analytics for business growth.',
      features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Customer Analytics', 'Mobile Optimized'],
      deliveryTime: '6-10 weeks',
      price: 'From R20,000|$1,000 - $3,500',
      category: 'development',
      icon: Platform.OS === 'web'
        ? <FaShoppingCart size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="shopping-outline" size={28} color="#00f0ff" />
    },
    {
      id: 'api-dev',
      title: 'API Development & Integration',
      description: 'RESTful APIs, GraphQL endpoints, and third-party integrations that connect your systems seamlessly.',
      features: ['RESTful Design', 'GraphQL Support', 'Third-party Integration', 'Rate Limiting', 'Comprehensive Documentation'],
      deliveryTime: '2-6 weeks',
      price: 'From R8,000|$400 - $1,400',
      category: 'development',
      icon: Platform.OS === 'web'
        ? <MdApi size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="api" size={28} color="#00f0ff" />
    }
  ];

  // Design & Strategy Services
  const designServices: Service[] = [
    {
      id: 'uiux-design',
      title: 'UI/UX Design & Prototyping',
      description: 'User-centered design that converts visitors into customers through intuitive interfaces and seamless experiences.',
      features: ['User Research', 'Wireframing', 'Interactive Prototypes', 'Design System', 'Usability Testing'],
      deliveryTime: '3-6 weeks',
      price: 'From R12,000|$600 - $2,000',
      category: 'design',
      isPopular: true,
      icon: Platform.OS === 'web'
        ? <MdPalette size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="palette-outline" size={28} color="#00f0ff" />
    },
    {
      id: 'branding',
      title: 'Digital Brand Strategy',
      description: 'Complete brand identity and digital strategy to establish your unique market position and drive growth.',
      features: ['Brand Identity', 'Logo Design', 'Style Guide', 'Marketing Strategy', 'Content Planning'],
      deliveryTime: '2-4 weeks',
      price: 'From R10,000|$500 - $1,700',
      category: 'design',
      icon: Platform.OS === 'web'
        ? <FaUsers size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="account-group-outline" size={28} color="#00f0ff" />
    }
  ];

  // Infrastructure & Support Services
  const infrastructureServices: Service[] = [
    {
      id: 'cloud-solutions',
      title: 'Cloud Infrastructure & DevOps',
      description: 'Scalable cloud deployment, CI/CD pipelines, and infrastructure automation for reliable, high-performance applications.',
      features: ['AWS/Azure Setup', 'CI/CD Pipelines', 'Auto Scaling', 'Monitoring', 'Backup Solutions'],
      deliveryTime: '1-3 weeks',
      price: 'From R6,000|$300 - $1,000',
      category: 'infrastructure',
      icon: Platform.OS === 'web'
        ? <FaCloudUploadAlt size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="cloud-upload-outline" size={28} color="#00f0ff" />
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Compliance',
      description: 'Comprehensive security assessments, implementation of protective measures, and compliance with industry standards.',
      features: ['Security Audit', 'Penetration Testing', 'Compliance Setup', 'Data Encryption', 'Incident Response'],
      deliveryTime: '2-4 weeks',
      price: 'From R15,000|$700 - $2,500',
      category: 'infrastructure',
      icon: Platform.OS === 'web'
        ? <MdOutlineSecurity size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="shield-lock-outline" size={28} color="#00f0ff" />
    },
    {
      id: 'ai-integration',
      title: 'AI & Automation Solutions',
      description: 'Custom AI implementations, chatbots, and process automation to streamline operations and enhance user experience.',
      features: ['Custom AI Models', 'Chatbot Development', 'Process Automation', 'Data Analytics', 'Machine Learning'],
      deliveryTime: '4-8 weeks',
      price: 'From R18,000|$900 - $3,000',
      category: 'infrastructure',
      isPopular: true,
      icon: Platform.OS === 'web'
        ? <FaBrain size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="brain" size={28} color="#00f0ff" />
    },
    {
      id: 'maintenance',
      title: 'Ongoing Support & Maintenance',
      description: 'Continuous updates, security patches, performance optimization, and technical support to keep your systems running smoothly.',
      features: ['24/7 Monitoring', 'Security Updates', 'Performance Optimization', 'Bug Fixes', 'Feature Updates'],
      deliveryTime: 'Ongoing',
      price: 'From R2,500/month|$150 - $500/mo',
      category: 'infrastructure',
      icon: Platform.OS === 'web'
        ? <MdSync size={28} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="cog-sync-outline" size={28} color="#00f0ff" />
    }
  ];

  // Software Delivery Process
  const deliveryProcess: ProcessStep[] = [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, define project scope, and create a detailed roadmap.',
      duration: '1-2 weeks',
      icon: Platform.OS === 'web'
        ? <FaTasks size={24} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="clipboard-search-outline" size={24} color="#00f0ff" />
    },
    {
      step: 2,
      title: 'Design & Architecture',
      description: 'UI/UX design, system architecture, and technical specifications are finalized.',
      duration: '1-3 weeks',
      icon: Platform.OS === 'web'
        ? <MdPalette size={24} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="palette-outline" size={24} color="#00f0ff" />
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Agile development with regular updates, comprehensive testing, and quality assurance.',
      duration: '2-8 weeks',
      icon: Platform.OS === 'web'
        ? <FaCog size={24} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="code-tags" size={24} color="#00f0ff" />
    },
    {
      step: 4,
      title: 'Deployment & Launch',
      description: 'Production deployment, performance optimization, and go-live support.',
      duration: '1 week',
      icon: Platform.OS === 'web'
        ? <FaRocket size={24} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="rocket-launch-outline" size={24} color="#00f0ff" />
    },
    {
      step: 5,
      title: 'Ongoing Support',
      description: 'Continuous monitoring, updates, and support to ensure optimal performance.',
      duration: 'Ongoing',
      icon: Platform.OS === 'web'
        ? <MdCloudDone size={24} color="#00f0ff" />
        : <RNMaterialCommunityIcons name="cloud-check-outline" size={24} color="#00f0ff" />
    }
  ];

  // Get services based on active tab
  const getActiveServices = () => {
    switch (activeTab) {
      case 'development':
        return developmentServices;
      case 'design':
        return designServices;
      case 'infrastructure':
        return infrastructureServices;
      default:
        return developmentServices;
    }
  };

  // Handler for service card press
  const handleServicePress = () => {
    router.push('/contact');
  };

  // Render service category tabs
  const renderCategoryTabs = () => {
    const tabs = [
      { id: 'development', title: 'Development', icon: FaLaptopCode },
      { id: 'design', title: 'Design & Strategy', icon: MdPalette },
      { id: 'infrastructure', title: 'Infrastructure', icon: FaCloudUploadAlt }
    ];

    return (
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                {Platform.OS === 'web' ? (
                  <IconComponent size={20} color={isActive ? '#ffffff' : '#00f0ff'} />
                ) : (
                  <RNMaterialCommunityIcons 
                    name={tab.id === 'development' ? 'code-tags' : 
                         tab.id === 'design' ? 'palette-outline' : 'cloud-outline'} 
                    size={20} 
                    color={isActive ? '#ffffff' : '#00f0ff'} 
                  />
                )}
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // Render individual service card
  const renderServiceCard = (service: Service, index: number) => {
    const translateY = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -index * 3],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity key={service.id} onPress={handleServicePress}>
        <Animated.View 
          style={[
            styles.serviceCard,
            service.isPopular && styles.popularCard,
            { 
              transform: [{ translateY }],
              opacity: fadeAnim
            }
          ]}
        >
          {service.isPopular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>MOST POPULAR</Text>
            </View>
          )}
          
          <View style={styles.serviceHeader}>
            <View style={styles.serviceIconContainer}>
              {service.icon}
            </View>
            <View style={styles.serviceHeaderInfo}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <View style={styles.serviceMeta}>
                <Text style={styles.serviceDelivery}>{service.deliveryTime}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.servicePriceZAR}>{service.price.split('|')[0]}</Text>
                  <Text style={styles.servicePriceUSD}>{service.price.split('|')[1]}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.serviceDescription}>{service.description}</Text>
          
          <View style={styles.featuresContainer}>
            {service.features.slice(0, 3).map((feature, fIndex) => (
              <View key={fIndex} style={styles.featureItem}>
                {Platform.OS === 'web' ? (
                  <IoCheckmarkCircle size={16} color="#00f0ff" />
                ) : (
                  <RNIonicons name="checkmark-circle" size={16} color="#00f0ff" />
                )}
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
            {service.features.length > 3 && (
              <Text style={styles.moreFeatures}>
                +{service.features.length - 3} more features
              </Text>
            )}
          </View>

          <View style={styles.priceNote}>
            <Text style={styles.priceNoteText}>
              * Final price determined by project scope and requirements
            </Text>
          </View>

          <TouchableOpacity style={styles.getQuoteButton} onPress={handleServicePress}>
            <Text style={styles.getQuoteText}>Get Custom Quote</Text>
            {Platform.OS === 'web' ? (
              <IoArrowForward size={16} color="#ffffff" />
            ) : (
              <RNIonicons name="arrow-forward" size={16} color="#ffffff" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Render process step
  const renderProcessStep = (step: ProcessStep, index: number) => (
    <View key={step.step} style={styles.processStep}>
      <View style={styles.processStepNumber}>
        <Text style={styles.processStepText}>{step.step}</Text>
      </View>
      <View style={styles.processStepContent}>
        <View style={styles.processStepHeader}>
          <View style={styles.processStepIcon}>{step.icon}</View>
          <Text style={styles.processStepTitle}>{step.title}</Text>
        </View>
        <Text style={styles.processStepDescription}>{step.description}</Text>
        <Text style={styles.processStepDuration}>{step.duration}</Text>
      </View>
      {index < deliveryProcess.length - 1 && (
        <View style={styles.processConnector} />
      )}
    </View>
  );

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
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            {Platform.OS === 'web'
              ? <IoNotifications size={28} color="#00f0ff" />
              : <RNIonicons name="notifications" size={28} color="#00f0ff" />}
          </TouchableOpacity>
        </View>
        
        <Animated.ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
            <Text style={styles.heroTitle}>Transform Your Vision</Text>
            <Text style={styles.heroSubtitle}>Into Digital Reality</Text>
            <View style={styles.heroUnderline} />
            <Text style={styles.heroDescription}>
              Professional software solutions that drive growth and innovation for your business
            </Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          </Animated.View>

          {/* Service Categories */}
          {renderCategoryTabs()}

          {/* Services Grid */}
          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <Text style={styles.sectionSubtitle}>
              Flexible pricing in USD and ZAR, tailored to your specific project needs
            </Text>
            
            <View style={styles.servicesGrid}>
              {getActiveServices().map((service, index) => renderServiceCard(service, index))}
            </View>
          </View>

          {/* Delivery Process */}
          <View style={styles.processSection}>
            <Text style={styles.sectionTitle}>Our Delivery Process</Text>
            <Text style={styles.sectionSubtitle}>
              Structured approach ensuring quality and timely delivery
            </Text>
            
            <View style={styles.processContainer}>
              {deliveryProcess.map((step, index) => renderProcessStep(step, index))}
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
            <Text style={styles.ctaDescription}>
              Let&apos;s discuss your project requirements and create a custom solution that fits your budget and timeline.
            </Text>
            
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => router.push('/contact')}
            >
              {Platform.OS === 'web'
                ? <IoCallOutline size={20} color="#ffffff" style={styles.ctaIcon} />
                : <RNIonicons name="call-outline" size={20} color="#ffffff" style={styles.ctaIcon} />}
              <Text style={styles.ctaButtonText}>Get Your Free Quote</Text>
            </TouchableOpacity>
          </View>
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
  scrollViewContent: {
    paddingBottom: 30,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00f0ff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  heroUnderline: {
    height: 4,
    width: 120,
    backgroundColor: '#00f0ff',
    borderRadius: 2,
    marginBottom: 20,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  heroDescription: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00f0ff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0,240,255,0.5)',
    marginHorizontal: 30,
  },
  tabsContainer: {
    marginBottom: 30,
  },
  tabsScroll: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  tabActive: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderColor: '#00f0ff',
  },
  tabText: {
    color: '#00f0ff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  servicesSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  servicesGrid: {
    gap: 20,
  },
  serviceCard: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
  },
  popularCard: {
    borderColor: '#00f0ff',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#00f0ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(0,240,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    marginRight: 15,
  },
  serviceHeaderInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 24,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDelivery: {
    fontSize: 12,
    color: '#00f0ff',
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  servicePriceZAR: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
    lineHeight: 16,
  },
  servicePriceUSD: {
    fontSize: 10,
    color: '#e0e0e0',
    fontWeight: '500',
    opacity: 0.8,
    marginTop: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
  },
  moreFeatures: {
    fontSize: 12,
    color: '#00f0ff',
    fontStyle: 'italic',
    marginTop: 5,
    marginLeft: 26,
  },
  priceNote: {
    backgroundColor: 'rgba(0,240,255,0.05)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.2)',
  },
  priceNoteText: {
    fontSize: 11,
    color: '#00f0ff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  getQuoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  getQuoteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  processSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  processContainer: {
    marginTop: 20,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    position: 'relative',
  },
  processStepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  processStepText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  processStepContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  processStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  processStepIcon: {
    marginRight: 12,
  },
  processStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  processStepDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    marginBottom: 10,
  },
  processStepDuration: {
    fontSize: 12,
    color: '#00f0ff',
    fontWeight: '600',
  },
  processConnector: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: 30,
    backgroundColor: 'rgba(0,240,255,0.5)',
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaDescription: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  ctaIcon: {
    marginRight: 10,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServicesScreen;