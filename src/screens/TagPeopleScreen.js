import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Dimensions,
  Alert
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import axios from 'axios';
import TagPeopleButton from '../components/TagPeopleButton';
import TagPeopleDelete from '../components/TagPeopleDelete';
import { tagPeople } from '../redux/actions/handleYourMind';
import { fetchuserfollowers } from '../redux/actions/fetchuserfollowers';
import { apiurl } from '../constants/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import fontelloConfig from '../config.json';
const Customon = createIconSetFromFontello(fontelloConfig);

const { height, width } = Dimensions.get('window');
export class TagPeopleScreen extends Component {
  state = {
    cheked: false,
    people: [],
    loading: false
  };

  tagged = [];

  componentWillMount() {
    this.props.fetchuserfollowers(3);
  }

  deletedItem = e => {
    // Please note that checked is just a dummy state to manually trigger a rerender
    const { checked } = this.state;
    const index = this.tagged.indexOf(e);
    this.tagged.splice(index, 1);
    this.setState({ checked: !checked });
  };

  checkstats = e => {
    // Please note that checked is just a dummy state to manually trigger a rerender
    const { checked } = this.state;
    const index = this.tagged.indexOf(e);
    if (this.tagged.includes(e)) {
      this.tagged.splice(index, 1);
    } else {
      this.tagged.push(e);
    }
    this.setState({ checked: !checked });
  };

  onChangeText = async e => {
    this.setState({ people: [], loading: true });
    axios
      .get(`${apiurl}search-people.php?name=${e}`)
      .then(res => {
        console.log(res.data);
        this.setState({ people: res.data.people });
      })
      .catch(res => console.log(res.data));
    this.setState({ loading: false });
  };

  submitTagged = () => {
    const { tagPeople, navigation } = this.props;
    tagPeople(this.tagged);
    navigation.goBack();
  };

  render() {
    const { fetchfollowers } = this.props;
    const { data } = this.props.fetchfollowers;
    const { people } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Customon
              style={styles.arrowback}
              name="x"
              size={15}
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.title}> Tag People </Text>
          <TouchableOpacity style={styles.buttoncontainer} onPress={this.submitTagged} >
            <Text style={styles.buttontext}> Save </Text>
          </TouchableOpacity>
        </View>

        <StatusBar translucent={false} />


          <View style={{
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  //backgroundColor: '#eeeeee',
                }}>

                <View style={styles.searchSection}>
                  <View style={{ backgroundColor: "transparent" }}>
                    <TextInput
                      style={styles.searchExtend}
                      placeholder="Search People"
                       onChangeText={this.onChangeText}

                    />
                  </View>

                    <FontAwesome5
                      style={styles.searchIcon}
                      name="search"
                      size={20}
                      color="#000"
                      onPress={this.handleSearch}
                    />
                </View>


      </View>


        <ScrollView horizontal>
          <View
            style={{
              flexDirection: 'row',
              elevation: 3,
              backgroundColor: '#ffffff',
              padding: 8,
            }}>
            {this.tagged.map(e => (
              <TagPeopleDelete detail={e} key={e.id} deletedItem={this.deletedItem} />
            ))}
          </View>
        </ScrollView>
        <ScrollView
          style={{ position: 'relative', top: 10 }}
          contentContainerStyle={{
            zIndex: 1,
            elevation: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#f1f1h1'
          }}>
          <View style={{ padding: 20, height: Dimensions.get('window').height, marginBottom: 20}}>
            <Text>Search result</Text>
            {people.map(e => (
              <TagPeopleButton
                key={e.id}
                username={e.username}
                fullname={e.full_name}
                id={e.id}
                datum={e}
                checkstats={this.checkstats}
              />
            ))}
            <Text>Followers</Text>
            <View>
              {data === undefined ? (
                <ActivityIndicator />
              ) : (
                data.map(e => (
                  <TagPeopleButton
                    key={e.id}
                    username={e.username}
                    fullname={e.full_name}
                    id={e.id}
                    datum={e}
                    checkstats={this.checkstats}
                  />
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fetchfollowers: state.followerslist.followers
});

    export default connect(
    mapStateToProps,
    { fetchuserfollowers, tagPeople }
    )(TagPeopleScreen);

const styles = StyleSheet.create({

  header: {
 width: Dimensions.get('window').width,
 height: 60,
 backgroundColor: '#ffff',
 justifyContent: 'space-between',
 alignItems: 'center',
 flexDirection: 'row',
 padding: 15,
 shadowOffset: { width: 3, height: 0 },
 elevation: 5
},

title: {
 color: '#000',
 fontFamily: 'Poppins-Medium',
 fontSize: 16
},

buttoncontainer: {
 width: 66,
 height: 30,
 backgroundColor: '#fb0201',
 shadowRadius: 2,
 borderRadius: 6,
 justifyContent: 'center',
 alignItems: 'center'
},
arrowback: {
 color: '#000'
},
buttontext: {
  color: '#ffff',
  fontFamily: 'Poppins-Medium',
  fontSize: 13
},

searchSection: {
  justifyContent: "center",
  alignItems: "center",
  width: 335,
  height: 41,
  flexDirection: "row",
  shadowColor: "rgba(0, 0, 0, 0.35)",
  shadowOffset: { width: 3, height: 0 },
  shadowRadius: 7,
  borderRadius: 5,
  backgroundColor: "#ffffff",
  borderColor:'#eeeeee',
  borderWidth: 1
},

searchExtend: {
  width: 300,
  height: 41,
  fontSize: 12,
  color: "#000",
  fontFamily: "Poppins-Medium"
},
});
