import { useAuth } from '../features/auth/AuthContext'
import { homePathForRole, navigate } from '../shared/navigation/navigation'

export function ForbiddenPage() {
  const { user } = useAuth()

  return (
    <main className="center-page">
      <div className="status-card">
        <span className="status-code">403</span>
        <h1>Permisos insuficientes</h1>
        <p>Tu rol actual no tiene autorizacion para acceder a esta funcionalidad.</p>
        <button
          className="button button-primary"
          onClick={() => navigate(user ? homePathForRole(user.role) : '/login')}
        >
          Volver
        </button>
      </div>
    </main>
  )
}
