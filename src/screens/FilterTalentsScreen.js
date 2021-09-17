import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StatusBar,
  StyleSheet,
  Picker,
  TouchableOpacity
} from 'react-native';
import { Appbar, RadioButton } from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { rolesAction } from '../redux/actions/rolesAction';

import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

const { width, height } = Dimensions.get('window');
class FilterTalentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      gender: 'Any/All',
      sliderpoints: [22, 37],
      mileage: [50]
    };
    this.onValuesChange = this.onValuesChange.bind(this);
  }

  componentDidMount() {
    this.props.rolesAction();
  }

  componentWillReceiveProps(b) {
    console.log(b.roles);
  }

  onValuesChange(a) {
    this.setState({ mileage: a });
  }

  render() {
    const { value, gender, sliderpoints, mileage } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} backgroundColor="white" barStyle="dark-content" />
        <Appbar.Header>
          <Appbar.Action
            icon={() => <FontAwesome5 name="times" color="black" size={20} />}
            onPress={this._goBack}
          />
          <Appbar.Content title="Filter Talents" />
          <Appbar.Action
            icon={() => <FontAwesome5 name="check" color="#000" size={20} />}
            onPress={this._onMore}
          />
        </Appbar.Header>
        <View>
          <View style={styles.topicStyles}>
            <Text style={styles.topicTextStyle}>Skill</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: 'white',
              flexDirection: 'row'
            }}>
            <RadioButton.Group
              onValueChange={value => this.setState({ value })}
              value={this.state.value}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <RadioButton value="first" />
                <Text>Show all</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="second" />
                <View
                  style={{
                    borderWidth: 1,
                    width: 150,
                    height: 23,
                    borderColor: '#dedede',
                    borderRadius: 20
                  }}>
                  <Picker
                    selectedValue={value}
                    style={{
                      borderBottomWidth: 20,
                      height: 23,
                      width: 150
                    }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ value: itemValue })}>
                    <Picker.Item label="java" value={9} />
                    <Picker.Item label="java" value={9} />
                    <Picker.Item label="java" value={9} />
                    <Picker.Item label="java" value={9} />
                  </Picker>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View style={styles.topicStyles}>
            <Text style={styles.topicTextStyle}>Location</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: 'white',
              height: 200,
              elevation: 1
            }}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 30,
                  width: '70%',
                  borderWidth: 3,
                  borderColor: '#dedede',
                  borderRadius: 20
                }}>
                <TextInput
                  placeholder="Type a location here"
                  style={{
                    height: 30,
                    fontSize: 13,
                    padding: 0,
                    paddingLeft: 20,
                    width: '80%'
                  }}
                />
                <FontAwesome5 name="search" style={{ paddingRight: 20 }} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                paddingVertical: 20
              }}>
              <Customon
                name="mapmarkericonforaddlocationbesidetextthatiswrappedwitharedcircle"
                size={20}
                color="red"
              />
              <Text style={{ color: 'black' }}>&nbsp;Worldwide</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text>Radius (miles)</Text>
              <View style={{ alignItems: 'center' }}>
                <MultiSlider
                  values={mileage}
                  min={0}
                  max={200}
                  sliderLength={width - 40}
                  selectedStyle={{ backgroundColor: 'red' }}
                  markerStyle={{ backgroundColor: 'red' }}
                  onValuesChange={this.onValuesChange}
                />
              </View>
              <Text style={{ textAlign: 'center' }}>{mileage.toString()} miles</Text>
            </View>
          </View>
          <View style={styles.topicStyles}>
            <Text style={styles.topicTextStyle}>Age Range</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: 'white',
              elevation: 1
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ textAlignVertical: 'center' }}>0</Text>
              <MultiSlider
                isMarkersSeparated
                snapped
                sliderLength={width - 50}
                customMarkerLeft={() => (
                  <View>
                    <Text style={{ position: 'absolute', bottom: 20 }}>{sliderpoints[0]}</Text>
                    <FontAwesome5
                      name="circle"
                      size={20}
                      color="red"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                  </View>
                )}
                customMarkerRight={() => (
                  <View>
                    <Text style={{ position: 'absolute', bottom: 20 }}>{sliderpoints[1]}</Text>
                    <FontAwesome5
                      name="circle"
                      size={20}
                      color="red"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                  </View>
                )}
                values={sliderpoints}
                onValuesChange={e => this.setState({ sliderpoints: e })}
                minMarkerOverlapDistance={10}
                min={0}
                max={100}
                selectedStyle={{ backgroundColor: 'red', height: 3 }}
                markerStyle={{
                  backgroundColor: 'white',
                  borderColor: 'red',
                  borderWidth: 2
                }}
              />
              <Text style={{ textAlignVertical: 'center' }}>100+</Text>
            </View>
          </View>
          <View style={styles.topicStyles}>
            <Text style={styles.topicTextStyle}>Gender</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: 'white',
              elevation: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Any/All' })}>
                <Text
                  style={[styles.gendertext, { color: gender === 'Any/All' ? 'red' : 'black' }]}>
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
                  style={[
                    styles.gendertext,
                    { color: gender === 'Transgender' ? 'red' : 'black' }
                  ]}>
                  Transgender
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ gender: 'GenderFluid' })}>
                <Text
                  style={[
                    styles.gendertext,
                    { color: gender === 'GenderFluid' ? 'red' : 'black' }
                  ]}>
                  GenderFluid
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topicStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  topicTextStyle: {
    fontSize: 15,
    color: '#000'
  },
  gendertext: {
    fontSize: 20
  }
});

const mapStateToProps = state => ({
  roles: state.roles.indivividual
});

export default connect(
  null,
  { rolesAction }
)(FilterTalentsScreen);
