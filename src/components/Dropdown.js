import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { options: false, status: 'public' };
  }

  render() {
    const { options, status } = this.state;
    return (
      <View style={{}}>
        {status === 'public' ? (
          <TouchableOpacity
            style={{ flexDirection: 'row', marginRight: 20 }}
            onPress={() => this.setState({ options: true })}>
            <Icon name="lock" size={20} />
            <Text style={{ textAlignVertical: 'center' }}> Public </Text>
            <Icon name="caret-down" size={20} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: 'row', marginRight: 20 }}
            onPress={() => this.setState({ options: true })}>
            <Icon name="lock" size={20} />
            <Text style={{ textAlignVertical: 'center' }}> Private </Text>
            <Icon name="caret-down" size={20} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        )}
        {options === true && (
          <View
            style={{
              //   position: 'absolute',
              width: 100,
              //   paddingHorizontal: 20,
              paddingVertical: 10,
              elevation: 100,
              backgroundColor: '#ffffff'
            }}>
            <Text
              style={{ height: 30, fontSize: 20 }}
              onPress={() => this.setState({ status: 'public', options: false })}>
              Public
            </Text>
            <Text
              style={{ height: 30, fontSize: 20 }}
              onPress={() => this.setState({ status: 'private', options: false })}>
              Private
            </Text>
          </View>
        )}
      </View>
    );
  }
}
