import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { NavigationScreenProp } from "react-navigation";
import Clock from "../../components/Clock";
import Detail from "../../components/Detail";
import { MeetItem } from "./MeetMain";
const styles = StyleSheet.create({
  detailContent: {
    flex: 0,
    backgroundColor: 'rgba(255,255,255,.9)',
    width: 300,
    height: 500,
    borderRadius: 4
  },
  detailHeader: {
    height: 200,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  detailBody: {
    height: 200,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailBodyName: {
    fontSize: 24,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderStyle: 'dashed'
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

  }

})
declare interface MeetDetailProps {
  navigation: NavigationScreenProp<any>
}
declare interface MeetDetailState {
  detailData: ResponseMeet
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
        id: '223',
        subject: '会议名称',
        qrToken: '223',
        startTime: '10:30',
        endTime: '12:00',
        room: '会议室1',
        participants: '张三',
        meetingStatus: 2,
        roomStatus: 1,
        meetingDate: '2015-12-30'
      }
    }
  }
  render() {
    const detailData = this.props.navigation.getParam('detailData', null);
    return (
      <Detail>
        {this.renderContainer(detailData)}
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
      <Button title='返回' onPress={() => this.historyBack()} />
    </View>
  }
}
