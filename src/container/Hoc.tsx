import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
export default (title: string)=> (WrappedComponent: any)=> {
    return class HOC extends Component {
      //逻辑复用的公共部分
      render() {
        return <View>
          <View>
            <Text>我是标题</Text>
          </View>
          <WrappedComponent {...this.props} />
        </View>
      }
    }
  }

