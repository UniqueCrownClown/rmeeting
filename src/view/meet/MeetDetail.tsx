import React, { Component } from "react";
import QRCode from 'react-native-qrcode-svg';
export default class MeetDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '会议详情'
    }
  };
  render() {
    return (
      <QRCode
        value="dadadadad"
      />
    );
  };
}