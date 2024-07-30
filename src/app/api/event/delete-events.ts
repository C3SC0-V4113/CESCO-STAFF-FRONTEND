import { auth } from "@/auth";
import axiosInstance from "../axios.config";

const deleteEvent = async (eventId: string) => {
  const session = await auth();
  /** DELETE to endpoint */

  return await axiosInstance
    .delete(`/event/${eventId}`, {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export default deleteEvent;
