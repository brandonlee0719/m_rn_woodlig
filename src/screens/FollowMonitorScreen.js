import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

// eslint-disable-next-line react/prefer-stateless-function
export default class FollowMonitorScreen extends Component {
  render() {
    return (
      <ImageBackground source={require('../images/backgroundImage.png')} style={{ flex: 1 }}>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                opacity: 0.5,
                fontSize: 20
              }}>
              Setup
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              Design your experience
            </Text>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <SearchBar
                searchIcon={false}
                placeholder="Search Interests"
                placeholderTextColor="white"
                round
                containerStyle={{
                  paddingBottom: 0,
                  paddingTop: 0,
                  width: 200,
                  backgroundColor: 'transparent',
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent'
                }}
                inputStyle={{
                  backgroundColor: 'transparent',
                  height: 10,
                  color: 'white'
                }}
                inputContainerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'white',
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  height: 10
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: '5%'
          }}>
          <View
            style={{
              paddingTop: 40,
              backgroundColor: 'white',
              width: 320,
              height: 400,
              opacity: 0.8,
              borderRadius: 20
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
              <Text style={{ fontSize: 50 }}>Hello monitor</Text>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
