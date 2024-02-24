import { useContext } from "react"
import { UserContext } from "./UserContext"

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider')
  }
  return context
}