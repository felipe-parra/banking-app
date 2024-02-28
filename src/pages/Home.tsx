import { useEffect } from 'react'
import { InstitutionType } from '@/types/belvo.types'
import { useBankingContext } from '@/context/banking/useBankingContext'
import { Card } from '@/components/ui/card'
import { ConnectForm } from '@/components/ConnectForm'
import PageLoader from './PageLoader'

export default function HomePage() {
  const { institutions, isLoading, doGetInstitutions } = useBankingContext()



  useEffect(() => {
    doGetInstitutions()


  }, [])
  if (isLoading) {
    return (
      <PageLoader />
    )
  }
  return (
    <section>

      <article className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden'>
        {
          institutions.length > 0
          && institutions.map((institution, index) => (
            <InstitutionItem key={index} institution={institution} />
          ))

        }
      </article>
    </section>
  )
}


function InstitutionItem({ institution }: { institution: InstitutionType }) {
  return (
    <Card className='w-[350px] fade-in duration-300 h-full max-h-64 md:w-full relative flex flex-col justify-between p-4'>
      <div className='absolute top-3 right-3 z-10'>
        <FlagItem countryCode={institution.country_code} />
      </div>
      {
        institution.logo ?

          <img width={"100%"} className='w-full h-full max-w-sm invert-0 dark:bg-slate-500  dark:rounded-lg dark:z-0' src={institution.logo} alt={institution.name} />
          : <div className='w-full h-full max-w-sm bg-slate-500 rounded-lg dark:z-0 flex items-center justify-center text-secondary text-2xl'>{institution.display_name}</div>
      }
      <h3 className='mb-2'>{institution.display_name}</h3>
      <ConnectForm institution={institution} />
    </Card>
  )
}

function FlagItem({ countryCode }: { countryCode: string }) {
  switch (countryCode) {
    case 'MX':
      return <span className='fi fi-mx'></span>
    case 'CO':
      return <span className='fi fi-co'></span>
    case 'BR':
      return <span className='fi fi-br'></span>
    default:
      return <span className='fi fi-xx'></span>
  }
}