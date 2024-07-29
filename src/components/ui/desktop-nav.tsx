import { signOut } from "next-auth/react";
import { Button } from "./button";
import { NavButton } from "./nav-button";

interface Props {
  navItems: {
    label: string;
    href: string;
  }[];
}

export const DesktopNav = ({ navItems }: Props) => {
  return (
    <nav className="flex flex-col w-full py-8 px-4 justify-between h-full">
      <div className="flex flex-col gap-4">
        {navItems.map((navItem, key) => (
          <NavButton key={key} {...navItem} />
        ))}
      </div>
      <Button
        variant={"default"}
        className={"w-full"}
        onClick={() => signOut()}
      >
        Cerrar Sesión
      </Button>
    </nav>
  );
};
