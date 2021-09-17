import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  DatePickerAndroid,
  TouchableOpacity,
  TextInput,
  Picker,
  ActivityIndicator,
  Keyboard,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { rolesAction, rolesType } from '../redux/actions/rolesAction';
import fontelloConfig from '../config.json';
import { apiurl } from '../constants/config';

const Customon = createIconSetFromFontello(fontelloConfig);
class EditExperience extends Component {
  state = {
    roleType: [],
    selectedroletype: '',
    start_date: '',
    end_date: '',
    company: '',
    description: '',
    location: '',
    project: '',
    loading: false
  };

  componentDidMount() {
    this.props.rolesAction();
    this.props.rolesType();
    const { navigation, user_id } = this.props;
    const data = navigation.getParam('data');
    this.setState({
      project: data.project,
      role_type: data.role_type,
      company: data.company,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date
    });
    console.log(data);
  }

  componentWillReceiveProps(b) {
    console.log(b.individualskill);
  }

  startDate = async () => {
    Keyboard.dismiss();
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ start_date: `${day}-${parseInt(month) + 1}-${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  endDate = async () => {
    Keyboard.dismiss();
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ end_date: `${day}-${parseInt(month) + 1}-${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  handleSubmit = () => {
    const type = 'edit_experience';
    const { navigation, user_id } = this.props;
    const data = navigation.getParam('data');
    const id = data.experience_id;
    this.setState({ loading: true });
    const {
      selectedrole,
      selectedroletype,
      start_date,
      end_date,
      company,
      description,
      location,
      project
    } = this.state;
    const role_type = selectedroletype;
    const skill_id = selectedrole;
    const datum = {
      role_type,
      skill_id,
      project,
      company,
      location,
      start_date,
      end_date,
      description,
      type,
      user_id,
      id
    };
    console.log(datum);
    axios
      .post(`${apiurl}update-setting-profile.php`, datum)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          this.props.navigation.navigate('SettingsProfile');
        } else {
          this.setState({ loading: false });
          alert(res.data.message);
        }
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  };

  render() {
    const { individualskill, rolestype } = this.props;
    const {
      selectedrole,
      selectedroletype,
      start_date,
      end_date,
      company,
      description,
      location,
      project,
      loading
    } = this.state;

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
            <Text style={styles.title}> Edit Experience</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.bodyExperience}>
            <Text style={styles.smallTitles}>Title</Text>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder="Into the Spider-Verse"
                value={project}
                onChangeText={project => this.setState({ project })}
              />
            </View>
            <Text style={styles.smallTitles2}>Company/Institute</Text>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.editField}
                placeholder="Sony Pictures Animation"
                value={company}
                onChangeText={company => this.setState({ company })}
              />
            </View>
            <View
              style={[
                styles.editField,
                {
                  marginVertical: 20,
                  justifyContent: 'space-around',
                  alignSelf: 'center'
                }
              ]}>
              <Text>Role</Text>

              {individualskill.data !== undefined && (
                <Picker
                  selectedValue={selectedrole}
                  prompt="Role"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedrole: itemValue })
                  }>
                  {individualskill.data.map(e => (
                    <Picker.Item key={e.id} label={e.name} value={e.id} />
                  ))}
                </Picker>
              )}
            </View>
            <View
              style={[
                styles.editField,
                {
                  marginVertical: 20,
                  alignSelf: 'center',
                  justifyContent: 'space-around'
                }
              ]}>
              <Text>Role Type</Text>
              {rolestype.data !== undefined && (
                <Picker
                  selectedValue={selectedroletype}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedroletype: itemValue })
                  }>
                  {rolestype.data.map(e => (
                    <Picker.Item key={e.id} label={e.name} value={e.id} />
                  ))}
                </Picker>
              )}
            </View>
            <View style={styles.editFieldContainer2}>
              <TextInput
                style={styles.editField}
                placeholder="Location"
                value={location}
                onChangeText={location => this.setState({ location })}
              />
            </View>
            <View
              style={{
                width: 350,
                height: 70,
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                fontSize: 30,
                justifyContent: 'center',
                alignSelf: 'center'
              }}>
              <TextInput
                placeholder="Start Date"
                style={{ fontSize: 16 }}
                value={start_date}
                onFocus={this.startDate}
              />
            </View>

            <View
              style={{
                width: 350,
                height: 70,
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                justifyContent: 'center',
                alignSelf: 'center'
              }}>
              <TextInput
                placeholder="End Date"
                value={end_date}
                style={{ fontSize: 16 }}
                onFocus={this.endDate}
              />
            </View>

            <Text style={styles.smallTitles3}>Description</Text>
            <View style={styles.editFieldContainer}>
              <TextInput
                style={styles.TextInputStyleClass}
                value={description}
                onChangeText={description => this.setState({ description })}
                underlineColorAndroid="transparent"
                placeholder="Write here (200 characters)"
                placeholderTextColor="#585858"
                multiline
              />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {loading === false ? (
                <TouchableOpacity onPress={this.handleSubmit}>
                  <View style={styles.addExperienceBtn}>
                    <Text style={styles.addExText}>Save Changes</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <View style={styles.addExperienceBtn}>
                    <ActivityIndicator color="#000" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
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

  addExText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 13
  },
  addExperienceBtn: {
    width: 203,
    height: 34,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 25,
    backgroundColor: '#fb0201',
    elevation: 5,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextInputStyleClass: {
    // textAlign: 'left',
    marginTop: 19,
    height: 184,
    width: 351,
    textAlignVertical: 'top',
    padding: 15,
    borderWidth: 1,
    borderColor: '#dedede',
    // fontStyle: 'italic',
    fontSize: 13,
    // borderRadius: 20,
    backgroundColor: '#ffff'
    // height: 150,
  },

  editFieldContainer: {
    paddingLeft: 50,
    paddingRight: 50
    // marginTop: -20,
  },

  editField: {
    height: 45,
    width: 350,
    borderBottomColor: '#bfbfbfff',
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontSize: 16
    // marginTop: 10,
  },

  editFieldContainer: {
    paddingLeft: 6,
    // paddingRight: 50,
    marginRight: 10
  },
  editFieldContainer2: {
    paddingLeft: 6,
    // paddingRight: 50,
    marginRight: 10,
    marginTop: 10
  },
  bodyExperience: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginTop: 15,
    padding: 20
  },

  smallTitles2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingLeft: 10,
    color: '#707070',
    marginTop: 20
  },

  smallTitles3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    paddingLeft: 10,
    color: '#707070',
    marginTop: 20
  },

  smallTitles: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingLeft: 10,
    color: '#707070'
  },

  headerArrow: {
    flex: 2
  },

  headerTitle: {
    flex: 4

    // justifyContent: 'center',
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
  }
});
const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  individualskill: state.roles.individual,
  rolestype: state.roles.roletypes
});

export default connect(
  mapStateToProps,
  { rolesAction, rolesType }
)(EditExperience);
