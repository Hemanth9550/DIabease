import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Previous = ({ route }) => {
  const { P_Id } = route.params;
  const [patientDetails, setPatientDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://192.168.206.1/demo/prev.php?P_Id=${P_Id}`);
      const data = await response.json();
      if (data.status === 'success') {
        setPatientDetails(data.patientDetails);
      } else {
        console.error('Failed to fetch patient details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (patientDetails.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/your-background-image-url' }} // Replace with your background image URL
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={width * 0.07} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Patient Details</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          {patientDetails.map((detail, index) => (
            <View key={index} style={styles.detailContainer}>
              <Text style={styles.text}>Patient ID: {detail.P_Id}</Text>
              <Text style={styles.text}>Height: {detail.height}</Text>
              <Text style={styles.text}>Weight: {detail.weight}</Text>
              <Text style={styles.text}>Waist Circumference: {detail.waistCircumference}</Text>
              <Text style={styles.text}>Hip Circumference: {detail.hipCircumference}</Text>
              <Text style={styles.text}>WHR: {detail.whr}</Text>
              <Text style={styles.text}>BMI: {detail.bmi}</Text>
              <Text style={styles.text}>Before Food: {detail.beforeFood}</Text>
              <Text style={styles.text}>After Food: {detail.afterFood}</Text>
              <Text style={styles.text}>SR Urea: {detail.srUrea}</Text>
              <Text style={styles.text}>SR Creatine: {detail.srCreatine}</Text>
              <Text style={styles.text}>Hba1c: {detail.hba1c}</Text>
              <Text style={styles.text}>Date: {detail.date}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.1,
    paddingTop: height * 0.02,
  },
  backButton: {
    marginRight: width * 0.03,
    padding: width * 0.04,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: width * 0.2,
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    paddingVertical: height * 0.02,
  },
  detailContainer: {
    marginBottom: height * 0.02,
    padding: width * 0.05,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center', // Added textAlign to center the text
  },
});

export default Previous;
