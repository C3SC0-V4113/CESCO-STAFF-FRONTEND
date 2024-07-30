import { Header } from "@/components/ui/header";
import { NextPage } from "next";
import { EventForm } from "../../components/events/EventForm";
import API from "@/app/api/api.services";
import { Suspense } from "react";

interface Props {}

const breadcrumbItems = [{ label: "Eventos", href: "/dashboard/events" }];

const CreateEvent: NextPage<Props> = async ({}) => {
  const clients = await API.client.getListClients();
  const users = await API.auth.getListUsers();
  return (
    <div className="flex flex-col gap-4 w-full">
      <Header
        title="Creación de Evento"
        desc="En este formulario se realiza la creación del Cliente"
        breadcrumbs={{ items: breadcrumbItems, page: "Creación de Evento" }}
      />
      <Suspense fallback={<>Cargando...</>}>
        <EventForm clients={clients!} users={users!} />
      </Suspense>
    </div>
  );
};

export default CreateEvent;
