declare module global {
  let http: AllHttp;
  let mLoadingComponentRef: LoadingRef
}
declare class AllHttp {
  register: (params: any) => any
  logon: (params: any) => any
}
declare type LoadingRef = {
  showLoading: (timeOut?: number) => void,
  dismissLoading: () => void
}