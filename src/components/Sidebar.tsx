import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TbBaselineDensityLarge } from "react-icons/tb";
import ButtonTheme from "./ButtonTheme";
import { NavLinks } from "@/constants/nav-links";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/user/useUserContext";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";


export default function Sidebar() {
  const { user } = useUserContext()
  return (
    <Sheet>
      <SheetTrigger>
        <TbBaselineDensityLarge />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-primary text-slate-50 dark:bg-slate-900">
        <SheetHeader>
          <SheetTitle className="text-white dark:text-primary">Bank</SheetTitle>
          <SheetDescription className="text-slate-50 dark:text-primary/70 text-justify my-2">
            Best app to handle your accounts
          </SheetDescription>
          <article>
            <section className="">
              {NavLinks.map(({ id, to, name }, index) => {
                if (user?.name !== undefined && id === "login") return null
                return (
                  <Button key={"nav-link-" + id + index} variant={"link"} className="w-full max-w-sm text-slate-50 dark:text-primary/70" asChild>
                    <Link to={to}>
                      {name}
                    </Link>
                  </Button>
                )
              })}
            </section>
          </article>

        </SheetHeader>

        <article className="h-96 w-full flex flex-col items-start justify-between mt-10">
          <ButtonTheme />
          <Button className="text-slate-50 dark:text-primary/70" variant={"ghost"} asChild>
            <a href="https://github.com/felipe-parra/banking-app">
              <FaGithub />
              <span className="mx-2">
                Github
              </span>
            </a>
          </Button>
        </article>
      </SheetContent>
    </Sheet>

  )
}
