import React, { Component } from "react";
import { Alert, findNodeHandle, GestureResponderEvent, PanResponder, ScrollView, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, UIManager, View } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import XButton from "../../components/XButton";
import config from "../../config";
import { compose } from "../../utils/compose";
import { allUpdate, getUpdate, getWeekCalendar, timeSpace, timeState } from "../../utils/timeSpace";
import { element } from "prop-types";
declare interface MeetTimeProps {
  navigation: NavigationScreenProp<any>
}
declare interface MeetTimeState {
  timeData: Array<ItimeState>,
  calendarData: Array<IDateItem>
}
const styles = StyleSheet.create({
  meetTimeMain: {
    flex: 1,
    justifyContent: 'space-between'
  },
  calendarBlock: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  calenadarItem: {
    flex: 0,
    width: 50,
  },
  calendarItemActive: {
    flex: 0,
    width: 50,
    backgroundColor: config.themeColor,
    borderRadius: 50
  },
  calenadarItemText: {
    color: '#999',
    textAlign: 'center',
    fontSize: 12
  },
  calenadarItemTextActive: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12
  },
  dayBlock: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20
  },
  timeWrap: {
    alignSelf: 'center',
    width: 320,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 100
  },
  timeBlock: {
    width: 80,
    textAlign: 'center',
    flex: 0,
    alignItems: 'center',
    marginVertical: 10
  },
  timeBlockNormal: {
    backgroundColor: '#f5f5f5',
  },
  timeBlockActive: {
    backgroundColor: '#137BFE',
    color: '#ffffff'
  },
  timeBlockDisable: {
    backgroundColor: '#e5e5e5',
    color: '#ffffff'
  },
  timeBlockText: {
    height: 40,
    lineHeight: 40
  }
})

export default class MeetTime extends Component<MeetTimeProps, MeetTimeState> {
  getBlockState(sssss: any, isAble: boolean, isActive: boolean): StyleProp<TextStyle> {
    if (!isAble && !isActive) {
      return [sssss, styles.timeBlockDisable]
    } else if (isActive) {
      return [sssss, styles.timeBlockActive]
    } else {
      return [sssss, styles.timeBlockNormal]
    }
  }
  _panResponder: any = null;
  private timeBockLocation = [];
  constructor(props: MeetTimeProps) {
    super(props);
    this.state = {
      timeData: compose(timeState, timeSpace)(),
      calendarData: getWeekCalendar(),
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '预约时间',
      headerRight: (<XButton
        onClick={navigation.getParam('complateBook', () => { Alert.alert('ddaad') })}
        text='确定'
      />),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ count: 0, complateBook: this._complateBook.bind(this) });
    setTimeout(() => {
      this.getLayout();
    }, 1000);
  }
  getLayout() {
    for (let i = 0; i < this.state.timeData.length; i++) {
      const name = 'time' + i.toString();
      this.layout(this.refs[name]).then((answer: any) => {
        const { width, height, pageX, pageY } = answer;
        const border = {
          top: pageY,
          bottom: pageY + height,
          left: pageX,
          right: pageX + width,
        }
        //console.log(JSON.stringify(border));
        this.timeBockLocation.push(border);
      });
    }
  }
  _complateBook() {
    const { timeData, calendarData } = this.state;

    const haha = timeData.filter(element => element.isActive === true);
    if (haha.length === 0) {
      return;
    }
    const bookDate = calendarData.find(element => element.isActive);
    const bookDateStr = `${bookDate.year}-${bookDate.month}-${bookDate.day}`
    const sha = `${haha[0].text}-${haha[haha.length - 1].text}(${bookDateStr})`
    this.props.navigation.navigate('AddMeet', {
      meetTime: sha
    })
  }
  layout(ref: any) {
    const handle = findNodeHandle(ref);
    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY
        });
      });
    });
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt: GestureResponderEvent, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        console.log("onResponderGrant", gestureState.moveX, gestureState.moveY);
        // gestureState.{x,y} 现在会被设置为0
        const xxx = allUpdate(this.state.timeData, { isActive: false });
        this.setState({ timeData: xxx });
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        console.log("onPanResponderMove", gestureState.moveX, gestureState.moveY);
        const { moveX, moveY } = gestureState;
        for (let i = 0; i < this.timeBockLocation.length; i++) {
          const { left, right, top, bottom } = this.timeBockLocation[i];
          if (moveX > left && moveX < right && moveY > top && moveY < bottom) {
            this.touchTime(i);
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        const { moveX, moveY, x0, y0 } = gestureState;
        console.log("onResponderRelease", gestureState.moveX, gestureState.moveY);
        const activeIndex = this.state.timeData.findIndex(element => element.isActive === true);
        if (activeIndex === -1) {
          for (let i = 0; i < this.timeBockLocation.length; i++) {
            const { left, right, top, bottom } = this.timeBockLocation[i];
            if (x0 > left && x0 < right && y0 > top && y0 < bottom) {
              this.touchTime(i);
            }
          }
        }
      }
    });
  }
  public render() {
    const { calendarData, timeData } = this.state;
    const currenCalendar = calendarData.find(element => element.isActive === true);
    const timeList = timeData.map((item, index) => this.renderTimeBlockItem(item, index))
    const calendarBlock = calendarData.map((item, index) => this.renderCalendarItem(item, index));
    return <View style={styles.meetTimeMain}>
      <ScrollView horizontal={true} style={{ flex: 0 }}>
        <View style={styles.calendarBlock}>{calendarBlock}</View>
      </ScrollView>
      <View style={styles.dayBlock}>
        <Text>{currenCalendar.month}月{currenCalendar.day}日</Text>
        <Text>周{currenCalendar.week}</Text>
      </View>
      <View style={styles.timeWrap}
        {...this._panResponder.panHandlers}>{timeList}</View>
    </View>
  }
  public renderTimeBlockItem = (item: ItimeState, index: number) => (
    <View key={item.text} ref={'time' + index.toString()}
      style={this.getBlockState(styles.timeBlock, item.isAble, item.isActive)}>
      <Text style={this.getBlockState(styles.timeBlockText, item.isAble, item.isActive)}>
        {item.text}
      </Text>
    </View>);

  public renderCalendarItem = (item: IDateItem, index: number) => (
    <TouchableOpacity
      key={item.day}
      onPress={() => this.selectDate(index)}>
      <View style={item.isActive ? styles.calendarItemActive : styles.calenadarItem}>
        <Text style={item.isActive ? styles.calenadarItemTextActive : styles.calenadarItemText}>{item.week}</Text>
        <Text style={item.isActive ? styles.calenadarItemTextActive : styles.calenadarItemText}>{item.day}</Text>
        <Text style={item.isActive ? styles.calenadarItemTextActive : styles.calenadarItemText}>{item.lunar}</Text>
      </View>
    </TouchableOpacity>
  );

  touchTime(count: number) {
    const { timeData } = this.state;
    const activeIndex = timeData.findIndex(element => element.isActive === true);
    //遇到不可选的块的处理
    const unableIndexsArr = timeData.map((item, index) => {
      if (item.isAble === false) {
        return index;
      }
      return -1;
    }).filter(element => element !== -1);
    //console.log(unableIndexs, activeIndex, count);
    //求交集
    for (let i = activeIndex; i <= count; i++) {
      if (unableIndexsArr.includes(count)) {
        return;
      }
      if (activeIndex !== -1 && unableIndexsArr.includes(i)) {
        return;
      }
    }
    const yyy = getUpdate(timeData, count, { isActive: true }, activeIndex);
    this.setState({ timeData: yyy });
  }
  selectDate(count: number) {
    const xxx = allUpdate(this.state.calendarData, { isActive: false });
    const yyy = getUpdate(xxx, count, { isActive: true });
    this.setState({ calendarData: yyy });
    //查询timeData的状态
    const zzz = getUpdate(this.state.timeData, 5, { isAble: false });
    this.setState({ timeData: zzz });
  }
}