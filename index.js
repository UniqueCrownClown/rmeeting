/** @format */
//统一入口，不划分index.android.js和index.ios.js
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/view/App';

AppRegistry.registerComponent(appName, () => App);