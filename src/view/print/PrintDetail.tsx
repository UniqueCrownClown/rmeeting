import React, { Component } from "react";
import { Transitioner, NavigationProp, NavigationScreenProp } from "react-navigation";
import { View, Easing, Animated, Button, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg';
export declare interface PrintDetailProps {
  navigation: NavigationScreenProp<any>,
  style: any
}
export declare interface PrintDetailState {
  fadeAnim: any,
}
export default class PrintDetail extends Component<PrintDetailProps, PrintDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(10)
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
        duration: 5000,              // 让动画持续一段时间
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
          width: 750,
          height: fadeAnim,
          backgroundColor: '#cab'
        }}
      >
        <View>
          <QRCode
            value="dadadadad"
          />
          <Button title='返回' onPress={() => this.historyBack()} />
        </View>
      </Animated.View>
    );
  }
  public historyBack() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 3000,
      }
    ).start(() => {
      this.props.navigation.goBack();
    });

  }
}