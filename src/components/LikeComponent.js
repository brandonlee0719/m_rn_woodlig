import React, { Component } from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import axios from 'axios';
import { connect } from 'react-redux';
import fontelloConfig from '../config.json';
import { apiurl } from '../constants/config';

const Customon = createIconSetFromFontello(fontelloConfig);

class LikeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      currentValue: 0
    };
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
  }

  componentDidMount() {
    const { like, currentValue } = this.state;
    const { likes, sendData, like_status, likeType } = this.props;
    if (likeType === 'post') {
      if (like_status !== null) {
        this.setState({ like: true });
      }
      const add = parseInt(likes);
      sendData(add);
      this.setState({ currentValue: add });
    }
  }

  like() {
    const { like, currentValue } = this.state;
    const { likes, sendData, likeType } = this.props;
    if (likeType === 'post') {
      const add = currentValue + 1;
      this.setState({ like: true, currentValue: currentValue + 1 });
      sendData(add);
      const reaction = 'like';
      const { post_id, user_id } = this.props;
      const data = { user_id, reaction, post_id };
      console.log(data);
      axios
        .post(`${apiurl}add-post-reaction.php`, data)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  }

  unlike() {
    const { like, currentValue } = this.state;
    const { likes, sendData, likeType } = this.props;
    if (likeType === 'post') {
      this.setState({ like: true, currentValue: currentValue - 1 });
      const subtract = currentValue - 1;
      sendData(subtract);
      this.setState({ like: false });
      const reaction = 'unlike';
      const { post_id, user_id } = this.props;
      const data = { user_id, reaction, post_id };
      axios
        .post(`${apiurl}add-post-reaction.php`, data)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  }

  render() {
    const { like } = this.state;
    return (
      <View>
        {like && (
          <Customon name="like-selected" solid size={20} color="#fb0201" onPress={this.unlike} />
        )}
        {like === false && (
          <Customon name="like-icon" solid size={20} color="#fb0201" onPress={this.like} />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(LikeComponent);
