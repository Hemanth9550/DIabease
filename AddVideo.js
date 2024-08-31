import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const getMimeType = (uri) => {
  const extension = uri.split('.').pop();
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'avi':
      return 'video/x-msvideo';
    case 'mkv':
      return 'video/x-matroska';
    default:
      return 'video/mp4'; // default MIME type if none match
  }
};

export default function AddVideoScreen({ route, navigation }) {
  const [video, setVideo] = useState(null);
  const [introduction, setIntroduction] = useState('');
  const { doctorId } = route.params; // Extract doctorId from route params

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0 && result.assets[0].uri) {
        setVideo(result.assets[0].uri);
      } else {
        console.log('Video selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const uploadVideo = async () => {
    if (!introduction || !video) {
      Alert.alert('Missing information', 'Please fill out all the fields and select a video.');
      return;
    }

    try {
      const formData = new FormData();

      if (video) {
        const uri = video;
        const type = getMimeType(uri);
        const name = uri.split('/').pop();

        formData.append('video_file', {
          uri,
          type,
          name,
        });
      }

      formData.append('doctorId', doctorId); // Include doctorId in the form data
      formData.append('introduction', introduction);

      const response = await fetch('http://192.168.206.1/demo/updatevideo.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Video uploaded successfully.');
        setVideo(null);
        setIntroduction('');
        // Navigate to the video screen
        navigation.navigate('Video', { doctorId });
      } else {
        Alert.alert('Error', `Failed to upload video: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Error', 'Failed to upload video.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Add Video</Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.videoPickerContainer} onPress={pickVideo}>
          {video ? (
            <Video
              source={{ uri: video }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="videocam" size={width * 0.5} color="#CCCCCC" />
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Introduction:</Text>
          <TextInput
            style={styles.input}
            value={introduction}
            onChangeText={text => setIntroduction(text)}
          />
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={uploadVideo}>
          <Text style={styles.uploadButtonText}>Upload Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: '#6EBFF9',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 90,
    width: '100%',
    marginTop: -165,
  },
  backIcon: {
    marginRight: 20,
    top: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    color: 'white', // Make the text color white
  },
  contentContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginTop: 50,
  },
  videoPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6EBFF9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginVertical: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#6EBFF9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
