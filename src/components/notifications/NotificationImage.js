import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default class NotificationImage extends Component {
  render() {
    return (
      <View style={styles.container}>

      <View style={styles.commentImage}>
        <Image source={require('../../images/drama_illustration.png')} style={{width: 105, height: 82, marginTop: 8, borderRadius: 15,}} />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  commentImage:{
    
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    elevation: 5,
    elevation: 12,
    //justifyContent: 'flex-end',

  },
});
