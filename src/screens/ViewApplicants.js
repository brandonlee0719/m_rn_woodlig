import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { List, Checkbox, Portal, Modal } from 'react-native-paper';
import axios from 'axios';
import { connect } from 'react-redux';
import fontelloConfig from '../config.json';
import HeaderComponent from '../components/HeaderComponent';
import WalletPromotion from '../components/WalletPromotion';
import { apiurl, imageurl } from '../constants/config';
import SetupRolesTick from '../components/SetupRolesTick';

const moment = require('moment');

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');

class ViewApplicants extends Component {
  state = {
    expanded: true,
    starCount: 3.5,
    visible: false,
    custom: false,
    applicants: [],
    casting_call: [],
    newRoleTypes: [],
    profiledetails: [],
    noApplicants: false
  };

  componentDidMount() {
    const { navigation, user_id } = this.props;
    const casting_call_id = navigation.getParam('casting_call_id');
    console.log(casting_call_id, user_id);
    axios
      .get(`${apiurl}fetch-casting-call-applicants.php?user_id=${user_id}&id=${casting_call_id}`)
      .then(res => {
        if (res.data.status === 'success') {
          return this.fetchData(res.data);
        }
      })
      .catch(res => this.setState({ noApplicants: true }));
  }

  fetchData = data => {
    const { applicants, casting_call } = data;
    const applicantsroles = [];
    const applicantsroletypes = [];
    applicants.forEach(element => {
      applicantsroles.push(element.role);
      applicantsroletypes.push(element.role_type);
    });
    const newApplicants = [...new Set(applicantsroles)];
    const newRoleTypes = [...new Set(applicantsroletypes)];
    console.log(newApplicants, newRoleTypes);
    this.setState({ applicants, newRoleTypes, casting_call });
    // alert("called");
  };

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  onStarRatingPress = rating => {
    this.setState({
      starCount: rating
    });
  };

  fetchProfile = async person => {
    this.setState({ custom: true });
    await axios
      .get(`${apiurl}fetch-user-profile.php?user_id=3&user_profile_id=${person.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ profiledetails: res.data });
      })
      .catch(res => console.log(res.data));
    this.setState({ custom: false, visible: true });
  };

  render() {

    const starStyle = {
      width: 50,
      //padding: 20,
      //height: 20,
      //marginTop: 120,
    };


    const {
      active,
      visible,
      applicants,
      newRoleTypes,
      custom,
      profiledetails,
      casting_call,
      noApplicants
    } = this.state;
    if (casting_call.length !== 0) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={visible || custom} backgroundColor="white" barStyle="dark-content" />
          <Portal>
            <Modal visible={custom}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="#fb0201" />
              </View>
            </Modal>
            <Modal visible={visible}>
              {profiledetails.data !== undefined && (
                <View style={{ flexDirection: 'row', height }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flex: 1.5,
                      overflow: 'visible',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TouchableOpacity onPress={() => this.setState({ visible: false })}>
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: 'black',
                          borderRadius: 50,
                          borderWidth: 2,
                          opacity: 0.74,
                          borderColor: '#ffffff',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <Customon name="long-arrow-right" color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 5,
                      justifyContent: 'center'
                    }}>
                    <View
                      style={{
                        height: height - 50,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25
                      }}>
                      <View style={{ flex: 2, justifyContent: 'space-between' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 20
                          }}>

                          <StarRating
                            // ratingBackgroundColor='#808080'
                            disabled={false}
                            maxStars={5}
                            starSize={10}
                            // containerStyle={{ marginHorizontal: 10 }}
                            fullStarColor="#fb0201"
                            emptyStarColor="#808080"
                            rating={parseInt(profiledetails.data.rating_count)}
                            // starStyle={{ paddingTop: 8 }}
                          />

                          <Avatar
                            rounded
                            source={
                              profiledetails.data.profile_picture !== ''
                                ? {
                                    uri: `${imageurl}/${profiledetails.data.profile_picture}`
                                  }
                                : require('../images/ic_account_circle_24px.jpg')
                            }
                            style={{
                              width: 58,
                              height: 58,
                              marginHorizontal: 10,

                            }}
                          />
                          <Text
                            style={{
                              opacity: 0.8,
                              color: '#1c1c1c',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 12,

                            }}>
                            {profiledetails.data.gender}, 23
                          </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text
                            style={{
                              opacity: 0.8,
                              color: '#1c1c1c',
                              fontFamily: 'Poppins',
                              fontSize: 13,
                              fontWeight: '900'
                            }}>
                            {profiledetails.data.full_name}
                          </Text>
                          <Text
                            style={{
                              opacity: 0.8,
                              color: '#1c1c1c',
                              fontFamily: 'Poppins',
                              fontSize: 15,
                              fontWeight: '500'
                            }}>
                            {profiledetails.data.city},{profiledetails.data.country}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: 'white',
                            elevation: 3,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            paddingRight: 40,
                            width: width - 40,
                            borderRadius: 25,
                            position: 'relative',
                            bottom: 0,
                            left: -20
                          }}>
                          {profiledetails.user_roles === '' && (
                            <View>
                              <Text>This user has not added any skills</Text>
                            </View>
                          )}
                          {profiledetails.user_roles !== undefined &&
                            (profiledetails.user_roles !== '' && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  justifyContent: 'center'
                                }}>
                                {profiledetails.user_roles.map(e => (
                                  <SetupRolesTick key={e.id} roles={e.name} />
                                ))}
                              </View>
                            ))}
                        </View>
                      </View>
                      <View style={{ flex: 3 }}>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              opacity: 0.8,
                              color: '#1c1c1c'
                            }}>
                            Experience
                          </Text>
                        </View>
                        {profiledetails.user_experience === '' && (
                          <View>
                            <Text
                              style={{
                                color: '#000000',
                                fontFamily: 'Montserrat',
                                fontSize: 9,
                                fontWeight: '600',
                                textAlign: 'center'
                              }}>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This user has not added any
                              experience
                            </Text>
                          </View>
                        )}
                        {profiledetails.user_experience !== '' &&
                          profiledetails.user_experience !== undefined && (
                            <View>
                              {profiledetails.user_experience.slice(0, 3).map(e => (
                                <View
                                  key={e.experience_id}
                                  style={{
                                    paddingVertical: 10,
                                    width: '90%',
                                    backgroundColor: '#ffffff'
                                  }}>
                                  <View
                                    style={{
                                      padding: 10,
                                      backgroundColor: '#fff',
                                      elevation: 2,
                                      borderTopRightRadius: 20,
                                      borderBottomRightRadius: 20
                                    }}>
                                    <View>
                                      <Text style={styles.experienceTitle}>{e.project}</Text>
                                    </View>
                                    <View>
                                      <Text style={styles.experinceContent}>{e.company}</Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                      }}>
                                      <View style={styles.roleStyle}>
                                        <Text
                                          style={{
                                            color: '#fb0201',
                                            fontFamily: 'Montserrat',
                                            fontSize: 9,
                                            fontWeight: '600',
                                            lineHeight: 11
                                          }}>
                                          {e.role}
                                        </Text>
                                      </View>
                                      <FontAwesome5 name="circle" color="#dedede" solid size={10} />
                                      <View>
                                        <Text
                                          style={{
                                            color: '#000000',
                                            fontFamily: 'Montserrat',
                                            fontSize: 8,
                                            fontWeight: '600'
                                          }}>
                                          {e.start_date} - {e.end_date}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              ))}
                              {profiledetails.user_experience.length > 3 && (
                                <View>
                                  <Text
                                    style={{
                                      color: '#000000',
                                      fontFamily: 'Montserrat',
                                      fontSize: 9,
                                      textAlign: 'center',
                                      fontWeight: '600'
                                    }}>
                                    and {profiledetails.user_experience.length - 3} more
                                  </Text>
                                </View>
                              )}
                            </View>
                          )}
                      </View>
                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <TouchableOpacity style={styles.profileButton}>
                          <Text
                            style={{
                              lineHeight: 26,
                              letterSpacing: 0.05,
                              color: '#fff',
                              fontFamily: 'Poppins-Medium'
                            }}>
                            VISIT PROFILE
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </Modal>
          </Portal>
          <View style={styles.header}>
            <View style={styles.headerArrow}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Customon style={styles.arrowback} name="long-arrow-left" size={15} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Applicants</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5
            }}>
            <Text
              style={{
                color: '#808080',
                fontFamily: 'Poppins-Meduim',
                fontSize: 8
              }}>
              {' '}
              Posted: 2d ago
            </Text>
          </View>
          <View style={styles.titleHeader}>
            <Text style={styles.titleText}>TITLE</Text>
            <Text style={styles.titleText2}>{casting_call.title}</Text>

            <TouchableOpacity>
              <View style={styles.addFunds2}>
                <Text style={styles.addFundsBtn}>{casting_call.production_type}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.addFunds3}>
                <Text style={styles.addFundsBtn3}>{casting_call.skill}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.innerContainerTransparentStyle}>
              <List.Section style={{ marginTop: 40 }}>
                {newRoleTypes.map((e, index) => (
                  <List.Accordion
                    key={index}
                    style={styles.arccordionStyles}
                    title={
                      <Text>
                        {applicants[0].role}&nbsp;({e}) :
                        {applicants.filter(arr => arr.role_type === e).length}
                      </Text>
                    }
                    titleStyle={{
                      color: '#ffff',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 11
                    }}
                    left={props => (
                      <List.Icon
                        {...props}
                        icon={() => (
                          <Customon
                            name="info-circle"
                            color="#ffffff"
                            size={15}
                            style={{ zIndex: 1000 }}
                          />
                        )}
                      />
                    )}>
                    {applicants
                      .filter(arr => arr.role_type === e)
                      .map((person, i) => (
                        <View key={i} style={{ flexDirection: 'row', marginBottom: 5, marginTop: 15}}>
                          <View
                            style={{
                              marginLeft: -50,
                              justifyContent: 'center',
                              alignItems: 'center',



                            }}>
                            <Avatar
                              rounded
                              source={
                                person.profile_thumb === ''
                                  ? require('../images/ic_account_circle_24px.jpg')
                                  : {
                                      uri: `${imageurl}/${person.profile_thumb}`
                                    }
                              }
                              size={45}
                              // style={{ width: 58, height: 58, marginTop: 8 }}
                            />

                            <View style={styles.starStyle}>
                              <StarRating
                                type="custom"
                                // ratingBackgroundColor='#808080'
                                disabled={false}
                                maxStars={5}
                                starSize={12}
                                fullStarColor="#fb0201"
                                emptyStarColor="#808080"
                                rating={parseInt(person.rating)}
                                //starStyle={{ paddingTop: 8 }}
                              />
                            </View>
                          </View>
                          <View style={{ marginLeft: 10, marginTop: 10, flex: 1 }}>
                            <Text
                              syle={{
                                fontFamily: 'Poppins-Meduim',
                                color: '#1c1c1c',
                                fontSize: 15
                              }}>
                              {person.full_name}
                            </Text>
                            <Text
                              syle={{
                                fontFamily: 'Poppins-Meduim',
                                color: '#1c1c1c',
                                fontSize: 15
                              }}>
                              @{person.username}
                            </Text>
                          </View>
                          <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                            <Text
                              style={{
                                color: '#808080',
                                fontFamily: 'Poppins-Meduim',
                                fontSize: 10,
                                marginBottom: 4,
                                marginRight: 12
                              }}>
                              {moment(parseInt(`${person.date_created}`) * 1000).fromNow()}
                            </Text>

                            <TouchableOpacity>
                              <View
                                style={{
                                  width: 75,
                                  height: 24,
                                  padding: 5,
                                  borderRadius: 52,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#fb0201',
                                  marginBottom: 7
                                }}>
                                <Text
                                  onPress={() => this.fetchProfile(person)}
                                  style={{
                                    color: '#fff',
                                    fontFamily: 'Poppins-Meduim',
                                    fontSize: 9
                                  }}>
                                  REVIEW
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <View
                                style={{
                                  width: 75,
                                  height: 24,
                                  borderRadius: 52,
                                  borderColor: '#fb0201',
                                  borderStyle: 'solid',
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
                                <Text
                                  style={{
                                    color: '#fb0201',
                                    fontFamily: 'Poppins-Meduim',
                                    fontSize: 9
                                  }}>
                                  MESSAGE
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                  </List.Accordion>
                ))}
              </List.Section>
            </View>
          </ScrollView>
        </View>
      );
    }
    if (noApplicants === true) {
      return <Text>No Applicants yet</Text>;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#fb0201" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  arccordionStyles: {
    color: '#ffff',
    // height: 35,
    padding: 1,
    zIndex: -1,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 1, height: 0 },
    shadowRadius: 2,
    backgroundColor: '#ff4b4a'
  },
  innerContainerTransparentStyle: {
    backgroundColor: '#fff',
    // paddingTop: 10,

    marginTop: 15,
    // height: 300,
    height: Dimensions.get('window').height - 15,

    width: Dimensions.get('window').width,
    shadowRadius: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
    // backgroundColor: '#ffffff',
  },
  addFunds2: {
    // width: 99,
    height: 22,
    shadowColor: '#000',
    // shadowOffset: { width: 6, height: 0 },
    shadowRadius: 19,
    borderRadius: 25,
    backgroundColor: '#fb0201',
    // elevation: 20,
    padding: 10,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6
  },
  addFunds3: {
    // width: 99,
    height: 17,
    borderRadius: 25,
    borderColor: '#fb0201',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  addFundsBtn: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#ffffff',
    // marginTop: 75,
    // marginLeft: 8,
    fontSize: 10
  },
  addFundsBtn3: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#fb0201',
    // marginTop: 75,
    // marginLeft: 8,
    fontSize: 10
  },

  titleText: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: 11
  },
  titleText2: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    textTransform: 'capitalize'
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
  titleHeader: {
    //  width: 375,
    // marginTop: 20,
    height: 112,
    backgroundColor: '#ffffff',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  profileButton: {
    width: 146,
    height: 30,
    borderRadius: 52,
    backgroundColor: '#fb0201',
    alignItems: 'center',
    justifyContent: 'center'
  },

  arrowback2: {
    color: '#fb0201',

  },
  arrowback: {
    color: '#000',
    //flex:1
  },
  headerTitle: {
    // marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  headerArrow: {
    flex: 1
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },
  experienceTitle: {
    width: 104,
    height: 18,
    color: '#000000',
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: '700',
    fontStyle: 'italic'
  },
  experinceContent: {
    width: 156,
    height: 14,
    color: '#000000',
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontWeight: '600'
  },
  roleStyle: {
    borderRadius: 25,
    borderColor: '#fb0201',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(ViewApplicants);
