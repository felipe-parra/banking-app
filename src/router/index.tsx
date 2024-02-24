import { ReactNode } from "react";
import { BrowserRouter } from 'react-router-dom'

export default function WithRouter({ children }: { children?: ReactNode }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}
