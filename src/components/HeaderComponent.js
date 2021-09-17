import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);
class HeaderComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Customon
              style={styles.arrowback}
              name="long-arrow-left"
              size={15}
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.title}> My Wallet </Text>
          <TouchableOpacity>
            <Image
              style={{ width: 38, height: 38 }}
              source={require('../images/ic_account_circle_red_24px.jpg')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
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

  arrowback: {
    color: '#000'
  },

  headerArrow: {
    flex: 1
  },

  headerTitle: {
    flex: 2,
    marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(HeaderComponent);
