import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');
// eslint-disable-next-line react/prefer-stateless-function
class SetupWelcomeScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true)
  }
  render() {
    return (
      <ImageBackground source={require('../images/welcomesetup.webp')} style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <View style={styles.buttonPosition}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Navigator')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  buttonPosition: {
    position: 'absolute',
    bottom: 20,
    left: width / 2 - 50
  },
  buttonStyle: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 30,
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'red'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(SetupWelcomeScreen);
