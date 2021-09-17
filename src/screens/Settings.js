import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor="white" barStyle="dark-content" />
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
            <Text style={styles.title}> Settings </Text>
            <Image
              source={require('../images/ic_account_circle_24px.jpg')}
              style={{ width: 68, height: 68, marginTop: 8 }}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.greyComponent}>
            <Text style={styles.greyText}>Me </Text>
          </View>
          <TouchableOpacity
            style={styles.activeComponent}
            onPress={() => this.props.navigation.navigate('SettingsProfile')}
          >
            <Text style={styles.activeText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.activeComponent}
            onPress={() => this.props.navigation.navigate('SettingsAccount')}
          >
            <Text style={styles.activeText}>Account</Text>
          </TouchableOpacity>
          <View style={styles.greyComponent}>
            <Text style={styles.greyText}>General </Text>
          </View>
          <TouchableOpacity
            style={styles.activeComponent}
            onPress={() => this.props.navigation.navigate('SettingsNotifications')}>
            <Text style={styles.activeText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.activeComponent}
            onPress={() => this.props.navigation.navigate('SettingsPrivacy')}
          >
            <Text style={styles.activeText}>Privacy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.activeComponent}
            onPress={() => this.props.navigation.navigate('SettingsSharing')}
          >
            <Text style={styles.activeText}>Sharing</Text>
          </TouchableOpacity>
          <View style={styles.greyComponent}>
            <Text style={styles.greyText}>Info & Legal </Text>
          </View>
          <TouchableOpacity
            style={styles.activeComponent}
            onPress={() => this.props.navigation.navigate('SettingsHelp')}
          >
            <Text style={styles.activeText}>Help</Text>
          </TouchableOpacity>

          <View style={styles.activeComponentAbout}>
            <Text style={styles.activeText}>About</Text>

            <Image
              source={require('../images/Woodlig_logo.png')}
              style={{ width: 59, height: 15, marginLeft: 6, marginTop: 4 }}
            />
          </View>

          <View style={styles.activeComponentLogout}>
            <Text style={styles.activeText}>Logout</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  activeComponentLogout: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    height: 47,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eeeeee',
    padding: 10,
    marginBottom: 15
  },

  activeComponentAbout: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    height: 47,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eeeeee',
    padding: 10
  },
  activeComponent: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    height: 47,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eeeeee',
    padding: 10
  },

  greyComponent: {
    padding: 10
  },
  greyText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#808080'
  },

  activeText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#000'
  },

  headerArrow: {
    flex: 2
  },

  headerTitle: {
    flex: 3,

    justifyContent: 'center'
  },
  header: {
    width: Dimensions.get('window').width,
    height: 159,
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
  imageProfile: {
    width: 68,
    height: 68
  }
});
