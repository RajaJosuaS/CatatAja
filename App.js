import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppProvider } from './AppContext';
import HomeScreen from './screens/HomeScreen';
import CreateNoteScreen from './screens/CreateNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Bookmarks') {
                iconName = 'bookmark';
              } else if (route.name === 'CreateNote') {
                iconName = 'add-circle';
              } else if (route.name === 'Search') {
                iconName = 'search';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            tabStyle: {
              justifyContent: 'center',
            },
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
          <Tab.Screen name="CreateNote" component={CreateNoteScreen} options={{ tabBarButton: CustomTabBarButton }} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="EditNote" component={EditNoteScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'blue' }}>{children}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default App;