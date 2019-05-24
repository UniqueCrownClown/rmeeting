import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert
} from 'react-native';
import XButton from '../../components/XButton'
import TabTitle, { TabTitleItem } from '../../components/TabTitle';
import { NavigationScreenProp } from 'react-navigation';
interface MeetMainProps {
  navigation: NavigationScreenProp<any>;
}
interface MeetMainState {
  count: number,
  tabTitle: Array<string>,
  showIndex: number
}
export default class MeetMain extends Component<MeetMainProps, MeetMainState> {
  constructor(props: MeetMainProps) {
    super(props);
    this.state = {
      count: 0,
      tabTitle: ['已完成', '未完成'],
      showIndex: -1
    }
  }
  static navigationOptions = ({ navigation }) => {
    const apple: Array<TabTitleItem> = [{
      text: '已完成',
      activeIndex: navigation.getParam('activeIndex', 0),
      onClick: () => navigation.state.params.exchangeIndex0()
    }, {
      text: '未完成',
      activeIndex: navigation.getParam('activeIndex', 0),
      onClick: navigation.getParam('exchangeIndex1')
    }];
    return {
      headerTitle: <TabTitle itemData={apple} />,
      headerRight: (
        <XButton
          onClick={navigation.getParam('toAddMeet')}
          iconName='hao'
          text='添加'
        />
      ),
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({
      toAddMeet: this.toAddMeet,
      exchangeIndex0: () => this._exchangeIndex(0),
      exchangeIndex1: () => this._exchangeIndex(1),
    });
  }
  toAddMeet = () => {
    this.props.navigation.navigate('AddMeet');
  };
  _exchangeIndex = (index: number) => {
    this.setState({ showIndex: index })
    this.props.navigation.setParams({ activeIndex: index })
  }

  public render() {
    return <View>
      <View>
        <Text>会议管理页</Text>
      </View>
      <XButton text='按钮' onClick={() => Alert.alert('hahahaha')}></XButton>
      <View><Text>{this.state.count}</Text></View>
      <View style={{ backgroundColor: '#fcb', width: 100, height: 100 }}>
        <Text>{this.state.showIndex}</Text>
      </View>
    </View>
  }
}