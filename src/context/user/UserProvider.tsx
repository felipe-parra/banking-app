import { ReactNode, useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";
import { LoginFormType, UserType } from "@/interfaces/user.interface";
import { doLoginUserApi, doRegisterUserApi } from "@/api/authApi";

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

  const doLogin = async (user: LoginFormType) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
      const loggedUser = await doLoginUserApi(user)
      console.log({ loggedUser })
      dispatch({ type: "SET_USER", payload: loggedUser.user })
      dispatch({ type: "SET_TOKEN", payload: loggedUser.token })
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })
    } finally {

      dispatch({ type: "SET_IS_LOADING", payload: false })
    }
  }

  const doRegister = async (user: UserType) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
      const loggedUser = await doRegisterUserApi(user)
      console.log({ loggedUser })
      dispatch({ type: "SET_USER", payload: loggedUser.user })
      dispatch({ type: "SET_TOKEN", payload: loggedUser.token })
    } catch (error) {

      dispatch({ type: "SET_IS_ERROR", payload: true })
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
    }
  }
  const setAccount = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
    } catch (error) {

      dispatch({ type: "SET_IS_ERROR", payload: true })
    } finally {

      dispatch({ type: "SET_IS_LOADING", payload: false })
    }
  }

  return (
    <UserContext.Provider

      value={{
        ...state,

        // Methods
        setAccount,
        setUser,
        doLogin,
        doRegister
      }}
    >
      {children}
    </UserContext.Provider>
  )
}