import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface NavButtonProps extends ButtonProps {
  label: string;
  href?: string;
}
export const NavButton = ({
  label,
  href = "/",
  variant = "default",
}: NavButtonProps) => {
  const pathname = usePathname();
  return (
    <Link className="w-full" href={href}>
      <Button
        variant={variant}
        className={cn(
          "w-full",
          pathname == href
            ? "border border-primary bg-secondary text-secondary-foreground hover:bg-secondary/60"
            : ""
        )}
      >
        {label}
      </Button>
    </Link>
  );
};
