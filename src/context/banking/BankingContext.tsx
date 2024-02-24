import { AccountResponseType, InstitutionType, TransactionType } from "@/types/belvo.types"
import { createContext } from "react"

type BankingContextType = {
  institutions: InstitutionType[]
  selectedInstitutions: InstitutionType | null
  transactions: TransactionType[] | null
  account: AccountResponseType[] | null
  isLoading: boolean
  isError: boolean

  // Methods
  doGetInstitutions: () => void
  doSetSelectedInstitution: (institution: InstitutionType) => void
  doGetTransactions: () => void
  doGetAccounts: () => void
}

export const BankingContext = createContext({} as BankingContextType)