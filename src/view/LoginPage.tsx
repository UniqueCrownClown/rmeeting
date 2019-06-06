import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数
import *as loginAction from '../store/actions/loginAction';// 导入action方法
import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' })
  ]
})
declare interface LoginPageProps {
  loginWrap: (a: LoginParams) => void
}
class LoginPage extends Component<LoginPageProps> {
  static navigationOptions = {
    title: 'LoginPage',
  };
  public props: any;

  shouldComponentUpdate(nextProps, nextState) {
    // 登录完成,切成功登录
    if (nextProps.status === '登录成功' && nextProps.isSuccess) {
      this.props.navigation.dispatch(resetAction)
      return false;
    }
    return true;
  }

  render() {
    const { loginWrap } = this.props;
    return (
      <View style={styles.container}>
        <Text>状态: {this.props.status}
        </Text>
        <TouchableOpacity onPress={() => loginWrap({ staffNum: 'A4407', password: '123456' })}>
          <View style={styles.loginBtn}>
            <Text>登录
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
    backgroundColor: '#F5FCFF'
  },
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  }
});

export default connect(
  (state: any) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  (dispatch) => ({
    loginWrap: (loginParams: LoginParams) => dispatch(loginAction.loginWrap(loginParams)),
  })
)(LoginPage)
