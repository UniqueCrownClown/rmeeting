import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { themeColor } from '../config';


declare interface DialogProps {
}
declare interface DialogState extends DialogData {
  visibleModal: boolean
}

export default class Dialog extends Component<DialogProps, DialogState> {
  toCancel(): void {
    this.state.cancel && this.state.cancel();
    this.setState({
      visibleModal: false
    });
  }
  toSuccess(): void {
    this.state.success && this.state.success();
    this.setState({
      visibleModal: false
    });
  }
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      title: '提示',
      content: '',
      visibleModal: false,
      success: () => { Alert.alert('haha') }
    };
  }

  static renderButton = (text: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: 160 }}>
        <Text style={{ textAlign: 'center', padding: 18, color: themeColor }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  public render() {
    const { visibleModal, title, content } = this.state;
    return <Modal
      isVisible={visibleModal}
      animationIn="slideInLeft"
      animationOut="slideOutRight">
      {this.renderModalContent(title, content)}
    </Modal>
  }

  renderModalContent = (title: string, content: string) => (
    <View style={styles.modalContent}>
      <View style={{ width: 320, padding: 20 }}>
        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18 }}>{title ? title : '提示'}</Text>
      </View>
      <View style={{ width: 320, padding: 10, height: 100 }}>
        {content ? <Text>{content}</Text> : null}
      </View>
      <View style={{
        width: 320, borderTopWidth: 1, borderTopColor: '#e5e5e5',
        flex: 0, flexDirection: 'row'
      }}>
        {Dialog.renderButton("确定", () => this.toSuccess())}
        <View style={{ width: 1, backgroundColor: '#e5e5e5' }} />
        {Dialog.renderButton("取消", () => this.toCancel())}
      </View>
    </View>
  );
  showDialog(aa: DialogData) {
    this.setState({
      visibleModal: true,
      ...aa
    })
  }
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