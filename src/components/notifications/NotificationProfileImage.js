import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,

} from 'react-native';

export default class NotificationProfileImage extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View>
      <Image source={require('../../images/ic_account_circle_24px.jpg')} style={{width: 68, height: 68, marginTop: 8,}} />
      </View>
      <View style={styles.time}>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 12}}> 2 min </Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },

  time: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
