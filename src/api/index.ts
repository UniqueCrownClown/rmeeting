import axios from 'axios';
import config from '../config';
import WrapperParams from '../utils/wrapperParams'
// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] =
  'multipart/form-data;charset=UTF-8';
// 创建一个axios的实列
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] =
  'application/json;charset=UTF-8';

const getParams = (params: any) => {
  return new WrapperParams(params).getValues()
}
// 用户登录
export const login = (params: LoginParams) =>
  instance.post<string & dataLoginResponse>(`${config.IP}:${config.PORT}${config.prefix}/user/logon`, getParams(params));
// 用户注册
export const register = (params: RegisterParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/user/registration`,
    getParams(params)
  );
// 请求会议列表
export const getMeeting = (staffNum: string) =>
  instance.get<dataMeetingResponse>(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/meeting-list/${staffNum}`
  );
// 请求联系人
export const getLinkMan = (query: string) =>
  instance.get<Array<string>>(
    `${config.IP}:${config.PORT}${config.prefix}/user/usernames-list/${query}`
  );
// 提交会议预约
export const bookMeeting = (params: BookMeetParams) =>
  instance.post(`${config.IP}:${config.PORT}${config.prefix}/appointment/meeting`, getParams(params));

// 获取被预约的时间段
export const getBookTimeSpace = (bookDate: string, room: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/meeting-daily-list/?meetingDate=${bookDate}&room=${room}`
  );
// 管理员开门码
export const getAdminCode = () =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/appointment/admin-code`);

// 删除会议记录
export const deleteMeet = (id: string) =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/meeting/${id}`
  );

// 会议室灯光控制
export const lightControl = (params: LightParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/meeting-room-switchs`,
    getParams(params)
  );
// 会议室TV控制
export const tvControl = (params: TVParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/television`,
    getParams(params)
  );

// 工位预约
export const bookStation = (params: BookStationParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/station-appointment`,
    getParams(params)
  );

// 根据员工工号查询预约工位列表
export const getDeskList = (staffNum: string) =>
  instance.get<Array<ResponseStation>>(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/station-appointment-list/${staffNum}`
  );

// 根据开始日期和结束日期获取被占用中的工位列表
export const getDeskState = (startTime: string, endTime: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/occupy-station-list?startDate=${startTime}&endDate=${endTime}`
  );
// 显示屏扫码后请求使用工位
export const updateDeskState = (token: string, staffNum: string) =>
  instance.put(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/station-appointment-report/${token}/${staffNum}`
  );

// 提前释放工位
export const releaseDesk = (id: string) =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/station-appointment/${id}`
  );

//rssi蓝牙定位
export const getPosition = (params: Array<ICoordinate>) =>
  instance.post(`${config.IP}:${config.PORT}/appointment/coordinate`, getParams(params));

export const uploadPrintFile: UploadPrintParams = {
  url: `${config.IP}:${config.PORT}/office/printer/file`,
  fileName: 'filelist'
};
// 新增场景
export const setPrintScreen = (params: PrintScreenParams) =>
  instance.post(`${config.IP}:${config.PORT}${config.prefix}/printer/print-file-scene`, getParams(params));
// 查询场景
export const getPrintScreen = (staffNum: string) =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/printer/print-file-scene/${staffNum}`)
// 删除场景
export const delPrintScene = (sceneId: string) =>
  instance.delete(`${config.IP}:${config.PORT}${config.prefix}/printer/print-file-scene/${sceneId}`)
// 查询指定场景id下的文件列表
export const getPrintFile = (sceneId: string) =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/printer/file/${sceneId}`)
// 用户删除文件
export const delPrintFile = (fileId: string) =>
  instance.delete(`${config.IP}:${config.PORT}${config.prefix}/printer/file/${fileId}`)
