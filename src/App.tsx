import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import AccountPage from './pages/Account'
import BankPage from './pages/Bank'
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/bank" element={<BankPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
