/** Los tres roles fijos definidos por RF03. */
export type Role = 'STUDENT' | 'ORGANIZER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  role: Role
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  user: User
}
