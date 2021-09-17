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
  Image,
  } from 'react-native';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import fontelloConfig from '../config.json';
  import WalletPromotion from '../components/WalletPromotion';
  import Swiper from 'react-native-swiper';
  import { createIconSetFromFontello } from 'react-native-vector-icons';

  const Customon = createIconSetFromFontello(fontelloConfig);
export default class ChooseAudience extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome5 style={styles.arrowback} name="arrow-left" size={15} />
        </TouchableOpacity>
        <Text style={styles.title}> Choose Audience </Text>
        <TouchableOpacity>
        <Image style={{width: 38, height: 38}} source={require('../images/ic_account_circle_red_24px.jpg')} />
        </TouchableOpacity>
      </View>
      <Swiper style={styles.wrapper} showsButtons={false} showsPagination = {true}  loop={false}
      dot={<View style={{ backgroundColor: '#fecbcb', width: 7, height: 7, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
        activeDot={<View style={{ backgroundColor: '#fb0201', width: 7, height: 7, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
        paginationStyle={{
          bottom: 540
        }}>
        <View style={styles.slide1}>
        <View style={styles.topHeader}>

          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', padding: 30}}>
          <Text style={styles.text1}>0</Text>
            <Text style={styles.text2}>Potential audience (approx.)</Text>
          </View>
<TouchableOpacity>
          <View style={styles.menuTabs}>
          <Text style={styles.menu}>Locations</Text>
          <FontAwesome5 style={styles.arrowfront} name="chevron-right" size={15} />
          </View>
</TouchableOpacity>
<TouchableOpacity>
          <View style={styles.menuTabs}>
          <Text style={styles.menu}>Categories</Text>
          <FontAwesome5 style={styles.arrowfront} name="chevron-right" size={15} />
          </View>
</TouchableOpacity>
<TouchableOpacity>
          <View style={styles.menuTabs}>
          <Text style={styles.menu}>Age</Text>
          <FontAwesome5 style={styles.arrowfront} name="chevron-right" size={15} />
          </View>
</TouchableOpacity>
<TouchableOpacity>
          <View style={styles.menuTabs}>
          <Text style={styles.menu}>Gender</Text>
          <FontAwesome5 style={styles.arrowfront} name="chevron-right" size={15} />
          </View>
</TouchableOpacity>

<View style={styles.submitBtn} >
<TouchableOpacity>
          <View style={styles.buttonTab}>
          <Text style={{fontFamily: 'Poppins-Medium', color: '#ffff'}}> Next </Text>
          <FontAwesome5 name="arrow-right" color= "#ffff"  size={9} style={{paddingLeft:10}}  />
          </View>
</TouchableOpacity>
</View>

        </View>
<View style={styles.topHeader}>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
</View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
        <View style={styles.slide4}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide5}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide6}>
          <Text style={styles.text}>And simple</Text>
        </View>
        <View style={styles.slide7}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide8}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide9}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  submitBtn:{
    //flex:1,
    //alignSelf: 'flex-end',
    position: 'relative',
  },
  slide1:{


  },
  buttonTab:{
    height: 50,
    backgroundColor: '#fb0201',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',



  },
  menu:{
    padding: 10,
    flexDirection: 'row',
    // marginRight: 10,
  },
  text1: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: 30
  },
  menuTabs: {
  height: 47,
   borderColor: '#eeeeee',
   borderStyle: 'solid',
   borderWidth: 1,
   backgroundColor: '#ffffff',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   //marginRight: 10,

 },
  text2: {
    color: '#707070',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  topHeader:{
    marginTop: 40,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
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
    elevation: 5,


  },

  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },

  arrowback: {
    color: '#000'
  },
  arrowfront: {
    color: '#000',
    marginRight: 15,
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
