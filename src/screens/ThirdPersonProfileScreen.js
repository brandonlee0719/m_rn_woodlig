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
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import { apiurl, localurl, imageurl } from '../constants/config';
import AboutYourProfile from './AboutYourProfile';
import ProfileActivity from './ProfileActivity';
import ProfileRatingsScreen from './ProfileRatingsScreen';
import ProfilePeople from './ProfilePeople';
import AboutThirdPersonProfile from './AboutThirdPersonProfile';

HEADER_MAX_HEIGHT = 400;
HEADER_MIN_HEIGHT = 80;
MAX_STAR_RATING_HEIGHT = 100;
MIN_STAR_RATING_HEIGHT = 30;

const { width, height } = Dimensions.get('window');

class ThirdPersonProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      tab: 'Activity',
      profiledetails: [],
      screenHeight: 0
    };
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentWillMount() {
    const { navigation } = this.props;
    // const theirid = navigation.getParam('itemId', 'NO-ID');
    axios
      .get(`${apiurl}fetch-user-profile.php?user_id=3&user_profile_id=3`)
      .then(res => this.setState({ profiledetails: res.data }))
      .catch(res => console.log('error'));
  }

  componentDidUpdate() {
    const { profiledetails } = this.state;
    console.log(profiledetails);
    // console.log(`${imageurl}/${profiledetails.data[0].profile_picture}`);
  }

  onContentSizeChange(contentWidth, contentHeight) {
    // console.log(contentWidth, contentHeight)
    this.setState({ screenHeight: contentHeight });
  }

  render() {
    const { tab, profiledetails, screenHeight } = this.state;
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
              source={{ uri: `${imageurl}/${profiledetails.data.cover_picture}` }}
              style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginHorizontal: 20
                  // marginTop: 20,
                }}>
                <Icon
                  name="arrow-left"
                  style={styles.iconStyle}
                  size={20}
                  color="white"
                  onPress={() => alert('pressed')}
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
                  name="ellipsis-v"
                  color="white"
                  size={20}
                  onPress={() => alert('pressed')}
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
                flexDirection: 'row',
                paddingRight: 20
              }}>
              <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 20 }}>
                <Avatar.Image
                  size={100}
                  source={{ uri: `${imageurl}/${profiledetails.data.profile_picture}` }}
                  style={{
                    borderWidth: 3,
                    borderColor: 'gold',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionbuttonStyles, { width: 68.66 }]}>
                <Icon name="user-plus" color="white" size={11} />
                <Text style={styles.actionButtonText}>&nbsp;Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionbuttonStyles, { width: 86.26 }]}>
                <Icon name="star" solid color="white" size={11} />
                <Text style={styles.actionButtonText}>&nbsp;Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionbuttonStyles, { width: 62.92 }]}>
                <Icon name="envelope" color="white" size={11} />
                <Text style={styles.actionButtonText}>&nbsp;Rate</Text>
              </TouchableOpacity>
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
              {tab === 'About' && <AboutThirdPersonProfile data={profiledetails} />}
              {tab === 'Activity' && <ProfileActivity />}
              {tab === 'Ratings' && <ProfileRatingsScreen />}
              {tab === 'People' && <ProfilePeople />}
            </Animated.View>
          </ScrollView>
        </View>
      );
    }
    return <ActivityIndicator />;
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
  }
});

export default ThirdPersonProfileScreen;
