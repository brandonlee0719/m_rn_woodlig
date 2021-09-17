import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Badge, Button, Dialog, Portal } from 'react-native-paper';
import axios from 'axios';
import { apiurl, localurl, imageurl } from '../constants/config';
import AboutYourProfile from './AboutYourProfile';
import ProfileActivity from './ProfileActivity';
import ProfileRatingsScreen from './ProfileRatingsScreen';
import ProfilePeople from './ProfilePeople';

HEADER_MAX_HEIGHT = 400;
HEADER_MIN_HEIGHT = 80;
MAX_STAR_RATING_HEIGHT = 100;
MIN_STAR_RATING_HEIGHT = 30;

const { width, height } = Dimensions.get('window');
// const user_id = 5;
// const user_profile_id = 4;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      tab: 'Activity',
      profiledetails: [],
      screenHeight: 0,
      following: false,
      visible: false
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const userid = navigation.getParam('user_id');
    const theirid = navigation.getParam('theirid');
    console.log(userid, theirid);
    // const user_id = 2;
    // const user_profile_id = 3;
    // const theirid = navigation.getParam('itemId', 'NO-ID');
    axios
      .get(`${apiurl}fetch-user-profile.php?user_id=${userid}&user_profile_id=${theirid}`)
      .then(res => this.setState({ profiledetails: res.data }))
      .catch(res => console.log(res.data));
  }

  componentDidUpdate(prevProps, prevState) {
    const { profiledetails } = this.state;
    // console.log(profiledetails);
    if (this.state.profiledetails !== prevState.profiledetails) {
      if (profiledetails.data.following_status === null) {
        this.setState({ following: false });
      } else {
        this.setState({ following: true });
      }
    }
  }

  onContentSizeChange(contentWidth, contentHeight) {
    // console.log(contentWidth, contentHeight)
    this.setState({ screenHeight: contentHeight });
  }

  // follower_id is the id of the logged in user
  // user_id becomes the id of the person you are viewing
  followUser() {
    const { navigation } = this.props;
    const userid = navigation.getParam('user_id');
    const theirid = navigation.getParam('theirid');
    this.setState({ following: true });
    console.log('follow');
    // const reaction = 'follow';
    axios
      .post(`${apiurl}follow-user.php?user_id=${theirid}&follower_id=${userid}`)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }

  async unfollowUser() {
    const { navigation } = this.props;
    const userid = navigation.getParam('user_id');
    const theirid = navigation.getParam('theirid');
    this.setState({ following: false });
    await axios
      .post(`${apiurl}unfollow-user.php?user_id=${theirid}&follower_id=${userid}`)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
    this.setState({ visible: false });
  }

  hideDialog() {
    this.setState({ visible: false });
  }

  showDialog() {
    this.setState({ visible: true });
  }

  render() {
    const { tab, profiledetails, screenHeight, following } = this.state;
    const { navigation } = this.props;
    const userid = navigation.getParam('user_id');
    const theirid = navigation.getParam('theirid');
    const scrollEnabled = screenHeight > height;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const starRatingHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        (HEADER_MAX_HEIGHT - MAX_STAR_RATING_HEIGHT) / 2,
        (HEADER_MIN_HEIGHT - MIN_STAR_RATING_HEIGHT) / 2
      ],
      extrapolate: 'clamp'
    });
    const starRatingLength = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [MAX_STAR_RATING_HEIGHT, MIN_STAR_RATING_HEIGHT],
      extrapolate: 'clamp'
    });
    const bigOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    const smallOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 0.9],
      extrapolate: 'clamp'
    });
    if (profiledetails.length !== 0) {
      return (
        <View style={{ flex: 1 }}>
          <Portal>
            <Dialog visible={this.state.visible} onDismiss={this.hideDialog.bind(this)}>
              <Dialog.Title>Unfollow</Dialog.Title>
              <Dialog.Content>
                {/* <Paragraph>This is simple dialog</Paragraph> */}
                <Text style={{ fontSize: 20 }}>
                  Stop following&nbsp;
                  <Text style={{ textTransform: 'capitalize' }}>
                    {profiledetails.data.full_name}
                  </Text>
                  ?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button style={{}} color="black" onPress={() => this.setState({ visible: false })}>
                  NO
                </Button>
                <Button color="black" onPress={this.unfollowUser}>
                  YES
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <StatusBar />
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: 'lightskyblue',
              height: headerHeight
              // zIndex: headerZindex,
              // elevation: headerZindex,//required for android
              // alignItems: 'center'
            }}>
            <ImageBackground
              source={{
                uri: `${imageurl}/${profiledetails.data.cover_picture}`
              }}
              style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginTop: 20
                }}>
                <Icon
                  name="arrow-left"
                  style={styles.iconStyle}
                  size={20}
                  color="white"
                  onPress={() => this.props.navigation.goBack()}
                />
                <Animated.View style={[styles.topStar, { opacity: smallOpacity }]}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={3}
                    starSize={15}
                    fullStarColor="red"
                    starStyle={{ width: 18 }}
                    containerStyle={{ width: 15 }}
                  />
                </Animated.View>
                <Icon
                  style={styles.iconStyle}
                  name="cog"
                  color="white"
                  size={20}
                  onPress={() => this.props.navigation.navigate('Settings')}
                />
              </View>
              <Animated.View
                style={{
                  backgroundColor: '#f1f1f1',
                  height: starRatingLength,
                  width: '95%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignContent: 'center',
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                  position: 'absolute',
                  right: 0,
                  top: starRatingHeight,
                  opacity: bigOpacity
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    textAlign: 'center',
                    textTransform: 'capitalize'
                  }}>
                  {profiledetails.data.full_name}
                </Text>
                <Text style={{ fontSize: 13, color: 'black', textAlign: 'center' }}>
                  @{profiledetails.data.username}
                </Text>
                <View style={{ alignSelf: 'center' }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={3}
                    starSize={20}
                    fullStarColor="red"
                    starStyle={{ width: 23 }}
                  />
                </View>
              </Animated.View>
            </ImageBackground>
          </Animated.View>
          <Animated.View
            style={{
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: 'red',
              height: 150,
              position: 'relative',
              top: headerHeight,
              zIndex: 9999999
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f1f1f1',
                zIndex: 10000,
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>
              <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 20 }}>
                <Avatar.Image
                  size={100}
                  source={{
                    uri: `${imageurl}/${profiledetails.data.profile_picture}`
                  }}
                  style={{
                    borderWidth: 5,
                    borderColor: '#fb0201',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                />
                <Badge
                  size={40}
                  style={{
                    marginTop: -35,
                    padding: 0,
                    backgroundColor: 'transparent'
                    // alignItems: 'center',
                    // justifyContent: 'center'
                  }}>
                  <Image
                    source={require('../images/crown.png')}
                    resizeMode="center"
                    style={{
                      width: 25,
                      height: 25,
                      alignSelf: 'center'
                    }}
                  />
                </Badge>
              </TouchableOpacity>
              {userid === theirid ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row'
                    }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('PremiumMembership')}>
                      <View style={styles.addFunds}>
                        <Image
                          style={{ height: 10, width: 13 }}
                          source={require('../images/premium-icon-xxxhdpi.png')}
                        />
                        <Text style={styles.addFundsBtn}>Account</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Wallet', {
                          profiledetails: profiledetails.data
                        })
                      }>
                      <View style={styles.addFunds}>
                        <Icon name="wallet" color="#ffff" size={9} />
                        <Text style={styles.addFundsBtn}>Wallet</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.addFunds}>
                        <Icon name="chart-line" color="#ffff" size={9} />
                        <Text style={styles.addFundsBtn}>Promotions</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10
                  }}>
                  {/* following and unfollowing change */}
                  {following && (
                    <TouchableOpacity
                      onPress={this.showDialog.bind(this)}
                      style={[styles.actionbuttonStyles, { width: 68.66 }]}>
                      <Icon name="check" color="white" size={11} />
                      <Text style={styles.actionButtonText}>&nbsp;Following</Text>
                    </TouchableOpacity>
                  )}
                  {following === false && (
                    <TouchableOpacity
                      onPress={this.followUser}
                      style={[styles.actionbuttonStyles, { width: 68.66 }]}>
                      <Icon name="user-plus" color="white" size={11} />
                      <Text style={styles.actionButtonText}>&nbsp;Follow</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={[styles.actionbuttonStyles, { width: 86.26 }]}>
                    <Icon name="star" solid color="white" size={11} />
                    <Text style={styles.actionButtonText}>&nbsp;Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionbuttonStyles, { width: 62.92 }]}
                    onPress={() =>
                      navigation.navigate('RatingsScreen', {
                        recipient_id: theirid
                      })
                    }>
                    <Icon name="envelope" color="white" size={11} />
                    <Text style={styles.actionButtonText}>&nbsp;Rate</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                flexDirection: 'row',
                paddingLeft: '5%',
                paddingRight: '2%'
              }}>
              <TouchableOpacity
                onPress={() => this.setState({ tab: 'About' })}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomWidth: 3,
                  borderBottomColor: this.state.tab === 'About' ? 'red' : 'transparent'
                }}>
                <Text style={{ fontSize: 20, paddingBottom: 10 }}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ tab: 'Activity' })}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderBottomWidth: 3,
                  borderBottomColor: this.state.tab === 'Activity' ? 'red' : 'transparent'
                }}>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>
                  {parseInt(profiledetails.data.post_count) +
                    parseInt(profiledetails.data.album_count) +
                    parseInt(profiledetails.data.tag_count)}
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Activity</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ tab: 'Ratings' })}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderBottomWidth: 3,
                  borderBottomColor: this.state.tab === 'Ratings' ? 'red' : 'transparent'
                }}>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>
                  {parseInt(profiledetails.data.rating_count)}
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Ratings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ tab: 'People' })}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderBottomWidth: 3,
                  borderBottomColor: this.state.tab === 'People' ? 'red' : 'transparent'
                }}>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>
                  {parseInt(profiledetails.data.followers_count) +
                    parseInt(profiledetails.data.following_count)}
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>People</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <ScrollView
            style={{ backgroundColor: '#eeeeee', zIndex: -3 }}
            scrollEventThrottle={16}
            nestedScrollEnabled
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ])}
            scrollEnabled
            onContentSizeChange={this.onContentSizeChange}>
            <Animated.View style={{ position: 'relative', top: 420, marginBottom: 420 }}>
              {tab === 'About' && <AboutYourProfile theirid={theirid} data={profiledetails} />}
              {tab === 'Activity' && (
                <ProfileActivity
                  theirid={theirid}
                  post_count={profiledetails.data.post_count}
                  tag_count={profiledetails.data.tag_count}
                  album_count={profiledetails.data.album_count}
                />
              )}
              {tab === 'Ratings' && <ProfileRatingsScreen theirid={theirid} />}
              {tab === 'People' && <ProfilePeople />}
            </Animated.View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topStar: {
    width: 100,
    height: 55,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  iconStyle: {
    marginVertical: 18,
    zIndex: 100
  },
  actionbuttonStyles: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 26.33,
    alignSelf: 'center'
  },
  actionButtonText: {
    color: 'white',
    fontSize: 9
  },
  addFundsBtn: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#ffffff',
    // marginTop: 75,
    marginLeft: 3,
    fontSize: 9
  },

  addFunds: {
    // width: 80,
    padding: 10,
    height: 27,
    shadowColor: '#000',
    // shadowOffset: { width: 6, height: 0 },
    shadowRadius: 19,
    borderRadius: 25,
    backgroundColor: '#fb0201',
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 1,
    marginLeft: 3
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(ProfileScreen);
