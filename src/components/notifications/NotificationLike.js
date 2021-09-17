import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class NotificationLike extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Gibson J</Text>
        <View style={{marginTop: -5}} >
        <Text style={styles.comments}>Liked your post</Text>
        </View>
      </View>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
  //  flex: 1,
  },

  wrapper:{
    justifyContent: 'center',
    paddingTop: 25,
    paddingLeft: 10,


  },
  title:{
    fontSize:15,
    color: '#000',
    fontFamily: 'Poppins-Medium',

  },

  comments: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    width: 211,

  },
  });
