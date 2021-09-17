import * as React from 'react';
import { View, Image, Dimensions, Animated, StatusBar, StyleSheet } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Demo from './Demo';
import HomeScreen from './HomeScreen';

MAX_HEADER_HEIGHT = 400;
MIN_HEADER_HEIGHT = 100;
const { height, width } = Dimensions.get('window');

class NewProfile extends React.Component {
  constructor(props) {
    super(props);
    // Set the vertical scroll animated obj on the state, will need it for interpolation later.
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const tabsNavigator = value =>
      createMaterialTopTabNavigator(
        {
          Forms: { screen: props => <HomeScreen {...props} {...value} /> },
          Grid: { screen: props => <Demo {...props} {...value} /> }
        },
        {
          tabBarPosition: 'top',
          swipeEnabled: true,
          animationEnabled: true,
          tabBarOptions: {
            activeTintColor: 'teal',
            inactiveTintColor: '#aaaaaa',
            style: {
              //   backgroundColor: 'blue'
            },
            labelStyle: {
              textAlign: 'center'
            },
            indicatorStyle: {
              borderBottomColor: 'teal',
              borderBottomWidth: 2
            }
          }
        }
      );

    const Tabs = tabsNavigator(
      /* Our onScroll function to be triggered by child components */
      {
        onScroll: Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: this.state.scrollY
              }
            }
          }
        ]),
        heightOffset: height
      }
    );
    const AppContainer = createAppContainer(Tabs);
    return (
      <View style={{ backgroundColor: 'red', height }}>
        <Animated.View style={{ height: headerHeight, backgroundColor: 'white' }} />
        <AppContainer>
          <Tabs />
        </AppContainer>
      </View>
    );
  }
}

export default NewProfile;
