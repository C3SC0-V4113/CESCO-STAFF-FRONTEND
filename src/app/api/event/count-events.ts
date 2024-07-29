import { auth } from "@/auth";
import axiosInstance from "../axios.config";

interface ResponseCounter {
  ok: boolean;
  count: number;
}

export const countEvents = async () => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .get<ResponseCounter>("/event/pending/count", {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return response.data.count;
    })
    .catch((error) => {
      return null;
    });
};

export default countEvents;
