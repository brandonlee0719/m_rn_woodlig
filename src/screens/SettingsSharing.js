import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import { Switch } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import fontelloConfig from "../config.json";

const Customon = createIconSetFromFontello(fontelloConfig);

export default class SettingsSharing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerArrow}>
            <TouchableOpacity>
              <Customon
                style={styles.arrowback}
                name="long-arrow-left"
                size={15}
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Setting > Sharing</Text>
          </View>
        </View>

        <View
          style={{
            height: 47,
            backgroundColor: '#ffff',
            padding: 20,
            justifyContent: 'center',
            marginTop: 15
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 15,
              color: '#000'
            }}>
            Invite your Contacts
          </Text>
        </View>

        <View style={styles.activeComponent}>
          <View style={styles.wrapper}>
            <Text style={styles.activeText}>Social media reference</Text>
            <Text style={styles.activeText2}>
              Invite contacts from your social media accounts and boost your profile
            </Text>
          </View>

          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <TouchableOpacity style={styles.buttoncontainer2}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Medium',
                    color: '#ffff'
                  }}>
                  {' '}
                  Participate
                </Text>
              </View>
              <View style={{ marginLeft: 8 }}>
                <Customon style={styles.arrowright} name="long-arrow-right" size={17} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },

  wrapper: {
    flex: 3
  },

  activeComponent: {
    width: Dimensions.get('window').width,

    height: 110,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row'
    // justifyContent: 'space-between',
  },

  activeText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#000'
  },
  activeText2: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    width: 223
  },

  verifyText: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 15
    // width: 195,
    // flexWrap: 'wrap',
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
  arrowright: {
    color: '#ffff'
  },
  headerArrow: {
    flex: 1
  },

  headerTitle: {
    flex: 2,
    // marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  },

  buttoncontainer2: {
    width: 110,
    height: 24,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: -3 },
    shadowRadius: 6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    backgroundColor: '#fb0201',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5
  }
});
