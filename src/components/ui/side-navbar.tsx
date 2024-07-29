"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Session } from "next-auth";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { cn } from "@/lib/utils";

interface Props {
  session: Session;
}

const navItems = [
  {
    label: "Inicio",
    href: "/dashboard",
  },
  {
    label: "Capacitaciones",
    href: "/capacitations",
  },
];

export const SideNavbar = ({ session }: Props) => {
  const matches = useMediaQuery("(min-width: 1024px)");

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
        <DesktopNav navItems={navItems} />
      ) : (
        <MobileNav navItems={navItems} />
      )}
    </header>
  );
};
