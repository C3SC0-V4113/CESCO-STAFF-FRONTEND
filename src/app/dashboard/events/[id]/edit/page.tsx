import API from "@/app/api/api.services";
import { EventFormUpdate } from "@/app/dashboard/components/events/EventFormUpdate";
import { Header } from "@/components/ui/header";
import { NextPage } from "next";

interface Props {
  params: { id: string };
}

const EditEvent: NextPage<Props> = async ({ params }) => {
  const id = params.id;
  const events = await API.event.getEvents();
  const event = events!.find((event) => event._id === id);

  const clients = await API.client.getListClients();
  const users = await API.auth.getListUsers();

  const breadcrumbItems = [{ label: "Eventos", href: "/dashboard/events" }];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header
        title="Actualizar Evento"
        desc="Formulario de Actualización de evento"
        breadcrumbs={{
          items: breadcrumbItems,
          page: "Actualización de Evento",
        }}
      />
      <EventFormUpdate event={event!} users={users!} clients={clients!} />
    </div>
  );
};

export default EditEvent;
