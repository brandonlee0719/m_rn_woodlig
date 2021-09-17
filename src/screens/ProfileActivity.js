import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { localurl, apiurl } from '../constants/config';
import ProfileActivityAlbums from './ProfileActivityAlbums';
import { profileAlbums } from '../redux/actions/profileAlbums';
import { profileTaggedPosts } from '../redux/actions/profileTaggedPosts';
import { profileActivityPosts } from '../redux/actions/profileActivityPosts';
import ProfileActivityTags from './ProfileActivityTags';
import ProfileActivityPosts from './ProfileActivityPosts';

const { height, width } = Dimensions.get('window');
class ProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitytype: 'Album',
      contentHeight: 1
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentDidMount() {
    const { user_id, theirid } = this.props;
    const user_profile_id = theirid;
    const data = { user_id, user_profile_id };
    this.props.profileAlbums(data);
    this.props.profileActivityPosts(data);
    this.props.profileTaggedPosts(data);
    // axios
    //   .get(`${apiurl}fetch-user-profile-album.php?user_id=3&user_profile_id=3`)
    //   .then(res => console.log(res.data))
    //   .catch(res => console.log(res.data));
  }

  // componentWillReceiveProps(b) {
  //   console.log(b.albumslist);
  // }

  onContentSizeChange(contentWidth, contentHeight) {
    // console.log(contentHeight)
    this.setState({ contentHeight });
  }

  render() {
    const { activitytype, contentHeight } = this.state;
    const { post_count, tag_count, album_count } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            style={[styles.headerContent, { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]}
            onPress={() => this.setState({ activitytype: 'Posts' })}>
            <Text
              style={[
                styles.headerTextStyle,
                { color: activitytype === 'Posts' ? 'red' : '#dedede' }
              ]}>
              Posts
            </Text>
            <Text style={{ color: activitytype === 'Posts' ? 'red' : '#dedede' }}>
              {post_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ activitytype: 'Album' })}
            style={[
              styles.headerContent,
              {
                elevation: 3,
                shadowOffset: { width: 3, height: 0 },
                shadowColor: 'rgba(0, 0, 0, 0.16)'
              }
            ]}>
            <Text
              style={[
                styles.headerTextStyle,
                { color: activitytype === 'Album' ? 'red' : '#dedede' }
              ]}>
              Album
            </Text>
            <Text style={{ color: activitytype === 'Album' ? 'red' : '#dedede' }}>
              {album_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerContent,
              { borderTopRightRadius: 20, borderBottomRightRadius: 20 }
            ]}
            onPress={() => this.setState({ activitytype: 'Tags' })}>
            <Text
              style={[
                styles.headerTextStyle,
                { color: activitytype === 'Tags' ? 'red' : '#dedede' }
              ]}>
              Tags
            </Text>
            <Text style={{ color: activitytype === 'Tags' ? 'red' : '#dedede' }}>{tag_count}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          {activitytype == 'Posts' && <ProfileActivityPosts />}
          {activitytype == 'Album' && <ProfileActivityAlbums />}
          {activitytype == 'Tags' && <ProfileActivityTags />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    // height: 45,
    width: 255,
    // backgroundColor: 'transparent',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  headerTextStyle: {
    fontSize: 15
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(
  mapStateToProps,
  { profileAlbums, profileActivityPosts, profileTaggedPosts }
)(ProfileActivity);
