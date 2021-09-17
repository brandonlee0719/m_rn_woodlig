import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Appbar, Button, HelperText } from 'react-native-paper';
import axios from 'axios';
import { apiurl } from '../constants/config';

const { width, height } = Dimensions.get('window');

export default class UpdatePasswordScreen extends Component {
  state = {
    current_password: '',
    new_password: '',
    retype_password: '',
    loading: false
  };

  updatePassword = async () => {
    const { current_password, new_password, retype_password, loading } = this.state;
    const data = { current_password, new_password, retype_password };
    this.setState({ loading: true });
    console.log(data);
    await axios
      .post(`${apiurl}update-setting-account.php?user_id=3&type=password`, data)
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  };

  render() {
    const { current_password, new_password, retype_password, loading } = this.state;
    const length = retype_password.length < 6 || new_password.length < 6;

    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Appbar.Header>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title="Update password" subtitle="@username" />
        </Appbar.Header>
        <View
          style={{
            width,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: '#ffffff'
          }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 15 }}>Current password</Text>
            <TextInput
              mode="outlined"
              underlineColorAndroid="#3366ff"
              value={current_password}
              textContentType="password"
              secureTextEntry
              onChangeText={text => this.setState({ current_password: text })}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 15 }}>New password</Text>
            <TextInput
              mode="outlined"
              underlineColorAndroid="#3366ff"
              value={new_password}
              textContentType="newPassword"
              secureTextEntry
              onChangeText={text => this.setState({ new_password: text })}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 15 }}>Confirm password</Text>
            <TextInput
              mode="outlined"
              underlineColorAndroid="#3366ff"
              value={retype_password}
              textContentType="newPassword"
              secureTextEntry
              onChangeText={text => this.setState({ retype_password: text })}
            />
            <HelperText type="error" visible={new_password !== retype_password}>
              Passwords do not match
            </HelperText>
          </View>
        </View>
        <Button
          mode="contained"
          loading={loading}
          disabled={loading || length}
          style={styles.buttonStyle}
          onPress={this.updatePassword}>
          Press me
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: width - 100,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#3366ff'
  }
});
