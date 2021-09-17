import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider, Button } from 'react-native-paper';
import SetupRolesTick from '../components/SetupRolesTick';

let content;
// eslint-disable-next-line react/prefer-stateless-function
export default class AboutYourProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.hideModal = this.hideModal.bind(this);
  }
  // componentDidUpdate() {
  //   console.log(content);
  // }

  // componentDidMount() {
  //   console.log(content)
  // }

  hideModal() {
    this.setState({ visible: false });
    // console.log(content);
  }

  showModal(values) {
    const { data } = this.props;
    // let content = data.user_experience[values];
    content = values;
    // console.log(content);
    this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state;
    const { data } = this.props;
    const experience = data.user_experience.slice(0, 3);
    const date = new Date(data.data.date_created * 1000);
    const year = date.getFullYear();
    return (
      <View style={{ backgroundColor: '#eeeeee', marginBottom: 20 }}>
        {content !== undefined && (
          <Portal>
            <Modal visible={visible} onDismiss={this.hideModal}>
              {/* <Text>Example Modal</Text> */}
              <View style={styles.modalStyle}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    marginHorizontal: 20
                  }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View />
                    <Text style={styles.title}>TITLE</Text>
                    <FontAwesome5 name="times" size={30} color="black" onPress={this.hideModal} />
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                      {content.project}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 20
                  }}>
                  <Text style={styles.title}>COMPANY/INSTITUTE</Text>
                  <Text style={{ fontSize: 11, color: 'black' }}>{content.company}</Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    borderBottomWidth: 1,
                    marginHorizontal: 20,
                    justifyContent: 'space-around'
                  }}>
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.title}>ROLE & ROLE TYPE</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <View
                        style={{
                          borderRadius: 30,
                          borderWidth: 2,
                          borderColor: 'red',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 2
                        }}>
                        <Text style={{ color: 'red' }}>Producer</Text>
                      </View>
                      <FontAwesome5
                        name="circle"
                        solid
                        color="#dedede"
                        style={{ marginHorizontal: 20 }}
                      />
                      <Text>(Lead)</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.title}>Location & Date</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>{content.location}</Text>
                      <FontAwesome5
                        name="circle"
                        size={6}
                        solid
                        color="#dedede"
                        style={{ marginHorizontal: 20 }}
                      />
                      <View style={{ flexDirection: 'row' }}>
                        <Text>{content.start_date}</Text>
                        <Text>-</Text>
                        <Text>{content.end_date}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 5, borderBottomWidth: 1, paddingHorizontal: 40 }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Description</Text>
                  </View>
                  <View style={{ flex: 6 }}>
                    <ScrollView>
                      <Text>{content.description}</Text>
                    </ScrollView>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <FontAwesome5 name="pen" color="black" size={30} />
                  <View
                    style={{
                      width: 2,
                      height: 30,
                      marginHorizontal: 20,
                      backgroundColor: '#dedede'
                    }}
                  />
                  <FontAwesome5 name="trash-alt" color="black" size={30} />
                </View>
              </View>
            </Modal>
          </Portal>
        )}
        <View style={styles.joinDate}>
          <FontAwesome5 name="calendar" color="#fb0201" size={13} />
          <Text style={{ color: '#fb0201', fontSize: 10 }}>`Joined since {year}`</Text>
        </View>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
            <Text style={styles.headerStyle}>Bio</Text>
            <FontAwesome5 name="pen" size={20} style={styles.iconStyle} />
          </View>
          <Text
            style={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              width: 350,
              padding: 20,
              backgroundColor: '#ffffff',
              fontSize: 20
            }}>
            {data.data.bio}
          </Text>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
            <FontAwesome5 name="pen" size={20} style={styles.iconStyle} />
            <Text style={styles.headerStyle}> Skills</Text>
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              padding: 20,
              width: 350,
              flexDirection: 'row',
              flexWrap: 'wrap-reverse'
            }}>
            {data.user_roles.map(e => (
              <SetupRolesTick roles={e.name} key={e.id} />
            ))}
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.headerStyle, { textAlign: 'center', marginLeft: 20 }]}>
              Experience
            </Text>
            <FontAwesome5 name="pen" size={20} style={styles.iconStyle} />
          </View>
          <View
            style={{
              paddingVertical: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: data.user_experience !== '' ? '#dedede' : '#ffffff',
              width: 350
            }}>
            {data.user_experience !== '' ? (
              experience.map((e, index) => (
                <TouchableOpacity
                  key={e.experience_id}
                  style={{ marginBottom: 10 }}
                  onPress={this.showModal.bind(this, e)}>
                  <View style={styles.singleExperience}>
                    <Text style={styles.experienceTitle}>{e.project}</Text>
                    <Text style={{ color: 'black', fontSize: 13, fontWeight: '600' }}>
                      {e.company}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={styles.experienceRole}>
                        <Text style={{ color: '#fb0201' }}>Producer</Text>
                      </View>
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          alignSelf: 'center',
                          borderRadius: 20,
                          backgroundColor: '#bfbfbf'
                        }}
                      />
                      <View style={{ flexDirection: 'row' }}>
                        <Text>{e.start_date}</Text>
                        <Text> - </Text>
                        <Text>{e.end_date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Forte' }}>
                No experience listed yet
              </Text>
            )}
            {data.user_experience.length > 3 && data.user_experience !== '' && (
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'black', fontSize: 15 }}>
                    and {data.user_experience.length - 3} more...
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 20,
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>See all</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 20 }}>
            <Text style={styles.headerStyle}>Personal</Text>
            <FontAwesome5 name="pen" size={20} style={styles.iconStyle} />
          </View>
          <View
            style={{
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              width: 350,
              backgroundColor: 'white'
            }}>
            <View style={styles.personalContent}>
              <FontAwesome5 name="user" solid style={styles.iconStyle} />
              <Text>{data.data.full_name}</Text>
            </View>
            <View style={styles.personalContent}>
              <FontAwesome5 name="birthday-cake" solid style={styles.iconStyle} />
              <Text>{data.data.date_of_birth}</Text>
            </View>
            <View style={styles.personalContent}>
              <FontAwesome5 name="venus-mars" solid style={styles.iconStyle} />
              <Text>gender</Text>
            </View>
            <View style={styles.personalContent}>
              <FontAwesome5 name="map-marker-alt" solid style={styles.iconStyle} />
              <Text>{data.data.city}</Text>
            </View>
            <View style={styles.personalContent}>
              <FontAwesome5 name="heart" solid style={styles.iconStyle} />
              <Text>status</Text>
            </View>
            <View style={styles.personalContent}>
              <FontAwesome5 name="envelope" solid style={styles.iconStyle} />
              <Text>{data.data.email}</Text>
            </View>
            <View style={[styles.personalContent, { borderBottomWidth: 0 }]}>
              <FontAwesome5 name="globe" solid style={styles.iconStyle} />
              <Text>website</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  singleExperience: {
    width: 323,
    paddingVertical: 20,
    shadowRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly'
  },
  experienceTitle: {
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '700',
    color: 'black',
    textTransform: 'capitalize'
  },
  experienceRole: {
    paddingHorizontal: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'red'
  },
  personalContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede'
  },
  iconStyle: {
    alignSelf: 'center'
  },
  headerStyle: { fontSize: 13, textAlign: 'right', marginRight: 20, paddingVertical: 10 },
  modalStyle: {
    height: '90%',
    backgroundColor: 'white',
    width: '90%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  title: {
    color: '#dedede',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.18,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  joinDate: {
    width: 142,
    height: 48,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff'
  }
});
