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
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import fontelloConfig from '../config.json';
import { Switch } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class SettingsAbout extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.headerArrow}>
        <TouchableOpacity>
          <Customon style={styles.arrowback} name="long-arrow-left" size={30} />
        </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
        <Text style={styles.title}>Setting > About</Text>
      </View>
      </View>

      <View style={{height: 47, backgroundColor: '#ffff', padding: 20, justifyContent: 'center',  marginTop: 15, borderWidth: 1, borderColor: '#eeeeee',}}>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 15, color: '#000'}}>Terms of Service</Text>
      </View>
      <View style={{height: 47, backgroundColor: '#ffff', padding: 20, justifyContent: 'center',  borderWidth: 1, borderColor: '#eeeeee',}}>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 15, color: '#000'}}>Privacy Policy</Text>
      </View>
      <View style={{height: 47, backgroundColor: '#ffff', padding: 20, justifyContent: 'center',  borderWidth: 1, borderColor: '#eeeeee',}}>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 15, color: '#000'}}>Open Source Libraries</Text>
      </View>

      <View style={styles.logo}>
      <Image source={require('../images/Woodlig_logo.png')} />
      <Text style={styles.logoText}>Build 0.74</Text>

      <Image style={styles.altLogo} source={require('../images/woodlig-logo-alt-image.png')}  />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  altLogo:{
    width: 44,
    height: 8,

  },
  logoText:{
    fontSize: 13,
    color: '#808080',
    fontFamily: 'Poppins-Medium',


  },
  logo: {
    flex: 2,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
  //  justifyContent: 'space-between',
    //alignItems: 'center',
    flexDirection: 'row',
    padding: 15,

    shadowOffset: { width: 3, height: 0 },
    elevation: 5,

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
    flex: 1,

  },

  headerTitle: {
    flex: 2,
    //marginLeft: 35,
    //alignItems: 'center',
  justifyContent: 'center',

  },
});
