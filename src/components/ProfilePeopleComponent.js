import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class ProfilePeopleComponent extends Component {
  render() {
    const { full_name, username } = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            justifyContent: 'space-between'
          }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Avatar.Image source={require('../images/Avatar_invisible_circle_1.png')} />
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{full_name}</Text>
                <Text>@{username}</Text>
              </View>
            </View>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={3}
              starSize={15}
              fullStarColor="red"
              starStyle={{ width: 20 }}
              containerStyle={{ width: 30 }}
            />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <FontAwesome5 name="plus" color="red" size={20} />
            <Customon name="options-icon-h" size={5} style={{ marginLeft: 40 }} />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#dedede' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectangle34: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: -1, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff',
    padding: 10
  },
  buttonLeft: {
    width: 106,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff'
  },
  buttonRight: {
    width: 106,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 100,
    backgroundColor: '#ffffff'
  }
});
