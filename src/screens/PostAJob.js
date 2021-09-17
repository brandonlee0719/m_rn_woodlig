import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
  DatePickerAndroid
} from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import axios from 'axios';
import CastingCallRoles from '../components/CastingCallRoles';
import { rolesAction } from '../redux/actions/rolesAction';
import { submitcastingcalls } from '../redux/actions/postajob';
import { apiurl } from '../constants/config';

const { height, width } = Dimensions.get('window');

// eslint-disable-next-line react/prefer-stateless-function
class PostAJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      talent: '1',
      productiontype: [],
      selectedproduct: '',
      startDate: '',
      endDate: '',
      title: '',
      description: '',
      date_venue: ''
    };
    this.endDate = this.endDate.bind(this);
    this.startDate = this.startDate.bind(this);
    this.submitJob = this.submitJob.bind(this);
  }

  componentWillMount() {
    this.props.rolesAction();
    axios
      .get(`${apiurl}fetch-production-type.php`)
      .then(res => this.setState({ productiontype: res.data.data }));
    // console.log(this.props.individualroles.data);
  }

  componentDidUpdate() {
    const { individualroles, selectedlocation } = this.props;
    console.log(individualroles, selectedlocation);
  }

  async startDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ startDate: `${day}-${month}-${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  async endDate() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ endDate: `${day}-${month}-${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  submitJob() {
    const { castingcallsdata, selectedlocation } = this.props;
    const {
      title,
      selectedproduct,
      description,
      startDate,
      endDate,
      date_venue,
      talent
    } = this.state;
    if (selectedlocation === '') {
      return alert('Please enter a valid location');
    }
    const production_type = selectedproduct;
    const start_date = startDate;
    const application_deadline = endDate;
    const { role_description } = castingcallsdata;
    const age_from = castingcallsdata.sliderpoints[0];
    const age_to = castingcallsdata.sliderpoints[1];
    const { gender } = castingcallsdata;
    const skill_id = talent;
    const role_type = castingcallsdata.selectedrole;
    const { city, country, formatted_address, lng, lat } = selectedlocation;
    const roles_count = 1;
    // const roles = { role_description, age_from, age_to }
    const data = {
      title,
      production_type,
      description,
      start_date,
      application_deadline,
      date_venue,
      role_description,
      age_from,
      age_to,
      gender,
      skill_id,
      role_type,
      lng,
      lat,
      city,
      country,
      formatted_address,
      roles_count
    };

    axios
      .post(`${apiurl}add-casting-call.php?user_id=3`, data)
      .then(res => {
        // console.log(res.data);
        if (res.data.status === 'success') {
          alert(res.data.message);
        } else {
          alert('an error occurred');
        }
      })
      .catch(res => console.log(res.data));
    // this.props.submitcastingcalls(data);
    console.log(data);
  }

  render() {
    const { individualroles, selectedlocation } = this.props;
    const { productiontype, selectedproduct, startDate, endDate, loading } = this.state;
    const { data } = individualroles;
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#f1f1f1' }}>
        <Portal>
          <Modal visible={loading}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 50
              }}>
              <ActivityIndicator size="large" color="#fb0201" />
            </View>
          </Modal>
        </Portal>
        <ScrollView
          nestedScrollEnabled
          overScrollMode="always"
          contentContainerStyle={{
            backgroundColor: '#ffffff',
            elevation: 5,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20
          }}>
          <View style={{ backgroundColor: '#ffffff' }}>
            <View>
              <Text style={styles.titlestyle2}>Title</Text>
              <TextInput
                placeholder="write production title here"
                style={{
                  width: '90%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#dedede',
                  marginBottom: 10
                }}
                onChangeText={title => this.setState({ title })}
              />
            </View>
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.titlestyle}>Production Type</Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: 150,
                    height: 23,
                    borderColor: '#dedede',
                    borderRadius: 20
                  }}>
                  {productiontype !== [] && (
                    <Picker
                      selectedValue={selectedproduct}
                      style={{
                        borderBottomWidth: 20,
                        height: 23,
                        width: 150
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ selectedproduct: itemValue })
                      }>
                      {productiontype.map(e => (
                        <Picker.Item
                          label={e.name}
                          value={e.id}
                          key={e.id}
                          style={{ fontSize: 10, fontFamily: 'Poppins-Medium' }}
                        />
                      ))}
                    </Picker>
                  )}
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.titlestyle}>Description</Text>
              <TextInput
                multiline
                style={{
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#dedede',
                  padding: 8,
                  minHeight: 150,
                  textAlignVertical: 'top'
                }}
                placeholder="write the production description here"
                onChangeText={description => this.setState({ description })}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20
              }}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.titlestyle}>Start Date&nbsp;</Text>

                  <Icon name="info-circle" style={{ justifyContent: 'center', marginTop: 4 }} />
                </View>
                {startDate === '' && (
                  <TouchableOpacity onPress={this.startDate} style={{ flexDirection: 'row' }}>
                    <Icon name="plus" size={15} />
                    <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                      &nbsp;&nbsp;Add Date
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{startDate}</Text>
                  {startDate !== '' && (
                    <Text style={{ color: 'red', fontWeight: '900' }} onPress={this.startDate}>
                      &nbsp;Change
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.titlestyle}>Application Deadline&nbsp;</Text>
                  <Icon name="info-circle" style={{ justifyContent: 'center', marginTop: 4 }} />
                </View>
                {endDate === '' && (
                  <TouchableOpacity onPress={this.endDate} style={{ flexDirection: 'row' }}>
                    <Icon name="plus" size={15} />
                    <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                      &nbsp;&nbsp;Add Date
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{endDate}</Text>
                  {endDate !== '' && (
                    <Text style={{ color: 'red', fontWeight: '900' }} onPress={this.endDate}>
                      &nbsp;Change
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.titlestyle}>Location</Text>
              {selectedlocation.formatted_address === undefined ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddLocationRoute')}
                  style={{ flexDirection: 'row' }}>
                  <Icon name="plus" size={15} />
                  <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>
                    &nbsp;&nbsp;Add Location
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>{selectedlocation.formatted_address}</Text>
                  <Text style={{ color: 'red', fontWeight: '900' }} onPress={this.endDate}>
                    &nbsp;Change
                  </Text>
                </View>
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.titlestyle2}>Dates and Venues</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#dedede',
                  width: '90%'
                }}
                placeholder="write date and venue here"
                onChangeText={date_venue => this.setState({ date_venue })}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                marginLeft: -20,
                margin: 'auto',
                width,
                height: 1,
                backgroundColor: '#dedede'
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  paddingTop: 20,
                  paddingBottom: 20
                }}>
                Role(s)
              </Text>
              <Text style={styles.titlestyle}>Find Talent</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: '#dedede',
                  height: 23,
                  width: 150
                }}>
                {data !== undefined && (
                  <Picker
                    style={{
                      height: 23,
                      width: 150,
                      fontSize: 11,
                      fontFamily: 'Poppins-Meduim',
                      color: '#000'
                    }}
                    selectedValue={this.state.talent}
                    onValueChange={(itemValue, itemIndex) => this.setState({ talent: itemValue })}>
                    {data.map(e => (
                      <Picker.Item label={e.name} value={e.id} key={e.id} />
                    ))}
                  </Picker>
                )}
              </View>
              <View style={{ marginTop: 10, height: 1, backgroundColor: '#dedede' }} />
            </View>
            <CastingCallRoles />
          </View>
        </ScrollView>
        <View
          style={{
            height: 300,
            width,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            alignItems: 'center',
            paddingTop: 20
          }}>
          <TouchableOpacity
            onPress={this.submitJob}
            style={{
              borderRadius: 20,
              backgroundColor: 'red',
              paddingVertical: 7,
              paddingHorizontal: 100
            }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menutext: {
    fontSize: 9
  },
  menubutton: { flex: 1, alignItems: 'center' },
  lastmenubutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    height: 60
  },
  titlestyle: {
    fontSize: 15,
    fontFamily: 'Poppins-Meduim',
    color: '#414141',
    marginBottom: 10
  },
  titlestyle2: {
    fontSize: 15,
    fontFamily: 'Poppins-Meduim',
    color: '#414141',
    marginBottom: 5
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  individualroles: state.roles.roletypes,
  castingcallsdata: state.castingcallsdata.castingcallroles,
  selectedlocation: state.addpost.locationdescription
});

export default connect(
  mapStateToProps,
  { rolesAction, submitcastingcalls }
)(withNavigation(PostAJob));
