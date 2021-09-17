import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,

} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import fontelloConfig from '../config.json';


import { createIconSetFromFontello } from 'react-native-vector-icons';
const Customon = createIconSetFromFontello(fontelloConfig);

export default class WalletPromotion extends Component {
  render() {
    return (
      <View style={styles.container}>

      <View style={styles.transactionBody} >

      <View style={{flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#dedede'}}>
      <View>
      <Image style={{width: 24, height: 24}}
      source={require('../images/dollar-sign-grey-hdpi.png')} />
      </View>

      <View style={{flex:1}}>
      <Text style={{ fontSize: 12, color: '#0ce0b5', marginLeft: 8,     fontFamily: 'Poppins-Medium',}}>+ $20</Text>
      <Text style={{ fontSize: 9,  color: '#9a9a9a', marginLeft: 8,fontFamily: 'Poppins-Medium'}}>Credit >Funding</Text>
      </View>

      <View>
      <Text style={{ fontSize: 9, color: '#bfbfbf', marginLeft: 8,     fontFamily: 'Poppins-Medium',}}>July 1, 2019</Text>
      <Text style={{ fontSize: 9, color: '#bfbfbf', marginLeft: 8,     fontFamily: 'Poppins-Medium', textAlign: 'right'}}>09:02:56</Text>
      </View>
      </View>
      </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  creditText:{
    // flex: 1,
  //flexDirection: 'row',
  //justifyContent: 'space-between',

  },

  creditText2:{
  //flexDirection: 'row',
  flex: 1,

  },
  transactionBody: {
    width: 348,
    height: 304,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderRadius: 21,
    backgroundColor: '#ffffff',

    //justifyContent: 'center',
    //alignItems: 'center',
    elevation: 5,
    //flexDirection: 'row',

  },
});
