import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import { apiurl, imageurl } from '../constants/config.js';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class ViewComments extends Component {
  state = {
    like: true
  };

  render() {
    const { like } = this.state;
    const { fullname, profilethumb, comment, likes } = this.props;
    return (
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20
          }}>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              {profilethumb === '' ? (
                <Avatar.Image
                  size={37}
                  style={styles.avatarStyle}
                  source={require('../images/Avatar_invisible_circle_1.png')}
                />
              ) : (
                <Avatar.Image
                  size={37}
                  style={styles.avatarStyle}
                  source={{ uri: `${imageurl}/${profilethumb}` }}
                />
              )}
            </View>
            <View style={{ flex: 10, justifyContent: 'center' }}>
              <Text>{fullname}</Text>
              <Text>{comment}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <View style={{ flex: 1 }}>
              <Text>Reply</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
              {like === false && (
                <Customon name="heart" color="red" onPress={() => this.setState({ like: true })} />
              )}
              {like && (
                <FontAwesome5
                  name="heart"
                  solid
                  color="red"
                  onPress={() => this.setState({ like: !like })}
                />
              )}
              <Text>&nbsp;&nbsp;Likes({likes})</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    borderWidth: 2,
    borderColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
