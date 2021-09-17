import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import { imageurl } from '../constants/config';

const { width, height } = Dimensions.get('window');
export class CirclesListComponent extends Component {
  render() {
    const { item, navigation } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          console.log(item.path);
          navigation.navigate('GroupMessage', {
            groupkey: item.groupkey,
            circle_name: item.circle_name
          });
        }}>
        <View
          style={{
            width,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: '#ffffff'
          }}>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
            <FontAwesome5
              name={item.privacy === 'public' ? 'lock-open' : 'lock'}
              solid
              size={10}
              color="#d3d3d3"
            />
            <Avatar.Image
              size={53}
              source={
                item.path === ''
                  ? require('../images/Avatar_invisible_circle_1.png')
                  : { uri: `${item.path}` }
              }
            />
          </View>
          <View style={{ flex: 5, justifyContent: 'center' }}>
            <Text style={{ fontSize: 13, color: '#414141' }} numberOfLines={1}>
              {item.circle_name}
            </Text>
            <Text style={{ fontSize: 10, color: '#3e3e3e' }}>Members: {item.members.length}</Text>
          </View>
          <View
            style={{
              flex: 1.5,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
            <FontAwesome5 name="external-link-alt" color="#000" />
            <FontAwesome5 name="ellipsis-h" color="#000" />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#dedede',
            height: 1,
            width: '95%',
            alignSelf: 'center'
          }}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(CirclesListComponent);
