import Lunar from './lunar';
export const timeSpace = () => {
  let arr: string[] = new Array();
  const min = ['00', '30'];
  for (let i = 9; i < 21; i++) {
    arr.push(`${i}:${min[0]}`, `${i}:${min[1]}`)
  }
  return arr
}
export const timeState = (haha: Array<string>): Array<ItimeState> => {
  let returnArr = [];
  haha.map((item) => {
    returnArr.push({ text: item, isSelect: false, isActive: false })
  })
  return returnArr
}
// 用update的值更新mIndex位置的haha
export const getUpdate = (haha: Array<any>, mIndex: number, update: any) => {
  const xxx = haha.map((item, index) => {
    if (index === mIndex) {
      const temp = Object.assign({}, item, update);
      return temp
    }
    return item
  })
  return xxx
}
// 统一设置更新数据的值
export const allUpdate = (haha: Array<any>, update: any) => {
  const xxx = haha.map((item) => {
    return Object.assign({}, item, update);
  })
  return xxx
}
//日历获取算法
//获取当前周的第一天
export const getFirstDay = () => {
  let date = new Date();
  let week = date.getDay() - 1;
  date = addDate(date, week * -1);
  return new Date(date);
};
const addDate = (date: Date, n: number): Date => {
  date.setDate(date.getDate() + n);
  return date;
};
export const getRenderCalendar = (date: Date): IDateItem => {

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
  const lunar = Lunar.GetLunarDay(year, month, day);
  let params: IDateItem = {
    year: year,
    month: month,
    day: day,
    week: week,
    lunar: lunar,
    isActive: false
  }
  if (day === new Date().getDate()) {
    params.isActive = true
  }
  return params
}
export const getWeekCalendar = () => {
  let returnDates = new Array<IDateItem>();
  for (let i = 0; i < 7; i++) {
    returnDates.push(getRenderCalendar(addDate(getFirstDay(), i)));
  }
  return returnDates;
}