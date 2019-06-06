declare module global {
  let http: AllHttp;
}
declare class AllHttp {
  register: (params: any) => any
  logon: (params: any) => any
}