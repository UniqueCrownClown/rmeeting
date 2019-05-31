import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Alert
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
  time: string,
  position: string
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
      showIndex: 0,
      meetMainData: [
        { name: '123456', path: '123456path', time: '09:30-10:30', position: '会议室1' },
        { name: '654321', path: '654321path', time: '13:30-15:30', position: '会议室1' }]
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
    const { meetMainData, showIndex } = this.state;
    return <View>
      {showIndex === 0 ? <HorizontalItem items={meetMainData}
        handleSelect={this.handleSelect.bind(this)}
        type={this.renderMeetItem} /> : null}
    </View>
  }

  handleSelect(path: string): void {
    //Alert.alert(path);
    this.props.navigation.navigate('MeetDetail')
  }

  public renderMeetItem = (data: MeetItem) =>
    <View style={{ flex: 0, width: 750, justifyContent: 'flex-start', flexDirection: 'row' }}>
      <Clock time={data.time.substring(0, 5)} />
      <View>
        <Text>{data.name}</Text>
        <View>
          <Text>{data.time}</Text>
          <Text>{data.position}</Text>
        </View>
      </View>
    </View>;
}