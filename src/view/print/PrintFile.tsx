import React, { Component } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import RNFS from 'react-native-fs';
import { NavigationScreenProp } from 'react-navigation';
import { getPrintFile, uploadPrintFile } from '../../api';
import HorizontalItem, { BasicItem } from '../../components/HorizontalItem';
import XButton from '../../components/XButton';
import { PrintItem } from './PrintMain';


const styles = StyleSheet.create({
  printFileItem: {
    flex: 0,
    width: 750,
    height: 60,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  maskItem: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: "absolute",
    width: 750,
    height: 60,
    top: 0,
    left: 0,
    zIndex: 1
  }
})
declare interface PrintFileProps {
  navigation: NavigationScreenProp<any>
}
declare interface PrintFileState {
  data: Array<PrintFileItem>,
}
export declare interface PrintFileItem extends BasicItem {
  size: number,
  uploadTime?: string,
  waitingUpLoad?: boolean
}
export default class PrintFile extends Component<PrintFileProps, PrintFileState> {
  detailData: PrintItem | null;
  uploadFilesPath: string[];
  constructor(props: PrintFileProps) {
    super(props);
    this.state = {
      data: [
        { name: '111', path: 'dada', uploadTime: '2019-05-28', size: 12212 }],
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '场景名称',
      headerRight: (
        <XButton
          onClick={navigation.getParam('navigateTo')}
          iconName='hao'
          text='添加'
        />
      ),
    }
  };
  public render() {
    return <View style={[{ flex: 1 }]}>
      <HorizontalItem items={this.state.data}
        handleSelect={this.handleSelect.bind(this)}
        swiperPress={this.handleDelete.bind(this)}
        type={this.renderPrintFile}
        dropFresh={this.dropFresh.bind(this)} />
    </View>
  }
  public renderPrintFile = (item: PrintFileItem) => <View style={styles.printFileItem}>
    {item.waitingUpLoad ? <View style={styles.maskItem}></View> : null}
    <View style={{ paddingHorizontal: 20 }}>
      <Image style={{ width: 50, height: 50 }}
        source={require('./../../asserts/images/list-file.png')} />
    </View>
    <View style={{ flex: 1 }}>
      <Text>{item.name}</Text>
      <Text>{item.uploadTime} | {item.size}B</Text>
    </View>
  </View>
  public handleSelect(path: string) {
    return;
  }
  handleDelete(path: string) {
    Alert.alert(path);
  }
  public dropFresh() {
    this.props.navigation.navigate('PrintDetail', {
      printDetailData: this.detailData
    })
  }
  componentDidMount() {
    this.props.navigation.setParams({ navigateTo: this.navigateTo });
    //this.uploadFilesPath = this.props.navigation.getParam('uploadFilesPath', null);
    this.uploadFilesPath = ["/storage/emulated/0/Android/contacts_db_log.txt"];
    this.queryData();
  }
  async queryData() {
    const { navigation } = this.props;
    this.detailData = navigation.getParam('detailData', null);
    console.log(this.uploadFilesPath);
    if (this.detailData !== null) {
      const response = await getPrintFile(this.detailData.path);
      const { status, data } = response;
      if (status === 200 && data !== 'fail') {
        const newData = data.map(item => {
          return {
            path: item.id,
            name: item.fileName,
            size: item.size,
            uploadTime: item.uploadTime
          }
        })
        let waitData: Array<PrintFileItem> = [];
        if (this.uploadFilesPath !== null) {
          const tempData = this.uploadFilesPath.map(async item => {
            const itemName = this.getFileName(item);
            const result = await RNFS.stat(item);
            return {
              path: itemName,
              name: itemName,
              size: parseInt(result.size),
              uploadTime: new Date(result.mtime).toLocaleString(),
              waitingUpLoad: true
            }
          })
          waitData = await Promise.all(tempData)
        }
        this.setState({
          data: [...newData, ...waitData]
        });
        //执行上传
        this.handleFileUpload(this.uploadFilesPath);
      }
    }
  }
  navigateTo = () => {
    this.props.navigation.navigate('FileSelect')
  }
  handleFileUpload(filesPath: Array<string>) {
    const uploadUrl = uploadPrintFile.url;
    const files = filesPath.map(item => {
      return {
        name: this.getFileName(item),
        filename: this.getFileName(item),
        filepath: 'file://' + item,
        filetype: 'text/plain;charset=UTF-8'
      }
    });
    console.log(RNFS.ExternalStorageDirectoryPath);
    const uploadBegin = (response) => {
      const jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    const uploadProgress = (response) => {
      const percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };
    // upload files
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: { charset: 'UTF-8' },
      fields: {
        staffNum: 'A4407',
        sceneId: this.detailData.path
      },
      begin: uploadBegin,
      progress: uploadProgress
    }).promise.then((response) => {
      //同步的，上传成功的逻辑
      if (response.statusCode == 200) {
        console.log('FILES UPLOADED!');
        //清空上传队列
        this.uploadFilesPath.splice(0, this.uploadFilesPath.length);
        this.queryData();
      } else {
        console.log('SERVER ERROR');
      }
    })
      .catch((err) => {
        if (err.description === "cancelled") {
          console.log('cancelled by user');
        }
        console.log(err);
      });
  }
  getFileName(filePath: string) {
    return filePath.substring(filePath.lastIndexOf('/') + 1);
  }
}