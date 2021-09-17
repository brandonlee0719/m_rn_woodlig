import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import SearchPeopleScreen from '../screens/SearchPeopleScreen';
import SearchHashtagsScreen from '../screens/SearchHashtagsScreen';
import SearchPlacesScreen from '../screens/SearchPlacesScreen';

const SearchTabBar = createMaterialTopTabNavigator(
  {
    People: {
      screen: SearchPeopleScreen,
      navigationOptions: {
        header: null
      }
    },
    Hashtags: {
      screen: SearchHashtagsScreen,
      navigationOptions: {
        header: null
      }
    },
    Places: {
      screen: SearchPlacesScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'red',
        height: 5,
        alignSelf: 'center'
      },
      style: {
        backgroundColor: 'transparent'
      },
      upperCaseLabel: false,
      labelStyle: { color: 'black' }
    },
    initialRouteName: 'Hashtags'
  }
);

const SearchBar = createAppContainer(SearchTabBar);

export default SearchBar;
