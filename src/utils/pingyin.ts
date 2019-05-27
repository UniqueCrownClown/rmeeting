interface PingYinItem {
  data: Array<string>,
  title: string
}
export const pySegSort = (arr: string[], empty?: boolean): Array<PingYinItem> => {
  if (!String.prototype.localeCompare) {
    return null;
  }
  const letters = '*abcdefghjklmnopqrstwxyz'.split('');
  const zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');

  let segs = [];
  let curr;
  for (let i = 0; i < letters.length; i++) {
    curr = {
      title: letters[i],
      data: []
    };
    for (let j = 0; j < arr.length; j++) {
      if (
        (!zh[i - 1] || zh[i - 1].localeCompare(arr[j], 'zh') <= 0) &&
        arr[j].localeCompare(zh[i], 'zh') === -1
      ) {
        (curr.data as any).push(arr[j]);
      }
    }
    if (empty || curr.data.length) {
      segs.push(curr);
      curr.data.sort(function (a, b) {
        return (a as any).localeCompare(b, 'zh');
      });
    }
  }
  return segs;
}
