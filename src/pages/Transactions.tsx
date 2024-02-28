import { Button } from "@/components/ui/button"
import { useBankingContext } from "@/context/banking/useBankingContext"
import { useEffect, useState } from "react"
import { MdArrowBack } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import PageLoader from "./PageLoader"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FormatNumber } from "@/utils"
import { cn } from "@/lib/utils"


export default function TransactionsPage() {
  const [page, setPage] = useState(1)
  const { accountId } = useParams()
  const { transactions, balance, isLoading, doGetTransactions } = useBankingContext()
  const navigate = useNavigate()

  useEffect(() => {
    const getTransactions = async (id: string) => {

      await doGetTransactions(id, page)
      return
    }

    if (!accountId) {
      return
    }

    getTransactions(accountId)
  }, [accountId])

  if (!accountId) {
    return (
      <section className="w-full h-svh flex items-center justify-center text-3xl">
        <span className="text-red-500">Transactions</span>
        <span className="text-red-500">No Account Id</span>
      </section>
    )
  }

  if (isLoading) {
    return (
      <PageLoader />
    )
  }
  return (
    <section className="w-full h-svh flex flex-col items-start justify-start text-3xl relative">
      <Button onClick={() => navigate(-1)}>
        <MdArrowBack />
      </Button>
      <article className="flex items-center justify-center w-full">
        <h3 className="text-3xl text-center">Transactions</h3>
      </article>
      <article className="w-full flex items-center justify-around">
        <h5>Balance</h5>
        <p>{FormatNumber(balance ?? 0, transactions[0]?.currency ?? "MXN")}{" " + transactions[0]?.currency ?? "MXN"}</p>
      </article>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:flex md:items-end md:justify-center md:h-full">Method</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            transactions.length ? transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.internal_identification}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell className="hidden md:flex">{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className={cn(
                  "text-right",
                  transaction.type === "OUTFLOW"
                    ? "text-red-500" : "text-green-500"
                )}>

                  {transaction.type === "OUTFLOW" ? "-" : "+"}{" "}
                  {
                    FormatNumber(transaction.amount, transaction.currency ?? "MXN")
                  }
                </TableCell>
              </TableRow>
            ))
              : null
          }
        </TableBody>
      </Table>
    </section>
  )
}
