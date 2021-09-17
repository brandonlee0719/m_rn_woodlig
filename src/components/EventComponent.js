import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TimePickerAndroid,
  DatePickerAndroid,
  TouchableOpacity,
  Dimensions,
  Picker,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import { Avatar, Menu, Divider } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Dropdown from './Dropdown';
import { postValues } from '../redux/actions/handleYourMind';

const { height, width } = Dimensions.get('window');
// eslint-disable-next-line react/prefer-stateless-function
export class EventComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      longlat: [],
      privacy: 'public',
      visible: false,
      eventtype: 'show',
      eventname: '',
      description: '',
      venue: '',
      date: '',
      time: ''
    };
  }

  componentDidUpdate(prevprops) {
    const { location } = this.props;
    const {
      longlat,
      image,
      eventname,
      eventtype,
      description,
      venue,
      date,
      time,
      privacy
    } = this.state;
    // const formatted_address = this.props.location
    // console.log(this.props.location, this.props.tag);
    if (location !== prevprops.location) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?place_id=${location.place_id}&key=AIzaSyDnd-OjoFVYBZjbB9ok_Pw8pGj0AyhLpjI`
        )
        .then(res => this.setState({ longlat: res.data.results[0].geometry.location }))
        .catch(res => console.log('error'));
    }
    const len = location.terms === undefined ? 0 : location.terms.length - 1;
    const len2 = location.terms === undefined ? 0 : location.terms.length - 2;
    const country = location.terms === undefined ? '' : location.terms[len].value;
    const city = location.terms === undefined ? '' : location.terms[len2].value;
    console.log(location);
    const total = {
      eventtype,
      eventname,
      description,
      venue,
      image,
      location,
      longlat,
      city,
      country,
      date,
      time
    };
    this.props.postValues(total);
  }

  async addDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ date: `${day}-${month}-${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  async addTime() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        console.log(hour, minute);
        this.setState({ time: `${hour} : ${minute}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  addPhoto() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ image });
    });
    // ImagePicker.openCamera({
    //     width: 300,
    //     height: 400,
    //     cropping: true,
    //   }).then(image => {
    //     this.setState({ image });
    //   });
  }

  render() {
    const { image, eventname, eventtype, time, date, privacy, visible } = this.state;
    const { location } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{
          height: height * 1.9,
          paddingTop: 20,
          backgroundColor: '#f1f1f1',

        }}>
        <ScrollView
          style={{ width, height: height * 30 }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <View
            style={{
              height: 'auto',
              width: '95%',
              borderRadius: 20,
              backgroundColor: '#ffffff',
              paddingBottom: 20,
              elavation: 10
            }}>
            <View
              style={{
                flex: 1.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View style={{flexDirection: 'row',  alignItems: 'center'}}>
              <Avatar.Image
                size={50}
                source={require('../images/Avatar_invisible_circle_1.png')}
              />
            <Text style={{color: '#bcc5d3', fontFamily: 'Poppins-Medium', fontSize: 10}}>@Humphrey_jerome</Text>
            </View>
            {  /*<FontAwesome5 name="calendar" size={15} color="#d1d1d1"
                style={{paddingRight: 20}}
                 />*/}
                 <View
                   style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                   paddingRight: 30
                   }}>
              <Menu
                visible={this.state.visible}
                onDismiss={() => this.setState({ visible: false })}
                anchor={
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => this.setState({ visible: true })}>
                    <FontAwesome5 name={privacy === 'private' ? 'lock' : 'lock-open'} size={16} />
                      <Text
                        style={{
                          textAlignVertical: 'center',
                          textTransform: 'capitalize',
                          marginHorizontal: 3,
                          fontFamily: 'Poppins-Meduim',
                          fontSize: 13,
                          marginLeft: 5,
                          color: '#808080',
                        }}>
                        {privacy}
                      </Text>
                    <FontAwesome5 name="caret-down" size={16} style={{ alignSelf: 'center' }} />
                  </TouchableOpacity>
                }>
                <Menu.Item
                  onPress={() => this.setState({ privacy: 'public', visible: false })}
                  title="public"
                />
                <Divider />
                <Menu.Item
                  onPress={() => this.setState({ privacy: 'private', visible: false })}
                  title="private"
                />
              </Menu>
            </View>
          </View>
            <View
              style={{
                height: 150,
                alignSelf: 'center',
                width: '65%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center'
              }}>
              <View style={{ justifyContent: 'center', width: '100%' }}>
                <Text style={{ color: '#414141', fontSize: 15, textAlign: 'center', fontFamily: 'Poppins-Medium'}}>
                  Event Type (choose one)
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ eventtype: 'show' })}
                style={{
                  backgroundColor: eventtype === 'show' ? 'red' : 'white',
                  width: 100,
                  height: 25,
                  borderWidth: 2,
                  borderColor: 'red',
                  borderRadius: 30,
                  marginBottom: 20
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Meduim',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: eventtype === 'show' ? 'white' : 'black'
                  }}>
                  Show
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ eventtype: 'concert' })}
                style={{
                  backgroundColor: eventtype === 'concert' ? 'red' : 'white',
                  width: 100,
                  height: 25,
                  borderWidth: 2,
                  borderColor: 'red',
                  borderRadius: 30
                }}>
                <Text
                  style={{
                    color: eventtype === 'concert' ? 'white' : 'black',
                    fontSize: 13,
                    fontFamily: 'Poppins-Meduim',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                  }}>
                  Concert
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ eventtype: 'drama' })}
                style={{
                  backgroundColor: eventtype === 'drama' ? 'red' : 'white',
                  width: 100,
                  height: 25,
                  borderWidth: 2,
                  borderColor: 'red',
                  borderRadius: 30
                }}>
                <Text
                  style={{
                    color: eventtype === 'drama' ? 'white' : 'black',
                    fontSize: 13,
                    fontFamily: 'Poppins-Meduim',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                  }}>
                  Drama
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ eventtype: 'party' })}
                style={{
                  backgroundColor: eventtype === 'party' ? 'red' : 'white',
                  width: 100,
                  height: 25,
                  borderWidth: 2,
                  borderColor: 'red',
                  borderRadius: 30
                }}>
                <Text
                  style={{
                    color: eventtype === 'party' ? 'white' : 'black',
                    fontSize: 13,
                    fontFamily: 'Poppins-Meduim',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                  }}>
                  Party
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 70, marginLeft: 20 }}>
              <Text style={{ fontSize: 20, color: '#414141',fontFamily: 'Poppins-Meduim',}}>
                Name of Event
              </Text>
              <TextInput
                onChangeText={eventname => this.setState({ eventname })}
                placeholder="write event name here"
                style={{
                  fontFamily: 'Poppins-Meduim',
                  fontSize: 10,
                  color: '#bfbfbf',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#bfbfbf',
                  marginTop: -15,
                  width: '80%'
                }}
              />
            </View>
            <View style={{marginLeft: 20, marginBottom: 10}}>
              <Text style={{ fontSize: 20, color: '#414141',fontFamily: 'Poppins-Meduim',}}>
                Event Description
              </Text>
              <TextInput style={styles.TextInputStyleClass}
                onChangeText={description => this.setState({ description })}
                underlineColorAndroid="transparent"
                placeholder="Write description here
                (150 characters)"
                placeholderTextColor="#bfbfbf"
                multiline
              />


            </View>
            <View style={{ height: 70, marginLeft: 20 }}>
                <Text style={{ fontSize: 20, color: '#414141',fontFamily: 'Poppins-Meduim',}}>Venue</Text>
              <TextInput
                onChangeText={venue => this.setState({ venue })}
                placeholder="write venue here"
                style={{
                  fontFamily: 'Poppins-Meduim',
                  fontSize: 10,
                  color: '#bfbfbf',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#bfbfbf',
                  marginTop: -15,
                  width: '80%'
                }}
              />
            </View>
            {/* {this.props.tag || this.props.location && (<View style={{ height: 100, color: '#ededede' }}></View>)} */}
            <View
              style={{
                marginLeft: 20,
                height: 200,
                justifyContent: 'space-around'
              }}>
              <View>
                <Text style={{ fontSize: 20, color: '#414141',fontFamily: 'Poppins-Meduim',}}>Location</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', marginTop: 5}}
                    onPress={() => this.props.navigation.navigate('AddLocationRoute')}>
                    <FontAwesome5
                      name="plus"
                      color="black"
                      size={13}
                      style={{ alignSelf: 'center', marginRight: 5}}
                    />
                    <Text style={{ fontSize: 13, color: '#414141',fontFamily: 'Poppins-Meduim',}}>
                      Add Location
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ marginRight: 30, fontSize: 13}}>{location.description}</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 20, color: '#414141',fontFamily: 'Poppins-Meduim',}}>Date</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={this.addDate.bind(this)}>
                    <FontAwesome5
                      name="plus"
                      color="black"
                      size={13}
                      style={{ alignSelf: 'center', marginRight: 5}}
                    />
                    <Text style={{ fontSize: 13, color: '#414141',fontFamily: 'Poppins-Meduim',}}>
                      Add Date
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ marginRight: 30, fontSize: 13}}>{date}</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 20, color: '#414141',fontFamily: 'Poppins-Meduim',}}>Time</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={this.addTime.bind(this)}>
                    <FontAwesome5
                      name="plus"
                      color="black"
                      size={13}
                      style={{ alignSelf: 'center', marginRight: 5}}
                    />
                  <Text style={{ fontSize: 13, color: '#414141',fontFamily: 'Poppins-Meduim',}}>
                      Add Time
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ marginRight: 30, fontSize: 13}}>{time}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderTopColor: '#bfbfbf',
                height: 200,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {image.length < 1 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    borderRadius: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.16)',
                    backgroundColor: '#fecbcb',
                    width: 317,
                    height: 163,
                  //  marginBottom: 15,
                    elevation: 3,

                  }}>
                  <FontAwesome5
                    name="camera-retro"
                    color="#f48282"
                    size={50}
                    onPress={this.addPhoto.bind(this)}
                    style={{ alignSelf: 'center' }}
                  />
                {  /*<Text style={{ textAlign: 'center' }}>
                    Add a Cover Photo (Optional)
                  </Text>*/}
                </View>
              ) : (
                  <Image
                    style={{ width: '90%', borderRadius: 10, height: '90%' }}
                    source={{ uri: image.path }}
                  />
                )}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  location: state.addpost.locationdescription,
  tag: state.addpost.taggedpeople
});

export default connect(
  mapStateToProps,
  { postValues }
)(withNavigation(EventComponent));


const styles = StyleSheet.create({  TextInputStyleClass: {
    // textAlign: 'left',
    marginTop: 19,
    height: 121,
    width: 286,
    textAlignVertical: 'top',
    padding: 15,
    borderWidth: 1,
    borderColor: '#bfbfbf',
    // fontStyle: 'italic',
    fontSize: 13,
    // borderRadius: 20,
    backgroundColor: '#ffff'
    // height: 150,
  },
});
