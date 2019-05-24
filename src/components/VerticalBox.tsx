import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',

  },
  gridTd: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
  },
  imageBox: {
    flex: 0,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridTdText: {
    fontSize: 14,
    textAlign: 'center',
  }
});
//3*3的格子组件
export default class VerticalBox extends Component {
  public props: any;
  public state: any;
  constructor(props: any) {
    super(props)
  }

  render() {
    const MainWidth = Dimensions.get('window').width;
    const { linkData, length } = this.props;
    const xxxx = (length: number) => {
      let res = [];
      for (let i = 0; i < length; i++) {
        res.push(
          <View key={i.toString()} style={[styles.gridTd, { width: MainWidth * 0.333, height: 108 }]}>
            <TouchableOpacity onPress={this.redirectTo.bind(this, linkData[i].link)}>
              <View style={styles.imageBox}>
                <Image
                  source={linkData[i].source}
                  style={[{ width: 86, height: 80, }]}
                />
              </View>
              <Text style={styles.gridTdText}>{linkData[i].text}
              </Text>
            </TouchableOpacity></View>)
      }
      return res
    }
    return (<View style={styles.main}>
      {xxxx(length)}
    </View>)
  }

  public redirectTo(arg: string) {
    this.props.navigation.navigate(arg);
  }
}
