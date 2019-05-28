import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert, TextInput, TouchableOpacity, Easing
} from 'react-native';
import RNFS from 'react-native-fs';
import { FileItem } from '../../components/FileList';
import { element } from 'prop-types';
import { getUpdate } from '../../utils/timeSpace';
import HorizontalItem from '../../components/HorizontalItem';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
  fileSelectContainer: {
    flex: 1
  },
  countView: {
    marginHorizontal: 20,
    flex: 0,
    flexDirection: 'row'
  },
  countViewText: {
    color: '#fff',
    fontSize: 18
  },
  breadCumbWrap: {
    flex: 0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  breadCumbContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  breadCumbText: {
    fontSize: 18
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
  fileListItemLeft: {
    width: 280,
    overflow: 'hidden',
    marginHorizontal: 20,
    flex: 0,
    flexWrap: 'nowrap'
  },
  fileListItemText: {
    fontSize: 18,
  },
  outcircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
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
})
declare interface FileSelectProps {
  navigation: any
}
declare interface FileSelectState {
  haha: Array<FileItem>,
  breadList: string[]
}
export default class FileSelect extends Component<FileSelectProps, FileSelectState> {
  constructor(props: FileSelectProps) {
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
        <View style={styles.countView}>
          <Text style={styles.countViewText}>确定</Text>
          <Text style={styles.countViewText}>({navigation.getParam('count')})</Text>
        </View>
      ),
    }
  };
  private uploadFilesPath: string[] = [];
  public render() {
    return <View style={styles.fileSelectContainer}>
      <TextInput placeholder='搜索' style={{ textAlign: 'center' }} />
      <View style={styles.breadCumbWrap}>{this.renderBreadCumb(this.state.breadList)}</View>
      <View style={{ flex: 1 }}>
        <HorizontalItem items={this.state.haha}
          disableSwiper={true}
          handleSelect={this.handleSelect.bind(this)}
          type={this.renderFileItem}
        />
      </View>
    </View>
  }

  public renderBreadCumb = (items: string[]) => {
    return items.map((item) => <View key={item} style={styles.breadCumbContainer}>
      {this.renderButton(item)}
      <Text style={styles.breadCumbText}>>></Text>
    </View>)
  }

  public renderButton = (item: string) => {
    return <TouchableOpacity onPress={() => this.handleBread(item)}>
      <Text style={styles.breadCumbText}>{item}</Text>
    </TouchableOpacity>
  }

  public renderFileItem = (item: FileItem) =>
    <View style={styles.fileListItem}>
      <View style={styles.fileListItemLeft}>
        <Text style={styles.fileListItemText}>{item.name}</Text>
      </View>
      {item.isDictory ? <Icon name="angle-right" size={18} color="#666" style={{ marginHorizontal: 6 }} /> :
        this.renderRadio(item.isSelect)}
    </View>;

  public renderRadio = (isSelect: boolean) =>
    <View style={isSelect ? [styles.outcircle, styles.outcircleActive] : styles.outcircle}>
      <View style={isSelect ? [styles.incircle, styles.incircleActive] : styles.incircle}></View>
    </View>


  componentDidMount() {
    const rnfsPath = RNFS.ExternalStorageDirectoryPath;
    this.queryDirectory(rnfsPath);
    this.props.navigation.setParams({ count: 0 });
  }

  handleSelect(path: string): void {
    //判断是目录还是文件？？？
    const { haha } = this.state;
    const filterIndex = haha.findIndex(element => element.path === path);
    if (filterIndex === -1 || haha[filterIndex].isDictory) {
      const temp = this.parsePath(path);
      const newList = temp === null ? ['内部存储'] : ['内部存储', ...temp];
      this.setState({ breadList: newList });
      this.queryDirectory(path);
    } else {
      const isSelect = haha[filterIndex].isSelect;
      if (!isSelect) {
        this.uploadFilesPath.push(path);
      } else {
        const index = this.uploadFilesPath.findIndex(element => element === path);
        this.uploadFilesPath.splice(index, 1);
      }
      const updataData = getUpdate(haha, filterIndex, { isSelect: !isSelect })
      this.setState({ haha: updataData });
      const cc = updataData.filter(element => element.isSelect === true).length
      this._navigateCount(cc);
    }

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

  public _navigateCount(index: number) {
    this.props.navigation.setParams({ count: index });
  }
}