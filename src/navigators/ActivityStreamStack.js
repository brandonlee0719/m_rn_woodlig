import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActivityStreamScreen from '../screens/ActivityStreamScreen';
import NewPostScreen from '../screens/NewPostScreen';
import OnYourMindScreen from '../screens/OnYourMindScreen';
import AddLocationRoute from '../screens/AddLocationScreen';
import TagPeopleScreen from '../screens/TagPeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ExploreHashtags from '../screens/ExploreHashtags';
import ExploreEventsScreen from '../screens/ExploreEventsScreen';
import RatingsScreen from '../screens/RatingsScreen';
import FinalPostDetails from '../screens/FinalPostDetails';
import PostCommentsScreen from '../screens/PostCommentsScreen';
import MessagingScreen from '../screens/MessagingScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import MessagingStack from './MessagingStack';
import GroupMessagingScreen from '../screens/GroupMessagingScreen';
import ViewPeopleToMessage from '../screens/ViewPeopleToMessage';
import Settings from '../screens/Settings';
import SettingsProfile from '../screens/SettingsProfile';
import SettingsPrivacy from '../screens/SettingsPrivacy';
import SettingsNotifications from '../screens/SettingsNotifications';
import SettingsAccount from '../screens/SettingsAccount';
import SettingsSharing from '../screens/SettingsSharing';
import SettingsHelp from '../screens/SettingsHelp';
import Wallet from '../screens/Wallet';
import Notifications from '../screens/Notifications';
import AddFunds from '../screens/AddFunds';
import PremiumMembership from '../screens/PremiumMembership';
import SettingsExperience from '../screens/SettingsExperience';
import EditExperience from '../screens/EditExperience';
import SelectSkillType from '../screens/SelectSkillType';
import CreateCircleScreen from '../screens/CreateCircleScreen';
import ChooseCategory from '../screens/ChooseCategory';

const ActivityStreamStack = createStackNavigator(
  {
    ActivityStream: {
      screen: ActivityStreamScreen
    },
    OnYourMindScreen: { screen: OnYourMindScreen },
    NewPostScreen: {
      screen: NewPostScreen
    },
    AddLocationRoute: {
      screen: AddLocationRoute,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Add Location'
      })
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsProfile: {
      screen: SettingsProfile,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsAccount: {
      screen: SettingsAccount,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsExperience: {
      screen: SettingsExperience,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    EditExperience: {
      screen: EditExperience,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SelectSkillType: {
      screen: SelectSkillType,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsPrivacy: {
      screen: SettingsPrivacy,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsNotifications: {
      screen: SettingsNotifications,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsSharing: {
      screen: SettingsSharing,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SettingsHelp: {
      screen: SettingsHelp,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    PremiumMembership: {
      screen: PremiumMembership,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    AddFunds: {
      screen: AddFunds,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    RatingsScreen: {
      screen: RatingsScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ExploreScreen: {
      screen: ExploreScreen,
      navigationOptions: {
        header: null
      }
    },
    ExploreHashtags: {
      screen: ExploreHashtags
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    MessagingStack: {
      screen: MessagingStack,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Appbar.Header statusBarHeight={12}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Messages" />
            <Appbar.Action icon="search" onPress={this._onSearch} />
          </Appbar.Header>
        )
      })
    },
    MessagingScreen: {
      screen: MessagingScreen
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ViewPeopleToMessage: {
      screen: ViewPeopleToMessage
    },
    GroupMessage: {
      screen: GroupMessagingScreen
    },
    CreateACircle: {
      screen: CreateCircleScreen,
      navigationOptions: {
        header: null
      }
    },
    AddCircleMembers: {
      screen: ChooseCategory,
      navigationOptions: {
        header: null
      }
    },
    ExploreEvents: {
      screen: ExploreEventsScreen
    },
    PostDetails: {
      screen: FinalPostDetails,
      navigationOptions: {
        header: null
      }
    },
    PostComments: {
      screen: PostCommentsScreen,
      navigationOptions: {
        header: null
      }
    },
    TagPeopleScreen: {
      screen: TagPeopleScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'ActivityStream'
  }
);

// const ActivityStreamStack = createAppContainer(BottomTab);

ActivityStreamStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default ActivityStreamStack;
