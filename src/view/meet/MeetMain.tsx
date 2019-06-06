import React, { Component, Context } from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { getMeeting } from '../../api';
import Clock from '../../components/Clock';
import HorizontalItem, { BasicItem, GroupBasicItem } from '../../components/HorizontalItem';
import TabTitle, { TabTitleItem } from '../../components/TabTitle';
import XButton from '../../components/XButton';
export declare interface MeetItem extends BasicItem {
  startTime: string,
  endTime: string,
  room: string,
  qrToken: string,
  participants: string,
  meetingStatus: number,
}


export declare interface GroupMeetItem extends GroupBasicItem {
  data: Array<MeetItem>
}

interface MeetMainProps {
  navigation: NavigationScreenProp<any>,
  user?: IUser
}
interface MeetMainState {
  tabTitle: Array<string>,
  showIndex: number,
  finishMeetData: Array<GroupMeetItem>,
  unfinishMeetData: Array<GroupMeetItem>,
}
class MeetMain extends Component<MeetMainProps, MeetMainState, Context<string>> {
  private responseArr:Array<ResponseMeet> = [];
  constructor(props: MeetMainProps) {
    super(props);
    this.state = {
      tabTitle: ['已完成', '未完成'],
      showIndex: 0,
      finishMeetData: [{
        title: '2019-09-23',
        data: [{
          name: '123456', path: '123456path', startTime: '09:30', endTime: '10:30',
          room: '会议室1', qrToken: '123456', participants: 'zhanga', meetingStatus: 1
        }]
      }
      ],
      unfinishMeetData: [{
        title: '2019-09-25',
        data: [{
          name: '345678', path: '345678path', startTime: '13:30', endTime: '16:00',
          room: '会议室1', qrToken: '345678', participants: 'zhanga', meetingStatus: 2
        }]
      }]
    }
  }
  static navigationOptions = ({ navigation }) => {
    const apple: Array<TabTitleItem> = [{
      text: '未完成',
      activeIndex: navigation.getParam('activeIndex', 0),
      onClick: () => navigation.state.params.exchangeIndex0()
    }, {
      text: '已完成',
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
    this.queryData();
  }
  async queryData() {
    const queryString = this.props.user.staffNum;
    const response = await getMeeting(queryString);
    console.log(response);
    const { data, status } = response;
    if (status === 200) {
      this.responseArr = data;
      const finish = data.filter(element => element.meetingStatus === 2);
      const unfinish = data.filter(element => element.meetingStatus !== 2);
      this.setState({
        finishMeetData: this.exchangeData(finish),
        unfinishMeetData: this.exchangeData(unfinish)
      })
    }


  }
  exchangeData(data: ResponseMeet[]) {
    let returnData: Array<GroupMeetItem> = [];
    let haha = new Set(data.map(item => item.meetingDate));
    for (let item of haha) {
      const xxx = data.filter(element => element.meetingDate === item);
      const yyy: Array<MeetItem> = xxx.map(citem => {
        return {
          name: citem.subject,
          path: citem.id,
          startTime: citem.startTime,
          endTime: citem.endTime,
          room: citem.room,
          qrToken: citem.qrToken,
          participants: citem.participants,
          meetingStatus: citem.meetingStatus,
        }
      })
      returnData.push({
        title: item,
        data: yyy
      })
    }
    return returnData
  }
  toAddMeet = () => {
    this.props.navigation.navigate('AddMeet');
  };
  _exchangeIndex = (index: number) => {
    this.setState({ showIndex: index })
    this.props.navigation.setParams({ activeIndex: index })
  }

  public render() {
    const { finishMeetData, unfinishMeetData, showIndex } = this.state;
    return <View>
      <HorizontalItem sessions={showIndex === 0 ? unfinishMeetData : finishMeetData}
        handleSelect={this.handleSelect.bind(this)}
        type={this.renderMeetItem}
        isGroup={true} />
    </View>
  }

  handleSelect(path: string): void {
    this.props.navigation.navigate('MeetDetail', {
      detailData: this.responseArr.find(element => element.id === path)
    })
  }

  public renderMeetItem = (data: MeetItem) =>
    <View style={{ flex: 0, width: 750, paddingVertical: 10, justifyContent: 'flex-start', flexDirection: 'row' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Clock time={data.startTime} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{data.name}</Text>
        <View>
          <Text>{data.startTime}-{data.endTime}</Text>
          <Text>{data.room}</Text>
        </View>
      </View>
    </View>;
}

export default connect(
  (state: any) => ({
    user: state.loginIn.user,
  })
)(MeetMain)