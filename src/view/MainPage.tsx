import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Counter from '../components/Counter';
import { connect } from 'react-redux'; // 引入connect函数
import { NavigationActions, StackActions } from 'react-navigation';
import *as counterAction from '../store/actions/counterAction';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' })
  ]
})

class MainPage extends Component {
  public props: any;

  constructor(props: any) {
    super(props);
  }
  static navigationOptions = {
    title: 'MainPage',
  };

  logout() {
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { user } = this.props.navigation;
    const { count, incrementFn, decrementFn } = this.props;
    return (
      <View style={styles.container}>
        <Counter incrementFn={incrementFn} decrementFn={decrementFn} counter={count} />
        <TouchableOpacity onPress={this.logout.bind(this)} style={{ marginTop: 50 }}>
          <View>
            <Text>退出登录
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FFFF'
  }
})

export default connect(
  (state: any) => ({
    count: state.counter.count,
  }),
  (dispatch) => ({
    incrementFn: () => dispatch(counterAction.increment()),
    decrementFn: () => dispatch(counterAction.decrement()),
  })
)(MainPage)
