import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { Client } from "@/interfaces/client";

interface ResponseClient {
  ok: boolean;
  client: Client;
}

const getClientsById = async (clientId: string) => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .get<ResponseClient>(`/client/${clientId}`, {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return response.data.client;
    })
    .catch((error) => {
      return null;
    });
};

export default getClientsById;
