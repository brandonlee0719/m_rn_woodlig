import React, { Component } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Animated.ScrollView
          onScroll={this.props.onScroll}
          scrollEventThrottle={1}
          style={{ marginBottom: 20 }}>
          <Text>User has Logged In</Text>
          <View style={{ height: 500, backgroundColor: 'green', marginBottom: 20 }} />
          <View style={{ height: 500, backgroundColor: 'green', marginBottom: 20 }} />
          <View style={{ height: 500, backgroundColor: 'green', marginBottom: 20 }} />
          <View style={{ height: 500, backgroundColor: 'green', marginBottom: 20 }} />
        </Animated.ScrollView>
      </View>
    );
  }
}
