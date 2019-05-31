import React, { Component } from "react";
import { View, StyleSheet, Image, Alert, Text, TouchableOpacity, } from "react-native";
import TabTitle, { TabTitleItem } from "../../components/TabTitle";
import HorizontalItem, { BasicItem } from "../../components/HorizontalItem";
import { NavigationScreenProp } from "react-navigation";
declare interface DeskDataItem extends BasicItem {
  state: number,
  timeSpace: string
}
declare interface DeskMainProps {
  navigation: NavigationScreenProp<any>
}
declare interface DeskMainState {
  showIndex: number,
  deskData: Array<DeskDataItem>
}
const styles = StyleSheet.create({
  DeskMainContainer: {
    flex: 1,
  },
  mapImageWrap: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fba',
    position: 'relative'
  },
  navigateCircle: {
    backgroundColor: 'rgba(255,255,255,.5)',
    width: 80,
    height: 80,
    borderRadius: 80,
    flex: 0,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
  },
  navigateInnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'skyblue',
  },
  deskItemContainer: {
    height: 200,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f5f5f5'
  },
  addDeskContainer: {
    height: 200,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
export default class DeskMain extends Component<DeskMainProps, DeskMainState> {
  constructor(props: DeskMainProps) {
    super(props);
    this.state = {
      showIndex: 1,
      deskData: [{ name: '123', path: 'dsda', state: 0, timeSpace: 'dadadad' }]
    }
  }
  static navigationOptions = ({ navigation }) => {
    const apple: Array<TabTitleItem> = [{
      text: '室内地图',
      activeIndex: navigation.getParam('activeIndex', 0),
      onClick: () => navigation.state.params.exchangeIndex0()
    }, {
      text: '工位预约',
      activeIndex: navigation.getParam('activeIndex', 0),
      onClick: navigation.getParam('exchangeIndex1')
    }];
    return {
      headerTitle: <TabTitle itemData={apple} />,
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({
      exchangeIndex0: () => this._exchangeIndex(0),
      exchangeIndex1: () => this._exchangeIndex(1),
    });
  }
  _exchangeIndex = (index: number) => {
    this.setState({ showIndex: index })
    this.props.navigation.setParams({ activeIndex: index })
  }
  public render() {
    const { deskData } = this.state
    return <View style={styles.DeskMainContainer}>
      {this.state.showIndex === 0 ? DeskMain.renderRoomMap(require('./../../asserts/images/desk-map-color.png')) : this.renderDeskList(deskData)}
    </View>
  }
  static renderRoomMap = (mapPath: any, isLocation: boolean = true) => {
    return <View style={styles.mapImageWrap}>
      <Image source={mapPath}
        resizeMode='contain'
        style={{ resizeMode: 'contain', width: 360, height: 615 }} />
      {isLocation ? DeskMain.renderNavigateCircle(100, 100) : null}
    </View>
  }
  static renderNavigateCircle = (top: number, left: number) => <View style={[{
    top: top, left: left,
  }, styles.navigateCircle]}>
    <View style={styles.navigateInnerCircle}></View>
  </View>
  public renderDeskList = (deskData: Array<any>) => {
    return <View>
      <HorizontalItem
        items={deskData}
        handleSelect={this.handleSelect.bind(this)}
        disableSwiper={true}
        type={this.renderDeskItem} />
      <TouchableOpacity
        style={styles.addDeskContainer}
        onPress={() => this.navigateToAdd()}>
        <Text style={{ fontSize: 30 }}>工位预约</Text>
      </TouchableOpacity>
    </View>
  }
  public renderDeskItem = (item: DeskDataItem) => {
    return <View style={styles.deskItemContainer}>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.timeSpace}</Text>
        <Text>{item.state}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => this.handleDeskNavigate()}>
          <Text>导航</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDeskUse()}>
          <Text>{item.state === 0 ? '开始使用' : '提前释放'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
  public handleSelect(path: string) {
    Alert.alert(path);
  }
  public handleDeskNavigate() {

  }
  public handleDeskUse() {

  }
  public navigateToAdd() {
    this.props.navigation.navigate('AddDesk');
  }
}