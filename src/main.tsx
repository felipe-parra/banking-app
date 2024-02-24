import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WithRouter from './router/index.tsx'
import WithContext from './context/index.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WithRouter>
      <WithContext>
        <App />
      </WithContext>
    </WithRouter>
  </React.StrictMode>,
)
