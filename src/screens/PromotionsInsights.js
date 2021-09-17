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
  import { createIconSetFromFontello } from 'react-native-vector-icons';

  const Customon = createIconSetFromFontello(fontelloConfig);
export default class PromotionsInsights extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome5 style={styles.arrowback} name="arrow-left" size={15} />
        </TouchableOpacity>
        <Text style={styles.title}> Promotions Insights </Text>
        <TouchableOpacity>
        <Image style={{width: 38, height: 38}} source={require('../images/ic_account_circle_red_24px.jpg')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.headerBg}>
      <Image style={{height: 196, width: Dimensions.get('window').width}} source={require('../images/bannerBg.png')} resizeMode="contain" />
      </View>
      <View style={styles.headerBgCaption}>
      <Text style={styles.headerBgCaptionText}>GHETTO AJEBO LAFTA</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent : 'center', marginTop: 20}}>
      <TouchableOpacity>
            <View style={styles.addFunds2}>
            <Text style={styles.addFundsBtn}>
             View original post
            </Text>
           <FontAwesome5 name="arrow-right" color= "#ffff"  size={9} style={{paddingLeft:10}}  />
             </View>
            </TouchableOpacity>
            </View>
            <View style={styles.grid}>

            <View style={styles.gridContent1}>
            <Text style={styles.gridTextSmall}>Elapsed time</Text>
            <Text style={styles.gridTextBig}>11 days</Text>
            </View>
            <View style={styles.gridContent1}>
            <Text style={styles.gridTextSmall}>Remaining time</Text>
            <Text style={styles.gridTextBig}>4 days</Text>
            </View>
            <View style={styles.gridContent2}>
            <Text style={styles.gridTextSmall}>Spent</Text>
            <Text style={[styles.gridTextBig, styles.spent]}>$7.08</Text>
            <Text style={styles.spent2}>of your $12.05 USD budget</Text>
            </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'center',
            alignItems: 'center', marginTop:15, paddingBottom:10,
            borderBottomWidth: 1, borderBottomColor : '#dedede'}}>
            <Text style={styles.status1}> Promotion Status: </Text>
            <Text style={styles.status2}> Paused </Text>
            </View>
            <View style={{ justifyContent:'center',
            alignItems: 'center', marginTop:15, paddingBottom:10,}}>
            <Text style={styles.gridTextBig}> Impressions </Text>
            <Text style={styles.gridTextBig}> 612,543 </Text>
            <View style={styles.impressionIcons}>
            <View>
             <FontAwesome5  name="heart"   color='#fb0201'  size={19}
             style={{paddingLeft:10, marginBottom: 13}}  />
             <Text style={styles.gridTextBig}>8.2k</Text>
             </View>
             <View>
             <FontAwesome5  name="share"  color='#fb0201'  size={19}
             style={{paddingLeft:10, marginBottom: 13}}  />
             <Text style={styles.gridTextBig}>892</Text>
             </View>
             <View>
             <FontAwesome5  name="share-alt"  color= '#fb0201'  size={19}
             style={{paddingLeft:10, marginBottom: 13}}  />
             <Text style={styles.gridTextBig}>343</Text>
             </View>
             <View>
             <FontAwesome5  name="link"  color= '#fb0201'  size={19}
             style={{paddingLeft:10, marginBottom: 13}}  />
             <Text style={styles.gridTextBig}>109</Text>
             </View>
            </View>
            </View>
            <View style={{justifyContent:'center',
            alignItems: 'center', marginTop:15,
            borderBottomWidth: 1, borderBottomColor : '#dedede'}}>
            <Text style={styles.gridTextBig}> Views </Text>
            <Text style={styles.gridTextBig}> 612,543 </Text>
            </View>
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  impressionIcons: {
    marginTop: 15,
    width: 220,
    height: 81,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft:10,
    paddingRight:10,
  },
  headerBg: {
    marginTop: -25

  },
  spent:{
        color: '#fb0201',
  },

  spent2: {

    color: '#d4af37',
   fontFamily: 'Poppins',
   fontSize: 7,
  },
  status2: {

    color: '#d4af37',
   fontFamily: 'Poppins',
   fontSize: 12,
  },
  status1: {

    color: '#3e3e3e',
    fontFamily: 'Poppins-Meduim',
    fontSize: 9
  },
gridTextSmall: {
    color: '#707070',
    fontFamily: 'Poppins-Medium',
    fontSize: 7,
    textAlign: 'center'
},

gridTextBig: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center'
},

  grid: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    justifyContent: 'space-between',

  },

  gridContent1: {
    //width: 120,
    height: 78,
    shadowColor: 'rgba(0, 0, 0, 0.23)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    elevation:5,
    paddingTop:15,
    paddingLeft: 30,
    paddingRight: 30
    //marginRight:8
  },
  gridContent2: {
    //width: 120,
    height: 78,
    shadowColor: 'rgba(0, 0, 0, 0.23)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    elevation:5,
    paddingTop:15,
    paddingLeft: 10,
    paddingRight: 10
    //marginRight:8
  },

  addFunds2: {

    width: 120,
   height: 24,
    shadowColor: '#000',
    //shadowOffset: { width: 6, height: 0 },
    shadowRadius: 19,
    borderRadius: 25,
    backgroundColor: '#fb0201',
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },

  addFundsBtn: {
    fontFamily: 'Poppins-Medium',
    //textAlign: 'center',
    color: '#ffffff',
    //marginTop: 75,
    marginLeft: 8,
    fontSize: 9,

  },
  headerBgCaptionText: {
    fontSize:14,
    fontFamily: 'Poppins-Meduim',
    color: '#000',
  },
  headerBgCaption:{
    justifyContent: 'center',
    alignItems: 'center',
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
