import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AboutScreen = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Ensure consistent path references
  const profileImages = [
    require('../../assets/hexhustlersmedia/WhatsApp Image 2025-05-13 at 1.34.30 PM (1).jpeg'),
    require('../../assets/hexhustlersmedia/WhatsApp Image 2025-05-13 at 1.34.30 PM.jpeg'),
    require('../../assets/hexhustlersmedia/WhatsApp Image 2025-05-13 at 1.34.31 PM.jpeg'),
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change image
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
        
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    // Initial fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(interval);
  }, []);

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
        
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.aboutTitle}>About HEX</Text>
            <View style={styles.titleUnderline} />
          </View>

          <View style={styles.bioContainer}>
            {/* Improved image container with proper aspect ratio */}
            <View style={styles.imageContainer}>
              <Animated.Image
                source={profileImages[currentImageIndex]}
                style={[styles.profileImage, { opacity: fadeAnim }]}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay} />
            </View>
            
            <View style={styles.bioContent}>
              <Text style={styles.name}>Hey Hustler I'm, Luwano Casby Mhango</Text>
              <Text style={styles.title}>Full Stack Developer & Founder, Hex Hustlers</Text>
              
              <Text style={styles.bio}>
                As the founder of Hex Hustlers, I bring 4+ years of professional software development experience across multiple technologies and frameworks. My expertise in creating robust, scalable applications positions our company to deliver exceptional digital solutions that drive business growth.
              </Text>
              

            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Technical Expertise</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.bulletPoint}>• Languages: C#, Java, Kotlin, JavaScript, TypeScript (4+ years)</Text>
              <Text style={styles.bulletPoint}>• Frameworks: React Native, ASP.NET, MVC Web Applications, Android Studio, .NET MUAI (3+ years)</Text>
              <Text style={styles.bulletPoint}>• Mobile Development: Native and cross-platform solutions (3+ years)</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.bulletPoint}>• Bachelor of Computer & Information Sciences in Application Development - IIE Varsity College</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Company Vision</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.visionText}>
                Hex Hustlers is not just a company – it's a vision, a movement, and a mindset. It represents the pursuit of excellence, the drive to innovate, and the relentless passion to chase greatness in all that we do.
              </Text>
              <Text style={styles.bulletPoint}>• Enterprise-grade web and mobile applications</Text>
              <Text style={styles.bulletPoint}>• Interactive UI/UX design and prototyping</Text>
              <Text style={styles.bulletPoint}>• Database architecture and development</Text>
              <Text style={styles.bulletPoint}>• Comprehensive project management</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.visionText}>
              I'm currently expanding my expertise in cybersecurity and blockchain technology to integrate cutting-edge security protocols and decentralized solutions into our client offerings. My focus on AI integration allows us to create intelligent, automated systems that provide measurable business advantages.
            </Text>
            <Text style={styles.visionText}>
              My commitment is to foster collaborative partnerships where clients can "hustle" alongside us, participating in the development process while building solutions that generate measurable traffic, engagement, and ultimately, increased revenue.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/services')}
            >
              <Text style={styles.buttonText}>VIEW SERVICES</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/blueprint')}
            >
              <Text style={styles.buttonText}>VIEW BLUEPRINT</Text>
            </TouchableOpacity>
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
  safeArea: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  aboutTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 5,
  },
  titleUnderline: {
    height: 3,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#00f0ff',
  },
  bioContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
 // Improved image container style
 imageContainer: {
  height: width * 0.6, // Using screen width to determine height for consistent aspect ratio
  borderRadius: 15,
  overflow: 'hidden',
  marginBottom: 15,
  position: 'relative',
  maxWidth: 350,
  maxHeight: 350, // Limit maximum height
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000', // Black background if image doesn't fit perfectly
},
profileImage: {
  width: '100%',
  height: '100%',
  maxWidth: 300, // Limit maximum width
  maxHeight: 300, // Limit maximum height
},
  // Changed from imageGradient to imageOverlay for better descriptiveness
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // Adding gradient effect with shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5,
  },
  bioContent: {
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#00f0ff',
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 22,
    marginBottom: 5,
  },
  sectionContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 10,
  },
  sectionContent: {
    marginTop: 5,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 20,
  },
  visionText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 15,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00f0ff',
    elevation: 3, // Android shadow
    shadowColor: '#00f0ff', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;