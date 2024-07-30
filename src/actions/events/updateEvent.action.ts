"use server";

import API from "@/app/api/api.services";
import { Option } from "@/components/ui/multi-selector";
import { CalendarEvents } from "@/interfaces/events";
import moment from "moment";
import { redirect } from "next/navigation";

interface Props {
  id: string;
  values: {
    title: string;
    description: string;
    status: CalendarEvents["status"];
    users: Option[];
    clients: Option[];
    startDateTime: Date;
    endDateTime: Date;
  };
}

const updateEventsAction = async ({ values, id }: Props) => {
  const {
    clients,
    description,
    endDateTime,
    startDateTime,
    status,
    title,
    users,
  } = values;

  const formatLabels = (options: Option[]) => {
    return options.map((option) => option.value);
  };

  const response = await API.event.updateEvent(
    id,
    title,
    description,
    status,
    formatLabels(users),
    formatLabels(clients),
    moment(startDateTime).format("YYYY-MM-DD"),
    moment(endDateTime).format("YYYY-MM-DD")
  );

  if (!response) {
    return {
      error: "Unable to update event",
    };
  }
  redirect("/dashboard/events");
};

export default updateEventsAction;
