import type { ReactNode } from 'react'
import { useAuth } from '../../features/auth/AuthContext'
import { navigate } from '../navigation/navigation'

interface AppShellProps {
  title: string
  subtitle: string
  children: ReactNode
}

/** Marco comun de las pantallas autenticadas. */
export function AppShell({ title, subtitle, children }: AppShellProps) {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="app-background">
      <header className="topbar">
        <button className="brand-button" onClick={() => navigate('/')}>
          <span className="brand-mark">U</span>
          <span>UniVibe</span>
        </button>

        <div className="topbar-user">
          <div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <button className="button button-ghost" onClick={handleLogout}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <main className="page-container">
        <div className="page-heading">
          <p className="eyebrow">Sprint 1</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  )
}
