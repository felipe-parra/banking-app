import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
export default function MainLayout() {
  return (
    <section className='main-container'>
      <Navbar />
      <article className='outlet-container'>
        <Outlet />
      </article>
    </section>
  )
}
