import React, { Component } from "react";
import { Animated, Button, View, Text } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { NavigationScreenProp } from "react-navigation";
import Detail from "../../components/Detail";
export declare interface PDetailItem {
  id: string,
  name: string,
  qrtoken: string,
  count: number,
  tips: string
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
      fadeAnim: new Animated.Value(10),
      listData: {
        id: '1',
        name: 'screen',
        qrtoken: '12580',
        count: 5,
        tips: 'dadadadadadad'
      }
    }
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    Animated.timing(                  // 随时间变化而执行动画
      this.state.fadeAnim,            // 动画中的变量值
      {
        toValue: 1200,                   // 透明度最终变为1，即完全不透明
        duration: 2000,              // 让动画持续一段时间
      }
    ).start();                        // 开始执行动画
  }
  componentWillUnmount() {
    //Alert.alert('路由离开执行吗');
  }
  render() {
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
          {this.renderContent()}
        </Detail>
        <Button title='返回' onPress={() => this.historyBack()} />
      </Animated.View>
    );
  }
  public renderContent() {
    return <View>
      <QRCode
        value="dadadadad"
      />
    </View>
  }
  public historyBack() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 2000,
      }
    ).start(() => {
      this.props.navigation.goBack();
    });

  }
}