import { auth } from "@/auth";
import axiosInstance from "../axios.config";

interface ResponseClients {
  ok: boolean;
  clients: {
    label: string;
    value: string;
  }[];
}

const getListClients = async () => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .post<ResponseClients>(
      "/client/combo-clients",
      {},
      {
        headers: {
          "x-token": session?.user.token,
        },
      }
    )
    .then((response) => {
      console.log(response.data);

      return response.data.clients;
    })
    .catch((error) => {
      console.error(error);

      return null;
    });
};

export default getListClients;
