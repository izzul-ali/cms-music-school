import { IRole } from "./role.interface"

export interface IUser {
  id: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  password: string | null
  location: string | null
  title: string | null
  description: string | null
  tags: string | null
  avatar: string | null
  language: string | null
  tfa_secret: string | null
  status: string | null
  role: IRole | null
  token: string | null
  last_access: string | null
  last_page: string | null
  provider: string | null
  external_identifier: string | null
  auth_data: string | null
  email_notifications: string | null
  appearance: string | null
  theme_dark: string | null
  theme_light: string | null
  theme_light_overrides: string | null
  theme_dark_overrides: string | null
  username: string | null
  student_instruments: number[]
  teacher_instruments: number[]
  policies: number[]
}

export interface ICreateUser {
  first_name: string
  last_name: string
  email: string
  password: string
  location?: string | null
  role: string
  status: string
}

export interface IUpdateUser extends Omit<ICreateUser, "role"> {
  id: string
}
