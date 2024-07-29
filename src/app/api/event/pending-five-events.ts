import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { CalendarEvents } from "@/interfaces/events";

interface ResponseEvents {
  ok: boolean;
  events: CalendarEvents[];
}

const pendingFiveEvents = async () => {
  const session = await auth();

  return await axiosInstance
    .get<ResponseEvents>("/event/pending", {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return response.data.events;
    })
    .catch((error) => {
      return null;
    });
};

export default pendingFiveEvents;
