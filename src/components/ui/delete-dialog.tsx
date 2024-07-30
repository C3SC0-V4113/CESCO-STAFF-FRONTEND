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
import deleteUserAction from "@/actions/deleteUser.actions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Props {
  clientId: string;
  cta: string;
  title: string;
  desc: string;
}

export const DeleteDialog = ({ title, desc, cta, clientId }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const onSubmit = async () => {
    setLoading(true);
    const response = await deleteUserAction(clientId);

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
        <Button variant={"destructive"}>{cta}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="w-full"
              variant={"destructive"}
              onClick={onSubmit}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin mr-2" />}
              Continuar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
