import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { Client } from "@/interfaces/client";

interface ResponseCreate {
  ok: boolean;
  client: Client;
}

const createClients = async (
  name: string,
  lastname: string,
  address: string,
  phone: string
) => {
  const session = await auth();
  return await axiosInstance
    .post<ResponseCreate>(
      `/client/new`,
      { name, lastname, address, phone },
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

export default createClients;
