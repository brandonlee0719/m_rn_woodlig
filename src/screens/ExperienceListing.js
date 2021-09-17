import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
// import { Header, Avatar } from 'react-native-elements';
import { Appbar, Avatar } from 'react-native-paper';
import UserExperienceCard from '../components/UserExperienceCard';

class ExperienceListing extends Component {
  render() {
    return (
      <View>
        <Appbar.Header style={{ height: 110, justifyContent: 'space-between' }}>
          <Appbar.BackAction onPress={this._goBack} />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity>
              <Avatar.Image source={require('../images/Avatar_invisible_circle_1.png')} />
            </TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Name of Person</Text>
          </View>
          <Appbar.Action />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.scrollStyle}>
          <Text style={{ color: 'black', fontSize: 20, marginLeft: 20, fontWeight: '700' }}>
            Experience
          </Text>
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
          <UserExperienceCard />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    // height: 8,
    // width: 8,
    backgroundColor: 'gold',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollStyle: {
    marginTop: 20,
    paddingBottom: -20,
    width: '90%',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#f5f5f5'
  }
});

export default ExperienceListing;
