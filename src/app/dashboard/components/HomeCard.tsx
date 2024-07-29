import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  title: string;
  content: string | number;
  link?: {
    label: string;
    href: string;
  };
}

export const HomeCard = ({ title, content, link }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-6xl">{content}</p>
      </CardContent>
      <CardFooter>
        {link && (
          <Link className="mx-auto" href={link.href}>
            <Button>{link.label}</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
