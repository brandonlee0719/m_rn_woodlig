/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import { Avatar as PaperAvatar } from 'react-native-paper';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import ViewComments from '../components/ViewComments';
import { localurl } from '../constants/config';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class PostDetails extends Component {
  componentWillMount() {
    axios
      .get(`${localurl}view-post-details.php?user_id=14&post_id=6`)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  }

  render() {
    return (
      <View style={{ backgroundColor: '#eeeeee' }}>
        <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
        <Header
          backgroundColor="#ffffff"
          // containerStyle={{ height: 70 }}
          leftComponent={
            <Image
              source={require('../images/woodlig-logo-alt-image.png')}
              resizeMode="stretch"
              style={{ width: 100, height: 20 }}
            />
          }
          centerComponent={
            <Avatar
              rounded
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
              }}
            />
          }
          rightComponent={
            <View style={{ display: 'flex', flexDirection: 'row', marginRight: 5 }}>
              <Customon name="bell" color="black" size={25} />
              <Customon name="comment-dots" color="black" size={25} style={{ paddingLeft: 30 }} />
            </View>
          }
        />
        {/* title bar */}
        <View
          style={{
            height: 40,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            elevation: 3
          }}>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10
            }}>
            <View style={{}}>
              <Customon name="long-arrow-left" color="black" size={30} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="image" color="black" size={20} />
              <Text>&nbsp;&nbsp;Image</Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView contentContainerStyle={{ backgroundColor: '#eeeeee', marginTop: 10 }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20
            }}>
            <View>
              <Avatar
                rounded
                source={{
                  uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                }}
              />
            </View>
            <View>
              <Customon name="ellipsis-h-alt" size={20} style={{ alignSelf: 'flex-end' }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="map-marker-alt" color="red" />
                <Text>Abuja, Nigeria</Text>
              </View>
            </View>
          </View>
          <View>
            <Swiper
              buttonWrapperStyle={styles.buttonStyles}
              paginationStyle={styles.paginationStyle}
              style={{ height: 315 }}
              showsButtons
              nextButton={<Icon name="chevron-right" size={20} color="white" />}
              prevButton={<Icon name="chevron-left" size={20} color="white" />}>
              <View style={{ height: 315 }}>
                <ImageBackground
                  style={{ flex: 1 }}
                  resizeMode="stretch"
                  source={require('../images/concert_illustration.png')}
                />
              </View>
              <View style={{ height: 200 }}>
                <Text>2</Text>
              </View>
            </Swiper>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: '#ffffff'
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 50,
                width: '70%',
                backgroundColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginBottom: 10,
                elevation: 5
              }}>
              <Customon name="heart" size={20} color="red" />
              <Icon name="share" size={20} color="green" />
              <Icon name="share-alt" size={20} color="black" />
              <Icon name="link" size={20} color="blue" />
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: '#dedede' }} />
          </View>
          <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
            <View>
              <Text style={{ color: 'black' }}>
                Shooting a movie about Lance armstrong. cycling is armstrong
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'black' }}>Liked by&nbsp;</Text>
                  <Avatar rounded source={require('../images/drama_illustration.png')} />
                  <Avatar rounded source={require('../images/drama_illustration.png')} />
                </View>
                <Text style={{ alignContent: 'flex-end', alignSelf: 'center' }}>Posted 2h ago</Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  height: 1,
                  backgroundColor: '#dedede',
                  width: '80%'
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View>
                <Text>Comments(86)</Text>
              </View>
              <View>
                <Text>View all Comments</Text>
              </View>
            </View>
            <ViewComments />
            <ViewComments />
            <ViewComments />
            <ViewComments />
            <ViewComments />
            <View
              style={{
                alignSelf: 'center',
                height: 1,
                width: '40%',
                backgroundColor: '#dedede',
                marginBottom: 10
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <PaperAvatar.Image
                size={50}
                source={require('../images/Avatar_invisible_circle_1.png')}
              />
              <View>
                <Text>Janine Hassan</Text>
                <TextInput
                  style={{ borderBottomWidth: 1 }}
                  placeholder="say something about this"
                />
              </View>
            </View>
          </View>
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paginationStyle: {
    position: 'absolute',
    top: '-100%'
  }
  //   buttonStyles: {
  //       backgroundColor: 'black',
  //   },
});
