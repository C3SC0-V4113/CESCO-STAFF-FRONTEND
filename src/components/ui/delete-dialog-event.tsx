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
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import deleteEventAction from "@/actions/events/deleteEvent.action";
import { useRouter } from "next/navigation";

interface Props {
  eventId: string;
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
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteDialogEvent = ({
  title,
  desc,
  cta,
  eventId,
  buttonVariant = "destructive",
  buttonClassName,
  setShowModal,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async () => {
    setLoading(true);
    const response = await deleteEventAction(eventId);

    if (response?.error) {
      /** Logica de error */
      toast({
        title: response.error,
        description: "Intenta de nuevo más tarde",
        variant: "destructive",
      });

      setLoading(false);
    }

    setShowModal(false);
    router.refresh();
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
