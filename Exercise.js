import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Button, Image } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for gradient background

const { width, height } = Dimensions.get('window');

const Exercise = ({ route }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { doctorId } = route.params;
  const videoRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://192.168.206.1/demo/fetch_videosp.php', {
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

  const renderVideoItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <View style={styles.placeholderContainer}>
        <Ionicons name="play-circle-outline" size={64} color="#4CAF50" />
        <Text style={styles.exerciseText}>Exercise {index + 1}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleVideoPress(item)}>
          <Text style={styles.buttonText}>View Exercise</Text>
        </TouchableOpacity>
      </View>
      {selectedVideo === item.video_path && (
        <View style={styles.videoInfoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: item.video_path }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            shouldPlay
            isLooping
            onError={(error) => handleVideoError(error)}
            onPlaybackStatusUpdate={(status) => handlePlaybackStatusUpdate(status, item)}
          />
          <View style={styles.textContainer}>
            <Text style={styles.fileNameText}>File Name: {item.filename}</Text>
            <Text style={styles.introText}>Introduction: {item.introduction}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const handleVideoError = (error) => {
    console.error('Video loading error:', error);
    alert('There was an error loading the video. Please try again later.');
  };

  const handlePlaybackStatusUpdate = (status, item) => {
    // Handle playback status updates here if needed
  };

  const handleVideoPress = (item) => {
    setSelectedVideo(item.video_path);
  };

  return (
    <LinearGradient colors={['#e0f7fa', '#80deea']} style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Add padding to the container
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color for each video container
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    overflow: 'hidden',
  },
  placeholderContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9', // Light green background for the placeholder
    borderRadius: 10,
    marginBottom: 10,
  },
  videoInfoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  video: {
    width: width * 0.8,
    height: height * 0.45,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
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
  exerciseText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Exercise;
