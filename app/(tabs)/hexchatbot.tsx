import { useNotifications } from '@/contexts/NotificationContext';
// Platform is already imported below with other react-native imports
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// Web icon imports (only used on web)
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosNotifications, IoIosSend } from 'react-icons/io';
import { IoLogoPaypal } from 'react-icons/io5';
import {
  MdAddCircleOutline,
  MdOutlineClose,
  MdOutlineDelete,
  MdOutlineDeleteSweep,
  MdOutlineEmail,
  MdOutlineHistory,
  MdOutlineSmartToy
} from 'react-icons/md';
import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface HustlerKnowledge {
  response: string;
  motivation: string;
}


const HexHustlerChatBot = () => {
  const router = useRouter();
  // Destructure notification context methods
  const {
    addPremiumActivatedNotification,
    addPremiumPendingNotification,
    addPaymentReceivedNotification
  } = useNotifications();

  // State
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: '1',
    title: 'New Chat',
    messages: [{
      id: '1',
      text: "💪 What's good, future tech mogul! Welcome to the HEX HUSTLER AI - your personal coding mentor and motivation machine! 🚀\n\nI'm HEX AI, packed with 4+ years of full-stack development wisdom, BCAD degree knowledge, and that relentless HUSTLER SPIRIT! Whether you need:\n\n🔥 Technical guidance on Java, C#, React Native, or any dev stack\n💡 Career advice from someone who's been grinding since high school\n⚡ Motivation to keep pushing when the code gets tough\n🎯 Real talk about building your own tech empire\n\nI'm here to help you LEVEL UP! What's your first move, hustler? 💎",
      isUser: false,
      timestamp: new Date(),
    }],
    createdAt: new Date(),
  });
  const [savedChats, setSavedChats] = useState<ChatSession[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnim = useRef(new Animated.Value(0)).current;

  // Payment URLs
  const PAYPAL_URL = "https://www.paypal.com/paypalme/CasHexer";
  const EMAIL_ADDRESS = "cashexerbusiness@gmail.com";

// Enhanced knowledge base with hustler motivation
  const getHustlerResponse = (userMessage: string): HustlerKnowledge => {
    const message = userMessage.toLowerCase();

    // Personal/Career Questions
    if (message.includes('about you') || message.includes('who are you') || message.includes('background')) {
      return {
        response: "🎯 I'm the digital embodiment of HEX - Passionate Tech Innovation hustler, Here's my story:\n\n📚 BCAD Graduate from IIE Varsity College (2022-2024)\n💼 Currently CDO at Terrock Technologies\n🏆 Built apps for NSRI (drowning prevention), worked on AutoFixer\n🌍 From Cape Town to the global tech scene\n⚡ AWS certified, full-stack specialist, blockchain enthusiast\n\nStarted graphic design in high school, now building million-dollar applications. That's the HUSTLER evolution! 📈",
        motivation: "Remember: Every expert was once a beginner who refused to quit! Your journey starts with the first line of code you write TODAY! 🔥"
      };
    }

    // Technical Skills Deep Dive
    if (message.includes('skills') || message.includes('technologies') || message.includes('tech stack')) {
      return {
        response: "🛠️ MY TECH ARSENAL (4+ Years Battle-Tested):\n\n💻 LANGUAGES: Java, C#, Kotlin, TypeScript, JavaScript, HTML, CSS\n📱 MOBILE: React Native, Android Studio, .NET MAUI\n🌐 WEB: ASP.NET, MVC, Bootstrap, Full-Stack Development\n🗄️ DATABASE: Advanced SQL, Database Architecture\n☁️ CLOUD: AWS (Core Services + Cloud Basics Certified)\n🔒 SECURITY: Application Development Security\n🎨 DESIGN: UI/UX with Figma, System Analysis\n📊 MANAGEMENT: IT Project Management, Agile\n🔗 API: RESTful services, C# API development\n\nPlus emerging tech: AI, Blockchain, Quantum Computing exploration! 🚀",
        motivation: "Master your tools like a craftsman masters their trade! Every skill you learn multiplies your value in the market! 💎"
      };
    }

    // Programming Languages Advice
    if (message.includes('java') || message.includes('programming language') || message.includes('which language')) {
      return {
        response: "☕ JAVA - My Foundation Language!\n\nWhy Java rocks for hustlers:\n✅ Enterprise-level opportunities (BIG money!)\n✅ Android development gateway\n✅ Spring Boot for powerful backends\n✅ Massive job market globally\n✅ Object-oriented thinking foundation\n\n🎯 C# is my other powerhouse - .NET ecosystem is GOLD!\n🚀 JavaScript/TypeScript for full-stack domination\n⚡ Kotlin for modern Android (Java's cool cousin)\n\nStart with Java → Master fundamentals → Expand your empire! 📈",
        motivation: "Pick ONE language, become DANGEROUS with it, then conquer the rest! Depth before breadth, hustler! 🔥"
      };
    }

    // Career Advice
    if (message.includes('career') || message.includes('job') || message.includes('advice') || message.includes('start')) {
      return {
        response: "💼 CAREER HUSTLER BLUEPRINT:\n\n🎯 PHASE 1: Foundation (0-1 years)\n• Master 1-2 languages deeply\n• Build 3-5 portfolio projects\n• Contribute to open source\n• Network like your life depends on it\n\n🚀 PHASE 2: Specialization (1-3 years)\n• Choose your battlefield (web, mobile, AI, etc.)\n• Get certified (AWS, Azure, etc.)\n• Freelance to build rep\n• Start your own projects\n\n👑 PHASE 3: Empire Building (3+ years)\n• Launch your own company\n• Mentor others\n• Speak at conferences\n• Build passive income streams\n\nI went from high school graphic design to CDO - your turn! 📊",
        motivation: "Your career isn't just a job - it's your empire! Build it with intention, hustle, and relentless improvement! 👑"
      };
    }

    // Mobile Development
    if (message.includes('mobile') || message.includes('react native') || message.includes('android')) {
      return {
        response: "📱 MOBILE DEVELOPMENT MASTERY:\n\n🔥 React Native (My Weapon of Choice):\n• One codebase → iOS + Android = 2x efficiency!\n• JavaScript skills transfer directly\n• Expo makes deployment smooth\n• Perfect for startups and MVPs\n\n⚡ Native Android (Kotlin/Java):\n• Maximum performance and control\n• Access to all platform features\n• Better for complex applications\n• Higher learning curve but worth it\n\n💡 PRO TIP: Start with React Native, learn native later. I built AutoFixer's mobile features this way - maximum impact, minimum time investment! 🎯",
        motivation: "Mobile is the future! Every business needs an app - position yourself as the solution provider! 💰"
      };
    }

    // Web Development
    if (message.includes('web') || message.includes('asp.net') || message.includes('frontend') || message.includes('backend')) {
      return {
        response: "🌐 WEB DEVELOPMENT DOMINANCE:\n\n🎯 ASP.NET + MVC (My Backend Power):\n• Enterprise-grade scalability\n• Seamless C# integration\n• Robust security features\n• Microsoft ecosystem advantage\n\n⚡ Full-Stack Approach:\n• Frontend: React/TypeScript\n• Backend: ASP.NET Core\n• Database: SQL Server/PostgreSQL\n• Deployment: Azure/AWS\n\n💻 Bootstrap + CSS for rapid UI development\n🔗 RESTful APIs for seamless integration\n📊 Real-time features with SignalR\n\nBuilt multiple MVC applications during my BCAD - from concept to production! 🚀",
        motivation: "The web is your canvas - paint your digital masterpiece and watch clients pay premium for your art! 🎨💎"
      };
    }

    // Database and Backend
    if (message.includes('database') || message.includes('sql') || message.includes('backend')) {
      return {
        response: "🗄️ DATABASE MASTERY - The Foundation of Everything:\n\n💪 Advanced SQL Skills:\n• Complex joins and subqueries\n• Stored procedures and functions\n• Performance optimization\n• Data modeling and normalization\n\n🏗️ Architecture Principles:\n• Scalable schema design\n• Indexing strategies\n• Security best practices\n• Backup and recovery plans\n\n⚡ Technologies I Work With:\n• SQL Server (Microsoft ecosystem)\n• PostgreSQL (open source power)\n• Entity Framework (ORM mastery)\n• Database-first and code-first approaches\n\nData is the new oil - master its storage and retrieval! 📊",
        motivation: "Your database skills determine your app's scalability. Build strong foundations - skyscrapers need solid ground! 🏗️"
      };
    }

    // Cloud and AWS
    if (message.includes('cloud') || message.includes('aws') || message.includes('deployment')) {
      return {
        response: "☁️ CLOUD COMPUTING - AWS CERTIFIED HUSTLER:\n\n🎓 My AWS Certifications:\n• Cloud Basics Foundation\n• Core Services Specialist\n\n🚀 Essential AWS Services:\n• EC2: Virtual servers on demand\n• S3: Scalable storage solutions\n• RDS: Managed database services\n• Lambda: Serverless computing\n• CloudFront: Global content delivery\n\n💡 Why Cloud Matters:\n• Infinite scalability\n• Pay-as-you-grow model\n• Global reach instantly\n• Enterprise-level security\n\nCloud skills = High-paying opportunities! I leverage AWS for all my production apps. 💰",
        motivation: "The cloud isn't just technology - it's your ticket to building applications that scale from 1 to 1 million users! 🌍"
      };
    }

    // Freelancing and Business
    if (message.includes('freelance') || message.includes('business') || message.includes('startup') || message.includes('money')) {
      return {
        response: "💰 FREELANCE TO EMPIRE BLUEPRINT:\n\n🎯 Start Freelancing Smart:\n• Build portfolio on GitHub (like mine: github.com/casbyhexer)\n• Upwork/Fiverr for initial clients\n• Network through LinkedIn\n• Deliver MORE than promised\n\n🚀 Scale to Agency:\n• Hire other developers\n• Focus on sales and strategy\n• Build recurring client relationships\n• Create productized services\n\n👑 My Journey:\n• High school: Graphic design client work\n• College: NSRI app development\n• Current: CDO at Terrock Technologies\n• Future: Tech empire building!\n\nFrom side hustle to main hustle - that's the way! 📈",
        motivation: "Your skills are your currency! Every project you complete is a deposit in your success bank account! 💎"
      };
    }

    // Learning and Education
    if (message.includes('learn') || message.includes('study') || message.includes('education') || message.includes('university')) {
      return {
        response: "📚 EDUCATION HUSTLER STRATEGY:\n\n🎓 My Academic Foundation:\n• BCAD at IIE Varsity College (2022-2024)\n• Work Integrated Learning with NSRI\n• Continuous certifications (AWS, etc.)\n\n💡 Learning Optimization:\n• Theory + Practice simultaneously\n• Build projects while studying\n• Contribute to open source\n• Network with classmates/professors\n\n🔥 Beyond Formal Education:\n• YouTube/Udemy courses\n• Tech blogs and documentation\n• Conference talks and webinars\n• Peer learning and code reviews\n\nEducation never stops - adapt or get left behind! 🚀",
        motivation: "Your degree opens doors, but your skills build empires! Stay curious, stay hungry, stay learning! 🧠⚡"
      };
    }

    // Motivation and Mindset
    if (message.includes('motivation') || message.includes('inspiration') || message.includes('mindset') || message.includes('success')) {
      return {
        response: "🔥 HUSTLER MINDSET ACTIVATION:\n\n💪 My Personal Formula:\n• Ambitious vision + Daily execution\n• Creativity meets disciplined work\n• Leadership through serving others\n• Innovation over imitation\n\n🎯 Success Principles:\n• Embrace the grind - comfort kills dreams\n• Build while others sleep\n• Network like your future depends on it\n• Fail fast, learn faster\n• Technology + Business = Wealth\n\n🏆 Athletic Mindset:\n• Train consistently\n• Compete with yesterday's self\n• Push through when it hurts\n• Champions are made in practice\n\nFrom relentless improvement! 📈",
        motivation: "Success isn't a destination - it's a daily choice to show up, level up, and never give up! You're not just coding, you're crafting your destiny! 👑🔥"
      };
    }

    // Project Management and Leadership
    if (message.includes('project management') || message.includes('leadership') || message.includes('team')) {
      return {
        response: "👑 LEADERSHIP & PROJECT MASTERY:\n\n🎯 My Project Experience:\n• NSRI Drowning Prevention App (Team Lead)\n• AutoFixer Development \n• GitHub Repository Management\n• Client Consultation and Delivery\n\n💼 Leadership Principles:\n• Lead by example, not by title\n• Clear communication = Project success\n• Agile methodology for flexibility\n• Risk management and contingency planning\n\n⚡ Tools I Master:\n• Agile/Scrum frameworks\n• Git version control\n• Project timeline management\n• Stakeholder communication\n• Quality assurance processes\n\nFrom team player to team leader - that's the evolution! 🚀",
        motivation: "Great leaders aren't born - they're forged through challenges, failures, and the courage to try again! Lead your projects like you lead your life! 💪"
      };
    }

    // Default motivational response
    return {
      response: "🤔 Interesting question, hustler! While I may not have specific info on that topic, I can help you with:\n\n💻 Technical Skills: Java, C#, React Native, ASP.NET, databases\n🚀 Career Development: From beginner to tech entrepreneur\n💰 Freelancing & Business: Building your tech empire\n☁️ Cloud Computing: AWS and deployment strategies\n📱 Mobile Development: Native and cross-platform\n🎯 Project Management: Leading tech teams\n💪 Hustler Mindset: Motivation and success strategies\n\nWhat specific area interests you most? Let's dive deep and get you to the next level! 🔥",
      motivation: "Every expert was once a beginner who never gave up! Your question shows you're thinking - that's the first step to greatness! 💎"
    };
  };

const handlePayPalPayment = async () => {
  try {
    const supported = await Linking.canOpenURL(PAYPAL_URL);
    
    if (supported) {
      await Linking.openURL(PAYPAL_URL);
      setShowUpgradeModal(false);
      
      // Add pending notification immediately
      addPremiumPendingNotification('paypal');
      
      setTimeout(() => {
        Alert.alert(
          "Payment Confirmation",
          "Have you completed your PayPal payment?",
          [
            { text: "Not Yet", style: "cancel" },
            { 
              text: "Yes, I Paid!", 
              onPress: () => {
                // Add payment received notification
                addPaymentReceivedNotification('paypal');
                
                // Activate premium
                setIsPremium(true);
                setQuestionCount(0);
                
                // Add premium activated notification
                addPremiumActivatedNotification('paypal');
                
                Alert.alert(
                  "🎉 Welcome to Premium!", 
                  "You now have unlimited access to HEX HUSTLER AI! Check your notifications for more details.",
                  [{ text: "Let's Hustle!", style: "default" }]
                );
              }
            }
          ]
        );
      }, 3000);
    } else {
      Alert.alert("Error", "Unable to open PayPal link. Please try again.");
    }
  } catch (err) {
    console.error('PayPal payment error:', err);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};

const handleEmailProof = async () => {
  try {
    const subject = "EFT Payment Proof - HEX HUSTLER AI Premium";
    const body = "Hi,\n\nI have made an EFT payment for HEX HUSTLER AI Premium subscription.\n\nPayment Details:\n- Amount: R350\n- Reference: HEX HUSTLERS (Pty) Ltd\n- Date: [Please add payment date]\n\nPlease find attached proof of payment.\n\nThank you!";
    const emailUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const supported = await Linking.canOpenURL(emailUrl);
    
    if (supported) {
      await Linking.openURL(emailUrl);
      setShowUpgradeModal(false);
      
      // Add pending notification for EFT
      addPremiumPendingNotification('eft');
      
      setTimeout(() => {
        Alert.alert(
          "Email Opened",
          "Please attach your EFT proof of payment and send the email. We'll send you a notification when your premium account is activated (within 24 hours).",
          [{ text: "OK", style: "default" }]
        );
      }, 1000);
    } else {
      Alert.alert("Error", "Unable to open email client. Please manually send proof to cashexerbusiness@gmail.com");
    }
  } catch (err) {
    console.error('Email proof error:', err);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};

// Add this helper function to simulate EFT payment verification (for testing)
/*const simulateEftVerification = () => {
  // This would normally be triggered by your backend when payment is verified
  setTimeout(() => {
    addPaymentReceivedNotification('eft');
    
    setTimeout(() => {
      setIsPremium(true);
      setQuestionCount(0);
      addPremiumActivatedNotification('eft');
      
      Alert.alert(
        "🎉 Premium Activated!",
        "Your EFT payment has been verified and your premium account is now active!",
        [{ text: "Awesome!", style: "default" }]
      );
    }, 2000);
  }, 10000); // Simulate 10 second verification process
};*/

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    if (!isPremium && questionCount >= 5) {
      setShowUpgradeModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...currentSession.messages, userMessage];
    setCurrentSession(prev => ({ ...prev, messages: updatedMessages }));
    setInputText('');
    setIsTyping(true);
    setQuestionCount(prev => prev + 1);

    Animated.loop(
      Animated.sequence([
        Animated.timing(typingAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(typingAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ])
    ).start();

    setTimeout(() => {
      const hustlerResponse = getHustlerResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: hustlerResponse.response + "\n\n💡 " + hustlerResponse.motivation,
        isUser: false,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setCurrentSession(prev => ({ ...prev, messages: finalMessages }));
      setIsTyping(false);
      typingAnim.stopAnimation();
    }, 2000);
  };

  const startNewChat = () => {
    if (currentSession.messages.length > 1) {
      const savedChat = {
        ...currentSession,
        title: currentSession.messages[1]?.text.split(' ').slice(0, 4).join(' ') + '...' || 'Chat',
      };
      setSavedChats(prev => [savedChat, ...prev]);
    }

    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [{
        id: '1',
        text: "💪 Ready for another round, tech warrior? Let's keep building your empire! What's your next challenge? 🚀",
        isUser: false,
        timestamp: new Date(),
      }],
      createdAt: new Date(),
    };

    setCurrentSession(newSession);
    setQuestionCount(0);
  };

  const loadSavedChat = (chat: ChatSession) => {
    setCurrentSession(chat);
    setShowChatHistory(false);
    setQuestionCount(chat.messages.filter(m => m.isUser).length);
  };

  const deleteChatHistory = () => {
    Alert.alert(
      "Delete Chat History",
      "Are you sure you want to delete all saved chats?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete All", 
          style: "destructive",
          onPress: () => {
            setSavedChats([]);
            Alert.alert("Success", "Chat history deleted!");
          }
        }
      ]
    );
  };

  const deleteSingleChat = (chatId: string) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [currentSession.messages, isTyping]);

  const renderMessage = (message: Message) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.botMessage
    ]}>
      {!message.isUser && (
        <View style={styles.botIcon}>
          {Platform.OS === 'web' ? (
            <MdOutlineSmartToy color="#00f0ff" size={20} />
          ) : (
            <MaterialCommunityIcons name="robot" size={20} color="#00f0ff" />
          )}
        </View>
      )}
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.botText
        ]}>
          {message.text}
        </Text>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

const renderQuickActions = () => {
    const actions = [
      "Tell me about your skills",
      "Career advice for developers",
      "Mobile app development tips",
      "Freelance guidance",
      "Motivational boost!"
    ];
    
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={() => setInputText(action)}
          >
            <Text style={styles.actionText}>{action}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };


  return (
    <ImageBackground
      source={require('../../assets/hexhustlersmedia/black_gradient_blue_1_background_by_mannyt1013_deyc41r-fullview.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowChatHistory(true)}>
            {Platform.OS === 'web' ? (
              <MdOutlineHistory color="#00f0ff" size={24} />
            ) : (
              <MaterialCommunityIcons name="history" size={24} color="#00f0ff" />
            )}
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>HEX HUSTLER$ AI</Text>
            <Text style={styles.headerSubtitle}>
              {isPremium ? "💎 PREMIUM" : `${5 - questionCount} questions left`}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              onPress={() => router.push('/notifications')}
              style={styles.notificationButton}
            >
              {Platform.OS === 'web' ? (
                <IoIosNotifications color="#00f0ff" size={24} />
              ) : (
                <Ionicons name="notifications" size={24} color="#00f0ff" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={startNewChat}>
              {Platform.OS === 'web' ? (
                <MdAddCircleOutline color="#00f0ff" size={24} />
              ) : (
                <MaterialCommunityIcons name="plus-circle" size={24} color="#00f0ff" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Messages */}
        <KeyboardAvoidingView 
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {currentSession.messages.map(renderMessage)}
            
            {isTyping && (
              <View style={styles.typingContainer}>
                <View style={styles.botIcon}>
                  {Platform.OS === 'web' ? (
                    <MdOutlineSmartToy color="#00f0ff" size={20} />
                  ) : (
                    <MaterialCommunityIcons name="robot" size={20} color="#00f0ff" />
                  )}
                </View>
                <View style={styles.typingBubble}>
                  <Animated.View style={[styles.typingDots, { opacity: typingAnim }]}>
                    <Text style={styles.typingText}>Thinking like a hustler...</Text>
                  </Animated.View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Quick Actions */}
          {renderQuickActions()}

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask the AI hustler anything..."
              placeholderTextColor="#666"
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              {Platform.OS === 'web' ? (
                <IoIosSend color={inputText.trim() ? '#000' : '#666'} size={20} />
              ) : (
                <Ionicons name="send" size={20} color={inputText.trim() ? "#000" : "#666"} />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* Upgrade Modal */}
        <Modal visible={showUpgradeModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.upgradeModal}>
              <Text style={styles.modalTitle}>🚀 Upgrade to Premium</Text>
              <Text style={styles.modalText}>
                You have used your 5 free questions! Choose your payment method:
              </Text>
              
              <View style={styles.premiumFeatures}>
                <Text style={styles.featureText}>✨ Unlimited questions</Text>
                <Text style={styles.featureText}>⚡ Priority responses</Text>
                <Text style={styles.featureText}>🎯 Advanced guidance</Text>
                <Text style={styles.featureText}>💰 Exclusive strategies</Text>
              </View>
              
              <Text style={styles.priceText}>R350 / $19.99 monthly</Text>
              
              <View style={styles.paymentSection}>
                <View style={styles.bankingSection}>
            <Text style={styles.bankingSectionTitle}>EFT Banking Details</Text>
            <Text style={styles.bankingDetails}>• Bank: Nedbank</Text>
            <Text style={styles.bankingDetails}>• Account Number: 1211596699</Text>
            <Text style={styles.bankingDetails}>• Account Type: Current Account</Text>
            <Text style={styles.bankingDetails}>• Reference: HEX HUSTLERS (Pty) Ltd</Text>
            <Text style={styles.bankingDetails}>• Swift Code: NEDSZAJJ</Text>
                </View>

                <TouchableOpacity style={styles.eftButton} onPress={handleEmailProof}>
                  {Platform.OS === 'web' ? (
                    <MdOutlineEmail color="#fff" size={20} />
                  ) : (
                    <MaterialCommunityIcons name="email" size={20} color="#fff" />
                  )}
                  <Text style={styles.paymentButtonText}>Send EFT Proof</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>OR</Text>
                
                <TouchableOpacity style={styles.paypalButton} onPress={handlePayPalPayment}>
                  {Platform.OS === 'web' ? (
                    <IoLogoPaypal color="#fff" size={20} />
                  ) : (
                    <Ionicons name="logo-paypal" size={20} color="#fff" />
                  )}
                  <Text style={styles.paymentButtonText}>Pay with PayPal</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowUpgradeModal(false)}
              >
                <Text style={styles.closeButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Chat History Modal */}
        <Modal visible={showChatHistory} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.historyModal}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Chat History</Text>
                <View style={styles.historyActions}>
                  <TouchableOpacity onPress={deleteChatHistory} style={styles.deleteAllButton}>
                    {Platform.OS === 'web' ? (
                      <MdOutlineDeleteSweep color="#ff4444" size={20} />
                    ) : (
                      <MaterialCommunityIcons name="delete-sweep" size={20} color="#ff4444" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowChatHistory(false)}>
                    {Platform.OS === 'web' ? (
                      <MdOutlineClose color="#00f0ff" size={24} />
                    ) : (
                      <MaterialCommunityIcons name="close" size={24} color="#00f0ff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
              <ScrollView style={styles.historyList}>
                {savedChats.map((chat) => (
                  <View key={chat.id} style={styles.historyItemContainer}>
                    <TouchableOpacity
                      style={styles.historyItem}
                      onPress={() => loadSavedChat(chat)}
                    >
                      <Text style={styles.historyItemTitle}>{chat.title}</Text>
                      <Text style={styles.historyItemDate}>
                        {chat.createdAt.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteSingleChat(chat.id)}
                    >
                      {Platform.OS === 'web' ? (
                        <MdOutlineDelete color="#ff4444" size={18} />
                      ) : (
                        <MaterialCommunityIcons name="delete" size={18} color="#ff4444" />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
                {savedChats.length === 0 && (
                  <Text style={styles.noHistoryText}>No saved chats yet</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#00f0ff',
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  headerSubtitle: { fontSize: 12, color: '#00f0ff', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notificationButton: { marginRight: 15 },
  chatContainer: { flex: 1 },
  messagesContainer: { flex: 1, paddingHorizontal: 15 },
  messagesContent: { paddingTop: 15, paddingBottom: 20 },
  messageContainer: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-end' },
  userMessage: { justifyContent: 'flex-end' },
  botMessage: { justifyContent: 'flex-start' },
  botIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: { maxWidth: width * 0.75, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 18 },
  userBubble: { backgroundColor: '#00f0ff', borderBottomRightRadius: 5 },
  botBubble: { backgroundColor: 'rgba(0,0,0,0.8)', borderWidth: 1, borderColor: '#00f0ff', borderBottomLeftRadius: 5 },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#000', fontWeight: '500' },
  botText: { color: '#ffffff' },
  timestamp: { fontSize: 10, color: '#999', marginTop: 5, textAlign: 'right' },
  typingContainer: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 },
  typingBubble: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderWidth: 1,
    borderColor: '#00f0ff',
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  typingDots: { justifyContent: 'center', alignItems: 'center' },
  typingText: { color: '#00f0ff', fontSize: 14, fontStyle: 'italic' },
  // Updated Actions Container - minimal space above input
  actionsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'transparent',
    maxHeight: 30,
  },
  actionsScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderWidth: 0.5,
    borderColor: '#00f0ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  actionText: {
    color: '#00f0ff',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#00f0ff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  sendButtonDisabled: { backgroundColor: 'rgba(0,240,255,0.3)', elevation: 0 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  upgradeModal: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    borderWidth: 2,
    borderColor: '#00f0ff',
    borderRadius: 20,
    margin: 10,
    padding: 15,
    alignItems: 'center',
    width: width * 0.95,
    maxHeight: height * 0.9,
    alignSelf: 'center',
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#00f0ff', marginBottom: 15, textAlign: 'center' },
  modalText: { fontSize: 16, color: '#ffffff', textAlign: 'center', marginBottom: 20, lineHeight: 24 },
  premiumFeatures: { width: '100%', marginBottom: 20 },
  featureText: { fontSize: 16, color: '#ffffff', marginBottom: 8, paddingLeft: 10 },
  priceText: { fontSize: 22, fontWeight: 'bold', color: '#00f0ff', marginBottom: 25 },
  paymentSection: { width: '100%', marginBottom: 20 },
  bankingSection: { backgroundColor: 'rgba(0,240,255,0.1)', borderRadius: 10, padding: 15, marginBottom: 15 },
  bankingSectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#00f0ff', marginBottom: 10 },
  bankingDetails: { fontSize: 14, color: '#ffffff', marginBottom: 5 },
  eftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 10,
  },
  orText: { fontSize: 16, color: '#ffffff', textAlign: 'center', marginVertical: 10 },
  paypalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0070ba',
    borderRadius: 25,
    paddingVertical: 12,
  },
  paymentButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  closeButtonText: { color: '#666', fontSize: 16, fontWeight: '600' },
  historyModal: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    borderWidth: 2,
    borderColor: '#00f0ff',
    borderRadius: 20,
    margin: 20,
    maxHeight: height * 0.7,
    width: width * 0.9,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#00f0ff',
  },
  historyTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  historyActions: { flexDirection: 'row', alignItems: 'center' },
  deleteAllButton: { marginRight: 15 },
  historyList: { flex: 1, paddingHorizontal: 20 },
  historyItemContainer: { flexDirection: 'row', alignItems: 'center' },
  historyItem: {
    flex: 1,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,240,255,0.2)',
  },
  historyItemTitle: { fontSize: 16, color: '#ffffff', fontWeight: '500', marginBottom: 4 },
  historyItemDate: { fontSize: 12, color: '#00f0ff' },
  deleteButton: { padding: 10 },
  noHistoryText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 50, fontStyle: 'italic' },
});

export default HexHustlerChatBot;