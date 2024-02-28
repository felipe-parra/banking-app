import { getTransactionsApi } from "@/api/belvoApi"
import { Button } from "@/components/ui/button"
import { TransactionType } from "@/types/belvo.types"
import { useEffect, useState } from "react"
import { MdArrowBack } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"


export default function TransactionsPage() {
  const [page, setPage] = useState(1)
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const { accountId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getTransactions = async (id: string) => {
      const res = await getTransactionsApi({ link: id.slice(0, -1), page })
      console.log({ res })
      return
    }

    if (!accountId) {
      return
    }

    // getTransactions("e86006cc-2d46-4833-856a-ae78b1a87132")
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
  return (
    <section className="w-full h-svh flex flex-col items-start justify-start text-3xl relative">
      <Button onClick={() => navigate(-1)}>
        <MdArrowBack />
      </Button>

      <span className="text-red-500">Transactions</span>

      <article className="flex flex-col">
        {accountId}

        {
          transactions.length && transactions.map((transaction) => (
            <div key={transaction.id}>
              {transaction.id}
            </div>
          ))
        }
      </article>
    </section>
  )
}
