import API from "@/app/api/api.services";
import { NextPage } from "next";
import CalendarEventsComponent from "../components/events/CalendarEventsComponent";

interface Props {}

const EventsPage: NextPage<Props> = async ({}) => {
  const events = await API.event.getEvents();

  return (
    <div>
      <CalendarEventsComponent events={events!} />
    </div>
  );
};

export default EventsPage;
