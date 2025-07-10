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
import { Ionicons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const AboutScreen = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  
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

    // Waving animation
    const waveAnimation = () => {
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(waveAnimation, 3000); // Wave every 3 seconds
      });
    };
    
    waveAnimation();

    return () => clearInterval(interval);
  }, []);

  const waveRotation = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '25deg'],
  });

  const TechStack = ({ icon, name, color = '#00f0ff' }: { icon: string, name: string, color?: string }) => (
    <View style={styles.techItem}>
      <MaterialCommunityIcons name={icon as any} size={24} color={color} />
      <Text style={styles.techText}>{name}</Text>
    </View>
  );

  const SkillCategory = ({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) => (
    <View style={styles.skillCategory}>
      <View style={styles.skillHeader}>
        {icon}
        <Text style={styles.skillCategoryTitle}>{title}</Text>
      </View>
      <View style={styles.skillsList}>
        {skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>• {skill}</Text>
        ))}
      </View>
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
        <Ionicons name="notifications" size={28} color="#00f0ff" />
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
              <View style={styles.nameContainer}>
                <Text style={styles.heyHustler}>Hey Hustler</Text>
                <Animated.View style={[styles.waveIcon, { transform: [{ rotate: waveRotation }] }]}>
                  <Ionicons name="hand-right" size={24} color="#00f0ff" />
                </Animated.View>
              </View>
              <Text style={styles.name}>I'm Luwano Casby Mhango</Text>
              <Text style={styles.title}>Full Stack Developer & Founder, Hex Hustlers</Text>
              
              <Text style={styles.bio}>
                As the founder of Hex Hustlers, I bring 4+ years of professional software development experience across multiple technologies and frameworks. My expertise in creating robust, scalable applications positions our company to deliver exceptional digital solutions that drive business growth.
              </Text>
            </View>
          </View>

          {/* Enhanced Technical Expertise Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <MaterialCommunityIcons name="code-braces" size={24} color="#00f0ff" />
              <Text style={styles.sectionTitle}>Technical Expertise</Text>
            </View>
            
            {/* Programming Languages */}
            <SkillCategory
              icon={<FontAwesome5 name="code" size={20} color="#00f0ff" />}
              title="Programming Languages"
              skills={['Java', 'C#', 'Kotlin', 'TypeScript & JavaScript', 'CSS, HTML, Bootstrap']}
            />

            {/* Frameworks & Platforms */}
            <SkillCategory
              icon={<MaterialCommunityIcons name="react" size={20} color="#61DAFB" />}
              title="Frameworks & Development"
              skills={['React Native', 'ASP.NET Core & MVC', 'Android Studio', '.NET MAUI', 'Windows Forms']}
            />

            {/* Database & Backend */}
            <SkillCategory
              icon={<MaterialCommunityIcons name="database" size={20} color="#00f0ff" />}
              title="Database & Backend"
              skills={['Advanced SQL & Database Design', 'API Development with C#', 'Database Management Systems', 'Cloud Development (Azure/AWS)']}
            />

            {/* Design & Security */}
            <SkillCategory
              icon={<MaterialCommunityIcons name="shield-check" size={20} color="#4CAF50" />}
              title="Design & Security"
              skills={['UI/UX Design - Figma', 'Application Security', 'System Analysis & Design', 'Network Security Principles']}
            />

            {/* Project Management */}
            <SkillCategory
              icon={<MaterialCommunityIcons name="clipboard-check" size={20} color="#FF9800" />}
              title="Project Management & Research"
              skills={['IT Project Management', 'Software Engineering', 'Data Structures & Algorithms', 'Research & Analysis']}
            />
          </View>

          {/* Tech Stack Visual */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <MaterialCommunityIcons name="tools" size={24} color="#00f0ff" />
              <Text style={styles.sectionTitle}>Technology Stack</Text>
            </View>
            <View style={styles.techStackGrid}>
              <TechStack icon="language-java" name="Java" color="#ED8B00" />
              <TechStack icon="language-csharp" name="C#" color="#239120" />
              <TechStack icon="language-kotlin" name="Kotlin" color="#0095D5" />
              <TechStack icon="language-typescript" name="TypeScript" color="#3178C6" />
              <TechStack icon="react" name="React Native" color="#61DAFB" />
              <TechStack icon="dot-net" name=".NET" color="#512BD4" />
              <TechStack icon="database" name="SQL" color="#00f0ff" />
              <TechStack icon="cloud" name="Cloud" color="#4285F4" />
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <AntDesign name="book" size={20} color="#00f0ff" />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.bulletPoint}>• Bachelor of Computer & Information Sciences in Application Development</Text>
              <Text style={styles.bulletPoint}>• IIE Varsity College - NQF Level 7 (Honours Equivalent)</Text>
              <Text style={styles.bulletPoint}>• Specialized modules in Advanced Databases, Cloud Development, Application Security, and Open Source Development</Text>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <MaterialCommunityIcons name="lightbulb" size={24} color="#00f0ff" />
              <Text style={styles.sectionTitle}>Company Vision</Text>
            </View>
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
              <MaterialCommunityIcons name="briefcase" size={20} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>VIEW SERVICES</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/blueprint')}
            >
              <MaterialCommunityIcons name="map" size={20} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>VIEW BLUEPRINT</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/hexchatbot')}
            >
              <MaterialCommunityIcons name="brain" size={20} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>VIEW AI CHAT TOOL</Text>
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
  imageContainer: {
    height: width * 0.6,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    maxWidth: 350,
    maxHeight: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    maxWidth: 300,
    maxHeight: 300,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5,
  },
  bioContent: {
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  heyHustler: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  waveIcon: {
    marginRight: 8,
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
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginLeft: 8,
  },
  sectionContent: {
    marginTop: 5,
  },
  skillCategory: {
    marginBottom: 20,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  skillsList: {
    marginLeft: 28,
  },
  skillItem: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 20,
  },
  techStackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  techItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 15,
  },
  techText: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 5,
    textAlign: 'center',
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
    elevation: 3,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;