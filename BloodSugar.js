import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BloodSugar = () => {
  const route = useRoute();
  const { id, P_Id, name, mail } = route.params; // Access passed params
  const [newValues, setNewValues] = useState({
    beforeFood: '',
    afterFood: ''
  });
  const [recentData, setRecentData] = useState({
    beforeFood: '',
    afterFood: '',
    date: ''
  });
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fetch recent data when component mounts
    fetchRecentData();
  }, []);

  const handleNewChange = (name, value) => {
    setNewValues({ ...newValues, [name]: value });
  };

  const handleSubmit = async () => {
    // Prepare data to send
    const data = {
      P_Id: P_Id,
      beforefood: newValues.beforeFood,
      afterfood: newValues.afterFood,
      date: date.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
    };

    try {
      // Send POST request to PHP endpoint
      const response = await fetch('http://192.168.206.1/demo/bs.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response:', responseData);

      // Optionally, you can perform additional logic based on the response
      if (responseData.success) {
        // Update recent data state after successful submission
        setRecentData({
          beforeFood: data.beforefood,
          afterFood: data.afterfood,
          date: data.date
        });

        // Clear input fields
        setNewValues({ beforeFood: '', afterFood: '' });

        Alert.alert('Success', 'New record added successfully.');
      } else {
        console.error('Server Error:', responseData.message);
        Alert.alert('Error', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Failed to submit data. Please try again later.');
    }
  };

  const fetchRecentData = async () => {
    try {
      // Fetch recent data from server
      const response = await fetch(`http://192.168.206.1/demo/bs1.php?P_Id=${P_Id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Recent Data:', responseData);

      // Update recent data state
      setRecentData({
        beforeFood: responseData.beforefood,
        afterFood: responseData.afterfood,
        date: responseData.date
      });
    } catch (error) {
      console.error('Error fetching recent data:', error.message);
      Alert.alert('Error', 'Failed to fetch recent data. Please try again later.');
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display Passed Params */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>ID: {id}</Text>
        <Text style={styles.profileText}>Name: {name}</Text>
        <Text style={styles.profileText}>Email: {mail}</Text>
        <Text style={styles.profileText}>Patient ID: {P_Id}</Text>
      </View>

      {/* Display Recent Values */}
      <View style={styles.recentDataContainer}>
        <Text style={styles.recentDataLabel}>Recent Values:</Text>
        <Text style={styles.recentDataText}>Date: {recentData.date}</Text>
        <Text style={styles.recentDataText}>Before Food: {recentData.beforeFood}</Text>
        <Text style={styles.recentDataText}>After Food: {recentData.afterFood}</Text>
      </View>

      {/* Section Title for Adding New Values */}
      <Text style={styles.sectionTitle}>Add New Values</Text>

      {/* Form for Adding New Values */}
      <View style={styles.formGroup}>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>Before Food:</Text>
            <TextInput
              style={styles.input}
              value={newValues.beforeFood}
              onChangeText={(value) => handleNewChange('beforeFood', value)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>After Food:</Text>
            <TextInput
              style={styles.input}
              value={newValues.afterFood}
              onChangeText={(value) => handleNewChange('afterFood', value)}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* Date Picker */}
        <View style={styles.datePickerContainer}>
          <Button onPress={showDatePicker} title="Pick Date" />
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  recentDataContainer: {
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  recentDataLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  recentDataText: {
    fontSize: 16,
    color: '#555',
  },
  formGroup: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginRight: 10,
  },
  subLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  datePickerContainer: {
    marginTop: 20,
  },
  dateText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50', // Changed to green color
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BloodSugar;
