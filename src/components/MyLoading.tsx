import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, Dimensions } from 'react-native';
declare interface MyLoadingProps {

}
declare interface MyLoadingState {
  isLoading: boolean,
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class MyLoading extends Component<MyLoadingProps, MyLoadingState> {
  minShowingTime: number;
  startTime: number;
  constructor(props: MyLoadingProps) {
    super(props);
    this.minShowingTime = 200;
    this.state = {
      isLoading: false,
    };
  }

  showLoading = () => {
    this.setIsLoading(true);
  };
  dismissLoading = () => {
    this.setIsLoading(false);
  };
  setIsLoading(isLoading: boolean) {
    if (isLoading !== this.state.isLoading) {
      let curTimeLong = new Date().getTime();
      if (isLoading) {
        this.startTime = curTimeLong;
        this.setState({
          isLoading
        });
      } else {
        let hasShowingTimeLong = curTimeLong - this.startTime;
        if (hasShowingTimeLong < this.minShowingTime) {
          setTimeout(() => {
            this.setState({
              isLoading
            });
          }, this.minShowingTime - hasShowingTimeLong);

        } else {
          this.setState({
            isLoading
          });
        }
      }

    }
  }

  render() {
    if (!this.state.isLoading) {
      return null;
    }
    return (
      <View style={{
        flex: 1,
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: '#10101099',
      }}>
        <View style={styles.loading}>
          <ActivityIndicator color="white" />
          <Text style={styles.loadingTitle}>请稍候...</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#10101099',
    height: 80,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (height - 80) / 2,
    left: (width - 100) / 2,
  },

  loadingTitle: {
    marginTop: 10,
    fontSize: 14,
    color: 'white'
  }
});