import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert, Animated, Button } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import XCalendar from "../../components/XCalendar";
import XButton from "../../components/XButton";
import { element } from "prop-types";
import { bookStation } from "../../api";
import { connect } from "react-redux";
declare interface AddDeskProps {
  navigation: NavigationScreenProp<any>,
  user: IUser
}
declare interface AddDeskState {
  timeSpace: string,
  deskName: string,
  isShowCalendar: boolean,
  markedDates?: Map<string, Object>
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
class AddDesk extends Component<AddDeskProps, AddDeskState> {
  deskNumber: any;
  constructor(props: AddDeskProps) {
    super(props);
    this.state = {
      timeSpace: '请选择',
      deskName: '请选择',
      isShowCalendar: false,
      markedDates: new Map<string, object>()
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '工位预约',
      headerRight: (<XButton
        onClick={navigation.getParam('complateBook', () => { Alert.alert('没挂载上') })}
        text='完成'
      />),
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ complateBook: this._complateBook.bind(this) })
  }
  async _complateBook() {
    const { timeSpace } = this.state;
    const time = this.splitDate(this.splitTimeSpace(timeSpace), '/');
    if (this.deskNumber === '请选择') {
      return;
    }
    const params = {
      staffNum: this.props.user.staffNum,
      stationNum: this.deskNumber,
      startDate: time[0],
      endDate: time[1]
    };
    console.log(params)
    const { status, data } = await bookStation(params);
    console.log(data);
    // if (status === 200) {
    //   this.props.navigation.navigate('DeskMain');
    // }
  }
  public render() {
    this.deskNumber = this.props.navigation.getParam('deskNumber', '请选择');
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
            <Text style={styles.addDeskItemText}>{this.deskNumber.length === 1 ? `${this.deskNumber}号工位` : this.deskNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {this.state.isShowCalendar ? this.renderCalendar() : null}
    </View>
  }
  public renderCalendar() {
    return <Animated.View style={{ height: 360 }}>
      {this.renderHeader()}
      <XCalendar
        markedDates={this.mapToObj(this.state.markedDates)}
        onDayPress={this.onDayPress.bind(this)} />
    </Animated.View>;
  }

  public renderHeader() {
    return <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', borderColor: '#ccc', padding: 6, borderTopWidth: 1 }}>
      <TouchableOpacity onPress={() => {
        //清空选择日期
        this.setState({ markedDates: new Map<string, object>(), isShowCalendar: false })
      }} style={{ flex: 1, textAlign: 'center' }}><View>
          <Text style={{ textAlign: 'center' }}>取消</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        const getTimeSpace = this.getTimeSpace(this.state.markedDates);
        const timeSpace = `${getTimeSpace[0]}-${getTimeSpace[1]}`;
        this.setState({ timeSpace: timeSpace, markedDates: new Map<string, object>(), isShowCalendar: false })
      }} style={{ flex: 1 }}><View>
          <Text style={{ textAlign: 'center' }}>确定</Text>
        </View>
      </TouchableOpacity>
    </View>
  }

  public onDayPress(day: any) {
    //只能选择连续的
    let { markedDates } = this.state;
    const dateString = day.dateString;
    if (markedDates.has(dateString)) {
      markedDates.delete(dateString)
    } else {
      markedDates.set(dateString, { marked: true });
    }
    this.setState({ markedDates: markedDates })
  }

  public toDeskSelect() {
    const { timeSpace } = this.state;
    this.props.navigation.navigate('DeskSelect', {
      queryDate: timeSpace === '请选择' ? null : this.splitTimeSpace(timeSpace)
    });
  }

  public xxxxxx() {
    const { isShowCalendar } = this.state;
    this.setState({ isShowCalendar: !isShowCalendar })
  }

  public getTimeSpace(markedDates: Map<string, object>) {
    let timeSpace: string[] = [];
    markedDates.forEach((value, key) => timeSpace.push(key));
    timeSpace = timeSpace.sort((a, b) => b < a ? 1 : -1);
    timeSpace = this.splitDate(timeSpace, '/');
    return [timeSpace[0], timeSpace[timeSpace.length - 1]];
  }

  public splitDate(arr: string[], format: string) {
    return arr.map(element => element.replace(/[-]/g, format));
  }
  public splitTimeSpace(timeSpace: string, splitStr = '-') {
    const rStr = timeSpace.split(splitStr);
    return rStr.length === 2 ? rStr : null;
  }


  //Map转换为对象
  public mapToObj(map: any) {
    let obj = Object.create(null);
    for (let [key, value] of map) {
      if (typeof key === "string") {
        obj[key] = value;
      }
    }
    return obj;
  }
}

export default connect(
  (state: any) => ({
    user: state.loginIn.user,
  })
)(AddDesk)