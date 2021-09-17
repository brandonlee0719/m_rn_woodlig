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
import { Header, Avatar } from 'react-native-elements';
import { Appbar, FAB, Portal, Modal, Avatar as PaperAvatar } from 'react-native-paper';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import fontelloConfig from '../config.json';
import { apiurl, imageurl } from '../constants/config';
import FindTalentsCard from '../components/FindTalentsCard';
import FeauturedTalentsAvatar from '../components/FeauturedTalentsAvatar';
import SetupRolesTick from '../components/SetupRolesTick';
import GalleryPosts from '../components/GalleryPosts';

const Customon = createIconSetFromFontello(fontelloConfig);
const { width, height } = Dimensions.get('window');

class FindTalentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      selected: [],
      selectedTalentData: [],
      starUser: false
    };
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${apiurl}fetch-all-talents?user_id=3`)
      .then(res => this.setState({ data: res.data.talents }))
      .catch(res => console.log('error reading feautured talents'));
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  hideModal() {
    this.setState({ visible: false, selectedTalentData: [] });
  }

  getData = async e => {
    this.setState({ visible: true, selected: e });
    await axios
      .get(`${apiurl}fetch-talent-details.php?user_id=${e.user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ selectedTalentData: res.data });
      })
      .catch(res => console.log(res.data));
    console.log(e);
  };

  starTalent = () => {
    this.setState({ starUser: true });
  };

  unstarTalent = () => {
    this.setState({ starUser: false });
  };

  render() {
    const { profilepicture, user_id } = this.props;
    const { visible, data, selected, selectedTalentData, starUser } = this.state;
    return (
      <View>
        <Portal>
          <Modal
            visible={visible}
            contentContainerStyle={{
              position: 'absolute',
              bottom: 50,
              right: 30
            }}
            onDismiss={this.hideModal}>
            <View style={styles.modalStyle}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'space-between',
                  padding: 20
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      alignContent: 'flex-end'
                    }}>
                    <View style={{ alignSelf: 'flex-start' }}>
                      <FontAwesome5
                        name="times"
                        size={20}
                        color="#000"
                        onPress={() =>
                          this.setState({
                            visible: false,
                            selectedTalentData: []
                          })
                        }
                      />
                    </View>
                    <View>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={selected.rating}
                        starSize={15}
                        fullStarColor="red"
                        starStyle={{ width: 18 }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <PaperAvatar.Image
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 3,
                        overflow: 'hidden',
                        borderColor: selected.premium === '1' ? '#fb0201' : '#ffffff'
                      }}
                      source={require('../images/ic_account_circle_24px.jpg')}
                      size={70}
                    />
                  </View>
                  <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                      {starUser === false ? (
                        <FontAwesome5
                          name="star"
                          size={29}
                          color="#000"
                          onPress={this.starTalent}
                        />
                      ) : (
                        <FontAwesome5
                          name="star"
                          size={29}
                          color="#fb0201"
                          solid
                          onPress={this.unstarTalent}
                        />
                      )}
                    </View>
                    <View style={{ alignSelf: 'flex-start' }}>
                      <Text>{selected.gender}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#1c1c1c',
                      fontWeight: '900'
                    }}>
                    {selected.full_name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: '#1c1c1c',
                      opacity: 0.8,
                      textTransform: 'capitalize',
                      fontSize: 14
                    }}>
                    {selected.city}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {/* {selectedTalentData.length === 0 && <ActivityIndicator />} */}
                {selectedTalentData.user_skill_set === '' && (
                  <Text style={styles.emptyContent}>This user is yet to indicate his skills</Text>
                )}
                {selectedTalentData.length !== 0 && selectedTalentData.user_skil_set !== '' && (
                  <View style={styles.skillsContainer}>
                    {selectedTalentData.user_skill_set.map(e => (
                      <SetupRolesTick
                        key={e.skill_id}
                        roles={e.name}
                        viewStyle={{ borderColor: '#fb0201' }}
                        textStyle={{ color: '#fb0201' }}
                      />
                    ))}
                  </View>
                )}
              </View>
              <View style={{ flex: 3 }}>
                {selectedTalentData.length === 0 && <ActivityIndicator />}
                {selectedTalentData.user_album === '' && (
                  <Text style={styles.emptyContent}>This user has not added an album</Text>
                )}
                {selectedTalentData.length !== 0 && selectedTalentData.user_album !== '' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    {selectedTalentData.user_album.map(e => (
                      <GalleryPosts key={e.id} data={e} size={80} />
                    ))}
                  </View>
                )}
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.profileLink}
                    onPress={() => {
                      this.props.navigation.navigate('ProfileScreen', {
                        user_id,
                        theirid: selected.user_id
                      });
                      this.setState({ visible: false });
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 13,
                        letterSpacing: 0.05,
                        lineHeight: 26
                      }}>
                      Visit Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
        <StatusBar translucent={false} backgroundColor="#ffffff" barStyle="dark-content" />
        {/* temporory  header for find talents */}
        <View
          style={{
            width,
            height: 50,
            backgroundColor: '#ffffff',
            // justifyContent: 'center',
            // alignItems: 'center',
            elevation: 3,
            flexDirection: 'row'
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 45
            }}>
            <Customon name="woodlig-brand" color="#fb0201" />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15
            }}>
            <FontAwesome5 name="star" size={22} color="#fb0201" />
          </View>
        </View>

        <View
          style={{
            marginBottom: 150,
            backgroundColor: '#eeeeee',
            zIndex: -1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View style={{ padding: 15 }}>
            <View style={styles.searchSection}>
              <View style={{ backgroundColor: 'transparent' }}>
                <TextInput style={styles.searchExtend} placeholder="Who are you looking for?" />
              </View>
              <FontAwesome5 style={styles.searchIcon} name="search" size={20} color="#000" />
            </View>
          </View>

          <FlatList
            ListHeaderComponent={<FeauturedTalentsAvatar />}
            contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
            style={{ backgroundColor: '#eeeeee' }}
            data={data}
            renderItem={({ item }) => (
              <FindTalentsCard
                item={item}
                selectedItem={this.getData}
                full_name={item.full_name}
                picture={item.profile_thumb}
                username={item.username}
                rating={item.rating}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: 'green',
    margin: 16,
    right: 0,
    top: height - 160,
    zIndex: 100000000000
  },
  searchSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 335,
    height: 41,
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 7,
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },

  searchExtend: {
    width: 300,
    height: 41,
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins-Medium'
  },
  modalStyle: {
    height: 406,
    width: width - 60,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: -3, height: 0 },
    shadowRadius: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  skillsContainer: {
    width: width - 80,
    height: 55,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignContent: 'center',
    borderRadius: 25,
    elevation: 1,
    backgroundColor: '#ffffff'
  },
  emptyContent: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  profileLink: {
    width: 146,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 52,
    backgroundColor: '#fb0201'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(FindTalentsScreen);
