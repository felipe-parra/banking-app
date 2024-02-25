import { useUserContext } from '@/context/user/useUserContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface PublicRoutesProps {
  path?: string
  replace?: boolean
}
interface LocationState {
  state: { path?: string }
}

export default function PublicRoutes({ path = "/", replace = true }: PublicRoutesProps) {
  const { token } = useUserContext()
  const { state }: LocationState = useLocation()

  const redirectTo = state?.path || path

  console.log({ redirectTo })

  return token !== null ? <Navigate to={redirectTo} replace={replace} /> : <Outlet />
}