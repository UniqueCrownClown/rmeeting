import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import XButton from '../../components/XButton';
import { bookMeeting } from '../../api';
declare interface AddMeetProps {
  navigation: NavigationScreenProp<any>,
  user: IUser
}
declare interface AddMeetState {
  station: string;
  meetTime: string;
  meetPerson: string;
  visibleModal: boolean;
  text: string
}
class AddMeet extends Component<AddMeetProps, AddMeetState> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '添加会议',
      headerRight: (<XButton
        onClick={navigation.getParam('complateBook', () => { Alert.alert('ddaad') })}
        text='完成'
      />),
    }
  };
  private persons: any;
  private meetTime: any;
  private meetDate: any;
  constructor(props: AddMeetProps) {
    super(props);
    this.state = {
      station: '请选择',
      meetTime: '8:00-9:00',
      meetPerson: '张三,李四',
      visibleModal: false,
      text: ''
    }
  }
  static propTypes = {
  }
  componentDidMount() {
    this.props.navigation.setParams({ complateBook: this._complateBook })
  }

  async _complateBook() {
    const { text, station } = this.state;
    const xx = {
      subject: text,
      room: station,
      meetingDate: this.meetDate,
      startTime: this.meetTime.substring(0, 5),
      endTime: this.meetTime.substring(5),
      participants: this.persons
    }
    const response = await bookMeeting(xx)
  }

  render() {
    this.persons = this.props.navigation.getParam('persons', '请选择');
    this.meetTime = this.props.navigation.getParam('meetTime', 'x');
    this.meetDate = this.props.navigation.getParam('meetDate', 'x');
    return (
      <View style={styles.addMeetContainer}>
        <View style={[styles.meetSubject, styles.publicCell]}>
          <Text style={styles.publicText}>会议主题</Text>
          <TextInput style={styles.sInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text} />
        </View>
        <TouchableOpacity onPress={this.toModal} style={styles.publicCell}>
          <Text style={styles.publicText}>参会地点</Text>
          <Text style={styles.publicText}>{this.state.station}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publicCell} onPress={this.navigateTo.bind(this, 'MeetTime')}>
          <Text style={styles.publicText}>参会时间</Text>
          <Text style={styles.publicText}>{this.meetTime === 'x' ? '请选择' : `${this.meetTime}(${this.meetDate})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publicCell} onPress={this.navigateTo.bind(this, 'MeetPerson')}>
          <Text style={styles.publicText}>参会人员</Text>
          <Text style={styles.publicText}>{this.persons}</Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}>
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }
  renderModalContent() {
    const selectItem = ['会议室1', '会议室2', '会议室3'];
    return <View style={styles.modalContent}>
      {
        selectItem.map((item, index) =>
          this.renderButton(item, index, () => {
            this.setState({ visibleModal: false, station: item });
          }
          ))
      }
    </View>
  }
  renderButton = (text: string, index: number, onPress: () => void) => (
    <TouchableOpacity style={styles.modalItem} onPress={onPress} key={index}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
  toModal = () => {
    this.setState({ visibleModal: true })
  }
  navigateTo = (path: string) => {
    this.props.navigation.navigate({ routeName: path })
  }
}

export default connect(
  (state: any) => ({
    user: state.loginIn.user,
  })
)(AddMeet)

const styles = StyleSheet.create({
  addMeetContainer: {
    flex: 0,
  },
  publicCell: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    padding: 10
  },
  publicText: {
    fontSize: 18
  },
  sInput: {
    width: 240,
    fontSize: 18,
    textAlign: 'right'
  },
  meetSubject: {
  },
  meetStation: {
  },
  meetTime: {
  },
  meetPerson: {
  },
  modalItem: {
    width: 375,
    height: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
})