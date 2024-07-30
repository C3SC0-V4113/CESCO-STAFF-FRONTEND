"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

const deleteEventAction = async (id: string) => {
  const ok = await API.event.deleteEvent(id);

  if (!ok) {
    return {
      error: "Delete not found",
    };
  }
  redirect("/dashboard/events");
};

export default deleteEventAction;
