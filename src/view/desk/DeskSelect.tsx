import React, { Component } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import XButton from "../../components/XButton";
import { allUpdate, getUpdate } from "../../utils/timeSpace";
import DeskMain from "./DeskMain";
import { getDeskState } from "../../api";
declare interface DeskStateItem {
  id: string,
  isActive: boolean,
  isAble: boolean
}
declare interface DeskSelectProps {
  navigation: NavigationScreenProp<any>
}
declare interface DeskSelectState {
  deskState: Array<DeskStateItem>
}
const styles = StyleSheet.create({

})
export default class DeskSelect extends Component<DeskSelectProps, DeskSelectState> {
  constructor(props: DeskSelectProps) {
    super(props);
    this.state = {
      deskState: [
        { id: '1', isActive: false, isAble: true },
        { id: '2', isActive: false, isAble: true },
        { id: '3', isActive: false, isAble: true },
        { id: '4', isActive: false, isAble: true }
      ]
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '工位选择',
      headerRight: (
        <XButton
          onClick={navigation.getParam('navigateTo')}
          text='确定'
        />
      ),
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ navigateTo: this.navigateTo });
    this.queryData();
  }
  async queryData() {
    const queryDate = this.props.navigation.getParam('queryDate', null);
    let { deskState } = this.state;
    if (queryDate !== null) {
      const { status, data } = await getDeskState(queryDate[0], queryDate[1]);
      if (status === 200) {
        data.forEach(element => {
          const index = deskState.findIndex(item => item.id === element);
          deskState[index].isAble = false;
        });
        this.setState({ deskState: deskState })
      }
    } else {
      Alert.alert('请先选择使用日期');
      this.setState({ deskState: allUpdate(deskState, { isAble: false }) })
    }

  }
  navigateTo = () => {
    const returnId = this.state.deskState.find(element => element.isActive === true).id;
    if (returnId === undefined) {
      Alert.alert('还没选择，请先选择工位~~~');
      return;
    }
    this.props.navigation.navigate('AddDesk', {
      deskNumber: returnId
    })
  }
  public render() {
    return <View style={{ position: "relative", flex: 1 }}>
      {DeskMain.renderRoomMap(require('./../../asserts/images/desk-map.png'), false)}
      <View style={
        {
          position: 'absolute',
          top: 500,
          left: 128,
          flex: 0,
          flexDirection: 'row',
        }
      }>
        {this.state.deskState.map(item => this.renderDesk(item))}
      </View>
    </View>
  }
  public renderDesk = (item: DeskStateItem) =>
    <TouchableOpacity key={item.id} onPress={() => this.changeActive(item.id)}>
      <Image source={this.getXXX(item)}
        style={{ width: 50, height: 50, resizeMode: 'contain' }}></Image>
    </TouchableOpacity>;
  public changeActive(id: string) {
    const { deskState } = this.state;
    const index = deskState.findIndex(element => element.id === id);
    const temp = deskState[index].isActive;
    const newData = getUpdate(allUpdate(deskState, { isActive: false }), index, { isActive: !temp })
    this.setState({
      deskState: newData
    });
  }
  public getXXX(item: DeskStateItem) {
    if (!item.isAble) return require('./../../asserts/images/unable-desk.png');
    if (item.isActive) return require('./../../asserts/images/select-desk.png');
    return require('./../../asserts/images/empty-desk.png');
  }

}