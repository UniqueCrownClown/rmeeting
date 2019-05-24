import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from 'react-native-calendars';

declare interface MainProps {
  navigation: any
}
declare interface MainState {
  count: number
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

export default class XCalendar extends Component<MainProps, MainState> {
  public render() {
    return <View>
      <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
      <Calendar
        style={styles.calendar}
        current={'2012-05-16'}
        minDate={'2012-05-10'}
        maxDate={'2012-05-29'}
        firstDay={1}
        markedDates={{
          '2012-05-23': { selected: true, marked: true },
          '2012-05-24': { selected: true, marked: true, dotColor: 'green' },
          '2012-05-25': { marked: true, dotColor: 'red' },
          '2012-05-26': { marked: true },
          '2012-05-27': { disabled: true, activeOpacity: 0 }
        }}
        hideArrows={true}
      />
    </View>
  }
}