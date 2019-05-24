//Animated仅封装了四个可以动画化的组件：View、Text、Image和ScrollView
import React,{ Component, Children } from 'react';
import { Animated, Text, View } from 'react-native';
declare interface AnimatedState {
  fadeAnim: any;
}
declare interface AnimatedProps {
  style: any;
  children: any;
}
export default class TestAnimated extends Component {
  public state: AnimatedState;
  public props: AnimatedProps;
  constructor(props: AnimatedProps) {
    super(props);
    this.props = props;
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }
  public componentDidMount() {
    Animated.timing(
      // 随时间变化而执行动画
      this.state.fadeAnim, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 10000, // 让动画持续一段时间
      },
    ).start(); // 开始执行动画
  }
  public render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View // 使用专门的可动画化的View组件
        style={{
          ...this.props.style,
          opacity: fadeAnim, // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
