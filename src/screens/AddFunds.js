import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import WalletPromotion from '../components/WalletPromotion';

const Customon = createIconSetFromFontello(fontelloConfig);

export default class AddFunds extends Component {
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
          <Text style={styles.title}> Add Funds </Text>
          <TouchableOpacity>
            <Image
              style={{ width: 38, height: 38 }}
              source={require('../images/ic_account_circle_red_24px.jpg')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}>
          <View style={styles.addFunds}>
            <TextInput
              placeholder="Add Funds"
              underlineColorAndroid="transparent"
              style={styles.TextInputStyle}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
          <TouchableOpacity>
            <View style={styles.addFunds2}>
              <FontAwesome5 name="fingerprint" color="#ffff" size={14} />
              <Text style={styles.addFundsBtn}>ADD FUNDS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  addFunds: {
    width: 362,
    height: 40,
    borderRadius: 5,
    borderColor: '#d6d6d6',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#f5f5f5'
  },

  addFundsBtn: {
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    color: '#ffffff',
    // marginTop: 75,
    marginLeft: 8,
    fontSize: 10
  },

  addFunds2: {
    width: 99,
    height: 34,
    shadowColor: '#000',
    // shadowOffset: { width: 6, height: 0 },
    shadowRadius: 19,
    borderRadius: 25,
    backgroundColor: '#fb0201',
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
