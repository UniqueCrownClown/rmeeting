import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { themeColor } from '../config';
declare interface SwitchListProps {
  test: string
}
declare interface SwitchListState {
  listData: Array<any>
}
const styles = StyleSheet.create({
  SwitchListContainer: {
    flex: 0,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default class SwitchList extends Component<SwitchListProps, SwitchListState>{
  constructor(props: SwitchListProps) {
    super(props);
    this.setState({
      listData: [{ name: '会议室顶灯', type: 'switch' }, { name: '会议室TV', type: 'button' }]
    })
  }
  /**
   * render
   */
  public render() {
    const { listData } = this.state;
    return listData.map((item) => <View style={styles.SwitchListContainer}>
      {item.type === 'switch' ? this.renderSwitch() : this.renderButton()}
    </View>)
  }
  public renderSwitch() {
    return <View />
  }
  public renderButton() {
    return <View />
  }
}