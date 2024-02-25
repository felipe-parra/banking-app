import { useUserContext } from '@/context/user/useUserContext'
import PageLoader from '@/pages/PageLoader'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { toast } from 'sonner';

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
    {
      toast("Access denied", {
        description: "You need to be logged before to acces this route",
        action: {
          label: "dismiss",
          onClick: () => console.log("Undo"),
        },
      })
    }
    return <Navigate to={path} replace={replace} state={{ path: location.pathname }} />
  }

  return <Outlet />
}