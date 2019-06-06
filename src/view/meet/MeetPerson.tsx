import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { element, any } from "prop-types";
import { getUpdate } from "../../utils/timeSpace";
import SelectItem, { ISelectItem } from "../../components/SelectItem";
import XButton from "../../components/XButton";
import { getLinkMan } from "../../api";

declare interface MeetPersonProps {
  navigation: any
}
declare interface MeetPersonState {
  selectList: Array<ISelectItem>
}

const styles = StyleSheet.create({
  countView: {
    marginHorizontal: 20,
    flex: 0,
    flexDirection: 'row'
  },
  countViewText: {
    color: '#fff',
    fontSize: 18
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
    const rendText = `确定(${navigation.getParam('count')})`;
    return {
      headerTitle: '参会人员',
      headerRight: (<XButton
        onClick={navigation.getParam('complateBook', () => { Alert.alert('ddaad') })}
        text={rendText}
      />),
    }
  };
  componentDidMount() {
    this.queryData();
    this.props.navigation.setParams({ count: 0, complateBook: this._complateBook.bind(this) });
  }
  async queryData() {
    //const linkMan = ['张三', '李四', '王五', '赵六', '林七', '菜八'];
    const { data, status } = await getLinkMan('all');
    if (status === 200) {
      this.setState({ selectList: this.filterGroup(data) });
    }

  }
  _complateBook() {
    const { selectList } = this.state;
    const persons = selectList.filter(element => element.isSelect === true);
    const sha = persons.map(item => item.name).join(',');
    this.props.navigation.navigate('AddMeet', {
      persons: sha
    })
  }
  public render() {
    const { selectList } = this.state;
    return <View>
      <SelectItem items={selectList} haha={this.haha.bind(this)} />
    </View>
  }
  public haha(name: string) {
    const { selectList } = this.state;
    const index = selectList.findIndex(element => element.name === name);
    const yyy = getUpdate(selectList, index, { isSelect: !selectList[index].isSelect });
    this.setState({ selectList: yyy });
    const cc = yyy.filter(element => element.isSelect === true).length
    this._navigateCount(cc);
  }
  public _navigateCount(index: number) {
    this.props.navigation.setParams({ count: index });
  }
  public filterGroup(items: Array<string>) {
    return items.map(item =>
      ({
        name: item,
        isSelect: false
      }))
  }
}