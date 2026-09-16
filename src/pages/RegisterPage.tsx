import { useState, type FormEvent } from 'react'
import { authService } from '../features/auth/authService'
import { ApiError } from '../shared/api/apiClient'
import { navigate } from '../shared/navigation/navigation'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setFieldErrors({})

    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden')
      return
    }

    setSubmitting(true)

    try {
      await authService.register({ name, email, password })
      navigate('/login?registered=1')
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        setFieldErrors(err.validationErrors)
      } else {
        setError('No fue posible crear la cuenta')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero auth-hero-register">
        <div className="brand-lockup">
          <span className="brand-mark brand-mark-large">U</span>
          <span>UniVibe</span>
        </div>
        <p className="eyebrow">RF01 · Registro de usuario</p>
        <h1>Tu cuenta comienza como Estudiante.</h1>
        <p className="hero-copy">
          El rol se asigna automaticamente. Organizador y Administrador solo pueden ser asignados
          posteriormente por un administrador.
        </p>
      </section>

      <section className="auth-card-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Crear cuenta</p>
            <h2>Registrate en UniVibe</h2>
            <p>Completa los datos obligatorios para continuar.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <label className="field">
            <span>Nombre completo</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
            />
            {fieldErrors.name && <small className="field-error">{fieldErrors.name}</small>}
          </label>

          <label className="field">
            <span>Correo electronico</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={150}
              autoComplete="email"
              required
            />
            {fieldErrors.email && <small className="field-error">{fieldErrors.email}</small>}
          </label>

          <label className="field">
            <span>Contrasena</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
              required
            />
            {fieldErrors.password && (
              <small className="field-error">{fieldErrors.password}</small>
            )}
          </label>

          <label className="field">
            <span>Confirmar contrasena</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
              required
            />
          </label>

          <button className="button button-primary button-full" disabled={submitting}>
            {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          <p className="auth-switch">
            ¿Ya tienes cuenta?{' '}
            <button type="button" className="link-button" onClick={() => navigate('/login')}>
              Inicia sesion
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}
