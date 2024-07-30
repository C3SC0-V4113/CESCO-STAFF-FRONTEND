"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import deleteClientAction from "@/actions/clients/deleteClients.actions";
import deleteUserAction from "@/actions/users/deleteUser.action";

interface Props {
  userId: string;
  cta: string;
  title: string;
  desc: string;
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  buttonClassName?: string;
}

export const DeleteDialogUser = ({
  title,
  desc,
  cta,
  userId,
  buttonVariant = "destructive",
  buttonClassName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const onSubmit = async () => {
    setLoading(true);
    const response = await deleteUserAction(userId);

    if (response?.error) {
      /** Logica de error */
      toast({
        title: response.error,
        description: "Intenta de nuevo más tarde",
        variant: "destructive",
      });

      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={buttonClassName} variant={buttonVariant}>
          {cta}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onSubmit} disabled={loading}>
              {loading && <Loader2 className="animate-spin mr-2" />}
              Continuar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
