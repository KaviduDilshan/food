import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlannerScreen from '../screens/PlannerScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.openDrawer ? navigation.openDrawer() : console.log('Menu pressed')} 
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={30} color="#2E7D32" />
            </TouchableOpacity>
          ),
          
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Profile')} 
              style={styles.profileButton}
            >
              <Ionicons name="person-circle" size={40} color="#2E7D32" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Recipes"
        component={RecipeListScreen}
        options={{ title: 'Recipes' }}
      />

      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />

      <Stack.Screen
        name="Planner"
        component={PlannerScreen}
        options={{ title: 'Planner'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    padding: 5,
    marginRight: 10,
  },
  menuButton: {
    padding: 5,
    marginLeft: 10,
  },
});
