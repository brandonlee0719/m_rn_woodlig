import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, StatusBar } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import { Appbar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import fontelloConfig from '../config.json';
import { localurl, apiurl, imageurl } from '../constants/config';
import FeaturedTalentsCard from '../components/FeaturedTalentsCard.js';

const Customon = createIconSetFromFontello(fontelloConfig);

class FeauturedTalentsScreen extends Component {
  render() {
    const { profilepicture } = this.props;
    return (
      <View>
        <StatusBar translucent backgroundColor="#ffffff" barStyle="dark-content" />
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
              <Customon name="bell" color="black" size={25} />
              <Customon name="comment-dots" color="black" size={25} style={{ paddingLeft: 30 }} />
            </View>
          }
        />
        <View
          style={{
            height: 46,
            backgroundColor: '#ffffff',
            elevation: 3,
            flexDirection: 'row'
          }}>
          <View
            style={{
              flex: 6,
              borderRightWidth: 1,
              flexDirection: 'row',
              // justifyContent: 'space',
              alignItems: 'center'
            }}>
            <View
              style={{
                flex: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 30,
                  width: '85%',
                  borderWidth: 3,
                  borderColor: '#dedede',
                  borderRadius: 20
                }}>
                <TextInput
                  placeholder="Who are you looking for?"
                  style={{
                    height: 30,
                    fontSize: 13,
                    padding: 0,
                    paddingLeft: 20,
                    width: '80%'
                  }}
                />
                <FontAwesome5 name="search" style={{ paddingRight: 20 }} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <FontAwesome5 name="sort-amount-up" />
              <Text>Rating</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5 name="star" size={25} color="#fb0201" />
          </View>
        </View>
        <View style={{ marginBottom: 250, backgroundColor: '#eeeeee' }}>
          <FlatList
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  backgroundColor: '#ffffff'
                }}>
                <Customon name="long-arrow-left" color="#000" size={30} />
                <Text
                  style={{
                    color: '#fb0201',
                    fontSize: 13,
                    fontFamily: 'Poppins-SemiBold'
                  }}>
                  Feautured Talents
                </Text>
                <Text style={{ color: '#fb0201' }}>This Week</Text>
              </View>
            }
            contentContainerStyle={{ marginTop: 20, paddingBottom: 100 }}
            style={{ backgroundColor: '#ffffff' }}
            data={[
              { key: 'a' },
              { key: 'b' },
              { key: 'c' },
              { key: 'd' },
              { key: 'e' },
              { key: 'f' },
              { key: 'g' },
              { key: 'h' },
              { key: 'i' },
              { key: 'j' },
              { key: 'k' },
              { key: 'l' }
            ]}
            renderItem={({ item }) => <FeaturedTalentsCard />}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  activitystreamdata: state.activitystreamdata.activitystream
});

export default connect(mapStateToProps)(FeauturedTalentsScreen);
