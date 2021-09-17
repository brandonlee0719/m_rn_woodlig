import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ImageBackground,
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import HeaderComponent from '../components/HeaderComponent';
import WalletPromotion from '../components/WalletPromotion';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class Wallet extends Component {
  render() {
    const { navigation } = this.props;
    const profiledetails = navigation.getParam('profiledetails');
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} />
        <HeaderComponent />
        <ScrollView>
          <View style={styles.balance}>
            <View style={styles.balanceInner}>
              <Text style={styles.textB}>Total Balance</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  style={{ width: 30, height: 31 }}
                  source={require('../images/Group1372.png')}
                />

                <Text style={styles.textC}>0 USD</Text>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{
                    marginTop: 10,
                    width: 166,
                    height: 2,
                    borderColor: '#f5f5f5',
                    borderStyle: 'solid',
                    borderWidth: 1
                  }}
                />
                <View style={styles.infoC}>
                  <FontAwesome5 name="info-circle" size={14} />
                  <TouchableOpacity>
                    <Text style={styles.textL}> Learn more</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <ImageBackground style={styles.cardBg} source={require('../images/card-template.png')}>
              <View style={styles.cardInner}>
                <Text style={styles.cardText}>{profiledetails.full_name}</Text>
                <View
                  style={{
                    height: 98,
                    alignItems: 'flex-end',
                    marginRight: 20,
                    justifyContent: 'flex-end',
                    flexDirection: 'row'
                  }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('AddFunds')}>
                    <View style={styles.addFunds}>
                      <FontAwesome5 name="fingerprint" color="#ffff" size={14} />
                      <Text style={styles.addFundsBtn}>ADD FUNDS</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.transactionText}>
            <Text> Transaction History </Text>
          </View>
          <View style={styles.transactionBodyContainer}>{/* <WalletPromotion /> */}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  addFundsBtn: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#ffffff',
    // marginTop: 75,
    marginLeft: 8,
    fontSize: 10
  },

  addFunds: {
    width: 99,
    height: 34,
    shadowColor: '#000',
    // shadowOffset: { width: 6, height: 0 },
    shadowRadius: 19,
    borderRadius: 25,
    backgroundColor: '#fb0201',
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cardBg: {},

  cardText: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#ffffff',
    marginTop: 75,
    marginLeft: 33,
    fontSize: 12
  },
  infoC: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 30
  },
  textL: {
    color: '#aeaeae',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 9
  },

  textB: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 9
  },
  textC: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 20
    // padding: 8,
  },
  transactionBodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },

  transactionText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },

  cardInner: {
    shadowColor: '#000',
    shadowOffset: { width: 12, height: 0 },
    // shadowRadius: 19,
    // borderRadius: 13,
    // backgroundColor: 'red',
    // borderWidth: 2,
    // borderColor: '#000',
    width: 348,
    height: 218,
    elevation: 5
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  balance: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },

  balanceInner: {
    width: 209,
    height: 110,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 13,
    backgroundColor: '#ffffff',
    elevation: 5,
    padding: 8

    // borderWidth: 2,
    // borderColor: '#000',
    // flex: 1,
  },
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    padding: 15,

    shadowOffset: { width: 3, height: 0 },
    elevation: 5
  },

  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },

  arrowback: {
    color: '#000'
  },

  headerArrow: {
    flex: 1
  },

  headerTitle: {
    flex: 2,
    // marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  }
});
