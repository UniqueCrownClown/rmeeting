import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert, TextInput, TouchableOpacity
} from 'react-native';
import RNFS from 'react-native-fs';
import FileList, { FileItem } from '../../components/FileList';
import { element } from 'prop-types';
import XButton from '../../components/XButton';
import { compose } from 'redux';
import { getUpdate } from '../../utils/timeSpace';
const styles = StyleSheet.create({
  breadCumbWrap: {
    flex: 0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20
  },
  breadCumbText: {
    fontSize: 20
  }
})
declare interface PrintFileProps {

}
declare interface PrintFileState {
  haha: Array<FileItem>,
  breadList: string[]
}
export default class PrintFile extends Component<PrintFileProps, PrintFileState> {
  constructor(props: PrintFileProps) {
    super(props);
    this.state = {
      haha: [],
      breadList: ['内部存储']
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '文件选择',
      headerBackTitle: '云打印',
      headerRight: (
        <Button
          onPress={() => Alert.alert('莎莎')}
          title='完成'
        />
      ),
    }
  };
  private uploadFilesPath: string[] = [];
  public render() {
    return <View>
      <TextInput placeholder='搜索' textAlignVertical='center' />
      {this.renderBreadCumb(this.state.breadList)}
      <FileList
        items={this.state.haha}
        handleSelect={this.handleSelect.bind(this)}
        handleTag={this.handleTag.bind(this)}
      />
    </View>
  }

  public renderBreadCumb = (items: string[]) => {
    return items.map((item) => <View key={item} style={styles.breadCumbWrap}>
      {this.renderButton(item)}
      <Text style={styles.breadCumbText}>>></Text>
    </View>)
  }

  public renderButton = (item: string) => {
    return <TouchableOpacity onPress={() => this.handleBread(item)}>
      <Text style={styles.breadCumbText}>{item}</Text>
    </TouchableOpacity>
  }
  componentDidMount() {
    this.testRead()
  }
  handleSelect(path: string): void {
    const temp = this.parsePath(path);
    const newList = temp === null ? ['内部存储'] : ['内部存储', ...temp];
    this.setState({ breadList: newList });
    this.queryDirectory(path);
  }

  handleTag(isSelect: boolean, path: string): void {
    //上传文件的状态怎么存储？？
    if (isSelect) {
      this.uploadFilesPath.push(path)
    } else {
      const index = this.uploadFilesPath.findIndex(element => element === path);
      this.uploadFilesPath.splice(index, 1)
    }
    const mIndex = this.state.haha.findIndex(element => element.path === path);
    const sss = getUpdate(this.state.haha, mIndex, { isSelect: !isSelect });
    this.setState({ haha: sss });
  }

  public testRead() {
    const rnfsPath = RNFS.ExternalStorageDirectoryPath;
    this.queryDirectory(rnfsPath);
  }
  public queryDirectory(path: string) {
    RNFS.readDir(path)
      .then((result) => {
        let temp: Array<FileItem> = [];
        let tempSelect: boolean = false;
        result.forEach(element => {
          if (this.uploadFilesPath.includes(element.path)) {
            tempSelect = true;
          }
          temp.push({
            name: element.name,
            time: element.mtime.toLocaleDateString(),
            path: element.path,
            isDictory: element.isDirectory(),
            isSelect: tempSelect
          })
        });
        temp.sort((a, b) => (Number(a.name) - Number(b.name)))
        this.setState({ haha: temp });
      }).catch((err) => {
        console.log(err.message, err.code);
      });
  }

  public parsePath(path: string) {
    const rnfsPath = RNFS.ExternalStorageDirectoryPath;
    if (path === rnfsPath) {
      return null;
    }
    const handlePath = path.substring(rnfsPath.length + 1);
    const items = handlePath.split('/');
    return items;
  }

  public handleBread(item: string): void {
    const rnfsPath = RNFS.ExternalStorageDirectoryPath;
    const selectIndex = this.state.breadList.findIndex(element => element === item);
    if (selectIndex === 0) {
      this.handleSelect(rnfsPath);
      return;
    }
    const haha = this.state.breadList.filter((element, index) => index > 0 && index <= selectIndex);
    const xxx = `${rnfsPath}/${haha.join('/')}`;
    this.handleSelect(xxx);
  }
}