import { useEffect, useState } from 'react'
import axios from 'axios'
import { ResultInstitutionType } from '@/types/belvo.types'

export default function HomePage() {
  const [page, setPage] = useState(1)
  const [institutions, setInstitutions] = useState<ResultInstitutionType[]>([])


  useEffect(() => {

    const getInstitutions = async () => {
      const { data } = await axios({
        method: "GET",
        url: "http://localhost:65016/api/v1/belvo/institutions?page=" + page,
        timeout: 60000 * 60 * 24
      })

      setInstitutions(data.results)
      return
    }
    getInstitutions()

    return () => {
      getInstitutions
    }
  }, [page])

  return (
    <section>
      <article>
        {
          institutions.length > 0
            ? institutions.map((institution, index) => <p key={"ins-" + index}>{institution?.display_name ?? "Banki"}</p>)
            : <p>Nothing here</p>
        }
      </article>
    </section>
  )
}
