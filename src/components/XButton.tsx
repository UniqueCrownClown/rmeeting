import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Myicon from 'react-native-vector-icons/iconfont';
declare interface XButtonProps {
  text?: string;
  iconName?: string;
  onClick: () => void
}
export default class XButton extends Component<XButtonProps> {
  constructor(props: XButtonProps) {
    super(props);
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }

  render() {
    const { text, iconName, onClick } = this.props;
    return (
      <TouchableOpacity onPress={onClick} style={styles.ButtonWraper}>
        {/* <Myicon name={iconName} size={20} color='#fff' /> */}
        <Text style={styles.ButtonText}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  ButtonWraper: {
    height: 40,
    // borderWidth: 1,
    // borderColor: 'lightgray',
    margin: 5,
    padding:10,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  ButtonText: {
    color: '#fff',
    fontSize:16
  }
})
