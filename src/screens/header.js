import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

class TabbedAccounts extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0
    };
  }

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    this.setState({
      customStyleIndex: itemId
    });
  }

  // handleSingleIndexSelect = (index: number) => {
  //   this.setState(prevState => ({ ...prevState, selectedIndex: index }))
  // }

  // handleMultipleIndexSelect = (index: number) => {
  //   const { selectedIndices } = this.state

  //   if (selectedIndices.includes(index)) {
  //     this.setState(prevState => ({
  //       ...prevState,
  //       selectedIndices: selectedIndices.filter((i) => i !== index),
  //     }))
  //   } else {
  //     this.setState(prevState => ({
  //       ...prevState,
  //       selectedIndices: [
  //         ...selectedIndices,
  //         index,
  //       ],
  //     }))
  //   }
  // }

  handleCustomIndexSelect = (index: number) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
  };

  render() {
    const { customStyleIndex } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ height: 80 }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 30, zIndex: 999999, left: 10 }}
            onPress={() => this.props.navigation.goBack()}>
            <Customon name="long-arrow-left" color="black" size={30} />
          </TouchableOpacity>
          <Image
            style={{ alignSelf: 'flex-end' }}
            source={require('../images/LoginRegisterMask.webp')}
          />
        </View>
        <Image
          resizeMode="contain"
          style={{ alignSelf: 'center', height: 50, width: 150 }}
          source={require('../images/Woodlig_new_logo.png')}
        />
        <SegmentedControlTab
          values={['Login', 'Signup']}
          selectedIndex={customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{
            marginTop: 20,
            height: 50,
            backgroundColor: 'white'
          }}
          tabStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            borderColor: 'transparent'
          }}
          activeTabStyle={{
            backgroundColor: 'white',
            marginTop: 2,
            borderBottomWidth: 5,
            borderBottomColor: 'red'
          }}
          tabTextStyle={{ color: '#444444' }}
          activeTabTextStyle={{ color: 'black', fontWeight: 'bold' }}
        />
        {customStyleIndex === 0 && <LoginScreen />}
        {customStyleIndex === 1 && <SignUpScreen />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabViewText: {
    color: '#444444',
    fontWeight: 'bold',
    marginTop: 50,
    fontSize: 18
  },
  titleText: {
    color: '#444444',
    padding: 20,
    fontSize: 14,
    fontWeight: '500'
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: '#444444'
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24
  },
  tabStyle: {
    borderColor: '#D52C43',
    borderWidth: 4
  },
  activeTabStyle: {
    backgroundColor: '#D52C43'
  },
  tabTextStyle: {
    color: '#D52C43'
  }
});

export default TabbedAccounts;
