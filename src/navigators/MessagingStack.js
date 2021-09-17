import { createMaterialTopTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChatListScreen from '../screens/ChatListScreen';
import CirclesListScreen from '../screens/CirclesListScreen';

const MessagingStack = createMaterialTopTabNavigator(
  {
    Chats: {
      screen: ChatListScreen,
      navigationOptions: {
        header: null
      }
    },
    Circles: {
      screen: CirclesListScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'red',
        height: 5
      },
      style: { backgroundColor: 'transparent' },
      upperCaseLabel: false,
      labelStyle: { color: 'black' }
    }
  }
);

export default MessagingStack;
