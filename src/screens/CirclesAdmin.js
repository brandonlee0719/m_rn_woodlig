/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import fontelloConfig from '../config.json';
import { Switch } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Customon = createIconSetFromFontello(fontelloConfig);
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Avatar } from 'react-native-paper';


export default class MyComponent extends Component {
  state = {
    colorTrueSwitchIsOn: true,
    colorFalseSwitchIsOn: false,
  };

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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    };
    var innerContainerTransparentStyle = {
      width: 286,
    height: 218,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 8,
    borderRadius: 8,

    backgroundColor: '#f7f8f9',


    //backgroundColor: '#ffffff',
    };

    const { isSwitchOn } = this.state;
    return (
      <View style={styles.container}>

<View style={styles.header2}>

    <View style={styles.header}>
        <TouchableOpacity>
          <Customon style={styles.arrowback} name="long-arrow-left" size={12} />
        </TouchableOpacity>
        <Text style={styles.title}> Applicants With Passion </Text>
        <TouchableOpacity>
          <FontAwesome5 style={styles.arrowback2} name="ellipsis-v" size={20} />
        </TouchableOpacity>
    </View>
      <View style={styles.headerProfile}>
          <Image
            source={require('../images/ic_account_circle_24px.jpg')}
            style={{ width: 35, height: 35,  }}

          />

              </View>
          </View>
        <ScrollView>
  <View style={styles.containerAdmin}>
        <Text style={{color: '#757575', fontSize:12, fontFamily: 'Poppins-Medium'}}>Admin (1)</Text>

    <View style={{flexDirection:'row', marginTop: 10, marginBottom: 10}}>
    <View style={styles.addSection}>
<TouchableOpacity>
        <Avatar.Icon
        size={50}
        icon={() => <Customon name="plus" color="#fff" size={22} />}
        style={{backgroundColor:'#fb0201', marginBottom: 10}}
        />
        </TouchableOpacity>
        <Text style={{color: '#212121', fontSize:14, fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
        Add
        </Text>
    </View>


    <View style={styles.addSection}>
  <Image
    source={{
    uri: 'https://images2.jiji.ng/33381231_img-20190728-144850-403_620x620.jpg',}}
      style={{ width: 49, height: 49,  borderRadius: 30, marginBottom:10 }}

    />
        <Text style={{color: '#212121', fontSize:14, fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
        Me
        </Text>
  </View>
  </View>
  <Text style={{color: '#757575', fontSize:12, fontFamily: 'Poppins-Medium'}}>Member (2)</Text>
  <View style={{flexDirection:'row', marginTop: 10, marginBottom: 10}}>
  <View style={styles.addSection}>
<TouchableOpacity>
      <Avatar.Icon
      size={50}
      icon={() => <Customon name="plus" color="#fff" size={22} />}
      style={{backgroundColor:'#fb0201', marginBottom: 10}}
      />
      </TouchableOpacity>
      <Text style={{color: '#212121', fontSize:14, fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
      Add
      </Text>
  </View>


  <View style={styles.addSection}>
<Image
  source={{
  uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}}
    style={{ width: 49, height: 49,  borderRadius: 30, marginBottom:10 }}

  />
      <Text style={{color: '#212121', fontSize:14, fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
      Letita Sob...
      </Text>
</View>

<TouchableOpacity style={{marginLeft: -10}} onPress={this._handleButtonPress}>
  <FontAwesome5 style={styles.arrowback2} name="ellipsis-v" size={14} />
</TouchableOpacity>

<View style={styles.addSection}>
<Image
source={{
uri: 'https://images2.jiji.ng/33381227_e20bb3dce5b57736c4f05020fc099cac_620x1020.jpg',}}
  style={{ width: 49, height: 49,  borderRadius: 30, marginBottom:10 }}

/>
    <Text style={{color: '#212121', fontSize:14, fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
    Janine Ha...
    </Text>
</View>
<TouchableOpacity style={{marginLeft: -10}} onPress={this._handleButtonPress}>
<FontAwesome5 style={styles.arrowback2} name="ellipsis-v" size={14} />
</TouchableOpacity>
</View>
    </View>


    <View style={styles.media}>
      <Text style={{color: '#757575', fontSize:12, fontFamily: 'Poppins-Medium'}}>Media (11)</Text>
      <View style={styles.mediaScroll}>

<ScrollView horizontal ={true}>
      <Image
      source={{
      uri: 'https://www.planetware.com/photos-large/MEX/mexico-top-places-cancun-mayan-riviera.jpg',}}
        style={styles.img}

      />

      <Image
      source={{
      uri: 'https://www.pandotrip.com/wp-content/uploads/2018/06/Eiffel-Tower-Paris-France.jpg',}}
        style={styles.img}

      />

      <Image
      source={{
      uri: 'https://www.gannett-cdn.com/presto/2019/03/25/PWTR/7adb8743-7973-4d93-8122-c925748d92ac-cereal_1.jpg?width=540&height=&fit=bounds&auto=webp',}}
        style={styles.img}

      />

      <ImageBackground
      source={{
      uri: 'https://www.pandotrip.com/wp-content/uploads/2018/06/Eiffel-Tower-Paris-France.jpg',}}
        style={styles.img}>
      <Customon name="video" color="#fff" size={10} style={{position: 'absolute', top: 10, left: 70}}  />

      </ImageBackground>

      <Image
      source={{
      uri: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/VBRVHv3De/videoblocks-stoned-couple-in-a-room-smoking-joint_sxzms1cdg_thumbnail-full01.png',}}
        style={styles.img}

      />

      <ImageBackground
      source={{
      uri: 'https://www.broadsheet.com.au/media/cache/90/d6/90d68f5b6695bfa3f86a5c425acca004.jpg',}}
        style={styles.img}>
      <Customon name="video" color="#fff" size={10} style={{position: 'absolute', top: 10, left: 70}}  />

      </ImageBackground>
      </ScrollView>

      </View>
    </View>

    <View style={styles.notifications}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{color: '#757575', fontSize:16, fontFamily: 'Poppins-Medium'}}>Mute Notifications</Text>
      <Switch
        onValueChange={(value) => this.setState({ colorFalseSwitchIsOn: value })}
        onTintColor="#0ce0b5"
        style={{
          height: 15,

        }}
        thumbTintColor="#cccc"
        tintColor="#000"
        value={this.state.colorFalseSwitchIsOn} />
    </View>
  </View>
  <View style={styles.disband}>
  <Text style={{color: '#fb0201', fontSize:16, fontFamily: 'Poppins-Medium'}}>Disband group</Text>
  </View>
        </ScrollView>


        <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => this.setModalVisible(false)}>

                  <View style={[styles.container, modalBackgroundStyle]}>

                    <View style={innerContainerTransparentStyle}>
                  <View style={{flexDirection: 'row',
                   borderBottomWidth:1,
                   borderBottomColor: '#ced6e0',
                   marginBottom: 8,
                   padding: 10,}}>
                  <View>
                <FontAwesome5 name="times" color= "#ced6e0"  size={14}
              onPress={this.setModalVisible.bind(this, false)} />
                </View>
                <View style={{flex:1.5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', fontSize:12, fontFamily: 'Poppins-Medium'}}>Letita Sobu</Text>
              </View>
              </View>
              <View style={{borderBottomWidth:'#ced6e0', borderBottomWidth:0.2, paddingLeft: 10, paddingBottom: 5}}>
              <Text style={{color: '#212121', fontSize:10, fontFamily: 'Poppins-Medium', marginBottom: 5}}>Option</Text>
              <TouchableOpacity>
              <Text style={{color: '#212121', fontSize:12, fontFamily: 'Poppins-Medium', marginBottom: 5}}>View Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderBottomWidth:'#ced6e0', borderBottomWidth:0.2, paddingLeft: 10, paddingBottom: 5, paddingTop: 8}}>
                <TouchableOpacity>
              <Text style={{color: '#212121', fontSize:10, fontFamily: 'Poppins-Medium', marginBottom: 5}}>Mute</Text>
                </TouchableOpacity>
              </View>
              <View style={{borderBottomWidth:'#ced6e0', borderBottomWidth:0.2, paddingLeft: 10, paddingBottom: 5, paddingTop: 8}}>
              <TouchableOpacity>
              <Text style={{color: '#fb0201', fontSize:10, fontFamily: 'Poppins-Medium', marginBottom: 5}}>Remove from group</Text>
              </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 10, paddingBottom: 5}}>
              <TouchableOpacity>
              <Text style={{color: '#fb0201', fontSize:10, fontFamily: 'Poppins-Medium', marginBottom: 5, paddingTop: 8}}>Report</Text>
              </TouchableOpacity>
              </View>

                </View>
                  </View>
                </Modal>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  disband:{
    width: Dimensions.get('window').width,
    padding: 15,
        backgroundColor: '#ffffff',
        marginBottom: 18,

    },
  notifications: {
    width: Dimensions.get('window').width,
    padding: 15,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ced6e0',

    },
  img: {
    width: 94,
    height: 94,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 16,
    borderRadius: 20,
    marginTop: 10,
    overflow: 'hidden',
    marginRight: 6,
    elevation: 5,

    },
  mediaScroll: {
    flexDirection: 'row',
    },
  media:{
    width: Dimensions.get('window').width,
    padding: 15,
      backgroundColor: '#ffff',
      marginBottom: 18,
    },
  addSection:{
    padding: 7,
    //width: 70,
    justifyContent: 'center',
    alignItems: 'center'
},
  containerAdmin: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    padding: 15,
    marginTop: 54,
    marginBottom: 18,

  },
  headerProfile:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3
  },
  header: {
    width: Dimensions.get('window').width,
    height: 40,
    //backgroundColor: '#ffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    shadowOffset: { width: 3, height: 0 },
    //elevation: 5,
  },

    header2: {
      width: Dimensions.get('window').width,
      height: 65,
      backgroundColor: '#ffff',
      //justifyContent: 'space-between',
      //alignItems: 'center',
      //flexDirection: 'row',
      //padding: 15,
      paddingTop: 10,
      shadowOffset: { width: 3, height: 0 },
      elevation: 5,
  },
  titleHeader: {
    //  width: 375,
    //marginTop: 20,
    height: 112,
    backgroundColor: '#ffffff',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,

  },

  arrowback2: {
    color: '#000',
  },
  arrowback: {
    color: '#000',
  },

  headerArrow: {
    flex: 1,

  },

  headerTitle: {
    flex: 2,
    marginLeft: 35,
    //alignItems: 'center',
    justifyContent: 'center',

  },

});
