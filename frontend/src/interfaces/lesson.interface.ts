import { IPackage } from "./package.interface"
import { IUser } from "./user.interface"

export interface ILesson {
  id: number | null
  date_created: string | null
  date_updated: string | null
  start_datetime: string | null
  remarks: string | null
  status: string | null
  package: IPackage | null
  teacher: IUser | null
  user_created: IUser | null
  user_updated: IUser | null
}
