/* @flow */

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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { createIconSetFromFontello } from 'react-native-vector-icons';
const Customon = createIconSetFromFontello(fontelloConfig);
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import fontelloConfig from '../config.json';


export default class CalendarAndList extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerArrow}>
          <TouchableOpacity>
            <Customon
              style={styles.arrowback}
              name="long-arrow-left"
              size={15}
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.title}> Casting Calls</Text>
        </View>
      </View>
      <View style={styles.containerView}>
      <View style={styles.banner}>
      <View style={styles.calendarView} >
      <View style={{paddingTop: 8, paddingLeft: 10, paddingRight: 10, paddingBottom: 7, flexDirection:'row'}}>
      <View style={{flex:1}}>
      <Text style={{fontSize: 44, fontFamily:'Poppins-Meduim',color: '#fff',}}>20 </Text>
      <Text style={{fontSize: 15, fontFamily:'Poppins-Meduim',color: '#fff',}}>November </Text>
      <Text style={{fontSize: 13, fontFamily:'Poppins-Meduim',color: '#fff',}}>2019 </Text>
      </View>
      <View style={{paddingTop: 5, paddingRight: 6}}>
      <Customon
        style={styles.arrowback}
        name="calendar-star"
        size={21}
        color="white"

      />
      </View>
      </View>
      </View>
      <View style={styles.filter}>
      <Text style={{fontSize:15, fontFamily:'Poppins-Meduim',color: '#3e3e3e',}}>Filters </Text>
      </View>
      </View>
      <View style={styles.scroll}>
      <ScrollView>

      <Text>
      Here's something that's fun. If there's two big trees invariably sooner or later there's gonna be a little tree. Use absolutely no pressure. Just like an angel's wing.

Paint anything you want on the canvas. Create your own world. Trees grow however makes them happy. We start with a vision in our heart, and we put it on canvas. Everyone wants to enjoy the good parts - but you have to build the framework first. Just use the old one inch brush.

Painting should do one thing. It should put happiness in your heart. These things happen automatically. All you have to do is just let them happen. All kinds of happy little splashes. Nature is so fantastic, enjoy it. Let it make you happy. It's amazing what you can do with a little love in your heart.

Give him a friend, we forget the trees get lonely too. Now we don't want him to get lonely, so we'll give him a little friend. From all of us here, I want to wish you happy painting and God bless, my friends. Put light against light - you have nothing. Put dark against dark - you have nothing. It's the contrast of light and dark that each give the other one meaning. This is truly an almighty mountain. Just make little strokes like that.

This is your creation - and it's just as unique and special as you are. Let's give him a friend too. Everybody needs a friend. It's a good way of getting rid of all your anxieties and hostilities. The first step to doing anything is to believe you can do it. See it finished in your mind before you ever start. You have to make those little noises or it won't work.

Anyone can paint. We touch the canvas, the canvas takes what it wants. Now we can begin working on lots of happy little things. Just think about these things in your mind - then bring them into your world. The more we do this - the more it will do good things to our heart.

Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned. I'm gonna start with a little Alizarin crimson and a touch of Prussian blue Now let's put some happy little clouds in here.


      </Text>
      </ScrollView>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex:2,
    padding:10,
  },
  containerView: {
      padding: 10,
      flex: 1,
      backgroundColor: '#f5f5f5',

  },
  filter: {
    width: Dimensions.get('window').width,
    height: 46,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    backgroundColor: '#ffffff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    //flex: 1,


        justifyContent: 'center',
        alignItems: 'center',
  },
  calendarView: {
    width: 141,
    height: 118,
    borderRadius: 30,
    backgroundColor: '#fb0201',
  marginBottom: 10,
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

    arrowRight: {
      color: '#fb0201',
      marginLeft: 10,
    },

    headerArrow: {
      flex: 1,

    },

    headerTitle: {
      flex: 2,
      //marginLeft: 35,
      //alignItems: 'center',
    justifyContent: 'center',

    },

});
