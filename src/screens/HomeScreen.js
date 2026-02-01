import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {

  const categories = [
    { name: 'Rice & Curry', icon: 'restaurant' },
    { name: 'Breakfast', icon: 'cafe' },
    { name: 'Short Eats', icon: 'fast-food' },
  ];

  return (
    <LinearGradient
      colors={['#1e7423', '#37d63f', '#e0ec34']}
      style={styles.gradientContainer}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.headerBox}>
          <Text style={styles.header}>Sri Lankan Recipes 🇱🇰</Text>
          <Text style={styles.headerSub}>
            Discover authentic island flavors
          </Text>
        </View>

        <Text style={styles.sub}>Select a category</Text>

        {categories.map(cat => (
          <TouchableOpacity
            key={cat.name}
            style={styles.card}
            activeOpacity={0.7}
            underlayColor="transparent"
            onPress={() => navigation.navigate('Recipes', { category: cat.name })}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={cat.icon} size={30} color="#2E7D32" />
            </View>

            <Text style={styles.cardText}>{cat.name}</Text>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        ))}

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
  },

  /* HEADER STYLES (small & clean) */
  headerBox: {
    marginBottom: 25,
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  headerSub: {
    marginTop: 6,
    fontSize: 14,
    color: '#F1F8E9',
    fontWeight: '500',
  },

  sub: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* CATEGORY CARD */
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  iconContainer: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },

  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    flex: 1,
  },
});
