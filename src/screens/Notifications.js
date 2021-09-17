import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Dropdown } from "react-native-material-dropdown";
import NotificationProfileImage from "../components/notifications/NotificationProfileImage";
import NotificationStatus from "../components/notifications/NotificationStatus";
import NotificationImage from "../components/notifications/NotificationImage";
import NotificationHidden from "../components/notifications/NotificationHidden";
import NotificationFollow from "../components/notifications/NotificationFollow";
import NotificationRating from "../components/notifications/NotificationRating";
import NotificationApplication from "../components/notifications/NotificationApplication";
import NotificationLike from "../components/notifications/NotificationLike";
import NotificationPost from "../components/notifications/NotificationPost";
import fontelloConfig from '../config.json';
import { Switch } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Customon = createIconSetFromFontello(fontelloConfig);
export default class Notifications extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />
        <View style={styles.header}>
          <View style={styles.headerArrow}>
            <TouchableOpacity>
              <Customon style={styles.arrowback} name="long-arrow-left" size={15}
                onPress={() => this.props.navigation.goBack()}
                 />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Notifications</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationStatus />
            </View>

            <View style={styles.image}>
              <NotificationImage />
            </View>
          </View>

          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationHidden />
            </View>

            <View style={styles.image} />
          </View>

          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationFollow />
            </View>
          </View>

          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationRating />
            </View>

            <View style={styles.image} />
          </View>

          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationRating />
            </View>

            <View style={styles.image}>
              <NotificationImage />
            </View>
          </View>

          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationApplication />
            </View>

            <View style={styles.image} />
          </View>

          <View style={styles.notification}>
            <View style={styles.wrapper}>
              <NotificationProfileImage />
              <NotificationApplication />
            </View>

            <View style={styles.image} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flexDirection: 'row'
  },
  notification: {
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: '#eeeeee',
    paddingRight: 15,
    paddingLeft: 8,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
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
