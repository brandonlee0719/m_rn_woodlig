import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// eslint-disable-next-line react/prefer-stateless-function
export default class SetupEvents extends Component {
  render() {
    return (
      <View style={{ paddingLeft: 20 }}>
        <View
          style={{
            height: 100,
            width: 120,
            borderRadius: 40,
            backgroundColor: 'red',
            zIndex: 0
          }}>
          <View>
            <Image
              source={{ uri: 'https://www.gstatic.com/webp/gallery/4.jpg' }}
              PlaceholderContent={<ActivityIndicator />}
              style={{
                width: 120,
                height: 40,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100
              }}
            />
          </View>
          <LinearGradient
            colors={['#CB2032', '#7A578A']}
            style={{ height: 60, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
            <View
              style={{
                flex: 1.5,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderwidth: 3,
                borderColor: 'white',
                borderRightRadius: 100
              }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>
                    audition
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>|4 days to go</Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                Romeo & Juliet Skyhigh
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
