import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SetupUser from '../components/SetupUser';
import SetupEvents from '../components/SetupEvents';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  }
});

// eslint-disable-next-line react/prefer-stateless-function
export default class SetupConnectScreen extends Component {
  render() {
    return (
      <LinearGradient
        useAngle
        angle={135}
        angleCenter={{ x: 0.5, y: 0.4 }}
        colors={['#CB2032', '#7A578A']}
        style={styles.linearGradient}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1.5, justifyContent: 'center' }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
                paddingBottom: 10,
                fontWeight: '100'
              }}>
              Setup
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
              Connect with people
            </Text>
          </View>
          <View style={{ flex: 8, justifyContent: 'flex-start' }}>
            <Text style={{ color: 'white', paddingLeft: 20 }}>For you</Text>
            <View style={{ height: 300, borderTopWidth: 1, borderBottomWidth: 1 }}>
              <View style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Text
                  style={{
                    paddingLeft: 30,
                    color: 'white',
                    opacity: 0.5,
                    fontSize: 10,
                    paddingTop: 6,
                    paddingBottom: 6
                  }}>
                  Users
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} centerContent>
                  <SetupUser />
                  <SetupUser />
                  <SetupUser />
                  <SetupUser />
                </ScrollView>
              </View>
              <View>
                <Text
                  style={{
                    paddingLeft: 30,
                    color: 'white',
                    opacity: 0.5,
                    fontSize: 10,
                    paddingTop: 6,
                    paddingBottom: 6
                  }}>
                  Events
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} centerContent>
                  <SetupEvents />
                  <SetupEvents />
                  <SetupEvents />
                  <SetupEvents />
                </ScrollView>
              </View>
            </View>
            <Text
              style={{
                color: 'white',
                paddingLeft: 20,
                paddingTop: 4,
                paddingBottom: 4
              }}>
              Popular now
            </Text>
            <View style={{ height: 150, borderTopWidth: 1, borderBottomWidth: 1 }}>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} centerContent>
                  <SetupUser />
                  <SetupUser />
                  <SetupUser />
                  <SetupUser />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}
