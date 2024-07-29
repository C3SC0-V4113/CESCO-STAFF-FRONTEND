import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { Client } from "@/interfaces/client";

interface ResponseClients {
  ok: boolean;
  clients: Client[];
  total: number;
  page: number;
  limit: number;
}

const getClients = async () => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .get<ResponseClients>("/client", {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
};

export default getClients;
