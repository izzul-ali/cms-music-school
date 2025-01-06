export interface IRole {
  id: string | null
  name: string | null
  icon: string | null
  description: string | null
  parent: string | null
  children: string[]
  policies: string[]
  users: string[]
}
