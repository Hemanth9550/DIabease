import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const defaultImageUri = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const EditDoctorScreen = ({ route, navigation }) => {
  const { doctorId, imageUri: initialImageUri } = route.params;
  const [doctorname, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUri, setImageUri] = useState(initialImageUri || '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`http://192.168.206.1/demo/doctoredit1.php?doctorId=${doctorId}`);
      const data = await response.json();
      setName(data.doctorname || '');
      setPhoneNumber(data.phoneno || '');
      setEmail(data.email || '');
      setGender(data.gender || '');
      setAge(data.age || '');
      setExperience(data.experience || '');
      setSpecialization(data.specialization || '');
      setPassword(data.password || '');
      // Note: confirm password is not retrieved as it is not stored in the database
      if (data.image) {
        setImageUri(data.image);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setErrorMessage('Failed to fetch doctor details.');
    }
  };

  const handleSave = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('Error: Passwords do not match');
        return;
      }
  
      setErrorMessage('');
      const formData = new FormData();
      formData.append('doctorId', doctorId);
      formData.append('password', password);
      formData.append('doctorname', doctorname);
      formData.append('phoneno', phoneNumber);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('experience', experience);
      formData.append('specialization', specialization);
      if (imageUri) {
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
  
      const response = await fetch('http://192.168.206.1/demo/doctoredit.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const responseData = await response.text();
      console.log('Response from server:', responseData);
  
      if (response.ok) {
        navigation.navigate('Docmenu', { doctorId });
      } else {
        console.error('Error updating doctor details:', responseData);
        setErrorMessage('Error: An unexpected error occurred');
      }
    } catch (error) {
      console.error('Error updating doctor details:', error);
      setErrorMessage('Error: An unexpected error occurred');
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Edit Doctor Profile</Text>
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image
            source={imageUri ? { uri: imageUri } : { uri: defaultImageUri }}
            style={styles.image}
            defaultSource={{ uri: defaultImageUri }} // Provide defaultSource to ensure fallback for loading errors
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={doctorname}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Experience"
          value={experience}
          onChangeText={setExperience}
        />
        <TextInput
          style={styles.input}
          placeholder="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 100,
    padding: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default EditDoctorScreen;
