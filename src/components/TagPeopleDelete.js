import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class TagPeopleDelete extends Component {
  deleteItem = () => {
    const { detail, deletedItem } = this.props;
    deletedItem(detail);
  };

  render() {
    const { detail } = this.props;
    return (
      <View
        style={{
                padding:8,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
                borderColor: '#707070',
                borderStyle: 'solid',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5
              //  backgroundColor: '#ffffff',
              //  marginBottom: 8,
        }}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.deleteItem}>
          <Text style={{ fontSize: 10, fontFamily: 'Poppins-Medium',color: '#808080', }}>{detail.username}</Text>
          <Customon name="x" size={9} style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
      </View>
    );
  }
}
