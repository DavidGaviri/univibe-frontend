import { AppShell } from '../shared/components/AppShell'
import { navigate } from '../shared/navigation/navigation'

export function AdminDashboardPage() {
  return (
    <AppShell
      title="Panel de Administracion"
      subtitle="Gestiona los roles fijos de UniVibe y verifica el control de acceso del Sprint 1."
    >
      <section className="dashboard-grid">
        <article className="info-card info-card-action">
          <span className="card-icon">RF03</span>
          <h3>Usuarios y roles</h3>
          <p>Consulta las cuentas registradas y cambia su rol entre Estudiante, Organizador y Administrador.</p>
          <button className="button button-primary" onClick={() => navigate('/admin/users')}>
            Gestionar usuarios
          </button>
        </article>

        <article className="info-card">
          <span className="card-icon">RBAC</span>
          <h3>Permisos activos</h3>
          <p>Esta pantalla y la gestion de usuarios solo son accesibles para el rol Administrador.</p>
        </article>
      </section>
    </AppShell>
  )
}
