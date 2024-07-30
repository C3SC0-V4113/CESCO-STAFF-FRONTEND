import API from "@/app/api/api.services";
import { ClientFormUpdate } from "@/app/dashboard/components/clients/ClientFormUpdate";
import { Header } from "@/components/ui/header";
import { NextPage } from "next";

interface Props {
  params: { id: string };
}

const EditClient: NextPage<Props> = async ({ params }) => {
  const id = params.id;
  const client = await API.client.getClientsById(id);

  const breadcrumbItems = [
    { label: "Clientes", href: "/dashboard/clients" },
    { label: `Detalle de Cliente`, href: `/dashboard/clients/${id}` },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header
        title="Actualizar Cliente"
        desc="Formulario de Actualización de cliente"
        breadcrumbs={{
          items: breadcrumbItems,
          page: "Actualización del Cliente",
        }}
      />
      <ClientFormUpdate client={client!} />
    </div>
  );
};

export default EditClient;
