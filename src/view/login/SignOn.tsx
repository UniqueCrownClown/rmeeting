import React, { Component } from 'react';
import { Alert, Button, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { register } from '../../api';
import { styles } from './Styles';
interface SignOnProps {
  navigation: NavigationScreenProp<any>
}
interface SignOnState {
  usercard: string; username: string; password: string; againPassword: string;
}
export default class SignOn extends Component<SignOnProps, SignOnState> {
  static navigationOptions = {
    title: '注册'
  };
  constructor(props: SignOnProps) {
    super(props);
    this.state = { usercard: '', username: '', password: '', againPassword: '' }
  }
  public render() {
    return <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={-130}>
        <View style={styles.logoContainer}>
          {/* <Myicon name='logo' size={60} color={baseConfig.themeColor} /> */}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='工号'
            onChangeText={(text) => this.setState({ usercard: text })}
            value={this.state.usercard} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='用户名'
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='密码'
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='再次输入密码'
            onChangeText={(text) => this.setState({ againPassword: text })}
            value={this.state.againPassword} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title='注册' onPress={this.registerPress.bind(this)}></Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  }

  public async registerPress() {
    const a = {
      staffNum: this.state.usercard,
      password: this.state.password,
      username: this.state.username
    }
    const responseValue = await register(a);
    const { status, data } = responseValue;
    if (status === 200 && data.status === 'success') {
      this.toLogin();
    } else {
      Alert.alert('注册失败');
    }
  }

  public toLogin() {
    this.props.navigation.goBack();
  }
}