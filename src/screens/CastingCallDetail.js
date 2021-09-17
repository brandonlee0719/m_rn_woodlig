import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Portal, FAB, Modal, Button } from 'react-native-paper';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { connect } from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { apiurl, localurl } from '../constants/config';
import ApplyForCastingCall from '../components/ApplyForCastingCall';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

const { width, height } = Dimensions.get('window');

const appliedfor = [];
class CastingCallDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // details: "",
      visible: false,
      role: '',
      selectedrole: '',
      submissionstatus: '',
      removeapplication: '',
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hide2Modal = this.hide2Modal.bind(this);
  }

  componentWillMount() {
    const { navigation, user_id } = this.props;
    const casting_call_id = navigation.getParam('casting_call_id');
    // const itemId = navigation.getParam('itemId', 'NO-ID');
    console.log(casting_call_id);
    axios
      .get(`${apiurl}view-casting-call-details.php?user_id=${user_id}&id=${casting_call_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ details: res.data });
      })
      .catch(res => console.log(res.data));
  }

  showModal(e) {
    const { details } = this.state;
    this.setState({ selectedrole: e });
    this.setState({
      visible: true,
      role: `${details.data[0].skill}, ${e.role_type}`
    });
    // console.log(e);
  }

  hideModal() {
    this.setState({ visible: false });
  }

  async handleSubmit() {
    this.setState({ loading: true });
    const { navigation, user_id } = this.props;
    const { selectedrole } = this.state;
    const casting_call_id = navigation.getParam('casting_call_id');
    // const casting_call_id = itemId;
    const { role_id, role_type_id } = selectedrole;
    const total = { user_id, role_id, role_type_id, casting_call_id };
    await axios
      .post(`${apiurl}apply-for-casting-call.php`, total)
      .then(res => this.setState({ submissionstatus: res.data }))
      .catch(res => console.log(res.data));
    // console.log(total);
    // console.log(this.state.submissionstatus);
    this.setState({ loading: false });
  }

  show2Modal(e) {
    const { details } = this.state;
    this.setState({ selectedrole: e });
    this.setState({
      visible2: true,
      role: `${details.data[0].skill}, ${e.role_type}`
    });
    // console.log(e);
  }

  hide2Modal() {
    this.setState({ visible2: false });
  }

  async cancelSubmission() {
    this.setState({ loading: true });
    const { navigation } = this.props;
    const { selectedrole } = this.state;
    // alert('you will cancel your submission');
    // console.log(e,a);
    // console.log(appliedfor);
    const casting_call_id = navigation.getParam('casting_call_id');
    // const casting_call_id = itemId;
    const user_id = 3;
    const { role_id } = selectedrole;
    const total = { user_id, role_id, casting_call_id };
    await axios
      .post(`${apiurl}cancel-casting-call-application.php`, total)
      .then(res => this.setState({ removeapplication: res.data }))
      .catch(res => console.log(res.data));

    this.setState({ loading: false });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { navigation } = this.props;
    const { details, visible, visible2, role, loading, submissionstatus } = this.state;
    const casting_call_id = navigation.getParam('casting_call_id');

    if (details) {
      return (
        <View style={{ backgroundColor: '#eeeeee', flex: 1 }}>
          <StatusBar translucent backgroundColor="#ffffff" barStyle="dark-content" />

          <View style={styles.header}>
            <View style={styles.headerArrow}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Customon style={styles.arrowback} name="long-arrow-left" size={15} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Casting Call</Text>
            </View>

            <View style={styles.bgView}>
              <TouchableOpacity
                onPress={() => {
                  console.log(details);
                  this.props.navigation.navigate('ViewApplicants', {
                    casting_call_id: details.data[0].id
                  });
                }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      textAlign: 'center',
                      fontFamily: 'Poppins-Meduim',
                      marginRight: 5
                    }}>
                    View Applicants
                  </Text>
                  <Icon name="arrow-right" color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <FAB
            style={styles.fab}
            large
            icon="edit"
            onPress={() =>
              this.props.navigation.navigate('EditCastingCall', { casting_call_details: details })
            }
          />
          <ScrollView
            contentInsetAdjustmentBehavior="always"
            contentContainerStyle={{ backgroundColor: '#eeeeee' }}>
            <View
              style={{
                height: 30,
                alignItems: 'center',
                flexDirection: 'row'
              }}>
              {/* <View style={{ flex: 1 }} /> */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>Posted: 2d ago</Text>
              </View>
            </View>
            <View
              style={{
                elevation: 3,
                height: 130,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}>
              <Text style={{ fontSize: 10, textTransform: 'uppercase' }}>Title</Text>
              <Text style={{ textTransform: 'uppercase' }}>{details.data[0].title}</Text>
              <View
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 20,
                  borderRadius: 20
                }}>
                <Text style={{ color: 'white', textTransform: 'capitalize' }}>
                  {details.data[0].production_type}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  paddingHorizontal: 20,
                  borderRadius: 20
                }}>
                <Text style={{ color: 'red', textTransform: 'capitalize' }}>
                  {details.data[0].skill}
                </Text>
              </View>
            </View>
            <View style={{ width: '97%', marginTop: 10 }}>
              <View
                style={{
                  elevation: 3,
                  backgroundColor: '#ffffff',
                  paddingHorizontal: 20,
                  paddingVertical: 5
                }}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    paddingVertical: 5
                  }}>
                  Description
                </Text>
                <Text style={{ color: 'black' }}>{details.data[0].description}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10, backgroundColor: '#eeeeee' }}>
              <View
                style={{
                  elevation: 3,
                  backgroundColor: '#ffffff',
                  width: '60%',
                  alignSelf: 'flex-end',
                  paddingHorizontal: 20,
                  paddingVertical: 10
                }}>
                <View>
                  <Text>Details</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Location:</Text>
                  <Text style={{ color: 'black' }}>{details.data[0].country}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Status: </Text>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                    {details.data[0].active === '1' ? 'ACTIVE' : 'INACTIVE'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Starting on: </Text>
                  <Text style={{ color: 'black' }}>{details.data[0].start_date}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Application deadline:</Text>
                  <Text style={{ color: 'black' }}>{details.data[0].deadline}</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: '#eeeeee', marginTop: 10 }}>
              <View
                style={{
                  elevation: 3,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  backgroundColor: '#ffffff',
                  width: '97%',
                  alignItems: 'center'
                }}>
                <Text style={{ paddingVertical: 10 }}>DATES & VENUES</Text>
                <Text style={{ color: 'black' }}>{details.data[0].date_venue}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10, backgroundColor: '#eeeeee' }}>
              {details.role_details.map((detail, index) => (
                <ApplyForCastingCall
                  key={detail.role_id}
                  detail={detail}
                  index={index}
                  casting_call={details.data[0]}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      );
    }

    return <ActivityIndicator />;
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  activitystreamdata: state.activitystreamdata.activitystream
});

export default connect(mapStateToProps)(CastingCallDetail);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: height - 100,
    zIndex: 1
  },

  bgView: {
    width: 114,
    flex: 1,
    height: 26,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: -3 },
    shadowRadius: 6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    backgroundColor: '#fb0201',
    justifyContent: 'center',
    marginTop: 15
  },
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    marginTop: 20,
    backgroundColor: '#ffff',
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,

    justifyContent: 'center',

    shadowOffset: { width: 3, height: 0 }
    //  elevation: 5
  },

  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },

  arrowback: {
    color: '#000',
    justifyContent: 'center'
  },

  headerArrow: {
    flex: 1,
    justifyContent: 'center'
  },

  headerTitle: {
    flex: 1,
    // marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  }
});
