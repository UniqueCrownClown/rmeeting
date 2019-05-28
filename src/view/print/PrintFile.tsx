import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert, TextInput, TouchableOpacity
} from 'react-native';

import XButton from '../../components/XButton';
import { NavigationScreenProp } from 'react-navigation';
import HorizontalItem from '../../components/HorizontalItem';

const styles = StyleSheet.create({
})
declare interface PrintFileProps {
  navigation: NavigationScreenProp<any>
}
declare interface PrintFileState {
  data: Array<any>,
}
export default class PrintFile extends Component<PrintFileProps, PrintFileState> {
  constructor(props: PrintFileProps) {
    super(props);
    this.state = {
      data: [
        { name: '111', path: 'dada', time: '2019-05-28' },
        { name: '222', path: 'q3rr', time: '2019-05-28' }],
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
        type={this.renderPrintFile}
        dropFresh={this.dropFresh.bind(this)} />
    </View>
  }
  public renderPrintFile = (item) => <View style={{ height: 80 }}>
    <Text>{item.name}</Text>
    <Text>{item.time}</Text>
  </View>
  public handleSelect(path: string) {
    this.props.navigation.navigate('PrintDetail')
  }
  public dropFresh() {
    this.props.navigation.navigate('PrintDetail')
  }
  componentDidMount() {
    this.props.navigation.setParams({ navigateTo: this.navigateTo })
  }
  componentWillMount() {
  }
  navigateTo = () => {
    this.props.navigation.navigate('FileSelect')
  }
}