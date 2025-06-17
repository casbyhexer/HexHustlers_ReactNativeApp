import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Contact information type
type ContactInfo = {
  type: string;
  value: string;
  icon: React.ReactNode;
  action: () => void;
};

const ContactScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
    // Initial fade-in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Contact information data
  const contactInfo: ContactInfo[] = [
    {
      type: 'Email',
      value: 'cashexerbusiness@gmail.com',
      icon: <Ionicons name="mail" size={30} color="#00f0ff" />,
      action: () => Linking.openURL('mailto:cashexerbusiness@gmail.com')
    },
    {
      type: 'LinkedIn',
      value: 'HEX HUSTLERS [PTY] LTD',
      icon: <FontAwesome5 name="linkedin" size={30} color="#00f0ff" />,
      action: () => Linking.openURL('https://www.linkedin.com/company/hex-hustlers/?viewAsMember=true')
    },
    {
      type: 'Phone',
      value: '+27 71 400 8892',
      icon: <Ionicons name="call" size={30} color="#00f0ff" />,
      action: () => Linking.openURL('tel:+27714008892')
    }
  ];

  // Render individual contact card
  const renderContactCard = (info: ContactInfo, index: number) => {
    return (
      <Animated.View 
        key={`contact-${index}`}
        style={[
          styles.contactCard,
          { 
            opacity: fadeAnim,
            transform: [
              { translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={info.action}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            {info.icon}
          </View>
          <View style={styles.contactInfoContainer}>
            <Text style={styles.contactType}>{info.type}</Text>
            <Text style={styles.contactValue}>{info.value}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#00f0ff" />
          </View>
        </TouchableOpacity>
      </Animated.View>
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
          <TouchableOpacity onPress={() => router.back()}>
            <View style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Text style={styles.contactTitle}>Contact Us</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.contactSubtitle}>Get in touch with our tech wizards</Text>
          </Animated.View>
          
          <View style={styles.contactsContainer}>
            {contactInfo.map((info, index) => renderContactCard(info, index))}
          </View>
          
          <Animated.View
            style={[
              styles.additionalInfoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0]
                })}]
              }
            ]}
          >
            <Text style={styles.infoText}>
              We typically respond within 24-48 hours.
            </Text>
            <Text style={styles.infoText}>
              Our office hours are Monday-Friday, 09:00-17:00 SAST.
            </Text>
          </Animated.View>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/services')}
          >
            <Ionicons name="arrow-back" size={20} color="#ffffff" style={styles.backIcon} />
            <Text style={styles.backText}>BACK TO SERVICES</Text>
          </TouchableOpacity>
        </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  contactTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 5,
    letterSpacing: 1,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  contactSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 5,
    fontStyle: 'italic',
  },
  titleUnderline: {
    height: 3,
    width: 120,
    borderRadius: 5,
    backgroundColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  contactsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  contactCard: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(0,240,255,0.3)',
    overflow: 'hidden',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.4)',
    marginRight: 15,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  contactInfoContainer: {
    flex: 1,
  },
  contactType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 14,
    color: '#00f0ff',
  },
  arrowContainer: {
    padding: 5,
  },
  additionalInfoContainer: {
    backgroundColor: 'rgba(0,40,80,0.5)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.2)',
  },
  infoText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  backIcon: {
    marginRight: 10,
  },
  backText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactScreen;