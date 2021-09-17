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
import { Portal, Modal, Button } from 'react-native-paper';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiurl, localurl } from '../constants/config';

const { width, height } = Dimensions.get('window');

class ApplyForCastingCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      role: '',
      loading: false,
      applied: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hide2Modal = this.hide2Modal.bind(this);
  }

  componentDidMount() {
    const { detail, casting_call } = this.props;
    if (detail.application_id === null) {
      this.setState({ applied: false });
    } else this.setState({ applied: true });
  }

  showModal() {
    const { detail } = this.props;
    this.setState({
      visible: true
    });
    // console.log(e);
  }

  hideModal() {
    this.setState({ visible: false });
  }

  async handleSubmit() {
    this.setState({ loading: true });
    const { detail, casting_call, user_id } = this.props;
    const casting_call_id = casting_call.id;
    const { role_id, role_type_id } = detail;
    const total = { user_id, role_id, role_type_id, casting_call_id };
    await axios
      .post(`${apiurl}apply-for-casting-call.php`, total)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          this.setState({ applied: true, visible: false });
        }
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  }

  show2Modal() {
    const { detail } = this.props;
    this.setState({
      visible2: true
    });
    // console.log(e);
  }

  hide2Modal() {
    this.setState({ visible2: false });
  }

  async cancelSubmission() {
    this.setState({ loading: true });
    const { detail, casting_call, user_id } = this.props;
    const casting_call_id = casting_call.id;
    const { role_id, role_type_id } = detail;
    const total = { user_id, role_id, role_type_id, casting_call_id };
    await axios
      .post(`${apiurl}cancel-casting-call-application.php`, total)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          this.setState({ applied: false, visible2: false });
        }
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { visible, visible2, role, loading, applied } = this.state;
    const { casting_call, detail, index } = this.props;
    return (
      <View style={{ backgroundColor: '#eeeeee' }}>
        <StatusBar translucent backgroundColor="#ffffff" barStyle="dark-content" />
        <Portal>
          <Modal dismissable={false} visible={visible}>
            <View
              style={{
                borderTopLeftRadius: 70,
                borderTopRightRadius: 70,
                borderBottomLeftRadius: 70,
                alignSelf: 'center',
                justifyContent: 'space-around',
                height: 250,
                width: 327,
                backgroundColor: 'white'
              }}>
              <Image
                source={require('../images/ccillustration.png')}
                style={{ alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>
                you have applied for the role of
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>
                {casting_call.skill}, {detail.role_type}
              </Text>
              {loading === false ? (
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={this.hideModal}
                    style={{
                      backgroundColor: '#f48282',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                      paddingVertical: 8
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold'
                      }}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.handleSubmit}
                    style={{
                      backgroundColor: '#fb0201',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      marginHorizontal: 15
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold'
                      }}>
                      CONFIRM
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </Modal>
          {/* modal for the deletion */}
          <Modal dismissable={false} visible={visible2}>
            <View
              style={{
                borderTopLeftRadius: 70,
                borderTopRightRadius: 70,
                borderBottomLeftRadius: 70,
                alignSelf: 'center',
                justifyContent: 'space-around',
                height: 250,
                width: 327,
                backgroundColor: 'white'
              }}>
              <Image
                source={require('../images/ccillustration.png')}
                style={{ alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', fontSize: 15, color: 'black' }}>
                you have opted to delete the role(s) of
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>
                {casting_call.skill}, {detail.role_type}
              </Text>
              {loading === false ? (
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={this.hide2Modal}
                    style={{
                      backgroundColor: '#f48282',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                      paddingVertical: 8
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold'
                      }}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.cancelSubmission.bind(this)}
                    style={{
                      backgroundColor: '#fb0201',
                      borderRadius: 30,
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      marginHorizontal: 15
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold'
                      }}>
                      CONFIRM
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </Modal>
        </Portal>
        <View style={{ marginTop: 10, backgroundColor: '#eeeeee' }}>
          <View
            style={{
              elevation: 3,
              backgroundColor: '#ffffff',
              marginBottom: 10,
              paddingVertical: 10
            }}>
            <View
              style={{
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#dedede'
              }}>
              <Text>ROLE(S): {index + 1}</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ paddingVertical: 10 }}>
                <Text>Looking for:</Text>
                <Text style={{ color: 'black', textTransform: 'capitalize' }}>
                  {casting_call.skill}
                </Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text>Role type</Text>
                <Text style={{ color: 'black' }}>{detail.role_type}</Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text>Role description</Text>
                <Text style={{ color: 'black' }}>
                  {detail.role_description}
                </Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text>Gender: </Text>
                <Text style={{ color: 'black' }}>{detail.gender}</Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text>Age Range: </Text>
                <Text style={{ color: 'black' }}>
                  {detail.age_from} - {detail.age_to}
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              {applied === false ? (
                <TouchableOpacity
                  onPress={this.showModal.bind(this)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 3,
                    borderRadius: 10,
                    backgroundColor: '#f1f1f1',
                    elevation: 5
                  }}>
                  <Text style={{ color: 'red' }}>Apply</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this.show2Modal.bind(this)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 3,
                    borderRadius: 10,
                    backgroundColor: '#f1f1f1',
                    elevation: 5
                  }}>
                  <Text style={{ color: 'red' }}>CANCEL</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(ApplyForCastingCall);
