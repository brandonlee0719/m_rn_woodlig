/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import fontelloConfig from '../config.json';
import { Switch } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Customon = createIconSetFromFontello(fontelloConfig);
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Avatar } from 'react-native-paper';
import StarRating from 'react-native-star-rating';

export default class StarredTalents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />
      <View style={styles.header}>
        <View style={styles.headerArrow}>
          <TouchableOpacity>
            <Customon style={styles.arrowback} name="long-arrow-left" size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Starred Talents</Text>
        </View>
        <View style={{flex:1}}>
        </View>
      </View>
<ScrollView>
      <View style={styles.content}>
      <View style={{flexDirection: 'row',padding: 20, }} >
      <View style={styles.talentContainer}>
      <View style={{width: 82}}>
      <View style={{alignItems: 'center'}}>
      <Image
        source={require('../images/ic_account_circle_new.png')}
        style={{ width: 58, height: 58,  }}

      />
      </View>
      <StarRating
       // ratingBackgroundColor='#808080'

       rating={this.state.starCount}
       selectedStar={(rating) => this.onStarRatingPress(rating)}
       disabled={false}
       maxStars={5}
       starSize={15}
       // containerStyle={{ marginHorizontal: 10 }}
       fullStarColor="#fb0201"
       emptyStarColor="#808080"
       //rating={parseInt(profiledetails.data.rating_count)}
       // starStyle={{ paddingTop: 8 }}
     />
      </View>
      <View style={{flexDirection: 'row'}}>
      <View style={{marginRight: 3}}>
      <Text style={styles.name}>Miracle Junaid</Text>
      <Text style={[styles.name, styles.name2]}>@mj.no_limits</Text>
      </View>
      <View style={{width: 20,height: 20, backgroundColor: '#fb0201',
      borderRadius:20,justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome5 color="#fff" name="crown" size={10} />
      </View>
      </View>
      </View>
      <View style={{justifyContent: 'center'}}>
      <TouchableOpacity>
      <View style={styles.btn}>
        <Text style={{color:'#fb0201', fontFamily: 'Poppins-Medium', fontSize: 9,}}>NOTE</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
      <View style={styles.line}>
      </View>
      </View>


      <View style={{flexDirection: 'row',padding: 20, }} >
      <View style={styles.talentContainer}>
      <View style={{width: 82}}>
      <View style={{alignItems: 'center'}}>
      <Image
        source={require('../images/ic_account_circle_new.png')}
        style={{ width: 58, height: 58,  }}

      />
      </View>
      <StarRating
       // ratingBackgroundColor='#808080'

       rating={this.state.starCount}
       selectedStar={(rating) => this.onStarRatingPress(rating)}
       disabled={false}
       maxStars={5}
       starSize={15}
       // containerStyle={{ marginHorizontal: 10 }}
       fullStarColor="#fb0201"
       emptyStarColor="#808080"
       //rating={parseInt(profiledetails.data.rating_count)}
       // starStyle={{ paddingTop: 8 }}
     />
      </View>

      <View style={{marginRight: 3}}>
      <Text style={styles.name}>Miracle Junaid</Text>
      <Text style={[styles.name, styles.name2]}>@mj.no_limits</Text>
      </View>


      </View>
      <View style={{justifyContent: 'center'}}>
      <TouchableOpacity>
      <View style={styles.btn}>
        <Text style={{color:'#fb0201', fontFamily: 'Poppins-Medium', fontSize: 9,}}>NOTE</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
      <View style={styles.line}>
      </View>




      </View>


      </View>
</ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  btn:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 24,
    borderRadius: 52,
    borderColor: '#fb0201',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  name2: {
        marginTop: -10,
        opacity: 0.45,
  },
  name: {
        color: '#1c1c1c',
        fontFamily: 'Poppins-Medium',
        fontSize: 15
  },
  talentContainer: {
    flex:1,
    flexDirection: 'row',

    //padding: 10,
    //backgroundColor: '#ffffff',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  line:{
    borderBottomWidth: 1 ,
    borderBottomColor: '#eeee',
    width: 378,
  },
  content:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 30,
    marginTop: 30,
   //height: 568,

   shadowColor: 'rgba(0, 0, 0, 1)',
   shadowOffset: { width: -1, height: 0 },
   shadowRadius: 6,
   borderTopLeftRadius: 25,
   borderTopRightRadius: 25,
   borderBottomLeftRadius: 0,
   borderBottomRightRadius: 0,
   backgroundColor: '#ffffff',
   elevation: 5
  },

  header: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#ffff',
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    padding: 15,

    shadowOffset: { width: 3, height: 0 },
    elevation: 5
  },
  headerTitle: {

    //marginLeft: 35,
    //alignItems: 'center',
    justifyContent: 'center',

  },

  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,

  },

  arrowback: {
    color: '#000'
  },

  headerArrow: {
    flex: 1
  },

});
