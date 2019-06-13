import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from 'react-navigation';
import { FileItem } from '../../components/FileList';
import HorizontalItem from '../../components/HorizontalItem';
import XButton from '../../components/XButton';
import { themeColor } from '../../config';
import { getUpdate } from '../../utils/timeSpace';
const styles = StyleSheet.create({
  fileSelectContainer: {
    flex: 1,
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
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 10
  },
  breadCumbContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  breadCumbText: {
    fontSize: 18,
    color: '#333'
  },
  fileListItem: {
    height: 50,
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
    backgroundColor: themeColor
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
    backgroundColor: themeColor
  },
})
declare interface FileSelectProps {
  navigation: NavigationScreenProp<any>
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
    const rendText = `确定(${navigation.getParam('count')})`;
    return {
      headerTitle: '文件选择',
      headerBackTitle: '云打印',
      headerRight: (<XButton
        onClick={navigation.getParam('complateSelect', () => { Alert.alert('ddaad') })}
        text={rendText}
      />)
    }
  };
  private uploadFilesPath: string[] = [];
  public render() {
    return <View style={styles.fileSelectContainer}>
      <View style={{ flex: 0, alignItems: 'center', padding: 10 }}>
        <TextInput placeholder='搜索'
          style={{
            textAlign: 'center',
            width: 320, height: 40,
            borderRadius: 40,
            backgroundColor: '#f5f5f5'
          }} />
      </View>
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
      <Text style={styles.breadCumbText}> >></Text>
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
        this.judgeIsUse(item.name) ? this.renderRadio(item.isSelect) : null}
    </View>;

  public renderRadio = (isSelect: boolean) =>
    <View style={isSelect ? [styles.outcircle, styles.outcircleActive] : styles.outcircle}>
      <View style={isSelect ? [styles.incircle, styles.incircleActive] : styles.incircle}></View>
    </View>


  componentDidMount() {
    const rnfsPath = RNFS.ExternalStorageDirectoryPath;
    this.queryDirectory(rnfsPath);
    this.props.navigation.setParams({ count: 0, complateSelect: this._complateSelect.bind(this) });
  }
  _complateSelect() {
    this.props.navigation.replace('PrintFile', { uploadFilesPath: this.uploadFilesPath })
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
      const updateData = getUpdate(haha, filterIndex, { isSelect: !isSelect })
      this.setState({ haha: updateData });
      this._navigateCount(this.uploadFilesPath.length);
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
        result.forEach(element => {
          const tempSelect: boolean = this.uploadFilesPath.includes(element.path) ? true : false;
          if (!element.name.startsWith('.')) {
            temp.push({
              name: element.name,
              time: element.mtime.toLocaleDateString(),
              path: element.path,
              isDictory: element.isDirectory(),
              isSelect: tempSelect
            })
          }
        });
        this.setState({ haha: this.filterByLetter(temp) });
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
  filterByLetter = (entrys: Array<any>) => {
    let temp: string[] = [];
    let result: Array<any> = [];
    entrys.forEach(element => {
      if (!element.name.startsWith('.')) {
        temp.push(element.name.toLocaleUpperCase());
      }
    });
    const sortTemp = temp.sort();
    sortTemp.forEach(element => {
      const ff: any = entrys.find(
        entry => entry.name.toLocaleUpperCase() === element
      );
      result.push(ff);
    });
    const dirResult = result.filter(element => element.isDirectory);
    const fileResult = result.filter(element => !element.isDirectory);
    const returnResult = [...dirResult, ...fileResult];
    return returnResult;
  };
  judgeIsUse = (fileName: string) => {
    const suffix = ['word',
      'ppt',
      'photo',
      'pdf',
      'txt',
      'xlsx'];
    for (let i = 0; i < suffix.length; i++) {
      if (fileName.endsWith(suffix[i])) {
        return true
      }
    }
    return false
  }
}