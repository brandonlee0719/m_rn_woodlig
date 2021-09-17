import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, Image, Dimensions, Picker, TextInput, ScrollView } from 'react-native';
import { Avatar, Menu, Divider } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { postValues } from '../redux/actions/handleYourMind';
import Dropdown from './Dropdown';

const { height, width } = Dimensions.get('window');
// eslint-disable-next-line react/prefer-stateless-function
export class PhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      longlat: [],
      caption: '',
      visible: false,
      privacy: 'public'
    };
  }

  componentDidUpdate(prevprops) {
    const { location } = this.props;
    const { longlat, image, caption } = this.state;
    const total = {
      image,
      caption
    };
    this.props.postValues(total);
  }

  addPhoto() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ image });
    });
    // ImagePicker.openCamera({
    //     width: 300,
    //     height: 400,
    //     cropping: true,
    //   }).then(image => {
    //     this.setState({ image });
    //   });
  }

  render() {
    const { location, tag } = this.props;
    const { image, visible, privacy } = this.state;
    return (
      <ScrollView contentContainerStyle={{ height }}>
        <View style={{ height: height - 130, backgroundColor: '#eeeeee' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                height: '90%',
                width: '95%',
                borderRadius: 20,
                backgroundColor: '#ffffff',
                elavation: 10
              }}>
              <View
                style={{
                  flex: 1.5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar.Image
                    size={50}
                    source={require('../images/Avatar_invisible_circle_1.png')}
                  />
                  <Text style={{ color: '#bcc5d3', fontFamily: 'Poppins-Medium', fontSize: 10 }}>
                    @Humphrey_jerome
                  </Text>
                </View>
                {  /*<FontAwesome5 name="image" size={18} color="#d1d1d1" style={{ paddingRight: 20 }} />*/}
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
                        <FontAwesome5
                          name={privacy === 'private' ? 'lock' : 'lock-open'}
                          size={16}
                        />
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

              <View
                style={{
                  flex: 5,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 15
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    borderRadius: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.16)',
                    backgroundColor: '#fecbcb',
                    width: 287,
                    height: 218,
                    marginBottom: 15,
                    elevation: 3
                  }}>
                  {image.length === 0 ? (
                    <TouchableOpacity
                      style={{ alignSelf: 'center' }}
                      onPress={this.addPhoto.bind(this)}>
                      <FontAwesome5
                        name="camera-retro"
                        color="#f48282"
                        size={50}
                        style={{ alignSelf: 'center' }}
                      />
                      {/* <Text style={{ textAlign: 'center' }}>Add Photo(s)</Text> */}
                    </TouchableOpacity>
                  ) : (
                      <Image
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 20
                        }}
                        source={{ uri: image.path }}
                      />
                    )}
                </View>

                {/* <View style={{flexDirection: 'row'}}>
                  <FontAwesome5
                    name="plus-circle"
                    size={16}
                    color="#fb0201"
                  />
                <Text style={{ textAlign: 'center', marginLeft: 8,
                  color: '#fb0201', fontFamily: 'Poppins-Medium', fontSize: 13}}>Add Photo(s)</Text>
                </View> */}
              </View>

              <View style={{ flex: 2, paddingLeft: 20, justifyContent: 'center', paddingTop: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#414141' }}>
                  Add Caption
                </Text>
                <TextInput
                  onChangeText={text => this.setState({ caption: text })}
                  placeholder="Rainy days occur every..."
                  placeholderTextColor="#bfbfbf"
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#bfbfbf',
                    width: '80%',
                    marginTop: -12,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 10
                  }}
                />
              </View>
              <View style={{ flex: 1.5, paddingLeft: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5 size={20} name="map-marker-alt" color="red" />
                  <Text>&nbsp;{location.formatted_address}</Text>
                </View>
                {tag.length !== 0 && (
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: '#3e3e3e', fontFamily: 'Poppins-Medium', fontSize: 11 }}>
                      With:
                    </Text>
                    {tag.length <= 2 ? (
                      <View style={{ flexDirection: 'row' }}>
                        {tag.map(e => (
                          <Text style={{ color: '#3e3e3e', fontFamily: 'Poppins-Medium', fontSize: 11 }} key={e.id}>&nbsp;@{e.username}&nbsp;,</Text>
                        ))}
                      </View>
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                          {tag.slice(0, 2).map(e => (
                            <Text key={e.id}>&nbsp;{e.username}&nbsp;</Text>
                          ))}
                          <Text>and {tag.length - 2} more&nbsp;</Text>
                        </View>
                      )}
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>
                {/*   <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <FontAwesome5
                    name="plus"
                    color="black"
                    size={13}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                  />
                 <Text style={{ color: '#3e3e3e', fontSize: 13, fontFamily: 'Poppins-Meduim' }}>
                    Add Hashtag
                  </Text>
                </TouchableOpacity>*/}
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => this.props.navigation.navigate('TagPeopleScreen')}>
                  <FontAwesome5
                    name="plus"
                    color="black"
                    size={13}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                  />
                  <Text style={{ color: '#3e3e3e', fontSize: 13, fontFamily: 'Poppins-Meduim' }}>
                    Tag People
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => this.props.navigation.navigate('AddLocationRoute')}>
                  <FontAwesome5
                    name="plus"
                    color="black"
                    size={13}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                  />
                  <Text style={{ color: '#3e3e3e', fontSize: 13, fontFamily: 'Poppins-Meduim' }}>
                    Add Location
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  location: state.addpost.locationdescription,
  tag: state.addpost.taggedpeople
});

export default connect(
  mapStateToProps,
  { postValues }
)(withNavigation(PhotoComponent));
