export default class WrapperParams {
  private apple = new URLSearchParams();
  constructor(params: any) {
    for (let key in params) {
      this.apple.append(key, params[key]);
    }
  }
  public getValues() {
    return this.apple;
  }
}
