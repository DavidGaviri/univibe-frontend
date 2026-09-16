import { useEffect, useState } from 'react'
import type { Role, User } from '../features/auth/types'
import { userService } from '../features/users/userService'
import { ApiError } from '../shared/api/apiClient'
import { AppShell } from '../shared/components/AppShell'
import { navigate } from '../shared/navigation/navigation'

const ROLES: Role[] = ['STUDENT', 'ORGANIZER', 'ADMIN']

const roleLabel: Record<Role, string> = {
  STUDENT: 'Estudiante',
  ORGANIZER: 'Organizador',
  ADMIN: 'Administrador',
}

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState<number | null>(null)

  const loadUsers = async () => {
    try {
      setError('')
      setUsers(await userService.findAll())
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No fue posible cargar los usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleRoleChange = async (user: User, newRole: Role) => {
    if (newRole === user.role) return

    setSavingId(user.id)
    setError('')

    try {
      const updated = await userService.changeRole(user.id, newRole)
      setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No fue posible actualizar el rol')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <AppShell
      title="Gestion de usuarios y roles"
      subtitle="RF03 permite al administrador aplicar uno de los tres roles fijos definidos por el proyecto."
    >
      <div className="toolbar">
        <button className="button button-ghost" onClick={() => navigate('/admin')}>
          Volver al panel
        </button>
        <button className="button button-secondary" onClick={loadUsers}>
          Actualizar lista
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <section className="table-card">
        {loading ? (
          <p className="empty-state">Cargando usuarios...</p>
        ) : users.length === 0 ? (
          <p className="empty-state">Aun no hay usuarios registrados.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol actual</th>
                  <th>Cambiar rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role.toLowerCase()}`}>
                        {roleLabel[user.role]}
                      </span>
                    </td>
                    <td>
                      <select
                        value={user.role}
                        disabled={savingId === user.id}
                        onChange={(event) => handleRoleChange(user, event.target.value as Role)}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {roleLabel[role]}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AppShell>
  )
}
