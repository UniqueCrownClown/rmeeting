import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Alert } from 'react-native';
import XButton from '../../components/XButton';
import { NavigationScreenProp } from 'react-navigation';
import Modal from "react-native-modal";
declare interface AddMeetProps {
  navigation: NavigationScreenProp<any>
}
declare interface AddMeetState {
  station: string;
  meetTime: string;
  meetPerson: string;
  visibleModal: boolean;
}
export default class AddMeet extends Component<AddMeetProps, AddMeetState> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '添加会议',
      headerRight: (<XButton
        onClick={navigation.getParam('complateBook', () => { Alert.alert('ddaad') })}
        text='完成'
      />),
    }
  };
  constructor(props: AddMeetProps) {
    super(props);
    this.state = {
      station: '会议室1',
      meetTime: '8:00-9:00',
      meetPerson: '张三,李四',
      visibleModal: false
    }
  }
  static propTypes = {
  }
  componentDidMount() {
    this.props.navigation.setParams({ complateBook: this._complateBook })
  }

  _complateBook() {
    Alert.alert('提交');
  }

  render() {
    const persons = this.props.navigation.getParam('persons', '请选择');
    const meetTime = this.props.navigation.getParam('meetTime', '请选择');
    return (
      <View style={styles.addMeetContainer}>
        <View style={[styles.meetSubject, styles.publicCell]}>
          <Text style={styles.publicText}>会议主题</Text>
          <TextInput style={styles.sInput}></TextInput>
        </View>
        <TouchableOpacity onPress={this.toModal} style={styles.publicCell}>
          <Text style={styles.publicText}>参会地点</Text>
          <Text style={styles.publicText}>{this.state.station}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publicCell} onPress={this.navigateTo.bind(this, 'MeetTime')}>
          <Text style={styles.publicText}>参会时间</Text>
          <Text style={styles.publicText}>{meetTime}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publicCell} onPress={this.navigateTo.bind(this, 'MeetPerson')}>
          <Text style={styles.publicText}>参会人员</Text>
          <Text style={styles.publicText}>{persons}</Text>
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