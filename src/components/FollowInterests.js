import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import fontelloConfig from '../config.json';
import { apiurl } from '../constants/config.js';

const Customon = createIconSetFromFontello(fontelloConfig);

class FollowInterests extends Component {
  state = {
    followStatus: false
  };

  followTag(e) {
    const { data, user_id } = this.props;
    this.setState({ followStatus: true });
    const tag_id = data.id;
    const values = { user_id, tag_id };
    axios
      .post(`${apiurl}follow-tag.php`, values)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }

  unFollowTag(e) {
    const { data, user_id } = this.props;
    this.setState({ followStatus: false });
    const tag_id = data.id;
    const values = { user_id, tag_id };
    axios
      .post(`${apiurl}unfollow-tag.php`, values)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }

  render() {
    const { style, title, data } = this.props;
    const { followStatus } = this.state;
    return (
      <View style={[styles.contentStyle, style]}>
        <Text style={{ color: 'black', fontWeight: '700' }}>#{title}</Text>
        {followStatus === false ? (
          <TouchableOpacity style={styles.followButton} onPress={this.followTag.bind(this, data)}>
            <Text style={{ fontSize: 9, fontWeight: '700' }}>Follow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.followButton} onPress={this.unFollowTag.bind(this, data)}>
            <Customon name="check-circle" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  followButton: {
    width: 65,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    borderRadius: 100,
    backgroundColor: '#0ce0b5'
  },
  contentStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 40
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(FollowInterests);
