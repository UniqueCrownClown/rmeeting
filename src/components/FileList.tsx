import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import { element } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
  fileListContainer: {
    flex: 0,
  },
  fileListItem: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  fileListItemText: {
    fontSize: 20,
    width: 280,
    marginHorizontal: 20
  },
  outcircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginHorizontal: 30,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  incircle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#fff'
  },
  outcircleActive: {
    backgroundColor: '#ddd'
  },
  incircleActive: {
    backgroundColor: 'skyblue'
  },
});
export declare interface FileItem {
  name: string,
  isDictory: boolean,
  path: string,
  time: string,
  isSelect: boolean
}
declare interface FileListContainerProps {
  items: Array<FileItem>,
  handleSelect: (name: string) => void,
  handleTag: (isSelect: boolean, path: string) => void
}
declare interface FileListContainerState {
  rowIndex: number
}
export default class FileList extends Component<FileListContainerProps, FileListContainerState> {
  constructor(props: FileListContainerProps) {
    super(props);
    this.state = { rowIndex: null }
  }

  public render() {
    //看看怎么用flatList实现,能实现更好的性能
    const { items, handleSelect } = this.props;
    const haha = (item: FileItem, index: number) =>
      <TouchableOpacity
        key={item.name}
        style={styles.fileListItem}
        onPress={() => handleSelect(item.path)}>
        <Text style={styles.fileListItemText}>{item.name}</Text>
        {item.isDictory ? <Icon name="angle-right" size={20} color="#666" /> :
          this.renderRadio(item.isSelect, item.path)}
      </TouchableOpacity>;
    const _keyExtractor = (item: FileItem, index: number) => item.name;
    return (
      <View style={styles.fileListContainer}>
        <FlatList
          data={items}
          extraData={this.state.rowIndex}
          keyExtractor={_keyExtractor}
          renderItem={({ item, index }) => haha(item, index)}
        />
      </View>
    );
  }

  public renderRadio = (isSelect: boolean, path: string) =>
    <TouchableOpacity onPress={(event) => {
      event.bubbles = false;
      this.props.handleTag(isSelect, path)
    }}>
      <View style={isSelect ? [styles.outcircle, styles.outcircleActive] : styles.outcircle}>
        <View style={isSelect ? [styles.incircle, styles.incircleActive] : styles.incircle}></View>
      </View>
    </TouchableOpacity>
}

