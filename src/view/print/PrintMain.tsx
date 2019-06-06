import React, { Component } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from 'react-navigation';
import Dialog from '../../components/Dialog';
import HorizontalItem, { BasicItem } from '../../components/HorizontalItem';
import XButton from '../../components/XButton';
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
  showModal = (isShow: boolean = true) => {
    this.setState({ visibleModal: isShow });
  }

  public render() {
    return <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <HorizontalItem items={this.state.haha}
          handleSelect={this.handleSelect.bind(this)}
          type={this.renderPrintMain} />
      </View>
      <Dialog
        title='新建场景'
        isInput={true}
        visibleModal={this.state.visibleModal}
        success={(text) => this.handleCreate(text)}
        cancel={() => this.showModal(false)}
      />
    </View>
  }
  handleCreate(text: string): void {
    this.showModal(false);
    Alert.alert(text);
  }

  handleSelect(path: string): void {
    Alert.alert(path);
    this.props.navigation.navigate('PrintFile');
  }

  public renderPrintMain = (data: PrintItem) =>
    <View style={{ flex: 0, width: 750, paddingVertical: 10, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Image style={{ width: 50, height: 50 }}
          source={require('./../../asserts/images/list-folder.png')} />
      </View>
      <View style={{ flex: 1 }}>
        <Text>{data.name}</Text>
        <Text>文件信息</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Icon name="angle-right" size={20} color="#666" />
      </View>
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