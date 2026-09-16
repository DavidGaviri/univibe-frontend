import type { Role } from '../../features/auth/types'

/** Navegacion minima para este MVP, sin agregar una dependencia de routing todavia. */
export function navigate(path: string) {
  if (window.location.pathname === path) return

  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function homePathForRole(role: Role): string {
  switch (role) {
    case 'ADMIN':
      return '/admin'
    case 'ORGANIZER':
      return '/organizer'
    case 'STUDENT':
      return '/student'
  }
}
