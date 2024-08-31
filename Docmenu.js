import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoutConfirmation from './LogoutConfirmation';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const placeholderImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const DocMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctorId, doctorname,email } = route.params || '';

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [doctorImage, setDoctorImage] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: 'Doctor Menu' });
    fetchDoctorImage();
  }, []);

  const fetchDoctorImage = async () => {
    try {
      const response = await fetch(`http://192.168.206.1/demo/fetch_imaged.php?doctorId=${doctorId}`);
      if (response.ok) {
        const imageData = await response.json();
        if (imageData && imageData.image) {
          setDoctorImage(imageData.image);
        } else {
          setDoctorImage(placeholderImage); // Set placeholder image if no image found
          Alert.alert('Error', 'No image found for this doctor.');
        }
      } else {
        console.error('Failed to fetch doctor image');
        Alert.alert('Error', 'Failed to fetch doctor image. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching doctor image:', error);
      Alert.alert('Error', 'Failed to fetch doctor image. Please check your network connection.');
    }
  };

  const handleAddPatient = () => {
    navigation.navigate('AddPatient', { doctorId });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditDoctorScreen', { doctorId, imageUri: doctorImage });
  };

  const handleAddVideo = () => {
    navigation.navigate('AddVideo', { doctorId });
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('DoctorLogin');
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: doctorImage || placeholderImage }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{doctorname}</Text>
          <Text style={styles.name}>{email}</Text>

        </View>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
        <Ionicons name="person" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAddPatient}>
        <Ionicons name="person-add" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Add Patients</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAddVideo}>
        <Ionicons name="videocam" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Add Videos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>

      <LogoutConfirmation
        visible={isLogoutModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.05,
    backgroundColor: '#F1F1F1',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'cover',
    borderRadius: (width * 0.25) / 2,
    marginBottom: height * 0.02,
    borderWidth: 2,
    borderColor: '#6EBFF9',
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.1,
    marginTop: height * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.03,
  },
  icon: {
    marginRight: width * 0.03,
  },
});

export default DocMenu;