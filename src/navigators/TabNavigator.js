import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import FindTalentsScreen from '../screens/FindTalentsScreen';
import ActivityStreamStack from './ActivityStreamStack';
import fontelloConfig from '../config.json';
import CastingCallsStack from './CastingCallsStack';
import MarketPlaceStack from './MarketPlaceStack';
import TrendingStack from './TrendingStack';
import FindTalentsStack from './FindTalentsStack';

const Customon = createIconSetFromFontello(fontelloConfig);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = Customon;
  let iconName;
  if (routeName === 'CastingCallsStack') {
    iconName = `casting-calls${focused ? '-selected' : '-unselected'}`;
  } else if (routeName === 'MarketPlace') {
    iconName = `marketplace${focused ? '-selected' : '-unselected'}`;
  } else if (routeName === 'FindTalentsStack') {
    iconName = `find-talents${focused ? '-selected' : '-unselected'}`;
  } else if (routeName === 'TrendingScreen') {
    iconName = `discovery${focused ? '-selected' : '-unselected'}`;
  } else if (routeName === 'ActivityStream') {
    iconName = `home${focused ? '-selected' : '-unselected'}`;
  }
  return <IconComponent name={iconName} size={30} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator(
  {
    ActivityStream: {
      screen: ActivityStreamStack
    },
    TrendingScreen: { screen: TrendingStack },
    CastingCallsStack: { screen: CastingCallsStack },
    FindTalentsStack: { screen: FindTalentsStack },
    MarketPlace: { screen: MarketPlaceStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      showLabel: false
    }
    // initialRouteName: 'CastingCallsStack',
  }
);

// const TabNavigator = createAppContainer(BottomTab);

export default TabNavigator;
