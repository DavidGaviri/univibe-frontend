import { AppShell } from '../shared/components/AppShell'

export function StudentDashboardPage() {
  return (
    <AppShell
      title="Panel de Estudiante"
      subtitle="Tu cuenta esta lista. Las funcionalidades de eventos e inscripciones se incorporan en el Sprint 2."
    >
      <section className="dashboard-grid">
        <article className="info-card">
          <span className="card-icon">01</span>
          <h3>Cuenta activa</h3>
          <p>Tu registro fue creado con el rol Estudiante, tal como exige RF01.</p>
        </article>
        <article className="info-card">
          <span className="card-icon">02</span>
          <h3>Acceso protegido</h3>
          <p>La sesion identifica tu usuario y habilita solamente las funciones de tu rol.</p>
        </article>
      </section>
    </AppShell>
  )
}
