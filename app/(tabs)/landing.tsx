import { useRouter } from 'expo-router';
import React from 'react';
import {
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

const LandingScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/hexhustlersmedia/black_gradient_blue_1_background_by_mannyt1013_deyc41r-fullview.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topBox}>
            <Text style={styles.welcomeText}>Welcome To</Text>
            <Text style={styles.title}>HEX HUSTLER$</Text>
            <Text style={styles.subtitle}>
              Helping Aspiring Developers, Students & Business Chase Greatness
            </Text>
          </View>

          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../assets/hexhustlersmedia/WhatsApp Image 2025-04-12 at 1.06.19 AM (1).jpeg')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/about')}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: height,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20, // Reduced from 40
  },
  topBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: width * 0.9,
    marginTop: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: '#00f0ff',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  logoContainer: {
    width: width * 0.7,
    height: width * 0.7,
    maxWidth: 350,
    maxHeight: 350, // Limit maximum height
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: '90%',
    height: '90%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: 300, // Limit maximum width
    maxHeight: 300, // Limit maximum height
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default LandingScreen;