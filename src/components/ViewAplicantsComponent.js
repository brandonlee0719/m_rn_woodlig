/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

export default class ViewAplicantsComponent extends Component {
  render() {
    return (
      <View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Avatar.Image
                size={100}
                source={require('../images/Avatar_invisible_circle_1.png')}
              />
            </View>
            <View>
              <Text>James Ola</Text>
              <Text>@username</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ textAlign: 'right' }}>1d day</Text>
            <TouchableOpacity
              style={{
                borderRadius: 30,
                backgroundColor: 'red',
                paddingHorizontal: 20,
                paddingVertical: 3,
                marginBottom: 5
              }}>
              <Text style={{ color: 'white' }}>Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 30,
                borderWidth: 2,
                borderColor: 'red',
                paddingHorizontal: 20,
                paddingVertical: 3
              }}>
              <Text style={{ color: 'red' }}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ width: '80%', height: 2, backgroundColor: '#dedede', alignSelf: 'flex-end' }}
        />
      </View>
    );
  }
}
