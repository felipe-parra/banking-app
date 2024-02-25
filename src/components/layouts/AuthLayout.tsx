import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <section className='w-full h-full max-h-96'>
      <Outlet />
    </section>
  )
}
