const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

interface ApiErrorBody {
  message?: string
  validationErrors?: Record<string, string> | null
}

/** Error de infraestructura que conserva el status HTTP para que la UI pueda decidir que hacer. */
export class ApiError extends Error {
  status: number
  validationErrors: Record<string, string>

  constructor(
    message: string,
    status: number,
    validationErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.validationErrors = validationErrors
  }
}

/**
 * Unico punto de acceso HTTP del frontend.
 * Centraliza URL base, JSON, cookie de sesion y tratamiento basico de errores (DRY).
 */
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (response.status === 204) {
    return undefined as T
  }

  const body = (await response.json().catch(() => ({}))) as ApiErrorBody | T

  if (!response.ok) {
    const errorBody = body as ApiErrorBody
    throw new ApiError(
      errorBody.message ?? 'Ocurrio un error al procesar la solicitud',
      response.status,
      errorBody.validationErrors ?? {},
    )
  }

  return body as T
}
