import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActivityStreamScreen from '../screens/ActivityStreamScreen';
import NewPostScreen from '../screens/NewPostScreen';
import OnYourMindScreen from '../screens/OnYourMindScreen';
import AddLocationRoute from '../screens/AddLocationScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import MarketPlaceScreen from '../screens/MarketPlaceScreen';
import fontelloConfig from '../config.json';
import FilterMarketPlace from '../screens/FilterMarketPlace';

const Customon = createIconSetFromFontello(fontelloConfig);

const { width } = Dimensions.get('window');

const MarketPlaceStack = createStackNavigator(
  {
    MarketPlace: {
      screen: MarketPlaceScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <View style={styles.header}>
            <View style={{ flex: 1 }} />

         <View style={styles.headerTitle}>
           <Customon name="woodlig-brand" color="#fb0201" />
         </View>
         <View style={styles.headerArrow}>
          <View
             style={{
               flex: 1.5,
               justifyContent: 'flex-end',
               flexDirection: 'row',
               alignItems: 'center'
             }}>
             <Customon style={{paddingRight: 20}} name="like-icon" size={15} color="#fb0201" />
             <TouchableOpacity>
               <Customon name="file-upload" size={15} color="#fb0201" />
             </TouchableOpacity>
            { /*<Customon name="search" size={15} color="#fb0201" />*/}
           </View>
         </View>
       </View>
        )
      })
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    FilterMarketPlace: {
      screen: FilterMarketPlace,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'MarketPlace'
  }
);

// const ActivityStreamStack = createAppContainer(BottomTab);

// MarketPlaceStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.routeName === 'FilterMarketPlace') {
//     return (tabBarVisible = false);
//   }

//   return {
//     tabBarVisible
//   };
// };

export default MarketPlaceStack;

const styles = StyleSheet.create({

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
    // marginLeft: 35,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  headerArrow: {
    flex: 1
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },


});
