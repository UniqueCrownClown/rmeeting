const Pinyin = require('./ChinesePY.js');
interface PingYinItem {
  data: Array<string>,
  title: string
}
export const pySegSort = (arr: string[]):Array<PingYinItem> => {
  let segs: Array<any> = [];
  const letters = 'abcdefghjklmnopqrstwxyz'.split('');
  // return data= [{data:array<string>,letter:string},{},{}]
  letters.forEach((element: string) => {
    let filterData: Array<string> = [];
    arr.forEach((item: string) => {
      let c = Pinyin.getWordsCode(item).charAt(0);
      if (c === element) {
        filterData.push(item);
      }
    });
    if (filterData.length !== 0) {
      segs.push({ title: element, data: filterData });
    }
  });
  //最后把没挂载上的汉字分类为#
  let total: Array<string> = [];
  segs.forEach((element) => {
    total = [...element.data, ...total];
  });
  if (total.length < arr.length) {
    const mohu = {
      title: '#',
      data: new Set([...arr].filter((x) => !(total as any).has(x))),
    };
    segs.push(mohu);
  }
  return segs;
}
