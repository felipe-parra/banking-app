import * as React from "react"
import { Link, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Sidebar from "./Sidebar"
import ButtonTheme from "./ButtonTheme"
import { useUserContext } from "@/context/user/useUserContext"
import { NavLinks } from "@/constants/nav-links"


export default function Navbar() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  return (
    <section className="navbar-container">
      <article className="flex-1" onClick={() => navigate("/")}>
        <h1>{user?.name ? "Hi " + user.name : "Bank"}</h1>
      </article>
      <article className="block md:hidden">
        <Sidebar />
      </article>
      <NavigationMenu className="hidden md:flex md:items-center md:justify-end md:w-full mx-2">
        <NavigationMenuList>
          {
            NavLinks.map(({ id, to, name }, index) => {
              if (user?.name !== undefined && id === "login") return null
              return (
                <NavigationMenuItem key={"nav-link-" + id + index}>
                  <Link to={to}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })
          }
        </NavigationMenuList>
      </NavigationMenu>
      <article className="md:block hidden">
        <ButtonTheme />
      </article>
    </section>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

