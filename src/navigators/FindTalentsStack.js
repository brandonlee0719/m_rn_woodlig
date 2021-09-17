import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import ActivityStreamScreen from '../screens/ActivityStreamScreen';
import AddLocationRoute from '../screens/AddLocationScreen';
import TagPeopleScreen from '../screens/TagPeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';

import ViewCastingCalls from '../components/ViewCastingCalls';
import { CastingCallsScreen } from '../screens/CastingCallsScreen';
import CastingCallDetail from '../screens/CastingCallDetail';
import AddCastingCalls from '../screens/AddCastingCalls';
import ViewApplicants from '../screens/ViewApplicants';
import FilterCastingCalls from '../screens/FilterCastingCalls';

import fontelloConfig from '../config.json';
import EditCastingCall from '../screens/EditCastingCall';
import FindTalentsScreen from '../screens/FindTalentsScreen';

const Customon = createIconSetFromFontello(fontelloConfig);

const { width } = Dimensions.get('window');
const FindTalentsStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    FindTalentsScreen: {
      screen: FindTalentsScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'FindTalentsScreen'
  }
);

// const ActivityStreamStack = createAppContainer(BottomTab);

FindTalentsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default FindTalentsStack;
