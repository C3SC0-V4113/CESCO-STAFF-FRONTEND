import API from "@/app/api/api.services";
import { NextPage } from "next";

interface Props {}

const EventsPage: NextPage<Props> = async ({}) => {
  const events = await API.event.getEvents();

  return <div>{JSON.stringify(events)}</div>;
};

export default EventsPage;
