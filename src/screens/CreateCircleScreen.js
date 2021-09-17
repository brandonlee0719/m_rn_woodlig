import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

const { width, height } = Dimensions.get('window');
class CreateCircleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacy: 'public',
      circle_name: ''
    };
  }

  // componentDidMount() {
  //   const { circle_name, privacy } = this.state;
  //   const { navigation } = this.props;
  //   const circle_type = navigation.getParam('selected', []);
  //   const members = navigation.getParam('category', []);
  //   this.ref = firebase
  //     .firestore()
  //     .collection('circles')
  //     .doc('6cdcc8c3-22b3-4120-a362-f414bbd735d5');

  //   this.ref.update({ circle_type: [{ name: 'abuja', id: 1 }] });
  //   // this.ref.onSnapshot(snap => console.log(snap.data()));
  //   // console.log(this.ref);
  // }

  createCircle = () => {
    const { circle_name, privacy } = this.state;
    const { navigation, user_id } = this.props;
    const path = 'https://image.flaticon.com/icons/png/512/69/69589.png';
    const date_created = Date.now();
    const circle_type = navigation.getParam('selected', []);
    const members = navigation.getParam('category', []);
    const groupkey = uuidv4();
    const groupExists = [];
    this.ref = firebase
      .firestore()
      .collection('circles')
      .doc(groupkey);
    this.keycheck = firebase.firestore().collection('circles');
    const data = { members, circle_name, circle_type, date_created, privacy, groupkey, path };
    if (circle_name.length < 3) {
      return alert('Circle Name is too short');
    }
    const allCities = this.keycheck
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          groupExists.push(doc.id);
        });
        const exists = groupExists.filter(id => id === groupkey);
        if (exists.length > 0) throw 'the data already exists';
        else {
          this.ref.set(data).then(res => {
            // alert('working')
            const getDoc = this.ref
              .get()
              .then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  firebase
                    .firestore()
                    .collection('users')
                    .doc(user_id)
                    .collection('grouplist')
                    .add({ groupkey });
                  doc.data().members.forEach(element => {
                    firebase
                      .firestore()
                      .collection('users')
                      .doc(element.id)
                      .collection('grouplist')
                      .add({ groupkey });
                  });
                  this.props.navigation.navigate('GroupMessage', { groupkey, circle_name });
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { privacy, circle_name } = this.state;
    const { navigation } = this.props;
    const selected = navigation.getParam('selected', []);
    const category = navigation.getParam('category', []);
    return (
      <View style={{ flex: 1, backgroundColor: '#808080' }}>
        <View
          style={{
            height: '20%',
            justifyContent: 'space-evenly',
            paddingLeft: 20
          }}>
          <FontAwesome5
            name="times"
            size={16}
            color="#414141"
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              color: '#3e3e3e',
              fontSize: 25,
              fontWeight: '700',
              textAlign: 'center'
            }}>
            Create A Circle
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            elevation: 2,
            height: '80%',
            justifyContent: 'space-between',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 30
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Avatar.Icon
              size={74}
              style={{
                borderColor: '#808080',
                borderWidth: 1,
                backgroundColor: '#d1d1d1'
              }}
              icon="camera-alt"
            />
            <View>
              <Text style={styles.inputHeader}>Circle Name</Text>
              <TextInput
                style={{ width: 234, borderBottomWidth: 1, padding: 0 }}
                value={circle_name}
                onChangeText={circle_name => this.setState({ circle_name })}
                placeholder="enter circle name here"
                placeholderTextColor="#dedede"
              />
            </View>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={styles.inputHeader}>Circle Type</Text>
            <View style={styles.boxStyle}>
              <View style={{ flex: 3 }}>
                <ScrollView>
                  {selected.map(e => (
                    <Text>{e.name}</Text>
                  ))}
                </ScrollView>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderTopWidth: 1,
                  borderTopColor: '#dedede'
                }}>
                <FontAwesome5.Button
                  color="#808080"
                  backgroundColor="transparent"
                  name="plus"
                  onPress={() =>
                    this.props.navigation.navigate('SelectSkillType', {
                      prevstate: 'CreateACircle'
                    })
                  }>
                  Add Category
                </FontAwesome5.Button>
              </View>
            </View>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <Text style={styles.inputHeader}>Add Members</Text>
            <View style={styles.boxStyle}>
              <View style={{ flex: 3 }}>
                <ScrollView>
                  {category.map(e => (
                    <Text>{e.full_name}</Text>
                  ))}
                </ScrollView>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderTopWidth: 1,
                  borderTopColor: '#dedede'
                }}>
                <FontAwesome5.Button
                  color="#808080"
                  backgroundColor="transparent"
                  name="plus"
                  onPress={() => this.props.navigation.navigate('AddCircleMembers')}>
                  Add People
                </FontAwesome5.Button>
              </View>
            </View>
          </View>
          <View style={{ marginLeft: 120 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5.Button
                color={privacy === 'private' ? '#fb0201' : '#808080'}
                backgroundColor="transparent"
                name="lock"
                onPress={() => this.setState({ privacy: 'private' })}>
                Private
              </FontAwesome5.Button>
              <FontAwesome5.Button
                color={privacy === 'public' ? '#fb0201' : '#808080'}
                backgroundColor="transparent"
                name="lock-open"
                onPress={() => this.setState({ privacy: 'public' })}>
                Public
              </FontAwesome5.Button>
            </View>
          </View>
          <View style={{ marginLeft: 120 }}>
            <TouchableOpacity style={styles.submitButton} onPress={this.createCircle}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#ffffff' }}>
                Create Circle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    width: 234,
    height: 104,
    borderColor: '#d1d1d1',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  inputHeader: {
    fontSize: 15,
    fontWeight: '400',
    color: '#808080'
  },
  submitButton: {
    width: 139,
    height: 32,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 6,
    borderRadius: 25,
    backgroundColor: '#fb0201'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  username: state.profilepicture.username
});

export default connect(mapStateToProps)(CreateCircleScreen);
