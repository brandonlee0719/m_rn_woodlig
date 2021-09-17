import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet
} from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import { Appbar, FAB, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import fontelloConfig from '../config.json';
import { apiurl, imageurl } from '../constants/config';
import ActivityStream from '../components/ActivityStream';

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');

class MarketPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.filterProducts = this.filterProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
  }

  componentDidMount() {
    const { navigation, user_id } = this.props;
    const filterParam = navigation.getParam('filterParam');
    if (filterParam) {
      axios
        .post(`${apiurl}search-products.php?user_id=${user_id}`, filterParam)
        .then(res => {
          this.setState({ data: res.data });
        })
        .catch(res => console.log(res.data));
    } else {
      axios
        .get(`${apiurl}fetch-all-products?user_id=${user_id}`)
        .then(res => this.setState({ data: res.data }))
        .catch(res => console.log(res.data));
    }
  }

  async filterProducts(e) {
    const { user_id } = this.props;
    this.setState({ loading: true, data: [] });
    await axios
      .post(`${apiurl}search-products.php?user_id=${user_id}&category=${e}`)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  }

  async sortProducts(e) {
    const { user_id } = this.props;
    this.setState({ loading: true, data: [] });
    await axios
      .post(`${apiurl}search-products.php?user_id=${user_id}&sort=${e}`)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  }

  render() {
    const { profilepicture } = this.props;
    const { data, loading } = this.state;
    if (loading === false) {
      return (
        <View style={{ backgroundColor: 'black' }}>
          <StatusBar translucent={false} backgroundColor="#ffffff" barStyle="dark-content" />

          <FAB
            style={styles.fab}
            icon={() => <Customon name="filter" color="#fb0201" size={22} />}
            onPress={() => this.props.navigation.navigate('FilterMarketPlace')}
          />
          <View>
            <FlatList
              ListHeaderComponent={
                <View
                  style={{
                    paddingHorizontal: 20
                  }}>
                  <Text>Categories</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <ImageBackground
                      source={require('../images/equip.png')}
                      style={{ height: 100, width: 100 }}>
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => this.filterProducts('products')}>
                        <Text style={styles.buttonText}>Equipments</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                    <View style={{ justifyContent: 'space-between' }}>
                      <ImageBackground
                        source={require('../images/venue.png')}
                        style={{ height: 40, width: 100 }}>
                        <TouchableOpacity
                          style={styles.buttonStyle}
                          onPress={() => this.filterProducts('products')}>
                          <Text style={styles.buttonText}>Venues</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../images/resources.png')}
                        style={{ height: 40, width: 100 }}>
                        <TouchableOpacity
                          style={styles.buttonStyle}
                          onPress={() => this.filterProducts('products')}>
                          <Text style={styles.buttonText}>Resouces</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                    <ImageBackground
                      source={require('../images/services.png')}
                      style={{ height: 100, width: 100 }}>
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => this.filterProducts('services')}>
                        <Text style={styles.buttonText}>Services</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20
                    }}>
                    <TouchableOpacity style={styles.filterButtons}>
                      <Text>Featured</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterButtons}
                      onPress={() => this.sortProducts('popular')}>
                      <Text>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterButtons}
                      onPress={() => this.sortProducts('newest')}>
                      <Text>New entries</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
              style={{ backgroundColor: '#eeeeee' }}
              data={data.data}
              renderItem={({ item }) => (
                <ActivityStream
                  productname={item.name}
                  productpurpose={item.purpose}
                  productprice={item.price}
                  producttype={item.product_type}
                  formatted_address={item.formatted_address}
                  type={item.type}
                  path={item.path}
                  likes={item.likes}
                  like_status={item.like_status}
                  theirid={item.post_user_id}
                  postid={item.post_id}
                  productid={item.product_id}
                  likestatus={item.like_status}
                  Item={item}
                />
              )}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fb0201" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#fff',
    margin: 16,
    right: 0,
    top: height - 220,
    zIndex: 100000000000
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    // fontWeight: '700',
    letterSpacing: 1.47
  },
  filterButtons: {
    width: 101,
    height: 34,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 25,
    backgroundColor: '#ffffff'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  activitystreamdata: state.activitystreamdata.activitystream
});

export default connect(mapStateToProps)(MarketPlaceScreen);
