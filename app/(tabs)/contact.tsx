import { useNotifications } from '@/contexts/NotificationContext';
import { FontAwesome5 as RNFontAwesome5, Ionicons as RNIonicons, MaterialCommunityIcons as RNMaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronRight, FaLinkedin } from 'react-icons/fa';
import { IoArrowBack, IoBusinessOutline, IoCall, IoChatbubblesOutline, IoMail, IoNotifications, IoPerson, IoSend, IoText, IoTimeOutline } from 'react-icons/io5';
import {
  Alert,
  Animated,
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

// Contact information type
type ContactInfo = {
  type: string;
  value: string;
  icon: React.ReactNode;
  action: () => void;
};

// Form data type
type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const ContactScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Get the notification context
  const { addServiceContactNotification } = useNotifications() as any;
  
  // Services list based on Hex Hustlers offerings
  const services = [
    'Website Development',
    'Mobile App Development',
    'AI Integration & Solutions',
    'Custom Software Development',
    'Database Development',
    'SaaS & Cloud Solutions',
    'Cybersecurity Services',
    'IT Consulting',
    'UI/UX Design',
    'E-commerce Solutions',
    'Digital Marketing',
    'Technical Support',
    'Other'
  ];
  
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
  }, [fadeAnim, scaleAnim]);

  // Enhanced contact actions with notification trigger
  const handleEmailAction = () => {
    Linking.openURL('mailto:cashexerbusiness@gmail.com');
    addServiceContactNotification();
  };

  const handlePhoneAction = () => {
    Linking.openURL('tel:+27714008892');
    addServiceContactNotification();
  };

  const handleLinkedInAction = () => {
    Linking.openURL('https://www.linkedin.com/company/hex-hustlers/?viewAsMember=true');
  };

  const handleWhatsAppCommunityAction = () => {
    Linking.openURL('https://chat.whatsapp.com/DQ5INgMNoDU1yGoYmfxOz8');
  };

  // WhatsApp message handler
  const sendWhatsAppMessage = () => {
    const { name, email, phone, service, message } = formData;
    const whatsappMessage = `🔹 NEW SERVICE INQUIRY 🔹

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🛠️ Service: ${service}

💬 Message:
${message}

📲 Sent from Hex Hustlers App`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/message/RU5ARKNRHLFKG1?text=${encodedMessage}`;
    
    Linking.openURL(whatsappUrl);
    addServiceContactNotification();
  };

  // Email submission handler
  const sendEmail = () => {
    const { name, email, phone, service, message } = formData;
    const subject = `New Service Inquiry: ${service}`;
    const body = `NEW SERVICE INQUIRY

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}

Sent from Hex Hustlers App`;
    const emailUrl = `mailto:cashexerbusiness@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(emailUrl);
    addServiceContactNotification();
  };

  // Form submission handler
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Directly send WhatsApp message to business account
    sendWhatsAppMessage();
    resetForm();
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  // Contact information data with updated actions
  const contactInfo: ContactInfo[] = [
    {
      type: 'Email',
      value: 'cashexerbusiness@gmail.com',
      icon: Platform.OS === 'web'
        ? <IoMail size={30} color="#00f0ff" />
        : <RNIonicons name="mail" size={30} color="#00f0ff" />, 
      action: handleEmailAction
    },
    {
      type: 'LinkedIn',
      value: 'HEX HUSTLERS [PTY] LTD',
      icon: Platform.OS === 'web'
        ? <FaLinkedin size={30} color="#00f0ff" />
        : <RNFontAwesome5 name="linkedin" size={30} color="#00f0ff" />, 
      action: handleLinkedInAction
    },
    {
      type: 'Phone/WhatsApp',
      value: '+27 71 400 8892',
      icon: Platform.OS === 'web'
        ? <IoCall size={30} color="#00f0ff" />
        : <RNIonicons name="call" size={30} color="#00f0ff" />, 
      action: handlePhoneAction
    },
    {
      type: 'WhatsApp Community',
      value: 'Join our tech community',
      icon: Platform.OS === 'web'
        ? <IoChatbubblesOutline size={30} color="#00f0ff" />
        : <RNIonicons name="chatbubbles-outline" size={30} color="#00f0ff" />, 
      action: handleWhatsAppCommunityAction
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
            {Platform.OS === 'web'
              ? <FaChevronRight size={24} color="#00f0ff" />
              : <RNMaterialCommunityIcons name="chevron-right" size={24} color="#00f0ff" />}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render service picker
  const renderServicePicker = () => {
    return (
      <View style={styles.serviceContainer}>
        <Text style={styles.inputLabel}>Service *</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.serviceScrollView}
        >
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceChip,
                formData.service === service && styles.serviceChipSelected
              ]}
              onPress={() => setFormData({ ...formData, service })}
            >
              <Text style={[
                styles.serviceChipText,
                formData.service === service && styles.serviceChipTextSelected
              ]}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // Contact form component
  const renderContactForm = () => {
    return (
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: fadeAnim,
            transform: [{ 
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }]
          }
        ]}
      >
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Send us a message</Text>
          <Text style={styles.formSubtitle}>Let&apos;s discuss your project requirements</Text>
        </View>

        <View style={styles.formContent}>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <View style={styles.inputWrapper}>
              {Platform.OS === 'web'
                ? <IoPerson size={20} color="#00f0ff" />
                : <RNIonicons name="person" size={20} color="#00f0ff" />}
              <TextInput
                style={[styles.textInput, { marginLeft: 12 }]}
                placeholder="Enter your full name"
                placeholderTextColor="#888"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.inputWrapper}>
              {Platform.OS === 'web'
                ? <IoMail size={20} color="#00f0ff" />
                : <RNIonicons name="mail" size={20} color="#00f0ff" />}
              <TextInput
                style={[styles.textInput, { marginLeft: 12 }]}
                placeholder="Enter your email address"
                placeholderTextColor="#888"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <View style={styles.inputWrapper}>
              {Platform.OS === 'web'
                ? <IoCall size={20} color="#00f0ff" />
                : <RNIonicons name="call" size={20} color="#00f0ff" />}
              <TextInput
                style={[styles.textInput, { marginLeft: 12 }]}
                placeholder="Enter your phone number"
                placeholderTextColor="#888"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Service Selection */}
          {renderServicePicker()}

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message *</Text>
            <View style={[styles.inputWrapper, styles.messageWrapper]}>
              {Platform.OS === 'web'
                ? <IoText size={20} color="#00f0ff" />
                : <RNIonicons name="text" size={20} color="#00f0ff" />}
              <TextInput
                style={[styles.textInput, styles.messageInput, { marginLeft: 12 }]}
                placeholder="Tell us about your project requirements..."
                placeholderTextColor="#888"
                value={formData.message}
                onChangeText={(text) => setFormData({ ...formData, message: text })}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.7}
          >
            {Platform.OS === 'web'
              ? <IoSend size={20} color="#ffffff" />
              : <RNIonicons name="send" size={20} color="#ffffff" />}
            <Text style={[styles.submitText, { marginLeft: 10 }]}>
              {isSubmitting ? 'Sending...' : 'Send to WhatsApp'}
            </Text>
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            {Platform.OS === 'web'
              ? <IoNotifications size={28} color="#00f0ff" />
              : <RNIonicons name="notifications" size={28} color="#00f0ff" />}
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Text style={styles.contactTitle}>Contact HEX</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.contactSubtitle}>Get in touch with our tech wizards</Text>
          </Animated.View>

          {/* Toggle between contact info and form */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, !showForm && styles.toggleButtonActive]}
              onPress={() => setShowForm(false)}
            >
              <Text style={[styles.toggleText, !showForm && styles.toggleTextActive]}>
                Quick Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, showForm && styles.toggleButtonActive]}
              onPress={() => setShowForm(true)}
            >
              <Text style={[styles.toggleText, showForm && styles.toggleTextActive]}>
                Send Message
              </Text>
            </TouchableOpacity>
          </View>

          {!showForm ? (
            <>
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
                <View style={styles.infoCard}>
                  {Platform.OS === 'web'
                    ? <IoTimeOutline size={20} color="#00f0ff" />
                    : <RNIonicons name="time-outline" size={20} color="#00f0ff" />}
                  <Text style={styles.infoText}>
                    We typically respond within 24-48 hours.
                  </Text>
                </View>
                <View style={styles.infoCard}>
                  {Platform.OS === 'web'
                    ? <IoBusinessOutline size={20} color="#00f0ff" />
                    : <RNIonicons name="business-outline" size={20} color="#00f0ff" />}
                  <Text style={styles.infoText}>
                    Our office hours are Monday-Friday, 09:00-17:00 SAST.
                  </Text>
                </View>
              </Animated.View>
            </>
          ) : (
            renderContactForm()
          )}

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/services')}
          >
            {Platform.OS === 'web'
              ? <IoArrowBack size={20} color="#ffffff" />
              : <RNIonicons name="arrow-back" size={20} color="#ffffff" />}
            <Text style={[styles.backText, { marginLeft: 10 }]}>BACK TO SERVICES</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    textAlign: 'center',
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderWidth: 1,
    borderColor: '#00f0ff',
  },
  toggleText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#00f0ff',
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 5,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  formContent: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 5,
  },
  inputLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  messageWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    padding: 0,
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  serviceContainer: {
    marginBottom: 5,
  },
  serviceScrollView: {
    maxHeight: 60,
  },
  serviceChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  serviceChipSelected: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderColor: '#00f0ff',
  },
  serviceChipText: {
    color: '#e0e0e0',
    fontSize: 14,
    fontWeight: '500',
  },
  serviceChipTextSelected: {
    color: '#00f0ff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: 'rgba(0,240,255,0.2)',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
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
  backText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactScreen;