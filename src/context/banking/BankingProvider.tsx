import { type ReactNode, useReducer } from 'react'
import { AccountResponseType, InstitutionType, TransactionType } from "@/types/belvo.types"
import { BankingContext } from './BankingContext'
import { BankingReducer } from './BankingReducer'
import { getAllInstitutionsApi } from '@/api/belvoApi'

export interface IBankingState {
  institutions: InstitutionType[]
  selectedInstitutions: InstitutionType | null
  transactions: TransactionType[] | null
  account: AccountResponseType[] | null
  isLoading: boolean
  isError: boolean
}

const INITIAL_STATE: IBankingState = {
  institutions: [],
  selectedInstitutions: null,
  transactions: [],
  isLoading: false,
  isError: false,
  account: null
}

export const BankingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(BankingReducer, INITIAL_STATE)


  const doGetInstitutions = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
      const institutions = await getAllInstitutionsApi()

      if (!institutions) {
        throw new Error("No institutions found")
      }
      dispatch({ type: "SET_INSTITUTIONS", payload: institutions })

    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })

    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })

    }
  }
  const doSetSelectedInstitution = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })

    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: true })

    }
  }
  const doGetTransactions = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })

    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: true })

    }
  }

  const doGetAccounts = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })

    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: true })

    }
  }

  return (
    <BankingContext.Provider
      value={{
        ...state,

        // Methods
        doGetInstitutions,
        doGetTransactions,
        doSetSelectedInstitution,
        doGetAccounts
      }}
    >
      {children}
    </BankingContext.Provider>
  )
}