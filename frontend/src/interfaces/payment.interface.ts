import { IPackage } from "./package.interface"
import { IUser } from "./user.interface"

export interface IPayment {
  id: number
  date_created: string | null
  date_updated: string | null
  payment_id: string | null
  currency: string | null
  rate: number | null
  payment_date: string | null
  package: IPackage | null
  user_created: IUser | null
  user_updated: IUser | null
}
