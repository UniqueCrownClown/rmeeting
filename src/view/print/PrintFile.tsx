import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { getPrintFile } from '../../api';
import HorizontalItem, { BasicItem } from '../../components/HorizontalItem';
import XButton from '../../components/XButton';


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
  detailData: any;
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
    {item.waitingUpLoad ? <View style={{
      backgroundColor: 'rgba(0,0,0,.5)',
      position: "absolute",
      width: 750,
      height: 60,
      top: 0,
      left: 0,
      zIndex: 1
    }}></View> : null}
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
    this.queryData();
  }
  async queryData() {
    this.detailData = this.props.navigation.getParam('detailData', null);
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
      this.setState({
        data: newData
      })
    }
  }
  componentWillMount() {
  }
  navigateTo = () => {
    this.props.navigation.navigate('FileSelect')
  }
}