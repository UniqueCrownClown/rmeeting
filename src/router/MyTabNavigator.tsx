import Main from '../view/main/Main';
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import Toe from './../view/toe/Toe'
export const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Main,
      // navigationOptions: ({ navigation }) => ({
      //   tabBarLabel: '首页',
      //   headerTitle: '首页',
      //   tabBarIcon: ({ tintColor, focused }) => (<Icon name={focused ? 'ios-home' : 'ios-home-outline'} size={26} color={tintColor} />)
      // })
    },
    Test: {
      screen: Main,
      navigationOptions: {
        tabBarLabel: '测试',
        headerTitle: '测试',
      }
    },
    Other: {
      screen: Toe,
      navigationOptions: {
        tabBarLabel: '其他',
        headerTitle: '其他'
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName = '';
        if (routeName === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home';
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Test') {
          iconName = focused ? 'ios-options' : 'ios-options';
        } else {
          iconName = `ios-cloud${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#137BFE',
      inactiveTintColor: 'gray',
    },
  });