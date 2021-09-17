import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import ActivityStreamScreen from '../screens/ActivityStreamScreen';
import TrendingScreen from '../screens/TrendingScreen';

export default createBottomTabNavigator({
  ActivityStream: {
    screen: ActivityStreamScreen
  },
  TrendingScreen: {
    screen: TrendingScreen
  }
});
