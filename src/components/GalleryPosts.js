import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { imageurl } from '../constants/config';

export default class GalleryPosts extends Component {
  render() {
    const { data, size } = this.props;
    return (
      <TouchableOpacity>
        <ImageBackground
          style={[styles.imageStyle, { width: size ? size : 80, height: size ? size : 80 }]}
          progressiveRenderingEnabled
          source={{
            uri: `${imageurl}/${data.path}`
          }}>
          {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <FontAwesome5 name="video" color="white" />
          </View> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 10 }}>{data.likes}</Text>
              <FontAwesome5 name="heart" color="white" solid />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 10 }}>
                {data.comments}
              </Text>
              <FontAwesome5 name="comment" color="white" solid />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  imageStyle: {
    borderRadius: 20,
    width: 80,
    height: 80,
    shadowColor: 'rgba(69, 91, 99, 0.08)',
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 16,
    overflow: 'hidden',
    margin: 10,
    padding: 5
    // alignItems: 'center',
  }
});
