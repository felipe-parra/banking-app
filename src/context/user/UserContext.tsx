import { createContext } from "react"
import { LoginFormType, UserType } from '../../interfaces/user.interface';
import { AccountResponseType } from "@/types/belvo.types";


type UserContextType = {
  user: UserType | null
  token: string | null
  isLoading: boolean
  isError: boolean
  account: AccountResponseType | null

  // Methods
  doLogin: (user: LoginFormType) => void
  doRegister: (user: UserType) => void
  setUser: (user: UserType) => void
  setAccount: () => void
  doLogout: () => void
}

export const UserContext = createContext({} as UserContextType)
