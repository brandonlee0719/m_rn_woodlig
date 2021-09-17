import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';;
import { withNavigation } from 'react-navigation';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

// eslint-disable-next-line react/prefer-stateless-function
class ViewCastingCalls extends Component {
  // componentDidUpdate() {
  //   console.log(this.props);
  // }

  render() {
    const {
      title,
      formatted_address,
      production_type,
      roles_count,
      description,
      active,
      skill,
      postid,
      created_by,
      user_id
    } = this.props;
    const firstperson = created_by === user_id;
    return (
      <View
        style={{
          backgroundColor: '#eeeeee',
          marginBottom: 20,
          marginHorizontal: 10
        }}>
        {/* <View style={{ marginBottom: 30, backgroundColor: '#eeeeee', paddingHorizontal: 5 }}> */}
        <TouchableOpacity
          onPress={() => {
            console.log(postid);
            this.props.navigation.navigate('CastingCallDetail', {
              casting_call_id: postid
            });
          }}
          activeOpacity={0.8}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            overflow: 'hidden'
          }}>
          <View style={{ height: 30, backgroundColor: 'red', flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingLeft: 10,
                flex: 3,
                height: 34,
                elevation: 3,
                borderBottomRightRadius: 20
              }}>
              <Text style={{ fontSize: 11, fontFamily: 'Poppins-Medium', color: 'black' }}>
                {title}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'red',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium'
                }}>{`Role(s): ${roles_count}`}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              maxheight: 170,
              minHeight: 120,
              backgroundColor: '#ffffff'
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 12,
                    color: '#3e3e3e',
                    fontFamily: 'Poppins-Medium'
                  }}>
                  Description
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 25,
                    borderColor: 'red',
                    paddingHorizontal: 10
                  }}>
                  <Text style={{ color: 'red', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                    {skill}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: -10, justifyContent: 'flex-end' }}>
                {firstperson === true && (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ViewApplicants', {
                        casting_call_id: postid
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      backgroundColor: 'red',
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50
                    }}>
                    <Text style={{ color: 'white', fontSize: 10, fontFamily: 'Poppins-Medium' }}>
                      View Applicants&nbsp;
                    </Text>
                    <Customon
                      color="white"
                      size={13}
                      name="long-arrow-right"
                      style={{ alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                paddingHorizontal: 10
              }}>
              <Text
                style={{ fontSize: 11, fontFamily: 'Poppins-Medium', color: '#000000' }}
                numberOfLines={3}>
                {description}
              </Text>
            </View>
            <View
              style={{
                flex: 1.5,
                borderTopWidth: 0.6,
                flexDirection: 'row',
                borderColor: '#dedede',
                paddingBottom: 10
              }}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
                <Text
                  style={{ fontSize: 11, fontFamily: 'Poppins-Medium', color: '#000000' }}
                  numberOfLines={1}>
                  {formatted_address}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderLeftWidth: 0.6,
                  borderColor: '#dedede',
                  borderRightWidth: 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10
                }}>
                <View
                  style={{
                    backgroundColor: 'red',
                    paddingHorizontal: 15,
                    paddingVertical: 2,
                    borderRadius: 20
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: 'white', fontSize: 10, fontFamily: 'Poppins-Medium' }}>
                    {production_type}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 10
                }}>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', color: 'red' }}>
                  {active === '1' ? 'ACTIVE' : 'INACTIVE'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(withNavigation(ViewCastingCalls));
