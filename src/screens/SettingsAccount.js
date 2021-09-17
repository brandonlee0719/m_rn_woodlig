import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { apiurl } from '../constants/config';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');
export default class SettingsAccount extends Component {
  state = {
    email: '',
    username: '',
    emailFieldStatus: false,
    usernameFieldStatus: false
  };

  updateEmail = async () => {
    const { emailFieldStatus, email } = this.state;
    if (emailFieldStatus === false) {
      this.setState({ emailFieldStatus: true });
      this.FirstInput.focus();
    } else {
      Keyboard.dismiss();
      await axios
        .get(`${apiurl}update-setting-account.php?user_id=31&type=email&email=${email}`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
      this.setState({ emailFieldStatus: false });
    }
  };

  updateUsername = async () => {
    const { usernameFieldStatus, username } = this.state;
    if (usernameFieldStatus === false) {
      this.setState({ usernameFieldStatus: true });
      this.usernameInput.focus();
    } else {
      Keyboard.dismiss();
      await axios
        .get(`${apiurl}update-setting-account.php?user_id=31&type=username&username=${username}`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
      this.setState({ usernameFieldStatus: false });
    }
  };

  render() {
    const { emailFieldStatus, email, username, usernameFieldStatus } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Customon
              style={styles.arrowback}
              name="long-arrow-left"
              size={15}
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.title}> Setting > Account</Text>
          <TouchableOpacity>
            <FontAwesome5 style={styles.arrowback} name="ellipsis-v" size={15} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.verify}>
          <View style={{ flex: 3 }}>
            <Text style={styles.verifyText}>
              Your account is not yet verified! We can't secure your data until you do.
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.buttoncontainer}>
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: 'Poppins-Medium',
                  color: '#ffffff'
                }}>
                {' '}
                Verify Now{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.bodyExperience}>
          <View style={styles.activeComponent}>
            <View style={styles.wrapper}>
              <Text style={styles.activeText}>Email</Text>
              <TextInput
                ref={ref => {
                  this.FirstInput = ref;
                }}
                onChangeText={text => this.setState({ email: text })}
                value={email}
                textContentType="emailAddress"
                autoCompleteType="email"
                placeholder="hj.productions@hotmail.com"
                style={[styles.activeText2, { width: width - 120 }]}
              />
              {/* <Text style={styles.activeText2}>hj.productions@hotmail.com</Text> */}
            </View>
            {emailFieldStatus === false ? (
              <TouchableOpacity style={styles.buttoncontainer2} onPress={this.updateEmail}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    color: '#000'
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.buttoncontainer2, { backgroundColor: '#fb0201' }]}
                onPress={this.updateEmail}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    color: '#fff'
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.activeComponent}>
            <View style={styles.wrapper}>
              <Text style={styles.activeText}>Username</Text>
              {/* <Text style={styles.activeText2}>@UcheTheGoat</Text> */}
              <TextInput
                ref={ref => {
                  this.usernameInput = ref;
                }}
                onChangeText={text => this.setState({ username: text })}
                value={username}
                placeholder="@uchethegreat"
                style={[styles.activeText2, { width: width - 120 }]}
              />
            </View>
            {usernameFieldStatus === false ? (
              <TouchableOpacity style={styles.buttoncontainer2} onPress={this.updateUsername}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    color: '#000'
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.buttoncontainer2, { backgroundColor: '#fb0201' }]}
                onPress={this.updateUsername}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    color: '#fff'
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.activeComponent}>
            <View style={styles.wrapper}>
              <Text style={styles.activeText}>Password</Text>
              <Text style={styles.activeText2}>********</Text>
            </View>
            <TouchableOpacity style={styles.buttoncontainer2}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Poppins-Medium',
                  color: '#000'
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bodyExperience2}>
          <View style={styles.activeComponent}>
            <Text style={styles.activeText}>Facebook</Text>

            <TouchableOpacity style={styles.buttoncontainer2}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Poppins-Medium',
                  color: '#000'
                }}>
                Link
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activeComponent}>
            <Text style={styles.activeText}>Google</Text>

            <TouchableOpacity style={styles.buttoncontainer3}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Poppins-Medium',
                  color: '#000'
                }}>
                Linked
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.activeComponent}>
          <Text style={styles.activeText}>Twitter</Text>

          <TouchableOpacity style={styles.buttoncontainer2}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Poppins-Medium',
                color: '#000'
              }}>
              Link
            </Text>
          </TouchableOpacity>
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
  bodyExperience: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginTop: 15
  },

  bodyExperience2: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginTop: 15
  },

  activeComponent: {
    width: Dimensions.get('window').width,

    height: 78,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  activeText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#000'
  },
  activeText2: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#808080'
  },

  verifyText: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 11
    // width: 195,
    // flexWrap: 'wrap',
  },

  buttoncontainer2: {
    width: 80,
    height: 25,
    borderRadius: 25,
    borderColor: '#d1d1d1',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttoncontainer3: {
    width: 80,
    height: 25,
    borderRadius: 25,
    borderColor: '#0ce0b5',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttoncontainer: {
    width: 71,
    height: 24,
    backgroundColor: '#fb0201',
    shadowRadius: 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000'
  },

  buttontext: {
    color: '#ffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 13
  },

  verify: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    marginTop: 15,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: '#ffff',
    padding: 10
  },
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  }
});
