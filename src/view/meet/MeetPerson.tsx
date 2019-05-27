import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { element, any } from "prop-types";
import { getUpdate } from "../../utils/timeSpace";
declare interface SelectListItem {
  name: string,
  isSelect: boolean
}
declare interface MeetPersonProps {
  navigation: any
}
declare interface MeetPersonState {
  selectList: Array<SelectListItem>
}

const styles = StyleSheet.create({
  linkManContainer: {

  },
  countView: {
    marginHorizontal: 20,
    flex: 0,
    flexDirection: 'row'
  },
  countViewText: {
    color: '#fff',
    fontSize: 18
  },
  linkManItem: {
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    height: 60,
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  outcircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginHorizontal: 30,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  incircle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#fff'
  },
  outcircleActive: {
    backgroundColor: '#ddd'
  },
  incircleActive: {
    backgroundColor: 'skyblue'
  },
  nameText: {
    color: '#666'
  }

});

export default class MeetPerson extends Component<MeetPersonProps, MeetPersonState> {
  constructor(props: MeetPersonProps) {
    super(props);
    this.state = {
      selectList: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '参会人员',
      headerRight: (
        <View style={styles.countView}>
          <Text style={styles.countViewText}>确定</Text>
          <Text style={styles.countViewText}>({navigation.getParam('count')})</Text>
        </View>
      ),
    }
  };
  componentDidMount() {
    const linkMan = ['张三', '李四', '王五', '赵六', '林七', '菜八'];
    let temp = [];
    linkMan.forEach(element => temp.push({ name: element, isSelect: false }));
    this.setState({ selectList: temp });
    this.props.navigation.setParams({ count: 0 });
  }
  public render() {
    const { selectList } = this.state;
    const shazi = selectList.map((item, index) =>
      <TouchableOpacity key={index} style={styles.linkManItem} onPress={() => this.haha(index)}>
        <View style={item.isSelect ? [styles.outcircle, styles.outcircleActive] : styles.outcircle}>
          <View style={item.isSelect ? [styles.incircle, styles.incircleActive] : styles.incircle}></View>
        </View>
        <Text>{item.name}</Text>
      </TouchableOpacity>);
    return <View style={styles.linkManContainer}>
      {shazi}
    </View>
  }
  public haha(count: number) {
    const temp = this.state.selectList[count].isSelect;
    const yyy = getUpdate(this.state.selectList, count, { isSelect: !temp });
    this.setState({ selectList: yyy });
    const cc = yyy.filter(element => element.isSelect === true).length
    this._navigateCount(cc);
  }
  public _navigateCount(index: number) {
    this.props.navigation.setParams({ count: index });
  }
}