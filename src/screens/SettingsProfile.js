/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  TextInput
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { Snackbar, Switch, Portal, Modal } from 'react-native-paper';
import axios from 'axios';
import { Avatar } from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import fontelloConfig from '../config.json';
import SetupRolesTick from '../components/SetupRolesTick';
import { apiurl, imageurl } from '../constants/config';

const Customon = createIconSetFromFontello(fontelloConfig);

class SettingsProfile extends Component {
  state = {
    full_name: '',
    date_of_birth: '',
    address: '',
    gender: '',
    marital_status: '',
    email: '',
    phone_1: '',
    website: '',
    description: '',
    birthday_display: '',
    location_display: '',
    gender_display: '',
    marital_status_display: '',
    email_display: '',
    phone_display: '',
    website_display: '',
    hype_meter_display: '',
    visible: false,
    status: '',
    pickerVisible: false,
    type: '',
    profile_photo: '',
    cover_photo: ''
  };

  componentDidMount() {
    const { user_id } = this.props;
    axios
      .get(`${apiurl}fetch-user-profile.php?user_id=${user_id}&user_profile_id=${user_id}`)
      .then(res => {
        this.setState({ data: res.data });
        this.setState({ full_name: res.data.data.full_name });
        this.setState({ profile_photo: res.data.data.profile_picture });
        this.setState({ cover_photo: res.data.data.cover_picture });
        this.setState({ date_of_birth: res.data.data.date_of_birth });
        this.setState({ address: res.data.data.address });
        this.setState({ gender: res.data.data.gender });
        this.setState({ marital_status: res.data.data.marital_status });
        this.setState({ email: res.data.data.email });
        this.setState({ phone_1: res.data.data.phone_1 });
        this.setState({ website: res.data.data.website });
        this.setState({ description: res.data.data.bio });
      })
      .catch(res => console.log(res.data));

    axios
      .get(`${apiurl}fetch-setting-profile.php?user_id=${user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ settings_profile: res.data.settings_profile });
        this.setState({
          birthday_display: res.data.settings_profile.birthday_display
        });
        this.setState({
          location_display: res.data.settings_profile.location_display
        });
        this.setState({
          gender_display: res.data.settings_profile.gender_display
        });
        this.setState({
          marital_status_display: res.data.settings_profile.marital_status_display
        });
        this.setState({
          email_display: res.data.settings_profile.email_display
        });
        this.setState({
          phone_display: res.data.settings_profile.phone_display
        });
        this.setState({
          website_display: res.data.settings_profile.website_display
        });
        this.setState({
          hype_meter_display: res.data.settings_profile.hype_meter_display
        });
      })
      .catch(res => console.log(res.data));
  }

  birthdayDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ birthday_display: '0' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=birthday_display&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ birthday_display: '1' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=birthday_display&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  locationDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ location_display: '0' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=location_display&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ location_display: '1' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=location_display&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  genderDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ gender_display: '0' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=gender_display&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ gender_display: '1' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=gender_display&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  maritalStatusDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ marital_status_display: '0' });
      axios
        .get(
          `${apiurl}update-setting-profile.php?user_id=${user_id}&type=marital_status_display&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ marital_status_display: '1' });
      axios
        .get(
          `${apiurl}update-setting-profile.php?user_id=${user_id}&type=marital_status_display&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  emailDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ email_display: '0' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=email_display&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ email_display: '1' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=email_display&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  phoneDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ phone_display: '0' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=phone_display&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ phone_display: '1' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=phone_display&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  websiteDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ website_display: '0' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=website_display&value=0`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ website_display: '1' });
      axios
        .get(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=website_display&value=1`)
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  hypeMeterDisplay = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ hype_meter_display: '0' });
      axios
        .get(
          `${apiurl}update-setting-profile.php?user_id=${user_id}&type=hype_meter_display&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ hype_meter_display: '1' });
      axios
        .get(
          `${apiurl}update-setting-profile.php?user_id=${user_id}&type=hype_meter_display&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  fromGallery = () => {
    const { type } = this.state;
    const { user_id } = this.props;
    const body = new FormData();
    this.setState({ pickerVisible: false });
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
      .then(image => {
        const c = image.path.split('/');
        const len = c.length - 1;
        const photo = {
          uri: image.path,
          type: image.mime,
          name: c[len],
          size: image.size
        };
        console.log(photo, type, user_id);
        body.append('photo', photo);
        axios
          .post(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=${type}`, body)
          .then(res => {
            if (res.data.status === 'success' && type === 'cover_photo') {
              return this.setState({
                status: 'Details Successfully Updated',
                visible: true, cover_photo: res.data.path
              })
            }
            if (res.data.status === 'success' && type === 'profile_photo') {
              return this.setState({ status: 'Details Successfully Updated', visible: true, profile_photo: res.data.path })
            }
          });
        console.log(image);
      })
      .catch(res => console.log(res.data));
  };

  fromCamera = () => {
    const { type } = this.state;
    const { user_id } = this.props;
    this.setState({ pickerVisible: false });
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      const c = image.path.split('/');
      const len = c.length - 1;
      const photo = {
        uri: image.path,
        type: image.mime,
        name: c[len],
        size: image.size
      };
      const body = new FormData();
      body.append('photo', photo);
      axios
        .post(`${apiurl}update-setting-profile.php?user_id=${user_id}&type=${type}`, photo)
        .then(res => {
          if (res.data.status === 'success' && type === 'cover_photo') {
            return this.setState({
              status: 'Details Successfully Updated',
              visible: true, cover_photo: res.data.path
            })
          }
          if (res.data.status === 'success' && type === 'profile_photo') {
            return this.setState({ status: 'Details Successfully Updated', visible: true, profile_photo: res.data.path })
          }
        });
      console.log(image);
    });
  };

  onSave = async () => {
    const { user_id } = this.props;
    this.setState({ visible: true, status: 'loading' });
    const {
      data,
      full_name,
      email,
      website,
      marital_status,
      phone_1,
      gender,
      address,
      description,
      date_of_birth,
      visible,
      status
    } = this.state;
    const body = new FormData();
    body.append('type', 'user_details');
    body.append('user_id', user_id);
    body.append('full_name', full_name);
    body.append('full_name', full_name);
    body.append('description', description);
    body.append('gender', gender);
    body.append('marital_status', marital_status);
    body.append('address', address);
    body.append('website', website);

    await axios
      .post(`${apiurl}update-setting-profile.php`, body)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          this.setState({
            status: 'Details Successfully Updated',
            visible: true
          });
        } else {
          this.setState({ status: 'An error occured ' });
        }
      })
      .catch(res => console.log(res.data));
  };

  render() {
    const {
      data,
      full_name,
      email,
      website,
      marital_status,
      phone_1,
      gender,
      address,
      description,
      date_of_birth,
      settings_profile,
      birthday_display,
      location_display,
      gender_display,
      marital_status_display,
      email_display,
      phone_display,
      website_display,
      hype_meter_display,
      visible,
      pickerVisible,
      status,
      profile_photo,
      cover_photo
    } = this.state;
    if (data && settings_profile) {
      return (
        <View style={styles.container}>
          <Portal>
            <Modal
              visible={pickerVisible}
              onDismiss={() => this.setState({ pickerVisible: false })}>
              <View style={{ alignSelf: 'center' }}>
                <View style={styles.imagePicker}>
                  <TouchableOpacity
                    onPress={this.fromGallery}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRightWidth: 0.5
                    }}>
                    <Customon name="images" size={40} />
                    <Text style={styles.pickerText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.fromCamera}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderLeftWidth: 0.5
                    }}>
                    <Customon name="camera-alt" size={40} />
                    <Text style={styles.pickerText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Portal>
          <Snackbar
            visible={visible}
            duration={3000}
            style={{ color: 'red' }}
            onDismiss={() => this.setState({ visible: false })}>
            {status}
          </Snackbar>
          <View style={styles.header}>
            <TouchableOpacity>
              <Customon
                style={styles.arrowback}
                name="long-arrow-left"
                size={15}
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity>
            <Text style={styles.title}> Setting > Profile </Text>
            <TouchableOpacity style={styles.buttoncontainer} onPress={this.onSave}>
              <Text style={styles.buttontext}> Save </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.imageBgprofile}>
              <TouchableOpacity
                onPress={() => this.setState({ pickerVisible: true, type: 'cover_photo' })}>
                <Image
                  source={
                    cover_photo === ''
                      ? require('../images/over-photo-default.jpg')
                      : { uri: `${imageurl}/${cover_photo}` }
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.spaceBar}>
              <View style={styles.imageProfile}>
                <View style={styles.pic}>
                  <Avatar
                    rounded
                    source={profile_photo === '' ? require('../images/ic_account_circle_24px.jpg') : { uri: `${imageurl}/${profile_photo}` }}
                    onPress={() => this.setState({ pickerVisible: true, type: 'profile_photo' })}
                    showEditButton
                    size={95}
                  />
                </View>
              </View>
            </View>

            <View style={styles.profileEdit}>
              <FontAwesome5 name="pen" color="#000" size={15} />
              <Text style={styles.smallTitles}>Name</Text>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder="Daisy J. Akintola"
                value={full_name}
                onChangeText={full_name => this.setState({ full_name })}
              />
            </View>

            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Birthday</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.birthdayDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={birthday_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder={date_of_birth}
                value={date_of_birth}
                onChangeText={date_of_birth => this.setState({ date_of_birth })}
              />
            </View>
            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Location</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.locationDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={location_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder="Daisy J. Akintola"
                value={address}
                onChangeText={address => this.setState({ address })}
              />
            </View>

            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Gender</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.genderDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={gender_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder={gender}
                value={gender}
                onChangeText={gender => this.setState({ gender })}
              />
            </View>

            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Marital Status</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.maritalStatusDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={marital_status_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder={marital_status}
                value={marital_status}
                onChangeText={marital_status => this.setState({ marital_status })}
              />
            </View>

            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Email</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.emailDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={email_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder={email}
                value={email}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Phone Number</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.phoneDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={phone_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder={phone_1}
                value={phone_1}
                onChangeText={phone_1 => this.setState({ phone_1 })}
              />
            </View>

            <View style={styles.profileEditToggleWrapper}>
              <View style={styles.profileEditIcon}>
                <FontAwesome5 name="pen" color="#000" size={15} />
              </View>
              <View style={styles.profileEditToggle}>
                <Text style={styles.toggleText}>Website</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={styles.toggleText2}>Display on Profile</Text>

                  <Switch
                    onValueChange={this.websiteDisplay}
                    onTintColor="#0ce0b5"
                    style={{
                      height: 15
                    }}
                    thumbTintColor="#cccc"
                    tintColor="#000"
                    value={website_display === '1'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField2}
                placeholder={website}
                value={website}
                onChangeText={website => this.setState({ website })}
              />
            </View>

            <View style={styles.spaceBar2} />

            <View style={styles.editBio}>
              <View style={styles.profileEditToggleWrapper}>
                <View style={styles.profileEditIcon}>
                  <FontAwesome5 name="pen" color="#000" size={15} />
                </View>
                <View style={styles.profileEditToggle}>
                  <Text style={styles.toggleText}>Edit Bio</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 9 }}>
                      180 characters
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.editFieldContainer}>
                <TextInput
                  style={styles.TextInputStyleClass}
                  value={description}
                  onChangeText={description => this.setState({ description })}
                  underlineColorAndroid="transparent"
                  placeholder={description}
                  placeholderTextColor="#585858"
                  multiline
                />
              </View>
            </View>

            <View style={styles.spaceBar2} />

            <View style={styles.editSkills}>
              <View style={styles.profileEditToggleWrapper}>
                <View style={styles.profileEditIcon}>
                  <FontAwesome5
                    name="pen"
                    color="#000"
                    size={15}
                    onPress={() => this.props.navigation.navigate('SelectSkillType')}
                  />
                </View>
                <View style={styles.profileEditToggle}>
                  <Text style={styles.toggleText}>Edit Skills</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                {data.user_roles === '' && (
                  <View style={styles.curvedView}>
                    <Text style={{ fontSize: 20 }}>You have not selected any roles</Text>
                  </View>
                )}
                {data.user_roles !== '' && (
                  <View style={styles.curvedView}>
                    {data.user_roles.map(e => (
                      <SetupRolesTick
                        key={e.id}
                        roles={e.name}
                        viewStyle={{ borderColor: 'red' }}
                        textStyle={{ color: 'red', fontSize: 9 }}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.experience}>
              <View
                style={{
                  width: 345,
                  marginTop: 20,
                  backgroundColor: '#f5f5f5',
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25
                }}>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text
                    style={{
                      color: '#9a9a9a',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 15
                    }}>
                    Experience
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 11,
                      color: '#fb0201'
                    }}
                    onPress={() => this.props.navigation.navigate('SettingsExperience')}>
                    + Add
                  </Text>
                </View>
                {data.user_experience === '' && (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontStyle: 'italic',
                        textAlign: 'center'
                      }}>
                      No experience has been added yet
                    </Text>
                  </View>
                )}
                {data.user_experience !== '' && (
                  <View>
                    {data.user_experience.map(e => (
                      <View style={styles.experienceCurve} key={e.experience_id}>
                        <View style={styles.experienceCurveContainer}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 17,
                              fontStyle: 'italic'
                            }}>
                            {e.project}
                          </Text>
                          <FontAwesome5
                            name="pen"
                            color="#9a9a9a"
                            size={12}
                            onPress={() =>
                              this.props.navigation.navigate('EditExperience', {
                                data: e
                              })
                            }
                          />
                        </View>
                        <Text style={styles.experienceCurveContainerText}>{e.company}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={styles.roundedTitle}>
                            <Text
                              style={{
                                color: '#fb0201',
                                fontFamily: 'Poppins-Medium',
                                fontSize: 11,
                                fontStyle: 'italic',
                                lineHeight: 13
                              }}>
                              {e.role}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 3,
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              flexDirection: 'row'
                            }}>
                            <View
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: 150 / 2,
                                backgroundColor: '#bfbfbf',
                                marginRight: 8
                              }}
                            />
                            <View>
                              <Text
                                style={{
                                  color: '#000',
                                  fontFamily: 'Poppins-Medium',
                                  fontSize: 10,
                                  fontStyle: 'italic'
                                }}>
                                {e.start_date} - {e.end_date}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: 56,
                  backgroundColor: '#ffff',
                  marginTop: 15,
                  padding: 10,
                  marginBottom: 15
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 15
                    }}>
                    Hype Meter
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.toggleText2}>Display on Profile</Text>
                    <Switch
                      onValueChange={this.hypeMeterDisplay}
                      onTintColor="#0ce0b5"
                      style={{
                        height: 15
                      }}
                      thumbTintColor="#cccc"
                      tintColor="#000"
                      value={hype_meter_display === '1'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#000" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  editBio: {
    width: 387,
    height: 266,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff'
  },

  roundedTitle: {
    margin: 7,
    flex: 1,
    borderRadius: 25,
    borderColor: '#fb0201',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  editSkills: {
    width: 387,
    height: 154,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff'
  },
  curvedView: {
    width: 300,
    height: 91,
    // shadowColor: '#000',
    // shadowOffset: { width: 3, height: 0 },
    // shadowRadius: 6,
    // borderRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#ffff',
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 18
  },

  experienceCurve: {
    // height: 92,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#ffff',
    elevation: 5,
    shadowOpacity: 0.8,
    width: 323,
    marginBottom: 20
  },
  experienceCurveContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12
  },
  experienceCurveContainerText: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 13,
    paddingLeft: 10
  },
  experience: {
    width: Dimensions.get('window').width
  },
  TextInputStyleClass: {
    // textAlign: 'left',
    marginTop: 19,
    height: 184,
    width: 280,
    textAlignVertical: 'top',
    padding: 15,
    borderWidth: 1,
    borderColor: '#dedede',
    fontStyle: 'italic',
    fontSize: 13,
    // borderRadius: 20,
    backgroundColor: '#ffff'
    // height: 150,
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
  editField: {
    height: 40,
    width: 290,
    borderBottomColor: '#bfbfbfff',
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontSize: 14
  },
  editField2: {
    height: 40,
    // borderBottomColor: '#bfbfbfff',
    // borderBottomWidth: 1,
    fontFamily: 'Poppins-Medium',
    color: '#000'
  },

  editFieldContainer: {
    paddingLeft: 50,
    paddingRight: 50
    // marginTop: -20,
  },
  test2: {
    color: '#ffff'
  },
  buttoncontainer: {
    width: 66,
    height: 30,
    backgroundColor: '#fb0201',
    shadowRadius: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageBgprofile: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7675',
    height: 407,
    opacity: 0.6,
    width: Dimensions.get('window').width
  },

  spaceBar: {
    //  justifyContent: 'center',
    //  alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  spaceBar2: {
    //  justifyContent: 'center',
    //  alignItems: 'center',
    height: 20,
    width: Dimensions.get('window').width,
    backgroundColor: '#eeeeee'
  },

  imageProfile: {
    marginTop: -50,
    marginLeft: 20,
    height: 110
  },

  buttontext: {
    color: '#ffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 13
  },
  arrowback: {
    color: '#000'
  },

  pic: {
    marginBottom: 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 50,
    borderWidth: 3,
    width: 100,
    opacity: 0.5,
    borderColor: '#ecf0f1'
  },

  profileEdit: {
    paddingLeft: 30,
    paddingTop: 15,
    flexDirection: 'row'
  },

  smallTitles: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingLeft: 10,
    color: '#3e3e3e'
  },

  profileEditToggleWrapper: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingTop: 15,
    marginRight: 35
  },

  profileEditIcon: {
    // flex: 1,
    flexDirection: 'row'

    //  backgroundColor: 'red',
  },

  profileEditToggle: {
    flexDirection: 'row',
    flex: 8,
    justifyContent: 'space-between'

    // backgroundColor: 'blue',
  },

  toggleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingLeft: 10,
    color: '#3e3e3e'
  },

  toggleText2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    paddingLeft: 10,
    color: '#000'
  },
  imagePicker: {
    width: 209,
    height: 123,
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: '#ffffff'
  },
  pickerText: {
    color: '#000000',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.01
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(SettingsProfile);
