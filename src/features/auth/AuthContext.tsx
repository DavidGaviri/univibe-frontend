import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ApiError } from '../../shared/api/apiClient'
import { authService } from './authService'
import type { LoginPayload, User } from './types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Mantiene exclusivamente el estado de autenticacion compartido.
 * La logica HTTP permanece en authService, respetando separacion de responsabilidades.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const currentUser = await authService.me()
      setUser(currentUser)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setUser(null)
        return
      }
      throw error
    }
  }

  useEffect(() => {
    refreshUser()
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (payload: LoginPayload) => {
    const response = await authService.login(payload)
    setUser(response.user)
    return response.user
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, login, logout, refreshUser }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
