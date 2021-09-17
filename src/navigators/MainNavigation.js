import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import TabNavigator from './TabNavigator';
import Presetup from './presetup';
import SetupScreen from '../screens/SetupScreen';
import SetupWelcomeScreen from '../screens/SetupWelcomeScreen';

const Navigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Presetup,
      SetupScreen,
      SetupWelcomeScreen,
      Navigator
    },
    {
      initialRouteName: 'Presetup'
    }
  )
);

export default AppContainer;
