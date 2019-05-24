import axios from 'axios';
import baseConfig from '../config'
const postWrap = async (url: string, params: URLSearchParams) => {
  try {
    console.info(JSON.stringify(params))
    let res = await axios.post(url, params)
    return res
  } catch (error) {
    console.info(error)
    return error
  }
}
export default class Http {
  static logon(params: any) {
    const url = `${baseConfig.IP}:${baseConfig.PORT}/${baseConfig.prefix}/logon`
    return postWrap(url, params)
  }
  static register(params: any) {
    const url = `${baseConfig.IP}:${baseConfig.PORT}/${baseConfig.prefix}/register`
    return postWrap(url, params)
  }
  static async fetchData() {
    //用fetch来实现和服务器数据交互
    const REQUEST_URL =
      'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
    const response = await fetch(REQUEST_URL);
    const responseData = await response.json();
    return responseData.movies
  }

  static async getTest() {
    let xxcacac = await axios.get('http://14.23.114.194:8889/appointment/appointmentStation-list/A4407');
    return xxcacac
  }
}
