import { ReactNode } from "react";
import { UserProvider } from "./user/UserProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function WithContext({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme={"dark"} storageKey="vite-ui-theme">
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  )
}