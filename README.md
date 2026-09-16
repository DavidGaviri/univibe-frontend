# UniVibe Frontend - Sprint 1

Frontend React + TypeScript + Vite para RF01, RF02 y RF03.

## Arquitectura
Se usa una estructura orientada a features:
- `app/`: composicion y enrutamiento del MVP.
- `features/auth/`: autenticacion y sesion.
- `features/users/`: gestion administrativa de usuarios.
- `pages/`: pantallas.
- `shared/`: cliente HTTP, navegacion y componentes reutilizables.

## Ejecutar
```powershell
npm install
npm run dev
```

Por defecto consume `http://localhost:8080/api`.
Puedes copiar `.env.example` a `.env` para cambiar `VITE_API_URL`.

## Flujo Sprint 1
1. Registro publico -> siempre crea STUDENT.
2. Login -> redireccion segun rol.
3. ADMIN -> panel de usuarios y cambio de rol.
4. Acceso a rutas protegido por rol en frontend y, de forma autoritativa, tambien en backend.
