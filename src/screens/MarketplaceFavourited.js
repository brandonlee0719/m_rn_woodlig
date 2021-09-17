/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Customon = createIconSetFromFontello(fontelloConfig);
import fontelloConfig from '../config.json';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { TabNavigator } from 'react-navigation';
import Favourited from '../components/Favourited.js';
import PostedAdvert from '../components/PostedAdvert.js';


export default class MarketplaceFavourited extends Component {
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />
      <View style={styles.header}>
        <View style={styles.headerArrow}>
          <TouchableOpacity>
            <Customon style={styles.arrowback} name="long-arrow-left" size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Marketplace</Text>
        </View>
      </View>
      <View style={{ padding: 15,flexDirection: 'row',
      backgroundColor: '#ffffff', shadowColor: 'rgba(0, 0, 0, 1)', elevation: 3, shadowOffset: { width: 3, height: 0 },}}>

  <View style={{flex: 1, borderRightWidth: 1,  borderRightColor: '#e7e4e9',}}>
      <TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome5 style={styles.like} name="heart" size={21} color="#fe0000" />
        <Text style={styles.titleTab}>  Favourited </Text>
          </View>
      </TouchableOpacity>
  </View>

      <View style={{flex: 1,borderLeftWidth: 1,  borderLeftColor: '#e7e4e9',}}>
      <TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome5 style={styles.like} name="file-upload" size={21} color="#fe0000" />
      <Text style={styles.titleTab}>  Posted Adverts </Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
<ScrollView horizontal = {true} pagingEnabled= {true}>
      <Favourited/>
      <PostedAdvert/>
      </ScrollView>
</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleTab: {
        color: '#fb0201',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        marginTop: 8,
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
  //  elevation: 5
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
