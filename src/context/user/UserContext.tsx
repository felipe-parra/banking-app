import { createContext } from "react"


type UserContextType = {
  user: null
  isLoading: boolean
  isError: boolean
  account: null

  // Methods
  doLogin: () => void
  setUser: () => void
  setAccount: () => void
}

export const UserContext = createContext({} as UserContextType)
