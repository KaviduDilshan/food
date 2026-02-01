import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedName = await AsyncStorage.getItem('userName');
    const storedEmail = await AsyncStorage.getItem('userEmail');

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  };

  const saveChanges = async () => {
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userEmail', email);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const logoutUser = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
        <Text style={styles.btnText}>Save Changes</Text>
      </TouchableOpacity>

      {/* 🔴 LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logoutUser}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutBtn: {
    backgroundColor: '#D32F2F',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
