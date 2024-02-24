import { ReactNode, useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";

export interface IUserState {
  user: null;
  isLoading: boolean;
  isError: boolean;
  account: null;
}



const INITIAL_STATE: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  account: null
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

  const doLogin = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
    } catch (error) {

      dispatch({ type: "SET_IS_ERROR", payload: true })
    } finally {

      dispatch({ type: "SET_IS_LOADING", payload: false })
    }
  }
  const setUser = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
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
        doLogin
      }}
    >
      {children}
    </UserContext.Provider>
  )
}