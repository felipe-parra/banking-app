import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { MdArrowBack } from 'react-icons/md'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className="w-full h-svh flex flex-col items-center justify-center">
      <h3 className="text-primary my-4 text-3xl">
        404 | Page Not Founded
      </h3>
      <p>{"Sorry about that :'("}</p>
      <Button variant={"outline"} onClick={() => navigate(-1)}>
        <MdArrowBack />
      </Button>
    </section>
  )
}
