import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import SetupRolesGradient from '../components/SetupRolesGradient';
import { rolesAction, selectedIndividualRoles } from '../redux/actions/rolesAction';
import { individualformdata, individualSentData } from '../redux/actions/individualformdata';
import { accountType } from '../redux/actions/accountType';
import SetupRolesTick from '../components/SetupRolesTick';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

// eslint-disable-next-line react/prefer-stateless-function
export class SetupRolesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loading: false,
      selectedRolesIds: []
    };
    this.onDone = this.onDone.bind(this);
  }

  componentDidMount() {
    this.props.rolesAction();
    this.props.selectedIndividualRoles();
  }

  // componentDidUpdate(prevprops, prevstate) {

  // }

  onDone() {
    const skills = [];
    // console.log(this.props.accounttype, this.props.individualform)
    const { individuals, selectedroles, individualform } = this.props;
    if (this.props.individuals.data !== undefined && selectedroles !== undefined) {
      individuals.data.forEach(element => {
        selectedroles.forEach(data => {
          if (element.name === data) {
            skills.push(element.id);
          }
        });
      });
    }
    const account_type = this.props.accounttype;
    const user_id = 3;
    const full_name = individualform[0];
    const date_of_birth = individualform[1];
    const { lat, lng, formatted_address, city, country } = individualform[2];
    const gender = individualform[3];
    const profile_picture = individualform[4];
    const c = profile_picture.path.split('/');
    const len = c.length - 1;
    const skillset = skills.join();
    const photo = {
      uri: profile_picture.path,
      type: profile_picture.mime,
      name: c[len],
      size: profile_picture.size
    };
    const body = new FormData();
    body.append('photo', photo);
    body.append('user_id', user_id);
    body.append('account_type', account_type);
    body.append('full_name', full_name);
    body.append('date_of_birth', date_of_birth);
    body.append('gender', gender);
    body.append('lat', lat);
    body.append('lng', lng);
    body.append('formatted_address', formatted_address);
    body.append('city', city);
    body.append('country', country);
    body.append('skillset', skillset);

    const send = body;
    this.props.individualSentData(send);
    console.log(individualform[2]);
  }

  render() {
    const { data } = this.props.individuals;
    const individualroles = this.props.selectedroles;

    if (data) {
      return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20 }}>Setup</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
              Choose Your Roles
            </Text>
            <Text>(Select all that apply)</Text>
          </View>
          <View style={{ flex: 5, backgroundColor: '#f1f1f1' }}>
            <View
              style={{
                elevation: 5,
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                height: 60,
                backgroundColor: 'white',
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20
              }}>
              <Input
                onChangeText={text => this.setState({ text })}
                containerStyle={{ width: 'auto' }}
                inputContainerStyle={{
                  height: 30,
                  borderWidth: 2,
                  borderColor: '#dedede',
                  borderRadius: 50,
                  width: 300
                }}
                rightIcon={<Icon name="search" />}
                rightIconContainerStyle={{ marginRight: 30 }}
              />
            </View>
            <ScrollView contentInset={{ top: 100 }}>
              <View
                style={{
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}>
                {data.map(e => (
                  <SetupRolesGradient
                    key={e.id}
                    text={e.name}
                    id={e.id}
                    total={this.props.individuals.data}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 2.5, backgroundColor: '#f1f1f1' }}>
            <Text
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                textAlign: 'center',
                fontSize: 10
              }}>
              Can't find the appriopriate role? Submit a suggestion
              <Icon name="arrow-right" size={10} />
            </Text>
            <View
              style={{
                justifyContent: 'space-around',
                alignContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                elevation: 20,
                backgroundColor: 'white',
                height: 60,
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                paddingLeft: 10,
                paddingRight: 10
              }}>
              {this.props.selectedroles &&
                individualroles.length > 0 &&
                this.props.selectedroles.map((e, id) => (
                  <SetupRolesTick roles={e} key={id} total={this.props.selectedroles} id />
                ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={this.onDone}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 40,
              alignItems: 'center',
              flexDirection: 'row',
              width: 80,
              backgroundColor: 'red',
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              borderTopLeftRadius: 100,
              borderBottomLeftRadius: 100
            }}>
            <Text style={{ color: 'white' }}>Done </Text>
            <Customon name="arrow-right-endgame" color="white" />
          </TouchableOpacity>
        </View>
      );
    }
    return <ActivityIndicator />;
  }
}

const mapStateToProps = state => ({
  individuals: state.roles.individual,
  selectedroles: state.roles.selectedindividual,
  individualform: state.individualform.individualData,
  accounttype: state.accounttype.acctype
});

export default connect(
  mapStateToProps,
  {
    rolesAction,
    selectedIndividualRoles,
    individualSentData,
    accountType,
    individualformdata
  }
)(SetupRolesScreen);
