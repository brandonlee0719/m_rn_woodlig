import { createMaterialTopTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const SetupTabBar = createMaterialTopTabNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Signup: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: { backgroundColor: 'red', height: 5 },
      style: { backgroundColor: 'transparent' },
      upperCaseLabel: false,
      labelStyle: { color: 'black' }
    }
  }
);

export default SetupTabBar;
