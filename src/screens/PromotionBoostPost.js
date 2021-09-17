import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  ImageBackground,
  Image,
  Dimensions,
 } from 'react-native';

 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
 import fontelloConfig from '../config.json';
 import WalletPromotion from '../components/WalletPromotion';
 import { createIconSetFromFontello } from 'react-native-vector-icons';
 import Swiper from 'react-native-swiper';

 const Customon = createIconSetFromFontello(fontelloConfig);


export default class PromotionBoostPost extends Component {
  state = {
    modalVisible: false,
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    var innerContainerTransparentStyle = {backgroundColor: '#fff',
    // paddingTop: 10,

     marginTop:100,
     //height: 300,
     height: Dimensions.get('window').height - 100,
    //shadowColor: 'rgba(0, 0, 0, 0.16)',
    //shadowOffset: { width: -1, height: 0 },
    width: Dimensions.get('window').width,
    shadowRadius: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    //backgroundColor: '#ffffff',
   };
    return (
      <View style={styles.container}>
      <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
          >
          <View style={[styles.container, modalBackgroundStyle]}>

            <View style={innerContainerTransparentStyle}>

        <Swiper showsButtons={false} showsPagination = {true} loop={false}
        dot={<View style={{ backgroundColor: '#fecbcb', width: 7, height: 7, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{ backgroundColor: '#fb0201', width: 7, height: 7, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          paginationStyle={{
            bottom: 70
          }}

        >

        <View style={styles.slide1}>
        <View style={{padding:20}}>
        <FontAwesome5 name="times" color= "#000"  size={14}
        onPress={this.setModalVisible.bind(this, false)} />
        </View>
        <Image style={styles.bgImage}

        source={require('../images/Rocket_Launch.png')} resizeMode="contain" />

        <View style={styles.text}>
        <Text>page 1 </Text>
        </View>
        </View>
        <View style={styles.slide2}>
        <View style={{padding:20}}>
        <FontAwesome5 name="times" color= "#000"  size={14}
        onPress={this.setModalVisible.bind(this, false)} />
        </View>
        <Image style={styles.bgImage}
        source={require('../images/promotion2-bg.png')} resizeMode="contain" />
        <View style={styles.text2}>
        <Text style={styles.textBoost}>Target the right audience for each
        post to ensure max engagement.</Text>
        </View>
        </View>
        <View style={styles.slide3}>
        <View style={{padding:20}}>
        <FontAwesome5 name="times" color= "#000"  size={14}
        onPress={this.setModalVisible.bind(this, false)} />
        </View>
        <Image style={styles.bgImage2}
        source={require('../images/promotion5-bg.png')} resizeMode="contain" />
        <View style={styles.text2}>
        <Text style={styles.textBoost}>View insights for your promoted posts
to analyse engagement and have a better
understanding of your audience.</Text>
<View style={styles.text3}>
<Text style={styles.textBlue}>Learn more about this in our FAQ.</Text>
</View>
        </View>
        </View>

    </Swiper>

            </View>

          </View>

        </Modal>
        <Button
          title="Press me"
          onPress={this._handleButtonPress}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
  },
  textBoost: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#000'
  },
  text: {
    flex: 1,
    //paddingBottom: 150

  },
  text2: {
    flex: 1,
    paddingBottom: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text3: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

    textBlue: {
      textAlign: 'center',
      fontFamily: 'Poppins-Medium',
      fontSize: 15,
      color: '#0052ff',

  },
bgImage: {
  flex: 6,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,

},

bgImage2: {
  flex: 6,
  marginBottom: 100,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,

},
slide1: {
  flex: 1,
  //justifyContent: 'center',
  //alignItems: 'center',
  //backgroundColor: 'red',
},
slide2: {
  flex: 1,
//  justifyContent: 'center',
  //alignItems: 'center',
  //backgroundColor: '#97CAE5',
},
slide3: {
  flex: 1,
  //justifyContent: 'center',
//  alignItems: 'center',
  //backgroundColor: '#92BB',
},

});
