import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  logoContainer: {
    marginBottom: 10,
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center'
  },
  titleContainer: {
    margin: 20
  },
  inputContainer: {
    flex: 0,
    marginTop: 20,
    width: 320,
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderColor: '#e5e5e5',
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 40,
    width: 320,
    alignSelf: 'center'
  },
  tipsContainer: {
    marginTop: 60,
    width: 320,
    flex:0,
    flexDirection:'row',
    justifyContent:'center',
  }
});