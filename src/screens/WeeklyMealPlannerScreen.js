import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default function WeeklyMealPlannerScreen() {
  const [meals, setMeals] = useState({});

  const savePlan = async () => {
    await AsyncStorage.setItem('weeklyPlan', JSON.stringify(meals));
    Alert.alert('Success', 'Weekly meal plan saved');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Meal Planner</Text>

      {days.map(day => (
        <TextInput
          key={day}
          placeholder={`${day} meal`}
          style={styles.input}
          onChangeText={text => setMeals({ ...meals, [day]: text })}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={savePlan}>
        <Text style={styles.buttonText}>Save Weekly Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20
    ,backgroundColor: '#bbc1bb',
   },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
