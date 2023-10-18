export type Auth = {
  isAuth: boolean
  accessToken?: string
  accountId?: string
}

export enum Method {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  DISCORD = 'DISCORD',
}
