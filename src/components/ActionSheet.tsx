import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
declare interface ActionSheetProps {
  visibleModal: boolean,
  selectItem: string[],
  handleSelect: (text: string) => void
}
const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  modalItem: {
    width: 375,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
})
export default class ActionSheet extends Component<ActionSheetProps> {

  public render() {
    const { selectItem, handleSelect } = this.props;
    return <Modal
      isVisible={this.props.visibleModal}
      style={styles.bottomModal}>
      <View style={styles.modalContent}>
        {
          selectItem.map((item, index) =>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)} key={index}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </Modal>
  }
}