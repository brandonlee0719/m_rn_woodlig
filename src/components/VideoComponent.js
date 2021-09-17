import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

// eslint-disable-next-line react/prefer-stateless-function
export class VideoComponent extends Component {
  render() {
    return (
      <View
        style={{
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '85%',
          borderRadius: 30,
          borderWidth: 2,
          borderColor: 'transparent',
          marginTop: 10,
          marginBottom: 0,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
            <Avatar
              rounded
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
              }}
            />
            <Text style={{ textAlignVertical: 'center' }}>@Username</Text>
          </View>
          <View style={{ alignContent: 'center' }}>
            <Icon name="play" style={{ alignItems: 'center' }} />
          </View>
          <View style={{ flexDirection: 'row', paddingRight: 10 }}>
            <Icon name="lock" style={{ alignSelf: 'center' }} />
            <Text style={{ textAlignVertical: 'center', paddingRight: 5, paddingLeft: 5 }}>
              Public
            </Text>
            <Icon name="sort-down" style={{ alignSelf: 'flex-start' }} />
          </View>
        </View>
        <View
          style={{
            flex: 5,
            backgroundColor: '#ededed',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View
            style={{
              width: '90%',
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dedede',
              borderRadius: 20
            }}>
            <Icon name="plus" size={30} />
            <Text>Add Video</Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#dedede',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}>
          <View style={{ flex: 1, paddingLeft: 20, paddingTop: 10 }}>
            <Text>Add Title</Text>
            <TextInput placeholder="Write the video's title here" />
          </View>
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Text>Add Description</Text>
            <TextInput placeholder="Write a description here" />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 5,
              paddingRight: 5
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="plus" color="black" style={{ alignSelf: 'center' }} />
              <Text style={{ color: 'black' }}> Add Hashtag</Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => this.props.navigation.navigate('TagPeopleScreen')}>
              <Icon name="plus" color="black" style={{ alignSelf: 'center' }} />
              <Text style={{ color: 'black' }}> Tag People</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => this.props.navigation.navigate('AddLocationRoute')}>
              <Icon name="plus" color="black" style={{ alignSelf: 'center' }} />
              <Text style={{ color: 'black' }}> Add Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(VideoComponent);
