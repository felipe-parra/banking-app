import { AccountResponseType, InstitutionType, TransactionType } from "@/types/belvo.types"
import { createContext } from "react"

type BankingContextType = {
  institutions: InstitutionType[]
  selectedInstitutions: InstitutionType | null
  transactions: TransactionType[]
  accounts: AccountResponseType[]
  isLoading: boolean
  isError: boolean

  // Methods
  doGetInstitutions: () => void
  doSetSelectedInstitution: (institution: InstitutionType) => void
  doGetTransactions: (lin: string) => void
  doGetAccounts: () => void
  doLinkAccount: (formData: { [key: string]: string }, institution: string) => void
}

export const BankingContext = createContext({} as BankingContextType)