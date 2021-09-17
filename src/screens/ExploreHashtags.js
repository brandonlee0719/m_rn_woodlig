import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import FollowInterests from '../components/FollowInterests';
import { apiurl } from '../constants/config';

const { width, height } = Dimensions.get('window');
class ExploreHashtags extends Component {
  state = {
    hashtags: []
  };

  componentDidMount() {
    const { user_id } = this.props;
    const explore = 0;
    // const data = { user_id, explore };
    axios
      .get(`${apiurl}fetch-trending-tags.php?user_id=${user_id}&explore=${explore}`)
      .then(res => this.setState({ hashtags: res.data.data }))
      .catch(res => console.log(res.data));
    // console.log(this.state.hashtags.length);
  }

  componentDidUpdate() {
    console.log(this.state.hashtags);
  }

  render() {
    const { hashtags } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <ImageBackground style={{ flex: 1 }} source={require('../images/hashtag-img.png')}>
          <View
            style={{
              height: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              elevation: 5
            }}>
            <FontAwesome5 name="hashtag" color="#000" size={18} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: 'black' }}>Hashtags</Text>
          </View>
          <FlatList
            data={hashtags}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <FollowInterests title={item.title} data={item} style={{ marginBottom: 20 }} />
            )}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(ExploreHashtags);
