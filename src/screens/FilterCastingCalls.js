import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker,
  ImageBackground,
  Image
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { List, Checkbox, RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import fontelloConfig from '../config.json';
import HeaderComponent from '../components/HeaderComponent';
import WalletPromotion from '../components/WalletPromotion';
import { fetchProductionType } from '../redux/actions/fetchProductionType';
import { rolesType, rolesAction } from '../redux/actions/rolesAction';

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');
class FilterCastingCalls extends Component {
  state = {
    sliderOneChanging: false,
    sliderOneValue: [2],
    multiSliderValue: [3, 7],
    sliderpoints: [20, 70],
    production_type_id: 'all',
    gender: 'Any/All',
    role: 'all',
    role_type: 'all',
    location: ''
  };

  componentDidMount() {
    this.props.fetchProductionType();
    this.props.rolesType();
    this.props.rolesAction();
  }

  componentDidUpdate() {
    // console.log(this.props.productiontype);
    console.log(this.props.skills);
    console.log(this.props.roletype);
  }

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true
    });
  };

  sliderOneValuesChange = values => {
    const newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false
    });
  };

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };

  render() {
    const { sliderpoints, production_type_id, gender, role, role_type, location } = this.state;
    const { productiontype, skills, roletype } = this.props;
    const age_from = sliderpoints[0];
    const age_to = sliderpoints[1];
    const casting_call = '';
    const filters = {
      casting_call,
      production_type_id,
      gender,
      age_from,
      age_to,
      role,
      role_type,
      location
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Customon
              style={styles.arrowback}
              name="x"
              size={12}
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.title}> Filter Casting Calls </Text>
          <TouchableOpacity>
            <Customon
              style={styles.arrowback2}
              name="check"
              size={20}
              onPress={() => this.props.navigation.push('CastingCallsScreen', { filters })}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ paddingLeft: 10, marginTop: 8 }}>
            <Text
              style={{
                color: '#808080',
                fontSize: 15,
                fontFamily: 'Poppins-Medium'
              }}>
              Location
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.searchCurve}>
                <TextInput
                  style={styles.search}
                  placeholder="Type a location here"
                  value={location}
                  onChangeText={location => this.setState({ location })}
                />
                <Customon name="search" size={15} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Customon style={{ marginRight: 4 }} name="map-marker-alt" size={12} color="red" />
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: 'Poppins-Meduim',
                  color: '#000'
                }}>
                Worldwide
              </Text>
            </View>
            <View style={{ padding: 15 }}>
              <Text
                style={{
                  paddingLeft: 35,
                  fontSize: 11,
                  fontFamily: 'Poppins-Medium',
                  color: '#000000'
                }}>
                Radius (miles)
              </Text>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -15
                }}>
                <MultiSlider
                  values={this.state.sliderOneValue}
                  sliderLength={284}
                  markerStyle={{
                    backgroundColor: '#fff',
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 30,
                    width: 15,
                    height: 15
                  }}
                  selectedStyle={{
                    // height: 10,
                    backgroundColor: 'red'
                  }}
                  onValuesChangeStart={this.sliderOneValuesChangeStart}
                  onValuesChange={this.sliderOneValuesChange}
                  onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                />
              </View>
              <View style={styles.sliders}>
                <View style={styles.sliderOne}>
                  <Text style={[styles.text, this.state.sliderOneChanging && { color: 'red' }]}>
                    {this.state.sliderOneValue}
                  </Text>
                  <Text style={styles.text}>&nbsp;miles</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 10, marginTop: 8 }}>
            <Text
              style={{
                color: '#808080',
                fontSize: 15,
                fontFamily: 'Poppins-Medium'
              }}>
              Age Range
            </Text>
          </View>
          <View style={styles.range}>
            {/* <View style={styles.sliderTwo}>
              <Text style={styles.text}>{this.state.multiSliderValue[0]} </Text>
              <Text style={styles.text}>{this.state.multiSliderValue[1]}</Text>
            </View> */}
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
                    <FontAwesome5
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
                    <FontAwesome5
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
                markerStyle={{
                  backgroundColor: 'white',
                  borderColor: 'red',
                  borderWidth: 2
                }}
              />
              <Text style={{ textAlignVertical: 'center' }}>100+</Text>
            </View>
          </View>

          <View style={{ paddingLeft: 10, marginTop: 8 }}>
            <Text
              style={{
                color: '#808080',
                fontSize: 15,
                fontFamily: 'Poppins-Medium'
              }}>
              Production Type
            </Text>
          </View>
          <View style={styles.range2}>
            <RadioButton.Group
              onValueChange={production_type_id => this.setState({ production_type_id })}
              value={production_type_id}>
              <View
              // style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}
              >
                <View style={{ marginRight: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="all" />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-Medium',
                        color: '#000'
                      }}>
                      Select all
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start'
                  }}>
                  {productiontype.map(item => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 0.33 * width
                        // paddingHorizontal: 5
                      }}>
                      <RadioButton value={item.id} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                          color: '#000'
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View style={{ paddingLeft: 10, marginTop: 8 }}>
            <Text
              style={{
                color: '#808080',
                fontSize: 15,
                fontFamily: 'Poppins-Medium'
              }}>
              Gender
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: '#ffff',
              marginTop: 1,
              padding: 10
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginLeft: 7,
                marginRight: 7
              }}>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Any/All' })}>
                <Text
                  style={{
                    color: gender === 'Any/All' ? '#fb0201' : '#808080',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Any/All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Female' })}>
                <Text
                  style={{
                    color: gender === 'Female' ? '#fb0201' : '#808080',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Male' })}>
                <Text
                  style={{
                    color: gender === 'Male' ? '#fb0201' : '#808080',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Non-binary' })}>
                <Text
                  style={{
                    color: gender === 'Non-binary' ? '#fb0201' : '#808080',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Non-binary
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Transgender' })}>
                <Text
                  style={{
                    color: gender === 'Transgender' ? '#fb0201' : '#808080',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Transgender
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ gender: 'Genderfluid' })}>
                <Text
                  style={{
                    color: gender === 'Genderfluid' ? '#fb0201' : '#808080',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Genderfluid
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingLeft: 10, marginTop: 8 }}>
            <Text
              style={{
                color: '#808080',
                fontSize: 15,
                fontFamily: 'Poppins-Medium'
              }}>
              Role
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: '#ffff',
              marginTop: 1
            }}>
            <RadioButton.Group onValueChange={role => this.setState({ role })} value={role}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="all" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                      color: '#000'
                    }}>
                    Show all
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={role !== 'any'} />
                  {skills.data !== undefined && (
                    <Picker
                      selectedValue={role}
                      style={{
                        height: 50,
                        width: 148,
                        marginLeft: 5
                      }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ role: itemValue })}>
                      {skills.data.map(item => (
                        <Picker.Item label={item.name} value={item.id} key={item.id} />
                      ))}
                    </Picker>
                  )}
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={{ paddingLeft: 10, marginTop: 8, }}>
            <Text
              style={{
                color: '#808080',
                fontSize: 15,
                fontFamily: 'Poppins-Medium'
              }}>
              Role Type
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: '#ffff',
              marginTop: 1
            }}>
            <RadioButton.Group
              onValueChange={role_type => this.setState({ role_type })}
              value={role_type}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="all" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                      color: '#000'
                    }}>
                    Select all
                  </Text>
                </View>

                {roletype.data !== undefined && (
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between'
                    }}>
                    {roletype.data.map(item => (
                      <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15, marginBottom: 10}}>
                        <RadioButton value={item.name} />
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins-Medium',
                            color: '#000'
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </RadioButton.Group>
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

  range: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1
  },
  range2: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    // padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1
  },
  range3: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    // padding: 15,

    alignItems: 'center',
    marginTop: 1
  },
  text: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#000000'
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    // justifyContent: 'space-around',
  },
  sliderTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // justifyContent: 'space-around',
  },
  search: {
    width: 240,
    padding: 0,
    textAlign: 'left',
    fontFamily: 'Poppins-Meduim',
    fontSize: 14,
    color: '#bfbfbf'
  },
  searchCurve: {
    alignItems: 'center',
    width: 284,
    height: 29,
    marginBottom: 15,
    paddingLeft: 15,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 30,
    borderColor: '#dedede',
    borderStyle: 'solid',
    borderWidth: 3,
    flexDirection: 'row'
  },
  searchContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    padding: 15,
    height: 164,
    marginTop: 1
  },

  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },

  headerArrow: {
    flex: 1
  },

  headerTitle: {
    flex: 2,
    marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => ({
  productiontype: state.fetchProductionType.productiontype,
  skills: state.roles.roletypes,
  roletype: state.roles.individual
});

export default connect(
  mapStateToProps,
  { fetchProductionType, rolesAction, rolesType }
)(FilterCastingCalls);
