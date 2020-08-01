import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HistoryScreen from '../tabs/HistoryScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SortByScreen from '../tabs/SorbytScreen';
import HomeScreen from '../tabs/HomeScreen';
import SearchResult from '../tabs/SearchResult';
// import MealDetailScreen from '../screens/MealDetailScreen';


// const TabScreen = createMaterialTopTabNavigator(
//     {
//         متاجر: { screen: SearchResult },
//         انستقرام: { screen: SearchResult },
//     },
//     {
//         tabBarPosition: 'top',
//         swipeEnabled: true,
//         animationEnabled: true,
//         tabBarOptions: {
//             activeTintColor: '#58cced',
//             inactiveTintColor: '#F8F8F8',
//             style: {
//                 backgroundColor: '#7851A9',

//             },
//             labelStyle: {
//                 textAlign: 'center',

//             },
//             indicatorStyle: {
//                 borderBottomColor: '#58cced',
//                 borderBottomWidth: 2,
//             },
//         },
//     }
// );

const HomeNavigator = createStackNavigator({
    Home: HomeScreen,
    Result: {
        screen: SearchResult,
    }
    ,


    sort: SortByScreen,

},
    { headerLayoutPreset: 'center' }
);

const HisoryNavigator = createStackNavigator({
    Home: HistoryScreen

}, { headerLayoutPreset: 'center' });

const buttomTab = createBottomTabNavigator(
    {
        //هذا اسم اول تاب و وش الكلاس الي يبي يصير له رندر اذا انضغط
        الرئيسية: { screen: HomeNavigator },
        السجل: { screen: HisoryNavigator },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            keyboardHidesTabBar: true,
            activeBackgroundColor: '#f2f2f2',
            inactiveBackgroundColor: '#f2f2f2',
            activeTintColor: '#633689', //لون الايكون اذا انضغطت
            inactiveTintColor: 'gray',//لونه اذا ما انضغطت
            style: {
                backgroundColor: '#f2f2f2',
                position: "absolute"
            }

        }
    },
);

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    let size2;
    if (routeName === 'الرئيسية') {
        iconName = focused
            ? 'home'
            : 'home-outline';

        size2 = focused
            ? 26
            : 23;
        // We want to add badges to home tab icon
    } else if (routeName === 'السجل') {
        iconName = 'history';//هذي الايكون حقت الهيستوري
        size2 = focused
            ? 26
            : 23;
    }
    return <MaterialCommunityIcons name={iconName} size={size2} color={tintColor} />;
};


export default createAppContainer(buttomTab);
