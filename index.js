/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './src/redux/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'red'
  }
};

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
