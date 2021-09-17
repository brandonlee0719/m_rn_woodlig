/* eslint-disable indent */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header } from 'react-native-elements';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import fontelloConfig from '../config.json';
import { navigatePost } from '../redux/actions/navigatePost';
import VideoComponent from '../components/VideoComponent';
import PhotoComponent from '../components/PhotoComponent';
import ScriptComponent from '../components/ScriptComponent';
import EventComponent from '../components/EventComponent';
import RecordComponent from '../components/RecordComponent';
import SalesComponent from '../components/SalesComponent';
import VideoPost from '../components/VideoComponent2';
import { apiurl } from '../constants/config';

const Customon = createIconSetFromFontello(fontelloConfig);

export class NewPostScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      post_type: '',
      photostatus: [],
      videostatus: [],
      eventstatus: []
    };
    this.photo = this.photo.bind(this);
    this.video = this.video.bind(this);
    this.script = this.script.bind(this);
    this.event = this.event.bind(this);
    this.sales = this.sales.bind(this);
    this.record = this.record.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const routeName = this.props.navigation.getParam('routeName');
    console.log(routeName);
    this.setState({ post_type: routeName });
  }

  componentDidUpdate(a, b) {
    const { photostatus, videostatus, eventstatus } = this.state;
    // console.log(this.props.submitpost.postvalues)
    if (
      photostatus.status === 'success' ||
      videostatus.status === 'success' ||
      eventstatus.status === 'success'
    ) {
      this.props.navigation.goBack();
    } else if (photostatus.status === 'error') {
      alert(photostatus.message);
    } else if (videostatus.status === 'error') {
      alert(videostatus.message);
    } else if (eventstatus.status === 'error') {
      alert(eventstatus.message);
    }
  }

  handleSubmit() {
    const { id } = this.props;
    const { post_type } = this.state;
    const { postvalues } = this.props.submitpost;
    const { location } = this.props
    const formatted_address = location === '' ? '' : location.formatted_address
    const city = location === '' ? '' : location.city
    const country = location === '' ? '' : location.country
    const lng = location === '' ? '' : location.lng
    const lat = location === '' ? '' : location.lat

    if (post_type === 'script') {
      console.log(postvalues);
      axios
        .post(`${apiurl}add-post.php?user_id=3`, postvalues)
        .then(res => console.log(res.data))
        .catch(res => alert('unable to upload photo'));
    }
    if (post_type === 'sale') {
      if (postvalues.formatted_address === undefined) return alert('Please Select a location');
      console.log(postvalues);
      axios
        .post(`${apiurl}add-product.php?user_id=3`, postvalues)
        .then(res => console.log(res.data))
        .catch(res => alert('unable to upload photo'));
    }
    if (post_type === 'photo') {
      if (postvalues.image === undefined || postvalues.image.length === 0) {
        return alert('please select an image')
      }
      console.log(postvalues)
      console.log(location)
      const c = postvalues.image.path.split('/');
      const len = c.length - 1;
      var photo = {
        uri: postvalues.image.path,
        type: postvalues.image.mime,
        name: c[len],
        size: postvalues.image.size
      };
      const body = new FormData();
      body.append('photo', photo);
      body.append('caption', postvalues.caption);
      body.append('type', 'photo');
      body.append('lng', lng);
      body.append('lat', lat);
      body.append('formatted_address', formatted_address);
      body.append('privacy', 'public');
      body.append('country', country);
      body.append('city', city);

      axios
        .post(`${apiurl}add-post.php?user_id=${id}`, body)
        .then(res => {
          console.log(res.data)
          this.setState({ photostatus: res.data })
        })
        .catch(res => alert('unable to upload photo'));
      console.log(body);
    }
    if (post_type === 'video') {
      console.log(postvalues);
      if (postvalues.video === undefined || postvalues.video.length === 0) {
        return alert('please select a video')
      }
      console.log(postvalues);
      const c = postvalues.video.path.split('/');
      const len = c.length - 1;
      const video = {
        uri: postvalues.video.path,
        type: postvalues.video.mime,
        name: c[len],
        size: postvalues.video.size
      };
      const body = new FormData();
      body.append('video', video);
      body.append('caption', postvalues.title);
      body.append('description', postvalues.description);
      body.append('tag', postvalues.tag.toString());
      body.append('type', 'video');
      body.append('lng', lng);
      body.append('lat', lat);
      body.append('formatted_address', formatted_address);
      body.append('privacy', 'public');
      body.append('country', country);
      body.append('city', city);

      axios
        .post(`${apiurl}add-post.php?user_id=${id}`, body, {
          onUploadProgress: progressEvent => {
            console.log(
              `Upload Progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`
            );
          }
        })
        .then(res => {
          console.log(res.data)
          this.setState({ videostatus: res.data })
        })
        .catch(res => alert('unable to upload video'));
      console.log(body);
    }

    if (post_type === 'event') {
      if (postvalues.image === undefined || postvalues.image.length === 0) {
        console.log(postvalues)
        return console.log('please select a photo')
      }
      console.log(postvalues)
      const c = postvalues.image.path.split('/');
      const len = c.length - 1;
      var photo = {
        uri: postvalues.image.path,
        type: postvalues.image.mime,
        name: c[len],
        size: postvalues.image.size
      };
      const body = new FormData();
      body.append('photo', photo);
      body.append('event_description', postvalues.description);
      body.append('event_name', postvalues.eventname);
      body.append('event_type', postvalues.eventtype);
      body.append('event_time', postvalues.time);
      body.append('event_date', postvalues.date);
      body.append('event_venue', postvalues.venue);
      body.append('type', 'event');
      body.append('lng', postvalues.lng);
      body.append('lat', postvalues.lat);
      body.append('formatted_address', formatted_address);
      body.append('privacy', 'public');
      body.append('country', country);
      body.append('city', city);
      axios
        .post(`${apiurl}add-post.php?user_id=${id}`, body)
        .then(res => {
          console.log(res.data)
          this.setState({ eventstatus: res.data })
        })
        .catch(res => console.log('unable to upload event'));
      console.log(body);
    }
  }

  photo() {
    this.setState({ post_type: 'photo' });
  }

  video() {
    this.setState({ post_type: 'video' });
  }

  script() {
    const { script } = this.state;
    this.setState({ post_type: 'script' });
  }

  event() {
    const { event } = this.state;
    this.setState({ post_type: 'event' });
  }

  sales() {
    this.setState({ post_type: 'sale' });
  }

  record() {
    this.setState({ post_type: 'record' });
  }

  render() {
    const { post_type } = this.state;
    return (
      <View>
        <StatusBar translucent={false} backgroundColor="transparent" height={100} />
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate('ActivityStream')} />
          <Appbar.Content titleStyle={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Poppins-Medium' }} title="NEW POST" />
          {/* <Appbar.Action icon="check" onPress={this.handleSubmit} /> */}
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              paddingVertical: 3,
              paddingHorizontal: 7,
              borderRadius: 5
            }}
            onPress={this.handleSubmit}>
            <Text style={{ color: '#ffffff' }}>Post</Text>
          </TouchableOpacity>
        </Appbar.Header>
        <View
          style={{
            borderWidth: 1,
            height: 50,
            borderColor: 'white',
            borderTopColor: '#dedede',
            borderBottomColor: 'transparent',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 1
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.photo}>
              <Customon
                name="image-light"
                color={post_type === 'photo' ? 'red' : '#808080'}
                size={17}
              />
              <Text
                style={{
                  textAlign: 'center', fontFamily: 'Poppins-Meduim', fontSize: 13,
                  color: post_type === 'photo' ? 'red' : '#808080'
                }}>
                Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.video}>
              <Customon
                name="video-light"
                color={post_type === 'video' ? 'red' : '#808080'}
                size={17}
              />
              <Text
                style={{
                  textAlign: 'center', fontFamily: 'Poppins-Meduim', fontSize: 13,
                  color: post_type === 'video' ? 'red' : '#808080'
                }}>
                Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.script} style={{ alignItems: 'center' }}>
              <Customon
                name="quill_outline"
                color={post_type === 'script' ? 'red' : '#808080'}
                size={17}
              />
              <Text
                style={{
                  textAlign: 'center', fontFamily: 'Poppins-Meduim', fontSize: 13,
                  color: post_type === 'script' ? 'red' : '#808080'
                }}>
                Script
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.event} style={{ alignItems: 'center' }}>
              <Customon
                name="calendar-alt-light"
                color={post_type === 'event' ? 'red' : '#808080'}
                size={17}
              />
              <Text
                style={{
                  textAlign: 'center', fontFamily: 'Poppins-Meduim', fontSize: 13,
                  color: post_type === 'event' ? 'red' : '#808080'
                }}>
                Event
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.sales} style={{ alignItems: 'center' }}>
              <Customon
                name="shopping-cart-light"
                color={post_type === 'sale' ? 'red' : '#808080'}
                size={17}
              />
              <Text
                style={{
                  textAlign: 'center', fontFamily: 'Poppins-Meduim', fontSize: 13,
                  color: post_type === 'sale' ? 'red' : '#808080'
                }}>
                Sell
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={this.record} style={{ alignItems: 'center' }}>
              <Customon name="video" color={post_type === 'record' ? 'red' : 'grey'} size={20} />
              <Text
                style={{
                  textAlign: 'center',
                  color: post_type === 'record' ? 'red' : 'grey'
                }}>
                Record
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View>
          {post_type === 'photo' && <PhotoComponent />}
          {post_type === 'video' && <VideoPost />}
          {post_type === 'script' && <ScriptComponent />}
          {post_type === 'event' && <EventComponent />}
          {post_type === 'sale' && <SalesComponent />}
          {post_type === 'record' && <RecordComponent />}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  newPostRoute: state.newpostnavigation.newpostroute,
  submitpost: state.addpost,
  location: state.addpost.locationdescription,
  tag: state.addpost.taggedpeople,
  id: state.userid.id
});

export default connect(mapStateToProps)(NewPostScreen);
