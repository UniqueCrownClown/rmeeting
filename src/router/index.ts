import { createStackNavigator, createAppContainer } from 'react-navigation';
import { tabNavigator } from './MyTabNavigator';
import MainPage from './../view/MainPage';
import LoginPage from './../view/LoginPage';
import Toe from './../view/toe/Toe';
import SignUp from './../view/login/SignUp';
import SignOn from './../view/login/SignOn';
import MeetMain from './../view/meet/MeetMain'
import AddMeet from '../view/meet/AddMeet';
import PrintMain from '../view/print/PrintMain';
import MeetTime from '../view/meet/MeetTime';
import MeetPerson from '../view/meet/MeetPerson';
import PrintFile from '../view/print/PrintFile';
import FileSelect from '../view/print/FileSelect';
import PrintDetail from '../view/print/PrintDetail';
import DeskSelect from '../view/desk/DeskSelect';
import AddDesk from '../view/desk/AddDesk';
import DeskMain from '../view/desk/DeskMain';
import MeetDetail from '../view/meet/MeetDetail';
const RootStack = createStackNavigator(
  {
    Toe: { screen: Toe },
    Login: { screen: LoginPage },
    Main: { screen: MainPage },
    Home: { screen: tabNavigator },
    SignUp: { screen: SignUp },
    SignOn: { screen: SignOn },
    MeetMain: { screen: MeetMain },
    MeetDetail: { screen: MeetDetail },
    AddMeet: { screen: AddMeet },
    MeetTime: { screen: MeetTime },
    MeetPerson: { screen: MeetPerson },
    PrintMain: { screen: PrintMain },
    PrintFile: { screen: PrintFile },
    FileSelect: { screen: FileSelect },
    PrintDetail: { screen: PrintDetail },
    DeskMain: { screen: DeskMain },
    AddDesk: { screen: AddDesk },
    DeskSelect: { screen: DeskSelect }
  },
  {
    initialRouteName: 'MeetMain',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#137BFE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center'
      },
    }
  },
);
export const AppContainer = createAppContainer(RootStack);