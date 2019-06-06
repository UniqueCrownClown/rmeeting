interface LoginParams {
  staffNum: string;
  password: string;
}
interface dataLoginResponse {
  data: any,
  msg: string,
  status: string
}
type dataMeetingResponse = Array<ResponseMeet>;

interface RegisterParams {
  staffNum: string;
  username: string;
  password: string;
  email?: string;
  department?: string;
}
interface BookMeetParams {
  subject: string;
  room: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  participants: string;
}
interface LightParams {
  room: string;
  method: LightMethod;
}
interface TVParams {
  tvNum: string;
  method: TVtype;
}
interface BookStationParams {
  staffNum: string;
  stationNum: string;
  startDate: string;
  endDate: string;
}
interface ICoordinate {
  name: string,
  mac: string,
  rssi: string
}
declare enum TVtype {
  channel = 'channel',
  ton = 'ton'
}
declare enum LightMethod {
  Open = 'Open',
  Close = 'Close'
}
//打印api
declare interface UploadPrintParams {
  url: string,
  fileName: string,
  data?: PrintParams
}

declare interface PrintParams {
  staffNum: string;
  sceneId: string;
  fileNames?: Object
}

declare interface PrintScreenParams {
  staffNum: string,
  sceneName: string
}
declare interface StaffCC {
  epartment: string,
  email: string,
  password: string,
  staffNum: string,
  userName: string
}
declare interface ResponseScreenPrintItem {
  id: string;
  sceneName: string;
  token: string;
  staff: StaffCC;
  fileCount: number;
}
declare interface PrintScreenResponse {
  status: number,
  data: Array<ResponseScreenPrintItem>,
}
//打印api
//responseQuery
declare interface ResponseMeet {
  id: string,
  subject: string,
  meetingDate: string,
  startTime: string,
  endTime: string,
  room: string,
  participants: string,
  qrToken: string,
  meetingStatus: number,
  roomStatus: number
}
declare interface SortMeetData {
  day: string,
  data: Array<ResponseMeet>
}

declare interface ResponseFileListItem {
  extraName: string
  fileName: string,
  filePath: string,
  id: string,
  md5: string,
  size: number,
  staffNum: string,
  token: string,
  uploadTime: string
}

declare interface ResponseStation {
  qrToken: string,
  startDate: string,
  endDate: string,
  stationNum: string,
  status: number
}

declare interface PrintFileResponse {
  status: number;
  data: Array<PrintFileResponseItem>
}
declare interface PrintFileResponseItem {
  extraName: string,
  fileName: string,
  filePath: string,
  id: string,
  md5: string,
  scene: any,
  sceneName: string,
  token: string,
  size: number,
  uploadTime: string
}
