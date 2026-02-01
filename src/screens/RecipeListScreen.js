import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { recipes } from '../data/recipes';

export default function RecipeListScreen({ route, navigation }) {
  const { category } = route.params;
  const filtered = recipes.filter(r => r.category === category);

  // Function to get category-related icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Rice & Curry':
        return 'restaurant';
      case 'Breakfast':
        return 'cafe';
      case 'Short Eats':
        return 'fast-food';
      default:
        return 'restaurant-outline';
    }
  };

  return (
    <LinearGradient
      colors={['#1e7423', '#37d63f', '#e0ec34']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              underlayColor="transparent"
              onPress={() =>
                navigation.navigate('RecipeDetail', { recipe: item })
              }
            >
              <View style={styles.iconContainer}>
                <Ionicons name={getCategoryIcon(category)} size={30} color="#2E7D32" />
              </View>
              
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.sub}>Tap to view details</Text>
              </View>
              
              <Ionicons
                name="chevron-forward"
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          )}
        />
      </View>
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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  sub: {
    color: '#666',
    fontSize: 14,
  },
});
