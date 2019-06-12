import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { AppContainer } from '../router'
import NavigationService from '../router/NavigationService';
import { View } from 'react-native';
import MyLoading from '../components/MyLoading';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Provider store={store}>
          <AppContainer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
        </Provider>
        {<MyLoading
          ref={(ref) => {
            global.mLoadingComponentRef = ref;
          }}
        />}
      </View>
    );
  }
}
