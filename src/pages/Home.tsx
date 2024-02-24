import { useEffect } from 'react'
import { InstitutionType } from '@/types/belvo.types'
import { useBankingContext } from '@/context/banking/useBankingContext'

export default function HomePage() {
  const { institutions, isLoading, doGetInstitutions } = useBankingContext()



  useEffect(() => {
    doGetInstitutions()

  }, [])

  return (
    <section>
      {
        isLoading && <p>Loading...</p>
      }
      <article>
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
    <article>
      <img src={institution.logo} alt={institution.name} />
      <h3>{institution.name}</h3>
    </article>
  )
}