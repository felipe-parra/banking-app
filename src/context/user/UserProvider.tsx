import { ReactNode, useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";
import { LoginFormType, UserType } from "@/interfaces/user.interface";
import { doLoginUserApi, doRegisterUserApi } from "@/api/authApi";
import { toast } from 'sonner'
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { axiosWithAuthToken } from "@/utils/baseAxios";
export interface IUserState {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  account: null;
}

const INITIAL_STATE: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  account: null,
  token: null
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)
  const { addItem: setLocalToken, clear } = useLocalStorage("token")

  const doLogin = async (user: LoginFormType) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

      const loggedUser = await doLoginUserApi(user)
      console.log("[TOKEN]", loggedUser.token)
      if (!loggedUser || !loggedUser.user || !loggedUser.token) {
        throw new Error("Error")
      }

      clear()
      await setLocalToken(loggedUser.token)

      axiosWithAuthToken(loggedUser.token)

      dispatch({ type: "SET_USER", payload: loggedUser.user })
      dispatch({ type: "SET_TOKEN", payload: loggedUser.token })
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })
      {
        toast("Error", {
          description: "Something wen't wrong with your login, try again",
          action: {
            label: "dismiss",
            onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
          },
        })
      }
      setTimeout(() => {
        dispatch({ type: "SET_IS_ERROR", payload: false })

      }, 5000)
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })
    }
  }

  const doRegister = async (user: UserType) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

      const loggedUser = await doRegisterUserApi(user)

      if (!loggedUser || !loggedUser.user || !loggedUser.token) {
        throw new Error("Error")
      }

      console.log({ loggedUser })
      clear()
      setLocalToken(loggedUser.token)

      axiosWithAuthToken(loggedUser.token)

      dispatch({ type: "SET_USER", payload: loggedUser.user })
      dispatch({ type: "SET_TOKEN", payload: loggedUser.token })
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })
      {
        toast("Error", {
          description: "Something wen't wrong with your register, try again",
          action: {
            label: "dismiss",
            onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
          },
        })
      }
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })
    }
  }

  const setUser = async (user: UserType) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
      dispatch({ type: "SET_USER", payload: user })
    } catch (error) {

      dispatch({ type: "SET_IS_ERROR", payload: true })
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })
      {
        toast("Error", {
          description: "Something wen't wrong, try again",
          action: {
            label: "dismiss",
            onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
          },
        })
      }
    }
  }
  const setAccount = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })
      {
        toast("Error", {
          description: "Something wen't wrong, try again",
          action: {
            label: "dismiss",
            onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
          },
        })
      }
    } finally {

      dispatch({ type: "SET_IS_LOADING", payload: false })
    }
  }

  const doLogout = () => {
    clear()
    localStorage.clear()
    dispatch({ type: "SET_USER", payload: null })
    dispatch({ type: "SET_TOKEN", payload: null })
  }
  return (
    <UserContext.Provider

      value={{
        ...state,

        // Methods
        setAccount,
        setUser,
        doLogin,
        doRegister,
        doLogout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}