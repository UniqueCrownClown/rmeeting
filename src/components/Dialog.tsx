import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { themeColor } from '../config';


declare interface DialogProps {
  visibleModal: boolean,
  title?: string,
  isInput?: boolean,
  content?: string,
  success: (inputText?: string) => void,
  cancel: () => void
}
declare interface DialogState {
  textValue: string
}
export default class Dialog extends Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      textValue: ''
    };
  }

  renderButton = (text: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: 160 }}>
        <Text style={{ textAlign: 'center', padding: 16, color: themeColor }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  public render() {
    const { title, visibleModal, isInput, content } = this.props;
    return <Modal
      isVisible={visibleModal}
      animationIn="slideInLeft"
      animationOut="slideOutRight">
      {this.renderModalContent(title, isInput, content)}
    </Modal>
  }

  renderModalContent = (title: string, isInput: boolean, content: string) => (
    <View style={styles.modalContent}>
      <View style={{ width: 320, borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 20 }}>
        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18 }}>{title ? title : '提示'}</Text>
      </View>
      <View style={{ width: 320, padding: 20 }}>
        {isInput ? <TextInput placeholder="场景值" value={this.state.textValue} onChangeText={(text) => this.setState({ textValue: text })}></TextInput> : null}
        {content ? <Text>{content}</Text> : null}
      </View>
      <View style={{
        width: 320, borderTopWidth: 1, borderTopColor: '#ccc',
        flex: 0, flexDirection: 'row'
      }}>
        {this.renderButton("确定", () => this.props.success(this.state.textValue))}
        {this.renderButton("取消", () => this.props.cancel())}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    flex: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});