import { auth } from "@/auth";
import axiosInstance from "../axios.config";

interface ResponseCounter {
  ok: boolean;
  count: number;
}

const countClients = async () => {
  const session = await auth();
  /** POST to endpoint */
  return await axiosInstance
    .post<ResponseCounter>(
      "/client/total",
      {},
      {
        headers: {
          "x-token": session?.user.token,
        },
      }
    )
    .then((response) => {
      console.log(response.data.count);
      return response.data.count;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default countClients;
