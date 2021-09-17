import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { FAB } from 'react-native-paper';
import { navigatePost } from '../redux/actions/navigatePost';
import ActivityStream from '../components/ActivityStream';
import { localurl, apiurl, imageurl } from '../constants/config';
import { viewActivityStream, clearActivityStream } from '../redux/actions/viewActivityStream';
import fontelloConfig from '../config.json';
import EmptyActivityStream from './EmptyActivityStream';

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');

export class ActivityStreamScreen extends Component {
  static navigationOptions = {
    title: 'ActivityStream',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      post_type: '',
      data: '',
      count: 1,
      activeItem: {},
      isFetching: false
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    // const user_id = 3;
    const { user_id } = this.props;
    const page = 1;
    const data = { user_id, page };
    this.props.viewActivityStream(data);
  }

  componentDidUpdate() {
    console.log(this.props.activitystreamdata);
  }

  onEndReached() {
    const { count } = this.state;
    const { user_id } = this.props;
    this.setState({ count: count + 1 });
    const page = count + 1;
    const data = { user_id, page };
    this.props.viewActivityStream(data);
  }

  handlePhoto = () => {
    // this.setState({ post_type: 'photo' });
    this.props.navigation.navigate('NewPostScreen', {
      routeName: 'photo'
    });
    // this.props.navigation.navigate('NewPostScreen', {itemId: this.state.post_type })
  };

  handleVideo() {
    // this.setState({ post_type: 'video' });
    this.props.navigation.navigate('NewPostScreen', {
      routeName: 'video'
    });
  }

  handleEvent() {
    // this.setState({ post_type: 'event' });
    this.props.navigation.navigate('NewPostScreen', {
      routeName: 'event'
    });
  }

  handleSales() {
    // this.setState({ post_type: 'sale' });
    this.props.navigation.navigate('NewPostScreen', {
      routeName: 'sale'
    });
  }

  handleScript() {
    // this.setState({ post_type: 'record' });
    this.props.navigation.navigate('NewPostScreen', {
      routeName: 'script'
    });
  }

  async onRefresh() {
    this.setState({ isFetching: true });
    const { user_id } = this.props;
    // const user_id = 3;
    const page = 1;
    const data = { user_id, page };
    this.props.viewActivityStream(data);
    this.props.clearActivityStream();
    await this.props.activitystreamdata;
    this.setState({ isFetching: false });
  }

  viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100
  };

  onViewableItemsChanged(a) {
    if (a.viewableItems[0] !== undefined) {
      // console.log(a.viewableItems[0].item);
      this.setState({ activeItem: a.viewableItems[0].item });
    }
  }

  render() {
    const { user_id, profilepicture, activitystreamdata } = this.props;
    const { activeItem } = this.state;
    if (activitystreamdata) {
      return (
        <View style={{ flex: 1, backgroundColor: '#ededed', paddingBottom: 40 }}>
          <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
          <Header
            backgroundColor="#ffffff"
            // containerStyle={{ height: 70 }}
            leftComponent={
              <Image
                source={require('../images/woodlig-logo-alt-image.png')}
                resizeMode="stretch"
                style={{ width: 46, height: 11 }}
              />
            }
            centerComponent={
              profilepicture === '' ? (
                <Avatar
                  rounded
                  onPress={() =>
                    this.props.navigation.navigate('ProfileScreen', {
                      user_id,
                      theirid: user_id
                    })
                  }
                  source={require('../images/Avatar_invisible_circle_1.png')}
                />
              ) : (
                <Avatar
                  rounded
                  onPress={() =>
                    this.props.navigation.navigate('ProfileScreen', {
                      user_id,
                      theirid: user_id
                    })
                  }
                  source={{
                    uri: `${imageurl}/${profilepicture}`
                  }}
                />
              )
            }
            rightComponent={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginRight: 5
                }}>
                <Customon
                  name="bell"
                  color="black"
                  size={25}
                  onPress={() => this.props.navigation.navigate('Notifications')}
                />
                <Customon
                  name="comment-dots"
                  color="black"
                  size={20}
                  style={{ paddingLeft: 30 }}
                  onPress={() => this.props.navigation.navigate('MessagingStack')}
                />
              </View>
            }
          />
          <FAB
            style={styles.fab}
            small
            icon={() => <Customon name="plus" color="#fb0201" size={22} />}
            onPress={this.handlePhoto}
          />

          <TouchableOpacity onPress={() => this.props.navigation.navigate('OnYourMindScreen')}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'transparent'
              }}>
              <View style={styles.searchExtend}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontFamily: 'Poppins-Meduim',
                    fontSize: 12
                  }}>
                  What are you up to ?
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ backgroundColor: '#eeeeee' }}>
            <FlatList
              data={activitystreamdata}
              ListEmptyComponent={<EmptyActivityStream />}
              // initialNumToRender={2}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              viewabilityConfig={this.viewabilityConfig}
              onViewableItemsChanged={this.onViewableItemsChanged}
              onEndReachedThreshold={1}
              onEndReached={this.onEndReached}
              contentContainerStyle={{ paddingBottom: 100 }}
              keyExtractor={item => item.post_id}
              renderItem={({ item }) => (
                <ActivityStream
                  full_name={item.full_name}
                  username={item.username}
                  text={item.body}
                  type={item.type}
                  address={item.address}
                  path={item.path}
                  event_type={item.event_type}
                  likes={item.likes}
                  like_status={item.like_status}
                  comments={item.comments}
                  profile_thumb={item.profile_thumb}
                  theirid={item.post_user_id}
                  caption={item.caption}
                  postid={item.post_id}
                  datecreated={item.date_created}
                  likestatus={item.like_status}
                  productname={item.product_name}
                  productpurpose={item.product_purpose}
                  productprice={item.product_price}
                  producttype={item.product_type}
                  productid={item.product_id}
                  activeItem={activeItem}
                  Item={item}
                />
              )}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  activitystreamdata: state.activitystreamdata.activitystream
});

export default connect(
  mapStateToProps,
  { viewActivityStream, clearActivityStream }
)(ActivityStreamScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -10
  },

  searchExtend: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 265,
    height: 33,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 7,
    borderRadius: 5,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: '#fff',
    borderColor: '#fb0201',
    borderWidth: 2
  }
});
