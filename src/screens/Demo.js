import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';

const moment = require('moment');

export default class Demo extends Component {
  render() {
    return (
      <View>
        <Text>{moment(1564067660 * 1000).fromNow()}</Text>
      </View>
    );
  }
}
