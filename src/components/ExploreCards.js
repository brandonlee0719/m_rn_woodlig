import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating';
import { withNavigation } from 'react-navigation';
import { Avatar, Portal, Modal } from 'react-native-paper';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiurl, imageurl } from '../constants/config';

class ExploreCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
      loading: false
    };
    this.messageUser = this.messageUser.bind(this);
  }
  // componentDidMount() {
  //   const { data, profilepicture } = this.props;
  //   console.log(data.profile_thumb);
  //   console.log(`${imageurl}/${data.profile_thumb}`);
  // }

  // componentWillReceiveProps(a) {
  //   if (a.props.userType === 'follow') this.setState({ follow: true });
  // }

  followUser(e, a) {
    // console.log(e);
    const { user_id } = this.props;
    this.setState({ follow: true });
    axios
      .post(`${apiurl}follow-user.php?user_id=${e.id}&follower_id=${user_id}`)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }

  unfollowUser(e, a) {
    const { user_id } = this.props;
    console.log(e);
    this.setState({ follow: false });
    axios
      .post(`${apiurl}unfollow-user.php?user_id=${e.id}&follower_id=${user_id}`)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }

  async messageUser() {
    const { data, user_id, navigation } = this.props;
    // db.ref('/users/' + data.id).set(data);
    this.setState({ loading: true });
    console.log(user_id, data.id);
    await axios
      .get(`${apiurl}get-chat-key.php?sender_id=${user_id}&recipient_id=${data.id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          this.setState({ loading: false });
          this.props.navigation.navigate('MessagingScreen', {
            theirid: data.id,
            key: res.data.key
          });
        }
      })
      .catch(res => console.log(res.data));
  }

  render() {
    const { userType, full_name, premium, data, user_id, navigation, basedOn } = this.props;
    const { follow, loading } = this.state;
    return (
      <View>
        <Portal>
          <Modal visible={loading}>
            <View style={{ borderRadius: 50, padding: 10 }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          </Modal>
        </Portal>
        <View
          style={{
            width: 70,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileScreen', {
                user_id,
                theirid: data.id
              })
            }>
            {data.profile_thumb === '' ? (
              <Avatar.Image
                size={70}
                source={require('../images/Avatar_invisible_circle_1.png')}
                style={{
                  borderWidth: 3,
                  borderColor: premium === '0' ? '#f1f0f2' : '#fb0201',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              />
            ) : (
              <Avatar.Image
                size={70}
                source={{ uri: `${imageurl}/${data.profile_thumb}` }}
                style={{
                  borderWidth: 3,
                  borderColor: premium === '0' ? '#f1f0f2' : '#fb0201',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              />
            )}
          </TouchableOpacity>
          <Text numberOfLines={1} style={{ paddingVertical: 5 }}>
            {full_name}
          </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={3}
            starSize={11}
            fullStarColor="red"
            starStyle={{ width: 15 }}
            containerStyle={{
              width: 15,
              justifyContent: 'center',
              marginVertical: 10
            }}
          />
          {userType === 'follow' && follow === false && (
            <TouchableOpacity
              style={styles.followButton}
              onPress={this.followUser.bind(this, data)}>
              <Text>Follow</Text>
            </TouchableOpacity>
          )}
          {userType === 'follow' && follow === true && (
            <TouchableOpacity
              style={[styles.followButton, { backgroundColor: '#0ce0b5' }]}
              onPress={this.unfollowUser.bind(this, data)}>
              <Text style={{ textTransform: 'capitalize' }}>unfollow</Text>
            </TouchableOpacity>
          )}
          {userType === 'message' && (
            <TouchableOpacity style={styles.followButton} onPress={this.messageUser}>
              <Text>Message</Text>
            </TouchableOpacity>
          )}
          {basedOn !== 'nothing' && (
            <Text style={{ color: 'black', fontSize: 10, textAlign: 'center' }}>
              Based on your location
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  followButton: {
    width: 69,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 100,
    backgroundColor: '#fecbcb',
    marginHorizontal: 14
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(withNavigation(ExploreCards));
