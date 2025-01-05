export const ACCESS_TOKEN = "directus_session_token"
export const REFRESH_TOKEN = "refresh_token"

export interface ILogin {
  email: string
  password: string
}

export interface ILogout {
  refresh_token?: string
  mode?: string
}

export interface ILoginResponse {
  expires: number
  refresh_token: string
  access_token: string
}
