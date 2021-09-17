import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');
class EmptyActivityStream extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          resizeMode="center"
          source={require('../images/all-seeing-owl.png')}
          style={{
            height: 330,
            width: 230
          }}
        />
        <View
          style={{
            width: 109,
            height: 32
            // marginBottom: 50
          }}>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => this.props.navigation.navigate('ExploreScreen')}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exploreButton: {
    flex: 1,
    margin: 'auto',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderColor: '#fb0201',
    borderWidth: 2,
    backgroundColor: '#ededed'
  },
  exploreText: {
    color: '#fb0201',
    fontSize: 13,
    fontWeight: '600'
  }
});

export default withNavigation(EmptyActivityStream);
