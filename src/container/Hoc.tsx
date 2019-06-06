import React, { Component } from "react";
import { Text, View } from 'react-native';
export default (title: string) => (WrappedComponent: any) => {
  return class HOC extends Component {
    //逻辑复用的公共部分,HOC实现属性代理
    //非纯函数，得到状态，注入wrappedComponent里面
    //对wrap组件实现prop注入
    //用处:把wrappedComponent抽成无状态的组件？
    render() {
      const newProps = {
        apple: '1234567890',
      }
      return <View>
        <View>
          <Text>我是标题</Text>
        </View>
        <WrappedComponent {...this.props} {...newProps} />
      </View>
    }
  }
}

