import { apiRequest } from '../../shared/api/apiClient'
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from './types'

/**
 * Servicio de la feature Auth. Las paginas no conocen fetch ni las URLs exactas de la API.
 */
export const authService = {
  register(payload: RegisterPayload) {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  login(payload: LoginPayload) {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  me() {
    return apiRequest<User>('/auth/me')
  },

  logout() {
    return apiRequest<void>('/auth/logout', {
      method: 'POST',
    })
  },
}
