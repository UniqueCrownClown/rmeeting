import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from 'react-native-calendars';

declare interface XCalendarProps {
  markedDates: any,
  onDayPress: (day: any) => void
}
declare interface XCalendarState {
  markedDates: any,
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});

export default class XCalendar extends Component<XCalendarProps, XCalendarState> {
  constructor(props: XCalendarProps) {
    super(props);
    this.state = {
      markedDates: {
      }
    }
  }
  public render() {
    const { markedDates, onDayPress } = this.props;
    return <CalendarList
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      // onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={0}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={3}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      showScrollIndicator={true}
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  }
}