import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { Text, View, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../utils/config';
import { loginAuth } from '../redux/actions/loginAuth';
import { apiurl, localurl } from '../constants/config';
import { userId } from '../redux/actions/userId';
import { profilePicture, getUsername } from '../redux/actions/profilePicture';

const { width, height } = Dimensions.get('window');
// eslint-disable-next-line react/prefer-stateless-function
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: '',
      password: '',
      type: 'email',
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.fieldDetail = this.fieldDetail.bind(this);
  }

  async onSubmit() {
    const { field, password, type } = this.state;
    const details = { field, password, type };
    try {
      if (password.length < 6) {
        throw 'password is too short';
      } else {
        this.setState({ loading: true });
        await axios
          .post(`${apiurl}login.php`, details)
          .then(res => {
            console.log(res.data);
            this.setState({ loading: false });
            if (res.data.status === 'error') {
              Toast.show(res.data.message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
                textColor: 'white'
              });
            } else if (res.data.status === 'success') {
              this.props.userId(res.data.id);
              this.props.profilePicture(res.data.profile_picture);
              this.props.getUsername(res.data.username);
              this.setState({ loading: false });
              this.props.navigation.navigate('Navigator');
            } else {
              this.setState({ loading: false });
              Toast.show('please try again', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red',
                textColor: 'white'
              });
            }
          })
          .catch(() => {
            this.setState({ loading: false });
            Toast.show('Network error', {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
              backgroundColor: 'red',
              textColor: 'white'
            });
          });
        // this.props.loginAuth(details);
      }
      // end else
    } catch (error) {
      console.log(error);
      Toast.show(error, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red',
        textColor: 'white'
      });
    }
    // console.log(details)
  }

  fieldDetail(e) {
    const { field } = this.state;
    this.setState({ field: e });
    if (field.includes('@')) {
      this.setState({ type: 'email' });
    } else if (field.includes('@') === false) {
      this.setState({ type: 'username' });
    }
  }

  render() {
    const { field, loading } = this.state;
    return (
      <ScrollView contentContainerStyle={{ height: height - 180 }}>
        <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
          <View style={{ flex: 10, justifyContent: 'space-around' }}>
            <TextInput
              placeholder="Email or Username"
              label="email or username"
              value={field}
              onChangeText={this.fieldDetail}
              style={[styles.textInput, { marginTop: 40 }]}
            />
            <TextInput
              onChangeText={password => this.setState({ password })}
              placeholder="password"
              secureTextEntry
              textContentType="password"
              style={[styles.textInput]}
            />
            <View style={{ alignItems: 'center' }}>
              {!loading ? (
                <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={1} style={styles.button}>
                  <Progress.CircleSnail
                    color="white"
                    size={20}
                    indeterminate
                    indeterminateAnimationDuration={4000}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <Text
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                style={{
                  color: 'red',
                  fontSize: 15,
                  marginLeft: '10%',
                  paddingBottom: 30
                }}>
                Forgot Password?
              </Text>
              <View style={styles.hrStyle} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
                alignSelf: 'center'
              }}>
              <TouchableOpacity>
                <Image style={styles.linkStyles} source={require('../images/Google_icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.linkStyles} source={require('../images/Facebook_icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.linkStyles} source={require('../images/Twitter_icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    height: 52,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    shadowColor: 'red'
  },
  button: {
    width: '80%',
    height: 52,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  hrStyle: {
    height: 1,
    width: '80%',
    backgroundColor: '#dedede',
    alignSelf: 'center'
  },
  linkStyles: {
    height: 40,
    width: 40
  }
});

const mapStateToProps = state => ({
  signin: state.login.response
});

export default connect(
  mapStateToProps,
  { userId, profilePicture, getUsername }
)(LoginScreen);
