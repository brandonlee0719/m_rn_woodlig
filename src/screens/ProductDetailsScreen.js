import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';
import { Appbar, FAB, Portal, Modal, Avatar as PaperAvatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import fontelloConfig from '../config.json';
import { localurl, apiurl, imageurl } from '../constants/config';
import LikeComponent from '../components/LikeComponent';
import GalleryPosts from '../components/GalleryPosts';

const numeral = require('numeral');

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');
class ProductDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      productDetails: [],
      likelist: [],
      relatedproducts: []
    };
  }

  componentDidMount() {
    const { navigation, user_id } = this.props;
    const productid = navigation.getParam('productid');
    const postid = navigation.getParam('postid');
    axios
      .get(
        `${apiurl}view-product-details.php?user_id=${user_id}&product_id=${productid}&post_id=${postid}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ productDetails: res.data });
      })
      .catch(res => console.log(res.data));

    axios
      .get(`${apiurl}fetch-post-likes.php?post_id=${postid}&user_id=${user_id}`)
      .then(res => this.setState({ likelist: res.data }))
      .catch(res => console.log(res.data));

    axios
      .get(`${apiurl}fetch-related-products.php?product_id=${productid}&user_id=${user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ relatedproducts: res.data });
      })
      .catch(res => console.log('no data'));
  }

  componentDidUpdate() {
    console.log(this.state.relatedproducts);
  }

  render() {
    const { visible, productDetails, likelist, relatedproducts } = this.state;
    const { media, details } = productDetails;
    if (productDetails.length !== 0) {
      return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Portal>
            <Modal visible={visible} onDismiss={() => this.setState({ visible: false })}>
              <View style={styles.modalStyle}>
                <View>
                  <Image
                    style={{ width: 88, height: 19 }}
                    resizeMode="contain"
                    source={require('../images/woodlig-logo-alt-image.png')}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      textAlign: 'center',
                      lineHeight: 20,
                      letterSpacing: -0.16
                    }}>
                    WARNING:
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Image
                      style={{ width: 73, height: 21 }}
                      resizeMode="contain"
                      source={require('../images/Woodlig_new_logo.png')}
                    />
                    <Text style={{ fontSize: 11, color: '#000000' }}>
                      shall not be held responsible for any inconvenience between you and the poster
                      of this product. Proceed wisely and with caution.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}>
                  <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Image source={require('../images/Call.png')} />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 36,
                      width: 2,
                      backgroundColor: '#dedede',
                      marginHorizontal: 12
                    }}
                  />
                  <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Image source={require('../images/message.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Portal>
          <StatusBar translucent={false} backgroundColor="#ffffff" barStyle="dark-content" />
          <ScrollView contentContainerstyle={{}} stickyHeaderIndices={[0]} scrollEnabled>
            <View style={styles.headerBg}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20
                }}>
                <Customon
                  name="long-arrow-left"
                  size={15}
                  color="#000"
                  onPress={() => this.props.navigation.goBack()}
                />
              {/*FontAwesome5 name="ellipsis-v" size={20} color="#000" />*/}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 60
                }}>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 15,
                      fontFamily: 'Poppins-Medium',
                      lineHeight: 18
                    }}>
                    {details.name.length > 20
                      ? `${details.name.substr(0, 20)}...`
                      : `${details.name}`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                      letterSpacing: -0.24,
                      lineHeight: 18,
                      color: '#646464'
                    }}>
                    {details.product_type}
                  </Text>
                </View>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#646464',}}>2d ago</Text>
              </View>
            </View>
            <View style={{ marginTop: -100 }}>
              <Swiper style={{ height: 364, width, zIndex: -1 }}>
                {media.map((e, index) => (
                  <View key={index} style={{}}>
                    <ImageBackground
                      style={{
                        height: 364,
                        width,
                        borderBottomLeftRadius: 80,
                        overflow: 'hidden'
                      }}
                      source={{
                        uri: `${imageurl}/${e.path}`
                      }}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
            <View style={{ height: 1000, backgroundColor: '#ffffff' }}>
              <View style={styles.cardBg}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10
                  }}>
                  <View
                    style={{
                      borderColor: '#fb0201',
                      borderWidth: 1,
                      padding: 2,
                      borderRadius: 5,
                      paddingHorizontal: 5
                    }}>
                    <Text style={{ color: '#fb0201', fontSize: 12}}>{details.purpose}</Text>
                  </View>
                  <View>
                    <Text style={{ color: 'red', fontSize: 15, fontFamily: 'Poppins-Medium'}}>
                      NGN{numeral(details.price).format('0, 0')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#dedede'
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10
                    }}>
                    <PaperAvatar.Image
                      onPress={() => alert('pressed')}
                      source={require('../images/Avatar_invisible_circle_1.png')}
                    />
                    <View>
                      <Text>{details.full_name}</Text>
                      <Text>@{details.username}</Text>
                    </View>
                  </View>
                  <View style={{ alignSelf: 'center' }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={3}
                      starSize={12}
                      fullStarColor="red"
                      starStyle={{ width: 13 }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Image source={require('../images/Call.png')} />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 15,
                      width: 2,
                      backgroundColor: '#dedede',
                      marginHorizontal: 12
                    }}
                  />
                  <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Image source={require('../images/message.png')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cardBg}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede'
                  }}>
                  <View>
                    <Text style={{color: '#808080',fontFamily: 'Poppins-Medium',fontSize: 11,}}>Description</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <FontAwesome5 name="map-marker-alt" color="#fb0201" size={14} />
                    <Text style={{color: '#808080',fontFamily: 'Poppins-Medium',fontSize: 12, marginLeft: 5}}>Description</Text>
                  </View>
                </View>
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{color: '#0000',fontFamily: 'Poppins-Medium',fontSize: 14,}}>{productDetails.details.description}</Text>
                </View>
              </View>
              <View style={styles.cardBg}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede',
                    paddingVertical: 10
                  }}>
                  <View>
                    <Text style={{color: '#0000',fontFamily: 'Poppins-Medium',fontSize: 11,}}>Liked by</Text>
                  </View>
                  <LikeComponent />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  {likelist.length === 0 ? (
                    <ActivityIndicator color="#000" size="large" />
                  ) : (
                    <View>
                      {likelist.status === 'empty' ? (
                        <Text>{likelist.message}</Text>
                      ) : (
                        <View style={{ flexDirection: 'row' }}>
                          {likelist.data.map(e => (
                            <TouchableOpacity>
                              <PaperAvatar.Image
                                onPress={() => alert('pressed')}
                                source={require('../images/Avatar_invisible_circle_1.png')}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.cardBg}>
                <View
                  style={{
                    borderBottomColor: '#dedede',
                    borderBottomWidth: 1,
                    paddingVertical: 10
                  }}>
                  <Text style={{color: '#0000',fontFamily: 'Poppins-Medium',fontSize: 11,}}>Related</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {relatedproducts.status === 'success' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }}>
                      {relatedproducts.data.map(e => (
                        <GalleryPosts data={e} />
                      ))}
                    </View>
                  ) : (
                    <Text style={{color: '#0000',fontFamily: 'Poppins-Medium',fontSize: 11,}}>No product</Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    // width,
    // display: 'none',
    zIndex: 1,
    height: 116,
    paddingHorizontal: 25,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 0,
    elevation: 2,
    backgroundColor: '#ffffff'
  },
  cardBg: {
    width: width - 40,
    alignSelf: 'center',
    padding: 20,
    marginVertical: 10,
    // height: 168,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderRadius: 40,
    backgroundColor: '#ffffff'
  },
  modalStyle: {
    width: 327,
    height: 245,
    alignSelf: 'center',
    justifyContent: 'space-around',
    // alignItems: 'center',
    paddingHorizontal: 30,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  activitystreamdata: state.activitystreamdata.activitystream
});

export default connect(mapStateToProps)(ProductDetailsScreen);
