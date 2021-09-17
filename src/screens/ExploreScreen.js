import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import ExploreCards from '../components/ExploreCards';
import FollowInterests from '../components/FollowInterests';
import { fetchTrendingHashtags } from '../redux/actions/fetchTrendingHashtags';
import { fetchExploreUsers, fetchNewUsers } from '../redux/actions/fetchExploreUsers';
import { imageurl } from '../constants/config';
import { viewActivityStream, clearActivityStream } from '../redux/actions/viewActivityStream';

class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.refreshActivityStream = this.refreshActivityStream.bind(this);
  }

  componentDidMount() {
    const { user_id } = this.props;
    const explore = 1;
    const data = { user_id, explore };
    this.props.fetchTrendingHashtags(data);
    this.props.fetchNewUsers({ user_id });
    this.props.fetchExploreUsers({ user_id });
  }

  // componentWillReceiveProps(b) {
  //   const { messagelist, followlist, profilepicture } = b;
  //   // console.log(messagelist, followlist);
  //   // messagelist.sort(function(a, b) {
  //   //   return 0.5 - Math.random();
  //   // });

  //   console.log(followlist);
  // }

  refreshActivityStream() {
    const { navigation } = this.props;
    const { user_id } = this.props;
    const page = 1;
    const data = { user_id, page };
    this.props.viewActivityStream(data);
    this.props.clearActivityStream();
    this.props.activitystreamdata;
    navigation.goBack();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 231,
          width: 1,
          backgroundColor: '#dedede'
        }}
      />
    );
  };

  renderItem = ({ item, index }) => (
    <View
      style={{
        flexDirection: 'row'
      }}>
      <ExploreCards
        data={item}
        userType="follow"
        full_name={item.full_name}
        premium={item.premium}
      />
      {index !== this.props.followlist.length - 1 && this.renderSeparator()}
    </View>
  );

  renderMessage = ({ item, index }) => (
    <View
      style={{
        flexDirection: 'row'
      }}>
      <ExploreCards
        data={item}
        userType="follow"
        full_name={item.full_name}
        premium={item.premium}
        profilepicture={item.profile_thumb}
      />
      {index !== this.props.messagelist.length - 1 && this.renderSeparator()}
    </View>
  );

  render() {
    const { navigation, hashtags, followlist, messagelist } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
        <StatusBar backgroundColor="#ffffff" translucent={false} />
        <Appbar.Header style={{}}>
          <Appbar.Action icon="chevron-left" size={40} onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="Explore"
            subtitle="Let's get you connected"
            titleStyle={{ alignSelf: 'center', fontWeight: '100' }}
            subtitleStyle={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: '700',
              color: 'black'
            }}
          />
          <TouchableOpacity style={styles.doneButton} onPress={this.refreshActivityStream}>
            <Text>DONE</Text>
          </TouchableOpacity>
        </Appbar.Header>
        <ScrollView>
          <View style={{ flex: 1, marginVertical: 10, paddingLeft: 20 }}>
            <Text>For you</Text>
          </View>
          <View style={styles.cardBackground}>
            <FlatList
              horizontal
              ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: '#dedede, height: 400', width: 20 }} />
              )}
              data={followlist.sort(function(a, b) {
                return 0.5 - Math.random();
              })}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{ flex: 1, marginVertical: 10, paddingLeft: 20 }}>
            <Text>Get in Touch with</Text>
          </View>
          <View style={styles.cardBackground}>
            <FlatList
              horizontal
              ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: '#dedede, height: 400', width: 20 }} />
              )}
              data={messagelist.sort(function(a, b) {
                return 0.5 - Math.random();
              })}
              keyExtractor={item => item.id}
              renderItem={this.renderMessage}
            />
          </View>
          <View style={{ flex: 1, marginVertical: 10, paddingLeft: 20 }}>
            <Text>Follow Interests</Text>
          </View>
          <View style={styles.followBackground}>
            <ImageBackground
              resizeMode="contain"
              style={{ flex: 6, opacity: 0.7 }}
              source={require('../images/hashtag-img.png')}
            >
              <View style={{ flex: 1, justifyContent: 'space-around' }}>
                {hashtags.map(e => (
                  <FollowInterests key={e.id} title={e.title} data={e} />
                ))}
              </View>
            </ImageBackground>
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={styles.seeMore}
                onPress={() => this.props.navigation.navigate('ExploreHashtags')}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: 'black' }}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, marginVertical: 10, paddingLeft: 20 }}>
            <Text>Events</Text>
          </View>
          <View style={styles.eventsBackground}>
            <View>
              <TouchableOpacity
                style={styles.imageStyle}
                onPress={() =>
                  navigation.navigate('ExploreEvents', {
                    eventType: 'concert'
                  })
                }>
                <Image
                  resizeMode="contain"
                  style={[styles.imageStyle, { borderWidth: 0 }]}
                  source={require('../images/concert_illustration.png')}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center' }}>CONCERT</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.imageStyle}
                onPress={() =>
                  navigation.navigate('ExploreEvents', {
                    eventType: 'drama'
                  })
                }>
                <Image
                  resizeMode="contain"
                  style={[styles.imageStyle, { borderWidth: 0 }]}
                  source={require('../images/drama_illustration.png')}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center' }}>DRAMAS/PLAYS</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.imageStyle}
                onPress={() =>
                  navigation.navigate('ExploreEvents', {
                    eventType: 'show'
                  })
                }>
                <Image
                  resizeMode="contain"
                  style={[styles.imageStyle, { borderWidth: 0 }]}
                  source={require('../images/show_illustration.png')}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center' }}>SHOWS</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.imageStyle}
                onPress={() =>
                  navigation.navigate('ExploreEvents', {
                    eventType: 'party'
                  })
                }>
                <Image
                  resizeMode="contain"
                  style={[styles.imageStyle, { borderWidth: 0 }]}
                  source={require('../images/party_illustration.png')}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center' }}>PARTIES</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  doneButton: {
    width: 81,
    height: 26,
    marginRight: -4,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: -3 },
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    backgroundColor: '#fecbcb'
  },
  cardBackground: {
    height: 231,
    backgroundColor: '#ffffff',
    paddingTop: 20
  },
  followBackground: {
    height: 246,
    backgroundColor: '#ffffff'
  },
  seeMore: {
    width: 63,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 1, height: 0 },
    shadowRadius: 6,
    borderRadius: 100,
    backgroundColor: '#fecbcb'
  },
  eventsBackground: {
    height: 251,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageStyle: {
    width: 169,
    height: 72,
    borderRadius: 20,
    borderColor: '#fb0201',
    // borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  }
});

const mapStateToProps = state => ({
  hashtags: state.trendinghashtags.exploretags,
  followlist: state.exploreusers.followList,
  messagelist: state.exploreusers.messageList,
  user_id: state.userid.id
});

export default connect(
  mapStateToProps,
  {
    fetchTrendingHashtags,
    fetchExploreUsers,
    fetchNewUsers,
    viewActivityStream,
    clearActivityStream
  }
)(ExploreScreen);
