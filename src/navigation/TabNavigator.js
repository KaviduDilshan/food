import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import HomeStackNavigator from './HomeStackNavigator';
import FavoritesScreen from '../screens/FavoritesScreen';
import PlannerScreen from '../screens/PlannerScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
       headerShown: false,
       tabBarActiveTintColor: '#014636', // Color for active tab
       tabBarInactiveTintColor: '#748c94', // Color for inactive tabs
      tabBarStyle: {
         backgroundColor: '#f2f2f2', // Background color of tab bar
      },
  }}>

      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Planner"
        component={PlannerScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Meal Planner',
          
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeTab')}
              style={{ marginLeft: 15, marginRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24}  />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Favorites',
          
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeTab')}
              style={{ marginLeft: 15, marginRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24}  />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        })}
      />

    </Tab.Navigator>
  );
}
