import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, ScrollView, Text, View, StatusBar, Keyboard, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import HomeScreen from './HomeScreen';
import SetupSelectScreen from './SetupSelectScreen';
import BusinessSetupFormScreen from './BusinessSetupFormScreen';
import IndividualSetupFormScreen from './IndividualSetupFormScreen';
import SetupRolesScreen from './SetupRolesScreen';
import SetupRolesBusiness from './SetupRolesBusiness';

import fontelloConfig from '../config.json';
import IndividualChooseSkill from './IndividualChooseSkill';
import BusinessChooseSkill from './BusinessChooseSkill';

const Customon = createIconSetFromFontello(fontelloConfig);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  swiper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

// eslint-disable-next-line react/prefer-stateless-function
export class SetupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { kbd: false };
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
  }

  // static propTypes = {
  //   accounttype: PropTypes.string.isRequired,
  // };
  // componentDidUpdate() {
  //   console.log(this.props.accounttype);
  // }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({ kbd: true });
  }

  keyboardDidHide() {
    this.setState({ kbd: false });
  }

  render() {
    return (
      <Swiper
        scrollEnabled={false}
        showsPagination={!this.state.kbd}
        showsButtons={this.props.accounttype !== ''}
        buttonWrapperStyle={{
          display: 'flex',
          alignItems: 'flex-end',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 40
        }}
        nextButton={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 80,
              backgroundColor: 'red',
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              borderTopLeftRadius: 100,
              borderBottomLeftRadius: 100
            }}>
            <Text style={{ color: 'white' }}>NEXT </Text>
            <Customon name="arrow-right-endgame" color="white" />
          </View>
        }
        prevButton={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 80,
              backgroundColor: 'red',
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              borderTopRightRadius: 100,
              borderBottomRightRadius: 100
            }}>
            <Customon name="arrow-left-endgame" color="white" />
            <Text style={{ color: 'white' }}> PREV</Text>
          </View>
        }
        paginationStyle={{ position: 'absolute', bottom: 50 }}
        loop={false}
        style={styles.swiper}
        activeDotColor="red"
        dotColor="grey">
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
          <SetupSelectScreen />
        </View>
        <View style={{ flex: 1 }}>
          {this.props.accounttype === 'business' ? (
            <BusinessSetupFormScreen />
          ) : (
            <IndividualSetupFormScreen />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {this.props.accounttype === 'business' ? (
            <BusinessChooseSkill />
          ) : (
            <IndividualChooseSkill />
          )}
        </View>
      </Swiper>
    );
  }
}

const mapStateToProps = state => ({
  accounttype: state.accounttype.acctype
});

export default connect(mapStateToProps)(SetupScreen);
