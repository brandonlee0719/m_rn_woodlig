import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TextInput
} from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { Avatar, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { imageurl, apiurl } from '../constants/config';

const { height, width } = Dimensions.get('window');
// eslint-disable-next-line react/prefer-stateless-function
class OnYourMindScreen extends Component {
  static navigationOptions = {
    title: 'OnYourMind',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      location: '',
      people: '',
      longlat: [],
      loading: false,
      status: ''
    };
  }

  // componentWillReceiveProps(a) {
  //   console.log(a.location);
  // }

  async handleSubmit() {
    // this.setState({ loading: true });
    const { description } = this.state;
    const { location, id, tag } = this.props;
    const { formatted_address, lng, lat, city, country } = location;
    const tags = [];
    tag.forEach(e => tags.push(e.id));
    // console.log(tags);
    const data = {
      type: 'text',
      privacy: 'public',
      description,
      people: tags.toString(),
      lat,
      lng,
      formatted_address,
      city
    };
    console.log(data);
    await axios
      .post(`${apiurl}add-post.php?user_id=3`, data)
      .then(res => {
        console.log(res.data);
        this.setState({ status: res.data });
      })
      .catch(res => console.log('not read'));
    this.setState({ loading: false });
  }

  render() {
    const { username, profilepicture, tag } = this.props;
    return (
      <ScrollView>
        <ImageBackground
          source={require('../images/Screenshot_1554501194.png')}
          style={{ height, width }}
          blurRadius={5}>
          <StatusBar backgroundColor="transparent" />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <Icon
                name="times"
                size={20}
                color="black"
                style={{ paddingLeft: 20 }}
                onPress={() => this.props.navigation.goBack()}
                style={{ paddingTop: 50, paddingLeft: 25 }}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center'
                }}>
                What are you up to?
              </Text>
            </View>
            <View
              style={{
                flex: 4.5,
                backgroundColor: 'white',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.3,
                elevation: 13
              }}>
              <View style={{ flexDirection: 'row', padding: 10,}}>
                <Avatar
                  source={{
                    uri: `${imageurl}/${profilepicture}`
                  }}
                  rounded
                  size="medium"
                />
              <Text style={{ textAlignVertical: 'center',  marginLeft: 5}}>{username}</Text>
              </View>
              <View>
                <TextInput
                  onChangeText={text => this.setState({ description: text })}
                  value={this.state.description}
                  placeholder="Say something ..."
                  multiline
                  style={{
                    borderWidth: 1,
                    textAlignVertical: 'top',
                    borderColor: '#dedede',
                    width: '90%',
                    height: 200,
                    alignSelf: 'center'
                  }}
                />
              </View>
            { /* <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10 }}>
                <Icon name="paperclip" size={20} />
                <Text style={{ fontSize: 15 }}> Attach</Text>
              </View>*/}
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-around',
                  marginTop: 30
                }}>
              { /* <TouchableOpacity
                  onPress={() => this.setState({ description: `${this.state.description} #` })}
                  style={{ flexDirection: 'row', alignContent: 'center' }}>
                  <Icon name="plus" size={15} color="black" />
                  <Text style={{ color: 'black' }}> Add Hashtag</Text>
                </TouchableOpacity>*/}
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TagPeopleScreen')}
                  style={{ flexDirection: 'row', alignContent: 'center' }}>
                  <Icon name="plus" size={15} color="black" />
                  <Text style={{ color: 'black' }}> Tag People</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddLocationRoute')}
                  style={{ flexDirection: 'row', alignContent: 'center' }}>
                  <Icon name="plus" size={15} color="black" />
                  <Text style={{ color: 'black' }}> Add Location</Text>
                </TouchableOpacity>
              </View>
              <View>
                <View>
                  <Text>{this.props.location.description}</Text>
                </View>
                <View style={{ paddingLeft: 25 }}>
                  <Text>With:</Text>
                  {tag.length <= 2 ? (
                    <View style={{ flexDirection: 'row' }}>
                      {tag.map(e => (
                        <Text key={e.id}>&nbsp;{e.username}&nbsp;</Text>
                      ))}
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row' }}>
                      {tag.slice(0, 2).map(e => (
                        <Text key={e.id}>&nbsp;{e.username}&nbsp;</Text>
                      ))}
                      <Text>and {tag.length - 2} more&nbsp;</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                {this.state.loading === true ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 30,
                      marginTop: 30,
                      backgroundColor: 'red',
                      width: 105,
                      height: 30
                    }}>
                    <Progress.CircleSnail
                      color="white"
                      size={20}
                      indeterminate
                      indeterminateAnimationDuration={4000}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={this.handleSubmit.bind(this)}
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: 'red',
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 40,
                      paddingRight: 40,
                      borderRadius: 30,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 1,
                        height: 4
                      },
                      shadowOpacity: 1,
                      shadowRadius: 16.0,

                      elevation: 4,
                      marginTop: 30
                    }}>
                    <Text style={{ color: 'white' }}>Post</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  location: state.addpost.locationdescription,
  tag: state.addpost.taggedpeople,
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  username: state.profilepicture.username
});

export default connect(mapStateToProps)(OnYourMindScreen);
