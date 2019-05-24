import React, { Component } from "react";
import { View, Text, StyleSheet, GestureResponderEvent, TouchableOpacity, Alert, ScrollView } from "react-native";
import { timeSpace, timeState, getUpdate, allUpdate, getWeekCalendar } from "../../utils/timeSpace";
import { compose } from "../../utils/compose";
import config from "../../config";
import { NavigationScreenProp } from 'react-navigation';
declare interface MeetTimeProps {
  navigation: any
}
declare interface MeetTimeState {
  timeData: Array<ItimeState>,
  calendarData: Array<IDateItem>
}
const styles = StyleSheet.create({
  meetTimeMain: {
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
    textAlign: 'center'
  },
  calenadarItemTextActive: {
    color: '#fff',
    textAlign: 'center'
  },
  dayBlock: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20
  },
  timeWrap: {
    alignSelf: 'center',
    width: 320,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  timeBlockSelect: {
    backgroundColor: '#f1f1f1'
  },
  timeBlockText: {
    height: 40,
    lineHeight: 40
  }
})

export default class MeetTime extends Component<MeetTimeProps, MeetTimeState> {
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
    }
  };
  public render() {
    const currenCalendar = this.state.calendarData.find(element => element.isActive === true);
    const timeList = this.state.timeData.map((item, index) =>
      (
        <TouchableOpacity key={item.text}
          onPress={() => this.touchTime(index)}>
          <View style={item.isActive ? [styles.timeBlock, styles.timeBlockActive] : [styles.timeBlock, styles.timeBlockNormal]}>
            <Text style={item.isActive ? [styles.timeBlockText, styles.timeBlockActive] : [styles.timeBlockText, styles.timeBlockNormal]}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      ))
    const calendarBlock = this.state.calendarData.map((item, index) => (
      <TouchableOpacity
        key={item.day}
        onPress={() => this.selectDate(index)}>
        <View style={item.isActive ? styles.calendarItemActive : styles.calenadarItem}>
          <Text style={item.isActive ? styles.calenadarItemTextActive : styles.calenadarItemText}>{item.week}</Text>
          <Text style={item.isActive ? styles.calenadarItemTextActive : styles.calenadarItemText}>{item.day}</Text>
          <Text style={item.isActive ? styles.calenadarItemTextActive : styles.calenadarItemText}>{item.lunar}</Text>
        </View>
      </TouchableOpacity>
    ))
    return <View style={styles.meetTimeMain}>
      <ScrollView>
        <View style={styles.calendarBlock}>{calendarBlock}</View>
      </ScrollView>
      <View style={styles.dayBlock}>
        <Text>{currenCalendar.month}月{currenCalendar.day}日</Text>
        <Text>周{currenCalendar.week}</Text>
      </View>
      <View style={styles.timeWrap}>{timeList}</View>
    </View>
  }
  touchTime(count: number) {
    const xxx = allUpdate(this.state.timeData, { isActive: false });
    const yyy = getUpdate(xxx, count, { isActive: true });
    this.setState({ timeData: yyy });
  }
  selectDate(count: number) {
    const xxx = allUpdate(this.state.calendarData, { isActive: false });
    const yyy = getUpdate(xxx, count, { isActive: true });
    this.setState({ calendarData: yyy });
  }
  touchCalendarIn(evt: GestureResponderEvent) {
    console.info(evt);
    Alert.alert('aaaaa');
  }
  touchCalendarOut(evt: GestureResponderEvent) {
    console.info(evt)
  }
}