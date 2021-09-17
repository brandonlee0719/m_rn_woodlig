import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SinglePlace extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ViewTrendingItems', {
            type: 'places',
            item
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5
          }}>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Image source={require('../images/location.webp')} />
          </View>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontSize: 15,
                fontStyle: 'italic',
                fontWeight: '700',
                color: '#000'
              }}>
              {item.address}
            </Text>
            {/* <Text style={{ fontSize: 8, fontWeight: '500' }}>Posts : 213k</Text> */}
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FontAwesome5 name="ellipsis-h" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(SinglePlace);
