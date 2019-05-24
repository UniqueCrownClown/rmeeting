interface IUser {
  name: string
  age: number
}
interface INormalAction {
  type: string
}

interface IUserAction {
  type: string
  user: IUser
}