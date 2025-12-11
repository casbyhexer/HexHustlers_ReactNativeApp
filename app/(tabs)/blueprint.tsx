import { useNotifications } from '@/contexts/NotificationContext';
import { Ionicons as RNIonicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as MailComposer from 'expo-mail-composer';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  IoArrowBack,
  IoBrushOutline,
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoCodeSlash,
  IoFitnessOutline,
  IoLogoPaypal,
  IoMailOutline,
  IoNotificationsOutline,
  IoStarOutline,
  IoTrendingUpOutline
} from 'react-icons/io5';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface CourseCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  courses: Course[];
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceUSD: string;
  duration: string;
  level: string;
  features: string[];
  description: string;
  highlights: string[];
  category: string;
}

const BlueprintScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const { addNotification } = useNotifications();
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [uploadedDoc, setUploadedDoc] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [activeCategory, setActiveCategory] = useState('tech');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    registerForPushNotificationsAsync();
  }, [fadeAnim, slideAnim]);

  const courseCategories: CourseCategory[] = [
    {
      id: 'tech',
      title: 'Code Your Success',
      subtitle: 'Master the digital realm',
      icon: IoCodeSlash,
      color: '#00f0ff',
      courses: [
        {
          id: 'code-rich',
          title: 'Code Your Success: Rich Developer',
          subtitle: 'Complete Development Mastery',
          price: 'R500',
          priceUSD: '$29',
          duration: '6-8 weeks',
          level: 'Beginner to Intermediate',
          features: [
            'Complete development guide with code samples',
            'Project planning worksheets & templates',
            'Technology selection framework',
            'Security implementation guide',
            'Real-world application examples',
            'Implementation checklists & roadmaps'
          ],
          description: 'Transform your coding journey from beginner to professional developer. This comprehensive blueprint covers everything from foundational programming concepts to advanced development practices.',
          highlights: [
            'Build 5+ Real Projects',
            'Master Full-Stack Development',
            'Learn Industry Best Practices'
          ],
          category: 'tech'
        },
        {
          id: 'code-wealthy',
          title: 'Code Your Success: Wealthy Developer',
          subtitle: 'Premium Mentorship Program',
          price: 'R2000',
          priceUSD: '$129',
          duration: 'Monthly Consultations',
          level: 'All Levels',
          features: [
            'Everything in Rich Developer package',
            '1-hour monthly consultation calls',
            'Personalized project guidance',
            'Priority email & chat support',
            'Exclusive developer resources',
            'Career advancement strategies'
          ],
          description: 'Accelerate your development career with personalized mentorship and ongoing support. Perfect for ambitious developers ready to reach the next level.',
          highlights: [
            'Direct Mentor Access',
            'Customized Learning Path',
            'Career Growth Strategy'
          ],
          category: 'tech'
        }
      ]
    },
    {
      id: 'fitness',
      title: 'Forge Your Greatness',
      subtitle: 'Sculpt your ultimate physique',
      icon: IoFitnessOutline,
      color: '#ff6b35',
      courses: [
        {
          id: 'forge-warrior',
          title: 'Forge Your Greatness: Warrior',
          subtitle: 'Foundation Fitness Blueprint',
          price: 'R350',
          priceUSD: '$19',
          duration: '8 weeks',
          level: 'Beginner to Intermediate',
          features: [
            'Complete workout program design',
            'Nutrition planning & meal prep guides',
            'Progress tracking systems',
            'Form technique video library',
            'Supplement optimization guide',
            'Mental resilience training'
          ],
          description: 'Build an unbreakable foundation of strength, endurance, and discipline. This program transforms your body and mind through proven fitness methodologies.',
          highlights: [
            'Transform Your Physique',
            'Build Mental Toughness',
            'Create Lasting Habits'
          ],
          category: 'fitness'
        },
        {
          id: 'forge-champion',
          title: 'Forge Your Greatness: Champion',
          subtitle: 'Elite Performance Program',
          price: 'R1500',
          priceUSD: '$89',
          duration: '12 weeks + Coaching',
          level: 'Intermediate to Advanced',
          features: [
            'Everything in Warrior package',
            'Monthly coaching calls',
            'Personalized program adjustments',
            'Advanced training techniques',
            'Competition preparation protocols',
            'Lifestyle optimization strategies'
          ],
          description: 'Reach elite levels of fitness and performance with personalized coaching and advanced training protocols designed for champions.',
          highlights: [
            'Personal Coaching Access',
            'Advanced Protocols',
            'Peak Performance Focus'
          ],
          category: 'fitness'
        }
      ]
    },
    {
      id: 'creative',
      title: 'Create Your Legacy',
      subtitle: 'Master the art of expression',
      icon: IoBrushOutline,
      color: '#a855f7',
      courses: [
        {
          id: 'create-artist',
          title: 'Create Your Legacy: Artist',
          subtitle: 'Creative Expression Mastery',
          price: 'R450',
          priceUSD: '$25',
          duration: '10 weeks',
          level: 'All Levels',
          features: [
            'Creative workflow optimization',
            'Digital content creation mastery',
            'Brand building & audience development',
            'Professional portfolio strategies',
            'Creative business fundamentals',
            'Performance & presentation skills'
          ],
          description: 'Unlock your creative potential and build a sustainable artistic practice. Whether you express through music, visual arts, or digital content, learn to create work that resonates and builds a loyal following.',
          highlights: [
            'Develop Signature Style',
            'Build Professional Brand',
            'Monetize Your Creativity'
          ],
          category: 'creative'
        },
        {
          id: 'create-visionary',
          title: 'Create Your Legacy: Visionary',
          subtitle: 'Elite Creative Mentorship',
          price: 'R1800',
          priceUSD: '$109',
          duration: 'Monthly Sessions',
          level: 'Intermediate to Professional',
          features: [
            'Everything in Artist package',
            'Monthly creative mentorship calls',
            'Personalized project guidance',
            'Industry networking opportunities',
            'Performance & release strategies',
            'Creative business scaling methods'
          ],
          description: 'Transform from artist to visionary leader in the creative industry. Build a legacy that inspires through authentic expression, strategic releases, and meaningful connections with your audience.',
          highlights: [
            'Creative Mentorship',
            'Industry Connections',
            'Legacy Building Focus'
          ],
          category: 'creative'
        }
      ]
    },
    {
      id: 'investment',
      title: 'Build Your Empire',
      subtitle: 'Master wealth creation',
      icon: IoTrendingUpOutline,
      color: '#10b981',
      courses: [
        {
          id: 'build-investor',
          title: 'Build Your Empire: Investor',
          subtitle: 'Wealth Building Fundamentals',
          price: 'R600',
          priceUSD: '$35',
          duration: '12 weeks',
          level: 'Beginner to Intermediate',
          features: [
            'Investment strategy fundamentals',
            'Portfolio diversification methods',
            'Risk management frameworks',
            'Market analysis techniques',
            'Cryptocurrency & DeFi guide',
            'Passive income stream creation'
          ],
          description: 'Master the art of wealth creation through strategic investing. Learn to build and manage a portfolio that generates lasting financial freedom.',
          highlights: [
            'Build Wealth Systematically',
            'Multiple Income Streams',
            'Financial Independence'
          ],
          category: 'investment'
        },
        {
          id: 'build-mogul',
          title: 'Build Your Empire: Mogul',
          subtitle: 'Elite Wealth Strategy',
          price: 'R2500',
          priceUSD: '$149',
          duration: 'Quarterly Strategy Sessions',
          level: 'Advanced',
          features: [
            'Everything in Investor package',
            'Quarterly strategy consultations',
            'High-net-worth investment strategies',
            'Tax optimization planning',
            'Business acquisition frameworks',
            'Legacy wealth planning'
          ],
          description: 'Join the ranks of financial moguls with advanced wealth-building strategies and personalized investment guidance for substantial portfolio growth.',
          highlights: [
            'Elite Investment Strategies',
            'Personal Wealth Advisor',
            'Legacy Planning'
          ],
          category: 'investment'
        }
      ]
    }
  ];

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
  };

  const showPushNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1 
      },
    });
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      
      if (!result.canceled) {
        setUploadedDoc(result.assets[0]);
        Alert.alert('Success', 'Payment proof uploaded successfully!');
      }
    } catch (error) {
      console.error('Document upload error:', error);
      Alert.alert('Error', 'Failed to upload document');
    }
  };

  const sendEmailWithAttachment = async (course: Course) => {
    const emailBody = `NEW ${course.title.toUpperCase()} ENROLLMENT REQUEST

Customer Details:
━━━━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🎯 Course: ${course.title}
💰 Price: ${course.price} / ${course.priceUSD}
📄 Payment Proof: ${uploadedDoc?.name || 'Attached'}
📚 Category: ${course.category}

━━━━━━━━━━━━━━━━━━━━
REQUEST: Please send "${course.title}" course materials to this customer after verifying payment.

${course.id.includes('champion') || course.id.includes('mogul') || course.id.includes('visionary') || course.id.includes('wealthy') ? 'NOTE: This includes coaching/consultation sessions. Set up scheduling with customer.' : ''}

This is an automated enrollment from the Hex Hustlers app.`;

    try {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      if (!isMailAvailable) {
        Alert.alert('Error', 'Email is not available on this device');
        return false;
      }

      const result = await MailComposer.composeAsync({
        recipients: ['cashexerbusiness@gmail.com'],
        subject: `🚀 New ${course.title} Enrollment - Action Required`,
        body: emailBody,
        attachments: uploadedDoc ? [uploadedDoc.uri] : undefined,
      });

      return result.status === MailComposer.MailComposerStatus.SENT;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  };

  const handleEnrollment = async (course: Course) => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!uploadedDoc) {
      Alert.alert('Error', 'Please upload proof of payment');
      return;
    }

    setIsSubmitting(true);

    try {
      const emailSent = await sendEmailWithAttachment(course);
      
      if (emailSent) {
        console.log('Email sent successfully');
      } else {
        console.log('Email failed to send, but continuing with notification');
      }
      
      addNotification({
        title: `🎉 ${course.title} Enrollment Submitted!`,
        message: `Your enrollment for ${course.title} has been submitted successfully. You will receive course access within 24 hours after payment verification.`,
        type: 'success',
        actionType: 'blueprint_purchase',
      });

      await showPushNotification(
        '🎉 Enrollment Submitted!',
        `Your ${course.title} enrollment has been submitted. Access within 24 hours.`
      );

      Alert.alert(
        'Enrollment Successful!', 
        `Your ${course.title} enrollment has been submitted! We will verify your payment and provide course access within 24 hours.`,
        [
          {
            text: 'View Notifications',
            onPress: () => router.push('/notifications'),
          },
          {
            text: 'OK',
            style: 'default',
          }
        ]
      );

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setUploadedDoc(null);
      setShowEnrollment(false);
      setSelectedCourse(null);

    } catch (error) {
      console.error('Enrollment error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalPayment = (course: Course) => {
    addNotification({
      title: `💳 ${course.title} Payment Started`,
      message: `You are being redirected to complete your payment via PayPal. Course access will be provided after payment confirmation.`,
      type: 'info',
      actionType: 'blueprint_purchase',
    });

    Linking.openURL('https://paypal.me/CasHexer');
  };

  const handleDirectContact = () => {
    router.push('/contact');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image
        source={require('../../assets/hexhustlersmedia/WhatsApp Image 2025-04-12 at 1.06.19 AM (1).jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => router.push('/notifications')}>
        {Platform.OS === 'web'
          ? <IoNotificationsOutline size={28} color="#00f0ff" />
          : <RNIonicons name="notifications" size={28} color="#00f0ff" />}
      </TouchableOpacity>
    </View>
  );

  const renderHeroSection = () => (
    <Animated.View 
      style={[
        styles.heroSection,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Text style={styles.heroTitle}>Chase Greatness</Text>
      <Text style={styles.heroSubtitle}>Transform Your Life Through Expert-Crafted Courses</Text>
      <View style={styles.heroUnderline} />
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100+</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>95%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderCategoryTabs = () => (
    <View style={styles.categoryTabsContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabsScroll}
      >
        {courseCategories.map((category, index) => {
          const IconComponent = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                isActive && styles.categoryTabActive,
                { borderColor: category.color }
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              {Platform.OS === 'web' ? (
                <IconComponent 
                  size={20} 
                  color={isActive ? '#ffffff' : category.color}
                />
              ) : (
                <RNIonicons 
                  name={category.id === 'tech' ? 'code-slash' : 
                       category.id === 'fitness' ? 'fitness' :
                       category.id === 'creative' ? 'brush' : 'trending-up'} 
                  size={20} 
                  color={isActive ? '#ffffff' : category.color}
                />
              )}
              <Text style={[
                styles.categoryTabText,
                isActive && styles.categoryTabTextActive
              ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderCourseCard = (course: Course, category: CourseCategory) => (
    <Animated.View
      key={course.id}
      style={[
        styles.courseCard,
        { borderColor: category.color }
      ]}
    >
      <View style={[styles.courseHeader, { backgroundColor: `${category.color}15` }]}>
        <View style={styles.courseHeaderLeft}>
          <Text style={styles.courseLevel}>{course.level}</Text>
          <Text style={styles.courseDuration}>{course.duration}</Text>
        </View>
        <View style={[styles.coursePrice, { backgroundColor: category.color }]}>
          <Text style={styles.coursePriceText}>{course.price}</Text>
          <Text style={styles.coursePriceUSD}>{course.priceUSD}</Text>
        </View>
      </View>

      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
        <Text style={styles.courseDescription}>{course.description}</Text>

        <View style={styles.highlightsContainer}>
          {course.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              {Platform.OS === 'web' ? (
                <IoStarOutline size={16} color={category.color} />
              ) : (
                <RNIonicons name="star-outline" size={16} color={category.color} />
              )}
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What You&apos;ll Get:</Text>
          {course.features.slice(0, 4).map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              {Platform.OS === 'web' ? (
                <IoCheckmarkCircle size={14} color={category.color} />
              ) : (
                <RNIonicons name="checkmark-circle" size={14} color={category.color} />
              )}
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {course.features.length > 4 && (
            <Text style={styles.moreFeatures}>
              +{course.features.length - 4} more features
            </Text>
          )}
        </View>

        <View style={styles.courseActions}>
          <TouchableOpacity
            style={[styles.enrollButton, { backgroundColor: category.color }]}
            onPress={() => {
              setSelectedCourse(course);
              setShowEnrollment(true);
            }}
          >
            <Text style={styles.enrollButtonText}>Enroll Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.contactButton, { borderColor: category.color }]}
            onPress={handleDirectContact}
          >
            <Text style={[styles.contactButtonText, { color: category.color }]}>
              Ask Questions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  const renderCoursesSection = () => {
    const activeCategories = courseCategories.filter(cat => cat.id === activeCategory);
    
    return (
      <View style={styles.coursesSection}>
        {activeCategories.map((category) => (
          <View key={category.id}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryTitle, { color: category.color }]}>
                {category.title}
              </Text>
              <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
            </View>
            
            {category.courses.map((course) => renderCourseCard(course, category))}
          </View>
        ))}
      </View>
    );
  };

  const renderEnrollmentForm = () => {
    if (!selectedCourse || !showEnrollment) return null;

    const category = courseCategories.find(cat => 
      cat.courses.some(course => course.id === selectedCourse.id)
    );

    return (
      <View style={styles.enrollmentOverlay}>
        <View style={styles.enrollmentModal}>
          <ScrollView contentContainerStyle={styles.enrollmentScrollContainer}>
            <View style={styles.enrollmentHeader}>
              <Text style={[styles.enrollmentTitle, { color: category?.color }]}>
                Enroll in {selectedCourse.title}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowEnrollment(false);
                  setSelectedCourse(null);
                }}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.formInput}
                placeholder="Full Name"
                placeholderTextColor="#00f0ff"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Email Address"
                placeholderTextColor="#00f0ff"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.formInput}
                placeholder="Phone Number"
                placeholderTextColor="#00f0ff"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <View style={styles.bankingSection}>
                <Text style={styles.bankingSectionTitle}>EFT Banking Details</Text>
                <Text style={styles.bankingDetails}>• Bank Name: Nedbank</Text>
                <Text style={styles.bankingDetails}>• Account Number: 1330568761</Text>
                <Text style={styles.bankingDetails}>• Account Type: Current Account</Text>
                <Text style={styles.bankingDetails}>• Account Holder: HEX HUSTLERS (Pty) Ltd</Text>
                <Text style={styles.bankingDetails}>• Swift Code: NEDSZAJJ</Text>
                <Text style={styles.bankingDetails}>• Branch Code: 198765</Text>
              </View>

              <View style={styles.uploadSection}>
                <Text style={styles.uploadTitle}>Upload Proof of Payment</Text>
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={handleDocumentUpload}
                >
                  {Platform.OS === 'web'
                    ? <IoCloudUploadOutline size={24} color="#00f0ff" />
                    : <RNIonicons name="cloud-upload-outline" size={24} color="#00f0ff" />}
                  <Text style={styles.uploadText}>
                    {uploadedDoc ? 'Document Uploaded' : 'Choose File'}
                  </Text>
                </TouchableOpacity>
                {uploadedDoc && (
                  <Text style={styles.uploadedFileName}>{uploadedDoc.name}</Text>
                )}
              </View>

              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentMethodTitle}>Choose Payment Method</Text>
                <View style={styles.paymentMethodUnderline} />
              </View>

              <TouchableOpacity 
                style={[styles.eftButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={() => handleEnrollment(selectedCourse)}
                disabled={isSubmitting}
              >
                <View style={styles.eftButtonContent}>
                  {Platform.OS === 'web'
                    ? <IoMailOutline size={20} color="#ffffff" />
                    : <RNIonicons name="mail-outline" size={20} color="#ffffff" />}
                  <Text style={styles.eftButtonText}>
                    {isSubmitting ? 'SUBMITTING...' : 'EMAIL EFT PROOF'}
                  </Text>
                </View>
                <Text style={styles.eftEmailText}>cashexerbusiness@gmail.com</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.paymentButton}
                onPress={() => handlePayPalPayment(selectedCourse)}
              >
                {Platform.OS === 'web'
                  ? <IoLogoPaypal size={24} color="#ffffff" />
                  : <RNIonicons name="logo-paypal" size={24} color="#ffffff" />}
                <Text style={styles.paymentButtonText}>Pay with PayPal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/hexhustlersmedia/black_gradient_blue_1_background_by_mannyt1013_deyc41r-fullview.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderHeroSection()}
          {renderCategoryTabs()}
          {renderCoursesSection()}
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/services')}
          >
            {Platform.OS === 'web'
              ? <IoArrowBack size={20} color="#ffffff" style={styles.backIcon} />
              : <RNIonicons name="arrow-back" size={20} color="#ffffff" style={styles.backIcon} />}
            <Text style={styles.backText}>BACK TO SERVICES</Text>
          </TouchableOpacity>
        </ScrollView>

        {renderEnrollmentForm()}
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  heroUnderline: {
    height: 4,
    width: 120,
    backgroundColor: '#00f0ff',
    borderRadius: 2,
    marginBottom: 30,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    marginHorizontal: 25,
  },
  categoryTabsContainer: {
    marginBottom: 20,
  },
  categoryTabsScroll: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginRight: 12,
  },
  categoryTabActive: {
    backgroundColor: 'rgba(0,240,255,0.2)',
  },
  categoryTabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  categoryTabTextActive: {
    color: '#ffffff',
  },
  coursesSection: {
    paddingHorizontal: 20,
  },
  categoryHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  courseCard: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  courseHeaderLeft: {
    flex: 1,
  },
  courseLevel: {
    fontSize: 14,
    color: '#00f0ff',
    fontWeight: '600',
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 12,
    color: '#e0e0e0',
  },
  coursePrice: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  coursePriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  coursePriceUSD: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  courseContent: {
    padding: 20,
    paddingTop: 0,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 26,
  },
  courseSubtitle: {
    fontSize: 16,
    color: '#00f0ff',
    marginBottom: 15,
    fontWeight: '500',
  },
  courseDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    marginBottom: 20,
  },
  highlightsContainer: {
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#e0e0e0',
    marginLeft: 10,
    flex: 1,
  },
  moreFeatures: {
    fontSize: 12,
    color: '#00f0ff',
    fontStyle: 'italic',
    marginTop: 5,
    marginLeft: 24,
  },
  courseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  enrollButton: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  enrollButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  enrollmentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  enrollmentModal: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    borderRadius: 20,
    margin: 20,
    maxHeight: height * 0.9,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  enrollmentScrollContainer: {
    padding: 20,
  },
  enrollmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  enrollmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 15,
  },
  formInput: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  bankingSection: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'rgba(0,240,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  bankingSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  bankingDetails: {
    fontSize: 13,
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.5)',
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadText: {
    color: '#00f0ff',
    marginLeft: 10,
    fontSize: 14,
  },
  uploadedFileName: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  paymentMethodContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00f0ff',
    textAlign: 'center',
  },
  paymentMethodUnderline: {
    height: 2,
    width: 60,
    backgroundColor: '#00f0ff',
    marginTop: 5,
  },
  eftButton: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  eftButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eftButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  eftEmailText: {
    color: '#00f0ff',
    fontSize: 13,
    textAlign: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(0,240,255,0.1)',
    opacity: 0.6,
  },
  paymentButton: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.5)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paymentButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00f0ff',
  },
  backIcon: {
    marginRight: 8,
  },
  backText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BlueprintScreen;