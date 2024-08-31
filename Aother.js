import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Aother() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Fruits</Text>

        {/* Dummy Component for Spacing */}
        <View style={{ width: 24 }} />
      </View>

      {/* Main Image */}
      <View style={[styles.imageContainer, { marginTop: 20 }]}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/29/41/f4/2941f409b0c07493d27780bc04a7a6ea.jpg",
          }}
          style={styles.image}
        />
      </View>

      {/* Box Below Image */}
      <ScrollView contentContainerStyle={styles.boxContainer}>
        <Text style={styles.boxText}>Fruits Good for Diabetic People:</Text>
        <Text style={styles.fruitList}>- Berries (e.g., strawberries, blueberries, raspberries)</Text>
        <Text style={styles.fruitList}>- Apples</Text>
        <Text style={styles.fruitList}>- Oranges</Text>
        <Text style={styles.fruitList}>- Kiwi</Text>
        <Text style={styles.fruitList}>- Pears</Text>
        <Text style={styles.fruitList}>- Cherries</Text>
        <Text style={styles.fruitList}>- Apricots</Text>
        <Text style={styles.fruitList}>- Peaches</Text>
        <Text style={styles.fruitList}>- Plums</Text>
        <Text style={styles.fruitList}>- Grapefruit</Text>
        <Text style={styles.fruitList}>- Avocado</Text>
        <Text style={styles.fruitList}>- Guava</Text>
        <Text style={styles.fruitList}>- Papaya</Text>
        <Text style={styles.fruitList}>- Mango</Text>
        <Text style={styles.fruitList}>- Watermelon</Text>
        <Text style={styles.fruitList}>- Cantaloupe</Text>
        <Text style={styles.fruitList}>- Honeydew</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#6EBFF9",
    paddingVertical: 50,
    paddingHorizontal: 50,
    paddingBottom: 20,
    paddingTop: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    marginLeft: -20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  boxContainer: {
    padding: 20,
    alignItems: "center",
  },
  boxText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fruitList: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Aother;