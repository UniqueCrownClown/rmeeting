import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export declare interface TabTitleItem {
  text?: string;
  activeIndex: number;
  onClick?: () => void;
}
declare interface TabTitleProps {
  itemData?: Array<TabTitleItem>,
}
declare interface TabTitleState {
  activeIndex: number
}
export default class TabTitle extends Component<TabTitleProps, TabTitleState> {
  constructor(props: TabTitleProps) {
    super(props);
    // this.state ={
    //   activeIndex:0
    // }
  }
  static propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const { itemData } = this.props;
    let xlist = null;
    if (itemData) {
      xlist = itemData.map((tabItem, index) =>
        (<TouchableOpacity key={index}
          onPress={tabItem.onClick} style={tabItem.activeIndex === index ? styles.ItemBlockActive : styles.ItemBlock}>
          <Text style={styles.ItemBlockText}>{tabItem.text}
          </Text>
        </TouchableOpacity>))
    }
    return (
      <View style={styles.ButtonWraper}>
        {xlist}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ButtonWraper: {
    margin: 5,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  ItemBlock: {
  },
  ItemBlockActive: {
    borderBottomWidth: 2,
    borderColor: '#fff'
  },
  ItemBlockText: {
    color: '#fff'
  }

})
