import { Action } from 'redux';
import { login } from '../../api';
import * as types from '../constants/loginTypes';
import NavigationService from '../../router/NavigationService';

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export const loginWrap = (loginParms: LoginParams): any => {
  console.log('登录方法');
  // return loginSuccess(true, user)
  //1. 直接return Action类型 2. dispach入参再dispach一个return Action类型的function
  return (dispatch) => {
    dispatch(isLogining());
    let result = login(loginParms).then((res) => {
      const { status, data } = res;
      console.log(res);
      if (status === 200 && data.status === 'success') {
        const user = {
          staffNum: 'A4407',
          userName: '蔡健雅',
        };
        dispatch(loginSuccess(true, user));
        NavigationService.navigate('Home', {});
      }
    }).catch((e) => {
      dispatch(loginError(false));
    })
  }
}

function isLogining() {
  return {
    type: types.LOGIN_IN_DOING
  }
}

function loginSuccess(isSuccess: boolean, user: IUser) {
  console.log('success');
  return {
    type: types.LOGIN_IN_DONE,
    user: user,
  }
}

function loginError(isSuccess: boolean) {
  console.log('error');
  return {
    type: types.LOGIN_IN_ERROR,
  }
}
