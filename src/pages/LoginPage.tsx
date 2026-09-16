import { useState, type FormEvent } from 'react'
import { useAuth } from '../features/auth/AuthContext'
import { ApiError } from '../shared/api/apiClient'
import { homePathForRole, navigate } from '../shared/navigation/navigation'

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const registered = new URLSearchParams(window.location.search).get('registered') === '1'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const user = await login({ email, password })
      navigate(homePathForRole(user.role))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No fue posible iniciar sesion')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero">
        <div className="brand-lockup">
          <span className="brand-mark brand-mark-large">U</span>
          <span>UniVibe</span>
        </div>
        <p className="eyebrow">Eventos universitarios en un solo lugar</p>
        <h1>Conecta con la vida de tu universidad.</h1>
        <p className="hero-copy">
          Este primer incremento permite registrarse, iniciar sesion y acceder a una experiencia
          diferente segun el rol asignado.
        </p>
      </section>

      <section className="auth-card-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Bienvenido de nuevo</p>
            <h2>Iniciar sesion</h2>
            <p>Ingresa con las credenciales registradas en UniVibe.</p>
          </div>

          {registered && (
            <div className="alert alert-success">Cuenta creada. Ya puedes iniciar sesion.</div>
          )}

          {error && <div className="alert alert-error">{error}</div>}

          <label className="field">
            <span>Correo electronico</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@universidad.edu"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Contrasena</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimo 8 caracteres"
              autoComplete="current-password"
              required
            />
          </label>

          <button className="button button-primary button-full" disabled={submitting}>
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="auth-switch">
            ¿Aun no tienes cuenta?{' '}
            <button type="button" className="link-button" onClick={() => navigate('/register')}>
              Registrate
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}
