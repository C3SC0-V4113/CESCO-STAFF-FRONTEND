"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Session } from "next-auth";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { cn } from "@/lib/utils";

interface Props {
  session: Session;
}

export const SideNavbar = ({ session }: Props) => {
  const matches = useMediaQuery("(min-width: 1024px)");

  const navUserItems = [
    {
      label: "Inicio",
      href: "/dashboard",
    },
    {
      label: "Clientes",
      href: "/dashboard/clients",
    },
    {
      label: "Eventos",
      href: "/dashboard/events",
    },
  ];

  const navAdminItems = [
    {
      label: "Inicio",
      href: "/dashboard",
    },
    {
      label: "Clientes",
      href: "/dashboard/clients",
    },
    {
      label: "Usuarios",
      href: "/dashboard/users",
    },
    {
      label: "Eventos",
      href: "/dashboard/events",
    },
  ];

  return (
    <header
      className={cn(
        "flex bg-primary text-primary-foreground",
        matches === true
          ? "h-full w-80"
          : "absolute top-2 left-2 p-2 rounded-md"
      )}
    >
      {matches ? (
        <DesktopNav
          navItems={
            session.user.role === "admin" ? navAdminItems : navUserItems
          }
        />
      ) : (
        <MobileNav
          navItems={
            session.user.role === "admin" ? navAdminItems : navUserItems
          }
        />
      )}
    </header>
  );
};
