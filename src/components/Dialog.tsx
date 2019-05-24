import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert
} from 'react-native';
declare interface DialogProps {

}
declare interface DialogState {
}
export default class Dialog extends Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {

    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '文件选择',
      headerBackTitle: '云打印',
      headerRight: (
        <Button
          onPress={() => Alert.alert('莎莎')}
          title='添加'
        />
      ),
    }
  };
  public render() {
    return <View>
    </View>
  }

}