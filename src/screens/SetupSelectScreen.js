/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { accountType } from '../redux/actions/accountType';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  triangleCorner: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: width,
    borderTopWidth: 400,
    borderRightColor: 'transparent',
    borderTopColor: 'black',
    zIndex: 1,
    opacity: 0.5
  },
  secondtriangle: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'dotted',
    borderRightWidth: width,
    borderTopWidth: 400,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    transform: [{ rotate: '180deg' }],
    opacity: 0.5,
    zIndex: 2
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class FirstTriangle extends Component {
  render() {
    return <View style={styles.triangleCorner} />;
  }
}

// eslint-disable-next-line react/prefer-stateless-function
class SecondTriangle extends Component {
  render() {
    return <View style={styles.secondtriangle} />;
  }
}

// eslint-disable-next-line react/prefer-stateless-function
export class SetupSelectScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ''
    };
  }

  static propTypes = {
    accountType: PropTypes.func.isRequired
  };

  componentWillUpdate(a, b) {
    const { type } = b;
    this.props.accountType(type);
  }

  render() {
    const { type } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 20 }}>Setup</Text>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
            Choose an Account Type
          </Text>
          <Text>(Pick One)</Text>
        </View>
        <View style={{ flex: 6, borderBottomWidth: 2 }}>
          <View style={{ height: 400, backgroundColor: 'black' }}>
            <FirstTriangle />
            <SecondTriangle />
            {/* <Divider style={{ transform: [{ rotate: '45deg' }], left: '50%', right: '50%', bottom: -100, position: 'absolute', zIndex: 6, height: '152%', width: 10, backgroundColor: 'red' }} /> */}
            <ImageBackground
              resizeMode="stretch"
              source={require('../images/acctType-img2.png')}
              style={{
                width,
                height: 400,
                zIndex: 4,
                opacity: 0.8
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setState({ type: 'individual' })}
                style={{
                  zindex: 7,
                  position: 'absolute',
                  top: 100,
                  left: 20
                }}>
                <Text
                  style={{
                    color: type === 'individual' ? '#0ce0b5' : 'white',
                    fontSize: 38,
                    fontWeight: 'bold',
                    paddingBottom: 30
                  }}>
                  INDIVIDUAL
                </Text>
                {type === 'individual' ? (
                  <Icon
                    name="check-circle"
                    size={30}
                    color={type === 'individual' ? '#0ce0b5' : 'white'}
                    style={{ textAlign: 'center' }}
                  />
                ) : (
                  <FontAwesome5
                    name="circle"
                    size={30}
                    color={type === 'individual' ? '#0ce0b5' : 'white'}
                    style={{ textAlign: 'center' }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setState({ type: 'business' })}
                style={{ position: 'absolute', bottom: 100, right: 20 }}>
                {type === 'business' ? (
                  <Icon
                    name="check-circle"
                    size={30}
                    color={type === 'business' ? '#0ce0b5' : 'white'}
                    style={{ textAlign: 'center' }}
                  />
                ) : (
                  <FontAwesome5
                    name="circle"
                    size={30}
                    color={type === 'business' ? '#0ce0b5' : 'white'}
                    style={{ textAlign: 'center' }}
                  />
                )}
                <Text
                  style={{
                    color: type === 'business' ? '#0ce0b5' : 'white',
                    fontSize: 38,
                    fontWeight: 'bold',
                    paddingTop: 30
                  }}>
                  BUSINESS
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { accountType }
)(SetupSelectScreen);
