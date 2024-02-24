import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TbBaselineDensityLarge } from "react-icons/tb";
import { ReactNode } from "react"
import ButtonTheme from "./ButtonTheme";

export default function Sidebar({ children }: { children?: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>
        <TbBaselineDensityLarge />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-slate-900 text-slate-50">
        {
          children ??
          <SheetHeader>
            <SheetTitle className="text-secondary">Are you absolutely sure?</SheetTitle>
            <SheetDescription className="text-secondary">
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        }
        <article className="h-full w-full flex justify-between">
          <ButtonTheme />
        </article>
      </SheetContent>
    </Sheet>

  )
}
