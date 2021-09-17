/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { List, Checkbox } from 'react-native-paper';
import fontelloConfig from '../config.json';
import HeaderComponent from '../components/HeaderComponent';
import WalletPromotion from '../components/WalletPromotion';

const Customon = createIconSetFromFontello(fontelloConfig);
export default class PostLikesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />
        <View style={styles.header}>
          <View style={styles.headerArrow}>
            <TouchableOpacity>
              <Customon style={styles.arrowback} name="long-arrow-left" size={15} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Likes (12)</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingRight: 8,
                paddingBottom: 8,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
              <View
                style={{
                  marginLeft: 3,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={styles.sideLine} />
              </View>
              <View style={{ padding: 3, marginBottom: 5 }}>
                <Image
                  source={require('../images/ic_account_circle_new.png')}
                  style={{ width: 66, height: 66 }}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={styles.name}>Miracle Junaid</Text>
                    <StarRating
                      rating={this.state.starCount}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                      disabled={false}
                      maxStars={5}
                      starSize={10}
                      fullStarColor="#fb0201"
                      emptyStarColor="#808080"
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 9
                            }}>
                            Follow
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      width: 14,
                      height: 14,
                      backgroundColor: '#fb0201',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <FontAwesome5 color="#fff" name="crown" size={8} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginLeft: 3,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={styles.sideLine} />
              </View>
              <View style={{ padding: 3, marginBottom: 5 }}>
                <Image
                  source={require('../images/ic_account_circle_24px.jpg')}
                  style={{ width: 66, height: 66 }}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={styles.name}>Miracle Junaid</Text>
                    <StarRating
                      rating={this.state.starCount}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                      disabled={false}
                      maxStars={5}
                      starSize={10}
                      fullStarColor="#fb0201"
                      emptyStarColor="#808080"
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 9
                            }}>
                            Follow
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginLeft: 3,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={styles.sideLine} />
              </View>
              <View style={{ padding: 3, marginBottom: 5 }}>
                <Image
                  source={require('../images/ic_account_circle_24px.jpg')}
                  style={{ width: 66, height: 66 }}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={styles.name}>Miracle Junaid</Text>
                    <StarRating
                      rating={this.state.starCount}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                      disabled={false}
                      maxStars={5}
                      starSize={10}
                      fullStarColor="#fb0201"
                      emptyStarColor="#808080"
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 9
                            }}>
                            Follow
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginLeft: 3,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={styles.sideLine} />
              </View>
              <View style={{ padding: 3, marginBottom: 5 }}>
                <Image
                  source={require('../images/ic_account_circle_24px.jpg')}
                  style={{ width: 66, height: 66 }}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={styles.name}>Miracle Junaid</Text>
                    <StarRating
                      rating={this.state.starCount}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                      disabled={false}
                      maxStars={5}
                      starSize={10}
                      fullStarColor="#fb0201"
                      emptyStarColor="#808080"
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 9
                            }}>
                            Follow
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginLeft: 3,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={styles.sideLine} />
              </View>
              <View style={{ padding: 3, marginBottom: 5 }}>
                <Image
                  source={require('../images/ic_account_circle_24px.jpg')}
                  style={{ width: 66, height: 66 }}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={styles.name}>Miracle Junaid</Text>
                    <StarRating
                      rating={this.state.starCount}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                      disabled={false}
                      maxStars={5}
                      starSize={10}
                      fullStarColor="#fb0201"
                      emptyStarColor="#808080"
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 9
                            }}>
                            Follow
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeee'
  },

  sideLine: {
    height: 115,
    borderLeftColor: '#ededed',
    // borderStyle: 'solid',
    borderLeftWidth: 0.6
  },

  content: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 15,
    marginTop: 15,
    // height: 568,

    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: -1, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff',
    elevation: 5
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 20,
    borderRadius: 52,
    // borderColor: '#fb0201',
    // borderStyle: 'solid',
    // borderWidth: 1,
    backgroundColor: '#fecbcb',
    marginTop: 8
  },

  profileSection: {
    padding: 5,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addFundsBtn: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#ffffff',
    // marginTop: 75,
    // marginLeft: 8,
    fontSize: 8
  },

  addFunds2: {
    padding: 3,
    width: 45,
    marginTop: 5,
    height: 16,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb0201'
  },

  img: {
    width: 60,
    height: 60,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 50,
    elevation: 5
  },
  addedView: {
    padding: 15
    // marginTop: 15,
  },
  line: {
    width: 117,
    height: 1,
    borderColor: '#e7e4e9',
    borderStyle: 'solid',
    borderWidth: 2,
    marginTop: 10
  },
  search: {
    width: 343,
    height: 41,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0
  },
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    padding: 15,

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
    fontSize: 13
  },
  name: {
    color: '#1c1c1c',
    fontFamily: 'Poppins-Medium',
    fontSize: 9
  },

  arrowback: {
    color: '#000'
  },

  headerArrow: {
    flex: 1
  }
});
