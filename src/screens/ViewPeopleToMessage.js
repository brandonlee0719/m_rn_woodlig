import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import { apiurl, imageurl } from '../constants/config';

class ViewPeopleToMessage extends Component {
  state = {
    data: [],
    loading: false
  };

  componentDidMount() {
    const { user_id } = this.props;
    axios
      .get(`${apiurl}fetch-explore-users.php?user_id=${user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(res => console.log(res.data));
  }

  messageUser = async e => {
    const { data, user_id, profile_picture, navigation } = this.props;
    const user = {
      user_id: e.id,
      picture:
        e.profile_thumb === ''
          ? 'https://www.sccpre.cat/mypng/detail/214-2144186_alpesh-m-avatar-thumbnail.png'
          : `${imageurl}/${e.profile_thumb}`,
      name: e.full_name
    };

    this.props.navigation.navigate('MessagingScreen', {
      theirid: e.id,
      user
    });
  };

  render() {
    const { data } = this.state;
    if (data.length !== 0) {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data.data}
            // initialNumToRender={2}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            onEndReachedThreshold={1}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.messageUser(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10
                }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Avatar.Image
                    source={
                      item.profile_thumb === ''
                        ? require('../images/ic_account_circle_24px.jpg')
                        : { uri: `${imageurl}/${item.profile_thumb}` }
                    }
                    size={50}
                  />
                </View>
                <View style={{ flex: 4 }}>
                  <Text
                    style={{ color: 'black', fontSize: 18, fontWeight: '400' }}
                    numberOfLines={1}>
                    {item.full_name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    return <ActivityIndicator />;
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(ViewPeopleToMessage);
