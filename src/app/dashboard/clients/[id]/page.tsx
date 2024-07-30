import API from "@/app/api/api.services";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Header } from "@/components/ui/header";
import { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const breadcrumbItems = [{ label: "Clientes", href: "/dashboard/clients" }];

const ClientDetail: NextPage<Props> = async ({ params }) => {
  const session = await auth();

  if (!session) return null;

  const id = params.id;

  const client = await API.client.getClientsById(id);

  if (!client) {
    redirect("/dashboard/clients");
  }

  const { name, lastname, address, phone } = client;
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <Header
          title="Detalle del Cliente"
          breadcrumbs={{
            items: breadcrumbItems,
            page: "Detalle del Cliente",
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-primary text-primary-foreground p-8 border gap-8 rounded-md">
          <div className="flex flex-col gap-2">
            <p>Nombre:</p>
            <p>{`${name} ${lastname}`}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Teléfono:</p>
            <p>{phone}</p>
          </div>
          <div className="flex flex-col col-span-full gap-2 md:min-w-96">
            <p>Dirección:</p>
            <p>{address}</p>
          </div>
        </div>
      </div>
      {session.user.role === "admin" && (
        <div className="flex flex-col gap-2 mt-2 md:flex-row md:justify-end">
          <Link className="w-full md:w-auto" href={`${id}/edit`}>
            <Button className="w-full">Editar Cliente</Button>
          </Link>
          <DeleteDialog
            cta={"Eliminar Cliente"}
            title={"¿Estás seguro que deseas eliminar al cliente?"}
            desc={"Está acción no se puede reponer"}
            clientId={id}
          />
        </div>
      )}
    </>
  );
};

export default ClientDetail;
