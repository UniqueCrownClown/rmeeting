/**
 * 全局唯一的Loading显示隐藏工具类。
 * 
 */


let LoadingUtil = {
  showLoading(timeOut = 10000) {
    global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
    this.timerLoading = setTimeout(() => {
      this.dismissLoading();
    }, timeOut);

  },
  dismissLoading() {
    global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
    this.timerLoading && clearTimeout(this.timerLoading);

  },
};

export default LoadingUtil;
