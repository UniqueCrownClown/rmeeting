declare module global {
  let http: AllHttp;
  let mLoadingComponentRef: LoadingRef
  let mDialogComponentRef: DialogRef
}
declare class AllHttp {
  register: (params: any) => any
  logon: (params: any) => any
}
declare type LoadingRef = {
  showLoading: (timeOut?: number) => void,
  dismissLoading: () => void
}
declare type DialogRef = {
  showDialog: (aa: DialogData) => void;
}
declare interface DialogData {
  title?: string,
  content: string,
  success?: () => void,
  cancel?: () => void
}