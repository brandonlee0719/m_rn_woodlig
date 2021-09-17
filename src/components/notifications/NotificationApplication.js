import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class NotificationApplication extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Esther Kingsley</Text>
        <View style={{marginTop: -5}} >
        <Text style={styles.comments}>Applied to a role for your casting call 'In the Mind of An Artist'</Text>
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
    width: 211,
    fontFamily: 'Poppins-Medium',

  },
  });
