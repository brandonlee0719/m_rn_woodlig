import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { addlocation } from '../redux/actions/handleYourMind';
import AddLocationComponent from '../components/AddLocation';

import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('window');
export class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationChanged: '',
      addressoptions: []
    };
  }
  // componentDidUpdate(prevprops, newState) {
  //   console.log(this.state.addressoptions)
  //   }

  async textChanged(text) {
    const { locationChanged, addressoptions } = this.state;
    this.setState({ locationChanged: text });
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDnd-OjoFVYBZjbB9ok_Pw8pGj0AyhLpjI&input=${locationChanged}&radius=50`
      )
      .then(res => {
        this.setState({ addressoptions: res.data.predictions });
        // console.log(res.data);
      });
  }

  handleLocation(e) {
    const len = e.terms.length - 1;
    const len2 = e.terms.length - 2;
    const formatted_address = e.description;
    const city = e.terms.length > 1 ? e.terms[len2].value : '';
    const country = e.terms[len].value;
    // console.log(city, country);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${e.place_id}&key=AIzaSyDnd-OjoFVYBZjbB9ok_Pw8pGj0AyhLpjI`
      )
      .then(ans => {
        console.log(ans.data.results[0].geometry.location);
        const coord = ans.data.results[0].geometry.location;
        const data = { formatted_address, city, country, ...coord };
        this.props.addlocation(data);
        this.props.navigation.goBack();
      });
  }

  render() {
    const { locationChanged, addressoptions } = this.state;
    return (
      <View style={{ height, width }}>
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
                      value={this.state.locationChanged}
                      onChangeText={this.textChanged.bind(this)}

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
        <ScrollView
          contentContainerStyle={{
            marginTop: 20,
            elevation: 1,
            width,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#f1f1h1'
          }}>
          <View style={{ height: 700 }}>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#dedede'
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginLeft: 20
                }}>
                <Customon name="map-marker-alt" size={30} color="white" />
              </View>
              <View style={{ justifyContent: 'center', marginHorizontal: 20 }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                  Use current location
                </Text>
              </View>
            </View>
            {addressoptions === [] ? (
              <ActivityIndicator />
            ) : (
              addressoptions.map(e => (
                <TouchableOpacity
                  key={e.id}
                  onPress={this.handleLocation.bind(this, e)}
                  style={{
                    // width,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#dedede'
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'red',
                      height: 50,
                      width: 50,
                      borderRadius: 50
                    }}>
                    <Customon name="map-marker-alt" size={30} color="white" />
                  </View>
                  <View style={{ marginHorizontal: 20 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        fontWeight: 'bold'
                      }}>
                      {e.description}
                    </Text>
                    <Text>{e.terms[e.terms.length - 1].value}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  { addlocation }
)(AddLocation);

const styles = StyleSheet.create({


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
