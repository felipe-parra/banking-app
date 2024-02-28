import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.css'
import ProtectedRoute from './router/ProtectedRoute'
import PublicRoute from './router/PublicRoute'
import { Suspense, lazy } from 'react'
import NotFound from './components/NotFound';
import AuthLayout from './components/layouts/AuthLayout';
import { Toaster } from './components/ui/sonner';
import PageLoader from './pages/PageLoader';

export default function App() {
  const LoginPage = lazy(() => import('@/pages/Login'))
  const RegisterPage = lazy(() => import('@/pages/Register'))
  const HomePage = lazy(() => import('@/pages/Home'))
  const AccountPage = lazy(() => import('@/pages/Account'))
  const TransactionsPage = lazy(() => import('@/pages/Transactions'))

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            element={<PublicRoute path='/' replace={false} />}
          >
            <Route
              element={<AuthLayout />}
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>
          <Route
            element={<ProtectedRoute path={"/login"} replace={true} />}
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/accounts" element={<AccountPage />} />
            <Route path="/transactions/:accountId" element={<TransactionsPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Suspense>

  )
}
