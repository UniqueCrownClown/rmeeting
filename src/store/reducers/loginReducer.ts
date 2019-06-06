import * as types from '../constants/loginTypes';

const initialState: UserState = {
  status: '未登录',
  isSuccess: false,
  user: {staffNum:'A4407',userName:'蔡健雅'}
}

export default function loginIn(state = initialState, action: IUserAction) {
  switch (action.type) {
    case types.LOGIN_IN_DOING:
      return {
        ...state,
        status: '正在登录',
        isSuccess: false,
        user: null,
      }
      break;
    case types.LOGIN_IN_DONE:
      return {
        ...state,
        status: '登录成功',
        isSuccess: true,
        user: action.user,
      }
      break;
    case types.LOGIN_IN_ERROR:
      return {
        ...state,
        status: '登录出错',
        isSuccess: true,
        user: null,
      }
      break;
    default:
      console.log(state);
      return state;
  }
}
