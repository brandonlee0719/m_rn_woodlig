import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { imageurl } from '../constants/config';

const moment = require('moment');

const { width, height } = Dimensions.get('window');
class ChatListComponent extends Component {
  render() {
    const { item, user_id, profilepicture } = this.props;
    const { user } = item;
    const theirid = user.user_id;
    // const theirid = item.recipient_id === user_id ? item.sender_id : item.recipient_id;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          console.log(item);
          this.props.navigation.navigate('MessagingScreen', {
            theirid,
            user
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
            <FontAwesome5 name="circle" solid size={10} color="#d3d3d3" />
            <Avatar.Image size={53} source={require('../images/Avatar_invisible_circle_1.png')} />
          </View>
          <View style={{ flex: 5, justifyContent: 'center' }}>
            <Text style={{ fontSize: 13, color: '#414141' }}>{user.name}</Text>
            <Text numberOfLines={1}>{item.text}</Text>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            <Text>{moment(item.createdAt).fromNow()}</Text>
            {/* <Text>36 min</Text> */}
            <FontAwesome5 name="ellipsis-h" />
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

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(withNavigation(ChatListComponent));
