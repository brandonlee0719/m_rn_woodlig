import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import OnYourMindStack from '../screens/OnYourMindScreen';

const Customon = createIconSetFromFontello(fontelloConfig);

const { width } = Dimensions.get('window');

export default class AddLocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { addressoptions: [] };
  }

  componentDidUpdate(prevprops) {
    const { textchanged } = this.props;
    console.log(this.props);
  }

  render() {
    const { addressoptions } = this.state;
    return (
      <TouchableOpacity
        onPress={e => console.log(this.props.country)}
        style={{
          width,
          paddingVertical: 10,
          flexDirection: 'row',
          borderBottomWidth: 2
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
          <Customon
            name="mapmarkericonforaddlocationbesidetextthatiswrappedwitharedcircle"
            size={30}
            color="white"
          />
        </View>
        <View style={{ marginLeft: 50 }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              flexWrap: 'wrap'
            }}>
            {this.props.description}
          </Text>
          <Text>{this.props.country}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// const AddLocationRoute = createStackNavigator({
//   Onysys: { screen: OnYourMindStack },
//   AddLocationComp: { screen: AddLocationComponent },
// },
// {
//   initialRouteName: 'AddLocationComp',
// })

// export default createAppContainer(AddLocationRoute);
