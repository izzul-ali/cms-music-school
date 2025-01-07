export interface IPackage {
  id: number
  status: string | null
  user_created: string | null
  date_created: string | null
  user_updated: string | null
  date_updated: string | null
  name: string | null
  start_datetime: string | null
  end_datetime: string | null
  student: string | null
  duration: number | null
  remarks: string | null
  instrument: number | null
  lessons_quota: number | null
  lessons: number[]
  payments: number[]
}
