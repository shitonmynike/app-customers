import { IUser } from './user'

export interface IApiResponseLogin {
  token: string
  user: IUser
}
