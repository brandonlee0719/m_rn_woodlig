import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { imageurl } from '../constants/config';

export default class FindTalentsCard extends Component {
  sendData = () => {
    const { item, selectedItem } = this.props;
    selectedItem(item);
  };

  render() {
    const { full_name, username, picture, rating, item, selectedItem } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.sendData}>
          <View style={styles.cardTalent}>
            <ImageBackground
              source={require('../images/10-layers.png')}
              style={{ width: 276, height: 81 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 60 }}>
                <Image
                  style={styles.icAccount}
                  source={picture === '' ? require : { uri: `${imageurl}/${picture}` }}
                />

                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={parseInt(rating)}
                  starSize={15}
                  fullStarColor="red"
                  starStyle={{ width: 18, marginTop: 8 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#1c1c1c',
                    fontFamily: 'Poppins-Medium',
                    marginTop: 8
                  }}>
                  {full_name}&nbsp;
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#646464',
                    opacity: 0.8,
                    fontFamily: 'Poppins-Medium',
                    marginTop: 3
                  }}>
                  @{username}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#646464',
                    opacity: 0.8,
                    fontFamily: 'Poppins-Medium',
                    marginTop: 3
                  }}>
                  {item.city}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardTalent: {
    width: 276,
    height: 218,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    // marginBottom: 15,
    marginTop: 15
  },
  icAccount: {
    width: 70,
    height: 70,
    // marginTop: 30,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 7,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 35,
    elevation: 5
  },
  container: {
    // flex: 1,
    // backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
