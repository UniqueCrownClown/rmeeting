import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { themeColor } from '../config';
declare interface DetailProps {
  chilren?: any
}
declare interface DetailState {

}
const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
})

export default class Detail extends Component<DetailProps, DetailState>{
  constructor(props: DetailProps) {
    super(props);
  }
  /**
   * render
   */
  public render() {
    return <View style={styles.detailContainer}>
      {this.props.children}
    </View>
  }
}