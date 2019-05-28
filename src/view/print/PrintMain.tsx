import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, Alert, TouchableOpacity, TextInput, Image
} from 'react-native';
import Modal from "react-native-modal";
import XButton from '../../components/XButton';
import { NavigationScreenProp } from 'react-navigation';
import HorizontalItem, { BasicItem } from '../../components/HorizontalItem';
import Demo from '../../container/Demo';
import Icon from 'react-native-vector-icons/FontAwesome';
export declare interface PrintItem extends BasicItem {
  count: number,
  time?: string
}
declare interface PrintMainProps {
  navigation: NavigationScreenProp<any>;
}
declare interface PrintMainState {
  haha: Array<any>,
  visibleModal: boolean
}
export default class PrintMain extends Component<PrintMainProps, PrintMainState> {
  constructor(props: PrintMainProps) {
    super(props);
    this.state = {
      haha: [{ name: 'item1', path: '1111path' }, { name: 'item2', path: '2222path' }],
      visibleModal: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '场景列表',
      headerRight: (
        <XButton
          onClick={navigation.getParam('showModal')}
          iconName='hao'
          text='添加'
        />
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ showModal: this.showModal })
  }
  showModal = () => {
    this.setState({ visibleModal: true });
  }
  renderButton = (text, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View><Text>新建场景</Text></View>
      <View>
        <TextInput placeholder="场景值"></TextInput>
      </View>
      <View style={{ flex: 0, justifyContent: 'space-around' }}>
        {this.renderButton("新建", () => this.setState({ visibleModal: false }))}
        {this.renderButton("取消", () => this.setState({ visibleModal: false }))}
      </View>
    </View>
  );

  public render() {
    return <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <HorizontalItem items={this.state.haha}
          handleSelect={this.handleSelect.bind(this)}
          type={this.renderPrintMain} />
      </View>
      <Modal
        isVisible={this.state.visibleModal}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        {this.renderModalContent()}
      </Modal>
    </View>
  }

  handleSelect(path: string): void {
    Alert.alert(path);
    this.props.navigation.navigate('PrintFile');
  }

  public renderPrintMain = (data: PrintItem) =>
    <View style={{ flex: 0, width: 750, justifyContent: 'flex-start', flexDirection: 'row' }}>
      <Image style={{ width: 50, height: 50 }}
        source={require('./../../asserts/images/list-folder.png')} />
      <View>
        <Text>{data.name}</Text>
        <Text>文件信息</Text>
      </View>
      <Icon name="angle-right" size={20} color="#666" />
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sceneContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});