declare module global {
  let http: xcxdx;
}
declare class xcxdx {
  register: (params: any) => any
  logon: (params: any) => any
  fetchData: () => Promise<any>
  getTest:()=>any
}