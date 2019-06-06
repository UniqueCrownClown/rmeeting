import React, { Component } from 'react';
import { Alert, Button, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Myicon from 'react-native-vector-icons/iconfont';
import baseConfig, { themeColor } from './../../config';
import { styles } from './Styles';
import { connect } from 'react-redux';
import { loginWrap } from '../../store/actions/loginAction';
declare interface SignUpProps {
  navigation: any,
  loginWrap: (loginParams: LoginParams) => void
}
declare interface SignUpState {
  account: string;
  password: string;
}

class SignUp extends Component<SignUpProps, SignUpState> {
  static navigationOptions = {
    header: null
  };

  constructor(props: SignUpProps) {
    super(props);
    this.state = { account: 'A4407', password: '123456' }
  }
  public render() {
    return <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.logoContainer}>
          {/* <Myicon name='logo' size={60} color={baseConfig.themeColor} /> */}
        </View>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>智慧办公系统</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='账号'
            onChangeText={(text) => this.setState({ account: text })}
            value={this.state.account} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='密码'
            textContentType='password'
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title='登录' onPress={this.loginPress.bind(this)}></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='首页' onPress={this.toMain.bind(this)}></Button>
        </View>
        <View style={styles.tipsContainer}>
          <View>
            <Text>还没有账号?</Text>
          </View>
          <TouchableOpacity onPress={this.toRegister.bind(this)}>
            <Text style={{ color: themeColor }}>立即注册</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  }
  private loginPress() {
    const a = {
      staffNum: this.state.account,
      password: this.state.password
    }
    this.props.loginWrap(a);
    // const responseValue = await login(a);
    // const { status, data } = responseValue;
    // if (status === 200 && data.status === 'success') {
    //   this.toMain();
    // } else {
    //   Alert.alert('登录失败');
    // }
  }
  private toMain() {
    this.props.navigation.navigate('Home')
  }
  private toRegister() {
    this.props.navigation.navigate('SignOn')
  }
}

export default connect(
  (state: any) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  (dispatch) => ({
    loginWrap: (loginParams: LoginParams) => dispatch(loginWrap(loginParams)),
  })
)(SignUp)