import { createStackNavigator, NavigationActions } from 'react-navigation';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TrendingScreen from '../screens/TrendingScreen';
import SearchEverythingScreen from '../screens/SearchEverythingScreen';
import SearchBar from './SearchTabBar';
import TrendingItems from './ViewTrendingItem';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

const { width, height } = Dimensions.get('window');

const TrendingStack = createStackNavigator(
  {
    TrendingScreen: {
      screen: TrendingScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SearchScreen: {
      screen: SearchEverythingScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ViewTrendingItems: {
      screen: TrendingItems,
      navigationOptions: ({ navigation }) => ({
        header: (
          <View style={{ height: 150 }}>
            <StatusBar barStyle="light-content" backgroundColor="#fff" translucent={false} />
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15
              }}>
              <Customon
                name="long-arrow-left"
                color="#000"
                size={15}
                onPress={() => navigation.goBack()}
              />
            <FontAwesome5 name="ellipsis-v" color="#000" size={17} />
            </View>
            <View style={{ flex: 5, alignItems: 'center' }}>
              {navigation.state.params.type === 'hashtags' && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../images/hashtags.webp')}
                    style={{ height: 88, width: 88 }}
                  />
                  <Text>{navigation.state.params.item.title}</Text>
                </View>
              )}
              {navigation.state.params.type === 'places' && (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../images/location.webp')}
                    style={{ height: 88, width: 88 }}
                  />
                  <Text>{navigation.state.params.item.address}</Text>
                </View>
              )}
            </View>
          </View>
        )
      })
    },
    SearchTabBar: {
      screen: SearchBar,
      navigationOptions: ({ navigation }) => ({
        header: (
          <View style={{ height: 30, width }}>
            <StatusBar translucent={false} />
            <View
              style={{
                width: width - 40,
                paddingVertical: 10,
                borderRadius: 5,
                alignSelf: 'center',
                flexDirection: 'row',
                elevation: 2,
                backgroundColor: '#ffffff'
              }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <FontAwesome5
                  name="times"
                  size={20}
                  color="#000"
                  onPress={() => navigation.goBack()}
                />
              </View>
              <View style={{ flex: 6 }}>
                <TouchableOpacity>
                  <TextInput
                    placeholder="search"
                    style={{ padding: 0 }}
                    value={navigation.state.params.searchField}
                    editable={false}
                    onChangeText={text => {
                      navigation.setParams({
                        searchField: text
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <FontAwesome5 name="search" size={20} color="#000" />
              </View>
            </View>
          </View>
        )
      })
    }
  },
  {
    initialRouteName: 'TrendingScreen'
  }
);

// const ActivityStreamStack = createAppContainer(BottomTab);

TrendingStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default TrendingStack;
