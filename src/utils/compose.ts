declare type IComposeFn = (...args: any) => any;
export const compose = (...fns: Array<IComposeFn>) => {
  // const fns: Array<any> = [].slice.call(args);
  // return function (initialArg: any) {
  //   let res = initialArg
  //   for (let i = fns.length - 1; i > -1; i--) {
  //     res = fns[i](res)
  //   }
  //   return res
  // }
  const length = fns.length;
  return function (this: any, ...args: Array<any>) {
    let index = length - 1,
      result = length > 0 ? fns[index].apply(this, args) : args; //注意arg为数组，要用apply
    while (--index >= 0) {
      result = fns[index].call(this, result);
    }
    return result
  }
}