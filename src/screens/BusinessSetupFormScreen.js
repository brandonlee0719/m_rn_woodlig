import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  DatePickerAndroid,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar, Dialog, Portal, RadioButton } from 'react-native-paper';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { businessformdata } from '../redux/actions/individualformdata';
import fontelloConfig from '../config.json';

const { width, height } = Dimensions.get('window');

const Customon = createIconSetFromFontello(fontelloConfig);

export class BusinessSetupFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressoptions: [],
      address: '',
      longlat: [],
      country: '',
      city: '',
      date_of_birth: '',
      showlocations: false,
      visible: false,
      business_name: '',
      selectedImage: '',
      value: '',
      location: {},
      country: ''
    };
    this.locationChange = this.locationChange.bind(this);
    // this.dateSelection = this.dateSelection.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onPictureChange = this.onPictureChange.bind(this);
    this.onCameraSelect = this.onCameraSelect.bind(this);
  }

  componentWillUpdate(prevprop, newstate) {
    if (newstate.gendervisibility === true) {
      Keyboard.dismiss();
    }
    const data = [
      newstate.business_name,
      newstate.address,
      newstate.location,
      newstate.phone,
      newstate.selectedImage,
      newstate.businessdescription
    ];
    this.props.businessformdata(data);
  }

  componentDidUpdate(props, state) {
    if (state.value !== this.state.value) {
      this.setState({ gendervisibility: false });
    }
    if (state.longlat !== this.state.longlat) {
      const a = this.state.longlat;
      a.formatted_address = this.state.address;
      a.city = this.state.city;
      a.country = this.state.country;
      this.setState({ location: a });
    }
  }

  hideDialog() {
    this.setState({ visible: false });
  }

  locationChange(text) {
    this.setState({ address: text });
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDnd-OjoFVYBZjbB9ok_Pw8pGj0AyhLpjI&input=${text}&radius=50`
      )
      .then(res => this.setState({ addressoptions: res.data.predictions }));
  }

  textSelected(e) {
    const { place_id } = e;
    const len = e.terms.length - 1;
    const cityindex = e.terms.length - 2;
    this.setState({ address: e.description, country: e.terms[len].value });
    if (e.terms.length <= 1) {
      this.setState({ city: '' });
    } else if (e.terms.length > 1) {
      this.setState({ city: e.terms[cityindex].value });
    }
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyDnd-OjoFVYBZjbB9ok_Pw8pGj0AyhLpjI`
      )
      .then(res => this.setState({ longlat: res.data.results[0].geometry.location }));
    this.setState({ showlocations: false });
  }

  onPictureChange() {
    this.setState({ visible: false });
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ selectedImage: image });
    });
  }

  onCameraSelect() {
    this.setState({ visible: false });
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ selectedImage: image });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  // async dateSelection() {
  //   if (Platform.OS === 'android') {
  //       Keyboard.dismiss()
  //     try {
  //       const { action, year, month, day } = await DatePickerAndroid.open({
  //         mode: 'spinner',
  //         date: new Date(1970, 1, 1),
  //       });
  //       if (action !== DatePickerAndroid.dismissedAction) {
  //         const date = new Date(year, month, day);
  //         // const selected = date.toLocaleString('en-us', { month: 'long' })
  //         const monthlist = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  //         const totaldate =`${day}-${monthlist[month]}-${year}`
  //         this.setState({ date_of_birth: totaldate });
  //       }
  //     } catch ({ code, message }) {
  //       console.warn('Cannot open date picker', message);
  //     }
  //   }
  // }
  render() {
    const { addressoptions, address, phone } = this.state;
    return (
      <ScrollView contentContainerStyle={{ height, width }}>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Content>
              <Text
                style={{
                  paddingBottom: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: 'grey'
                }}
                onPress={this.onPictureChange}>
                Select an Image
              </Text>
              <Text style={{ paddingTop: 10 }} onPress={this.onCameraSelect}>
                Select from camera
              </Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.gendervisibility}
            onDismiss={() => this.setState({ gendervisibility: false })}>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={value => this.setState({ value })}
                value={this.state.value}>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value="Female" />
                  <Text style={{ textAlignVertical: 'center' }}>Female</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value="Male" />
                  <Text style={{ textAlignVertical: 'center' }}>Male</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value="Genderqueer" />
                  <Text style={{ textAlignVertical: 'center' }}>Genderqueer/Non-binary</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value="Transgender" />
                  <Text style={{ textAlignVertical: 'center' }}>Transgender</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value="Gender_Fluid" />
                  <Text style={{ textAlignVertical: 'center' }}>Gender-Fluid</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value="Rather not say" />
                  <Text style={{ textAlignVertical: 'center' }}>Rather not Say</Text>
                </View>
              </RadioButton.Group>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <ImageBackground
          source={require('../images/individualformbackground.png')}
          style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '300' }}>Setup</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              {this.state.selectedImage.path === undefined ? (
                <Avatar.Image
                  style={{ elevation: 3 }}
                  size={110}
                  source={require('../images/Avatar_invisible_circle_1.png')}
                />
              ) : (
                <Avatar.Image
                  style={{ elevation: 3 }}
                  size={110}
                  source={{ uri: this.state.selectedImage.path }}
                />
              )}
              <TouchableOpacity
                onPress={() => this.setState({ visible: true })}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Customon name="plus-circle" color="red" size={20} />
                <Text style={{ color: 'red' }}> Profile Picture</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 6 }}>
            <View
              style={{
                backgroundColor: 'white',
                elevation: 3,
                justifyContent: 'center',
                borderTopLeftRadius: 30,
                borderBottomRightRadius: 30,
                height: '75%'
              }}>
              <TextField
                value={this.state.business_name}
                onChangeText={text => this.setState({ business_name: text })}
                label={
                  <Text>
                    Business Name <Text style={{ color: 'red' }}>*</Text>
                  </Text>
                }
                containerStyle={{ width: '80%', alignSelf: 'center' }}
                tintColor="black"
              />
              <TextField
                value={address}
                onFocus={() => this.setState({ showlocations: true })}
                onChangeText={e => this.locationChange(e)}
                label={
                  <Text>
                    Address<Text style={{ color: 'red' }}>*</Text>
                  </Text>
                }
                containerStyle={{ width: '80%', alignSelf: 'center' }}
                tintColor="black"
              />
              {this.state.showlocations === true && (
                <View
                  style={{
                    backgroundColor: '#f1f1f1',
                    elevation: 4,
                    width: '80%',
                    alignSelf: 'center',
                    position: 'absolute',
                    top: '40%'
                  }}>
                  <KeyboardAvoidingView behavior="padding">
                    {addressoptions.map(e => (
                      <Text
                        style={{
                          borderBottomWidth: 1,
                          paddingTop: 5,
                          paddingBottom: 5
                        }}
                        onPress={this.textSelected.bind(this, e)}
                        key={e.place_id}>
                        {e.description}
                      </Text>
                    ))}
                  </KeyboardAvoidingView>
                </View>
              )}
              <TextField
                value={phone}
                onChangeText={e => this.setState({ phone: e })}
                label={
                  <Text>
                    Phone
                    <Text style={{ color: 'red' }}>*</Text>
                  </Text>
                }
                containerStyle={{ width: '80%', alignSelf: 'center' }}
                tintColor="black"
              />
              <TextField
                onChangeText={text => this.setState({ businessdescription: text })}
                label="Business Description"
                containerStyle={{ width: '80%', alignSelf: 'center' }}
                tintColor="black"
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { businessformdata }
)(BusinessSetupFormScreen);
