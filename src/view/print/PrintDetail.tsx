import React, { Component } from "react";
import { Animated, Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from "react-navigation";
import Detail from "../../components/Detail";
import DotLine from "../../components/DotLine";
import { PrintItem } from "./PrintMain";
export declare interface PDetailItem {
  id: string,
  name: string,
  token: string,
  fileCount: number,
}
export declare interface PrintDetailProps {
  navigation: NavigationScreenProp<any>,
}
export declare interface PrintDetailState {
  fadeAnim: any,
  listData: PDetailItem
}
export default class PrintDetail extends Component<PrintDetailProps, PrintDetailState> {
  constructor(props: PrintDetailProps) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      listData: {
        id: '1',
        name: 'screenTest',
        token: '12580',
        fileCount: 5,
      }
    }
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    const { height } = Dimensions.get('window');
    Animated.timing(                  // 随时间变化而执行动画
      this.state.fadeAnim,            // 动画中的变量值
      {
        toValue: height,
        duration: 2000,              // 让动画持续一段时间
      }
    ).start();                        // 开始执行动画
  }
  componentWillUnmount() {
    //Alert.alert('路由离开执行吗');
  }
  render() {
    const detailData = this.props.navigation.getParam('printDetailData', this.state.listData);
    let { fadeAnim } = this.state;
    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={{
          flex: 1,
          height: fadeAnim,
          backgroundColor: '#cab'
        }}
      >
        <Detail>
          {this.renderContent(detailData)}
        </Detail>
        <TouchableOpacity onPress={() => { this.historyBack() }}>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <FontIcon name="angle-double-down" size={40} color='#fff' />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  public renderContent(detailData: PrintItem) {
    return <View style={{
      width: 320,
      backgroundColor: '#ffffff',
      borderRadius: 4,
      justifyContent: 'center',
      flex: 0,
      alignItems: 'center'
    }}>
      <View style={{ width: 320, alignItems: 'center', paddingVertical: 20 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Image style={{ width: 50, height: 50 }}
            source={require('./../../asserts/images/list-folder.png')} />
        </View>
        <Text style={{ fontWeight: '700', padding: 10 }}>{detailData.name}</Text>
        <Text>{detailData.fileCount}</Text>
      </View>
      <DotLine long={320} />
      <View style={{ padding: 40 }}>
        <QRCode
          size={160}
          value={detailData.token} />
      </View>
      <View style={{ width: 280, backgroundColor: '#f5f5f5', margin: 30 }}>
        <Text style={{ padding: 10 }}>请移步打印机旁出事二维码被扫描后，于打印机上设置并打印文件</Text>
      </View>
    </View>
  }
  public historyBack() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start(() => {
      this.props.navigation.goBack();
    });

  }
}