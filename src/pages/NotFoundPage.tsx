import { navigate } from '../shared/navigation/navigation'

export function NotFoundPage() {
  return (
    <main className="center-page">
      <div className="status-card">
        <span className="status-code">404</span>
        <h1>Pagina no encontrada</h1>
        <p>La ruta solicitada no pertenece al incremento actual de UniVibe.</p>
        <button className="button button-primary" onClick={() => navigate('/')}>
          Ir al inicio
        </button>
      </div>
    </main>
  )
}
