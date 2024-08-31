import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {

  const handleDoctorPress = () => {
    navigation.navigate('DoctorLogin');
  };

  const handlePatientPress = () => {
    navigation.navigate('PatientLogin');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Choose Your Category</Text>
      <View style={styles.logoContainer}>
        
        {/* Doctor Section */}
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8815/8815112.png' }} 
            style={styles.logo}zz
          />
          <TouchableOpacity style={styles.button} onPress={handleDoctorPress}>
            <Text style={styles.buttonText}>Doctor</Text>
          </TouchableOpacity>
        </View>
        
        {/* Patient Section */}
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mUMqEUdel0RsaAmnp-l7hXMbagns98LlEA&usqp=CAU' }} 
            style={styles.logo}
          />
          <TouchableOpacity style={styles.button} onPress={handlePatientPress}>
            <Text style={styles.buttonText}>Patient</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.1, // Adjust padding based on screen height
  },
  welcomeText: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02, // Adjust margin based on screen height
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: height * 0.01, // Adjust margin based on screen height
  },
  logo: {
    width: width * 0.3, // Adjust width based on screen size
    height: width * 0.3, // Adjust height to keep the image square
    marginVertical: height * 0.02, // Adjust margin based on screen height
  },
  button: {
    backgroundColor: '#6EBFF9',
    paddingVertical: height * 0.02, // Adjust padding based on screen height
    paddingHorizontal: width * 0.1, // Adjust padding based on screen width
    marginVertical: height * 0.01, // Adjust margin based on screen height
    borderRadius: width * 0.05, // Adjust border radius based on screen width
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.04, // Adjust font size based on screen width
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
