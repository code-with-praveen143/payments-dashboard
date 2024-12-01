export type UserRole = 'admin' | 'accountant' | 'student'

export interface User {
  id: string
  serialNo: string
  staffCode: string
  name: string
  email: string
  type: UserRole
}

