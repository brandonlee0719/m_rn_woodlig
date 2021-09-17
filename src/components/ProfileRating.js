import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';

export default class ProfileRating extends Component {
  render() {
    const { rating, review, fullname, username } = this.props;
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image source={require('../images/Avatar_invisible_circle_1.png')} />
          <View>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{fullname}</Text>
            <Text>@{username}</Text>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={parseInt(rating)}
            starSize={15}
            fullStarColor="red"
            starStyle={{ width: 18 }}
            containerStyle={{ width: 15 }}
          />
          {/* <View style={{ flexDirection: 'row' }}>
                  <View>
                      <Text>23</Text>
                      <FontAwesome5 name="arrow-alt-circle-up" color="red" size={15} />
                  </View>
                  <View style={{ marginLeft: 40 }}>
                      <Text>23</Text>
                      <FontAwesome5 name="arrow-alt-circle-down" color="red" size={15} />
                  </View>
                  </View> */}
        </View>
        <View style={{ height: 1, backgroundColor: '#dedede', width: '100%' }} />
        <View style={{ paddingTop: 5 }}>
          <Text>{review}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '95%',
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    marginVertical: 5
  }
});
