import API from "@/app/api/api.services";
import { NextPage } from "next";
import CalendarEventsComponent from "../components/events/CalendarEventsComponent";
import { Header } from "@/components/ui/header";

interface Props {}

const EventsPage: NextPage<Props> = async ({}) => {
  const events = await API.event.getEvents();

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header title="Eventos" desc="Manejo de Eventos" />
      <CalendarEventsComponent events={events!} />
    </div>
  );
};

export default EventsPage;
