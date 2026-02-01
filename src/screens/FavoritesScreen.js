import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem('favorites');
    setFavorites(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    Alert.alert('Removed', 'Recipe removed from favorites');
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
        <Text style={styles.header}>❤️ Favorites</Text>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>

              <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash" size={22} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    flex: 1,
  },
});
