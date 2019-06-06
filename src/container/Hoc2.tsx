export default (WrappedComponent: any) => {
  return class Hoc2 extends WrappedComponent {
    render() {
      return super.render();
    }
  }
}