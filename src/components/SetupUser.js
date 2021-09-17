import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Image, Badge } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';

export default class SetupUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <View style={{ paddingLeft: 20, zIndex: 0 }}>
        <View>
          <View
            style={{
              height: 100,
              width: 120,
              backgroundColor: 'red',
              borderRadius: 40,
              zIndex: 0
            }}>
            <Badge
              value="follow"
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 3,
                opacity: 0.6
              }}
              badgeStyle={{ backgroundColor: 'black', paddingLeft: 3, paddingRight: 3 }}
            />
            <Image
              source={{ uri: 'https://www.gstatic.com/webp/gallery/2.sm.jpg' }}
              style={{ height: 100, width: 120, borderRadius: 40 }}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              height: 100,
              width: 120,
              backgroundColor: 'black',
              borderRadius: 40,
              marginTop: -70,
              zIndex: -1
            }}>
            <LinearGradient
              colors={['#CB2032', '#7A578A']}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                borderRadius: 40,
                opacity: 1
              }}>
              <Text style={{ textAlign: 'center' }}>actress</Text>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <StarRating
                  disabled={false}
                  halfStarEnabled
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                  fullStarColor="red"
                  emptyStarColor="white"
                  starSize={10}
                  containerStyle={{ display: 'flex', width: 60, paddingBottom: 2 }}
                />
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }
}
