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

const Customon = createIconSetFromFontello(fontelloConfig);

const { width } = Dimensions.get('window');
const CastingCallsStack = createStackNavigator(
  {
    CastingCallDetail: {
      screen: CastingCallDetail,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    CastingCallsScreen: {
      screen: CastingCallsScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <View
            style={{
              width,
              height: 50,
              backgroundColor: '#ffffff',
              // justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              elevation: 3
            }}>
            <StatusBar backgroundColor="white" translucent={false} barStyle="dark-content" />
            <TouchableOpacity>
              <View style={{ marginLeft: 10 }}>
                <Customon
                  name="filter"
                  color="#fb0201"
                  size={14}
                  onPress={() => navigation.navigate('FilterCastingCalls')}
                />
              </View>
            </TouchableOpacity>

            <View style={{ marginLeft: 30 }}>
              <Customon name="woodlig-brand" color="#fb0201" />
            </View>

            <View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddCastingCalls', { menustatus: 'postajob' })}>
                  <View style={{ marginRight: 20, marginTop: 7 }}>
                    <Customon name="paper-plane" color="#fb0201" size={14} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddCastingCalls', { menustatus: 'calendarview' })}>
                  <View style={{ marginRight: 15 }}>
                    <Customon name="calendar-star" color="#fb0201" size={24} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      })
    },
    AddCastingCalls: {
      screen: AddCastingCalls
      // title: 'Casting Calls',
    },
    EditCastingCall: {
      screen: EditCastingCall
      // title: 'Casting Calls',
    },
    ViewApplicants: {
      screen: ViewApplicants,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    FilterCastingCalls: {
      screen: FilterCastingCalls,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    AddLocationRoute: {
      screen: AddLocationRoute
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        headerBackImage: (
          <Icon name="arrow-left" color="white" size={30} onPress={() => navigation.goBack()} />
        )
      })
    },
    TagPeopleScreen: {
      screen: TagPeopleScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <Icon name="times" color="black" size={20} />,
        headerTitleContainerStyle: { justifyContent: 'center' },
        headerLayoutPreset: 'left',
        headerRight: (
          <Icon name="check" color="black" size={30} onPress={() => navigation.goBack()} />
        ),
        headerRightContainerStyle: { paddingRight: 10 },
        title: 'Tag People'
      })
    }
  },
  {
    initialRouteName: 'CastingCallsScreen'
  }
);

// const ActivityStreamStack = createAppContainer(BottomTab);

CastingCallsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default CastingCallsStack;
