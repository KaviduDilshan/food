import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const registerUser = async () => {
    console.log('Register clicked not rederict login page with alrt');

    if (!name || !email || !password || !confirmPassword) {
      console.log('Validation failed: Empty fields');
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      console.log('Validation failed: Invalid email');
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    if (password.length < 6) {
      console.log('Validation failed: Short password');
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Validation failed: Password mismatch');
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      console.log('Saving to AsyncStorage...');
      await AsyncStorage.multiSet([
        ['userName', name],
        ['userEmail', email],
        ['userPassword', password],
        ['isLoggedIn', 'false'],
      ]);

      console.log('Data saved successfully, showing alert...');
      
      // Simple navigation without alert for now
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      console.log('Navigating to login...');
      navigation.replace('Login');
      
    } catch (error) {
      console.log('Error saving data:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  return (
    <LinearGradient
      colors={['#e0ec34', '#37d63f', '#1e7423']}
      style={styles.gradientContainer}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.iconContainer}>
          <Ionicons name="person-add" size={80} color="#ffffff" />
        </View>
        <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* ✅ WORKING BUTTON */}
      <Pressable style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#26b485',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
