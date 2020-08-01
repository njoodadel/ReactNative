import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Login from '../screens/Auth/Login'
import Signup from '../screens/Auth/Signup'
import { createStackNavigator } from 'react-navigation-stack'

import { Button } from 'react-native-elements'
const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'

    }
)

export default AuthNavigation
