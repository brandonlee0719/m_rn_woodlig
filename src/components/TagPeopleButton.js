import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { RadioButton, Avatar } from 'react-native-paper';
import { tagPeople } from '../redux/actions/handleYourMind';

const { width, height } = Dimensions.get('window');
export class TagPeopleButton extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'unchecked' };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { status } = this.state;
    const { datum, checkstats } = this.props;
    checkstats(datum);
  }

  render() {
    return (
      <View style={{ width, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={this.onPress}
          style={{
            width,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#dedede'
          }}>
          <Avatar.Image size={80} source={require('../images/Avatar_invisible_circle_1.png')} />
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{this.props.fullname}</Text>
            <Text style={{ fontWeight: 'bold' }}>{this.props.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(
  null,
  { tagPeople }
)(TagPeopleButton);
