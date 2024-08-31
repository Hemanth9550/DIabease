import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Diabetes = () => {
    const navigation = useNavigation();
    
    const handleGetStarted = () => {
        navigation.navigate('WelcomeScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.diabetes}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1mGSHFNQVmK-bu7V6P1a2pFlLZNTR2R3og&usqp=CAU' }}
                    style={styles.image}
                />
                <View style={styles.ellipse} />
                <View style={styles.ellipse2} />
                <Text style={styles.diabetesText}>Diabetes and Exercise</Text>
                <Text style={styles.findRoutineText}>Find Your Daily Routine</Text>
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    diabetes: {
        width: width * 0.95, // Adjust width based on screen size
        height: height * 0.95, // Adjust height based on screen size
        borderRadius: 35,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    ellipse: {
        width: width * 0.6, // Adjust width based on screen size
        height: height * 0.25, // Adjust height based on screen size
        backgroundColor: '#6EBFF9',
        position: 'absolute',
        top: -40,
        left: -59,
        borderRadius: (width * 0.6) / 2, // Adjust borderRadius based on screen size
    },
    ellipse2: {
        width: width * 0.58, // Adjust width based on screen size
        height: height * 0.24, // Adjust height based on screen size
        backgroundColor: '#6EBFF9',
        position: 'absolute',
        top: height * 0.8, // Adjust position based on screen size
        left: width * 0.55, // Adjust position based on screen size
        borderRadius: (width * 0.58) / 2, // Adjust borderRadius based on screen size
    },
    image: {
        width: width * 0.5, // Adjust width based on screen size
        height: width * 0.5, // Adjust height to keep the image square
        marginBottom: height * 0.05, // Adjust margin based on screen size
    },
    diabetesText: {
        fontWeight: '700',
        fontSize: width * 0.08, // Adjust font size based on screen size
        lineHeight: width * 0.1, // Adjust line height based on screen size
        color: '#000000',
        position: 'absolute',
        top: height * 0.45, // Adjust position based on screen size
    },
    findRoutineText: {
        fontWeight: '400',
        fontSize: width * 0.05, // Adjust font size based on screen size
        lineHeight: width * 0.06, // Adjust line height based on screen size
        color: '#000000',
        position: 'absolute',
        top: height * 0.53, // Adjust position based on screen size
    },
    button: {
        width: width * 0.35, // Adjust width based on screen size
        height: height * 0.07, // Adjust height based on screen size
        backgroundColor: '#6EBFF9',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.15, // Adjust margin based on screen size
    },
    buttonText: {
        fontWeight: '500',
        fontSize: width * 0.06, // Adjust font size based on screen size
        lineHeight: width * 0.1, // Adjust line height based on screen size
        color: '#FFFFFF',
    },
});

export default Diabetes;
