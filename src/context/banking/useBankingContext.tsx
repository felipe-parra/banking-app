import { useContext } from "react"
import { BankingContext } from "./BankingContext"

export const useBankingContext = () => {
  const context = useContext(BankingContext)

  if (context === undefined) {
    throw new Error('useBankingContext must be used within a BankingContextProvider')
  }

  return context
}