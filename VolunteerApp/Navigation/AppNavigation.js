import * as React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Tabs/Home'
import ProfileScreen from '../screens/Tabs/Profile'
import EventScreen from '../screens/Tabs/Events'
import MessagesScreen from '../screens/Tabs/Messages'

const Tab = createBottomTabNavigator();

export default function index({ navigation }) {
    return (
        <NavigationContainer>
            {console.log(navigation.getParam('userInfo'))}
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Events') {
                            iconName = focused ? 'calendar-month' : 'calendar-month-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'account' : 'account-outline';
                        } else if (route.name === 'Messages') {
                            iconName = focused ? 'message-text' : 'message-text-outline';
                        }
                        size = focused ? 30 : 26

                        // You can return any component that you like here!
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#512B58',
                    inactiveTintColor: '#FE346E',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Events" component={EventScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Messages" component={MessagesScreen} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}
