/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { connect } from 'react-redux';
import axios from 'axios';
import { castingCallRolesItems } from '../redux/actions/postajob';
import { apiurl } from '../constants/config';

class CastingCallRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderpoints: [22, 37],
      gender: 'Any/All',
      iconpress: false,
      role_description: '',
      roles: [],
      selectedrole: '1'
    };
  }

  componentWillMount() {
    axios.get(`${apiurl}fetch-role-type.php`).then(res => this.setState({ roles: res.data }));
  }

  componentDidUpdate() {
    const { sliderpoints, gender, role_description, selectedrole } = this.state;
    const total = {
      sliderpoints,
      gender,
      role_description,
      selectedrole
    };
    this.props.castingCallRolesItems(total);
    // console.log(total)
  }

  render() {
    const { sliderpoints, gender, roles, selectedrole } = this.state;
    return (
      <View style={{ paddingTop: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.titlestyle}>Role Type</Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#dedede',
              height: 23,
              width: 150
            }}>
            {roles.data !== undefined && (
              <Picker
                selectedValue={selectedrole}
                onValueChange={(itemValue, itemIndex) => this.setState({ selectedrole: itemValue })}
                style={{ height: 23, width: 150 }}>
                {roles.data.map(e => (
                  <Picker.Item
                    key={e.id}
                    label={e.name}
                    value={e.id}
                    style={{ fontSize: 10, fontFamily: 'Poppins-Medium' }}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.titlestyle}>Role Description</Text>
          <TextInput
            style={{
              height: 60,
              borderWidth: 1,
              padding: 8,
              width: '90%',
              borderColor: '#dedede',
              textAlignVertical: 'top'
            }}
            placeholder="Write here"
            onChangeText={role_description => this.setState({ role_description })}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.titlestyle}>Gender</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => this.setState({ gender: 'Any/All' })}>
              <Text style={[styles.gendertext, { color: gender === 'Any/All' ? 'red' : 'black' }]}>
                Any/All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ gender: 'Female' })}>
              <Text style={[styles.gendertext, { color: gender === 'Female' ? 'red' : 'black' }]}>
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ gender: 'Male' })}>
              <Text style={[styles.gendertext, { color: gender === 'Male' ? 'red' : 'black' }]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ gender: 'Non-binary' })}>
              <Text
                style={[styles.gendertext, { color: gender === 'Non-binary' ? 'red' : 'black' }]}>
                Non-binary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ gender: 'Transgender' })}>
              <Text
                style={[styles.gendertext, { color: gender === 'Transgender' ? 'red' : 'black' }]}>
                Transgender
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ gender: 'GenderFluid' })}>
              <Text
                style={[styles.gendertext, { color: gender === 'GenderFluid' ? 'red' : 'black' }]}>
                GenderFluid
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.titlestyle}>Age Range</Text>
            <View
              style={{
                paddingTop: 10,
                flexDirection: 'row',
                flexWrap: 'nowrap',
                width: '100%',
                marginHorizontal: 'auto'
              }}>
              <Text style={{ textAlignVertical: 'center' }}>0</Text>
              <MultiSlider
                isMarkersSeparated
                snapped
                customMarkerLeft={() => (
                  <View>
                    <Text style={{ position: 'absolute', bottom: 20 }}>{sliderpoints[0]}</Text>
                    <Icon
                      name="circle"
                      size={20}
                      color="red"
                      style={{ backgroundColor: '#f1f1f1' }}
                    />
                  </View>
                )}
                customMarkerRight={() => (
                  <View>
                    <Text style={{ position: 'absolute', bottom: 20 }}>{sliderpoints[1]}</Text>
                    <Icon
                      name="circle"
                      size={20}
                      color="red"
                      style={{ backgroundColor: '#f1f1f1' }}
                    />
                  </View>
                )}
                values={sliderpoints}
                onValuesChange={e => this.setState({ sliderpoints: e })}
                minMarkerOverlapDistance={10}
                min={0}
                max={100}
                selectedStyle={{ backgroundColor: 'red', height: 3 }}
                markerStyle={{ backgroundColor: 'white', borderColor: 'red', borderWidth: 2 }}
              />
              <Text style={{ textAlignVertical: 'center' }}>100+</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titlestyle: {
    fontSize: 15,
    fontFamily: 'Poppins-Meduim',
    color: '#414141',
    marginBottom: 10
  },
  gendertext: {
    fontSize: 10
  }
});

export default connect(
  null,
  { castingCallRolesItems }
)(CastingCallRoles);
