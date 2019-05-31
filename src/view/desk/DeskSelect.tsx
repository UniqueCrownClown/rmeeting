import React, { Component } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import XButton from "../../components/XButton";
import { allUpdate, getUpdate } from "../../utils/timeSpace";
import DeskMain from "./DeskMain";
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
    this.props.navigation.setParams({ navigateTo: this.navigateTo })
  }
  navigateTo = () => {
    const returnId = this.state.deskState.find(element => element.isActive === true).id;
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
    })
  }
  public getXXX(item: DeskStateItem) {
    if (!item.isAble) return require('./../../asserts/images/unable-desk.png');
    if (item.isActive) return require('./../../asserts/images/select-desk.png');
    return require('./../../asserts/images/empty-desk.png');
  }

}