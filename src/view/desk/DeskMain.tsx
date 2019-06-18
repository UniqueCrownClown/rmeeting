import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { getDeskList, releaseDesk } from "../../api";
import HorizontalItem, { BasicItem } from "../../components/HorizontalItem";
import TabTitle, { TabTitleItem } from "../../components/TabTitle";
import { themeColor } from "../../config";
import DialogUtil from "../../utils/DialogUtil";
declare interface DeskDataItem extends BasicItem {
  state: number,
  station: string,
  timeSpace: string
}
declare interface DeskMainProps {
  navigation: NavigationScreenProp<any>,
  user: IUser
}
declare interface DeskMainState {
  showIndex: number,
  deskData: Array<DeskDataItem>,
}
const styles = StyleSheet.create({
  DeskMainContainer: {
    flex: 1,
    alignItems: 'center'
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
    backgroundColor: themeColor,
  },
  deskItemContainer: {
    width: 320,
    height: 200,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  addDeskContainer: {
    height: 160,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cccccc',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 320
  }

})
class DeskMain extends Component<DeskMainProps, DeskMainState> {
  currentDeleteId: string = '';
  async queryDelete() {
    if (this.currentDeleteId != '') {
      const { data, status } = await releaseDesk(this.currentDeleteId);
      console.log(data);
      if (status === 200) {
        this.currentDeleteId = '';
        this.queryData();
      }
    }

  }
  private stateText = ['未使用', '使用中'];
  private stateExchangeText = ['开始使用', '提前释放'];
  constructor(props: DeskMainProps) {
    super(props);
    this.state = {
      showIndex: 1,
      deskData: [{ name: 'dsda', path: 'dsda', state: 0, station: '2', timeSpace: '2019.05.30-2019.05.32' }]
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
      activeIndex: this.state.showIndex,
      exchangeIndex0: () => this._exchangeIndex(0),
      exchangeIndex1: () => this._exchangeIndex(1),
    });
    this.queryData();
  }
  async queryData() {
    const { status, data } = await getDeskList(this.props.user.staffNum);
    if (status === 200) {
      const deskData = data.map(item => {
        return {
          station: item.stationNum,
          name: item.qrToken,
          path: item.qrToken,
          state: item.status,
          timeSpace: `${item.startDate}-${item.endDate}`
        }
      })
      this.setState({
        deskData: deskData
      });
    }
  }
  _exchangeIndex = (index: number) => {
    this.setState({ showIndex: index })
    this.props.navigation.setParams({ activeIndex: index })
  }
  public render() {
    const { deskData } = this.state;
    return <View style={styles.DeskMainContainer}>
      {this.state.showIndex === 0 ?
        DeskMain.renderRoomMap(require('./../../asserts/images/desk-map-color.png')) : this.renderDeskList(deskData)}
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
  public renderDeskList = (deskData: Array<DeskDataItem>) => {
    return <View style={{ flex: 1, alignItems: 'center', width: 320 }}>
      <TouchableOpacity
        style={styles.addDeskContainer}
        onPress={() => this.navigateToAdd()}>
        <Text style={{ fontSize: 30 }}>工位预约</Text>
      </TouchableOpacity>
      <HorizontalItem
        items={deskData}
        handleSelect={this.handleSelect.bind(this)}
        disableSwiper={true}
        type={this.renderDeskItem} />
    </View>
  }

  public renderDeskItem = (item: DeskDataItem) => {
    return <View style={styles.deskItemContainer}>
      <View style={{ backgroundColor: themeColor, flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 18, color: '#ffffff' }}>{`${item.station}号工位`}</Text>
        <Text style={{ paddingHorizontal: 10, paddingVertical: 4, color: '#ffffff' }}>{item.timeSpace}</Text>
        <Text style={{ paddingHorizontal: 10, paddingVertical: 4, color: '#ffffff' }}>{this.stateText[item.state]}</Text>
      </View>
      <View style={{ flex: 0, padding: 10, justifyContent: "space-between", flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.handleDeskNavigate()}>
          <View>
            <Text style={{ paddingHorizontal: 10 }}>导航</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDeskUse()}>
          <View>
            <Text style={{ paddingHorizontal: 10 }}>
              {this.stateExchangeText[item.state]}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  }
  public handleSelect(path: string) {
    DialogUtil.showDialog({
      title: '提示',
      content: '残忍删除该预定?~~',
      success: () => this.queryDelete()
    })
    this.currentDeleteId = path;
  }
  public handleDeskNavigate() {
    this._exchangeIndex(0);
  }
  public handleDeskUse() {
    this.props.navigation.navigate('DeskScan')
  }
  public navigateToAdd() {
    this.props.navigation.navigate('AddDesk');
  }

}
export default connect(
  (state: any) => ({
    user: state.loginIn.user,
  })
)(DeskMain)