import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

// eslint-disable-next-line react/prefer-stateless-function
export default class WelcomeScreen extends Component {
  render() {
    return (
      <ImageBackground source={require('../images/bg.png')} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 30 }}>
          <View style={{ flex: 2.5 }}>
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <Image source={require('../images/woodlig_brand_white.png')} />
            </View>
            <View style={{ flex: 3.5, justifyContent: 'space-around' }}>
              <Image source={require('../images/Woodlig_logo.png')} style={{ marginTop: 50 }} />
              <View style={{ marginTop: -50 }}>
                <Text style={styles.motto}>The Lig</Text>
                <Text style={styles.motto}>of Stars</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <View style={{ flex: 2, justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.hrStyle} />
                <Text style={{ color: '#dedede', fontSize: 15, fontWeight: 'bold' }}>OR</Text>
                <View style={styles.hrStyle} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <TouchableOpacity>
                  <Image style={styles.iconStyle} source={require('../images/Google_icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.iconStyle} source={require('../images/Facebook_icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.iconStyle} source={require('../images/Twitter_icon.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.footer}> By signing up you agree to our</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[styles.footer, { textDecorationLine: 'underline' }]}>
                  Terms of Service
                </Text>
                <Text style={styles.footer}>&nbsp;&&nbsp;</Text>
                <Text style={[styles.footer, { textDecorationLine: 'underline' }]}>
                  Privacy Policy
                </Text>
              </View>
            </View>
            <View />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  motto: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'Forte'
  },
  buttonStyles: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: 300,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
  hrStyle: {
    height: 1,
    backgroundColor: '#dedede',
    width: 130,
    alignSelf: 'center'
  },
  footer: {
    color: 'black',
    fontWeight: 'bold'
  },
  iconStyle: {
    height: 54,
    width: 54
  }
});
