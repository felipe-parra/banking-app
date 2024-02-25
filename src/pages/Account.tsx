import { getAccountsApi } from "@/api/belvoApi"
import LoaderComponent from "@/components/LoaderComponent"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { AccountResponseType } from "@/types/belvo.types"

import { useEffect, useState } from "react"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"



export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [accounts, setAccounts] = useState<AccountResponseType[]>([])
  const [localState] = useLocalStorage("links")

  useEffect(() => {
    const getAccounts = async () => {
      setIsLoading(true)
      localState.map(async (item: string) => {
        const account = await getAccountsApi(item)

        console.log({ account })
        setAccounts((prevState) => [...prevState, ...account.results])
      })
      setIsLoading(false)
    }

    getAccounts()
  }, [localState])

  console.log("[OUTSIDE", { accounts }, accounts[0])
  return (
    <section>
      {
        isLoading && <article className='w-full h-svh flex items-center justify-center'>
          <LoaderComponent />
        </article>
      }
      <article className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden'>

        {
          accounts.length > 0 && accounts.map((item, index) => (
            <InstitutionItem key={"account-key-" + index} account={item} />

          ))
        }
      </article>
    </section>
  )
}


function InstitutionItem({ account }: { account: AccountResponseType }) {
  return (
    <Card className='w-[350px] fade-in duration-300 h-full max-h-64 md:w-full relative flex flex-col justify-between p-4'>
      <h3 className='mb-2'>{account.name}</h3>
      <article>{account.institution.name}</article>
      <Label>{account.institution.type}</Label>

    </Card>
  )
}
