import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bookMeeting } from '../../api';
import ActionSheet from '../../components/ActionSheet';
import XButton from '../../components/XButton';
declare interface AddMeetProps {
  navigation: NavigationScreenProp<any>,
  user: IUser
}
declare interface AddMeetState {
  station: string;
  meetTime: string;
  meetPerson: string;
  visibleModal: boolean;
  text: string,
  visibleDialog: boolean,
  responseData: string
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
  private selectItem: string[] = ['会议室1', '会议室2', '会议室3'];
  constructor(props: AddMeetProps) {
    super(props);
    this.state = {
      station: '请选择',
      meetTime: '8:00-9:00',
      meetPerson: '张三,李四',
      visibleModal: false,
      text: '',
      visibleDialog: false,
      responseData: ''
    }
  }
  static propTypes = {
  }
  componentDidMount() {
    this.props.navigation.setParams({ complateBook: this._complateBook.bind(this) })
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
    const response = await bookMeeting(xx);
    console.log(response);
    this.props.navigation.navigate('MeetMain');
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
            onChangeText={(textValue) => this.setState({ text: textValue })}
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
        <ActionSheet
          visibleModal={this.state.visibleModal}
          selectItem={this.selectItem}
          handleSelect={this.handleModalSelect.bind(this)}
        />
      </View>
    )
  }
  handleModalSelect(text: string) {
    this.setState({ station: text, visibleModal: false })
  }

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
})