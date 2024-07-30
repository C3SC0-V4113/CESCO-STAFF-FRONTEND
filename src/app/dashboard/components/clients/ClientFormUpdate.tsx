"use client";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/components/ui/use-toast";
import { Client } from "@/interfaces/client";
import updateClientAction from "@/actions/clients/updateClients.action";

export const formSchema = z.object({
  name: z.string().min(6).max(50),
  lastname: z.string().min(6).max(50),
  address: z.string().min(6),
  phone: z.string().refine(isValidPhoneNumber, { message: "Número invalido" }),
});

interface Props {
  client: Client;
}

export const ClientFormUpdate = ({ client }: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.name,
      lastname: client.lastname,
      address: client.address,
      phone: client.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await updateClientAction({
      id: client._id,
      values,
    });

    if (response?.error) {
      /** Logica de error */
      toast({
        title: response.error,
        description: "Intenta de nuevo más tarde",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Ingresa tú teléfono"
                  defaultCountry="SV"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Torre Futura" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Actualizar Cliente</Button>
      </form>
    </Form>
  );
};
