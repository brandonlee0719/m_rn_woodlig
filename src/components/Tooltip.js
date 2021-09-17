import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class Tooltip extends Component {
  render() {
    return (
      <View style={styles.tooltip}>
        <View
          style={{
            backgroundColor: '#f1f1f1',
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 0
          }}>
          <Text style={{ color: this.props.color }}>{this.props.likes}</Text>
        </View>
        <View style={styles.triangle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltip: {
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f1f1f1',
    transform: [{ rotate: '180deg' }]
  }
});
