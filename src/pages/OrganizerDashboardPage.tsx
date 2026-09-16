import { AppShell } from '../shared/components/AppShell'

export function OrganizerDashboardPage() {
  return (
    <AppShell
      title="Panel de Organizador"
      subtitle="El rol Organizador ya esta reconocido. La creacion y publicacion de eventos pertenece al Sprint 2."
    >
      <section className="dashboard-grid">
        <article className="info-card">
          <span className="card-icon">RF03</span>
          <h3>Rol aplicado</h3>
          <p>El administrador puede asignar este rol desde su panel de gestion de usuarios.</p>
        </article>
        <article className="info-card info-card-muted">
          <span className="card-icon">S2</span>
          <h3>Proximo incremento</h3>
          <p>Creacion, publicacion, consulta y detalle de eventos se desarrollan en Sprint 2.</p>
        </article>
      </section>
    </AppShell>
  )
}
