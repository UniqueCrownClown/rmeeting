import React, { Component } from 'react';
import { Alert, FlatList, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeout from "react-native-swipeout";
export declare interface BasicItem {
  name: string,
  path: string
}
export declare interface GroupBasicItem {
  title: string,
  data: Array<BasicItem>
}

declare interface HorizontalItemProps {
  items?: Array<BasicItem>,
  sessions?: Array<GroupBasicItem>,
  disableSwiper?: boolean,
  handleSelect: (name: string) => void,
  swiperPress?: (name: string) => void,
  type?: (data: any) => any,
  dropFresh?: () => void,
  isGroup?: boolean
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
        key={item.path}
        onPress={() => this.props.handleSelect(item.path)}
        style={styles.fileListItem}>
        {this.props.type ? this.props.type(item) : this.renderBasic(item.name)}
      </TouchableOpacity>
    </Swipeout>;
  public renderBasic = (name: string) => <View>
    <Text>{name}</Text>
  </View>;

  public render() {
    const { items, dropFresh, isGroup, sessions } = this.props;
    const _keyExtractor = (item: BasicItem) => item.name;
    if (!isGroup) {
      return (
        <FlatList
          data={items}
          extraData={this.state.rowIndex}
          keyExtractor={_keyExtractor}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          refreshing={false}
          onRefresh={dropFresh}
        />)
    }
    return (
      <SectionList
        extraData={this.state.rowIndex}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: "bold", fontSize: 18, padding: 10 }}>{title}</Text>
        )}
        sections={sessions}
        keyExtractor={_keyExtractor}
      />
    )
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
