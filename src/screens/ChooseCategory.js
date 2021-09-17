/* @flow */

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
  Keyboard,
  ImageBackground,
  Image,
  FlatList
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import fontelloConfig from '../config.json';
import { fetchuserfollowers } from '../redux/actions/fetchuserfollowers';
import { imageurl, apiurl } from '../constants/config.js';
import { selectedBusinessRoles } from '../redux/actions/rolesAction.js';
import ChooseCategoryPerson from '../components/ChooseCategoryPerson.js';

const selected = [];
const { width } = Dimensions.get('window');

const Customon = createIconSetFromFontello(fontelloConfig);
class ChooseCategory extends Component {
  state = {
    name: '',
    people: [],
    loading: false
  };

  componentDidMount() {
    const { user_id } = this.props;
    selected.length = 0;
    this.props.fetchuserfollowers(user_id);
  }

  searchPeople = async () => {
    const { name, people } = this.state;
    this.setState({ loading: true });
    await axios
      .get(`${apiurl}/search-people.php?name=${name}`)
      .then(res => {
        console.log(res.data);
        this.setState({ people: res.data });
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  };

  getData = e => {
    const index = selected.indexOf(e);
    const contains = selected.includes(e);
    if (contains === true) {
      selected.splice(index, 1);
    } else {
      selected.push(e);
    }
    console.log(selected);
  };

  render() {
    const { followers } = this.props;
    const { name, loading, people } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
        <View style={styles.header2}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Customon
                style={styles.arrowback}
                name="long-arrow-left"
                size={12}
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Customon
                style={styles.arrowback2}
                name="check"
                size={20}
                onPress={() =>
                  this.props.navigation.navigate('CreateACircle', {
                    category: selected
                  })
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10
            }}>
            <View style={styles.search}>
              <View style={{ paddingLeft: 10 }}>
                <TextInput
                  placeholder="andrew"
                  value={name}
                  onChangeText={name => this.setState({ name })}
                  onSubmitEditing={this.searchPeople}
                />
              </View>
              <View style={{ paddingRight: 10 }}>
                <Customon style={styles.arrowback2} name="search" size={20} />
              </View>
            </View>
            <View style={styles.line} />
          </View>
        </View>
        {people.status === 'success' && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {people.people.map(e => (
              <ChooseCategoryPerson key={e.id} item={e} addUser={this.getData} />
            ))}
          </View>
        )}
        <View style={{ paddingLeft: 15 }}>
          <Text
            style={{
              color: '#000',
              fontSize: 10,
              fontFamily: 'Poppins-Medium'
            }}>
            Followers
          </Text>
        </View>
        <FlatList
          scrollEnabled
          keyExtractor={item => item.id}
          data={followers.data}
          numColumns={4}
          renderItem={({ item }) => <ChooseCategoryPerson item={item} addUser={this.getData} />}
        />
        <View style={{ paddingLeft: 15 }}>
          <Text
            style={{
              color: '#000',
              fontSize: 10,
              fontFamily: 'Poppins-Medium'
            }}>
            Load more
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  lineBottom: {
    marginTop: 10,
    width: 60,
    height: 1,
    borderColor: '#e7e4e9',
    borderStyle: 'solid',
    borderWidth: 1
  },

  lineBottom2: {
    width: 1,
    marginLeft: -20,
    height: 110,
    borderRightColor: '#e7e4e9',
    // borderStyle: 'solid',
    borderWidth: 0.5,
    marginTop: 20
  },

  title: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#000'
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
    borderRadius: 50
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
  header2: {
    width: Dimensions.get('window').width,
    // height: 60,
    backgroundColor: '#ffff',
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    padding: 15,
    shadowOffset: { width: 3, height: 0 },
    elevation: 5
  },
  header: {
    // width: Dimensions.get('window').width,
    //  height: 60,
    // backgroundColor: '#ffff',
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    // padding: 15,
    shadowOffset: { width: 3, height: 0 }
    //  elevation: 5,
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

  arrowback3: {
    color: '#fb0201'
  },
  arrowback: {
    color: '#000'
  }
});

const mapStateToProps = state => ({
  followers: state.followerslist.followers,
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  username: state.profilepicture.username
});

export default connect(
  mapStateToProps,
  { fetchuserfollowers }
)(ChooseCategory);
