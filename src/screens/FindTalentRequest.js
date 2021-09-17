/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  Modal,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import fontelloConfig from '../config.json';
import { Switch } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Customon = createIconSetFromFontello(fontelloConfig);
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Avatar } from 'react-native-paper';

export default class FindTalentRequest extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header2}>

          <View style={styles.header}>
              <TouchableOpacity>
                <Customon style={styles.arrowback} name="long-arrow-left" size={12} />
              </TouchableOpacity>
              <View>
              <Text style={styles.title}> Miracle Junaid </Text>
              </View>
              <View style={{marginLeft: -80,width: 20,height: 20, backgroundColor: '#fb0201',borderRadius:20, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 color="#fff" name="crown" size={10} />
              </View>
              <TouchableOpacity>
                <FontAwesome5 style={styles.arrowback2} name="check" size={20} />
              </TouchableOpacity>
          </View>
            <View style={styles.headerProfile}>

                <Image
                  source={require('../images/ic_account_circle_red_24px.jpg')}
                  style={{ width: 35, height: 35,  }}

                />

                    </View>
                </View>
                <View style={styles.content}>
                <TextInput
                  style={styles.TextInputStyleClass}
                  underlineColorAndroid="transparent"
                  placeholder="Seems very passionate about modelling.
                  Possible candidate for Stranger's Belt."

                  placeholderTextColor="#000"
                  multiline
                />
                </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  TextInputStyleClass: {
    // textAlign: 'left',
    marginTop: 19,
    height: 184,
    width: 400,
    textAlignVertical: 'top',
    padding: 15,
    //borderWidth: 0,
    //borderColor: '#dedede',
    // fontStyle: 'italic',
    fontSize: 13,
    // borderRadius: 20,
    backgroundColor: '#ffff'
    // height: 150,
  },
  content: {
    width:Dimensions.get('window').width,
    padding: 10,
    borderTopColor: '#cccc',
    borderTopWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
    },
  title:{
    fontSize: 13,
    color: '#000',
    fontFamily: 'Poppins-Medium'
    },
  headerProfile:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3
  },
  header: {
    width: Dimensions.get('window').width,
    height: 40,
    //backgroundColor: '#ffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    shadowOffset: { width: 3, height: 0 },
    //elevation: 5,
  },

    header2: {
      width: Dimensions.get('window').width,
      height: 65,
      backgroundColor: '#ffff',
      //justifyContent: 'space-between',
      //alignItems: 'center',
      //flexDirection: 'row',
      //padding: 15,
      paddingTop: 10,
      shadowOffset: { width: 3, height: 0 },
      elevation: 5,
  },
  titleHeader: {
    //  width: 375,
    //marginTop: 20,
    height: 112,
    backgroundColor: '#ffffff',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,

  },

  arrowback2: {
    color: '#000',
  },
  arrowback: {
    color: '#000',
  },

  headerArrow: {
    flex: 1,

  },

  headerTitle: {
    flex: 2,
    marginLeft: 35,
    //alignItems: 'center',
    justifyContent: 'center',

  },

});
