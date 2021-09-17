import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SetupRolesTick from './SetupRolesTick';

export default class FeaturedTalentsCard extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20
        }}>
        <View style={{ width: '20%', alignItems: 'center' }}>
          <TouchableOpacity style={{ elevation: 2 }}>
            <Avatar.Image source={require('../images/Avatar_invisible_circle_1.png')} size={70} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '80%',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            backgroundColor: '#ffffff',
            elevation: 3,
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
          <SetupRolesTick
            roles="#fb0201"
            viewStyle={{ borderColor: '#fb0201' }}
            textStyle={{ color: '#fb0201' }}
          />
          <SetupRolesTick
            roles="#fb0201"
            viewStyle={{ borderColor: '#fb0201' }}
            textStyle={{ color: '#fb0201' }}
          />
          <SetupRolesTick
            roles="role"
            viewStyle={{ borderColor: '#fb0201' }}
            textStyle={{ color: '#fb0201' }}
          />
          <SetupRolesTick
            roles="role"
            viewStyle={{ borderColor: '#fb0201' }}
            textStyle={{ color: '#fb0201' }}
          />
          <SetupRolesTick
            roles="actor"
            viewStyle={{ borderColor: '#fb0201' }}
            textStyle={{ color: '#fb0201' }}
          />
        </View>
      </View>
    );
  }
}
