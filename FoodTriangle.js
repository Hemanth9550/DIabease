import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const FoodTriangle = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Healthy Eating Food Pyramid</Text>
        <Image
          source={{
            uri: imageError
              ? 'https://via.placeholder.com/360x250.png?text=Image+Not+Available'
              : 'https://www.chp.gov.hk/files/jpg/adult_eng.jpg',
          }}
          style={styles.image}
          resizeMode="cover"
          onError={handleImageError}
        />
        <Text style={styles.sectionHeading}>General Guidelines for All Ages</Text>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="bread-slice" size={20} color="brown" /> Grains
          </Text>
          <Text style={styles.text}>
            Consume 3 to 8 servings daily. {'\n'}
            Examples: 1 bowl of cooked rice or noodles, 2 slices of bread.
          </Text>
        </View>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="leaf" size={20} color="green" /> Vegetables
          </Text>
          <Text style={styles.text}>
            Aim for at least 3 servings daily. {'\n'}
            Examples: 1/2 bowl of cooked vegetables, 1 bowl of raw vegetables.
          </Text>
        </View>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="apple" size={20} color="red" /> Fruits
          </Text>
          <Text style={styles.text}>
            Include at least 2 servings daily. {'\n'}
            Examples: 1 medium-sized apple, 2 small kiwifruits, 1/2 bowl of fruit slices.
          </Text>
        </View>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="fish" size={20} color="blue" /> Meat, Fish, Eggs, and Alternatives
          </Text>
          <Text style={styles.text}>
            Consume 5 to 8 "taels" (approximately 200-320 grams) daily. {'\n'}
            Examples: 4-5 slices of cooked meat, 1 egg, 1/4 block of firm tofu.
          </Text>
        </View>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="cup" size={20} color="orange" /> Milk and Alternatives
          </Text>
          <Text style={styles.text}>
            Have 1-2 servings daily. {'\n'}
            Examples: 1 cup of low-fat milk, 2 slices of low-fat cheese, 1 pot (150g) of low-fat plain yogurt.
          </Text>
        </View>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="oil" size={20} color="purple" /> Fats/Oils, Salt, and Sugar
          </Text>
          <Text style={styles.text}>
            Use sparingly.
          </Text>
        </View>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="water" size={20} color="teal" /> Fluids
          </Text>
          <Text style={styles.text}>
            Drink 6 to 8 glasses daily, including water, tea, clear soups, etc.
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Healthy Eating Food Pyramid for Specific Age Groups</Text>
        
        <Text style={styles.subHeading}>Children (Aged 2-5 years):</Text>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="bread-slice" size={20} color="brown" /> Grains
          </Text>
          <Text style={styles.text}>
            1.5 - 3 servings {'\n'}
            <MaterialCommunityIcons name="leaf" size={20} color="green" /> Vegetables: at least 1.5 servings {'\n'}
            <MaterialCommunityIcons name="apple" size={20} color="red" /> Fruits: at least 1 serving {'\n'}
            <MaterialCommunityIcons name="fish" size={20} color="blue" /> Meat, Fish, Eggs, and Alternatives: 1.5 - 3 taels {'\n'}
            <MaterialCommunityIcons name="cup" size={20} color="orange" /> Milk and Alternatives: 2 servings {'\n'}
            <MaterialCommunityIcons name="water" size={20} color="teal" /> Fluids: 4 - 5 glasses
          </Text>
        </View>

        <Text style={styles.subHeading}>Children (Aged 6-11 years):</Text>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="bread-slice" size={20} color="brown" /> Grains
          </Text>
          <Text style={styles.text}>
            3 - 4 servings {'\n'}
            <MaterialCommunityIcons name="leaf" size={20} color="green" /> Vegetables: approximately 2 servings {'\n'}
            <MaterialCommunityIcons name="apple" size={20} color="red" /> Fruits: at least 2 servings {'\n'}
            <MaterialCommunityIcons name="fish" size={20} color="blue" /> Meat, Fish, Eggs, and Alternatives: 3 - 5 taels {'\n'}
            <MaterialCommunityIcons name="cup" size={20} color="orange" /> Milk and Alternatives: 2 servings {'\n'}
            <MaterialCommunityIcons name="water" size={20} color="teal" /> Fluids: 6 - 8 glasses
          </Text>
        </View>

        <Text style={styles.subHeading}>Teens (Aged 12-17 years):</Text>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="bread-slice" size={20} color="brown" /> Grains
          </Text>
          <Text style={styles.text}>
            4 - 6 servings {'\n'}
            <MaterialCommunityIcons name="leaf" size={20} color="green" /> Vegetables: at least 3 servings {'\n'}
            <MaterialCommunityIcons name="apple" size={20} color="red" /> Fruits: at least 2 servings {'\n'}
            <MaterialCommunityIcons name="fish" size={20} color="blue" /> Meat, Fish, Eggs, and Alternatives: 4 - 6 taels {'\n'}
            <MaterialCommunityIcons name="cup" size={20} color="orange" /> Milk and Alternatives: 2 servings {'\n'}
            <MaterialCommunityIcons name="water" size={20} color="teal" /> Fluids: 6 - 8 glasses
          </Text>
        </View>

        <Text style={styles.subHeading}>Adults:</Text>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="bread-slice" size={20} color="brown" /> Grains
          </Text>
          <Text style={styles.text}>
            3 - 8 servings {'\n'}
            <MaterialCommunityIcons name="leaf" size={20} color="green" /> Vegetables: approximately 3 servings {'\n'}
            <MaterialCommunityIcons name="apple" size={20} color="red" /> Fruits: at least 2 servings {'\n'}
            <MaterialCommunityIcons name="fish" size={20} color="blue" /> Meat, Fish, Eggs, and Alternatives: 5 - 8 taels {'\n'}
            <MaterialCommunityIcons name="cup" size={20} color="orange" /> Milk and Alternatives: 1 - 2 servings {'\n'}
            <MaterialCommunityIcons name="water" size={20} color="teal" /> Fluids: 6 - 8 glasses
          </Text>
        </View>

        <Text style={styles.subHeading}>Older Adults:</Text>
        <View style={styles.foodItem}>
          <Text style={styles.foodHeading}>
            <MaterialCommunityIcons name="bread-slice" size={20} color="brown" /> Grains
          </Text>
          <Text style={styles.text}>
            3 - 5 servings {'\n'}
            <MaterialCommunityIcons name="leaf" size={20} color="green" /> Vegetables: approximately 3 servings {'\n'}
            <MaterialCommunityIcons name="apple" size={20} color="red" /> Fruits: at least 2 servings {'\n'}
            <MaterialCommunityIcons name="fish" size={20} color="blue" /> Meat, Fish, Eggs, and Alternatives: 5 - 6 taels {'\n'}
            <MaterialCommunityIcons name="cup" size={20} color="orange" /> Milk and Alternatives: 1 - 2 servings {'\n'}
            <MaterialCommunityIcons name="water" size={20} color="teal" /> Fluids: 6 - 8 glasses
          </Text>
        </View>

        <Text style={styles.notes}>
          Notes: {'\n'}
          1 "tael" is approximately 40 grams (of raw meat). {'\n'}
          1 bowl is approximately 250-300ml. {'\n'}
          1 cup is approximately 240ml. {'\n'}
          These guidelines are intended for healthy individuals. Those with chronic diseases or specific nutritional needs should consult their doctors or dietitians for personalized dietary recommendations.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  notes: {
    fontSize: 17,
    color: '#000',
    marginVertical: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    marginVertical: 10,
    borderRadius: 10,
  },
  foodItem: {
    marginBottom: 20,
    width: '100%',  // Ensures the food item takes the full width
  },
  foodHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default FoodTriangle;
