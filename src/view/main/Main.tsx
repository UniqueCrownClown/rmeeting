import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert
} from 'react-native';
import VerticalBox from '../../components/VerticalBox'
const styles = StyleSheet.create({
  scape: {
    marginTop: 20,
    marginBottom: 20,
  },
});
declare interface MainProps {
  navigation: any
}
declare interface MainState {
  count: number
}

export default class Main extends Component<MainProps, MainState> {
  //是不是和tabNav冲突了，所以不生效
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:'首页'
    }
  };

  constructor(props: MainProps) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }
  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  private linkData1: Array<any> =
    [{ text: '会议管理', source: require('./../../asserts/images/icon-1.png'), link: 'MeetMain' },
    { text: '办公管理', source: require('./../../asserts/images/icon-2.png'), link: 'Toe' },
    { text: '云打印', source: require('./../../asserts/images/icon-3.png'), link: 'PrintMain' }]
  private linkData2: Array<any> =
    [
      { text: '请假', source: require('./../../asserts/images/icon-4.png'), link: 'Toe' },
      { text: '项目', source: require('./../../asserts/images/icon-5.png'), link: 'Toe' },
      { text: '合同', source: require('./../../asserts/images/icon-6.png'), link: 'Toe' },
      { text: '出差', source: require('./../../asserts/images/icon-7.png'), link: 'Toe' },
      { text: '外出登记', source: require('./../../asserts/images/icon-8.png'), link: 'Toe' },
      { text: '宿舍入住', source: require('./../../asserts/images/icon-9.png'), link: 'Toe' }
    ]


  public render() {
    return (<View style={[{ flex: 1, backgroundColor: '#f5f5f5' }]}>
      <Text style={styles.scape}>办公类</Text>
      <VerticalBox linkData={this.linkData1} length={this.linkData1.length} navigation={this.props.navigation} />
      <Text style={styles.scape}>生活类</Text>
      <VerticalBox linkData={this.linkData2} length={this.linkData2.length} navigation={this.props.navigation} />
    </View>)
  }
}