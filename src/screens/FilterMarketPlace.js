/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);
export default class FilterMarketPlace extends Component {
  state = {
    location: '',
    min_price: '',
    max_price: ''
  };

  componentDidMount() {
    const { navigation } = this.props;
  }

  handleFilter = () => {
    const { location, min_price, max_price } = this.state;
    const filterParam = { location, min_price, max_price };
    this.props.navigation.push('MarketPlace', { filterParam });
  };

  render() {
    const { location, min_price, max_price } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />
        <View style={styles.header}>
          <View style={styles.headerArrow}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Customon style={styles.arrowback} name="x" size={15} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Filter Market Place</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.handleFilter}>
              <Customon style={styles.arrowback} name="check" size={15} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Location</Text>
        </View>
        <View style={styles.catSearch}>
          <View style={styles.search}>
            <TextInput
              value={location}
              onChangeText={location => this.setState({ location })}
              style={{ width: 300, fontFamily: 'Poppins-Medium', fontSize: 11 }}
              placeholder="Type a location"
            />
            <FontAwesome5 style={styles.arrowback} name="search" size={15} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome5 style={styles.arrowback2} name="map-marker-alt" size={15} />
            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>Worldwide</Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Price Range</Text>
        </View>
        <View style={styles.price}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>Min</Text>
            <View style={styles.priceMin}>
              <TextInput
                value={min_price}
                onChangeText={min_price => this.setState({ min_price })}
                style={{ width: 300, fontFamily: 'Poppins-Medium', fontSize: 11, padding: 0 }}
                placeholder="0"
              />
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>Max</Text>
            <View style={styles.priceMin}>
              <TextInput
                value={max_price}
                onChangeText={max_price => this.setState({ max_price })}
                style={{ width: 300, fontFamily: 'Poppins-Medium', fontSize: 11, padding: 0 }}
                placeholder="99999999999999999"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  priceMin: {
    width: 142,
    height: 32,
    borderRadius: 5,
    borderColor: '#e7e4e9',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: '#f1f0f2'
  },
  price: {
    height: 81,
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    padding: 15,
    flexDirection: 'row'
  },
  search: {
    width: 343,
    height: 41,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 7,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  catSearch: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    height: 111,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    shadowOffset: { width: 3, height: 0 },
    elevation: 5
  },
  headerTitle: {
    // marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },

  arrowback: {
    color: '#000'
  },

  arrowback2: {
    color: 'red',
    marginRight: 8
  },

  headerArrow: {
    // flex: 1
  }
});
