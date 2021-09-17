import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import { Switch } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import fontelloConfig from '../config.json';
import { apiurl } from '../constants/config';

const Customon = createIconSetFromFontello(fontelloConfig);

class SettingsPrivacy extends Component {
  state = {
    settingsData: [],
    private_account: '0',
    incognito_mode: '0',
    read_receipts: '0',
    receive_messages: '',
    receive_voice_calls: '',
    receive_video_calls: ''
  };

  componentDidMount() {
    const { user_id } = this.props;
    axios
      .get(`${apiurl}fetch-setting-privacy.php?user_id=${user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          settingsData: res.data,
          incognito_mode: res.data.user_privacy_settings.incognito_mode,
          private_account: res.data.user_privacy_settings.private_account,
          read_receipts: res.data.user_privacy_settings.read_receipts,
          receive_messages: res.data.user_privacy_settings.receive_messages,
          receive_voice_calls: res.data.user_privacy_settings.receive_voice_calls,
          receive_video_calls: res.data.user_privacy_settings.receive_video_calls
        });
      })
      .catch(res => console.log(res.data));
  }

  readReceipts = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ read_receipts: '0' });
      axios
        .get(`${apiurl}update-setting-privacy.php?user_id=${user_id}&type=read_receipts&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ read_receipts: '1' });
      axios
        .get(`${apiurl}update-setting-privacy.php?user_id=${user_id}&type=read_receipts&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  incognitoMode = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ incognito_mode: '0' });
      axios
        .get(`${apiurl}update-setting-privacy.php?user_id=${user_id}&type=incognito_mode&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ incognito_mode: '1' });
      axios
        .get(`${apiurl}update-setting-privacy.php?user_id=${user_id}&type=incognito_mode&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  privateAccount = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ private_account: '0' });
      axios
        .get(`${apiurl}update-setting-privacy.php?user_id=${user_id}&type=private_account&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ private_account: '1' });
      axios
        .get(`${apiurl}update-setting-privacy.php?user_id=${user_id}&type=private_account&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  receiveMessages = value => {
    const { user_id } = this.props;
    this.setState({ receive_messages: value });
    axios
      .get(
        `${apiurl}update-setting-privacy.php?user_id=${user_id}&type=receive_messages&value=${value}`
      )
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  };

  receiveVoiceCalls = value => {
    const { user_id } = this.props;
    this.setState({ receive_voice_calls: value });
    axios
      .get(
        `${apiurl}update-setting-privacy.php?user_id=${user_id}&type=receive_voice_calls&value=${value}`
      )
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  };

  receiveVideoCalls = value => {
    const { user_id } = this.props;
    this.setState({ receive_video_calls: value });
    axios
      .get(
        `${apiurl}update-setting-privacy.php?user_id=${user_id}&type=receive_video_calls&value=${value}`
      )
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
  };

  render() {
    const {
      settingsData,
      private_account,
      incognito_mode,
      read_receipts,
      receive_messages,
      receive_voice_calls,
      receive_video_calls
    } = this.state;
    const data = [
      {
        value: 'Everyone'
      },
      {
        value: 'Only People I Follow'
      }
    ];

    const data3 = [
      {
        value: 'Everyone'
      },
      {
        value: 'Only People I Follow'
      },
      {
        value: 'No One'
      }
    ];
    if (settingsData.length !== 0) {
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
              <Text style={styles.title}> Setting > Privacy</Text>
            </View>
          </View>

          <View style={styles.greyComponent}>
            <Text style={styles.greyText}>Discoverability </Text>
          </View>

          <View style={styles.activeComponent2}>
            <View style={styles.wrapper}>
              <Text style={styles.verifyText}>Private Acount</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Switch
                onValueChange={this.privateAccount}
                onTintColor="#0ce0b5"
                style={{
                  height: 15,
                  marginRight: 10
                }}
                thumbTintColor="#cccc"
                tintColor="#000"
                value={private_account !== '0'}
              />
            </View>
          </View>
          <View style={styles.activeComponent}>
            <View style={styles.wrapper}>
              <Text style={styles.verifyText}>Incognito Mode</Text>
              <Text style={styles.activeText2}>
                Don't allow others to see you in search results
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Switch
                onValueChange={this.incognitoMode}
                onTintColor="#0ce0b5"
                style={{
                  height: 15,
                  marginRight: 10
                }}
                thumbTintColor="#cccc"
                tintColor="#000"
                value={incognito_mode !== '0'}
              />
            </View>
          </View>

          <View style={styles.greyComponent}>
            <Text style={styles.greyText}>Connectivity </Text>
          </View>

          <View style={styles.activeComponent}>
            <View style={styles.wrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Text style={styles.verifyText}>Read receipts</Text>
                <Switch
                  onValueChange={this.readReceipts}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={read_receipts !== '0'}
                />
              </View>
              <Text style={styles.activeText2}>
                Allow others to see if you have read their messages or not
              </Text>
            </View>
            {/* <View style={{ flex: 1 }}>
            
          </View> */}
          </View>

          <View
            style={{
              backgroundColor: '#ffff',
              paddingLeft: 20,
              paddingRight: 20
            }}>
            <Dropdown
              label="Recieve messages from"
              data={data}
              value={receive_messages}
              onChangeText={this.receiveMessages}
            />
          </View>

          <View
            style={{
              backgroundColor: '#ffff',
              paddingLeft: 20,
              paddingRight: 20
            }}>
            <Dropdown
              label="Recieve voice calls from"
              data={data}
              value={receive_voice_calls}
              onChangeText={this.receiveVoiceCalls}
            />
          </View>

          <View
            style={{
              backgroundColor: '#ffff',
              paddingLeft: 20,
              paddingRight: 20
            }}>
            <Dropdown
              label="Recieve videos calls from"
              data={data3}
              value={receive_video_calls}
              onChangeText={this.receiveVideoCalls}
            />
          </View>

          <View style={styles.blockedAccount}>
            <Text style={styles.verifyText}>Blocked accounts</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
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
    paddingLeft: 10
  },

  verifyText: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 15
    // width: 195,
    // flexWrap: 'wrap',
  },

  activeText2: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#808080'
  },

  activeComponent: {
    width: Dimensions.get('window').width,

    height: 78,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  blockedAccount: {
    width: Dimensions.get('window').width,

    height: 47,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 18,
    paddingTop: 10,
    marginTop: 15
    // marginTop: 17,   flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  activeComponent2: {
    width: Dimensions.get('window').width,

    height: 47,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    // marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  greyComponent: {
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 10
  },
  greyText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#808080'
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

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(SettingsPrivacy);
