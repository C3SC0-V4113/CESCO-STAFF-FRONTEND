import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { CalendarEvents } from "@/interfaces/events";

interface ResponseEvents {
  ok: boolean;
  events: CalendarEvents[];
}

const getEvents = async () => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .get<ResponseEvents>("/event", {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data.events;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default getEvents;
