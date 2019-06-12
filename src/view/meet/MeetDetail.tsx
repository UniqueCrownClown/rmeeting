import React, { Component } from "react";
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import PowerIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from "react-navigation";
import Clock from "../../components/Clock";
import Detail from "../../components/Detail";
import DotLine from "../../components/DotLine";
const styles = StyleSheet.create({
  detailContent: {
    flex: 0,
    backgroundColor: 'rgba(255,255,255,1)',
    width: 320,
    height: 500,
    borderRadius: 4
  },
  detailHeader: {
    height: 200,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBody: {
    height: 200,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailBodyName: {
    width: 280,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailBodyContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  detailBodyLeft: {
    flex: 1,
    paddingHorizontal: 20
  },
  detailBodyRight: {
    paddingHorizontal: 20
  },
  detailFooter: {

  },
  rowSwitch: {
    flex: 0,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowBtnSwitch: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
declare interface MeetDetailProps {
  navigation: NavigationScreenProp<any>
}
declare interface MeetDetailState {
  detailData: ResponseMeet,
  lightOn: boolean
}
export default class MeetDetail extends Component<MeetDetailProps, MeetDetailState> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      detailData: {
        id: '2233',
        subject: '会议名称',
        qrToken: '223',
        startTime: '10:30',
        endTime: '12:00',
        room: '会议室',
        participants: '参会人员',
        meetingStatus: 2,
        roomStatus: 1,
        meetingDate: '2015-12-30'
      },
      lightOn: false
    }
  }
  render() {
    const detailData = this.props.navigation.getParam('detailData', this.state.detailData);
    return (
      <Detail>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {this.renderContainer(detailData)}
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
            <View style={{ marginTop: 10 }}>
              <FontIcon name="angle-double-down" size={40} color='#fff' />
            </View>
          </TouchableOpacity>

        </View>

      </Detail>
    );
  };

  public historyBack() {
    this.props.navigation.goBack();
  }

  renderContainer(detailData: ResponseMeet) {
    return <View style={styles.detailContent}>
      <View style={styles.detailHeader}>
        <QRCode
          value={detailData.qrToken}
          size={160}
        />
      </View>
      <DotLine long={320} />
      <View style={styles.detailBody}>
        <Text style={styles.detailBodyName}>{detailData.subject}</Text>
        <View style={styles.detailBodyContainer}>
          <View style={styles.detailBodyLeft}>
            <Text style={{ paddingVertical: 10 }}>{detailData.startTime}-{detailData.endTime}({detailData.meetingDate})</Text>
            <Text style={{ paddingVertical: 10 }}>{detailData.room}</Text>
            <Text style={{ paddingVertical: 10 }}>{detailData.participants}</Text>
          </View>
          <View style={styles.detailBodyRight}>
            <Clock time={detailData.startTime} state={0} />
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: '#f5f5f5', borderRadius: 4, margin: 8 }}>
        <View style={styles.rowSwitch}>
          <Text style={{ paddingHorizontal: 10 }}>会议室顶灯</Text>
          <Switch value={this.state.lightOn} onValueChange={(value) => this.setState({ lightOn: value })} />
        </View>
        <View style={styles.rowSwitch}>
          <Text style={{ paddingHorizontal: 10 }}>会议室电视</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { Alert.alert('apple') }}>
              <View style={styles.rowBtnSwitch}>
                <Icon name="settings-input-hdmi" size={20} color='#ccc' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert('apple') }}>
              <View style={styles.rowBtnSwitch}>
                <PowerIcon name="power" size={20} color='#ccc' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  }
}
