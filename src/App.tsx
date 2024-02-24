import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import AccountPage from './pages/Account'
import BankPage from './pages/Bank'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'
import './App.css'
import NotFound from './components/NotFound'
import ProtectedRoute from './router/ProtectedRoute'

export default function App() {
  return (

    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route
          element={<ProtectedRoute element={<AuthLayout />} />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/bank" element={<BankPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>

  )
}
