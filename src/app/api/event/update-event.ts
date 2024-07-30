import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { CalendarEvents } from "@/interfaces/events";

interface ResponseUpdate {
  ok: boolean;
}

const updateEvent = async (
  id: string,
  title: string,
  description: string,
  status: CalendarEvents["status"],
  users: string[],
  clients: string[],
  startDateTime: string,
  endDateTime: string
) => {
  const session = await auth();
  return await axiosInstance
    .put<ResponseUpdate>(
      `/event/${id}`,
      {
        title,
        description,
        status,
        users,
        clients,
        startDateTime,
        endDateTime,
      },
      {
        headers: {
          "x-token": session?.user.token,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default updateEvent;
