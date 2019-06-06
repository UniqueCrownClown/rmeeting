interface IUser {
  staffNum: string
  userName: string
}
interface INormalAction {
  type: string
}

interface IUserAction {
  type: string
  user: IUser
}

interface UserState {
  status: string,
  isSuccess: boolean,
  user: null | IUser,
}