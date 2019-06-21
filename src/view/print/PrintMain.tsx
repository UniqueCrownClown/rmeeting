import React, { Component } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { delPrintScene, getPrintScreen, setPrintScreen } from '../../api';
import Dialog from '../../components/Dialog';
import HorizontalItem, { BasicItem } from '../../components/HorizontalItem';
import XButton from '../../components/XButton';
import { themeColor } from '../../config';
export declare interface PrintItem extends BasicItem {
  fileCount: number,
  time?: string,
  token: string,
}
declare interface PrintMainProps {
  navigation: NavigationScreenProp<any>;
  user: IUser
}
declare interface PrintMainState {
  haha: Array<PrintItem>,
  visibleModal: boolean,
  textValue: string
}
class PrintMain extends Component<PrintMainProps, PrintMainState> {
  constructor(props: PrintMainProps) {
    super(props);
    this.state = {
      haha: [{ name: 'item1', path: '1111path', fileCount: 1, token: '123456' }],
      visibleModal: false,
      textValue: ''
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
    this.props.navigation.setParams({ showModal: this.showModal });
    this.queryData();
  }
  async queryData() {
    const response = await getPrintScreen(this.props.user.staffNum);
    const { status, data } = response;
    if (status === 200 && data !== 'fail') {
      this.setState({
        haha: data.map(item => {
          return {
            name: item.sceneName,
            fileCount: item.fileCount,
            path: item.id,
            token: item.token,
          }
        })
      })
    }
  }
  showModal = (isShow: boolean = true) => {
    this.setState({ visibleModal: isShow });
  }

  public render() {
    return <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <HorizontalItem items={this.state.haha}
          handleSelect={this.handleSelect.bind(this)}
          swiperPress={this.handleDelete.bind(this)}
          type={this.renderPrintMain} />
      </View>
      {this.renderModalContent()}
    </View>
  }
  handleCreate(): void {
    const sceneName = this.state.textValue;
    const response = setPrintScreen({
      staffNum: this.props.user.staffNum,
      sceneName: sceneName
    });
    console.log(response);
    this.showModal(false);
  }
  handleCancel() {
    this.setState({ visibleModal: false, textValue: '' })
  }

  handleSelect(path: string): void {
    const sceneDetail = this.state.haha.find(element => element.path === path);
    console.log(sceneDetail);
    this.props.navigation.navigate('PrintFile', { detailData: sceneDetail });
  }
  async handleDelete(path: string) {
    const response = await delPrintScene(path);
    if (response.status === 200) {
      Alert.alert('删除成功');
    }
  }

  public renderPrintMain = (data: PrintItem) =>
    <View style={{ flex: 0, width: 750, paddingVertical: 10, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Image style={{ width: 50, height: 50 }}
          source={require('./../../asserts/images/list-folder.png')} />
      </View>
      <View style={{ flex: 1 }}>
        <Text>{data.name}</Text>
        <Text>{data.fileCount}项</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Icon name="angle-right" size={20} color="#666" />
      </View>
    </View>;

  public renderModalContent() {
    return (
      <Modal
        isVisible={this.state.visibleModal}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <View style={styles.modalContent}>
          <View style={{ width: 320, padding: 10 }}>
            <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18 }}>新建场景</Text>
          </View>
          <View style={{ width: 320, padding: 10 }}>
            <TextInput placeholder="场景值"
              style={{ textAlign: 'center', borderWidth: 1,borderColor:themeColor }}
              value={this.state.textValue}
              onChangeText={(text) => this.setState({ textValue: text })}>
            </TextInput>
          </View>
          <View style={{
            width: 320, borderTopWidth: 1, borderTopColor: '#e5e5e5',
            flex: 0, flexDirection: 'row'
          }}>
            {Dialog.renderButton("新建", () => this.handleCreate())}
            <View style={{ width: 1, backgroundColor: '#e5e5e5' }} />
            {Dialog.renderButton("取消", () => this.handleCancel())}
          </View>
        </View>
      </Modal>
    );
  }
}
export default connect(
  (state: any) => ({
    user: state.loginIn.user,
  })
)(PrintMain)
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});