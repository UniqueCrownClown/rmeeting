import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert
} from 'react-native';
import { transform } from '@babel/core';
const styles = StyleSheet.create({
  clockOuter: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fba',
    position: 'relative'
  },
  hourOuter: {
    width: 2,
    height: 60,
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    left: 30,
  },
  minOuter: {
    width: 1,
    height: 60,
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    left: 30,
  },
  hourInner: {
    marginTop: 15,
    height: 20,
    backgroundColor: '#fff',
  },
  minInner: {
    marginTop: 5,
    height: 30,
    backgroundColor: '#fff',
  }
})
declare interface ClockProps {
  time: string,
  state?: number
}
declare interface ClockState {
}
export default class Clock extends Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
  }
  private colorCollection: string[] = [
    "#FE8849",
    "#3384FE",
    "#0A4191",
    "#CECECE"
  ];
  public render() {
    const { time } = this.props;
    return <View style={[styles.clockOuter, this.getBackColor(time)]}>
      <View style={[styles.hourOuter, this.getHourRotate(time)]}>
        <View style={styles.hourInner}></View>
      </View>
      <View style={time.substring(3, 5) === "30" ? styles.minOuter : [styles.minOuter, { transform: [{ rotate: '0deg' }] }]}>
        <View style={styles.minInner}></View>
      </View>
    </View>
  }

  public getHourRotate(start: string) {
    const time = Number(start.substring(0, 2));
    const value = `${(time % 12) * 30}deg`;
    return { transform: [{ rotate: value }] }
  }
  public getBackColor(start: string) {
    const time = Number(start.substring(0, 2));
    let value = '';
    if (this.props.state === 2) {
      value = this.colorCollection[3];
    }
    else if (time < 12) {
        value =  this.colorCollection[0];
        }
        else if (time < 19) {
        value = this.colorCollection[1];
    } else {
      value= this.colorCollection[2];
    }
    return { backgroundColor: value } 
  }

}