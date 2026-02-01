import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const weekPlan = [
  { day: 'Monday', meal: 'Rice & Chicken Curry' },
  { day: 'Tuesday', meal: 'String Hoppers & Dhal' },
  { day: 'Wednesday', meal: 'Rice & Fish Ambul Thiyal' },
  { day: 'Thursday', meal: 'Hoppers & Lunu Miris' },
  { day: 'Friday', meal: 'Rice & Polos Curry' },
  { day: 'Saturday', meal: 'Fried Rice' },
  { day: 'Sunday', meal: 'Milk Rice & Curry' },
];

export default function PlannerScreen() {
  return (
    <LinearGradient
      colors={['#1e7423', '#37d63f', '#e0ec34']}
      style={styles.gradientContainer}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>📅 Weekly Meal Planner</Text>
        {/* <Text style={styles.header}>📅Weekly Meal Planner</Text> */}

        <FlatList
          data={weekPlan}
          keyExtractor={(item) => item.day}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.meal}>{item.meal}</Text>
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
    fontSize: 25,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  day: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  meal: {
    fontSize: 16,
    color: '#666',
  },
});
