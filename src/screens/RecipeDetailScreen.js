import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;

  const addToFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem('favorites');
      let favorites = data ? JSON.parse(data) : [];

      // ✅ prevent duplicates
      const exists = favorites.find(item => item.id === recipe.id);
      if (exists) {
        Alert.alert('Info', 'Already in favorites ❤️');
        return;
      }

      favorites.push(recipe);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

      Alert.alert('Success', 'Added to Favorites ❤️');
    } catch (error) {
      Alert.alert('Error', 'Failed to add favorite');
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
        {recipe.image && (
          <View style={styles.imageContainer}>
            <Image
              source={recipe.image}
              style={styles.recipeImage}
              onError={() => console.log('Image failed to load')}
            />
          </View>
        )}
        
        <Text style={styles.title}>{recipe.name}</Text>

        {/* Ingredients Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ingredients</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index} style={styles.cardText}>• {item}</Text>
          ))}
        </View>

        {/* Steps Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Steps</Text>
          {recipe.steps.map((step, index) => (
            <Text key={index} style={styles.cardText}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

      <TouchableOpacity style={styles.favButton} onPress={addToFavorites}>
        <Text style={styles.favText}>❤️ Add to Favorites</Text>
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
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  cardText: {
    fontSize: 13,
    marginBottom: 6,
    color: '#333333',
    lineHeight: 22,
  },
  favButton: {
    backgroundColor: '#26b485',
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  favText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
