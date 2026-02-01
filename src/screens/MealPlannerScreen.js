import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function MealPlannerScreen() {
  const [meal, setMeal] = useState('');

  const saveMeal = async () => {
    if (!meal) {
      Alert.alert('Error', 'Please enter a meal');
      return;
    }
    await AsyncStorage.setItem('todayMeal', meal);
    Alert.alert('Success', 'Meal saved');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today’s Meal 🍽️</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter meal name"
        onChangeText={setMeal}
      />

      <TouchableOpacity style={styles.button} onPress={saveMeal}>
        <Text style={styles.buttonText}>Save Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#bbc1bb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
