import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert
} from 'react-native';
import XButton from '../../components/XButton'
import TabTitle, { TabTitleItem } from '../../components/TabTitle';
import { NavigationScreenProp } from 'react-navigation';
import HorizontalItem, { BasicItem } from '../../components/HorizontalItem';
import Clock from '../../components/Clock';
import SelectItem, { ISelectItem } from '../../components/SelectItem';
import { pySegSort } from '../../utils/pingyin';
import { element } from 'prop-types';
export declare interface MeetItem extends BasicItem {
}
interface MeetMainProps {
  navigation: NavigationScreenProp<any>;
}
interface MeetMainState {
  tabTitle: Array<string>,
  showIndex: number,
  meetMainData: Array<MeetItem>
}
export default class MeetMain extends Component<MeetMainProps, MeetMainState> {
  constructor(props: MeetMainProps) {
    super(props);
    this.state = {
      tabTitle: ['已完成', '未完成'],
      showIndex: -1,
      meetMainData: [{ name: '123456', path: '123456path' }, { name: '654321', path: '654321path' }]
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
    const linkMan = ['张三', '李四', '王五', '赵六', '林七', '菜八'];
    return <View>
      <View>
        <Text>会议管理页</Text>
      </View>
      <View style={{ backgroundColor: '#fcb', width: 100, height: 100 }}>
        <Text>{this.state.showIndex}</Text>
      </View>
      <View>
        <HorizontalItem items={this.state.meetMainData}
          handleSelect={this.handleSelect.bind(this)}
          type={this.renderMeetItem} />
      </View>
      <View>
        <Clock time="dadada" />
      </View>
      <SelectItem items={this.filterGroup(linkMan)} haha={this.haha.bind(this)} />
    </View>
  }

  public filterGroup(items: Array<string>) {
    return items.map(item =>
      ({
        name: item,
        isSelect: false
      }))
  }
  public haha(count: number) {
    Alert.alert(count.toString())
  }

  handleSelect(path: string): void {
    Alert.alert(path);
  }

  public renderMeetItem = (data: any) =>
    <View style={{ flex: 0, width: 750, justifyContent: 'flex-start', flexDirection: 'row' }}>
      <View>
        <Text>{data.name}</Text>
      </View>
    </View>;
}