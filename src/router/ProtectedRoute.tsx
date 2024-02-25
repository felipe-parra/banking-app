import { useUserContext } from '@/context/user/useUserContext'
import PageLoader from '@/pages/PageLoader'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface Props {
  path?: string
  replace?: boolean
}

export default function ProtectedRoute({ path = "/loading", replace = false }: Props) {

  const { token, isLoading } = useUserContext()
  const location = useLocation()


  if (isLoading) {
    return <PageLoader />
  }

  if (token === null) {
    return <Navigate to={path} replace={replace} state={{ path: location.pathname }} />
  }

  return <Outlet />
}