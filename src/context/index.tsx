import { ReactNode } from "react";
import { UserProvider } from "./user/UserProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { BankingProvider } from "./banking/BankingProvider";

export default function WithContext({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme={"dark"} storageKey="vite-ui-theme">
      <UserProvider>
        <BankingProvider>
          {children}
        </BankingProvider>
      </UserProvider>
    </ThemeProvider>
  )
}