import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const VideoListScreen = ({ route, navigation }) => {
  const [videos, setVideos] = useState([]);
  const { doctorId } = route.params;

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://192.168.206.1/demo/fetch_videos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId }),
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data.data); // Assuming 'data.data' contains the array of videos
      } else {
        console.error('Failed to fetch videos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const confirmDelete = (filename) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this video?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteVideo(filename),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteVideo = async (filename) => {
    try {
      const response = await fetch('http://192.168.206.1/demo/delete_video.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        if (responseData.success) {
          Alert.alert('Success', 'Video deleted successfully.');
          setVideos(videos.filter(video => video.filename !== filename)); // Remove the deleted video from the state
        } else {
          Alert.alert('Error', responseData.message || 'Failed to delete video.');
        }
      } else {
        console.error('Failed to delete video:', response.status);
        Alert.alert('Error', 'Failed to delete video.');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      Alert.alert('Error', 'Failed to delete video.');
    }
  };

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <View style={styles.videoInfoContainer}>
        <Video
          source={{ uri: item.video_url }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay={false}
          isLooping={true}
          onError={(error) => handleVideoError(error)}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.filename)}>
          <Ionicons name="trash" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.fileNameText}>File Name: {item.filename}</Text>
        <Text style={styles.introText}>Introduction: {item.introduction}</Text>
      </View>
    </View>
  );

  const handleVideoError = (error) => {
    console.error('Video loading error:', error);
    Alert.alert('Error', 'There was an error loading the video. Please try again later.');
  };

  const handleAddVideo = () => {
    navigation.navigate('AddVideo', { doctorId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.filename} // Use filename or another unique identifier
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddVideo}>
        <Ionicons name="add-circle-outline" size={32} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add Video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  videoInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
    position: 'relative',
  },
  video: {
    width: width * 0.7,
    height: height * 0.45,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  introText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  fileNameText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#FF4C4C',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6EBFF9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
});

export default VideoListScreen;
