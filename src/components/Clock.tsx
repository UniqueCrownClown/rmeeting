import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert
} from 'react-native';
const styles = StyleSheet.create({
  clockOuter: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#ba8',
    position: 'relative'
  },
  hourOuter: {
    width: 2,
    height: 100,
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    left: 50,
  },
  minOuter: {
    width: 1,
    height: 100,
    transform: [{ rotate: '40deg' }],
    position: 'absolute',
    left: 50,
  },
  hourInner: {
    marginTop: 20,
    height: 40,
    backgroundColor: '#fba',
  },
  minInner: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#fca',
  }
})
declare interface ClockProps {
  time: string;
}
declare interface ClockState {
  time: string;
}
export default class Clock extends Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
    this.state = {
      time: '09:30'
    };
  }
  public render() {
    return <View style={styles.clockOuter}>
      <View style={styles.hourOuter}>
        <View style={styles.hourInner}></View>
      </View>
      <View style={styles.minOuter}>
        <View style={styles.minInner}></View>
      </View>
    </View>
  }

}