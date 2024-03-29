import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';
import RNCamera from 'react-native-camera';
import { NavigationScreenProp } from 'react-navigation';
declare interface IDeskScanProps {
  navigation: NavigationScreenProp<any>
}
declare interface IDeskScanState {
  moveAnim: any
}
export default class DeskScan extends Component<IDeskScanProps, IDeskScanState> {
  public camera: any;
  constructor(props: IDeskScanProps) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: -200,
        duration: 2000,
        easing: Easing.ease
      }
    ).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = (result: any) => {
    const { navigate } = this.props.navigation;
    const { data } = result;
    navigate('DeskMain', {
      scan: data
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.constants.Type.back}
          flashMode={RNCamera.constants.FlashMode.on}
          onBarCodeRead={this.onBarCodeRead}
        >
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
            <Animated.View style={[
              styles.border,
              { transform: [{ translateY: this.state.moveAnim }] }]} />
            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10
  },
  border: {
    flex: 0,
    width: 200,
    height: 1,
    backgroundColor: '#fba',
    transform: ([{ translateY: 0 }])
  }
});