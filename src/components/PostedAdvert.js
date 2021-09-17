/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

export default class PostedAdvert extends Component {
  render() {
    return (
      <View style={styles.container}>
      
      <View style={styles.favourite}>
        <Text>I'm the PostedAdvert component</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  favourite:{
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
});
