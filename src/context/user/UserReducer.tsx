import { IUserState } from "./UserProvider"

type UserActionType =
  | { type: "SET_IS_LOADING", payload: boolean }
  | { type: "SET_IS_ERROR", payload: boolean }
  | { type: "SET_USER", payload: null }
  | { type: "SET_ACCOUNT", payload: null }

export function UserReducer(state: IUserState, action: UserActionType): IUserState {
  switch (action.type) {
    case 'SET_IS_ERROR': {
      return {
        ...state,
        isError: action.payload
      }
    }
    case 'SET_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case 'SET_ACCOUNT': {
      return {
        ...state,
        account: action.payload
      }
    }
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload
      }
    }
    default:
      return state
  }
}