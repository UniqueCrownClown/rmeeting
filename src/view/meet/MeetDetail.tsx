import React, { Component } from "react";
import QRCode from 'react-native-qrcode-svg';
export default class MeetDetail extends Component {
  //Simple usage, defaults for all but the value
  render() {
    return (
      <QRCode
        value="dadadadad"
      />
    );
  };
}