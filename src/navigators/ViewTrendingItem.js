import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import GalleryTags from '../screens/GalleryTags';
import EventTags from '../screens/EventTags';
import ScriptsTag from '../screens/ScriptsTag';
import StatusTags from '../screens/StatusTags';

const ViewTrendingItem = createMaterialTopTabNavigator(
  {
    GalleryScreen: {
      screen: GalleryTags,
      navigationOptions: {
        header: null,
        title: 'Images/Videos',
      }
    },
    ScriptsScreen: {
      screen: ScriptsTag,
      navigationOptions: {
        header: null,
        title: 'Scripts'
      }
    },
    Events: {
      screen: EventTags,
      navigationOptions: {
        header: null
      }
    },
    StatusTags: {
      screen: StatusTags,
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
    initialRouteName: 'GalleryScreen'
  }
);

const TrendingItems = createAppContainer(ViewTrendingItem);

export default TrendingItems;
