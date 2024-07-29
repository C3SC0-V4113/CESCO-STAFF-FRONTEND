import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Menu } from "lucide-react";
import { NavButton } from "./nav-button";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface Props {
  navItems: {
    label: string;
    href: string;
  }[];
}

export const MobileNav = ({ navItems }: Props) => {
  return (
    <Sheet>
      <SheetTrigger aria-label="Abrir Menu">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="sr-only">
          <SheetTitle>Menú de Navegación</SheetTitle>
          <SheetDescription>
            Menú de Navegación especifico para pantallas pequeñas
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col py-8 justify-between h-full">
          <div className="flex flex-col gap-4">
            {navItems.map((navItem, key) => (
              <NavButton key={key} {...navItem} />
            ))}
          </div>
          <Button
            variant={"default"}
            className={cn("w-full")}
            onClick={() => signOut()}
          >
            Cerrar Sesión
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
