import { useUserContext } from '@/context/user/useUserContext'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


export default function PrivateRoutes({ element }: { element: ReactNode }) {
  const { token } = useUserContext()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return element
}