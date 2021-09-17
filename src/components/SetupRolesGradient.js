import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { selectedIndividualRoles, deleteIndividualRoles } from '../redux/actions/rolesAction';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);
const val = [];
const styles = StyleSheet.create({
  linearGradient: {
    display: 'flex',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 10
  }
});
export class SetupRolesGradient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      color: 'white',
      newRoles: {}
    };
  }
  // componentDidMount() {
  //     this.props.deleteIndividualRoles
  // }

  componentDidUpdate(a, z) {
    val.push(a.text);
    const no_of_times = val.reduce(
      (b, c) => (
        (b[b.findIndex(d => d.el === c)] || b[b.push({ el: c, count: 0 }) - 1]).count++, b
      ),
      []
    );
    const cont = no_of_times.filter((value, index, arr) => value.count % 2 == 1);
    const rolesArray = Object.keys(cont).map((i, j, k) => cont[i].el);
    this.props.selectedIndividualRoles(rolesArray);
  }

  onPress(e, f) {
    // console.log(f)
    const { color, selected } = this.state;
    if (selected === true) {
      this.setState({ selected: false });
    }
    if (selected === false) {
      this.setState({ selected: true });
    }
  }

  render() {
    const { selected } = this.state;
    if (this.props.text) {
      return (
        <View style={{ paddingBottom: 20 }}>
          <LinearGradient colors={['#b7afd9', '#d090d4']} style={styles.linearGradient}>
            <Customon
              name="check-circle"
              style={{ position: 'absolute', right: 0, top: 0 }}
              color={selected === true ? '#21f612' : '#ffffff'}
            />
            <Text
              style={{ textAlign: 'center', color: 'white' }}
              onPress={this.onPress.bind(this, this.props.id, this.props.value)}>
              {this.props.text}
            </Text>
          </LinearGradient>
        </View>
      );
    }
    return <ActivityIndicator />;
  }
}

const mapStateToProps = state => ({
  deletedrole: state.roles.deletedindividual
});

export default connect(
  mapStateToProps,
  { selectedIndividualRoles, deleteIndividualRoles }
)(SetupRolesGradient);
