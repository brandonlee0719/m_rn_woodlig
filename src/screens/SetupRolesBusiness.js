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
export class SetupRolesBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      text: '',
      search: [],
      loading: false,
      selectedRolesIds: []
    };
    this.onDone = this.onDone.bind(this);
  }

  componentWillMount() {
    axios
      .get('https://woodlig.000webhostapp.com/controllers/mobile/fetch-business-skills.php')
      .then(res => this.setState({ roles: res.data.data }));
  }
  // componentDidMount() {
  //   this.props.rolesAction();
  //   this.props.selectedIndividualRoles();
  // }

  // componentDidUpdate(prevprops, prevstate) {
  //   const { roles, text, search } = this.state;
  //   console.log(search)
  // }

  handleTextChange(text) {
    const { roles } = this.state;
    const search = [];
    const regexp1 = new RegExp(`${text}`, 'gi');
    // console.log(regexp1);
    this.setState({ text });
    roles.forEach(e => {
      if (regexp1.test(e.name) === true) {
        search.push(e);
      }
    });
    this.setState({ search });
    // {if(regexp1.test(e)===true) {console.log(e)}})
  }

  onDone() {
    const skills = [];
    const { roles } = this.state;
    // console.log(this.props.accounttype, this.props.individualform)
    const { individuals, selectedroles, formdata } = this.props;
    if (roles !== [] && selectedroles !== undefined) {
      roles.forEach(element => {
        selectedroles.forEach(data => {
          if (element.name === data) {
            skills.push(element.id);
          }
        });
      });
    }
    const account_type = this.props.accounttype;
    const user_id = 3;
    const business_name = formdata[0];
    const business_description = formdata[5];
    const { lat, lng, formatted_address, city, country } = formdata[2];
    const business_phone = formdata[3];
    const profile_picture = formdata[4];
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
    body.append('account_type', 'business');
    body.append('business_name', business_name);
    body.append('business_description', business_description);
    body.append('business_phone', business_phone);
    body.append('lat', lat);
    body.append('lng', lng);
    body.append('formatted_address', formatted_address);
    body.append('city', city);
    body.append('country', country);
    body.append('skillset', skillset);

    axios
      .post(
        'https://woodlig.000webhostapp.com/controllers/mobile/update-user-setup-details.php',
        body
      )
      .then(res => console.log(res.data))
      .catch(res => console.log('error'));
    //   const send = body
    //   this.props.individualSentData(send)
    //   console.log(individualform[2])
    console.log(skills);
  }

  render() {
    const { roles, text, search } = this.state;
    if (roles) {
      return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20 }}>Setup</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
              Tell Us About Your Business
            </Text>
            <Text>(You may pick multiple options)</Text>
          </View>
          <View style={{ flex: 5, backgroundColor: '#f1f1f1' }}>
            <View
              style={{
                elevation: 1,
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
                onChangeText={this.handleTextChange.bind(this)}
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
                {text === ''
                  ? roles.map(e => (
                      <SetupRolesGradient key={e.id} text={e.name} id={e.id} value={e} />
                    ))
                  : search.map(e => (
                      <SetupRolesGradient key={e.id} text={e.name} id={e.id} value={e} />
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
                roles.length > 0 &&
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
  selectedroles: state.roles.selectedindividual,
  accounttype: state.accounttype.acctype,
  formdata: state.individualform.businessData
});

export default connect(mapStateToProps)(SetupRolesBusiness);
