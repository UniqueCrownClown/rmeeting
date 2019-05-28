import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Alert, View, Text } from "react-native";
import Swipeout from "react-native-swipeout";
import { FileItem } from "./FileList";
export declare interface BasicItem {
  name: string, path: string
}

export declare interface MeetItem extends BasicItem {
  timespace: string,
  location: string,
  time: string
}
declare interface HorizontalItemProps {
  items: Array<BasicItem>,
  disableSwiper?: boolean,
  handleSelect: (name: string) => void,
  swiperPress?: (name: string) => void,
  type?: (data: any) => any
  dropFresh?: () => void
}
declare interface HorizontalItemState {
  rowIndex: number
}
const styles = StyleSheet.create({
  fileListContainer: {
    flex: 0,
  },
  fileListItem: {
    width: 750,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    flex: 0,
    flexDirection: 'row',
  }
});
export default class HorizontalItem extends Component<HorizontalItemProps, HorizontalItemState>{
  constructor(props: HorizontalItemProps) {
    super(props);
    this.state = { rowIndex: null }
  }
  private swipeoutBtns = [{ text: '删除', onPress: () => Alert.alert('dadadad') }];
  public renderItem = (item: BasicItem, index: number) =>
    <Swipeout right={this.swipeoutBtns}
      onOpen={() => (this.onSwipeOpen(index))}
      close={this.state.rowIndex !== index}
      onClose={() => (this.onSwipeClose(index))}
      autoClose={true}
      disabled={this.props.disableSwiper}
      backgroundColor='#ffffff'>
      <TouchableOpacity
        key={item.name}
        onPress={() => this.props.handleSelect(item.path)}
        style={styles.fileListItem}>
        {this.props.type ? this.props.type(item) : this.renderBasic(item.name)}
      </TouchableOpacity>
    </Swipeout>;
  public renderBasic = (name: string) => <View>
    <Text>{name}</Text>
  </View>;

  public render() {
    const { items, dropFresh } = this.props;
    const _keyExtractor = (item: FileItem, index: number) => item.name;
    return (
      <FlatList
        data={items}
        extraData={this.state.rowIndex}
        keyExtractor={_keyExtractor}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        refreshing={false}
        onRefresh={dropFresh}
      />
    );
  }

  onSwipeOpen(rowIndex) {
    this.setState({
      rowIndex: rowIndex
    })
  }
  onSwipeClose(rowIndex) {
    if (rowIndex === this.state.rowIndex) {
      this.setState({ rowIndex: null });
    }
  }
}
