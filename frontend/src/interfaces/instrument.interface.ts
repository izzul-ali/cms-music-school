export interface IInstrument {
  id: number
  name: string
  date_created: string | null
  date_updated: string | null
  students: number[]
  teachers: number[]
}

export interface ICreateInstrument {
  name: string
}

export interface IUpdateInstrument extends ICreateInstrument {
  id: number
}
