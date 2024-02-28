import { AccountResponseType, InstitutionType, TransactionType } from "@/types/belvo.types";
import { IBankingState } from "./BankingProvider";

type BankingActionType =
  | { type: "SET_IS_LOADING", payload: boolean }
  | { type: "SET_IS_ERROR", payload: boolean }
  | { type: "SET_BALANCE", payload: number | null }
  | { type: "SET_SELECTED_INSTITUTION", payload: InstitutionType }
  | { type: "SET_INSTITUTIONS", payload: InstitutionType[] }
  | { type: "SET_TRANSACTIONS", payload: TransactionType[] }
  | { type: "SET_ACCOUNTS", payload: AccountResponseType[] }

export function BankingReducer(state: IBankingState, action: BankingActionType): IBankingState {
  switch (action.type) {
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case "SET_IS_ERROR": {
      return {
        ...state,
        isError: action.payload
      }
    }
    case "SET_INSTITUTIONS": {
      return {
        ...state,
        institutions: action.payload
      }
    }
    case "SET_SELECTED_INSTITUTION": {
      return {
        ...state,
        selectedInstitutions: action.payload
      }
    }
    case "SET_TRANSACTIONS": {
      return {
        ...state,
        transactions: action.payload
      }
    }
    case "SET_ACCOUNTS": {
      return {
        ...state,
        accounts: action.payload
      }
    }
    case "SET_BALANCE": {
      return {
        ...state,
        balance: action.payload
      }
    }
    default:
      return state
  }
}