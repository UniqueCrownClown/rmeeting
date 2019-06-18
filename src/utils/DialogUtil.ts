
const DialogUtil = {
  showDialog(aa: DialogData) {
    global.mDialogComponentRef && global.mDialogComponentRef.showDialog(aa);
  }
}
export default DialogUtil