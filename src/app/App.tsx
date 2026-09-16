import { useEffect, useState } from 'react'
import { useAuth } from '../features/auth/AuthContext'
import type { Role } from '../features/auth/types'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { ForbiddenPage } from '../pages/ForbiddenPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OrganizerDashboardPage } from '../pages/OrganizerDashboardPage'
import { RegisterPage } from '../pages/RegisterPage'
import { StudentDashboardPage } from '../pages/StudentDashboardPage'
import { UserManagementPage } from '../pages/UserManagementPage'
import { homePathForRole, navigate } from '../shared/navigation/navigation'

interface ProtectedViewProps {
  allowedRoles: Role[]
  children: React.ReactNode
}

function ProtectedView({ allowedRoles, children }: ProtectedViewProps) {
  const { user } = useAuth()

  if (!user) {
    navigate('/login')
    return null
  }

  if (!allowedRoles.includes(user.role)) {
    return <ForbiddenPage />
  }

  return <>{children}</>
}

/**
 * Composicion principal de la aplicacion.
 * Para Sprint 1 mantenemos un router minimo propio y sin dependencias externas adicionales.
 */
export function App() {
  const { user, loading } = useAuth()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  if (loading) {
    return (
      <main className="center-page">
        <div className="status-card">Cargando UniVibe...</div>
      </main>
    )
  }

  if (path === '/') {
    navigate(user ? homePathForRole(user.role) : '/login')
    return null
  }

  if (path === '/login') {
    if (user) {
      navigate(homePathForRole(user.role))
      return null
    }
    return <LoginPage />
  }

  if (path === '/register') {
    if (user) {
      navigate(homePathForRole(user.role))
      return null
    }
    return <RegisterPage />
  }

  if (path === '/student') {
    return (
      <ProtectedView allowedRoles={['STUDENT']}>
        <StudentDashboardPage />
      </ProtectedView>
    )
  }

  if (path === '/organizer') {
    return (
      <ProtectedView allowedRoles={['ORGANIZER']}>
        <OrganizerDashboardPage />
      </ProtectedView>
    )
  }

  if (path === '/admin') {
    return (
      <ProtectedView allowedRoles={['ADMIN']}>
        <AdminDashboardPage />
      </ProtectedView>
    )
  }

  if (path === '/admin/users') {
    return (
      <ProtectedView allowedRoles={['ADMIN']}>
        <UserManagementPage />
      </ProtectedView>
    )
  }

  if (path === '/forbidden') {
    return <ForbiddenPage />
  }

  return <NotFoundPage />
}
