import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RemovePatientConfirmation = ({ visible, onConfirm, onCancel }) => {
  if (!visible) return null;

  const handleConfirm = () => {
    onConfirm(); // Call the onConfirm function passed from the parent component
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Are you sure you want to remove this patient?</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  confirmButton: {
    backgroundColor: '#6EBFF9',
  },
  cancelButton: {
    backgroundColor: '#FF5733',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RemovePatientConfirmation;