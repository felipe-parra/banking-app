import { type ReactNode, useReducer } from 'react'
import { AccountResponseType, InstitutionType, TransactionType } from "@/types/belvo.types"
import { BankingContext } from './BankingContext'
import { BankingReducer } from './BankingReducer'
import { createLinkApi, getAccountsApi, getAllInstitutionsApi, getTransactionsApi } from '@/api/belvoApi'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { toast } from 'sonner'

export interface IBankingState {
  institutions: InstitutionType[]
  selectedInstitutions: InstitutionType | null
  transactions: TransactionType[]
  accounts: AccountResponseType[]
  isLoading: boolean
  isError: boolean
  balance: number | null

}

const INITIAL_STATE: IBankingState = {
  institutions: [],
  selectedInstitutions: null,
  transactions: [],
  isLoading: false,
  isError: false,
  accounts: [],
  balance: null
}

export const BankingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(BankingReducer, INITIAL_STATE)
  const { storedValue: links, addItem } = useLocalStorage("links")

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
      dispatch({ type: "SET_IS_LOADING", payload: false })

    }
  }
  const calculateBalance = (transactions: TransactionType[]): number => {
    let balance = 0;
    for (const transaction of transactions) {
      if (transaction.type === "INFLOW") {
        balance += transaction.amount;
      } else if (transaction.type === "OUTFLOW") {
        balance -= transaction.amount;
      }
    }
    return balance;
  }
  const doGetTransactions = async (accountId: string, page?: number) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

      const transactions = await getTransactionsApi({ link: accountId, page: page ?? 1 })

      console.log({ transactions })

      dispatch({ type: "SET_TRANSACTIONS", payload: transactions })
      const balance = calculateBalance(transactions)

      dispatch({ type: "SET_BALANCE", payload: balance })
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })

      toast.error("Error", {
        description: "Something wen't wrong, try again",
        action: {
          label: "dismiss",
          onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
        },
      })
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })

    }
  }

  const doGetAccounts = async () => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })

      if (!links) {
        toast.error("No accounts founded",)
      }
      const newAccounts = state.accounts
      console.log("[link]:", links.length, links[0])
      links.map(async (link: string) => {

        const accounts = await getAccountsApi({ link })
        console.log({ accounts })

        if (!accounts) {
          return
        }

        accounts.map((account: AccountResponseType) =>
          newAccounts?.push(account)
        )
      })

      if (!newAccounts) {
        throw new Error("No accounts found")
      }
      console.log({ newAccounts })
      dispatch({ type: "SET_ACCOUNTS", payload: newAccounts })

    } catch (error) {
      console.error({ error })
      dispatch({ type: "SET_IS_ERROR", payload: true })

      toast.error("Error", {
        description: "Something wen't wrong, try again",
        action: {
          label: "dismiss",
          onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
        },
      })

    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })

    }
  }

  const doLinkAccount = async (formData: { [key: string]: string }, institution: string) => {
    try {
      dispatch({ type: "SET_IS_ERROR", payload: false })
      dispatch({ type: "SET_IS_LOADING", payload: true })
      const fullFormdata = { ...formData, ["institution"]: institution }

      const response = await createLinkApi(fullFormdata)
      if (!response) {
        alert("Error creating link")
      }

      addItem(response.id)

      toast.success("Success", {
        description: "Account linked",
        action: {
          label: "dismiss",
          onClick: () => dispatch({ type: "SET_IS_ERROR", payload: false }),
        },
      })
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", payload: true })

    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false })

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
        doGetAccounts,
        doLinkAccount,
      }}
    >
      {children}
    </BankingContext.Provider>
  )
}