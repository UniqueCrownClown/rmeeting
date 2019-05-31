import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Animated, Button } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import XCalendar from "../../components/XCalendar";
import XButton from "../../components/XButton";
declare interface AddDeskProps {
  navigation: NavigationScreenProp<any>
}
declare interface AddDeskState {
  timeSpace: string,
  deskName: string,
  isShowCalendar: boolean,
  markedDates?: any
}
const styles = StyleSheet.create({
  addDeskItem: {
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  addDeskItemText: {
    paddingHorizontal: 10
  }
})
export default class AddDesk extends Component<AddDeskProps, AddDeskState> {
  constructor(props: AddDeskProps) {
    super(props);
    this.state = {
      timeSpace: '请选择',
      deskName: '请选择',
      isShowCalendar: false
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '工位预约',
      headerRight: (<XButton
        onClick={navigation.getParam('complateBook', () => { Alert.alert('ddaad') })}
        text='完成'
      />),
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ complateBook: this._complateBook })
  }
  _complateBook() {
    Alert.alert('提交');
  }
  public render() {
    const deskNumber = this.props.navigation.getParam('deskNumber', '请选择');
    return <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <TouchableOpacity onPress={this.xxxxxx.bind(this)}>
          <View style={styles.addDeskItem} >
            <Text style={styles.addDeskItemText}>使用日期</Text>
            <Text style={styles.addDeskItemText}>{this.state.timeSpace}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toDeskSelect()}>
          <View style={styles.addDeskItem} >
            <Text style={styles.addDeskItemText}>工位选择</Text>
            <Text style={styles.addDeskItemText}>{deskNumber.length === 1 ? `${deskNumber}号工位` : deskNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {this.state.isShowCalendar ? this.renderCalendar() : null}
    </View>
  }
  public renderCalendar() {
    return <Animated.View style={{ height: 360 }}>
      <Button title='确定' onPress={() => {
        //做是否连续和为空的校验判断
        const timeSpace = Object.keys(this.state.markedDates).join(',')
        this.setState({ timeSpace: timeSpace, markedDates: {}, isShowCalendar: false })
      }}></Button>
      <XCalendar
        markedDates={this.state.markedDates}
        onDayPress={this.onDayPress.bind(this)} />
    </Animated.View>;
  }

  public onDayPress(day: any) {
    const { markedDates } = this.state;
    const dateString = day.dateString;
    let a = {};
    a[dateString] = { marked: true };
    this.setState({ markedDates: { ...markedDates, ...a } })
  }

  public toDeskSelect() {
    this.props.navigation.navigate('DeskSelect');
  }

  public xxxxxx() {
    const { isShowCalendar } = this.state;
    this.setState({ isShowCalendar: !isShowCalendar })
  }
}