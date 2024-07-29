import { auth } from "@/auth";
import axiosInstance from "../axios.config";

interface ResponseCounter {
  ok: boolean;
  count: number;
}

const countClients = async () => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .get<ResponseCounter>("/client/total", {
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

export default countClients;
