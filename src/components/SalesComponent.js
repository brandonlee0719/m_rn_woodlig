import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Picker,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Avatar, RadioButton, Checkbox, Menu, Divider } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';
import CountryPicker from 'react-native-country-picker-modal';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { postValues } from '../redux/actions/handleYourMind';
import { fetchProductionType } from '../redux/actions/fetchProductionType';

import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

const { height, width } = Dimensions.get('window');
class SalesComponent extends Component {
  state = {
    category: 'product',
    screenHeight: 0,
    // value: '',
    product_type_id: '2',
    privacy: 'public',
    visible: false,
    cca2: 'US',
    currency: 'USD',
    name: '',
    price: '',
    description: '',
    purpose: ''
  };

  componentDidMount() {
    this.props.fetchProductionType();
  }

  componentDidUpdate() {
    const {
      name,
      category,
      product_type_id,
      purpose,
      privacy,
      price,
      currency,
      description
    } = this.state;
    const { selectedlocation } = this.props;
    const datum = {
      name,
      category,
      product_type_id,
      purpose,
      privacy,
      price,
      currency,
      description,
      ...selectedlocation
    };
    this.props.postValues(datum);
  }

  onContentSizeChange = (screenWidth, screenHeight) => {
    this.setState({ screenHeight });
  };

  render() {
    const {
      category,
      product_type_id,
      checked,
      privacy,
      visible,
      price,
      description,
      purpose,
      name,
      currency
    } = this.state;
    const { productiontype, selectedlocation } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#eeeeee',
          marginBottom: 210
        }}>
        <ScrollView
          scrollEnabled
          contentContainerStyle={{
            width: width - 20,
            marginTop: 20,
            backgroundColor: '#ffffff',
            borderRadius: 25
          }}
          onContentSizeChange={this.onContentSizeChange}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 10
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar.Image size={50} source={require('../images/Avatar_invisible_circle_1.png')} />
              <Text style={{ color: '#bcc5d3', fontFamily: 'Poppins-Medium', fontSize: 10 }}>
                @Humphrey_jerome
              </Text>
            </View>
                {/*<FontAwesome5
                  name="shopping-cart"
                  size={15}
                  color="#d1d1d1"
                  style={{ paddingRight: 20 }}
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
                        color: '#808080'
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
          <View style={{ paddingHorizontal: 20 }}>
            <View style={[styles.itemContainer, { alignItems: 'center' }]}>
              <Text
                style={{
                  color: '#414141',
                  fontSize: 17,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium'
                }}>
                What do you want to sell?
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[
                    styles.saleTypeButton,
                    {
                      backgroundColor: category === 'product' ? '#fb0201' : '#ffffff'
                    }
                  ]}
                  onPress={() => this.setState({ category: 'product' })}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Poppins-Meduim',
                      color: category === 'product' ? '#ffffff' : '#3e3e3e'
                    }}>
                    Product
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.saleTypeButton,
                    {
                      backgroundColor: category === 'service' ? '#fb0201' : '#ffffff'
                    }
                  ]}
                  onPress={() => this.setState({ category: 'service' })}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Poppins-Meduim',
                      color: category === 'service' ? '#ffffff' : '#3e3e3e'
                    }}>
                    Service
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../images/Product-placeholder-img.png')}
                  style={styles.productImage}
                />
                <Customon
                  name="plus-circle"
                  size={20}
                  style={{ marginHorizontal: 10 }}
                  color="#fb0201"
                />
                <Text style={{ color: '#fb0201', fontFamily: 'Poppins-Meduim', fontSize: 13 }}>
                  Add Photo(s)
                </Text>
              </View>
            </View>
            {category === 'product' && (
              <View style={styles.itemContainer}>
                <Text style={styles.fieldTitle}>Add Product Name</Text>
                <TextInput
                  placeholder="Write name of product"
                  value={name}
                  onChangeText={name => this.setState({ name })}
                  style={{
                    width: 219,
                    height: 23,
                    padding: 0,
                    borderBottomWidth: 0.5
                  }}
                />
              </View>
            )}
            {category === 'service' && (
              <View style={styles.itemContainer}>
                <Text style={styles.fieldTitle}>Title</Text>
                <TextInput
                  onChangeText={name => this.setState({ name })}
                  value={name}
                  placeholder="Write name of product"
                  style={{
                    width: 219,
                    height: 23,
                    padding: 0,
                    borderBottomWidth: 0.5
                  }}
                />
              </View>
            )}
            {category === 'product' && (
              <View style={styles.itemContainer}>
                <Text style={styles.fieldTitle}>Add Product Type</Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: 150,
                    height: 23,
                    borderColor: '#dedede',
                    borderRadius: 20
                  }}>
                  <Picker
                    selectedValue={product_type_id}
                    style={{
                      borderBottomWidth: 20,
                      height: 23,
                      width: 150,
                      fontFamily: 'Poppins-Meduim',
                      fontSize: 13,
                      color: '#000000'
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ product_type_id: itemValue })
                    }>
                    {productiontype.map(e => (
                      <Picker.Item label={e.name} value={e.id} key={e.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}
            {category === 'service' && (
              <View style={styles.itemContainer}>
                <Text style={styles.fieldTitle}>Type of Service</Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: 150,
                    height: 23,
                    borderColor: '#dedede',
                    borderRadius: 20
                  }}>
                  <Picker
                    selectedValue={product_type_id}
                    style={{
                      borderBottomWidth: 20,
                      height: 23,
                      width: 150,
                      fontFamily: 'Poppins-Meduim',
                      fontSize: 13,
                      color: '#000000'
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ product_type_id: itemValue })
                    }>
                    {productiontype.map(e => (
                      <Picker.Item label={e.name} value={e.id} key={e.id} />
                    ))}
                  </Picker>
                </View>
                {/* <TextInput
                  style={{
                    width: 219,
                    height: 23,
                    padding: 0,
                    borderBottomWidth: 1
                  }}
                  placeholder="Please specify here"
                /> */}
              </View>
            )}
            {category === 'product' && (
              <View style={styles.itemContainer}>
                <Text style={styles.fieldTitle}>Looking to...</Text>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton.Group
                    onValueChange={purpose => this.setState({ purpose })}
                    value={this.state.purpose}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton color="#0ce0b5" value="sell" />
                      <Text>Sell</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton color="#0ce0b5" value="rent" />
                      <Text>Rent</Text>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            )}
            <View style={styles.itemContainer}>
              <Text style={styles.fieldTitle}>Choose Currency</Text>
              {/* <Text
                ref={countryPicker => {
                  this.countryPicker = countryPicker;
                }}
                onPress={value => console.log(value)}>
                Select a currency
              </Text> */}
              <View style={{ flexDirection: 'row' }}>
                <CountryPicker
                  ref={countryPicker => {
                    this.countryPicker = countryPicker;
                  }}
                  onChange={value => {
                    console.log(value);
                    this.setState({
                      cca2: value.cca2,
                      currency: value.currency
                    });
                  }}
                  cca2={this.state.cca2}
                  translation="eng"
                />
                <Text>{currency}</Text>
              </View>
            </View>
            {category === 'product' && (
              <View style={styles.itemContainer}>
                <Text style={styles.fieldTitle}>Add Selling Price</Text>
                <TextInput
                  style={{
                    width: 219,
                    height: 23,
                    padding: 0,
                    borderBottomWidth: 0.5
                  }}
                  keyboardType="number-pad"
                  value={price}
                  onChangeText={price => this.setState({ price })}
                  placeholder="0"
                />
              </View>
            )}
            {category === 'service' && (
              <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.fieldTitle,styles.fieldT]}>Cost of Service</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({ checked: !checked });
                      }}
                    />
                    <Text>Negotiable</Text>
                  </View>
                </View>
                <TextInput
                  style={{
                    width: 219,
                    height: 23,
                    padding: 0,
                    borderBottomWidth: 0.5
                  }}
                  value={price}
                  onChangeText={price => this.setState({ price })}
                  keyboardType="number-pad"
                  editable={checked}
                  placeholder="0"
                />
              </View>
            )}
            <View style={styles.itemContainer}>
              <Text style={styles.fieldTitle}>Location</Text>
              {selectedlocation.formatted_address === undefined ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddLocationRoute')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="plus" />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#3e3e3e'
                      }}>
                      &nbsp;Add Location
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View>
                  <Text>{selectedlocation.formatted_address}</Text>
                  <Text
                    style={{ color: '#fb0201' }}
                    onPress={() => this.props.navigation.navigate('AddLocationRoute')}>
                    change
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.fieldTitle}>Add Product Description</Text>
              <TextInput
                placeholder="write description of product (100 characters)"
                multiline
                onChangeText={description => this.setState({ description })}
                style={{
                  width: 255,
                  height: 181,
                  margin: 10,
                  textAlignVertical: 'top',
                  borderColor: '#dedede',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                  padding: 8
                }}
              />
            </View>
          </View>
          {/* <View style={{ height: 2000, width, backgroundColor: '#ffffff' }} /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saleTypeButton: {
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 25,
    borderColor: '#fb0201',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  itemContainer: {
    paddingVertical: 20
  },

  fieldT:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldTitle: {
    color: '#414141',
    fontSize: 20,
    fontFamily: 'Poppins-Meduim'
  },
  productImage: {
    width: 125,
    height: 131,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 8,
    borderRadius: 13,
    backgroundColor: '#fecbcb'
  }
});

const mapStateToProps = state => ({
  productiontype: state.fetchProductionType.productiontype,
  selectedlocation: state.addpost.locationdescription
});

export default connect(
  mapStateToProps,
  { fetchProductionType, postValues }
)(withNavigation(SalesComponent));
