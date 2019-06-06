import React, { Component, PureComponent } from "react";
import { Text } from 'react-native';
import withHeader from "./Hoc";
declare interface XProps {
  haha: string,
  xixi: string,
  apple: string
}
class Demo extends PureComponent<XProps> {
  constructor(props: XProps) {
    super(props)
  }
  render() {
    const { apple } = this.props;
    return <Text>{apple}</Text>
  }
}
export default withHeader('我是标题')(Demo)