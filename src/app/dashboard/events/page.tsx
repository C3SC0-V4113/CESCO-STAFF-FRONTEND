import API from "@/app/api/api.services";
import { NextPage } from "next";
import CalendarEventsComponent from "../components/events/CalendarEventsComponent";
import { Header } from "@/components/ui/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {}

const EventsPage: NextPage<Props> = async ({}) => {
  const events = await API.event.getEvents();

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header title="Eventos" desc="Manejo de Eventos" />
      <div className="flex">
        <Link className="w-full sm:max-w-xs" href={"events/create"}>
          <Button className="w-full">Crear Evento</Button>
        </Link>
      </div>
      <CalendarEventsComponent events={events!} />
    </div>
  );
};

export default EventsPage;
