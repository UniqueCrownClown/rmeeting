/** @format */
//统一入口，不划分index.android.js和index.ios.js
import {AppRegistry} from 'react-native';
import App from './src/view/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
