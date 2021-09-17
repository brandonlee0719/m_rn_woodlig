import React, { Component } from 'react';
import { View, YellowBox } from 'react-native';
import firebase from 'react-native-firebase';
import AppContainer from './src/navigators/MainNavigation';
import { ActivityStreamScreen } from './src/screens/ActivityStreamScreen';
import SettingsProfile from './src/screens/SettingsProfile';
import SettingsExperience from './src/screens/SettingsExperience';
import EditExperience from './src/screens/EditExperience';
import PromotionBoostPost from './src/screens/PromotionBoostPost';
import Wallet from './src/screens/Wallet';
import ViewApplicants from './src/screens/ViewApplicants';
import CalendarView from './src/screens/CalendarView';
import AddFunds from './src/screens/AddFunds';
import EmptyActivityStream from './src/screens/EmptyActivityStream';
import PostDetails from './src/screens/PostDetails';
import FinalPostDetails from './src/screens/FinalPostDetails';
import PostCommentsScreen from './src/screens/PostCommentsScreen';
import PostLikesScreen from './src/screens/PostLikesScreen';
import NewProfile from './src/screens/NewProfile';
import FindTalentsScreen from './src/screens/FindTalentsScreen';
import FeauturedTalentsScreen from './src/screens/FeauturedTalentsScreen';
import FilterTalentsScreen from './src/screens/FilterTalentsScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import MarketPlaceScreen from './src/screens/MarketPlaceScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CreateCircleScreen from './src/screens/CreateCircleScreen';
import SelectSkillType from './src/screens/SelectSkillType';
import ChooseCategory from './src/screens/ChooseCategory';
import Demo from './src/screens/Demo';
import TrendingScreen from './src/screens/TrendingScreen';
import StarredTalents from './src/screens/StarredTalents';
import SearchEverythingScreen from './src/screens/SearchEverythingScreen';
import SearchBar from './src/navigators/SearchTabBar';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import FilterCastingCalls from './src/screens/FilterCastingCalls';
import ViewPeopleToMessage from './src/screens/ViewPeopleToMessage';
import AddCastingCalls from './src/screens/AddCastingCalls';
import CirclesAdmin from './src/screens/CirclesAdmin';
import TestChat from './src/screens/TestChat';
import CalendarAndList from './src/screens/CalendarAndList';
import FilterMarketPlace from './src/screens/FilterMarketPlace';
import FindTalentRequest from './src/screens/FindTalentRequest';
import MarketplaceFavourited from './src/screens/MarketplaceFavourited';
import SetupWelcomeScreen from './src/screens/SetupWelcomeScreen';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
