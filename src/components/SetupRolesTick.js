import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import { connect } from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';
// import { deleteIndividualRoles } from '../redux/actions/rolesAction';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);

export class SetupRolesTick extends Component {
  constructor(props) {
    super(props);
    this.state = { deletion: false };
  }

  onPress() {
    const position = this.props.total.indexOf(this.props.roles);
    this.props.total.splice(position, 1);
    this.props.deleteIndividualRoles(this.props.roles);
    // console.log(this.props.roles)
  }

  //  onPress={this.onPress.bind(this)
  render() {
    const { roles, viewStyle, textStyle } = this.props;
    return (
      <View style={{ paddingBottom: 5, paddingLeft: 10 }}>
        <View
          style={[
            {
              borderWidth: 1,
              borderColor: 'black',
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              flexDirection: 'row'
            },
            viewStyle
          ]}>
          <Text
            style={[
              {
                marginRight: 10,
                marginLeft: 10,
                color: '#808080',
                fontFamily: 'Montserrat',
                fontSize: 9,
                fontWeight: '600'
              },
              textStyle
            ]}>
            {roles}
          </Text>
        </View>
      </View>
    );
  }
}

export default SetupRolesTick;
