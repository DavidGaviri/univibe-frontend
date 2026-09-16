import { apiRequest } from '../../shared/api/apiClient'
import type { Role, User } from '../auth/types'

/** Operaciones administrativas del RF03. */
export const userService = {
  findAll() {
    return apiRequest<User[]>('/admin/users')
  },

  changeRole(userId: number, role: Role) {
    return apiRequest<User>(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    })
  },
}
