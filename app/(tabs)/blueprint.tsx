import { Ionicons } from '@expo/vector-icons';
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
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const BlueprintScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const freeContentScrollViewRef = useRef(null);
  
  // Form states for rich and wealthy versions
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  
  // Free blueprint active section
  const [activeSection, setActiveSection] = useState(0);
  
  // Page titles for the indicator
  const pageNames = ['Pricing', 'Free Version', 'Rich Version', 'Wealthy Version'];

  useEffect(() => {
    // Initial fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(pageIndex);
  };

  const navigateToPage = (pageIndex) => {
    scrollViewRef.current?.scrollTo({
      x: pageIndex * width,
      animated: true
    });
    setCurrentPage(pageIndex);
  };

  // Blueprint content sections for navigation
  const blueprintSections = [
    "Introduction",
    "Planning Your Project",
    "Technology Choices",
    "Implementation",
    "Security Fundamentals",
    "Code Samples",
    "Conclusion & Bonus"
  ];

  // Navigate to specific blueprint section
  const navigateToSection = (sectionIndex) => {
    setActiveSection(sectionIndex);
    
    // Add some delay to make sure the section has been rendered
    setTimeout(() => {
      freeContentScrollViewRef.current?.scrollTo({
        y: sectionIndex * 200, // Approximate scrolling position
        animated: true
      });
    }, 100);
  };

  // Free blueprint code samples
  const codeExamples = {
    authentication: `// C# Basic User Authentication
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        // Validate credentials
        var user = await _userManager.FindByEmailAsync(model.Email);
        
        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            return Unauthorized(new { message = "Invalid credentials" });
            
        // Generate JWT token
        var token = _jwtService.GenerateToken(user);
        
        return Ok(new { token });
    }
}`,
    databaseConnection: `// C# Database Connection Example
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) 
        : base(options) { }
    
    public DbSet<Donor> Donors { get; set; }
    public DbSet<Bike> Bikes { get; set; }
    public DbSet<Donation> Donations { get; set; }
    public DbSet<Volunteer> Volunteers { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define relationships between entities
        modelBuilder.Entity<Donation>()
            .HasOne(d => d.Donor)
            .WithMany(d => d.Donations)
            .HasForeignKey(d => d.DonorId);
    }
}`,
    apiIntegration: `// C# API Integration Example
[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly ILocationService _locationService;
    
    public LocationController(ILocationService locationService)
    {
        _locationService = locationService;
    }
    
    [HttpPost("{userId}/track")]
    public async Task<IActionResult> TrackLocation(string userId, LocationModel model)
    {
        // Process the location data
        await _locationService.SaveUserLocation(userId, model);
        
        return Ok(new { 
            message = "Location received",
            data = new { 
                latitude = model.Latitude,
                longitude = model.Longitude 
            }
        });
    }
    
    [HttpGet("{userId}/location")]
    public async Task<IActionResult> GetLocation(string userId)
    {
        var location = await _locationService.GetUserLocation(userId);
        
        if (location == null)
            return NotFound();
            
        return Ok(location);
    }
}`
  };

  // Blueprint pricing cards
  const blueprintOptions = [
    {
      title: '"Code Your Success: Developer\'s Blueprint" Free Version',
      price: 'FREE',
      description: 'Accessible entry point for individuals, students & small businesses',
      buttonText: 'VIEW FREE',
      action: () => navigateToPage(1)
    },
    {
      title: '"Code Your Success: Developer\'s Blueprint" Rich Version',
      price: 'R525 / $29',
      description: 'Level up for entrepreneurs, developers & businesses',
      buttonText: 'GET RICH',
      action: () => navigateToPage(2)
    },
    {
      title: '"Code Your Success: Developer\'s Blueprint" Wealthy Version',
      price: 'R900 / $49 monthly',
      description: 'Includes 30-minute monthly consultation call and additional templates',
      buttonText: 'GET WEALTHY',
      action: () => navigateToPage(3)
    }
  ];

  // Free blueprint content
  const freeBlueprintContent = [
    {
      title: 'INTRODUCTION',
      content: 'Welcome to your roadmap for software development success! This guide distills my years of experience into practical steps anyone can follow.',
    },
    {
      title: 'PART 1: PLANNING YOUR PROJECT',
      content: 'Worksheet: Define Your Software Needs',
      subsections: [
        'What problem are you solving?',
        'Who are your users?',
        'What are your must-have features?',
        'What is your budget and timeline?'
      ],
      extraContent: [
        {
          subtitle: 'Project Type Selection Guide',
          items: [
            '✅ Mobile App: Best for on-the-go users and location-based services',
            '✅ Web Application: Best for complex functionality and desktop users',
            '✅ Website: Best for information sharing and basic online presence'
          ]
        }
      ]
    },
    {
      title: 'PART 2: TECHNOLOGY CHOICES MADE SIMPLE',
      content: 'Choosing Your Tech Stack',
      subsections: [
        'Design: Figma/WordPress - Fast prototyping, low cost.',
        'Custom Business: React Native + Node.js - Scalable and flexible.',
        'Mobile Apps: React Native works on iOS and Android'
      ],
      extraContent: [
        {
          subtitle: 'The 5 Questions to Ask Before Choosing Technology',
          items: [
            'How quickly do you need to launch?',
            'What\'s your maintenance budget?',
            'Do you need mobile functionality?',
            'How much customization do you need?',
            'Will you need to integrate with other systems?'
          ]
        }
      ]
    },
    {
      title: 'PART 3: IMPLEMENTATION CHECKLIST',
      content: 'Getting Started Checklist',
      subsections: [
        'Create wireframes for your core screens in Figma/WordPress',
        'Set up project management tool',
        'Define minimum viable product (MVP)',
        'Establish testing criteria',
        'Plan your launch strategy'
      ],
    },
    {
      title: 'PART 4: SECURITY FUNDAMENTALS',
      content: 'The 5 Security Must-Haves',
      subsections: [
        'Secure user authentication',
        'Data encryption',
        'Regular backups',
        'Permission controls',
        'Security testing'
      ],
      extraContent: [
        {
          subtitle: 'Common Security Pitfalls',
          items: [
            'Weak password policies',
            'Unsecured API endpoints',
            'Lack of input validation',
            'Outdated dependencies',
            'Insecure data storage'
          ]
        }
      ]
    },
    {
      title: 'PART 5: CODE SAMPLES',
      content: 'Essential code examples to get you started:',
      codeExamples: true
    },
    {
      title: 'CONCLUSION & BONUS',
      content: 'Remember: Great software isn\'t just about code—it\'s about solving real problems for real people. Ready to build something amazing? Contact Hex Hustlers for personalized development support!',
      extraContent: [
        {
          subtitle: 'PROJECT ESTIMATION CALCULATOR',
          items: [
            '[Simple formula to estimate project costs and timeline]',
            'Basic Cost = (Features × Complexity Factor × Hourly Rate)',
            'Timeline = (Features × Complexity Factor) / Team Size'
          ]
        }
      ]
    }
  ];

  // Page indicator component
  const renderPageIndicator = () => {
    return (
      <View style={styles.pageIndicatorContainer}>
        {pageNames.map((name, index) => (
          <TouchableOpacity 
            key={`indicator-${index}`} 
            onPress={() => navigateToPage(index)}
            style={[
              styles.pageIndicator,
              currentPage === index && styles.pageIndicatorActive
            ]}
          >
            <Text 
              style={[
                styles.pageIndicatorText,
                currentPage === index && styles.pageIndicatorTextActive
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render the header with logo and menu button
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image
          source={require('../../assets/hexhustlersmedia/WhatsApp Image 2025-04-12 at 1.06.19 AM (1).jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => router.push('/')}>
          <View style={styles.menuButton}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Render pricing plans page
  const renderPricingPage = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Developer's Blueprint</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.pageSubtitle}>Choose your success path</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.pricingScrollContainer}>
          <View style={styles.cardsContainer}>
            {blueprintOptions.map((option, index) => (
              <Animated.View 
                key={`option-${index}`}
                style={[
                  styles.blueprintCard,
                  {
                    opacity: fadeAnim,
                    transform: [{ 
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20 * (index + 1), 0]
                      })
                    }]
                  }
                ]}
              >
                <Text style={styles.blueprintTitle}>{option.title}</Text>
                <Text style={styles.blueprintPrice}>{option.price}</Text>
                <Text style={styles.blueprintDescription}>• {option.description}</Text>
                <TouchableOpacity 
                  style={styles.blueprintButton}
                  onPress={option.action}
                >
                  <Text style={styles.blueprintButtonText}>{option.buttonText}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/services')}
          >
            <Ionicons name="arrow-back" size={20} color="#ffffff" style={styles.backIcon} />
            <Text style={styles.backText}>BACK TO SERVICES</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  // Render section navigator for free blueprint
  const renderSectionNavigator = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sectionNavigatorContainer}
      >
        {blueprintSections.map((section, index) => (
          <TouchableOpacity
            key={`section-${index}`}
            style={[
              styles.sectionButton,
              activeSection === index && styles.activeSectionButton
            ]}
            onPress={() => navigateToSection(index)}
          >
            <Text 
              style={[
                styles.sectionButtonText,
                activeSection === index && styles.activeSectionButtonText
              ]}
            >
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // Render code sample component
  const renderCodeSample = (title, code) => {
    return (
      <View style={styles.codeSampleContainer}>
        <Text style={styles.codeSampleTitle}>{title}</Text>
        <View style={styles.codeBlock}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.codeText}>{code}</Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  // Render free version page
  const renderFreePage = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>FREE BLUEPRINT:</Text>
          <Text style={styles.pageSubtitle}>"Code Your Success Developer's Guide"</Text>
          <Text style={styles.authorText}>By: Luwano Casby Mhango, Hex Hustlers</Text>
          <View style={styles.titleUnderline} />
        </View>
        
        {renderSectionNavigator()}
        
        <ScrollView 
          ref={freeContentScrollViewRef}
          contentContainerStyle={styles.freeScrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {freeBlueprintContent.map((section, index) => (
            <View key={`content-${index}`} style={styles.contentSection}>
              <Text style={styles.contentSectionTitle}>{section.title}</Text>
              
              {section.content && (
                <Text style={styles.contentText}>{section.content}</Text>
              )}
              
              {section.subsections && section.subsections.map((subsection, subIndex) => (
                <View key={`subsection-${subIndex}`} style={styles.bulletItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{subsection}</Text>
                </View>
              ))}
              
              {section.extraContent && section.extraContent.map((extra, extraIndex) => (
                <View key={`extra-${extraIndex}`} style={styles.extraContentSection}>
                  <Text style={styles.extraContentTitle}>{extra.subtitle}</Text>
                  {extra.items.map((item, itemIndex) => (
                    <Text key={`item-${itemIndex}`} style={styles.extraContentItem}>{item}</Text>
                  ))}
                </View>
              ))}
              
              {section.codeExamples && (
                <View style={styles.codeExamplesContainer}>
                  {renderCodeSample('Basic User Authentication', codeExamples.authentication)}
                  {renderCodeSample('Database Connection', codeExamples.databaseConnection)}
                  {renderCodeSample('API Integration', codeExamples.apiIntegration)}
                </View>
              )}
              
              <View style={styles.sectionDivider} />
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.backToPlansButton}
            onPress={() => navigateToPage(0)}
          >
            <Text style={styles.backToPlansText}>BACK TO PLANS</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  // Render rich version page
  const renderRichPage = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>RICH BLUEPRINT:</Text>
          <Text style={styles.pageSubtitle}>"R525 / $29 Complete Developer's Guide"</Text>
          <View style={styles.titleUnderline} />
        </View>
        
        <ScrollView contentContainerStyle={styles.formScrollContainer}>
          <View style={styles.formCard}>
            <TextInput
              style={styles.formInput}
              placeholder="Name"
              placeholderTextColor="#00f0ff"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              placeholderTextColor="#00f0ff"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Phone Number"
              placeholderTextColor="#00f0ff"
              value={phone}
              onChangeText={setPhone}
            />
            
            <View style={styles.companySection}>
              <Text style={styles.companySectionTitle}>Company Details</Text>
              <Text style={styles.companyName}>• HEX HUSTLERS [PTY] LTD</Text>
            </View>
            
            <View style={styles.bankingSection}>
              <Text style={styles.bankingSectionTitle}>EFT Banking Details</Text>
              <Text style={styles.bankingDetails}>• Bank: Nedbank</Text>
              <Text style={styles.bankingDetails}>• Account Number: 1211596699</Text>
              <Text style={styles.bankingDetails}>• Account Type: Current Account</Text>
              <Text style={styles.bankingDetails}>• Reference: Hex Hustlers  
              </Text>
            </View>
            
            <View style={styles.proofSection}>
              <Text style={styles.proofTitle}>Upload Proof of Payment</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={24} color="#00f0ff" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.richSubmitButton}>
              <Text style={styles.richSubmitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.backToPlansButton}
            onPress={() => navigateToPage(0)}
          >
            <Text style={styles.backToPlansText}>BACK TO PLANS</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  // Render wealthy version page
  const renderWealthyPage = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>WEALTHY BLUEPRINT:</Text>
          <Text style={styles.pageSubtitle}>"R900 / $49 Month Developer's Membership"</Text>
          <View style={styles.titleUnderline} />
        </View>
        
        <ScrollView contentContainerStyle={styles.formScrollContainer}>
          <View style={styles.formCard}>
            <TextInput
              style={styles.formInput}
              placeholder="Name"
              placeholderTextColor="#00f0ff"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              placeholderTextColor="#00f0ff"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Phone Number"
              placeholderTextColor="#00f0ff"
              value={phone}
              onChangeText={setPhone}
            />
            
            <Text style={styles.paymentTitle}>Payment Method</Text>
            
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>STRIPE</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>PAYPAL</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>HEX HUSTLERS WALLET</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.backToPlansButton}
            onPress={() => navigateToPage(0)}
          >
            <Text style={styles.backToPlansText}>BACK TO PLANS</Text>
          </TouchableOpacity>
        </ScrollView>
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
        
        {renderPageIndicator()}
        
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Pricing Plans Page */}
          <View style={[styles.page, { width }]}>
            {renderPricingPage()}
          </View>
          
          {/* Free Version Page */}
          <View style={[styles.page, { width }]}>
            {renderFreePage()}
          </View>
          
          {/* Rich Version Page */}
          <View style={[styles.page, { width }]}>
            {renderRichPage()}
          </View>
          
          {/* Wealthy Version Page */}
          <View style={[styles.page, { width }]}>
            {renderWealthyPage()}
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
    page: {
      flex: 1,
    },
    pageContainer: {
      flex: 1,
      padding: 10,
    },
    pageIndicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 5,
      paddingHorizontal: 5,
      flexWrap: 'wrap',
    },
    pageIndicator: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 15,
      marginHorizontal: 2,
      marginBottom: 5,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pageIndicatorActive: {
      backgroundColor: 'rgba(0,240,255,0.3)',
      borderWidth: 1,
      borderColor: '#00f0ff',
    },
    pageIndicatorText: {
      color: '#ffffff',
      fontSize: 11,
    },
    pageIndicatorTextActive: {
      color: '#00f0ff',
      fontWeight: 'bold',
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 5,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00f0ff',
      textAlign: 'center',
    },
    pageSubtitle: {
      fontSize: 14,
      color: '#ffffff',
      marginTop: 5,
      textAlign: 'center',
    },
    authorText: {
      fontSize: 12,
      color: '#e0e0e0',
      marginTop: 3,
      fontStyle: 'italic',
    },
    titleUnderline: {
      height: 3,
      width: 80,
      borderRadius: 5,
      backgroundColor: '#00f0ff',
      marginTop: 8,
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
    },
    pricingScrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    cardsContainer: {
      paddingHorizontal: 5,
    },
    blueprintCard: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.3)',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    blueprintTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 5,
      textAlign: 'center',
    },
    blueprintPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 8,
      textAlign: 'center',
    },
    blueprintDescription: {
      fontSize: 14,
      color: '#e0e0e0',
      marginBottom: 12,
      textAlign: 'center',
    },
    blueprintButton: {
      backgroundColor: 'rgba(0,240,255,0.2)',
      borderRadius: 25,
      paddingVertical: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#00f0ff',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
    blueprintButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 14,
    },
    backButton: {
      backgroundColor: 'rgba(0,240,255,0.2)',
      borderRadius: 25,
      paddingVertical: 10,
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#00f0ff',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
    backIcon: {
      marginRight: 8,
    },
    backText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 14,
    },
    sectionNavigatorContainer: {
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    sectionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginHorizontal: 4,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.5)',
    },
    activeSectionButton: {
      backgroundColor: 'rgba(0,240,255,0.3)',
      borderColor: '#00f0ff',
    },
    sectionButtonText: {
      color: '#ffffff',
      fontSize: 12,
    },
    activeSectionButtonText: {
      color: '#00f0ff',
      fontWeight: 'bold',
    },
    freeScrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    contentSection: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginBottom: 5,
    },
    contentSectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 10,
      textShadowColor: 'rgba(0,240,255,0.5)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    contentText: {
      fontSize: 14,
      color: '#ffffff',
      marginBottom: 12,
      lineHeight: 20,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 6,
      paddingLeft: 5,
    },
    bulletPoint: {
      fontSize: 16,
      color: '#00f0ff',
      marginRight: 8,
    },
    bulletText: {
      fontSize: 14,
      color: '#ffffff',
      flex: 1,
    },
    extraContentSection: {
      marginTop: 12,
      marginBottom: 8,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.2)',
    },
    extraContentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 8,
    },
    extraContentItem: {
      fontSize: 13,
      color: '#e0e0e0',
      marginBottom: 5,
      lineHeight: 18,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: 'rgba(0,240,255,0.3)',
      marginVertical: 10,
    },
    backToPlansButton: {
      backgroundColor: 'rgba(0,240,255,0.2)',
      borderRadius: 25,
      paddingVertical: 10,
      alignItems: 'center',
      marginTop: 15,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: '#00f0ff',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
    backToPlansText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 14,
    },
    codeExamplesContainer: {
      marginTop: 12,
    },
    codeSampleContainer: {
      marginBottom: 15,
    },
    codeSampleTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 6,
    },
    codeBlock: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.3)',
      marginBottom: 5,
    },
    codeText: {
      fontFamily: 'monospace',
      fontSize: 12,
      color: '#e0e0e0',
      lineHeight: 18,
    },
    formScrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
      paddingHorizontal: 5,
    },
    formCard: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.3)',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    formInput: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.5)',
      paddingHorizontal: 15,
      paddingVertical: 12,
      color: '#ffffff',
      fontSize: 14,
      marginBottom: 15,
    },
    companySection: {
      marginVertical: 15,
    },
    companySectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 8,
    },
    companyName: {
      fontSize: 14,
      color: '#ffffff',
      marginBottom: 5,
    },
    bankingSection: {
      marginVertical: 15,
    },
    bankingSectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 8,
    },
    bankingDetails: {
      fontSize: 14,
      color: '#ffffff',
      marginBottom: 5,
    },
    proofSection: {
      marginVertical: 15,
      alignItems: 'center',
    },
    proofTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 10,
      textAlign: 'center',
    },
    uploadButton: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: 70,
      height: 70,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.5)',
      marginVertical: 10,
    },
    richSubmitButton: {
      backgroundColor: 'rgba(0,240,255,0.2)',
      borderRadius: 25,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#00f0ff',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
    richSubmitText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    paymentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00f0ff',
      marginBottom: 12,
      marginTop: 10,
      textAlign: 'center',
    },
    paymentButton: {
      backgroundColor: 'rgba(0,240,255,0.2)',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: 'rgba(0,240,255,0.5)',
      shadowColor: '#00f0ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
    },
    paymentButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 14,
    }
  });

export default BlueprintScreen;