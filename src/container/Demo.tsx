import withHeader from "./Hoc";
import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { any } from "prop-types";
declare interface XProps {
}
class Demo extends Component<XProps> {
  constructor(props: XProps) {
    super(props)
  }
  render() {
    return <Text>fsfsfs</Text>
  }
}
export default withHeader('我是标题')(Demo)