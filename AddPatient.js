import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function AddPatient() {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctorId } = route.params; // Extract doctorId from route parameters

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    occupation: '',
    typeOfWorker: '',
    annualIncome: '',
    phoneNumber: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image picker result:', result);
  
      if (!result.cancelled && result.assets.length > 0) {
        setPatient({ ...patient, image: result.assets[0].uri });
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (
        !patient.name.trim() ||
        !patient.phoneNumber.trim() ||
        !patient.age.trim() ||
        !patient.gender.trim() ||
        !patient.address.trim() ||
        !patient.password.trim() ||
        !patient.confirmPassword.trim()
      ) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      if (patient.password !== patient.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
  
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(patient.phoneNumber)) {
        Alert.alert('Error', 'Please enter a valid phone number.');
        return;
      }

      const formData = new FormData();
      formData.append('name', patient.name);
      formData.append('age', patient.age);
      formData.append('gender', patient.gender);
      formData.append('address', patient.address);
      formData.append('occupation', patient.occupation);
      formData.append('typeOfWorker', patient.typeOfWorker);
      formData.append('annualIncome', patient.annualIncome);
      formData.append('phoneNumber', patient.phoneNumber);
      formData.append('email', patient.email);
      formData.append('loginId', patient.loginId);
      formData.append('password', patient.password);
      formData.append('confirmPassword', patient.confirmPassword);
      formData.append('doctorId', doctorId);
      if (patient.image) {
        formData.append('image', {
          uri: patient.image,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      console.log('Form Data:', formData);

      const response = await fetch('http://192.168.206.1/demo/patientdetails.php', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (response.ok) {
        setPatient({
          name: '',
          age: '',
          gender: '',
          address: '',
          occupation: '',
          typeOfWorker: '',
          annualIncome: '',
          phoneNumber: '',
          email: '',
          loginId: '',
          password: '',
          confirmPassword: '',
          image: null,
        });
        console.log('Form submitted successfully.');
        Alert.alert('Success', 'Patient added successfully!');
      } else {
        console.error('Form submission failed:', responseData.message);
        Alert.alert('Error', 'Failed to add patient. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').width * 0.08} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.doctorText}>Patient Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {patient.image ? (
            <Image source={{ uri: patient.image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload image</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setPatient({ ...patient, name: text })}
          value={patient.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setPatient({ ...patient, phoneNumber: numericText });
          }}
          value={patient.phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => setPatient({ ...patient, age: text })}
          value={patient.age}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(text) => setPatient({ ...patient, gender: text })}
          value={patient.gender}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(text) => setPatient({ ...patient, address: text })}
          value={patient.address}
        />
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          onChangeText={(text) => setPatient({ ...patient, occupation: text })}
          value={patient.occupation}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={patient.typeOfWorker}
            style={styles.picker}
            onValueChange={(itemValue) => setPatient({ ...patient, typeOfWorker: itemValue })}
          >
            <Picker.Item label="Select Type of Worker" value="" />
            <Picker.Item label="Mild Worker" value="Mild Worker" />
            <Picker.Item label="Moderate Worker" value="Moderate Worker" />
            <Picker.Item label="Heavy Worker" value="Heavy Worker" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Annual Income"
          onChangeText={(text) => setPatient({ ...patient, annualIncome: text })}
          value={patient.annualIncome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setPatient({ ...patient, email: text })}
          value={patient.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Login ID"
          onChangeText={(text) => setPatient({ ...patient, loginId: text })}
          value={patient.loginId}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPatient({ ...patient, password: text })}
          secureTextEntry={true}
          value={patient.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setPatient({ ...patient, confirmPassword: text })}
          secureTextEntry={true}
          value={patient.confirmPassword}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.12,
    backgroundColor: '#6EBFF9',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  doctorText: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: '700',
    color: '#FFFFFF',
    bottom: Dimensions.get('window').height * 0.03,
    left: Dimensions.get('window').height * -0.07,
  },
  uploadText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#000000',
    bottom: Dimensions.get('window').height * 0.038,
    left: Dimensions.get('window').height * 0.0,
  },
  backArrowContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.055,
    left: Dimensions.get('window').width * 0.04,
    zIndex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * 0.1,
    paddingBottom: 20,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
    alignSelf: 'center',
    top: Dimensions.get('window').height * -0.05,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABACC',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').height * 0.013,
    bottom: Dimensions.get('window').height * -0.02,
    alignSelf: 'center',
    justifyContent: 'center', // Center text vertically
  },
  pickerContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABACC',
    backgroundColor: '#FFFFFF',
    marginBottom: Dimensions.get('window').height * 0.013,
    justifyContent: 'center',
    bottom: Dimensions.get('window').height * -0.02,
    alignSelf: 'center',
  },
  picker: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
  },
  submitButton: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: '#6EBFF9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.03,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
