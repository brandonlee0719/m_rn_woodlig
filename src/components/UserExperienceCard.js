import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class UserExperienceCard extends Component {
  render() {
    return (
      <TouchableOpacity style={{ marginBottom: 10 }}>
        <View style={styles.singleExperience}>
          <Text style={styles.experienceTitle}>project title</Text>
          <Text style={{ color: 'black', fontSize: 13, fontWeight: '600' }}>kkkkdkkdk</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.experienceRole}>
              <Text style={{ color: '#fb0201' }}>Producer</Text>
            </View>
            <View
              style={{
                width: 6,
                height: 6,
                alignSelf: 'center',
                borderRadius: 20,
                backgroundColor: '#bfbfbf'
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text>mddmdmd</Text>
              <Text> - </Text>
              <Text>djjdjdjjd</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  singleExperience: {
    width: 323,
    paddingVertical: 20,
    shadowRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly'
  },
  experienceTitle: {
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '700',
    color: 'black',
    textTransform: 'capitalize'
  },
  experienceRole: {
    paddingHorizontal: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'red'
  },
  personalContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede'
  },
  iconStyle: {
    alignSelf: 'center'
  },
  headerStyle: { fontSize: 15, textAlign: 'right', marginRight: 20, paddingVertical: 10 },
  modalStyle: {
    height: '90%',
    backgroundColor: 'white',
    width: '90%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  title: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.18,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default UserExperienceCard;
