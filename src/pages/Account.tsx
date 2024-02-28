import { AccountResponseType } from "@/types/belvo.types"

import { Suspense, useEffect } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { MdCurrencyExchange } from "react-icons/md";
import PageLoader from "./PageLoader"
import { useBankingContext } from "@/context/banking/useBankingContext"



export default function AccountPage() {
  const { accounts, isLoading, doGetAccounts } = useBankingContext()

  useEffect(() => {
    doGetAccounts()
  }, [])

  if (isLoading) {
    return (
      <PageLoader />
    )
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <article className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden'>

        {
          accounts.length > 0 && accounts.map((item, index) => (
            <InstitutionItem key={"account-key-" + index} account={item} />

          ))
        }
      </article>
    </Suspense>
  )
}


function InstitutionItem({ account }: { account: AccountResponseType }) {
  return (
    <Card className='w-full fade-in duration-300 h-full max-h-64 md:w-full relative flex flex-col justify-between p-4'>
      <h3 className='mb-2'>{account.name}</h3>
      <p className="text-2xl">{account.institution.name}</p>
      <p className="text-2xl flex items-center my-4">

        <span>
          {
            new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: account.currency,
              minimumFractionDigits: 2,
            }).format(account.balance.available)
          }
        </span>
      </p>
      <p className="my-2 flex items-center justify-start">
        <span className="flex items-center my-2">
          <MdCurrencyExchange className="mx-2" />
          <Badge>{account.currency}</Badge>
        </span>

      </p>
      <Button asChild>
        <Link to={`/transactions/${(account.link)}`}>
          See transactions
        </Link>
      </Button>
    </Card>
  )
}
