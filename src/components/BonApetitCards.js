import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { apiurl, imageurl } from '../constants/config';

const numeral = require('numeral');
const moment = require('moment');

export default class BonApetitCards extends Component {
  render() {
    const { data } = this.props;
    return (
      <View style={{ marginBottom: 20 }}>
        {/* photo */}
        {data.type === 'photo' && (
          <View style={styles.imageStyle}>
            <View
              style={{
                height: 37,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10
              }}>
              <Avatar.Image
                source={
                  data.profile_thumb === ''
                    ? require('../images/backgroundImage.png')
                    : { uri: `${imageurl}/${data.path}` }
                }
                size={20}
              />
              <FontAwesome5 name="image" size={16} />
            </View>
            <View style={{ height: 102 }}>
              <Image
                source={{ uri: `${imageurl}/${data.path}` }}
                resizeMode="cover"
                style={{ height: 102, width: 166 }}
              />
            </View>
            <View
              style={{
                height: 55,
                justifyContent: 'space-evenly',
                paddingHorizontal: 10
              }}>
              <Text numberOfLines={1}>{data.caption}</Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="heart" />
                  <Text>&nbsp;{numeral(data.likes).format('0 a')}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="comment" />
                  <Text>&nbsp;{numeral(data.comments).format('0 a')}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {data.type === 'event' && (
          <View style={styles.eventStyle}>
            <View
              style={{
                height: 39,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10
              }}>
              <Avatar.Image
                source={
                  data.profile_thumb === ''
                    ? require('../images/backgroundImage.png')
                    : { uri: `${imageurl}/${data.path}` }
                }
                size={20}
              />
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontWeight: '700'
                }}>
                {data.event_type}
              </Text>
              <FontAwesome5 name="calendar" size={16} />
            </View>
            <View style={{ height: 71 }}>
              <Image
                source={require('../images/backgroundImage.png')}
                resizeMode="cover"
                style={{ height: 71, width: 166 }}
              />
            </View>
            <View
              style={{
                height: 57,
                justifyContent: 'space-evenly',
                paddingHorizontal: 10
              }}>
              <Text>{data.caption}</Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="heart" />
                  <Text>{numeral(data.likes).format('0 a')}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="comment" />
                  <Text>{numeral(data.comments).format('0 a')}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {data.type === 'video' && (
          <View style={styles.videoStyle}>
            <View
              style={{
                height: 39,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10
              }}>
              <Avatar.Image
                source={
                  data.profile_thumb === ''
                    ? require('../images/backgroundImage.png')
                    : { uri: `${imageurl}/${data.path}` }
                }
                size={20}
              />
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontWeight: '700'
                }}>
                {data.event_type}
              </Text>
              <FontAwesome5 name="video" size={16} />
            </View>
            <View style={{ height: 130 }}>
              <Image
                source={require('../images/backgroundImage.png')}
                resizeMode="cover"
                style={{ height: 130, width: 166 }}
              />
              {/* <Thumbnail url={`${imageurl}/${data.path}`} imageHeight={130} imageWidth={166} /> */}
            </View>
            <View
              style={{
                height: 57,
                justifyContent: 'space-evenly',
                paddingHorizontal: 10
              }}>
              <Text>event</Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="heart" />
                  <Text>{numeral(data.likes).format('0 a')}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="comment" />
                  <Text>{numeral(data.comments).format('0 a')}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 166,
    minHeight: 194,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderRadius: 10,
    // borderWidth: 1,
    alignSelf: 'flex-start',
    elevation: 2,
    backgroundColor: '#ffffff'
  },
  videoStyle: {
    width: 166,
    height: 230,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderRadius: 10,
    // borderWidth: 1,
    elevation: 2,
    backgroundColor: '#ffffff'
  },
  eventStyle: {
    width: 166,
    height: 167,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderRadius: 10,
    // borderWidth: 1,
    elevation: 2,
    backgroundColor: '#ffffff'
  }
});
