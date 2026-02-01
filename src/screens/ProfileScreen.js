import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadUserData();
    loadFavorites();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      
      if (name) setUserName(name);
      if (email) setUserEmail(email);
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem('favorites');
      setFavorites(data ? JSON.parse(data) : []);
    } catch (error) {
      console.log('Error loading favorites:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      Alert.alert('Success', 'Logged out successfully');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <LinearGradient
      colors={['#1e7423', '#37d63f', '#e0ec34']}
      style={styles.gradientContainer}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle" size={80} color="#ffffff" />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </View>

        {/* User Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={20} color="#2E7D32" />
            <Text style={styles.infoText}>{userName || 'Not provided'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#2E7D32" />
            <Text style={styles.infoText}>{userEmail || 'Not provided'}</Text>
          </View>
        </View>

        {/* Favorites Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Favorite Recipes ({favorites.length})</Text>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.favoriteItem}>
                  <Ionicons name="heart" size={16} color="#e74c3c" />
                  <Text style={styles.favoriteText}>{item.name}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noFavoritesText}>No favorite recipes yet</Text>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  favoriteText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  noFavoritesText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
